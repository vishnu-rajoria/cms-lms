<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\Student;
use App\Models\StudentsOfGroup;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use DB;
use inertia\Inertia;
class GroupController extends Controller
{
    function saveStudentGroup(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|unique:groups|max:50',
            'date' => 'required',
            'selected-students-id' => 'required',
        ]);

        $groupCreationDate = $request->get('date');
        $groupName = $request->get('name');
        $groupDescription = $request->get('description');
        $selectedStudentId = [];
        if($request->get('selected-students-id'))
        {
            $selectedStudentId = json_decode($request->get('selected-students-id'));
        }
        
        $savedGroup = Group::create([
            'name' => $groupName,
            'description' => $groupDescription,
            'created_at' => $groupCreationDate
        ]);
        $savedGroupId = $savedGroup->id;
        if($request->hasFile('profile_pic'))
        {
            $groupIcon = $request->file('profile_pic');

            $file = $groupIcon[0];
 
            $name = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $uploadedFilePath = Storage::disk('public')->put("/groups/$savedGroupId/group_icon",$file);
            $uploadedFilePathArray = explode('/',$uploadedFilePath);
            $group_details['group_icon'] =   end($uploadedFilePathArray);

            $savedGroup->group_icon = $group_details['group_icon'];
            $savedGroup->save();

           
        }
      
        // now add all students to the group
        foreach($selectedStudentId as $studentId)
        {   
            DB::table('students_of_groups')->insert([
                'group_id' => $savedGroupId,
                'user_id' => $studentId,
                'created_at' => Carbon::now()
            ]);
        }
     
        return response()->json(["status" => "success"],200);


    }

    
    public function manageGroups()
    {
        return Inertia::render('Modules/Group/ManageGroups'); 
    }


    public function getGroups($type=null)
    {
       
        if($type == null)
        {
                // Query select() must include the primary key of main tables and foreign key of related tables
                $groupsRecordsFromDB = Group::select('id','name','group_icon','description','created_at')->where('deleted_at',null)->orderByDesc('created_at')->get();
              
                $compiledGoupsRecords = [];
                // dd($groupsRecordsFromDB);

                foreach($groupsRecordsFromDB as $group)
                {
                    $groupDetails = [];
                    $arrayGroup = $group->toArray(); // Convert the object to an array
                    $groupDetails['id'] = $arrayGroup['id'];
                    $groupDetails['name'] = $arrayGroup['name'];
                    $groupDetails['group_icon'] = $arrayGroup['group_icon'];
                    $groupDetails['description'] = $arrayGroup['description'];
                    $groupDetails['created_at'] = $arrayGroup['created_at'];
              
                 $membersIdRaw = StudentsOfGroup::where(['group_id'=>$group->id])->select('user_id')->get()->toArray();
                 $membersId = array();
                foreach($membersIdRaw as $rawRecord)
                {
                    $membersId[] = $rawRecord['user_id'];
                }

                 $member_count = count($membersId);
                 $firstFiveMembersId = array_slice($membersId,0,5);

                 $member_profile_pic = Student::whereIn('user_id',$firstFiveMembersId)->select('user_id','profile_pic')->get();
                
                 $members = [];
                 foreach($member_profile_pic as $membersRecord)
                 {
                   $memberDetails = []; 
                   $base_url = env('APP_URL');
                   $member_id = $membersRecord['user_id'];
                   $memberDetails['profile_pic'] = $membersRecord['profile_pic'];
                   $memberDetails['id'] = $member_id;
                //    if($profile_pic_name!= null)
                //    {
                //     $memberDetails['profile_pic'] = "$base_url/public/storage/students/$member_id/profile_pictures/$profile_pic_name";
                //    }
                //    else{
                //     $memberDetails['profile_pic'] = "$base_url/public/storage/dummy/profile_pic.jpg";
                //    }
                   $members[] = $memberDetails;
                 }

                 $groupDetails['members_count'] = $member_count;
                 $groupDetails['members_info_limited'] = $members;

                 $compiledGoupsRecords[] =  $groupDetails;
                }
                return response()->json(["groups"=>$compiledGoupsRecords]);
        }
        
    }

    function viewGroupInfo($group_id)
    {
        return Inertia::render('Modules/Group/ViewGroupInfo',[
            'groupId' => $group_id
        ]);
    }

    function displayMarkAttendanceForm($group_id, $date)
    {
        return Inertia::render('Modules/Group/MarkGroupedStudentsAttendance',[
            'groupId' => $group_id,
            'selectedDate' => $date
        ]);
    }  

    function assignStudentsToGroup(Request $request)
    {

        $validated = $request->validate([
            'group_id' => 'required',
            'selected_students_id' => 'required',
        ]);

        $groupId = $request->get('group_id');
        $selectedStudentsId = $request->get('selected_students_id');
        // echo $groupId;
        // print_r($selectedStudentsId);

        foreach($selectedStudentsId as $studentId)
        {   
            StudentsOfGroup::firstOrCreate (
                ['group_id' => $groupId,
                'user_id' => $studentId],
                ['created_at' => Carbon::now()]
           );
        }
        return response()->json(["status" => "success"],200);
    }

}
