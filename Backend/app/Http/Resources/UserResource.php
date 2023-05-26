<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'name' => $this->name,
            'address' => $this->address,
            'country' => $this->country,
            'phone_number' => $this->phone_number,
            'birthday' => $this->birthday,
            'organization' => $this->organization,
            'city' => $this->city,
            'department' => $this->department,
            'role' => $this->role,
            'zip_code' => $this->zip_code,
            'email' => $this->email,
            'register_date' => $this->created_at?->format('d M Y'),
            'bank_account'=> new BankAccountResource($this->bankAccount)
        ];
    }
}
