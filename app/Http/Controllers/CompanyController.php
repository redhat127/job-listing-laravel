<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\File;

class CompanyController extends Controller
{
    public function store()
    {
        $validated = request()->validate([
            'name' => ['bail', 'required', 'string', 'min:3', 'max:100'],
            'location' => ['bail', 'required', 'string', 'min:2', 'max:500'],
            'about' => ['bail', 'required', 'string', 'min:10', 'max:1000'],
            'logo' => [
                'bail',
                'nullable',
                File::types([
                    'image/jpeg',
                    'image/png',
                    'image/gif',
                    'image/webp',
                    'image/avif',
                ])
                    ->min('1kb')
                    ->max('2mb'),
            ],
            'website' => ['bail', 'nullable', 'string', 'url', 'max:255'],
            'xAccount' => ['bail', 'nullable', 'string', 'url', 'max:255'],
        ]);

        $company = collect($validated)->except('logo')->all();

        Auth::user()->companies()->create($company);

        return redirect()->route('home')
            ->with('flashMessage', [
                'type' => 'success',
                'text' => 'Your company has been created.',
            ]);
    }
}
