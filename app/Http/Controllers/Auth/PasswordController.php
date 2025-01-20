<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
// use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Auth;
use DB;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request)
    {

        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $currentPassword = $request->current_password;
        $loggedInUserId = $request->user()->id;
        $requestFromUserId = $request->user_id;

        $savedUserDetails = DB::table('users')->select('password')->where('id', $loggedInUserId)->first();
        // echo $currentPassword;
        $isPasswordMatched = Hash::check($currentPassword, $savedUserDetails->password);

        if ($isPasswordMatched) {
            if ($requestFromUserId == $loggedInUserId) {
                $request->user()->update([
                    'password' => Hash::make($validated['password']),
                ]);
                return response()->json(['status' => 'success', 'message' => 'Password updated successfully'], 200);
            } else {
                return response()->json(['status' => 'error', 'message' => 'Not authorized'], 302);
            }
        } else {
            return response()->json(['status' => 'error', 'message' => 'Current password does not match'], 422);
        }
    }
}
