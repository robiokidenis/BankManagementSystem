<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ApiAuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);


        if (Auth::attempt($credentials)) {
            $user = $request->user();
            $token = $user->createToken('api-token')->plainTextToken;

            return ApiResponse::success([
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]);
        }

        throw ValidationException::withMessages([
            'email' => 'Invalid email or password.',
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:255',
            'birthday' => 'nullable|date',
            'organization' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'role' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'register_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors()->first(), 422);
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'address' => $request->address,
            'country' => $request->country,
            'phone_number' => $request->phone_number,
            'birthday' => $request->birthday,
            'organization' => $request->organization,
            'city' => $request->city,
            'department' => $request->department,
            'role' => $request->role,
            'zip_code' => $request->zip_code,
            'email' => $request->email,
            'register_date' => $request->register_date,
            'password' => bcrypt($request->password),
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return ApiResponse::success([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 'Registration successful!', 201);
      
    }

    public function me(Request $request)
    {
        $user = $request->user();
        return ApiResponse::success(new UserResource($user));
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return ApiResponse::success(message: 'Logout successful.');
    }
}
