<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionHistoryResource extends JsonResource
{

    public function getDescription(): string
    {
        if ($this->type === 2) {
            return 'Transfer to ' . $this->recipientAccount?->account_number . ' - ' . $this->recipientAccount?->user?->name;
        } elseif ($this->type === 3) {
            return 'Funds Received from ' .  $this->senderAccount?->account_number . ' - ' . $this->senderAccount?->user?->name;
        } else {
            return 'Deposit';
        }
    }

    public function getOtherAccountRef(): string
    {
        if ($this->type === 2) {
            return $this->recipientAccount?->account_number;
        } elseif ($this->type === 3) {
            return $this->senderAccount?->account_number;
        } else {
            return '';
        }
    }
    public function getOtherAccountName(): string
    {
        if ($this->type === 2) {
            return $this->recipientAccount?->user?->name;
        } elseif ($this->type === 3) {
            return $this->senderAccount?->user?->name;
        } else {
            return '';
        }
    }

    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'amount' => $this->amount,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'account_number' => $this->bankAccount->account_number,
            'account_name' => $this->bankAccount->user->name,
            'type' => $this->getTypeText(),
            'other_account_ref' => $this->getOtherAccountRef(),
            'other_account_name' => $this->getOtherAccountName(),
            'currency' => $this->bankAccount->currency->currency,
            'currency_symbol' => $this->bankAccount->currency->currency_symbol,
            'status' => $this->status,
            'description' => $this->getDescription(),
        ];
    }
}
