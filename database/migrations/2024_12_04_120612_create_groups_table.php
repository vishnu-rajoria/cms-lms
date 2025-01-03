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
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('name',50);
            $table->string('group_icon')->nullable();
            $table->string('description')->nullable();
            $table->boolean("is_record_update_remaining")->default(false);
            $table->timestamps();
            $table->softDeletes('deleted_at',precision:0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
};
