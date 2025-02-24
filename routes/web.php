<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AccessController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\QRCodeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ResourceMaterialController;
use Inertia\Inertia;
use Auth as Auth;

Route::get('/', function () {


    if (Auth::check()) {

        if (Auth::user()->role_id == 1) {
            return redirect()->route('admin.dashboard');
        } elseif (Auth::user()->role_id == 2) {
            return redirect()->route('teacher.dashboard');
        } elseif (Auth::user()->role_id == 3) {
            return redirect()->route('student.dashboard');
        }
        // return redirect()->route('admin.dashboard');
    } else {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'author_name' => "Vishnu Rajoria",
        ]);
    }
});
Route::get('/linkstorage', function () {
    Artisan::call('storage:link');
});



Route::post("view-image", [ImageController::class, "viewImage"])->name("view.image");
Route::get("test-email", [EmailController::class, "testEmail"])->name("test.email");

// Route::get("profile-pic-policy",[PolicyController:class])

Route::prefix("admin")->middleware(['auth', 'verified', 'verify.access.control'])->group(function () {


    Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/access-control', [AccessController::class, 'index'])->name('admin.access_control');
    Route::post('/save-access-control-routes', [AccessController::class, 'store'])->name('admin.save_access_control_routes');

    Route::get('/manage-students', [StudentController::class, "manageStudents"])->name("manage.students");
    Route::get('/manage-groups', [GroupController::class, "manageGroups"])->name("manage.groups");
    Route::get('/register-student', [StudentController::class, 'register'])->name('admin.register.student');
});

Route::middleware(['auth', 'verified', 'verify.access.control'])->group(function () {
    Route::get('/resource-material', [ResourceMaterialController::class, 'manageResourceMaterial'])->name('manage.resource.material');
    Route::get('/resource-material/add-new', [ResourceMaterialController::class, 'resourceMaterialFrom'])->name('resource.material.from');
    Route::post('/save-resource-material', [ResourceMaterialController::class, 'saveResourceMaterial'])->name('save.resource.material');
});
Route::prefix("group")->middleware(['auth', 'verified', 'verify.access.control'])->group(function () {
    Route::get('/{group_id}', [GroupController::class, 'viewGroupInfo'])->name('view.group.info');

    Route::get('/{group_id}/mark-attendance/{date}', [GroupController::class, 'displayMarkAttendanceForm'])->name('mark.student.attendance.form');

    Route::post('/get-user-notifications', [NotificationController::class, 'getNotification'])->name('get.user.notification');
    Route::post('/mark-notification-as-seen', [NotificationController::class, 'markNotificationAsSeen'])->name('mark.notification.as.seen');
    Route::post("/accept-profile-pic-change", [NotificationController::class, 'handleNotificationAction'])->name('accept.profile.pic.change');
    Route::post("/reject-profile-pic-change", [NotificationController::class, 'handleNotificationAction'])->name('reject.profile.pic.change');
    Route::post("/send-mail-for-change-user-email", [EmailController::class, 'sendMailForChangeUserEmail'])->name('send.mail.for.change.user.email');
    Route::post("/change-user-email", [ProfileController::class, 'changeUserEmail'])->name('change.user.email');
});

Route::get('/api/verify-student-fees-receipt/{verification_code}', [StudentController::class, 'verifyStudentFeesReceipt'])->name('api.verify.student.fees.receipt');


Route::prefix("api")->middleware(['auth', 'verified', 'verify.access.control'])->group(function () {



    // API for course module
    Route::get('/get-courses', [CourseController::class, "getCourses"])->name("api.get.courses");

    // API for students module
    Route::get('/get-students/{group_id?}', [StudentController::class, "getStudents"])->name("api.get.students");

    Route::get('/get-student-details/{student_id?}', [StudentController::class, "getStudentDetails"])->name("api.get.student.details");
    Route::get('/get-student-fees-history/{student_id?}', [StudentController::class, "getStudentFeesHistory"])->name("api.get.student.fees.history");


    Route::get('/get-group-student-attendance/{user_id}/{group_id}', [StudentController::class, "getGroupStudentAttendance"])->name("api.get.group.student.attendance");

    Route::post('/save-student', [StudentController::class, 'save'])->name('api.save.student');
    Route::post('/save-student-fees-record', [StudentController::class, 'saveStudentFees'])->name('api.save.student.fees');
    Route::post('/download-student-fees-pdf', [StudentController::class, 'downloadStudentFeesPdf'])->name('api.download.student.fees.pdf');




    Route::post('/save-students-attendance', [StudentController::class, 'saveStudentsAttendance'])->name('api.save.students.attendance');

    // API for group module

    Route::get('/get-groups', [GroupController::class, "getGroups"])->name("api.get.groups");

    Route::post('/save-group', [GroupController::class, 'saveStudentGroup'])->name('api.save.group');

    Route::post('/assign-students-to-group', [GroupController::class, 'assignStudentsToGroup'])->name('api.assign.students.to.group');

    Route::post('/get-group-students-attendance', [StudentController::class, 'getGroupStudentsAttendance'])->name('api.get.group.students.attendance');


    // APi code Qr code
    // Route::get('generate-qr-code', [QRCodeController::class, 'geneateQrCode'])->name('generate.qr.code');


    Route::post('/update-profile-pic', [StudentController::class, 'updateProfilePic'])->name('api.update.profile.pic');

    Route::post('/getMonthlyStudentRegistration', [StudentController::class, "getMonthlyRegistrationReport"])->name("get.monthly.registration.report");
});

Route::get('api/generate-qr-code', [QRCodeController::class, 'geneateQrCode'])->name('generate.qr.code');


Route::prefix("student")->middleware(['auth', 'verified', 'verify.access.control'])->group(function () {
    Route::get('/dashboard', [StudentController::class, 'index'])->name('student.dashboard');
    Route::get('/{student_id}/profile', [StudentController::class, 'showProfile'])->name('student.profile');
    Route::get('/{student_id}/fees-history', [StudentController::class, 'showFeeHistory'])->name('student.fees.history');


    Route::get('/resource-material', [ResourceMaterialController::class, 'showResourceMaterial'])->name('student.resource.material');
});


Route::prefix("teacher")->middleware(['auth', 'verified', 'verify.access.control'])->group(function () {
    Route::get('/dashboard', [TeacherController::class, 'index'])->name('teacher.dashboard');
});

Route::get('/test', function () {
    return view("test");
})->middleware(['verify.access.control'])->name("test");

// Route::middleware('auth')->group(function () {
//     Route::get('/broadcast-notification', EventBroadcastController::class,'broadcastNotification')->name('broadcast.notification');
// });


Route::get('/unauthorized', [AccessController::class, 'unauthorizedUser'])->name('unauthorized');



Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/upload-profile-pic', [ProfileController::class, 'uploadProfilePic'])->name('profile.uploadpic');
});




require __DIR__ . '/auth.php';
