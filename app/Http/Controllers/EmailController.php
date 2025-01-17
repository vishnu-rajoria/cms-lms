<?php

namespace App\Http\Controllers;

use App\Mail\TestEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
// use Resend\Laravel\Facades\Resend;


class EmailController extends Controller
{
    public function testEmail(Request $request)
    {
        Mail::to("vishnurajoria18@gmail.com")->send(new TestEmail());
        return "Email Sent";

        // return view('mail.test-mail');
    }
}
