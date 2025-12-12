<?php

namespace App\Http\Controllers;

use App\Models\User;

class RegisterController extends Controller
{
    public function get()
    {
        return inertia('register');
    }

    public function post()
    {
        $validated = request()->validate([
            'name' => ['bail', 'required', 'string', 'min:3', 'max:50', 'regex:/^[a-zA-Z0-9\-_ ]+$/'],
            'email' => ['bail', 'required', 'string', 'email', 'max:50', 'unique:users,email'],
            'password' => ['bail', 'required', 'string', 'min:10', 'max:50'],
        ]);

        $user = User::create([
            ...$validated,
            'username' => User::generateUsername(),
        ]);

        if (! $user) {
            return redirect()->intended()
                ->with('flashMessage', [
                    'type' => 'error',
                    'text' => 'Failed to create user.',
                ]);
        }

        return redirect()->route('login.get')
            ->with('flashMessage', [
                'type' => 'success',
                'text' => 'You are registered.',
            ]);
    }
}
