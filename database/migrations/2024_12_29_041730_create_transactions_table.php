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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->timestamp('date');
            $table->integer('transaction_amount');
            $table->string('transaction_serial_number')->nullable();
            $table->enum('transaction_mode', ['card', 'intb', 'neft', 'rtgs', 'upi', 'cash', 'chq', 'dd', 'other']);
            $table->foreignId('sender_id')->nullable()->references('id')->on('users');
            $table->foreignId('receiver_id')->nullable()->references('id')->on('users');
            $table->string('external_sender')->nullable();
            $table->string('external_receiver')->nullable();
            $table->string('module_name')->nullable();
            $table->string('remark')->nullable();
            $table->timestamps();
            $table->softDeletes('deleted_at', 0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
