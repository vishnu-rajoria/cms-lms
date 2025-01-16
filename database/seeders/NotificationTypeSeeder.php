<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;
use Illuminate\Support\Carbon;

class NotificationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('notification_types')->insert([
            'name' => "profile pic change requested",
            'priority' => 1,
            'created_at' => Carbon::now(),
        ]);

        DB::table('notification_types')->insert([
            'name' => "password change requested",
            'priority' => 2,
            'created_at' => Carbon::now(),
        ]);

        DB::table('notification_types')->insert([
            'name' => "email change requested",
            'priority' => 3,
            'created_at' => Carbon::now(),
        ]);
    }
}
