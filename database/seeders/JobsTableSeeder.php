<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Job;
use App\Models\User;
use Illuminate\Database\Seeder;

class JobsTableSeeder extends Seeder
{
    public function __construct(public ?User $user = null) {}

    public function run(): void
    {
        $user = $this->user ?? User::first();

        if (! $user) {
            return;
        }

        $company = $user->company ?? Company::factory()->for($user, 'creator')->create();

        if (Job::count() > 0) {
            Job::truncate();
        }

        Job::factory()->create([
            'company_id' => $company->id,
        ]);
    }
}
