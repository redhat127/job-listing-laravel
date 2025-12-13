<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class OnboardingController extends Controller
{
    public function get()
    {
        $onBoardingCompleted = Auth::user()->onboarding_completed;

        if ($onBoardingCompleted) {
            return redirect()->route('home');
        }

        return inertia('onboarding');
    }
}
