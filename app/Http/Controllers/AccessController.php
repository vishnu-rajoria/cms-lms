<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use DB;
use Carbon\Carbon;


class AccessController extends Controller
{
    
    public function index()
    {

       $routesList = [];
       $exemptedRoutesList = [
        "sanctum/csrf-cookie|GET",
        "up|GET",
        "/|GET",
        "profile|GET",
        "profile|PATCH",
        "profile|DELETE",

        "register|GET",
        "register|POST",

        "login|GET",
        "login|POST",

        "forgot-password|GET",
        "forgot-password|POST",

        "reset-password/{token}|GET",
        
        "reset-password|GET",
        "reset-password|POST",

        "verify-email|GET",
        "verify-email/{id}/{hash}|GET",
        "email/verification-notification|GET",
        "email/verification-notification|POST",

        "confirm-password|GET",
        "confirm-password|POST",

        "password|PUT",

        "logout|POST",

        "storage/{path}|GET",
        "unauthorized|GET",
       ];
       foreach(Route::getRoutes() as $routeInfo)
       {
            if(!in_array($routeInfo->uri.'|'.$routeInfo->methods[0],$exemptedRoutesList))
            {
                $currentRoute = array();  
                $currentRoute['uri'] = $routeInfo->uri;
                $currentRoute['methods'] = $routeInfo->methods;
                $routesList[] = $currentRoute;
            }
       }

        return Inertia::render('Modules/AccessControl/Dashboard',[
            'routesList' =>  $routesList,
            'savedRoutesList' => DB::table("access_control")->get(),
        ]);
    }


    public function store(Request $request)
    {
       foreach($request->all() as $record)
       {
       
        $previousRecord = DB::table("access_control")->where('uri',$record['uri'])->first();

        
        if(!$previousRecord)
        {
            DB::table("access_control")->insert([
                'uri'       =>  $record['uri'],
                'methods'   =>  $record['methods'],
                'adminCanAccess'     =>  $record['adminCanAccess'],
                'teacherCanAccess'   =>  $record['teacherCanAccess'],
                'studentCanAccess'   =>  $record['studentCanAccess'],
                'created_at'   =>  Carbon::now()

            ]);
            
            
        }
        else{
            DB::table("access_control")->where('uri',$record['uri'])->where('methods',$record['methods'])->update([
                'adminCanAccess'     =>  $record['adminCanAccess'],
                'teacherCanAccess'   =>  $record['teacherCanAccess'],
                'studentCanAccess'   =>  $record['studentCanAccess'],
            ]);
        }
        
        
       }
       
       
       return to_route('admin.access_control');
    
    
    }


    public function unauthorizedUser()
    {
        return Inertia::render('UnauthorizedAccess',[
            'previousURL' => url()->previous()
        ]);
    }

    
}
