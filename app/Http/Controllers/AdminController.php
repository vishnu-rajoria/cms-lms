<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    //
    public function index()
    {
    //    echo "Hello";
     
    //    print_r($routesList);

       


        return Inertia::render('Admin/Dashboard',[
            
        ]);
    }
}
