<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AccessController;
use App\Http\Controllers\CourseController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'author_name' => "Vishnu Rajoria",
       
    ]);
})->middleware(['guest']);



Route::prefix("admin")->middleware(['auth', 'verified','verify.access.control'])->group(function(){


        Route::get('/dashboard',[AdminController::class,'index'])->name('admin.dashboard');
        Route::get('/access-control',[AccessController::class,'index'])->name('admin.access_control');
        Route::post('/save-access-control-routes',[AccessController::class,'store'])->name('admin.save_access_control_routes');

        Route::get('/manage-students',[StudentController::class,"manageStudents"])->name("manage.students");
        Route::get('/manage-groups',[GroupController::class,"manageGroups"])->name("manage.groups");
        Route::get('/register-student',[StudentController::class,'register'])->name('admin.register.student');


});

Route::prefix("group")->middleware(['auth', 'verified','verify.access.control'])->group(function(){
    Route::get('/{group_id}',[GroupController::class,'viewGroupInfo'])->name('view.group.info');

    Route::get('/{group_id}/mark-attendance/{date}',[GroupController::class,'displayMarkAttendanceForm'])->name('mark.student.attendance.form');

});




Route::prefix("api")->middleware(['auth', 'verified','verify.access.control'])->group(function(){

    // API for course module
        Route::get('/get-courses',[CourseController::class,"getCourses"])->name("api.get.courses");

    // API for students module
        Route::get('/get-students/{group_id?}',[StudentController::class,"getStudents"])->name("api.get.students");
        
        Route::get('/get-student-details/{student_id?}',[StudentController::class,"getStudentDetails"])->name("api.get.student.details");
        
        Route::get('/get-group-student-attendance/{user_id}/{group_id}',[StudentController::class,"getGroupStudentAttendance"])->name("api.get.group.student.attendance");

        Route::post('/save-student',[StudentController::class,'save'])->name('api.save.student');
            
        Route::post('/save-students-attendance',[StudentController::class,'saveStudentsAttendance'])->name('api.save.students.attendance');
    
    // API for group module

        Route::get('/get-groups',[GroupController::class,"getGroups"])->name("api.get.groups");
     
        Route::post('/save-group',[GroupController::class,'saveStudentGroup'])->name('api.save.group');

        Route::post('/assign-students-to-group',[GroupController::class,'assignStudentsToGroup'])->name('api.assign.students.to.group');

        Route::post('/get-group-students-attendance',[StudentController::class,'getGroupStudentsAttendance'])->name('api.get.group.students.attendance');
});




Route::prefix("student")->middleware(['auth', 'verified','verify.access.control'])->group(function(){
    Route::get('/dashboard',[StudentController::class,'index'])->name('student.dashboard');
    Route::get('/profile/{student_id}',[StudentController::class,'showProfile'])->name('student.profile');
    

});


Route::prefix("teacher")->middleware(['auth', 'verified','verify.access.control'])->group(function(){
    Route::get('/dashboard',[TeacherController::class,'index'])->name('teacher.dashboard');
});

Route::get('/test',function(){
    return view("test");
})->middleware(['verify.access.control'])->name("test");

// Route::middleware('auth')->group(function () {
//     Route::get('/broadcast-notification', EventBroadcastController::class,'broadcastNotification')->name('broadcast.notification');
// });


Route::get('/unauthorized',[AccessController::class,'unauthorizedUser'])->name('unauthorized');



Route::middleware('auth')->group(function () {
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/upload-profile-pic', [ProfileController::class, 'uploadProfilePic'])->name('profile.uploadpic');
});




require __DIR__.'/auth.php';
