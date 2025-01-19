<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Imagick;

class ImageController extends Controller
{
    function viewImage(Request $request)
    {

        $imageUrl = $request->imageUrl;
        $imageUrl = str_replace("md/md-", "original/", $imageUrl);
        return "<div style='display: flex; justify-content: center; align-items: center; background:#000; width:100%; height:100%;'><img src='$imageUrl' /></div>";
    }
}
