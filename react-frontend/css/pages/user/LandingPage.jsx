// src/pages/user/LandingPage.jsx
import React from 'react';
import NavBar from '../../components/ui/navbar.jsx';
import PrimaryButton from '../../components/ui/primarybutton.jsx';
import FeatureCard from '../../components/ui/card.jsx';

const LandingPage = () => {

  const handleExplore = (index) => {
    window.location.href = `/listing?carIndex=${index}`;
  };

  const handleOrder = () => {
    window.location.href = '/order';
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen text-white">

      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 xl:px-32 py-20 gap-12">
        <div className="w-full md:w-1/2">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Own the Extraordinary with <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Velocity Motors</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Discover the world’s most exclusive supercars. Handcrafted performance. Unrivaled luxury. Limited editions available.
          </p>
          <PrimaryButton label="Browse Supercars →" onClick={handleExplore} type="primary" />
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
            alt="Luxury Supercar"
            className="rounded-3xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-24 bg-gradient-to-b from-black to-gray-900 px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Velocity Motors</h3>
          <p className="text-gray-400 text-lg">Exclusivity. Performance. Legacy.</p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <FeatureCard
            icon="⚡"
            title="Unmatched Performance"
            description="Engineered for adrenaline. 0-60 in under 2.5 seconds. Track-ready power meets street elegance."
            onClick={() => handleExplore(0)}
          />

          {/* Card 2 */}
          <FeatureCard
            icon="💎"
            title="Exclusive Ownership"
            description="Own a piece of automotive history. Limited production runs. Bespoke customization options."
            onClick={() => handleExplore(1)}
          />

          {/* Card 3 */}
          <FeatureCard
            icon="🛡️"
            title="VIP Concierge Service"
            description="Personalized delivery, maintenance, and storage. Your supercar is our priority — 24/7."
            onClick={() => handleExplore(2)}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 text-white py-20 px-6 md:px-12 lg:px-20 xl:px-32 text-center">
        <div className="w-full">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Ready to Own Your Dream Supercar?</h3>
          <p className="text-xl md:text-2xl mb-8">Join the elite circle of collectors who trust Velocity Motors for their next acquisition.</p>
          <PrimaryButton label="Schedule a Private Viewing" onClick={handleOrder} type="outline" />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-950 text-gray-400 text-center py-8">
        <p className="text-sm">© 2025 Velocity Motors. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default LandingPage;