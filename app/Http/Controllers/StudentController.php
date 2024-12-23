<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Mail\TestMail;
use Auth;
use DB;

// Models
use App\Models\User;
use App\Models\Student;
use App\Models\StudentsOfGroup;
use App\Models\StudentAttendance;
class StudentController extends Controller
{

  

    public function index()
    {
        return Inertia::render('Student/Dashboard', [
            
            "students"=>User::where(['role_id' => 3])->get(),
        ]);
    }


    public function manageStudents()
    {
        return Inertia::render('Modules/Student/ManageStudents'); 
    }
    public function getStudentDetails($studentId)
    {
        $studentDetails =  User::with('studentDetails')->where(['id'=>$studentId])->first();

        $groups = DB::table('students_of_groups')->select('group_id')->distinct()->where(['user_id'=>$studentId])->get();
        return response()->json(["studentDetails"=>$studentDetails,'groups'=>$groups]);
    }

    function getGroupStudentAttendance($userId,$groupId)
    {
        $studentAttendanceFormatted = [];
        $studentAttendance = StudentAttendance::select('date','is_present','is_leave_uninformed','late_entry_by_minutes','early_leave_by_minutes')->where(['user_id'=>$userId,'group_id'=>$groupId])->get();
        foreach($studentAttendance as $record)
        {
            $studentAttendanceFormatted[$record->date] = $record;
        }
        return response()->json(["studentAttendance"=>$studentAttendanceFormatted]);
    }

    public function getStudents($group=null)
    {
        // return response()->json(["students"=>User::where(['role_id' => 3])->get()]);
        // return response()->json(["students"=>User::with('studentDetails')->where(['role_id' => 3])->get()]);
       
        if($group == null)
        {
              // Query select() must include the primary key of main tables and foreign key of related tables
              $studentsRecordsFromDB = User::query()->select('id','name','email')->with(['studentDetails'=>function($query){
                $query->select('user_id','fname','course','profile_pic','doj');
            }])->where(['role_id' => 3])->orderByDesc('created_at')->get();
            $studentsRecords = [];

            // dd($studentsRecordsFromDB);
           
            foreach($studentsRecordsFromDB as $student)
            {
                $arrayStudent = $student->toArray(); // Convert the object to an array
               
                if(isset($arrayStudent['student_details']))
                {
                    $mergedArray=array_merge($arrayStudent,$arrayStudent['student_details']); // Merge the arrays
                    unset($mergedArray['user_id']);
                    unset($mergedArray['student_details']); // Remove the 'student_details' key
                    $studentsRecords[] = $mergedArray;
                }
                
            }
        }
        else{

            $studentIdRecords = StudentsOfGroup::where(['group_id'=>$group])->select('user_id')->get()->toArray();
            $selectedStudentsId = [];
            foreach($studentIdRecords as $record)
            {
                $selectedStudentsId[] = $record['user_id'];
            }
            
            $studentsRecordsFromDB = User::query()->select('id','name','email')->with(['studentDetails'=>function($query){
                $query->select('user_id','fname','course','profile_pic','doj');
            }])->where(['role_id' => 3])->whereIn('id',$selectedStudentsId)->orderByDesc('created_at')->get();
            $studentsRecords = [];

            // dd($studentsRecordsFromDB);
           
            foreach($studentsRecordsFromDB as $student)
            {
                $arrayStudent = $student->toArray(); // Convert the object to an array
               
                if(isset($arrayStudent['student_details']))
                {
                    $mergedArray=array_merge($arrayStudent,$arrayStudent['student_details']); // Merge the arrays
                    unset($mergedArray['user_id']);
                    unset($mergedArray['student_details']); // Remove the 'student_details' key
                    $studentsRecords[] = $mergedArray;
                }
                
            }
        }
        
        return response()->json(["students"=>$studentsRecords]);
    }



    public function register()
    {
        return Inertia::render('Modules/Student/StudentRegistrationByAdmin'); 
    }

