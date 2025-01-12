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
        Schema::create('db_record_updates', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_record_update_remaining')->default(true);
            $table->foreignId('created_by_user_id')->nullable()->nullable()->references('id')->on('users');
            $table->foreignId('verified_by_user_id')->constrained('users');
            $table->boolean('is_batch_updates_successful')->default(false);
            $table->timestamps();
            $table->softDeletes('deleted_at', 0);
        });

        Schema::create('db_record_update_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('db_record_update_id')->constrained('db_record_updates');
            $table->string('table_name');
            $table->string('record_id_to_update');
            $table->text('stringified_record_entries'); // [column_name => value, old_value => "old value",new_value =>"new value"]
            $table->boolean('is_update_successful')->default(false);
            $table->timestamps();
            $table->softDeletes('deleted_at', 0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('db_record_updates');
        Schema::dropIfExists('db_record_update_entries');
    }
};
