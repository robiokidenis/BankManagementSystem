<?php

use App\Http\Controllers\{BankAccountController};
use App\Http\Controllers\Auth\ApiAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/user', [BankAccountController::class, 'index']);

Route::post('/register', [ApiAuthController::class, 'register']);
Route::post('/login', [ApiAuthController::class, 'login']);
Route::post('/logout', [ApiAuthController::class, 'logout'])->middleware(['auth:sanctum']);
Route::get('/me', [ApiAuthController::class, 'me'])->middleware(['auth:sanctum']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/bank-account', [BankAccountController::class, 'bankAccount']);
    Route::get('/bank-account/history', [BankAccountController::class, 'history']);
    Route::get('/bank-account/{account_number}', [BankAccountController::class, 'view']);
    Route::post('/transfer', [BankAccountController::class, 'transfer']);
    Route::get('/transfers', [BankAccountController::class, 'transferHistory']);
    Route::post('/deposit', [BankAccountController::class, 'deposit']);
    Route::get('/deposits', [BankAccountController::class, 'DepositHistory']);
    Route::get('/bank-accounts', [BankAccountController::class, 'list_bankAccount']);
    Route::get('/transactions', [BankAccountController::class, 'transactions']);
    Route::get('/users', [BankAccountController::class, 'getRecipients']);
});