    public function save(Request $request)
    {   
        // $data = ["test","data"];
        // Mail::to("vishnurajoria18@gmail.com")->send(new TestMail($data));


        // $request->validate([
        //     'sname' => 'required|string|max:255',
        //     'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        //     'password' => ['required', 'confirmed', Rules\Password::defaults()],
        // ]);
        $errors = [];
        $user_details = [
            'name' => $request->sname,
            'email' => $request->email,
            'role_id' => 3,
            'password' => Hash::make($request->password),
        ];
        try
        {
            $user = User::create($user_details);
            $user_id = $user->id;
        }
        catch(\Exception $e)
        {
            if(User::where('email',$request->email)->count() != 0)
            {
                $errors[] = "The user with email [$request->email] already exists. User another email.";
            }
            else{
                $errors[] = "Coun't save as a new user";
            }
            
        }

        if(count($errors) == 0)
        {

       
        $student_details = $request->except(['sname', 'email', 'password','signaturePic','profilePic']);
        $student_details['user_id'] = $user_id;

        $profileImageFileBag =  $request->file('profile_pic');
        $signatureImageFileBag =  $request->file('signature_pic');

        if($profileImageFileBag != null)
        {
           $file = $profileImageFileBag[0];
 
                $name = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $uploadedFilePath = Storage::disk('public')->put("/students/$user_id/profile_pictures",$file);
                $uploadedFilePathArray = explode('/',$uploadedFilePath);
                $student_details['profile_pic'] =   end($uploadedFilePathArray);
            }
        
        if($signatureImageFileBag != null)
        {
            $file = $signatureImageFileBag[0];
            $name = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $uploadedFilePath = Storage::disk('public')->put("/students/$user_id/signature_pictures",$file);
            $uploadedFilePathArray = explode('/',$uploadedFilePath);
            $student_details['signature_pic'] =   end($uploadedFilePathArray);
                
        }
       
        // print_r($student_details);
        try
        {
            $student = Student::create($student_details);
        }
        catch(\Exception $e)
        {
            $errors[] = "Coun't save as a new student";
            User::destroy($user_id);
        }
        

    }
    if(count($errors) == 0)
    {
        return response()->json(["status" => "success"],200);
    }
    else{
        return response()->json(["status" => "error", "errors" => $errors],422);
    }
        

    }



    function saveStudentsAttendance(Request $request)
    {
        $data = $request->all();
        $isSavedPreviously =$request->get('saved_previously');
       
        try{
            foreach($data['student_id'] as $key => $value)
            {
                $studentAttendanceRecord = array();
                $studentAttendanceRecord['date'] = $data['date'];
                $studentAttendanceRecord['user_id'] = $data['student_id'][$key];
                $studentAttendanceRecord['group_id'] = $data['group_id'][$key];
                $studentAttendanceRecord['is_present'] = $data['is_present'][$key];
                $studentAttendanceRecord['late_entry_by_minutes'] = $data['late_entry_by_minutes'][$key];
                $studentAttendanceRecord['early_leave_by_minutes'] = $data['early_leave_by_minutes'][$key];
                $studentAttendanceRecord['is_leave_uninformed'] = !$data['is_leave_uninformed'][$key];
                $studentAttendanceRecord['remark'] = $data['remark'][$key];
                $studentAttendanceRecord['created_by_id'] = Auth::user()->id;
                
                StudentAttendance::updateOrCreate(
                    [
                        'user_id'=>$studentAttendanceRecord['user_id'],
                        'group_id'=>$studentAttendanceRecord['group_id'],
                        'date'=>$studentAttendanceRecord['date']
                    ],
                    [
                        'is_present'=>$studentAttendanceRecord['is_present'],
                        'late_entry_by_minutes' => $studentAttendanceRecord['late_entry_by_minutes'],
                        'early_leave_by_minutes' => $studentAttendanceRecord['early_leave_by_minutes'] ,
                        'is_leave_uninformed' => $studentAttendanceRecord['is_leave_uninformed'],
                        'remark' => $studentAttendanceRecord['remark'],
                        'created_by_id' => $studentAttendanceRecord['created_by_id']

                ]);
                
            }
        }
        catch(\Exception $e)
        {
            return response()->json(["status" => "error", "errors" => $e->getMessage()],422);
        }
        return response()->json(["status" => "success"],200);
    }


    function getGroupStudentsAttendance(Request $request)
    {
        $groupId = $request->get('groupId');
        $date = $request->get('date');
        $studentsAttendance = StudentAttendance::where('group_id',$groupId)->where('date',$date)->get();
        return response()->json(["studentsAttendance" => $studentsAttendance],200);
    }

    function showProfile($student_id
    ){
        return Inertia::render('Modules/Student/Profile',[
            'studentId' => $student_id,
        ]);
    }

}
