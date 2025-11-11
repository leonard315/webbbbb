// src/components/ui/card.jsx
import React from 'react';

const FeatureCard = ({ icon, title, description, onClick }) => {
  return (
    <div
      className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative flex items-center justify-center w-16 h-16 mb-6 bg-gray-900 rounded-full border-2 border-purple-400/30 group-hover:border-purple-400 transition-colors duration-300">
        <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="text-3xl transition-transform duration-300 group-hover:scale-110 text-purple-400">
          {icon}
        </div>
      </div>
      <h4 className="text-xl font-bold mb-3 text-white">{title}</h4>
      <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;