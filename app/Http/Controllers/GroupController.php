<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GroupController extends Controller
{
    function saveStudentGroup(Request $request)
    {
        $groupCreationDate = $request->get('date');
        $groupName = $request->get('name');
        $selectedStudentId = [];
       
        if($request->get('selected-students-id'))
        {
            $selectedStudentId = json_decode($request->get('selected-students-id'));
        }
        if($request->hasFile('profile_pic'))
        {
            $groupIcon = $request->file('profile_pic');
        }
        else{
            echo "No Group icon";
        }
        



    }
}
