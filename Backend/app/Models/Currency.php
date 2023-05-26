<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;
    protected $fillable = [
        'currency',
        'currency_symbol',
    ];
    public function bankAccounts()
    {
        return $this->hasMany(BankAccount::class);
    }
}
