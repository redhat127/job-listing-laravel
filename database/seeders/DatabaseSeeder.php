<?php

namespace Database\Seeders;

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

        User::factory()->create([
            'name' => 'dave',
            'email' => 'dave@example.com',
        ]);
    }
}
