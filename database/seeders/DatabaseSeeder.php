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
        ]);

        DB::table('roles')->insert([
            'id' => 2,            
            'name' => 'teacher',
        ]);

        DB::table('roles')->insert([
            'id' => 3,
            'name' => 'student',
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

        
    }
}
