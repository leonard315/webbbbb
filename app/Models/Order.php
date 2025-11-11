<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'car_id',
        'amount',
        'status',
        'payment_method',
        'order_date',
        'estimated_delivery',
        'rejection_reason',
        'updated_by',
        'status_history',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'order_date' => 'datetime',
        'estimated_delivery' => 'date',
        'status_history' => 'array',
    ];

    protected $appends = ['customer', 'car_name'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    // Accessor for customer name (for compatibility with frontend)
    public function getCustomerAttribute()
    {
        return $this->user ? $this->user->name : null;
    }

    // Accessor for car name (for compatibility with frontend)
    public function getCarNameAttribute()
    {
        return $this->car ? $this->car->name : null;
    }
}
