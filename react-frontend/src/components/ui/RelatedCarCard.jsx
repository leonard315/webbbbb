// src/components/ui/RelatedCarCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from './primarybutton.jsx';

const RelatedCarCard = ({ car }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex flex-col group">
      <div className="relative">
        <img src={car.imageUrl} alt={car.name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{car.name}</h3>
        <p className="text-purple-400 font-semibold mb-4">{car.company}</p>
        <div className="mt-auto">
          <Link to={`/order/${car.id}`}>
            <PrimaryButton label="View Details" type="secondary" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedCarCard;