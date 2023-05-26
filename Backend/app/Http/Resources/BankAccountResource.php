<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BankAccountResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'account_number' => $this->account_number,
            'balance' => $this->balance,
            'currency' => $this->currency->currency,
            'currency_symbol' => $this->currency->currency_symbol,
            'user_id' => $this->user_id,
            'name' => $this->user->name,
            'created_at' => $this->created_at->format('d M Y'),
            'updated_at' => $this->updated_at->format('d M Y'),
            'deleted_at' => $this->deleted_at,
        ];
    }
}
