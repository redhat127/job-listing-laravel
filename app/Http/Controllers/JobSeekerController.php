<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;

class JobSeekerController extends Controller
{
    public function post()
    {
        $validated = request()->validate([
            'about' => ['bail', 'required', 'string', 'min:10', 'max:1000'],
            'resume' => [
                'bail',
                'required',
                File::types([
                    'application/pdf',
                ])
                    ->min('1kb')
                    ->max('5mb'),
            ],
        ]);

        $filename = 'resume_'.time().'.pdf';

        $path = Storage::putFileAs(
            'files',
            request()->file('resume'),
            $filename
        );

        if (! $path) {
            return back()->with('flashMessage', [
                'type' => 'error',
                'text' => 'Failed to save your resume.',
            ]);
        }

        $jobSeeker = Auth::user()->jobSeeker()->create([
            'about' => $validated['about'],
            'resume_url' => $path,
        ]);

        if (! $jobSeeker) {
            return back()->with('flashMessage', [
                'type' => 'error',
                'text' => 'Failed to create your job seeker profile.',
            ]);
        }

        Auth::user()->update([
            'onboarding_completed' => true,
            'user_type' => 'job_seeker',
        ]);

        return redirect()->route('home')
            ->with('flashMessage', [
                'type' => 'success',
                'text' => 'Your job application has been saved.',
            ]);
    }
}
