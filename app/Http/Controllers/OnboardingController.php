<?php

namespace App\Http\Controllers;

class OnboardingController extends Controller
{
    public function get()
    {
        return inertia('onboarding');
    }
}
