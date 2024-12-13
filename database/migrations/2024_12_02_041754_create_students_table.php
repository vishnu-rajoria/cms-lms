<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained();
            $table->date('doj');
            $table->string('fname',50);
            $table->string('mname',50)->nullable();
            $table->date('dob');
            $table->unsignedTinyInteger('gender')->nullable();
            $table->unsignedTinyInteger('course')->nullable();
            $table->string('profile_pic')->nullable();
            $table->string('signature_pic')->nullable();
            $table->string('school_college',100);
            $table->string('subject_branch',50);
            $table->string('permanent_address_line1',70);
            $table->string('permanent_address_line2',70)->nullable();
            $table->string('permanent_address_landmark',50)->nullable();
            $table->string('permanent_address_city',50);
            $table->string('permanent_address_state',50);
            $table->string('permanent_address_pincode',10);
            $table->string('current_address_line1',70);
            $table->string('current_address_line2',70)->nullable();
            $table->string('current_address_landmark',50)->nullable();
            $table->string('current_address_city',50);
            $table->string('current_address_state',50);
            $table->string('current_address_pincode',10);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
