<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use DB;
use Auth;

class VerifyAccessControl
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // echo "Verifying Access control";
        if(Auth::user() != null)
        {
        $roleId = Auth::user()->role_id;
       
        

        
        $userRole = 'student'; // Default role
        $currentURI =  Route::current()->uri;
        $fieldToVerifyInDB = "studentCanAccess";
        $fieldValueToVerifyInDB = 1;
        
        if($roleId == 1)
        {
            $userRole = "admin";
            $fieldToVerifyInDB = "adminCanAccess";
            
        }
        elseif($roleId == 2)
        {
            $userRole = "teacher";
            $fieldToVerifyInDB = "teacherCanAccess";

        }
        else{

            // Route::redirect("unauthorized");
        }

        $routeAccessInfo = DB::table('access_control')->where("uri",$currentURI)->where($fieldToVerifyInDB,$fieldValueToVerifyInDB)->first();

        if($routeAccessInfo)
        {
            return $next($request);
        }
        else{
        
            return redirect()->route("unauthorized");

        }
    }
    else{
        return redirect()->route("unauthorized");
    }
        
    }
}
