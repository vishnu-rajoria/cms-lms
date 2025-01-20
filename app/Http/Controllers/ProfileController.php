<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Illuminate\Support\Carbon;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        //role_id --> admin : 1 | teacher : 2 | student : 3


        $role_id = Auth::user()->role_id;
        $role = "student";

        if ($role_id == 1) {
            $role = "admin";
        } elseif ($role_id == 2) {
            $role = "teacher";
        }


        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'role' => $role,
        ]);
    }
    public function changeUserEmail(Request $request)
    {
        // return $request->all();
        // return response()->json(["status" => "success", "message" => "Email updated successfully"], 200);
        $newEmail = $request->new_email;
        $user_id = $request->user_id;
        $loggedInUserId = Auth::user()->id;
        if ($user_id == $loggedInUserId) {
            User::where('id', $user_id)->update(['email' => $newEmail, "email_verified_at" => Carbon::now()]);
            return response()->json(["status" => "success", "message" => "Email updated successfully"], 200);
        } else {
            return response()->json(["status" => "error", "message" => "You are not authorized to change this user's email"], 302);
        }
    }
    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Upload profile pic for the  account.
     */

    public function uploadProfilePic(Request $request)
    {
        print_r($request->all()['files']);
    }
}
