<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('home');
})->name('home');

Route::middleware('guest')
    ->group(function () {
        Route::prefix('login')
            ->name('login.')
            ->controller(LoginController::class)
            ->group(function () {
                Route::get('/', 'get')->name('get');
                Route::post('/', 'post')->name('post');
            });

        Route::prefix('register')
            ->name('register.')
            ->controller(RegisterController::class)
            ->group(function () {
                Route::get('/', 'get')->name('get');
                Route::post('/', 'post')->name('post');
            });
    });
