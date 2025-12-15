<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobFactory extends Factory
{
    public function definition(): array
    {
        $title = $this->faker->randomElement([
            'Senior Software Engineer',
            'Full Stack Developer',
            'Frontend Developer',
            'Backend Developer',
            'DevOps Engineer',
            'Product Manager',
            'UI/UX Designer',
            'Data Scientist',
            'Machine Learning Engineer',
            'Quality Assurance Engineer',
            'Technical Lead',
            'Engineering Manager',
            'Mobile Developer',
            'Cloud Architect',
            'Cybersecurity Analyst',
            'Database Administrator',
            'Business Analyst',
            'Scrum Master',
            'Solutions Architect',
            'Site Reliability Engineer',
        ]);

        $isRemote = $this->faker->boolean(40);
        $city = $isRemote ? null : $this->faker->city();
        $state = $isRemote ? null : $this->faker->state();
        $country = $this->faker->randomElement(['USA', 'Canada', 'UK', 'Germany', 'Australia']);

        $location = $isRemote
            ? 'Remote'
            : ($city && $state ? "{$city}, {$state}" : $this->faker->city());

        $showSalary = $this->faker->boolean(60);
        $salary = $showSalary ? $this->generateSalary() : null;

        return [
            'title' => $title,
            'requirements' => $this->generateRequirements(),
            'responsibilities' => $this->generateResponsibilities(),
            'location' => $location,
            'city' => $city,
            'state' => $state,
            'country' => $country,
            'is_remote' => $isRemote,
            'job_type' => $this->faker->randomElement(getJobTypes()),
            'experience_level' => $this->faker->randomElement(getJobExperienceLevels()),
            'salary' => $salary,
            'show_salary' => $showSalary,
            'skills' => $this->generateSkills(),
            'benefits' => $this->generateBenefits(),
            'status' => fake()->randomElement(getJobStatus()),
            'company_id' => Company::factory(),
        ];
    }

    private function generateSalary(): string
    {
        $ranges = [
            '$50,000 - $70,000',
            '$70,000 - $90,000',
            '$90,000 - $120,000',
            '$120,000 - $150,000',
            '$150,000 - $200,000',
            '$200,000 - $250,000',
        ];

        return $this->faker->randomElement($ranges);
    }

    private function generateRequirements(): string
    {
        $requirements = $this->faker->randomElements([
            'Bachelor\'s degree in Computer Science or related field',
            '3+ years of professional software development experience',
            'Strong proficiency in JavaScript/TypeScript',
            'Experience with React, Vue, or Angular',
            'Knowledge of RESTful APIs and microservices',
            'Proficiency in SQL and database design',
            'Experience with cloud platforms (AWS, Azure, or GCP)',
            'Strong problem-solving and analytical skills',
            'Excellent communication and teamwork abilities',
            'Experience with version control (Git)',
            'Understanding of Agile/Scrum methodologies',
            'Experience with CI/CD pipelines',
        ], $this->faker->numberBetween(5, 8));

        return implode("\n", array_map(fn ($req) => "• {$req}", $requirements));
    }

    private function generateResponsibilities(): string
    {
        $responsibilities = $this->faker->randomElements([
            'Design, develop, and maintain scalable web applications',
            'Collaborate with cross-functional teams to define and ship new features',
            'Write clean, maintainable, and well-documented code',
            'Participate in code reviews and provide constructive feedback',
            'Troubleshoot and debug production issues',
            'Optimize application performance and scalability',
            'Mentor junior developers and contribute to team growth',
            'Stay up-to-date with emerging technologies and industry trends',
            'Contribute to architectural decisions and technical planning',
            'Implement automated testing and quality assurance practices',
            'Work closely with product managers to understand requirements',
            'Participate in sprint planning and retrospectives',
        ], $this->faker->numberBetween(6, 9));

        return implode("\n", array_map(fn ($resp) => "• {$resp}", $responsibilities));
    }

    private function generateSkills(): string
    {
        $skills = $this->faker->randomElements([
            'JavaScript',
            'TypeScript',
            'Python',
            'Java',
            'PHP',
            'Ruby',
            'Go',
            'React',
            'Vue.js',
            'Angular',
            'Node.js',
            'Laravel',
            'Django',
            'Docker',
            'Kubernetes',
            'AWS',
            'Azure',
            'GCP',
            'MySQL',
            'PostgreSQL',
            'MongoDB',
            'Redis',
            'Git',
            'CI/CD',
            'Jenkins',
            'GitHub Actions',
            'REST APIs',
            'GraphQL',
            'Microservices',
            'Agile',
            'Scrum',
            'TDD',
            'Jest',
            'PHPUnit',
        ], $this->faker->numberBetween(6, 12));

        return implode(', ', $skills);
    }

    private function generateBenefits(): string
    {
        $benefits = $this->faker->randomElements([
            'Competitive salary and equity compensation',
            'Health, dental, and vision insurance',
            '401(k) matching',
            'Flexible work hours and remote work options',
            'Unlimited PTO policy',
            'Professional development budget',
            'Home office stipend',
            'Gym membership reimbursement',
            'Parental leave',
            'Company-sponsored events and team building',
            'Latest tech equipment (MacBook, monitors, etc.)',
            'Stock options',
            'Annual performance bonuses',
            'Mental health support and wellness programs',
        ], $this->faker->numberBetween(6, 10));

        return implode("\n", array_map(fn ($benefit) => "• {$benefit}", $benefits));
    }

    // Optional: State methods for specific scenarios
    public function remote(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_remote' => true,
            'location' => 'Remote',
            'city' => null,
            'state' => null,
        ]);
    }

    public function senior(): static
    {
        return $this->state(fn (array $attributes) => [
            'experience_level' => 'senior',
            'salary' => '$120,000 - $180,000',
            'show_salary' => true,
        ]);
    }

    public function withSalary(): static
    {
        return $this->state(fn (array $attributes) => [
            'show_salary' => true,
            'salary' => $this->generateSalary(),
        ]);
    }
}
