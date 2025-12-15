<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'TechVista Solutions',
            'location' => 'Austin, Texas, USA',
            'about' => 'TechVista Solutions is a mid-sized software development company specializing in cloud-based enterprise applications and digital transformation services. Founded in 2018, we help businesses modernize their operations through custom software solutions, API integrations, and scalable cloud infrastructure. Our team of 50+ engineers and consultants work with clients across healthcare, finance, and retail sectors to deliver innovative technology solutions that drive business growth and operational efficiency.',
        ];
    }
}
