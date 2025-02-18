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
use Barryvdh\DomPDF\Facade\Pdf;
use Imagick;
// Models
use App\Models\User;
use App\Models\Student;
use App\Models\Course;
use App\Models\StudentsOfGroup;
use App\Models\StudentAttendance;
use App\Models\StudentFee;
use App\Models\Transaction;
use App\Models\TransactionImage;
use App\Models\Group;
use App\Models\DbRecordUpdate;
use App\Models\DbRecordUpdateEntry;
use App\Models\Notification;
use Carbon\Carbon;
use App;

class StudentController extends Controller
{



    public function index()
    {
        return Inertia::render('Student/Dashboard', [

            "students" => User::where(['role_id' => 3])->get(),
        ]);
    }


    public function manageStudents()
    {
        return Inertia::render('Modules/Student/ManageStudents');
    }
    public function getStudentDetails($studentId)
    {
        $groups = [];
        $studentDetails =  User::select('id', 'name', 'email', 'role_id')->with(['studentDetails' => function ($query) {
            $query->select('user_id', 'fname', 'course_id', 'profile_pic', 'doj', 'mobile_number_1', 'mobile_number_2', 'portfolio_link', 'is_record_update_remaining', 'course_fee_amount', 'course_fee_concession', 'amount_paid');
        }])->where(['id' => $studentId])->first();

        $groupIds = DB::table('students_of_groups')->select('group_id')->distinct()->where(['user_id' => $studentId])->get();

        foreach ($groupIds as $groupId) {
            $groups[] = Group::select('id', 'name', 'group_icon')->where(['id' => $groupId->group_id])->first();
        }
        // print_r($groupIds);
        return response()->json(["studentDetails" => $studentDetails, 'groups' => $groups]);
    }

    function getStudentFeesHistory($studentId)
    {
        $studentFeeHistory = StudentFee::where(['student_id' => $studentId])->orderBy('payment_date', 'desc')->get();
        return response()->json(["studentFeeHistory" => $studentFeeHistory]);
    }

    function downloadStudentFeesPdf(Request $request)
    {
        $data  = array();
        $page_size = $request->get('page_size') == null ? 'A6' : $request->get('page_size');
        $data['student_id'] = $request->get('student_id');
        $data['receipt_id'] = $request->get('receipt_id');

        $data['user_details'] = User::where('id', $data['student_id'])->first()->toArray();
        $data['student_details'] = Student::where('user_id', $data['student_id'])->first()->toArray();
        $data['student_fee_details'] = StudentFee::where('id', $data['receipt_id'])->first()->toArray();
        if ($page_size == 'A5') {
            $pdf = Pdf::loadView('pdf.student_fee_receipt_a4', $data)->setPaper('A5');
        } else {
            $pdf = Pdf::loadView('pdf.student_fee_receipt', $data)->setPaper('A6');
        }
        return $pdf->stream('invoice.pdf');
    }

