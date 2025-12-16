<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Intervention\Image\Laravel\Facades\Image;

class AccountController extends Controller
{
    public function index()
    {
        return inertia('account');
    }

    public function profileDetails()
    {
        $user = Auth::user();

        $validated = request()->validate([
            'name' => ['bail', 'required', 'string', 'min:1', 'max:50', 'regex:/^[A-Za-z0-9 _-]+$/'],
            'username' => [
                'bail',
                'required',
                'string',
                'min:6',
                'max:50',
                'regex:/^[A-Za-z0-9_-]+$/',
                Rule::unique('users', 'username')->ignore($user->id),
            ],
        ]);

        $user->update($validated);

        return back()->with('flashMessage', [
            'type' => 'success',
            'text' => 'Your profile details have been updated.',
        ]);
    }

    public function avatar()
    {
        $user = Auth::user();

        request()->validate([
            'avatar' => [
                'required',
                File::types(getValidImageTypes())
                    ->min('1kb')
                    ->max('2mb'),
            ],
        ]);

        $file = request()->file('avatar');

        $encodedImage = Image::read($file->getRealPath())
            ->cover(200, 200)
            ->toWebp(80);

        $avatar_path = 'avatars/avatar_'.time().'.webp';

        if (! Storage::put($avatar_path, $encodedImage)) {
            return back()->with('flashMessage', [
                'type' => 'error',
                'text' => 'Failed to save the avatar.',
            ]);
        }

        $this->deletePreviousAvatar($user);

        $result = $user->update(['avatar' => $avatar_path]);

        if (! $result) {
            if ($avatar_path) {
                Storage::delete($avatar_path);
            }

            return back()->with('flashMessage', [
                'type' => 'error',
                'text' => 'Failed to save the avatar.',
            ]);
        }

        return back()->with('flashMessage', [
            'type' => 'success',
            'text' => 'Your avatar has been saved.',
        ]);
    }

    public function deleteAvatar()
    {
        $user = Auth::user();

        $this->deletePreviousAvatar($user);

        $user->update([
            'avatar' => null,
        ]);

        return back()->with('flashMessage', [
            'type' => 'success',
            'text' => 'Your avatar has been deleted.',
        ]);
    }

    private function deletePreviousAvatar(User $user)
    {
        $previousAvatar = $user->avatar;

        if ($previousAvatar && Storage::fileExists($previousAvatar)) {
            Storage::delete($previousAvatar);
        }
    }
}
