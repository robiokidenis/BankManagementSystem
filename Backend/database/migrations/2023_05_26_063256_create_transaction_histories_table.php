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
        Schema::create('transaction_histories', function (Blueprint $table) {
          
            $table->id();
            $table->unsignedBigInteger('bank_account_id');
            $table->decimal('amount', 10, 2);
            $table->unsignedBigInteger('sender_id')->nullable(); // Add the sender_id column
            $table->unsignedBigInteger('recipient_id')->nullable();
            $table->unsignedTinyInteger('type');
            $table->enum('status', ['complete', 'pending', 'failed'])->default('pending');
            $table->timestamps();
    
            $table->foreign('bank_account_id')->references('id')->on('bank_accounts')->onDelete('cascade');
            $table->foreign('sender_id')->references('id')->on('bank_accounts')->onDelete('cascade'); // Add foreign key for sender_id
            $table->foreign('recipient_id')->references('id')->on('bank_accounts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_histories');
    }
};