    function updateProfilePic(Request $request)
    {
        $role_id = $request->user_role_id;
        $user_id = $request->user_id;
        $imageBlob = $request->file('profile_pic');
        $user_storage_directory = "students";
        $profile_pic_table = "students";
        if ($role_id == 1) {
            $user_storage_directory = "admins";
            $profile_pic_table = "admins";
        } elseif ($role_id == 2) {
            $user_storage_directory = "teachers";
            $profile_pic_table = "teachers";
        }
        $profile_pic_save_directory =  "$user_storage_directory/profile_pics/$user_id/original";
        $uploadedFilePath = Storage::disk('public')->put($profile_pic_save_directory, $imageBlob);
        $saved_file_name = str_replace($profile_pic_save_directory . '/', '', $uploadedFilePath);


        $image = new Imagick(public_path() . "/storage/" . $uploadedFilePath);
        // Resize the image to a width of 800 pixels while maintaining aspect ratio
        $image->resizeImage(200, 0, Imagick::FILTER_LANCZOS, 1);
        // Save the resized image
        $profile_pic_save_directory =  public_path() . "/storage/" . "$user_storage_directory/profile_pics/$user_id/md";
        if (!file_exists($profile_pic_save_directory)) {
            mkdir($profile_pic_save_directory, 666, true);
        }
        $image->writeImage("$profile_pic_save_directory/md-$saved_file_name");
        // Storage::disk('public')->put($profile_pic_save_directory, $imageBlob)


        $image = new Imagick(public_path() . "/storage/" . $uploadedFilePath);
        // Resize the image to a width of 800 pixels while maintaining aspect ratio
        $image->resizeImage(50, 0, Imagick::FILTER_LANCZOS, 1);
        // Save the resized image
        $profile_pic_save_directory =  public_path() . "/storage/" . "$user_storage_directory/profile_pics/$user_id/sm";
        if (!file_exists($profile_pic_save_directory)) {
            mkdir($profile_pic_save_directory, 666, true);
        }
        $image->writeImage("$profile_pic_save_directory/sm-$saved_file_name");



        // echo $saved_file_name;
        $DbRecordUpdateData['created_by_user_id'] = Auth::user()->id;
        $savedRecordUpdateInfo =  DbRecordUpdate::create($DbRecordUpdateData);
        $savedRecordUpdateId =  $savedRecordUpdateInfo->id;

        $DbRecordUpdateEntryData['db_record_update_id'] = $savedRecordUpdateId;
        $DbRecordUpdateEntryData['table_name'] = $profile_pic_table;

        $matchingColumnsAndValues = array();
        $matchingColumnsAndValues['user_id'] = $user_id;

        $DbRecordUpdateEntryData['stringified_conditional_columns_and_values'] = json_encode($matchingColumnsAndValues);

        $recordEnteries = array();
        $profilePicEntry['column_name'] = "profile_pic";
        $profilePicEntry['old_value'] = DB::table($profile_pic_table)->where(['user_id' => $user_id])->first()->profile_pic;
        $profilePicEntry['new_value'] = $saved_file_name;

        $recordEnteries[] = $profilePicEntry;
        $DbRecordUpdateEntryData['stringified_record_entries'] = json_encode($recordEnteries);
        $DbRecordUpdateEntryData['created_at'] = Carbon::now();
        // print_r($DbRecordUpdateEntryData);
        DbRecordUpdateEntry::create($DbRecordUpdateEntryData);

        $actions = [];
        $accept_action = ["title" => "accept", "method" => "post", "routeName" => "accept.profile.pic.change", "type" => "axios", "data" => ["table" => "db_record_updates", "recordId" => $savedRecordUpdateId]];

        $reject_action = ["title" => "reject", "method" => "post", "routeName" => "reject.profile.pic.change", "type" => "axios", "data" => ["table" => "db_record_updates", "recordId" => $savedRecordUpdateId]];

        $actions[] = $accept_action;
        $actions[] = $reject_action;

        Notification::create([
            "type" => "PPCR",  //profile_pic_change_requested
            "message" => "profile picture updated by " . Auth::user()->name . ". Please accept or reject",
            "thumbnail_image" => str_replace(public_path(), "", "$profile_pic_save_directory/sm-$saved_file_name"),
            "sender_user_id" => Auth::user()->id,
            "recipient_user_id" => 1,
            "stringified_actions" => json_encode($actions),
            "created_at" => Carbon::now()
        ]);

        return response()->json(["status" => "success"]);
    }


