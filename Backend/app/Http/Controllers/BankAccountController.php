<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\BankAccountResource;
use App\Http\Resources\ListBankAccountResource;
use App\Http\Resources\TransactionHistoryResource;
use App\Models\BankAccount;
use App\Models\TransactionHistory;
use App\Models\User;
use App\Services\TransactionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BankAccountController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index');
    }

    public function index()
    {
        // $user = Auth::user();
        // $user=Transaction::get();
        $user = User::with('bankAccount')->get();
        // $bankAccount = $user->bankAccount;
        return ApiResponse::success($user, 'Users retrieved successfully');
    }

    public function getRecipients()
    {
        $user = User::with('bankAccount')->get();
        // $bankAccount = $user->bankAccount;
        return ApiResponse::success($user, 'Users retrieved successfully');
    }


    public function bankAccount()
    {
        $user = Auth::user();
        return ApiResponse::success(new BankAccountResource($user->bankAccount), 'Users retrieved successfully');
    }

    public function deposit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:0.01',
        ]);
        if ($validator->fails()) {
            return ApiResponse::error($validator->errors()->first(), 422);
        }

        $user = Auth::user();
        $amount = $request->input('amount');

        TransactionService::Deposite($user->bankAccount, $amount);

        return ApiResponse::success([
            'amount' => $amount
        ], 'Deposit received: $' . $amount,201);
    }


    public function transfer(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:0.01',
            'recipient_account_number' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors()->first(), 422);
        }

        $user = Auth::user();

        if (!$user) {
            return ApiResponse::error('Unauthenticated!', 401);
        }

        try {
            TransactionService::transfer($user->bankAccount, $request->recipient_account_number, $request->input('amount'));
            return ApiResponse::success([], 'Transfer successful!', 201);
        } catch (\Exception $e) {
            return ApiResponse::error($e->getMessage(), 400);
        }
    }

    public function transactions()
    {
        // $transactionHistory = TransactionHistory::with('bankAccount')->get();
        // return $transactionHistory;

        $user = Auth::user();

        return  TransactionHistoryResource::collection(TransactionService::TransactionHistories($user->bankAccount));
    }
    public function list_bankAccount()
    {
        $bankAccounts = BankAccount::with('user')->get();
        return ApiResponse::success(ListBankAccountResource::collection($bankAccounts), 'List Bankaccount');
    }

    public function view($account_number)
    {
        $bankAccount = BankAccount::where('account_number', $account_number)->first();
        if (!$bankAccount) {
            return ApiResponse::error("Bank Account Not Found!.", 404);;
        }
        return ApiResponse::success(new ListBankAccountResource($bankAccount), 'Bankaccount');
    }

    public function History()
    {
        $user = Auth::user();

        if (!$user) {
            return ApiResponse::error('Unauthenticated!', 401);
        }

        $transactions = TransactionService::History($user->bankAccount);
        $formattedTransactions = $transactions->map(function ($transaction) use ($user) {
            $type = $transaction->sender_account_id === $user->bankAccount->id ? 'Transfer' : 'Receive';
            return [
                'type' => $type,
                'amount' => $transaction->amount,
                'created_at' => $transaction->created_at->format('d M Y'),
            ];
        });

        return ApiResponse::success($formattedTransactions, 'Transaction history retrieved successfully!');
    }
    public function DepositHistory()
    {
        $user = Auth::user();
        $transactions = TransactionService::DepositeHistory($user->bankAccount);
        return ApiResponse::success($transactions, 'Transaction history retrieved successfully!');
    }
    public function transferHistory()
    {
        $user = Auth::user();
        $transactions = TransactionService::TransferHistory($user->bankAccount);
        return ApiResponse::success($transactions, 'Transaction history retrieved successfully!');
    }
}
