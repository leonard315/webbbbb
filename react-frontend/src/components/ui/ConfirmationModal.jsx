// src/components/ui/ConfirmationModal.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from './primarybutton.jsx';

const ConfirmationModal = ({ isOpen, onClose, car, quantity }) => {
  if (!isOpen) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-green-400 to-blue-500 mb-5">
          <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-3">Order Confirmed!</h2>
        <p className="text-gray-400 mb-6">Your order for the {car.name} has been successfully placed.</p>

        <div className="bg-gray-900/50 rounded-lg p-4 text-left space-y-3 mb-8 border border-gray-700">
          <p><strong>Model:</strong> {car.name}</p>
          <p><strong>Quantity:</strong> {quantity}</p>
          <p><strong>Total Price:</strong> {formatCurrency(car.price * quantity)}</p>
        </div>

        <Link to="/" className="w-full block">
          <PrimaryButton
            label="Back to Collection"
            onClick={onClose}
            type="secondary"
          />
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationModal;