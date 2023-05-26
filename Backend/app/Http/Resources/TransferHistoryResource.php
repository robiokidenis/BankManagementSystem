<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransferHistoryResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'amount' => $this->amount,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'sender_account_number' => $this->bankAccount->account_number,
            'sender_name' => $this->bankAccount->user->name,
            'recipient_account_number' => $this->recipientAccount?->account_number,
            'recipient_name' => $this->recipientAccount?->user?->name,
            'currency' => $this->bankAccount->currency->currency,
            'currency_symbol' => $this->bankAccount->currency->currency_symbol,
            'status' => $this->status,
        ];
    }
}
