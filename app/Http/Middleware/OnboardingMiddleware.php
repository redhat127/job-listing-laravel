<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class OnboardingMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        // Short-circuit if user is not authenticated
        if (! $user) {
            return $next($request);
        }

        if ($user->onboarding_completed) {
            // If onboarding is complete, redirect away from onboarding pages
            if (request()->routeIs('onboarding.*')) {
                return redirect()->route('home');
            }

            return $next($request);
        }

        // If onboarding is NOT complete, only allow onboarding routes
        if (! request()->routeIs('onboarding.*')) {
            return redirect()->route('onboarding.get');
        }

        return $next($request);
    }
}
