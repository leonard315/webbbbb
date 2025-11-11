<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user', 'car'])->latest()->get();
        return response()->json($orders);
    }

    public function myOrders(Request $request)
    {
        $orders = Order::with('car')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();
        
        return response()->json($orders);
    }

    public function show($id)
    {
        $order = Order::with(['user', 'car'])->findOrFail($id);
        
        // Check if user owns this order or is admin
        if ($order->user_id !== auth()->id() && auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($order);
    }

    public function store(Request $request)
    {
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'payment_method' => 'required|string',
        ]);

        $car = \App\Models\Car::findOrFail($request->car_id);

        $order = Order::create([
            'user_id' => $request->user()->id,
            'car_id' => $request->car_id,
            'amount' => $car->price,
            'status' => 'pending',
            'payment_method' => $request->payment_method,
            'order_date' => now(),
        ]);

        $order->load('car');

        return response()->json([
            'message' => 'Order placed successfully',
            'order' => $order
        ], 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $request->validate([
            'status' => 'required|in:pending,accepted,completed,rejected',
            'estimated_delivery' => 'nullable|date',
            'rejection_reason' => 'nullable|string',
        ]);

        $order->update([
            'status' => $request->status,
            'estimated_delivery' => $request->estimated_delivery,
            'rejection_reason' => $request->rejection_reason,
            'updated_by' => $request->user()->id,
        ]);

        // Add to status history
        $statusHistory = $order->status_history ?? [];
        $statusHistory[] = [
            'status' => $request->status,
            'changed_by' => $request->user()->id,
            'changed_by_name' => $request->user()->name,
            'timestamp' => now()->toISOString(),
            'notes' => $request->notes ?? '',
        ];
        $order->status_history = $statusHistory;
        $order->save();

        $order->load(['user', 'car']);

        return response()->json([
            'message' => 'Order status updated successfully',
            'order' => $order
        ]);
    }
}
