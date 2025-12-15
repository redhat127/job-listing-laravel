<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('requirements')->nullable();
            $table->text('responsibilities')->nullable();
            $table->string('location');
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->nullable();
            $table->boolean('is_remote')->default(false);
            $table->enum('job_type', getJobTypes())->default('full_time');
            $table->enum('experience_level', getJobExperienceLevels())->default('entry');
            $table->string('salary')->nullable();
            $table->boolean('show_salary')->default(false);
            $table->text('skills')->nullable();
            $table->text('benefits')->nullable();
            $table->enum('status', getJobStatus())->default('draft');
            $table->foreignUlid('company_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
