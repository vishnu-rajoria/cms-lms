<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    
    public function index()
    {
        return Inertia::render('Teacher/Dashboard', [
            
            "module_name"=>"Teacher's Dashboard",
        ]);
    }
}
