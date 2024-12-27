<?php

namespace App\Http\Controllers;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    function getCourses(Request $request)
    {
        $courses = Course::all()->where('deleted_at', null);
        return response()->json($courses);
    }
}
