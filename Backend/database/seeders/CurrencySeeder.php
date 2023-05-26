<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample currencies
        Currency::create([
            'currency' => 'USD',
            'currency_symbol' => '$',
        ]);
        Currency::create([
            'currency' => 'EUR',
            'currency_symbol' => '€',
        ]);
        Currency::create([
            'currency' => 'MYR',
            'currency_symbol' => 'RM',
        ]);
    }
}
