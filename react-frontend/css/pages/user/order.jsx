// src/pages/user/order.jsx
import React from 'react';
import NavBar from '../../components/ui/navbar.jsx';
import PrimaryButton from '../../components/ui/primarybutton.jsx';

const OrderPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <section className="py-10 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Request a Private Viewing</h1>
        <form className="bg-gray-800 p-8 rounded-2xl shadow-xl">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input type="text" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input type="email" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
            <input type="tel" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required />
          </div>
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Supercar</label>
            <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
              <option>Select a model</option>
              <option>Ferrari SF90 Stradale</option>
              <option>Lamborghini Aventador SVJ</option>
              <option>McLaren 765LT</option>
            </select>
          </div>
          <PrimaryButton label="Submit Request" onClick={() => alert("Your request has been sent! A concierge will contact you within 24 hours.")} type="primary" />
        </form>
      </section>
    </div>
  );
};

export default OrderPage;