<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class OnboardingController extends Controller
{
    public function get()
    {
        $userHasCompany = Auth::user()->company()->exists();

        if ($userHasCompany) {
            return redirect()->route('home');
        }

        return inertia('onboarding');
    }
}
