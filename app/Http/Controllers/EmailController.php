<?php

namespace App\Http\Controllers;

use App\Mail\TestEmail;
// use Illuminate\Container\Attributes\Auth;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
// use Resend\Laravel\Facades\Resend;

use App\Mail\VerifyEmailChangeOTP;

class EmailController extends Controller
{
    public function testEmail(Request $request)
    {
        // Mail::to("vishnurajoria18@gmail.com")->send(new TestEmail());
        // return "Email Sent";

        return view('mail.test-mail');
    }

    public function sendMailForChangeUserEmail(Request $request)
    {
        // Auth::user()->update(['email' => $request->email]);
        // return $request->all();
        $newEmail = $request->new_email;
        $otp_code = $request->otp;
        $selectedUserId = $request->selected_user_id;
        $loggedInUserId = Auth::user()->id;
        if ($loggedInUserId == $selectedUserId) {
            // return "Saving email : $newEmail and otp is $otp";
            Mail::to($newEmail)->send(new VerifyEmailChangeOTP($otp_code));
            return response()->json(["status" => "success"], 200);
            // return view('mail.email-change-otp-mail');
        }
    }
}
