<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('image');
            $table->decimal('price', 12, 2);
            $table->string('location');
            $table->integer('year');
            $table->string('mileage');
            $table->string('engine');
            $table->string('transmission');
            $table->string('horsepower');
            $table->string('topSpeed')->nullable();
            $table->string('acceleration')->nullable();
            $table->string('fuelType');
            $table->string('color');
            $table->string('condition');
            $table->text('description');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
