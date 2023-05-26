<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'country',
        'city',
        'address',
        'email',
        'phone_number',
        'birthday',
        'organization',
        'role',
        'department',
        'zip_code',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Generate bank account number before user creation
    protected static function boot()
    {
        parent::boot();
        static::created(function ($user) {
            $user->bankAccount()->create([
                'account_number' => rand(10000000000, 99999999999),
                'currency_id' => Currency::where('currency', 'USD')->value('id')
            ]);
        });
    }

    /* relation to bankaccount */
    public function bankAccount()
    {
        return $this->hasOne(BankAccount::class);
    }


    public function getNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

}
