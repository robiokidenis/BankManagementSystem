<?php


namespace App\Services;

use App\Http\Resources\DepositHistoryResource;
use App\Http\Resources\TransferHistoryResource;
use App\Models\BankAccount;
use App\Models\TransactionHistory;
use Illuminate\Support\Facades\DB;

class TransactionService
{

    public static function Deposite(BankAccount $bankAccount, $amount = 0)
    {
        DB::transaction(function () use ($bankAccount, $amount) {
            $bankAccount->balance += $amount;
            $bankAccount->save();

            // Create a transaction history record
            TransactionHistory::create([
                'bank_account_id' => $bankAccount->id,
                'amount' => $amount,
                'status' => 'complete',
                'recipient_id' => null, // No recipient for deposit
                'type' => 1 // Deposit type
            ]);
        });
    }

    public static function transfer(BankAccount $senderAccount, $recipientAccountNumber, $amount)
    {
        if (!$senderAccount) {
            throw new \Exception('User does not have a bank account!', 400);
        }
        if ($senderAccount->balance < $amount) {
            throw new \Exception('Insufficient balance!');
        }

        $recipientAccount = BankAccount::where('account_number', $recipientAccountNumber)->first();

        if (!$recipientAccount) {
            throw new \Exception('Recipient account not found!');
        }

        // Check if sender and recipient accounts are the same
        if ($senderAccount->id === $recipientAccount->id) {
            throw new \Exception('Cannot transfer to your own account!');
        }

        try {
            DB::beginTransaction();


            // Create a transaction history record
            TransactionHistory::create([
                'bank_account_id' => $senderAccount->id,
                'amount' => $amount,
                'status' => 'complete',
                'sender_id' =>  null,
                'recipient_id' => $recipientAccount->id,
                'type' => 2 // Transfer type
            ]);
            // Create a transaction history record for the recipient
            TransactionHistory::create([
                'bank_account_id' => $recipientAccount->id,
                'amount' => $amount,
                'status' => 'complete',
                'sender_id' =>  $senderAccount->id,
                'recipient_id' => null,
                'type' => 3 // Received type
            ]);

            $senderAccount->balance -= $amount;
            $senderAccount->save();
            $recipientAccount->balance += $amount;
            $recipientAccount->save();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public static function DepositeHistory(BankAccount $bankAccount, $amount = 0)
    {
        return DepositHistoryResource::collection(self::TransactionHistories($bankAccount, 1));
    }
    public static function TransferHistory(BankAccount $bankAccount, $amount = 0)
    {

        if (!$bankAccount) {
            throw new \Exception('User does not have a bank account!', 400);
        }
        return TransferHistoryResource::collection(self::TransactionHistories($bankAccount, 2));
    }



    public static function TransactionHistories(BankAccount $bankAccount, $type = null)
    {
        if (!$bankAccount) {
            throw new \Exception('User does not have a bank account!', 400);
        }


        if ($type != null) {
            return $bankAccount->transactionHistories()
                ->Where('type', $type)->get();
        }
        return $bankAccount->transactionHistories()->get();
    }
}
