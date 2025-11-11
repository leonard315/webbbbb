<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::latest()->get();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,user',
            'status' => 'sometimes|in:active,inactive,suspended',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'status' => $request->status ?? 'active',
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Prevent admin from demoting themselves
        if ($user->id === $request->user()->id && $request->role !== 'admin') {
            return response()->json([
                'message' => 'Cannot demote your own admin role'
            ], 403);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
            'role' => 'sometimes|in:admin,user',
            'status' => 'sometimes|in:active,inactive,suspended',
        ]);

        $user->update($request->only(['name', 'email', 'role', 'status']));

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Prevent admin from deleting themselves
        if ($user->id === $request->user()->id) {
            return response()->json([
                'message' => 'Cannot delete your own account'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }

    public function suspend(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Prevent admin from suspending themselves
        if ($user->id === $request->user()->id) {
            return response()->json([
                'message' => 'Cannot suspend your own account'
            ], 403);
        }

        $user->update(['status' => 'suspended']);

        return response()->json([
            'message' => 'User suspended successfully',
            'user' => $user
        ]);
    }
}
