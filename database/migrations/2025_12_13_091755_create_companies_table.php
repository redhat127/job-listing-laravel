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
        Schema::create('companies', function (Blueprint $table) {
            $table->ulid('id');
            $table->string('name');
            $table->text('location');
            $table->text('about');
            $table->text('logo')->nullable();
            $table->string('website')->nullable();
            $table->string('xAccount')->nullable();
            $table->foreignUlid('user_id')
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
        Schema::dropIfExists('companies');
    }
};
