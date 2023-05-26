<?php


namespace App\Helpers;

class ApiResponse
{
    public static function success($data = [], $message = '', $statusCode = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $statusCode);
    }

    public static function error($message = '', $statusCode = 400)
    {
        return response()->json([
            'success' => false,
            'error' => $message
        ], $statusCode);
    }
}
