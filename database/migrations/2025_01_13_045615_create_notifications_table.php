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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->text('message');
            $table->text('thumbnail_image')->nullable();
            $table->text('stringified_actions')->nullable();
            $table->foreignId('sender_user_id')->nullable()->references('id')->on('users');
            $table->foreignId('recipient_user_id')->nullable()->references('id')->on('users');
            $table->timestamp('seen_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
