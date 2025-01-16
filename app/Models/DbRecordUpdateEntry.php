<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DbRecordUpdateEntry extends Model
{
    protected $table = 'db_record_update_entries';

    protected $fillable = [
        'db_record_update_id',
        'table_name',
        'stringified_conditional_columns_and_values',
        'stringified_record_entries',
        'created_at',
    ];
}
