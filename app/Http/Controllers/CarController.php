<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::all();
        return response()->json($cars);
    }

    public function show($id)
    {
        $car = Car::findOrFail($id);
        return response()->json($car);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|url',
            'price' => 'required|numeric|min:0',
            'location' => 'required|string|max:255',
            'year' => 'required|integer|min:2020|max:2030',
            'mileage' => 'required|string',
            'engine' => 'required|string',
            'transmission' => 'required|string',
            'horsepower' => 'required|string',
            'topSpeed' => 'nullable|string',
            'acceleration' => 'nullable|string',
            'fuelType' => 'required|string',
            'color' => 'required|string',
            'condition' => 'required|string',
            'description' => 'required|string',
        ]);

        $car = Car::create($request->all());

        return response()->json([
            'message' => 'Car created successfully',
            'car' => $car
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $car = Car::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'image' => 'sometimes|url',
            'price' => 'sometimes|numeric|min:0',
            'location' => 'sometimes|string|max:255',
            'year' => 'sometimes|integer|min:2020|max:2030',
            'mileage' => 'sometimes|string',
            'engine' => 'sometimes|string',
            'transmission' => 'sometimes|string',
            'horsepower' => 'sometimes|string',
            'topSpeed' => 'nullable|string',
            'acceleration' => 'nullable|string',
            'fuelType' => 'sometimes|string',
            'color' => 'sometimes|string',
            'condition' => 'sometimes|string',
            'description' => 'sometimes|string',
        ]);

        $car->update($request->all());

        return response()->json([
            'message' => 'Car updated successfully',
            'car' => $car
        ]);
    }

    public function destroy($id)
    {
        $car = Car::findOrFail($id);
        $car->delete();

        return response()->json([
            'message' => 'Car deleted successfully'
        ]);
    }

    public function search(Request $request)
    {
        $query = Car::query();

        if ($request->has('brand')) {
            $query->where('name', 'like', '%' . $request->brand . '%');
        }

        if ($request->has('model')) {
            $query->where('name', 'like', '%' . $request->model . '%');
        }

        if ($request->has('bodyType')) {
            $query->where('description', 'like', '%' . $request->bodyType . '%');
        }

        if ($request->has('priceRange')) {
            $range = explode('-', $request->priceRange);
            if (count($range) === 2) {
                $query->whereBetween('price', [(int)$range[0] * 1000000, (int)$range[1] * 1000000]);
            } else {
                $query->where('price', '>=', (int)$range[0] * 1000000);
            }
        }

        $cars = $query->get();

        return response()->json($cars);
    }
}
