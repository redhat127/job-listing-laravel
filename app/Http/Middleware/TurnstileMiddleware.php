<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class TurnstileMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($this->shouldSkipVerification()) {
            return $next($request);
        }

        $validator = validator($request->only(['turnstile-token']), [
            'turnstile-token' => ['bail', 'required', 'string', 'max:2048'],
        ], [
            'turnstile-token.required' => 'Security verification is required.',
            'turnstile-token.string' => 'Invalid security token format.',
            'turnstile-token.max' => 'Security token is too long.',
        ]);

        if ($validator->fails()) {
            return back()->with('flashMessage', [
                'type' => 'error',
                'text' => $validator->errors()->first(),
            ]);
        }

        $token = $validator->validated()['turnstile-token'];

        try {
            $verificationResult = $this->verifyToken($token, $request->ip());

            if (! $verificationResult['success']) {
                return $this->handleVerificationFailure($verificationResult);
            }

            return $next($request);
        } catch (\Exception $e) {
            Log::error('Turnstile verification error', [
                'message' => $e->getMessage(),
                'ip' => $request->ip(),
            ]);

            return back()->with('flashMessage', [
                'type' => 'error',
                'text' => 'Security verification failed. Please try again.',
            ]);
        }
    }

    private function verifyToken(string $token, ?string $ip): array
    {
        $response = Http::timeout(10)
            ->asForm()
            ->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
                'secret' => config('services.turnstile.secret'),
                'response' => $token,
                'remoteip' => $ip,
            ]);

        if ($response->failed()) {
            throw new \RuntimeException('Failed to connect to Cloudflare verification service.');
        }

        return $response->json();
    }

    private function handleVerificationFailure(array $result): \Illuminate\Http\RedirectResponse
    {
        $errorCodes = $result['error-codes'] ?? [];

        Log::warning('Turnstile verification failed', [
            'error_codes' => $errorCodes,
            'hostname' => $result['hostname'] ?? null,
        ]);

        $message = $this->getErrorMessage($errorCodes);

        return back()->with('flashMessage', [
            'type' => 'error',
            'text' => $message,
        ]);
    }

    private function getErrorMessage(array $errorCodes): string
    {
        if (empty($errorCodes)) {
            return 'Security verification failed. Please try again.';
        }

        $errorMap = [
            'missing-input-secret' => 'Security configuration error. Please contact support.',
            'invalid-input-secret' => 'Security configuration error. Please contact support.',
            'missing-input-response' => 'Security verification token is missing.',
            'invalid-input-response' => 'Security verification token is invalid or has expired.',
            'bad-request' => 'Invalid verification request. Please refresh and try again.',
            'timeout-or-duplicate' => 'Security token has expired or been used. Please try again.',
        ];

        $firstError = $errorCodes[0];

        return $errorMap[$firstError] ?? 'Security verification failed. Please try again.';
    }

    private function shouldSkipVerification(): bool
    {
        if (app()->environment('local') && config('services.turnstile.skip_local')) {
            return true;
        }

        if (app()->environment('testing')) {
            return true;
        }

        return false;
    }
}
