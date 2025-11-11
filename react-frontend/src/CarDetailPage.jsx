// src/pages/user/CarDetailPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../../components/ui/navbar.jsx';
import PrimaryButton from '../../components/ui/primarybutton.jsx';

const CarDetailPage = ({ cars }) => {
  const { id } = useParams();
  const car = cars.find(c => c.id === parseInt(id));

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Car not found</h1>
          <Link to="/listing">
            <PrimaryButton label="Back to Listings" className="mt-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <NavBar />
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <img src={car.image} alt={car.name} className="w-full h-auto rounded-2xl shadow-2xl object-cover mb-8" />
          </div>
          <div className="bg-gray-800/50 p-8 rounded-2xl shadow-xl border border-gray-700">
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">{car.name}</h1>
            <p className="text-purple-400 font-bold text-3xl mb-6">{car.price}</p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2 text-gray-300">Specifications</h3>
              <p className="text-gray-400 text-lg">{car.specs}</p>
            </div>

            <div className="space-y-4">
              <PrimaryButton label="Schedule Viewing" type="primary" className="w-full" />
              <Link to="/listing">
                <PrimaryButton label="‹ Back to Listings" type="secondary" className="w-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;