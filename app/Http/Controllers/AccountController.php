<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AccountController extends Controller
{
    public function index()
    {
        return inertia('account');
    }

    public function profileDetails()
    {
        $user = Auth::user();

        $validated = request()->validate([
            'name' => ['bail', 'required', 'string', 'min:1', 'max:50', 'regex:/^[A-Za-z0-9 _-]+$/'],
            'username' => [
                'bail',
                'required',
                'string',
                'min:6',
                'max:50',
                'regex:/^[A-Za-z0-9_-]+$/',
                Rule::unique('users', 'username')->ignore($user->id),
            ],
        ]);

        $user->update($validated);

        return back()->with('flashMessage', [
            'type' => 'success',
            'text' => 'Your profile details have been updated.',
        ]);
    }
}
