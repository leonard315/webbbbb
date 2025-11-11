<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'price',
        'location',
        'year',
        'mileage',
        'engine',
        'transmission',
        'horsepower',
        'topSpeed',
        'acceleration',
        'fuelType',
        'color',
        'condition',
        'description',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'year' => 'integer',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
