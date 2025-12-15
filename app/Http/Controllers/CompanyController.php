<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Intervention\Image\Laravel\Facades\Image;

class CompanyController extends Controller
{
    private function isUserTypeCompany()
    {
        $user = Auth::user();

        if ($user->user_type !== 'company') {
            abort(404);
        }

        return $user;
    }

    public function myCompany()
    {
        $user = $this->isUserTypeCompany();

        $company = $user->company;

        return inertia('company/show', compact('company'));
    }

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

    public function jobCreate()
    {
        $this->isUserTypeCompany();

        return inertia('company/post-job');
    }

    public function jobStore()
    {
        $user = $this->isUserTypeCompany();

        $validated = request()->validate([
            'title' => ['bail', 'required', 'string', 'min:3', 'max:100'],
            'requirements' => ['bail', 'nullable', 'string', 'min:10', 'max:5000'],
            'responsibilities' => ['bail', 'nullable', 'string', 'min:10', 'max:5000'],
            'location' => ['bail', 'required', 'string', 'min:2', 'max:500'],
            'city' => ['bail', 'nullable', 'string', 'min:3', 'max:50'],
            'state' => ['bail', 'nullable', 'string', 'min:3', 'max:50'],
            'country' => ['bail', 'nullable', 'string', 'min:3', 'max:50'],
            'is_remote' => ['bail', 'required', 'boolean'],
            'job_type' => ['bail', 'required', 'string', Rule::in(getJobTypes())],
            'experience_level' => ['bail', 'required', 'string', Rule::in(getJobExperienceLevels())],
            'salary' => ['bail', 'nullable', 'string', 'min:3', 'max:50'],
            'show_salary' => ['bail', 'required', 'boolean'],
            'skills' => ['bail', 'nullable', 'string', 'min:10', 'max:5000'],
            'benefits' => ['bail', 'nullable', 'string', 'min:10', 'max:5000'],
            'status' => ['bail', 'required', 'string', Rule::in(getJobStatus())],
        ]);

        $user->company->jobs()->create($validated);

        return redirect()->route('company.myCompany')
            ->with('flashMessage', [
                'type' => 'success',
                'text' => 'Your job has been created.',
            ]);
    }
}
