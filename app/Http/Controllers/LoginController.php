<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function get()
    {
        return inertia('login');
    }

    public function post()
    {
        $validated = request()->validate([
            'email' => ['bail', 'required', 'string', 'email', 'max:50'],
            'password' => ['bail', 'required', 'string', 'min:1', 'max:50'],
            'remember_me' => ['bail', 'required', 'boolean'],
        ]);

        $data = collect($validated)->except('remember_me')->all();

        if (Auth::attempt($data, $validated['remember_me'])) {
            request()->session()->regenerate();

            return redirect()->intended()
                ->with('flashMessage', [
                    'type' => 'success',
                    'text' => 'You are logged in.',
                ]);
        }

        throw ValidationException::withMessages([
            'email' => 'email or password is wrong.',
        ]);
    }
}
