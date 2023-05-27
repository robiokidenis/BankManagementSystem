<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user1 = User::create([
            'first_name' => 'Robioki',
            'last_name' => 'Denis',
            'country' => 'United States',
            'city' => 'San Francisco',
            'address' => 'California',
            'email' => 'robiokidenis@gmail.com',
            'phone_number' => '+(12)3456 789',
            'birthday' => '1990-08-15',
            'organization' => 'Company Name',
            'role' => 'Software Engineer',
            'department' => 'Development',
            'zip_code' => '12345',
            'password' => bcrypt('password'),
        ]);
        
        $user2 = User::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'country' => 'Canada',
            'city' => 'Toronto',
            'address' => 'Ontario',
            'email' => 'johndoe@example.com',
            'phone_number' => '+(34)5678 901',
            'birthday' => '1995-05-20',
            'organization' => 'Company XYZ',
            'role' => 'Project Manager',
            'department' => 'Management',
            'zip_code' => '54321',
            'password' => bcrypt('password'),
        ]);
        
        // Generate additional random users
        User::factory()->count(10)->create();
        // BankAccount::create([
        //     'account_number' => '123456789',
        //     'balance' => 1000.00,
        //     'user_id' => $user->id,
        // ]);
    }
}
