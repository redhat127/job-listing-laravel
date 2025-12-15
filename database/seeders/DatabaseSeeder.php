<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Job;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $directories = Storage::directories();

        foreach ($directories as $directory) {
            Storage::deleteDirectory($directory);
        }

        $user = User::factory()->create([
            'name' => 'dave',
            'email' => 'dave@example.com',
            'onboarding_completed' => true,
            'user_type' => 'company',
        ]);

        $company = Company::factory()->for($user, 'creator')->create();

        Job::factory()->create([
            'company_id' => $company->id,
        ]);
    }
}
