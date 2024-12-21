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
        Schema::create('student_attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('group_id')->constrained();
            $table->date('date');
            $table->boolean('is_present');
            $table->boolean('is_leave_uninformed')->default(false);
            $table->integer('late_entry_by_minutes')->default(0);
            $table->integer('early_leave_by_minutes')->default(0);
            $table->string('remark')->nullable();
            $table->foreignId('created_by_id')->constrained(
                table: 'users',
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_attendances');
    }
};
