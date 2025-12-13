<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;

enum Provider: string
{
    case github = 'github';
    case google = 'google';
}

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
            return $this->finishLogin();
        }

        throw ValidationException::withMessages([
            'email' => 'email or password is wrong.',
        ]);
    }

    public function redirect(Provider $provider)
    {
        $provider = $provider->value;

        return Socialite::driver($provider)->redirect();
    }

    public function callback(Provider $provider)
    {
        try {
            $provider = $provider->value;

            $socialiteUser = collect(Socialite::driver($provider)->user())
                ->only([
                    'name',
                    'email',
                    'avatar',
                ])->all();

            $existingUser = User::where('email', $socialiteUser['email'])->first();

            if (! $existingUser) {
                $newUser = User::create([
                    ...$socialiteUser,
                    'username' => User::generateUsername(),
                    // 'email_verified_at' => now(), => REVISIT: Decide whether to auto-verify email now or send verification link
                    'provider' => $provider,
                ]);
            }

            $user = $existingUser ?? $newUser;

            Auth::login($user, true);

            return $this->finishLogin();
        } catch (ClientException $exception) {
            logger()->error($exception->getMessage());

            return redirect()->route('login.get')
                ->with('flashMessage', [
                    'type' => 'error',
                    'text' => 'Authentication failed. Please try again.',
                ]);
        } catch (InvalidStateException $exception) {
            logger()->error($exception->getMessage());

            return redirect()->route('login.get')
                ->with('flashMessage', [
                    'type' => 'error',
                    'text' => 'Session expired or invalid. Please try again.',
                ]);
        } catch (Exception $exception) {
            logger()->error($exception->getMessage());

            return redirect()->route('login.get')
                ->with('flashMessage', [
                    'type' => 'error',
                    'text' => 'Something went wrong. Please try again.',
                ]);
        }
    }

    private function finishLogin()
    {
        request()->session()->regenerate();

        return redirect()->intended()
            ->with('flashMessage', [
                'type' => 'success',
                'text' => 'You are logged in.',
            ]);
    }
}
