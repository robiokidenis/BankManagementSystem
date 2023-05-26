<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_number',
        'balance',
        'user_id',
        'currency_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'sender_account_id')->orderBy('created_at', 'desc');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function transactionHistories()
    {
        return $this->hasMany(TransactionHistory::class)->orderBy('created_at', 'desc');
    }

}
