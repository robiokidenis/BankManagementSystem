<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sender_account_id');
            $table->unsignedBigInteger('receiver_account_id');
            $table->decimal('amount', 10, 2);
            $table->enum('status', ['complete', 'pending', 'failed'])->default('pending');
            $table->timestamps();
            $table->foreign('sender_account_id')->references('id')->on('bank_accounts');
            $table->foreign('receiver_account_id')->references('id')->on('bank_accounts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
