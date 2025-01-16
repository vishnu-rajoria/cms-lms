<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DbRecordUpdate extends Model
{
    protected $table = 'db_record_updates';
    protected $fillable = [
        'created_by_user_id',
    ];
}
