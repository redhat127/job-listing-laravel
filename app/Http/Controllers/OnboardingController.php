<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;

class OnboardingController extends Controller
{
    public function get()
    {
        $afterLogin = Session::get('after-login', false);

        if (! $afterLogin) {
            return redirect()->route('home');
        }

        Session::forget('after-login');

        return inertia('onboarding');
    }
}
