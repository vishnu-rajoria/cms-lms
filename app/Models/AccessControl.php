<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessControl extends Model
{
    //

    protected $fillable = [
        'uri',
        'methods',
        'admin',
        'teacher',
        'student',
        'created_at'
    ];

}
