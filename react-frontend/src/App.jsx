import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('brand');
  const [hoveredCar, setHoveredCar] = useState(null);
  const [activePage, setActivePage] = useState('home');
  const [selectedCar, setSelectedCar] = useState(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    brand: '',
    model: '',
    bodyType: '',
    priceRange: ''
  });
  const [filteredCars, setFilteredCars] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearch = () => {
    let results = cars;

    // Filter by brand
    if (searchFilters.brand) {
      results = results.filter(car => 
        car.name.toLowerCase().includes(searchFilters.brand.toLowerCase())
      );
    }

    // Filter by model
    if (searchFilters.model) {
      results = results.filter(car => 
        car.name.toLowerCase().includes(searchFilters.model.toLowerCase())
      );
    }

    // Filter by body type
    if (searchFilters.bodyType) {
      results = results.filter(car => 
        car.name.toLowerCase().includes(searchFilters.bodyType.toLowerCase()) ||
        car.description.toLowerCase().includes(searchFilters.bodyType.toLowerCase())
      );
    }

    // Filter by price range
    if (searchFilters.priceRange) {
      const [min, max] = searchFilters.priceRange.split('-').map(p => parseInt(p) * 1000000);
      if (max) {
        results = results.filter(car => car.price >= min && car.price <= max);
      } else {
        results = results.filter(car => car.price >= min);
      }
    }

    setFilteredCars(results);
    setIsSearchActive(true);
    
    if (results.length === 0) {
      alert('No cars found matching your search criteria.');
    } else {
      alert(`Found ${results.length} car(s) matching your search!`);
    }
  };

  const clearSearch = () => {
    setSearchFilters({
      brand: '',
      model: '',
      bodyType: '',
      priceRange: ''
    });
    setFilteredCars([]);
    setIsSearchActive(false);
  };
  
  const cars = [
    {
      id: 1,
      name: '2023 Lamborghini Huracán EVO',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=400&q=80',
      price: 25000000,
      location: 'Metro Manila, BGC',
      year: 2023,
      mileage: '2,500 km',
      engine: '5.2L V10',
      transmission: '7-Speed Dual-Clutch',
      horsepower: '640 HP',
      topSpeed: '325 km/h',
      acceleration: '0-100 km/h in 2.9s',
      fuelType: 'Gasoline',
      color: 'Arancio Borealis (Orange)',
      condition: 'Excellent',
      description: 'Stunning Lamborghini Huracán EVO in pristine condition. This supercar features the legendary naturally aspirated V10 engine, advanced aerodynamics, and cutting-edge technology. Perfect for collectors and enthusiasts.'
    },
    {
      id: 2,
      name: '2022 Ferrari F8 Tributo',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=400&q=80',
      price: 32000000,
      location: 'Makati City',
      year: 2022,
      mileage: '3,200 km',
      engine: '3.9L Twin-Turbo V8',
      transmission: '7-Speed Dual-Clutch',
      horsepower: '720 HP',
      topSpeed: '340 km/h',
      acceleration: '0-100 km/h in 2.9s',
      fuelType: 'Gasoline',
      color: 'Rosso Corsa (Red)',
      condition: 'Like New',
      description: 'The Ferrari F8 Tributo represents the pinnacle of Italian engineering. With its twin-turbo V8 producing 720 horsepower, this masterpiece delivers breathtaking performance and unmistakable Ferrari styling.'
    },
    {
      id: 3,
      name: '2024 Porsche 911 Turbo S',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
      price: 18500000,
      location: 'Quezon City',
      year: 2024,
      mileage: '1,800 km',
      engine: '3.8L Twin-Turbo Flat-6',
      transmission: '8-Speed PDK',
      horsepower: '640 HP',
      topSpeed: '330 km/h',
      acceleration: '0-100 km/h in 2.7s',
      fuelType: 'Gasoline',
      color: 'GT Silver Metallic',
      condition: 'Brand New',
      description: 'The iconic Porsche 911 Turbo S combines everyday usability with supercar performance. All-wheel drive, adaptive suspension, and a luxurious interior make this the ultimate sports car.'
    },
    {
      id: 4,
      name: '2023 McLaren 720S Spider',
      image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=400&q=80',
      price: 28000000,
      location: 'BGC, Taguig',
      year: 2023,
      mileage: '2,100 km',
      engine: '4.0L Twin-Turbo V8',
      transmission: '7-Speed SSG',
      horsepower: '720 HP',
      topSpeed: '341 km/h',
      acceleration: '0-100 km/h in 2.9s',
      fuelType: 'Gasoline',
      color: 'Azores Orange',
      condition: 'Excellent',
      description: 'Experience open-top supercar thrills with the McLaren 720S Spider. British engineering excellence meets stunning design, with a retractable hardtop that transforms in just 11 seconds.'
    },
    {
      id: 5,
      name: '2022 Aston Martin DB11',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=400&q=80',
      price: 22000000,
      location: 'Makati City',
      year: 2022,
      mileage: '4,500 km',
      engine: '5.2L Twin-Turbo V12',
      transmission: '8-Speed Automatic',
      horsepower: '630 HP',
      topSpeed: '322 km/h',
      acceleration: '0-100 km/h in 3.7s',
      fuelType: 'Gasoline',
      color: 'Jet Black',
      condition: 'Excellent',
      description: 'The Aston Martin DB11 is the perfect blend of grand touring comfort and supercar performance. Handcrafted luxury meets V12 power in this British automotive masterpiece.'
    },
    {
      id: 6,
      name: '2024 Bentley Continental GT',
      image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=400&q=80',
      price: 26500000,
      location: 'Mandaluyong',
      year: 2024,
      mileage: '1,200 km',
      engine: '6.0L Twin-Turbo W12',
      transmission: '8-Speed Dual-Clutch',
      horsepower: '650 HP',
      topSpeed: '333 km/h',
      acceleration: '0-100 km/h in 3.7s',
      fuelType: 'Gasoline',
      color: 'Beluga Black',
      condition: 'Brand New',
      description: 'The Bentley Continental GT represents the ultimate in luxury grand touring. With a handcrafted interior, W12 engine, and unmatched refinement, this is automotive excellence at its finest.'
    }
  ];

  const brands = [
    { name: 'Ferrari', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Ferrari_Logo.svg/120px-Ferrari_Logo.svg.png' },
    { name: 'Lamborghini', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Lamborghini_Logo.svg/120px-Lamborghini_Logo.svg.png' },
    { name: 'Porsche', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Porsche_logo.svg/120px-Porsche_logo.svg.png' },
    { name: 'McLaren', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/McLaren_logo.svg/120px-McLaren_logo.svg.png' },
    { name: 'Aston Martin', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Aston_Martin_Logo.svg/120px-Aston_Martin_Logo.svg.png' },
    { name: 'Bentley', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Bentley_logo.svg/120px-Bentley_logo.svg.png' },
    { name: 'Bugatti', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Bugatti_logo.svg/120px-Bugatti_logo.svg.png' },
    { name: 'Rolls-Royce', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Rolls-Royce_logo.svg/120px-Rolls-Royce_logo.svg.png' },
    { name: 'Maserati', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Maserati_logo.svg/120px-Maserati_logo.svg.png' },
    { name: 'Pagani', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Pagani_Automobili_logo.svg/120px-Pagani_Automobili_logo.svg.png' }
  ];

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Side Panel */}
      {sidePanelOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 2000,
            transition: 'opacity 0.3s'
          }}
          onClick={() => setSidePanelOpen(false)}
        >
          <div 
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '320px',
              maxWidth: '85%',
              backgroundColor: 'white',
              boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.15)',
              transform: sidePanelOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.3s ease-in-out',
              overflowY: 'auto',
              zIndex: 2001
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Side Panel Header */}
            <div style={{ 
              padding: '20px', 
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#1e40af',
              color: 'white'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Menu</h3>
              <button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '28px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => setSidePanelOpen(false)}
              >
                ×
              </button>
            </div>

            {/* Side Panel Content */}
            <div style={{ padding: '20px' }}>
              {/* Navigation Links */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#6b7280', marginBottom: '12px', textTransform: 'uppercase' }}>
                  Navigation
                </h4>
                {[
                  { label: 'Home', page: 'home', icon: '🏠' },
                  { label: 'Cars For Sale', page: 'cars', icon: '🚗' },
                  { label: 'Used Cars', page: 'used', icon: '🔄' },
                  { label: 'New Cars', page: 'new', icon: '✨' },
                  { label: 'Dealerships', page: 'dealers', icon: '🏢' },
                  { label: 'News & Reviews', page: 'news', icon: '📰' }
                ].map((item) => (
                  <button
                    key={item.page}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      marginBottom: '8px',
                      backgroundColor: activePage === item.page ? '#eff6ff' : 'transparent',
                      border: activePage === item.page ? '2px solid #2563eb' : '2px solid transparent',
                      borderRadius: '8px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '15px',
                      fontWeight: activePage === item.page ? '600' : '500',
                      color: activePage === item.page ? '#2563eb' : '#111827',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.2s'
                    }}
                    onClick={() => {
                      setActivePage(item.page);
                      setSidePanelOpen(false);
                    }}
                    onMouseOver={(e) => {
                      if (activePage !== item.page) {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (activePage !== item.page) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Quick Actions */}
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#6b7280', marginBottom: '12px', textTransform: 'uppercase' }}>
                  Quick Actions
                </h4>
                <button
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    marginBottom: '8px',
                    backgroundColor: '#22c55e',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '15px',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
                  onClick={() => {
                    alert('Opening Sell My Car form...');
                    setSidePanelOpen(false);
                  }}
                >
                  🚙 Sell My Car
                </button>
                <button
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    backgroundColor: '#2563eb',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '15px',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  onClick={() => {
                    alert('Opening Contact form...');
                    setSidePanelOpen(false);
                  }}
                >
                  📞 Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Car Details Modal */}
      {selectedCar && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            overflow: 'auto'
          }}
          onClick={() => setSelectedCar(null)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}
              onClick={() => setSelectedCar(null)}
            >
              ×
            </button>

            {/* Car Image */}
            <img 
              src={selectedCar.image}
              alt={selectedCar.name}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '16px 16px 0 0'
              }}
            />

            {/* Car Details Content */}
            <div style={{ padding: '40px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
                {selectedCar.name}
              </h2>
              
              <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#2563eb', marginBottom: '24px' }}>
                ₱{selectedCar.price.toLocaleString()}
              </p>

              <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.8', marginBottom: '32px' }}>
                {selectedCar.description}
              </p>

              {/* Specifications Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '20px',
                marginBottom: '32px',
                padding: '24px',
                backgroundColor: '#f9fafb',
                borderRadius: '12px'
              }}>
                <div>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>YEAR</p>
                  <p style={{ fontSize: '16px', color: '#111827', fontWeight: '600' }}>{selectedCar.year}</p>
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>MILEAGE</p>
                  <p style={{ fontSize: '16px', color: '#111827', fontWeight: '600' }}>{selectedCar.mileage}</p>
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>ENGINE</p>
                  <p style={{ fontSize: '16px', color: '#111827', fontWeight: '600' }}>{selectedCar.engine}</p>
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>HORSEPOWER</p>
                  <p style={{ fontSize: '16px', color: '#111827', fontWeight: '600' }}>{selectedCar.horsepower}</p>
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>TRANSMISSION</p>
                  <p style={{ fontSize: '16px', color: '#111827', fontWeight: '600' }}>{selectedCar.transmission}</p>
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>TOP SPEED</p>
                  <p style={{ fontSize: '16px', color: '#111827', fontWeight: '600' }}>{selectedCar.topSpeed}</p>
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>ACCELERATION</p>
                  <p style={{ fontSize: '16px', color: '#111827', fontWeight: '600' }}>{selectedCar.acceleration}</p>
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>FUEL TYPE</p>
                  <p style={{ fontSize: '16px', color: '#111827', fontWeight: '600' }}>{selectedCar.fuelType}</p>
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>COLOR</p>
                  <p style={{ fontSize: '16px', color: '#111827', fontWeight: '600' }}>{selectedCar.color}</p>
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>CONDITION</p>
                  <p style={{ fontSize: '16px', color: '#111827', fontWeight: '600' }}>{selectedCar.condition}</p>
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>LOCATION</p>
                  <p style={{ fontSize: '16px', color: '#111827', fontWeight: '600' }}>📍 {selectedCar.location}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  style={{
                    flex: 1,
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '16px 32px',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  onClick={() => alert(`Contacting dealer about ${selectedCar.name}`)}
                >
                  Contact Dealer
                </button>
                <button
                  style={{
                    flex: 1,
                    backgroundColor: '#22c55e',
                    color: 'white',
                    padding: '16px 32px',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
                  onClick={() => alert(`Scheduling test drive for ${selectedCar.name}`)}
                >
                  Schedule Test Drive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navigation - Top */}
      <nav style={{ 
        backgroundColor: '#1e40af', 
        color: 'white', 
        padding: '18px 0', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo/Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>🏎️ SuperCars PH</h2>
          </div>

          {/* Desktop Links - Hidden on mobile */}
          <div style={{ display: 'flex', gap: '28px', fontSize: '13px', fontWeight: '600' }}>
            <style>{`
              @media (max-width: 768px) {
                .desktop-nav { display: none !important; }
              }
            `}</style>
            <div className="desktop-nav" style={{ display: 'flex', gap: '28px' }}>
              {['CARS FOR SALE', 'USED CARS', 'NEW CARS', 'DEALERSHIPS', 'NEWS & REVIEWS'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none',
                    padding: '8px 0',
                    borderBottom: '2px solid transparent',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderBottomColor = '#60a5fa'}
                  onMouseOut={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
                  onClick={(e) => { 
                    e.preventDefault(); 
                    const pageMap = {
                      'CARS FOR SALE': 'cars',
                      'USED CARS': 'used',
                      'NEW CARS': 'new',
                      'DEALERSHIPS': 'dealers',
                      'NEWS & REVIEWS': 'news'
                    };
                    setActivePage(pageMap[item]);
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side Buttons */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button 
              className="desktop-nav"
              style={{
                backgroundColor: '#22c55e',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '13px',
                boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#16a34a';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#22c55e';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(34, 197, 94, 0.3)';
              }}
              onClick={() => alert('Opening Sell My Car form...')}
            >
              SELL MY CAR
            </button>

            {/* Menu Button - Always visible */}
            <button
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '10px 16px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onClick={() => setSidePanelOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <style>{`
        @media (min-width: 769px) {
          .mobile-bottom-nav { display: none !important; }
        }
      `}</style>
      <nav className="mobile-bottom-nav" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1e40af',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
        zIndex: 100,
        padding: '8px 0'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          alignItems: 'center',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {[
            { label: 'Home', page: 'home', icon: '🏠' },
            { label: 'Cars', page: 'cars', icon: '🚗' },
            { label: 'New', page: 'new', icon: '✨' },
            { label: 'Dealers', page: 'dealers', icon: '🏢' },
            { label: 'Menu', action: 'menu', icon: '☰' }
          ].map((item) => (
            <button
              key={item.label}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: activePage === item.page ? '#60a5fa' : 'white',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: '600',
                transition: 'all 0.3s',
                flex: 1
              }}
              onClick={() => {
                if (item.action === 'menu') {
                  setSidePanelOpen(true);
                } else {
                  setActivePage(item.page);
                }
              }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 16px' }}>
        
        {/* Home/Cars Page */}
        {activePage === 'home' && (
          <>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#111827', letterSpacing: '-0.5px' }}>
              LUXURY SUPERCARS IN THE PHILIPPINES IN NOVEMBER 2025
            </h1>
          </>
        )}

        {/* Cars For Sale Page */}
        {activePage === 'cars' && (
          <>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
              CARS FOR SALE IN THE PHILIPPINES
            </h1>
          </>
        )}

        {/* Used Cars Page */}
        {activePage === 'used' && (
          <>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
              USED CARS FOR SALE
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '40px', lineHeight: '1.7', fontSize: '15px' }}>
              Browse our extensive collection of quality used cars. All vehicles are inspected and verified by trusted dealers.
            </p>
          </>
        )}

        {/* New Cars Page */}
        {activePage === 'new' && (
          <>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
              NEW CARS 2025 - LATEST MODELS
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '40px', lineHeight: '1.7', fontSize: '15px' }}>
              Discover the latest 2025 car models with the newest features, technology, and designs. Get the best deals from authorized dealers.
            </p>
          </>
        )}

        {/* Dealerships Page */}
        {activePage === 'dealers' && (
          <>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
              AUTHORIZED DEALERSHIPS
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '40px', lineHeight: '1.7', fontSize: '15px' }}>
              Find authorized car dealerships near you. Connect with trusted dealers for the best prices and after-sales service.
            </p>
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#111827' }}>Featured Dealerships</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {['Ferrari Manila', 'Lamborghini BGC', 'Porsche Makati', 'McLaren Manila', 'Bentley Makati', 'Aston Martin BGC'].map((dealer) => (
                  <div key={dealer} style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏢</div>
                    <div style={{ fontWeight: '600', color: '#111827', marginBottom: '8px' }}>{dealer}</div>
                    <button style={{
                      backgroundColor: '#2563eb',
                      color: 'white',
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}>
                      Visit Dealer
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: '40px' }}></div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#111827', letterSpacing: '-0.5px', display: 'none' }}>
              UPCOMING AND LATEST CARS IN THE PHILIPPINES IN NOVEMBER 2025
            </h1>
          </>
        )}

        {/* News & Reviews Page */}
        {activePage === 'news' && (
          <>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
              CAR NEWS & REVIEWS
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '40px', lineHeight: '1.7', fontSize: '15px' }}>
              Stay updated with the latest automotive news, expert reviews, and industry insights.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {[
                { title: '2025 Toyota Fortuner Review', date: 'Nov 10, 2025', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80' },
                { title: 'Honda Civic Type R Performance Test', date: 'Nov 9, 2025', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=400&q=80' },
                { title: 'Electric Cars in Philippines 2025', date: 'Nov 8, 2025', image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=400&q=80' }
              ].map((article, idx) => (
                <div key={idx} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', border: '2px solid #e5e7eb', cursor: 'pointer' }}>
                  <img src={article.image} alt={article.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>{article.date}</p>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>{article.title}</h3>
                    <button style={{
                      color: '#2563eb',
                      backgroundColor: 'transparent',
                      border: 'none',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}>
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '40px' }}></div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#111827', letterSpacing: '-0.5px', display: 'none' }}>
              UPCOMING AND LATEST CARS IN THE PHILIPPINES IN NOVEMBER 2025
            </h1>
          </>
        )}

        {(activePage === 'home' || activePage === 'cars') && (
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#111827', letterSpacing: '-0.5px', display: activePage === 'home' ? 'none' : 'block' }}>
            UPCOMING AND LATEST CARS IN THE PHILIPPINES IN NOVEMBER 2025
          </h1>
        )}
        {(activePage === 'home' || activePage === 'cars') && (
          <>
            <p style={{ color: '#6b7280', marginBottom: '40px', lineHeight: '1.7', fontSize: '15px' }}>
              Discover the world's most exclusive supercars and luxury vehicles. Browse our premium collection of high-performance automobiles from the most prestigious brands.
            </p>

            {/* Search Filter Section */}
            <div style={{ 
              backgroundColor: '#2563eb', 
              padding: '40px', 
              borderRadius: '12px', 
              marginBottom: '40px',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
                {/* Brand Dropdown */}
                <select
                  value={searchFilters.brand}
                  onChange={(e) => setSearchFilters({...searchFilters, brand: e.target.value})}
                  style={{
                    padding: '16px 20px',
                    fontSize: '18px',
                    color: '#6b7280',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236b7280\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    backgroundSize: '20px',
                    paddingRight: '45px'
                  }}
                >
                  <option value="">Brand</option>
                  <option value="ferrari">Ferrari</option>
                  <option value="lamborghini">Lamborghini</option>
                  <option value="porsche">Porsche</option>
                  <option value="mclaren">McLaren</option>
                  <option value="aston-martin">Aston Martin</option>
                  <option value="bentley">Bentley</option>
                  <option value="bugatti">Bugatti</option>
                  <option value="rolls-royce">Rolls-Royce</option>
                </select>

                {/* Model Dropdown */}
                <select
                  value={searchFilters.model}
                  onChange={(e) => setSearchFilters({...searchFilters, model: e.target.value})}
                  style={{
                    padding: '16px 20px',
                    fontSize: '18px',
                    color: '#6b7280',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236b7280\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    backgroundSize: '20px',
                    paddingRight: '45px'
                  }}
                >
                  <option value="">Model</option>
                  <option value="huracan">Huracán EVO</option>
                  <option value="f8">F8 Tributo</option>
                  <option value="911">911 Turbo S</option>
                  <option value="720s">720S Spider</option>
                  <option value="db11">DB11</option>
                  <option value="continental">Continental GT</option>
                </select>

                {/* Body Type Dropdown */}
                <select
                  value={searchFilters.bodyType}
                  onChange={(e) => setSearchFilters({...searchFilters, bodyType: e.target.value})}
                  style={{
                    padding: '16px 20px',
                    fontSize: '18px',
                    color: '#6b7280',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236b7280\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    backgroundSize: '20px',
                    paddingRight: '45px'
                  }}
                >
                  <option value="">Body type</option>
                  <option value="coupe">Coupe</option>
                  <option value="convertible">Convertible</option>
                  <option value="spider">Spider</option>
                  <option value="gt">Grand Tourer</option>
                </select>

                {/* Price Range Dropdown */}
                <select
                  value={searchFilters.priceRange}
                  onChange={(e) => setSearchFilters({...searchFilters, priceRange: e.target.value})}
                  style={{
                    padding: '16px 20px',
                    fontSize: '18px',
                    color: '#6b7280',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236b7280\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    backgroundSize: '20px',
                    paddingRight: '45px'
                  }}
                >
                  <option value="">Price range</option>
                  <option value="15-20">₱15M - ₱20M</option>
                  <option value="20-25">₱20M - ₱25M</option>
                  <option value="25-30">₱25M - ₱30M</option>
                  <option value="30+">₱30M+</option>
                </select>
              </div>

              {/* Search Button */}
              <button
                style={{
                  width: '100%',
                  backgroundColor: '#22c55e',
                  color: 'white',
                  padding: '18px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#16a34a';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#22c55e';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
                }}
                onClick={() => {
                  const filterText = Object.entries(searchFilters)
                    .filter(([_, value]) => value)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ');
                  alert(filterText ? `Searching with filters: ${filterText}` : 'Please select at least one filter');
                }}
              >
                Search
              </button>
            </div>
          </>
        )}

        {/* Enhanced Tabs */}
        {(activePage === 'home' || activePage === 'cars') && (
          <>
        <div style={{ display: 'flex', gap: '0', marginBottom: '40px', borderBottom: '2px solid #e5e7eb', backgroundColor: 'white', borderRadius: '8px 8px 0 0' }}>
          {[
            { key: 'brand', label: 'CAR BRAND' },
            { key: 'body', label: 'BODY TYPE' },
            { key: 'price', label: 'PRICE RANGE' }
          ].map((tab) => (
            <button 
              key={tab.key}
              style={{
                padding: '16px 32px',
                fontWeight: activeTab === tab.key ? '700' : '600',
                fontSize: '13px',
                color: activeTab === tab.key ? '#2563eb' : '#6b7280',
                backgroundColor: activeTab === tab.key ? 'white' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.key ? '3px solid #2563eb' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onClick={() => setActiveTab(tab.key)}
              onMouseOver={(e) => {
                if (activeTab !== tab.key) e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseOut={(e) => {
                if (activeTab !== tab.key) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Enhanced Brand Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', marginBottom: '56px' }}>
          {brands.map((brand) => (
            <div
              key={brand.name}
              style={{
                backgroundColor: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '28px 20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#2563eb';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
              onClick={() => alert(`Filtering cars by ${brand.name}`)}
            >
              <img src={brand.logo} alt={brand.name} style={{ width: '90px', height: '65px', objectFit: 'contain', marginBottom: '14px' }} />
              <div style={{ fontWeight: '600', fontSize: '14px', color: '#111827' }}>{brand.name}</div>
            </div>
          ))}
        </div>

        {/* Enhanced Car Listings */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#111827' }}>
            LUXURY SUPERCARS FOR SALE
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            Showing {cars.length} results
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {cars.map((car) => (
            <div
              key={car.id}
              style={{
                backgroundColor: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                gap: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: hoveredCar === car.id ? '0 12px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
                transform: hoveredCar === car.id ? 'translateY(-4px)' : 'translateY(0)',
                borderColor: hoveredCar === car.id ? '#2563eb' : '#e5e7eb'
              }}
              onMouseEnter={() => setHoveredCar(car.id)}
              onMouseLeave={() => setHoveredCar(null)}
            >
              <img 
                src={car.image}
                alt={car.name}
                style={{ 
                  width: '220px', 
                  height: '165px', 
                  objectFit: 'cover', 
                  borderRadius: '10px',
                  transition: 'transform 0.3s',
                  transform: hoveredCar === car.id ? 'scale(1.05)' : 'scale(1)'
                }}
              />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 'bold', marginBottom: '10px', color: '#111827', lineHeight: '1.4' }}>
                  {car.name}
                </h3>
                <p style={{ fontSize: '26px', fontWeight: 'bold', color: '#2563eb', marginBottom: '10px' }}>
                  ₱{car.price.toLocaleString()}
                </p>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', fontSize: '13px', color: '#6b7280' }}>
                  <span>📅 {car.year}</span>
                  <span>🚗 {car.mileage}</span>
                </div>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: 'auto' }}>
                  📍 {car.location}
                </p>
                <button 
                  style={{
                    marginTop: '16px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#1d4ed8';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCar(car);
                  }}
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
