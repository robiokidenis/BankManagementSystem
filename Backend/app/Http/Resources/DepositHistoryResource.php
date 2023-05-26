<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepositHistoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'amount' => $this->amount,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'bank_account_number' => $this->bankAccount->account_number,
            'currency' => $this->bankAccount->currency->currency,
            'currency_symbol' => $this->bankAccount->currency->currency_symbol,
            'status' => $this->status,
        ];
    }
}
