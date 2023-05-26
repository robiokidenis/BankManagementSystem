<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionHistory extends Model
{
    use HasFactory;
    protected $fillable = [
        'bank_account_id',
        'amount',
        'status',
        'sender_id',
        'recipient_id',
        'type',
    ];
    /* relation to bankaccount */
    public function bankAccount()
    {
        return $this->hasOne(BankAccount::class, 'id', 'bank_account_id');
    }
    /* Relation to recipient bank account */
    public function recipientAccount()
    {
        return $this->hasOne(BankAccount::class, 'id', 'recipient_id')->withDefault();
    }
    /* Relation to sender bank account */
    public function senderAccount()
    {
        return $this->hasOne(BankAccount::class, 'id', 'sender_id')->withDefault();
    }

    public function getTypeText(): string
    {
        switch ($this->type) {
            case 1:
                return 'Deposit';
            case 2:
                return 'Transfer';
            case 3:
                return 'Received';
            default:
                return 'Unknown';
        }
    }
    const TYPE_DEPOSIT = 1;
    const TYPE_TRANSFER = 2;
    const TYPE_RECEIVED = 3;
}