    function curl_get_contents($url)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }


    function getGroupStudentAttendance($userId, $groupId)
    {
        $studentAttendanceFormatted = [];
        $studentAttendance = StudentAttendance::select('date', 'is_present', 'is_leave_uninformed', 'late_entry_by_minutes', 'early_leave_by_minutes')->where(['user_id' => $userId, 'group_id' => $groupId])->get();
        foreach ($studentAttendance as $record) {
            $studentAttendanceFormatted[$record->date] = $record;
        }
        return response()->json(["studentAttendance" => $studentAttendanceFormatted]);
    }

    function getMonthlyRegistrationReport(Request $request)
    {
        $year = (int)date('Y');
        $month = ((int)date('m'));
        $studentRegistrationMonthlyData = array();
        for ($i = 0; $i < 12; $i++) {
            // echo "Year $year and MONTH : #$month <br>";



            if ($month == 0) {
                $month = 12;
                $year = $year - 1;
            }
            if ($month < 10) {
                $month = "0" . $month;
            }
            // echo $year . "-" . $month . "<br>";
            $startingDate = $year . "-" . $month . "-01";
            $endDate = $year . "-" . $month . "-31";

            // echo "<b>********getting registration count between : $startingDate:$endDate</b><br><br>";
            $studentsRegisteredCount = Student::whereBetween('doj', [$startingDate, $endDate])->count();
            $studentRegistrationMonthlyData[$month . "-" . $year] = $studentsRegisteredCount;
            $month--;
        }


        // print_r($studentRegistrationMonthlyData);

        return response()->json(["studentRegistrationmonthlyData" => $studentRegistrationMonthlyData]);
    }

    public function getStudents($groupId = null)
    {
        // return response()->json(["students"=>User::where(['role_id' => 3])->get()]);
        // return response()->json(["students"=>User::with('studentDetails')->where(['role_id' => 3])->get()]);
        if ($groupId == null) {

            // return an error/exception with status
            return response()->json(["error" => "No group selected"], 400);
        } else {

            if ($groupId == "all") {
                $studentsRecordsFromDB = User::query()->select('id', 'name', 'email', 'role_id')->with(['studentDetails' => function ($query) {
                    $query->select('user_id', 'fname', 'course_id', 'profile_pic', 'doj');
                }])->where(['role_id' => 3])->orderByDesc('created_at')->get();
            } else {
                $studentIdRecords = StudentsOfGroup::where(['group_id' => $groupId])->select('user_id')->get()->toArray();
                $selectedStudentsId = [];
                foreach ($studentIdRecords as $record) {
                    $selectedStudentsId[] = $record['user_id'];
                }

                $studentsRecordsFromDB = User::query()->select('id', 'name', 'email', 'role_id')->with(['studentDetails' => function ($query) {
                    $query->select('user_id', 'fname', 'course_id', 'profile_pic', 'doj');
                }])->where(['role_id' => 3])->whereIn('id', $selectedStudentsId)->orderByDesc('created_at')->get();
            }


            $studentsRecords = [];

            // dd($studentsRecordsFromDB);

            foreach ($studentsRecordsFromDB as $student) {
                $arrayStudent = $student->toArray(); // Convert the object to an array

                if (isset($arrayStudent['student_details'])) {
                    $mergedArray = array_merge($arrayStudent, $arrayStudent['student_details']); // Merge the arrays
                    unset($mergedArray['user_id']);
                    unset($mergedArray['student_details']); // Remove the 'student_details' key
                    $studentsRecords[] = $mergedArray;
                }
            }
        }
        // else{


        //     $studentsRecords = [];

        //     // dd($studentsRecordsFromDB);

        //     foreach($studentsRecordsFromDB as $student)
        //     {
        //         $arrayStudent = $student->toArray(); // Convert the object to an array

        //         if(isset($arrayStudent['student_details']))
        //         {
        //             $mergedArray=array_merge($arrayStudent,$arrayStudent['student_details']); // Merge the arrays
        //             unset($mergedArray['user_id']);
        //             unset($mergedArray['student_details']); // Remove the 'student_details' key
        //             $studentsRecords[] = $mergedArray;
        //         }

        //     }
        // }

        return response()->json(["students" => $studentsRecords]);
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

        //With student details create a new user who is able to login
        $user_details = [
            'name' => $request->sname,
            'email' => $request->email,
            'role_id' => 3,
            'password' => Hash::make($request->password),
        ];
        // print_r($user_details);

        try {
            $savedUserInfo = User::create($user_details);
            $user_id = $savedUserInfo->id;

            // Once the user is created save the transaction details with student fee
            $transaction_details = [
                'date' => carbon::createFromFormat('Y-m-d H:i:s',  "$request->doj 00:00:00"),
                'transaction_amount' => $request->amount_paid,
                'transaction_serial_number' => $request->transaction_serial_number == '' ? null : $request->transaction_serial_number,
                'transaction_mode' => $request->transaction_mode,
                'sender_id' => $user_id,
                'module_name' => 'student-fee',
                'receiver_id' => 1,
                'remark' => $request->fees_remarks,
            ];
            // print_r($transaction_details);
            try {
                $savedTransactionInfo = Transaction::create($transaction_details);
                $transaction_id = $savedTransactionInfo->id;

                // Once the transaction is created save the student fee record
                $student_fees_details = [
                    'student_id' => $user_id,
                    'transaction_id' => $transaction_id,
                    'payment_date' => $request->doj,
                    'fee_amount' => $request->amount_paid,
                    'fee_mode' => $request->transaction_mode,
                ];
                $savedStudentFeeInfo = StudentFee::create($student_fees_details);
                $studentFeeId = $savedStudentFeeInfo->id;
            } catch (\Exception $e) {
                $errors[] = "Coun't save as student fee details";
            }
        } catch (\Exception $e) {
            if (User::where('email', $request->email)->count() != 0) {
                $errors[] = "The user with email [$request->email] already exists. User another email.";
            } else {
                $errors[] = "Coun't save as a new user";
            }
        }


        // If there is no error while creating student user, tranasaction and student fee details create student details in a seprate table
        if (count($errors) == 0) {
            $student_details = $request->except(['sname', 'email', 'password', 'signaturePic', 'profilePic', 'transaction_serial_number', 'transaction_mode', 'fees_remarks']);
            $student_details['user_id'] = $user_id;

            $profileImageFileBag =  $request->file('profile_pic');
            $signatureImageFileBag =  $request->file('signature_pic');

            if ($profileImageFileBag != null) {
                $file = $profileImageFileBag[0];

                $name = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $uploadedFilePath = Storage::disk('public')->put("/students/$user_id/profile_pictures", $file);
                $uploadedFilePathArray = explode('/', $uploadedFilePath);
                $student_details['profile_pic'] =   end($uploadedFilePathArray);
            }

            if ($signatureImageFileBag != null) {
                $file = $signatureImageFileBag[0];
                $name = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $uploadedFilePath = Storage::disk('public')->put("/students/$user_id/signature_pictures", $file);
                $uploadedFilePathArray = explode('/', $uploadedFilePath);
                $student_details['signature_pic'] =   end($uploadedFilePathArray);
            }


            try {
                $student_details['course_verified_at'] = Carbon::now();

                $course_fee_record = Course::select('fee_amount')->where('id', $student_details['course_id'])->first();
                $course_fee_amount = $course_fee_record->fee_amount;
                $student_details['course_fee_amount'] = $course_fee_amount;

                // print_r($student_details);
                $student = Student::create($student_details);
            } catch (\Exception $e) {
                $errors[] = $e->getMessage();

                StudentFee::destroy($studentFeeId);
                Transaction::destroy($transaction_id);
                User::destroy($user_id);
            }
        }
        if (count($errors) == 0) {
            return response()->json(["status" => "success"], 200);
        } else {
            return response()->json(["status" => "error", "errors" => $errors], 422);
        }
    }

    function saveStudentFees(Request $request)
    {
        $data = $request->all();
        $errors = array();
        $transaction_details = [
            'date' => carbon::createFromFormat('Y-m-d H:i:s',  "$request->payment_date 00:00:00"),
            'transaction_amount' => $request->amount_paid,
            'transaction_serial_number' => $request->transaction_serial_number == '' ? null : $request->transaction_serial_number,
            'transaction_mode' => $request->transaction_mode,
            'sender_id' => $request->student_id,
            'module_name' => $request->module_name,
            'receiver_id' => 1,
            'remark' => $request->fees_remarks,
        ];
        // print_r($transaction_details);
        try {
            $savedTransactionInfo = Transaction::create($transaction_details);
            $transaction_id = $savedTransactionInfo->id;

            // once the transaction is saved upload the image/screenshots
            $studentFeePaymentPicsFileBag =  $request->file('student_fee_payment_pic');
            if ($studentFeePaymentPicsFileBag != null) {
                foreach ($studentFeePaymentPicsFileBag as $payment_pic) {
                    $file = $payment_pic;
                    $name = $file->getClientOriginalName();
                    $extension = $file->getClientOriginalExtension();
                    $uploadedFilePath = Storage::disk('public')->put("/students_fee/$request->student_id/payment_pictures", $file);
                    $uploadedFilePathArray = explode('/', $uploadedFilePath);
                    $transaction_image_details = [];
                    $transaction_image_details['file_name'] =   end($uploadedFilePathArray);
                    $transaction_image_details['transaction_id'] =   $transaction_id;
                    try {
                        TransactionImage::create($transaction_image_details);
                    } catch (\Exception $e) {
                        $errors[] = "Coun't save the transaction image : " . $e->getMessage();
                    }
                }
            }

            // once the transaction is saved and image/screenshots are successfully uploaded save the student fee details
            // Once the transaction is created save the student fee record
            $student_fees_details = [
                'student_id' => $request->student_id,
                'transaction_id' => $transaction_id,
                'payment_date' => $request->payment_date,
                'fee_amount' => $request->amount_paid,
                'fee_mode' => $request->transaction_mode,
            ];
            try {
                $savedStudentFeeInfo = StudentFee::create($student_fees_details);
                $studentFeeId = $savedStudentFeeInfo->id;

                //Once the student fee is saved updated the 'amount_paid' field in the student table
                try {
                    $student = Student::where('user_id', $request->student_id)->first();
                    $finalAmount = $student->amount_paid + (int)$request->amount_paid;
                    Student::where('user_id', $request->student_id)->update(['amount_paid' => $finalAmount]);
                } catch (\Exception $e) {
                    $errors[] = "Coun't update the final amount paid for the student" . $e->getMessage();
                }
            } catch (\Exception $e) {
                $errors[] = "Coun't save the student fee details" . $e->getMessage();
            }
        } catch (\Exception $e) {
            $errors[] = "Coun't save the transaction details";
        }

        if (count($errors) == 0) {
            return response()->json(["status" => "success"], 200);
        } else {
            return response()->json(["status" => "error", "errors" => $errors], 422);
        }
    }

    function saveStudentsAttendance(Request $request)
    {
        $data = $request->all();
        $isSavedPreviously = $request->get('saved_previously');

        try {
            foreach ($data['student_id'] as $key => $value) {
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
                        'user_id' => $studentAttendanceRecord['user_id'],
                        'group_id' => $studentAttendanceRecord['group_id'],
                        'date' => $studentAttendanceRecord['date']
                    ],
                    [
                        'is_present' => $studentAttendanceRecord['is_present'],
                        'late_entry_by_minutes' => $studentAttendanceRecord['late_entry_by_minutes'],
                        'early_leave_by_minutes' => $studentAttendanceRecord['early_leave_by_minutes'],
                        'is_leave_uninformed' => $studentAttendanceRecord['is_leave_uninformed'],
                        'remark' => $studentAttendanceRecord['remark'],
                        'created_by_id' => $studentAttendanceRecord['created_by_id']

                    ]
                );
            }
        } catch (\Exception $e) {
            return response()->json(["status" => "error", "errors" => $e->getMessage()], 422);
        }
        return response()->json(["status" => "success"], 200);
    }


    function getGroupStudentsAttendance(Request $request)
    {
        $groupId = $request->get('groupId');
        $date = $request->get('date');
        $studentsAttendance = StudentAttendance::where('group_id', $groupId)->where('date', $date)->get();
        return response()->json(["studentsAttendance" => $studentsAttendance], 200);
    }

    function showProfile(
        $student_id
    ) {
        return Inertia::render('Modules/Student/ManageStudentProfile', [
            'studentId' => $student_id,
        ]);
    }

    function verifyStudentFeesReceipt($verification_code)
    {
        $verification_code_exploded = explode('C', substr($verification_code, 10));
        $student_id = $verification_code_exploded[0];
        $verification_code = $verification_code_exploded[1];
        $verification_code_exploded = explode('S', $verification_code);
        $transaction_id = $verification_code_exploded[0];
        $verification_code = $verification_code_exploded[1];
        $verification_code_exploded = explode('L', $verification_code);
        $amount = $verification_code_exploded[0];
        $verification_code = $verification_code_exploded[1];
        $verification_code_exploded = explode('A', $verification_code);
        $year = $verification_code_exploded[0];
        $verification_code = $verification_code_exploded[1];
        $verification_code_exploded = explode('B', $verification_code);
        $month = $verification_code_exploded[0];
        $day = $verification_code_exploded[1];

        // echo $student_id;
        // echo $transaction_id;
        // echo $amount;
        // echo $year;
        // echo $month;
        // echo $day;
        $verification_response_data = [];

        try {
            $prepared_payment_date = date_create($year . '-' . $month . '-' . $day);


            if ($prepared_payment_date) {
                $payment_date_start = date_format($prepared_payment_date, "Y-m-d") . "  00:00:00";
                $payment_date_end = date_format($prepared_payment_date, "Y-m-d") . "  23:59:59";

                $studentFeeCondition = ['student_id' =>  $student_id, 'transaction_id' => $transaction_id, 'fee_amount' => $amount];

                //print_r($studentFeeCondition);

                $isStudentFeeRecordFound = StudentFee::where($studentFeeCondition)->whereBetween('payment_date', [$payment_date_start, $payment_date_end])->count();


                $verification_response_data['is_fee_verified'] = $isStudentFeeRecordFound ? true : false;

                if ($isStudentFeeRecordFound) {
                    $studentDetails =  User::select('id', 'name', 'email')->with(['studentDetails' => function ($query) {
                        $query->select('user_id', 'fname', 'course_id', 'profile_pic', 'doj', 'mobile_number_1', 'mobile_number_2', 'portfolio_link', 'is_record_update_remaining', 'course_fee_amount', 'course_fee_concession', 'amount_paid');
                    }])->where(['id' => $student_id])->first()->toArray();
                    $verification_response_data['studentDetails'] = $studentDetails;
                }
            } else {
                // echo "Fee record not found";
                $verification_response_data['is_fee_verified'] = false;
            }
        } catch (\Exception $e) {
            // echo "Error while fetching data";
            $verification_response_data['is_fee_verified'] = false;
        }



        return Inertia::render('Modules/Student/VerifyStudentFeeReceipt', [
            'verificationResponseData' => $verification_response_data,
        ]);
    }
}
