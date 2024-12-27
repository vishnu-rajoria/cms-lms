<?php

namespace Database\Seeders;

use App\Models\User;
// use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        DB::table('roles')->insert([
            'id' => 1,
            'name' => 'admin',
            'created_by_user_id' => 1

        ]);

        DB::table('roles')->insert([
            'id' => 2,            
            'name' => 'teacher',
            'created_by_user_id' => 1

        ]);

        DB::table('roles')->insert([
            'id' => 3,
            'name' => 'student',
            'created_by_user_id' => 1

        ]);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'role_id' => 1. 
        ]);
        User::factory()->create([
            'name' => 'Teacher',
            'email' => 'teacher@example.com',
            'role_id' => 2
        ]);
        User::factory()->create([
            'name' => 'Student',
            'email' => 'student@example.com',
            'role_id' => 3 
        ]);

        DB::table('courses')->insert([
            'id' => 1,
            'name' => 'web design',
            'slug' => 'web-design',
            'fee_amount' => 35000,
            'created_by_user_id' => 1
        ]);

        DB::table('courses')->insert([
            'id' => 2,
            'name' => 'Full Stack Web Development',
            'slug' => 'full-stack-web-development',
            'fee_amount' => 60000,
            'created_by_user_id' => 1,
        ]);

        DB::table('courses')->insert([
            'id' => 3,
            'name' => 'Python',
            'slug' => 'python',
            'fee_amount' => 30000,
            'created_by_user_id' => 1,
        ]);

    
        $data = [
            [
                'id' => 1,
                'uri' => 'admin/dashboard',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-11-18 03:11:50',
                'updated_at' => null
            ],
            [
                'id' => 2,
                'uri' => 'admin/access-control',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-11-18 03:11:50',
                'updated_at' => null
            ],
            [
                'id' => 3,
                'uri' => 'admin/save-access-control-uris',
                'methods' => '["POST"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-11-18 03:11:50',
                'updated_at' => null
            ],
            [
                'id' => 4,
                'uri' => 'student/dashboard',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 0,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 1,
                'created_at' => '2024-11-18 03:11:50',
                'updated_at' => null
            ],
            [
                'id' => 5,
                'uri' => 'teacher/dashboard',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 0,
                'teacherCanAccess' => 1,
                'studentCanAccess' => 0,
                'created_at' => '2024-11-18 03:11:50',
                'updated_at' => null
            ],
            [
                'id' => 6,
                'uri' => 'test',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-11-18 03:13:24',
                'updated_at' => null
            ],
            [
                'id' => 7,
                'uri' => 'admin/manage-students',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-11-18 10:09:03',
                'updated_at' => null
            ],
            [
                'id' => 8,
                'uri' => 'admin/get-students',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-11-22 11:07:08',
                'updated_at' => null
            ],
            [
                'id' => 9,
                'uri' => 'api/get-students',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-11-23 03:08:37',
                'updated_at' => null
            ],
            [
                'id' => 10,
                'uri' => 'admin/register-student',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-11-23 04:14:20',
                'updated_at' => null
            ],
            [
                'id' => 11,
                'uri' => 'api/save-student',
                'methods' => '["POST"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-11-30 21:11:04',
                'updated_at' => null
            ],
            [
                'id' => 12,
                'uri' => 'upload-profile-pic',
                'methods' => '["POST"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 1,
                'studentCanAccess' => 1,
                'created_at' => '2024-11-30 21:11:04',
                'updated_at' => null
            ],
            [
                'id' => 13,
                'uri' => 'api/get-students/{type?}',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-12-04 03:35:44',
                'updated_at' => null
            ],
            [
                'id' => 14,
                'uri' => 'api/save-group',
                'methods' => '["POST"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-12-12 11:13:39',
                'updated_at' => null
            ],
            [
                'id' => 15,
                'uri' => 'broadcasting/auth',
                'methods' => '["GET","POST","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 1,
                'studentCanAccess' => 1,
                'created_at' => '2024-12-12 11:13:39',
                'updated_at' => null
            ],
            [
                'id' => 16,
                'uri' => 'admin/manage-groups',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-12-14 05:30:32',
                'updated_at' => null
            ],
            [
                'id' => 17,
                'uri' => 'api/get-groups/{type?}',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-12-14 06:18:08',
                'updated_at' => null
            ],
            [
                'id' => 18,
                'uri' => 'group/{group_id}',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-12-17 06:27:02',
                'updated_at' => null
            ],
            [
                'id' => 19,
                'uri' => 'group/{group_id?}',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-12-17 06:42:40',
                'updated_at' => null
            ],
            [
                'id' => 20,
                'uri' => 'api/get-students/{group_id?}',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-12-17 09:28:44',
                'updated_at' => null
            ],
            [
                'id' => 21,
                'uri' => 'api/save-students-attendance',
                'methods' => '["POST"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-12-20 06:15:58',
                'updated_at' => null
            ],
            [
                'id' => 22,
                'uri' => 'api/get-group-students-attendance',
                'methods' => '["POST"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 1,
                'studentCanAccess' => 1,
                'created_at' => '2024-12-20 22:18:17',
                'updated_at' => null
            ],
            [
                'id' => 23,
                'uri' => 'group/{group_id}/mark-attendance/{date}',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-12-22 06:24:12',
                'updated_at' => null
            ],
            [
                'id' => 24,
                'uri' => 'student/profile/{student_id}',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-12-23 04:54:26',
                'updated_at' => null
            ],
            [
                'id' => 25,
                'uri' => 'api/get-student-details/{student_id?}',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 1,
                'studentCanAccess' => 1,
                'created_at' => '2024-12-23 05:15:44',
                'updated_at' => null
            ],
            [
                'id' => 26,
                'uri' => 'api/get-group-student-attendance/{user_id}/{group_id}',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 1,
                'studentCanAccess' => 1,
                'created_at' => '2024-12-23 11:23:11',
                'updated_at' => null
            ],
            [
                'id' => 27,
                'uri' => 'api/assign-students-to-group',
                'methods' => '["POST"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-12-24 05:57:05',
                'updated_at' => null
            ],
            [
                'id' => 28,
                'uri' => 'api/get-groups',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 1,
                'studentCanAccess' => 1,
                'created_at' => '2024-12-24 06:17:36',
                'updated_at' => null
            ],
            [
                'id' => 29,
                'uri' => 'api/get-courses',
                'methods' => '["GET","HEAD"]',
                'adminCanAccess' => 1,
                'teacherCanAccess' => 0,
                'studentCanAccess' => 0,
                'created_at' => '2024-12-27 04:39:40',
                'updated_at' => null
            ],
        ];

        DB::table('access_control')->insert($data);
    }
}
