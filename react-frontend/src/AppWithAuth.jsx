import { useState, useEffect } from 'react';
import AdminDashboard from './components/AdminDashboard';
import { UsedCarsPage, NewCarsPage, DealershipsPage, NewsPage } from './components/ContentPages';
import { authService } from './services/authService';
import { carService } from './services/carService';
import { orderService } from './services/orderService';
import { userService } from './services/userService';

function AppWithAuth() {
  const [activeTab, setActiveTab] = useState('brand');
  const [hoveredCar, setHoveredCar] = useState(null);
  const [activePage, setActivePage] = useState('home');
  const [selectedCar, setSelectedCar] = useState(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('supercarsPH_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('supercarsPH_user');
    return savedUser !== null;
  });
  const [user, setUser] = useState(() => {
    // Load user from localStorage on initial render
    const savedUser = localStorage.getItem('supercarsPH_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    brand: '',
    model: '',
    bodyType: '',
    priceRange: ''
  });
  const [filteredCars, setFilteredCars] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [orders, setOrders] = useState([]);
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await carService.getAllCars();
        setCars(data);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
        // Fallback to empty array if API fails
        setCars([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, []);

  // Fetch orders for admin
  useEffect(() => {
    if (isLoggedIn && user?.role === 'admin') {
      const fetchOrders = async () => {
        try {
          const data = await orderService.getAllOrders();
          setOrders(data);
        } catch (error) {
          console.error('Failed to fetch orders:', error);
          setOrders([]);
        }
      };
      
      fetchOrders();
      
      // Poll for new orders every 30 seconds
      const interval = setInterval(fetchOrders, 30000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn, user]);

  // Fetch users for admin
  useEffect(() => {
    if (isLoggedIn && user?.role === 'admin') {
      const fetchUsers = async () => {
        try {
          const data = await userService.getAllUsers();
          setUsers(data);
        } catch (error) {
          console.error('Failed to fetch users:', error);
          setUsers([]);
        }
      };
      
      fetchUsers();
    }
  }, [isLoggedIn, user]);

  // Persist user session to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('supercarsPH_user', JSON.stringify(user));
      localStorage.setItem('supercarsPH_isLoggedIn', 'true');
    } else {
      localStorage.removeItem('supercarsPH_user');
      localStorage.removeItem('supercarsPH_isLoggedIn');
    }
  }, [user]);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('supercarsPH_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (car) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    const existingItem = cart.find(item => item.id === car.id);
    if (existingItem) {
      alert('This car is already in your cart!');
    } else {
      setCart([...cart, { ...car, quantity: 1 }]);
      alert(`${car.name} added to cart!`);
    }
  };

  const removeFromCart = (carId) => {
    setCart(cart.filter(item => item.id !== carId));
  };

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const data = await authService.login(email, password);
      setUser(data.user);
      setIsLoggedIn(true);
      setShowAuthModal(false);
      alert('Login successful!');
    } catch (error) {
      alert(typeof error === 'string' ? error : 'Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      setLoading(true);
      const data = await authService.register(name, email, password, password);
      
      // Show success message and switch to login
      alert('✅ Registration successful! You can now login with your credentials.');
      setAuthMode('login');
      
      // Don't auto-login, let user login manually
      // This is more professional and gives user control
    } catch (error) {
      alert(typeof error === 'string' ? error : 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsLoggedIn(false);
      setCart([]);
      setActivePage('home');
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local state anyway
      setUser(null);
      setIsLoggedIn(false);
      setCart([]);
      setActivePage('home');
    }
  };

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

  // Add car handler for admin
  const handleAddCar = async (newCar) => {
    try {
      const data = await carService.createCar(newCar);
      setCars([...cars, data.car]);
      alert(`${data.car.name} has been added successfully!`);
    } catch (error) {
      alert('Failed to add car. Please try again.');
      console.error('Add car error:', error);
    }
  };

  const brands = [
    { name: 'Ferrari', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Ferrari_Logo.svg/120px-Ferrari_Logo.svg.png' },
    { name: 'Lamborghini', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Lamborghini_Logo.svg/120px-Lamborghini_Logo.svg.png' },
    { name: 'Porsche', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Porsche_logo.svg/120px-Porsche_logo.svg.png' },
    { name: 'McLaren', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/McLaren_logo.svg/120px-McLaren_logo.svg.png' }
  ];

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Login/Register Modal */}
      {showAuthModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(4px)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          overflow: 'auto',
          animation: 'fadeIn 0.2s ease-out'
        }}
        onClick={() => {
          setShowAuthModal(false);
          setAuthMode('login');
        }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { 
                opacity: 0;
                transform: translateY(20px);
              }
              to { 
                opacity: 1;
                transform: translateY(0);
              }
            }
            @media (max-width: 640px) {
              .auth-modal-container {
                padding: 24px !important;
                max-width: 100% !important;
              }
              .auth-modal-title {
                font-size: 24px !important;
              }
              .auth-modal-icon {
                font-size: 40px !important;
              }
            }
          `}</style>
          <div 
            className="auth-modal-container"
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              maxWidth: '480px',
              width: '100%',
              padding: '40px',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              animation: 'slideUp 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: '#f3f4f6',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                fontWeight: 'bold'
              }}
              onClick={() => {
                setShowAuthModal(false);
                setAuthMode('login');
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
                e.currentTarget.style.color = '#111827';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              ×
            </button>

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div 
                className="auth-modal-icon"
                style={{ 
                  fontSize: '56px', 
                  marginBottom: '16px',
                  animation: 'slideUp 0.4s ease-out'
                }}
              >
                🏎️
              </div>
              <h2 
                className="auth-modal-title"
                style={{ 
                  fontSize: '32px', 
                  fontWeight: 'bold', 
                  marginBottom: '8px', 
                  color: '#111827',
                  animation: 'slideUp 0.5s ease-out'
                }}
              >
                {authMode === 'login' ? 'Welcome Back!' : 'Join SuperCars PH'}
              </h2>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '15px',
                animation: 'slideUp 0.6s ease-out'
              }}>
                {authMode === 'login' 
                  ? 'Sign in to access your account and continue shopping' 
                  : 'Create an account to start your supercar journey'}
              </p>
            </div>

            {authMode === 'login' ? (
              <LoginForm onLogin={handleLogin} loading={loading} />
            ) : (
              <RegisterForm onRegister={handleRegister} loading={loading} />
            )}

            <div style={{ 
              marginTop: '28px', 
              paddingTop: '24px',
              borderTop: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '0' }}>
                {authMode === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      style={{ 
                        color: '#2563eb', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        fontWeight: '600', 
                        fontSize: '14px',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        transition: 'all 0.2s'
                      }}
                      onClick={() => setAuthMode('register')}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#eff6ff';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Create account →
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      style={{ 
                        color: '#2563eb', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        fontWeight: '600', 
                        fontSize: '14px',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        transition: 'all 0.2s'
                      }}
                      onClick={() => setAuthMode('login')}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#eff6ff';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Sign in →
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Car Details Modal */}
      {selectedCar && !showPaymentModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 2500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          overflow: 'auto'
        }}
        onClick={() => setSelectedCar(null)}
        >
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
          >
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
                zIndex: 10
              }}
              onClick={() => setSelectedCar(null)}
            >
              ×
            </button>
            <img src={selectedCar.image} alt={selectedCar.name} style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '16px 16px 0 0' }} />
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>
                {selectedCar.name}
              </h2>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb', marginBottom: '20px' }}>
                ₱{selectedCar.price.toLocaleString()}
              </p>
              <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.7' }}>
                {selectedCar.description}
              </p>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '16px',
                marginBottom: '24px',
                padding: '20px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px'
              }}>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>ENGINE</p>
                  <p style={{ fontSize: '15px', color: '#111827', fontWeight: '600' }}>{selectedCar.engine}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>HORSEPOWER</p>
                  <p style={{ fontSize: '15px', color: '#111827', fontWeight: '600' }}>{selectedCar.horsepower}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>TOP SPEED</p>
                  <p style={{ fontSize: '15px', color: '#111827', fontWeight: '600' }}>{selectedCar.topSpeed}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '600' }}>ACCELERATION</p>
                  <p style={{ fontSize: '15px', color: '#111827', fontWeight: '600' }}>{selectedCar.acceleration}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <button
                  style={{
                    flex: 1,
                    padding: '16px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  onClick={() => {
                    addToCart(selectedCar);
                    setSelectedCar(null);
                  }}
                >
                  🛒 Add to Cart
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '16px',
                    backgroundColor: '#22c55e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
                  onClick={() => {
                    if (!isLoggedIn) {
                      setShowAuthModal(true);
                    } else {
                      setShowPaymentModal(true);
                    }
                  }}
                >
                  💳 Online Order
                </button>
              </div>

              {/* Payment Methods Info */}
              <div style={{
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                  💳 Available Payment Methods:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Credit Card', 'Debit Card', 'GCash', 'PayMaya', 'Bank Transfer', 'Cash'].map((method) => (
                    <span key={method} style={{
                      padding: '6px 12px',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#6b7280'
                    }}>
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedCar && (
        <PaymentModal
          car={selectedCar}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedCar(null);
          }}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      )}

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
            zIndex: 3500,
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
              zIndex: 3501
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
              {/* User Info */}
              {isLoggedIn && (
                <div style={{
                  padding: '16px',
                  backgroundColor: '#eff6ff',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  border: '2px solid #2563eb'
                }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Logged in as</p>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e40af' }}>👤 {user?.name}</p>
                  {user?.role === 'admin' && (
                    <span style={{
                      display: 'inline-block',
                      marginTop: '8px',
                      padding: '4px 8px',
                      backgroundColor: '#8b5cf6',
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}>
                      ADMIN
                    </span>
                  )}
                </div>
              )}

              {/* Navigation Links */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#6b7280', marginBottom: '12px', textTransform: 'uppercase' }}>
                  Navigation
                </h4>
                {[
                  { label: 'Home', page: 'home', icon: '🏠' },
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
                {isLoggedIn ? (
                  <>
                    {user?.role === 'admin' && (
                      <button
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          marginBottom: '8px',
                          backgroundColor: '#8b5cf6',
                          border: 'none',
                          borderRadius: '8px',
                          color: 'white',
                          fontWeight: '600',
                          fontSize: '15px',
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                        onClick={() => {
                          setActivePage('admin');
                          setSidePanelOpen(false);
                        }}
                      >
                        📊 Admin Dashboard
                      </button>
                    )}
                    <button
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        marginBottom: '8px',
                        backgroundColor: '#f59e0b',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '15px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onClick={() => {
                        setActivePage('cart');
                        setSidePanelOpen(false);
                      }}
                    >
                      🛒 View Cart ({cart.length})
                    </button>
                    <button
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        backgroundColor: '#dc2626',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '15px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onClick={() => {
                        handleLogout();
                        setSidePanelOpen(false);
                      }}
                    >
                      🚪 Logout
                    </button>
                  </>
                ) : (
                  <button
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      backgroundColor: '#22c55e',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '15px',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onClick={() => {
                      setShowAuthModal(true);
                      setSidePanelOpen(false);
                    }}
                  >
                    🔐 Login / Register
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show Admin Dashboard if logged in as admin */}
      {isLoggedIn && user?.role === 'admin' && activePage === 'admin' ? (
        <AdminDashboard 
          cars={cars} 
          orders={orders}
          users={users}
          onBack={() => setActivePage('home')}
          onAddCar={handleAddCar}
        />
      ) : (
        <>
          {/* Navigation Bar */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>🏎️ SuperCars PH</h2>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {isLoggedIn ? (
                  <>
                    <span style={{ color: 'white', fontSize: '14px', marginRight: '8px' }}>
                      👤 {user?.name}
                    </span>
                    {user?.role === 'admin' && (
                      <button
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#8b5cf6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          fontSize: '13px'
                        }}
                        onClick={() => setActivePage('admin')}
                      >
                        📊 Dashboard
                      </button>
                    )}
                    <button
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '13px',
                        position: 'relative'
                      }}
                      onClick={() => setActivePage('cart')}
                    >
                      🛒 Cart
                      {cart.length > 0 && (
                        <span style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          backgroundColor: '#dc2626',
                          color: 'white',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: 'bold'
                        }}>
                          {cart.length}
                        </span>
                      )}
                    </button>
                    <button
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '13px'
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#22c55e',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                    onClick={() => setShowAuthModal(true)}
                  >
                    Login / Register
                  </button>
                )}
                
                {/* Menu Button - Always visible */}
                <button
                  style={{
                    padding: '10px 16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
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
                { label: 'Used', page: 'used', icon: '🔄' },
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

          {/* Cart Page */}
          {activePage === 'cart' && isLoggedIn ? (
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 16px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>
                🛒 Shopping Cart
              </h1>
              {cart.length === 0 ? (
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '60px', 
                  borderRadius: '12px', 
                  textAlign: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '20px' }}>
                    Your cart is empty
                  </p>
                  <button
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                    onClick={() => setActivePage('home')}
                  >
                    Browse Cars
                  </button>
                </div>
              ) : (
                <div>
                  {cart.map((item) => (
                    <div key={item.id} style={{
                      backgroundColor: 'white',
                      padding: '20px',
                      borderRadius: '12px',
                      marginBottom: '16px',
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'center',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                      <img src={item.image} alt={item.name} style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>
                          {item.name}
                        </h3>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
                          ₱{item.price.toLocaleString()}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                          style={{
                            padding: '10px 20px',
                            backgroundColor: '#22c55e',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            setSelectedCar(item);
                            setShowPaymentModal(true);
                          }}
                        >
                          Buy Now
                        </button>
                        <button
                          style={{
                            padding: '10px 20px',
                            backgroundColor: '#dc2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '12px',
                    marginTop: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>Total:</h3>
                      <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>
                        ₱{cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : activePage === 'cart' ? (
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 16px', textAlign: 'center' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
                Please login to view your cart
              </h1>
              <button
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
                onClick={() => setShowAuthModal(true)}
              >
                Login / Register
              </button>
            </div>
          ) : activePage === 'used' ? (
            <UsedCarsPage cars={cars} onViewDetails={setSelectedCar} onAddToCart={addToCart} />
          ) : activePage === 'new' ? (
            <NewCarsPage cars={cars} onViewDetails={setSelectedCar} onAddToCart={addToCart} />
          ) : activePage === 'dealers' ? (
            <DealershipsPage />
          ) : activePage === 'news' ? (
            <NewsPage />
          ) : (
            /* Main Content - Car Listings */
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 16px' }}>
              <p style={{ color: '#6b7280', marginBottom: '40px', lineHeight: '1.7', fontSize: '15px' }}>
                Discover the world's most exclusive supercars and luxury vehicles.
              </p>

              {/* Search Results Header */}
              {isSearchActive && (
                <div style={{
                  backgroundColor: '#eff6ff',
                  padding: '16px 20px',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '2px solid #2563eb'
                }}>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e40af', marginBottom: '4px' }}>
                      🔍 Search Results: {filteredCars.length} car(s) found
                    </p>
                    <p style={{ fontSize: '13px', color: '#6b7280' }}>
                      {searchFilters.brand && `Brand: ${searchFilters.brand} `}
                      {searchFilters.model && `Model: ${searchFilters.model} `}
                      {searchFilters.bodyType && `Body: ${searchFilters.bodyType} `}
                      {searchFilters.priceRange && `Price: ${searchFilters.priceRange}`}
                    </p>
                  </div>
                  <button
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                    onClick={clearSearch}
                  >
                    Clear Search
                  </button>
                </div>
              )}

              {/* Car Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                {(isSearchActive ? filteredCars : cars).map((car) => (
                  <div key={car.id} style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <img src={car.image} alt={car.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                    <div style={{ padding: '20px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>
                        {car.name}
                      </h3>
                      <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#2563eb', marginBottom: '16px' }}>
                        ₱{car.price.toLocaleString()}
                      </p>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                          style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                          onClick={() => setSelectedCar(car)}
                        >
                          View Details
                        </button>
                        <button
                          style={{
                            flex: 1,
                            padding: '12px',
                            backgroundColor: '#22c55e',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                          onClick={() => addToCart(car)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Login Form Component
function LoginForm({ onLogin, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    await onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: errors.email ? '2px solid #dc2626' : '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box'
          }}
          placeholder="your@email.com"
          onFocus={(e) => {
            if (!errors.email) e.target.style.borderColor = '#2563eb';
          }}
          onBlur={(e) => {
            if (!errors.email) e.target.style.borderColor = '#e5e7eb';
          }}
        />
        {errors.email && (
          <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '6px', marginBottom: '0' }}>
            {errors.email}
          </p>
        )}
      </div>
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
          Password
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            style={{
              width: '100%',
              padding: '12px 48px 12px 16px',
              border: errors.password ? '2px solid #dc2626' : '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
            placeholder="••••••••"
            onFocus={(e) => {
              if (!errors.password) e.target.style.borderColor = '#2563eb';
            }}
            onBlur={(e) => {
              if (!errors.password) e.target.style.borderColor = '#e5e7eb';
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              color: '#6b7280',
              padding: '4px'
            }}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.password && (
          <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '6px', marginBottom: '0' }}>
            {errors.password}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: loading ? '#93c5fd' : '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          opacity: loading ? 0.7 : 1,
          boxShadow: loading ? 'none' : '0 2px 8px rgba(37, 99, 235, 0.3)'
        }}
        onMouseOver={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = '#1d4ed8';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.4)';
          }
        }}
        onMouseOut={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = '#2563eb';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.3)';
          }
        }}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ 
              display: 'inline-block',
              width: '16px',
              height: '16px',
              border: '2px solid white',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite'
            }}></span>
            Logging in...
          </span>
        ) : 'Sign In'}
      </button>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}

// Register Form Component
function RegisterForm({ onRegister, loading }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    await onRegister(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors({ ...errors, name: '' });
          }}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: errors.name ? '2px solid #dc2626' : '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box'
          }}
          placeholder="John Doe"
          onFocus={(e) => {
            if (!errors.name) e.target.style.borderColor = '#22c55e';
          }}
          onBlur={(e) => {
            if (!errors.name) e.target.style.borderColor = '#e5e7eb';
          }}
        />
        {errors.name && (
          <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '6px', marginBottom: '0' }}>
            {errors.name}
          </p>
        )}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: errors.email ? '2px solid #dc2626' : '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box'
          }}
          placeholder="your@email.com"
          onFocus={(e) => {
            if (!errors.email) e.target.style.borderColor = '#22c55e';
          }}
          onBlur={(e) => {
            if (!errors.email) e.target.style.borderColor = '#e5e7eb';
          }}
        />
        {errors.email && (
          <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '6px', marginBottom: '0' }}>
            {errors.email}
          </p>
        )}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
          Password
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            style={{
              width: '100%',
              padding: '12px 48px 12px 16px',
              border: errors.password ? '2px solid #dc2626' : '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
            placeholder="••••••••"
            onFocus={(e) => {
              if (!errors.password) e.target.style.borderColor = '#22c55e';
            }}
            onBlur={(e) => {
              if (!errors.password) e.target.style.borderColor = '#e5e7eb';
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              color: '#6b7280',
              padding: '4px'
            }}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.password && (
          <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '6px', marginBottom: '0' }}>
            {errors.password}
          </p>
        )}
        <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '6px', marginBottom: '0' }}>
          Must be at least 8 characters long
        </p>
      </div>
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
          Confirm Password
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
            }}
            style={{
              width: '100%',
              padding: '12px 48px 12px 16px',
              border: errors.confirmPassword ? '2px solid #dc2626' : '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
            placeholder="••••••••"
            onFocus={(e) => {
              if (!errors.confirmPassword) e.target.style.borderColor = '#22c55e';
            }}
            onBlur={(e) => {
              if (!errors.confirmPassword) e.target.style.borderColor = '#e5e7eb';
            }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              color: '#6b7280',
              padding: '4px'
            }}
          >
            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.confirmPassword && (
          <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '6px', marginBottom: '0' }}>
            {errors.confirmPassword}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: loading ? '#86efac' : '#22c55e',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          opacity: loading ? 0.7 : 1,
          boxShadow: loading ? 'none' : '0 2px 8px rgba(34, 197, 94, 0.3)'
        }}
        onMouseOver={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = '#16a34a';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.4)';
          }
        }}
        onMouseOut={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = '#22c55e';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(34, 197, 94, 0.3)';
          }
        }}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ 
              display: 'inline-block',
              width: '16px',
              height: '16px',
              border: '2px solid white',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite'
            }}></span>
            Creating Account...
          </span>
        ) : 'Create Account'}
      </button>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}

// Payment Modal Component
function PaymentModal({ car, onClose, paymentMethod, setPaymentMethod }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [gcashNumber, setGcashNumber] = useState('');
  const [gcashName, setGcashName] = useState('');
  const [proofOfPayment, setProofOfPayment] = useState(null);
  const [proofPreview, setProofPreview] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofOfPayment(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    try {
      // Create order in database
      const orderData = {
        car_id: car.id,
        payment_method: paymentMethod,
        amount: car.price,
        status: 'pending'
      };

      const response = await orderService.createOrder(orderData);
      
      alert(`✅ Order placed successfully!\n\nOrder ID: #${response.order.id}\nCar: ${car.name}\nAmount: ₱${car.price.toLocaleString()}\nPayment Method: ${paymentMethod}\n\nYour order is being processed. We'll contact you shortly!`);
      onClose();
      
      // Refresh the page to update orders list
      window.location.reload();
    } catch (error) {
      console.error('Order creation error:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      overflow: 'auto'
    }}
    onClick={onClose}
    >
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        maxWidth: '500px',
        width: '100%',
        padding: '40px',
        position: 'relative'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        <button
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            color: '#6b7280'
          }}
          onClick={onClose}
        >
          ×
        </button>

        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>
          Payment Details
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          {car.name}
        </p>
        <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#2563eb', marginBottom: '32px' }}>
          ₱{car.price.toLocaleString()}
        </p>

        <form onSubmit={handlePayment}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#374151' }}>
              Select Payment Method
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {['Credit Card', 'Debit Card', 'GCash', 'PayMaya', 'Bank Transfer', 'Cash'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  style={{
                    padding: '12px',
                    border: paymentMethod === method ? '2px solid #2563eb' : '2px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: paymentMethod === method ? '#eff6ff' : 'white',
                    color: paymentMethod === method ? '#2563eb' : '#374151',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {(paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  maxLength="16"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="JOHN DOE"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                    maxLength="5"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                    maxLength="3"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="123"
                  />
                </div>
              </div>
            </>
          )}

          {(paymentMethod === 'GCash' || paymentMethod === 'PayMaya') && (
            <>
              <div style={{
                backgroundColor: '#eff6ff',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '2px solid #2563eb'
              }}>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>
                  📱 {paymentMethod} Payment Instructions:
                </p>
                <ol style={{ fontSize: '13px', color: '#374151', paddingLeft: '20px', margin: '0' }}>
                  <li>Send payment to: <strong>0917-123-4567</strong></li>
                  <li>Amount: <strong>₱{car.price.toLocaleString()}</strong></li>
                  <li>Take a screenshot of the payment confirmation</li>
                  <li>Upload the proof of payment below</li>
                </ol>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                  Your {paymentMethod} Number
                </label>
                <input
                  type="tel"
                  value={gcashNumber}
                  onChange={(e) => setGcashNumber(e.target.value)}
                  required
                  maxLength="11"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="09171234567"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                  Account Name
                </label>
                <input
                  type="text"
                  value={gcashName}
                  onChange={(e) => setGcashName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Juan Dela Cruz"
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                  Upload Proof of Payment *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                  }}
                />
                {proofPreview && (
                  <div style={{ marginTop: '12px', textAlign: 'center' }}>
                    <img 
                      src={proofPreview} 
                      alt="Proof of payment preview" 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '200px', 
                        borderRadius: '8px',
                        border: '2px solid #e5e7eb'
                      }} 
                    />
                    <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                      Preview of your proof of payment
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {paymentMethod === 'Bank Transfer' && (
            <div style={{
              backgroundColor: '#fef3c7',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '24px',
              border: '2px solid #f59e0b'
            }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#92400e', marginBottom: '8px' }}>
                🏦 Bank Transfer Details:
              </p>
              <div style={{ fontSize: '13px', color: '#78350f' }}>
                <p style={{ margin: '4px 0' }}><strong>Bank:</strong> BDO Unibank</p>
                <p style={{ margin: '4px 0' }}><strong>Account Name:</strong> SuperCars PH Inc.</p>
                <p style={{ margin: '4px 0' }}><strong>Account Number:</strong> 1234-5678-9012</p>
                <p style={{ margin: '4px 0' }}><strong>Amount:</strong> ₱{car.price.toLocaleString()}</p>
              </div>
            </div>
          )}

          {paymentMethod === 'Cash' && (
            <div style={{
              backgroundColor: '#dcfce7',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '24px',
              border: '2px solid #22c55e'
            }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#166534', marginBottom: '8px' }}>
                💵 Cash Payment:
              </p>
              <p style={{ fontSize: '13px', color: '#14532d', margin: '0' }}>
                Please visit our showroom at BGC, Taguig to complete your cash payment. Our team will assist you with the transaction.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={!paymentMethod}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: paymentMethod ? '#22c55e' : '#d1d5db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: paymentMethod ? 'pointer' : 'not-allowed'
            }}
          >
            Complete Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default AppWithAuth;
