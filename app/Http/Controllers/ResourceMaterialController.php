<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ResourceMaterialController extends Controller
{
    public function showResourceMaterial(Request $request)
    {
        return Inertia::render('Modules/ResourceMaterial/DisplayResourceMaterial', [
            "type" => "student",

        ]);
    }
}
