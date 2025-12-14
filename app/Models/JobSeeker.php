<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobSeeker extends Model
{
    /** @use HasFactory<\Database\Factories\JobSeekerFactory> */
    use HasFactory, HasUlids;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
