<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobSeekerController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\RegisterController;
use App\Http\Middleware\OnboardingMiddleware;
use App\Http\Middleware\TurnstileMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware([OnboardingMiddleware::class])->group(function () {
    Route::get('/', function () {
        return inertia('home');
    })->name('home');
});

Route::middleware('guest')
    ->group(function () {
        Route::prefix('login')
            ->name('login.')
            ->controller(LoginController::class)
            ->group(function () {
                Route::get('/', 'get')->name('get');
                Route::post('/', 'post')->name('post')->middleware(TurnstileMiddleware::class);
                Route::get('/{provider}/redirect', 'redirect')->name('provider.redirect');
                Route::get('/{provider}/callback', 'callback')->name('provider.callback');
            });

        Route::prefix('register')
            ->name('register.')
            ->controller(RegisterController::class)
            ->group(function () {
                Route::get('/', 'get')->name('get');
                Route::post('/', 'post')->name('post')->middleware(TurnstileMiddleware::class);
            });
    });

Route::middleware('auth')
    ->group(function () {
        Route::prefix('logout')
            ->name('logout.')
            ->controller(LogoutController::class)
            ->group(function () {
                Route::post('/', 'post')->name('post');
            });

        Route::middleware([OnboardingMiddleware::class])->group(function () {
            Route::prefix('onboarding')
                ->name('onboarding.')
                ->controller(OnboardingController::class)
                ->group(function () {
                    Route::get('/', 'get')->name('get');
                });

            Route::prefix('company')
                ->name('company.')
                ->controller(CompanyController::class)
                ->group(function () {
                    Route::post('/', 'store')->name('store')
                        ->withoutMiddleware(OnboardingMiddleware::class)
                        ->middleware(TurnstileMiddleware::class);

                    Route::get('/job/create', 'jobCreate')->name('job.create');
                    Route::post('/job/create', 'jobStore')->name('job.store')
                        ->middleware(TurnstileMiddleware::class);

                    Route::get('/job/{jobId}/edit', 'jobEdit')->name('job.edit');
                    Route::post('/job/{jobId}/edit', 'jobUpdate')->name('job.update')
                        ->middleware(TurnstileMiddleware::class);

                    Route::get('/me', 'myCompany')->name('myCompany');
                });

            Route::prefix('job-seeker')
                ->name('jobSeeker.')
                ->controller(JobSeekerController::class)
                ->group(function () {
                    Route::post('/', 'post')->name('post')
                        ->withoutMiddleware(OnboardingMiddleware::class)
                        ->middleware(TurnstileMiddleware::class);
                });
        });
    });
