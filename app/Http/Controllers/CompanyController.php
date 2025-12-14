<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;
use Intervention\Image\Laravel\Facades\Image;

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

        $logo_path = null;

        if (request()->hasFile('logo')) {
            $file = request()->file('logo');

            $image = Image::read($file->getRealPath());

            $image->cover(300, 300);

            $encodedImage = $image->toWebp(80);

            $fileName = 'company_logo_'.time().'.webp';
            $logo_path = 'logos/'.$fileName;

            if (! Storage::put($logo_path, $encodedImage)) {
                return back()->with('flashMessage', [
                    'type' => 'error',
                    'text' => 'Failed to save the logo.',
                ]);
            }
        }

        $company = Auth::user()->company()->create([
            ...collect($validated)->except('logo')->all(),
            'logo_url' => $logo_path,
        ]);

        if (! $company) {
            if ($logo_path) {
                Storage::delete($logo_path);
            }

            return back()->with('flashMessage', [
                'type' => 'error',
                'text' => 'Failed to save the company.',
            ]);
        }

        Auth::user()->update([
            'onboarding_completed' => true,
            'user_type' => 'company',
        ]);

        return redirect()->route('home')
            ->with('flashMessage', [
                'type' => 'success',
                'text' => 'Your company has been created.',
            ]);
    }
}
