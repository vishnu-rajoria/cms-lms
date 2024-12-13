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
        Schema::create('access_control', function (Blueprint $table) {
            $table->id();
            $table->string('uri');
            $table->string('methods');
            $table->boolean('adminCanAccess')->default(false);
            $table->boolean('teacherCanAccess')->default(false);
            $table->boolean('studentCanAccess')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('access_control');
    }
};
