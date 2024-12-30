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
        Schema::create('student_fees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->references('id')->on('users');
            $table->foreignId('transaction_id')->references('id')->on('transactions');
            $table->timestamp('payment_date');
            $table->integer('fee_amount');
            $table->enum('fee_mode', ['card', 'intb', 'neft', 'rtgs', 'upi', 'cash', 'chq', 'dd', 'other']);
            $table->timestamps();
            $table->softDeletes('deleted_at', 0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_fees');
    }
};
