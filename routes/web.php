<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'SuperCars PH API',
        'version' => '1.0',
        'status' => 'running',
        'endpoints' => [
            'auth' => [
                'POST /api/register' => 'Register a new user',
                'POST /api/login' => 'Login user',
                'POST /api/logout' => 'Logout user (requires auth)',
                'GET /api/user' => 'Get current user (requires auth)',
            ],
            'cars' => [
                'GET /api/cars' => 'Get all cars',
                'GET /api/cars/{id}' => 'Get car by ID',
                'POST /api/cars' => 'Create car (admin only)',
                'PUT /api/cars/{id}' => 'Update car (admin only)',
                'DELETE /api/cars/{id}' => 'Delete car (admin only)',
            ],
            'orders' => [
                'GET /api/orders' => 'Get all orders (admin only)',
                'GET /api/orders/user' => 'Get user orders (requires auth)',
                'POST /api/orders' => 'Create order (requires auth)',
                'PUT /api/orders/{id}' => 'Update order (admin only)',
            ],
            'users' => [
                'GET /api/users' => 'Get all users (admin only)',
                'PUT /api/users/{id}' => 'Update user (admin only)',
            ],
        ],
        'frontend' => 'http://localhost:5174',
    ], 200, [], JSON_PRETTY_PRINT);
})->name('home');
