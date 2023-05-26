<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'country' => fake()->country,
            'city' => fake()->city,
            'address' => fake()->address,
            'email' => fake()->unique()->safeEmail,
            'phone_number' => fake()->phoneNumber,
            'birthday' => fake()->date('Y-m-d', '-18 years'), // Generate a birthday for users above 18 years old
            'organization' => fake()->company,
            'role' => fake()->jobTitle,
            'department' => fake()->randomElement(['Development', 'Sales', 'Marketing']),
            'zip_code' => fake()->postcode,
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),



        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
