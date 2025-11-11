// src/components/ui/card.jsx
import React from 'react';

const FeatureCard = ({ icon, title, description, onClick }) => {
  return (
    <div
      className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 text-purple-400">{icon}</div>
      <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-400 transition-colors">{title}</h4>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;