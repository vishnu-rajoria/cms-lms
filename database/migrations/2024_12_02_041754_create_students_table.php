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
            $table->string('fname', 50);
            $table->string('mname', 50)->nullable();
            $table->date('dob');
            $table->unsignedTinyInteger('gender')->nullable();
            $table->foreignId('course_id')->constrained();
            $table->timestamp('course_verified_at')->nullable();
            $table->string('profile_pic')->nullable();
            $table->timestamp('profile_pic_verified_at')->nullable();
            $table->string('signature_pic')->nullable();
            $table->timestamp('signature_pic_verified_at')->nullable();
            $table->string('school_college', 100);
            $table->string('subject_branch', 50);
            $table->string('permanent_address_line1', 70);
            $table->string('permanent_address_line2', 70)->nullable();
            $table->string('permanent_address_landmark', 50)->nullable();
            $table->string('permanent_address_city', 50);
            $table->string('permanent_address_state', 50);
            $table->string('permanent_address_pincode', 10);
            $table->timestamp('permanent_address_verified_at')->nullable();
            $table->string('current_address_line1', 70);
            $table->string('current_address_line2', 70)->nullable();
            $table->string('current_address_landmark', 50)->nullable();
            $table->string('current_address_city', 50);
            $table->string('current_address_state', 50);
            $table->string('current_address_pincode', 10);
            $table->timestamp('current_address_verified_at')->nullable();
            $table->string("mobile_number_1", 15)->nullable();
            $table->timestamp('mobile_number_1_verified_at')->nullable();
            $table->string("mobile_number_2", 15)->nullable();
            $table->timestamp('mobile_number_2_verified_at')->nullable();
            $table->string("portfolio_link", 255)->nullable();
            $table->integer("course_fee_amount")->default(45000);
            $table->integer("course_fee_concession")->default(0);
            $table->integer("amount_paid")->default(0);
            $table->boolean("is_record_update_remaining")->default(false);
            $table->timestamps();
            $table->softDeletes('deleted_at', 0);
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
