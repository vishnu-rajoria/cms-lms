<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Group extends Model
{
    protected $fillable = [
        'name',
        'date',
        'description',
        'group_icon'
    ];

    public function students(): HasMany
    {
        return $this->hasMany(StudentsOfGroup::class,'group_id','id');
    }

}   
