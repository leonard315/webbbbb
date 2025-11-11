import { useState, useEffect, useRef } from 'react';

function AdminDashboard({ cars, orders = [], users = [], onBack, onAddCar }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const previousOrdersRef = useRef(orders);

  const stats = {
    totalCars: cars.length,
    totalOrders: orders.length,
    totalUsers: users.length,
    totalRevenue: orders.reduce((sum, order) => sum + parseFloat(order.amount || 0), 0)
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdateTime(new Date());
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Detect new orders
  useEffect(() => {
    if (previousOrdersRef.current.length < orders.length) {
      const newCount = orders.length - previousOrdersRef.current.length;
      setNewOrdersCount(newCount);
      
      // Show notification
      if (newCount > 0) {
        alert(`🔔 ${newCount} new order${newCount > 1 ? 's' : ''} received!`);
      }
      
      // Clear notification after 5 seconds
      setTimeout(() => setNewOrdersCount(0), 5000);
    }
    previousOrdersRef.current = orders;
  }, [orders]);

  // Get recent orders (last 24 hours)
  const getRecentOrders = () => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return orders.filter(order => {
      // For demo, we'll show all orders as "recent"
      return true;
    }).slice(0, 5);
  };

  const recentOrders = getRecentOrders();

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '20px', width: '100%' }}>
      {/* Add New Car Modal */}
      {showAddCarModal && (
        <AddCarModal 
          onClose={() => setShowAddCarModal(false)}
          onAddCar={onAddCar}
        />
      )}

      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* Header with Back Button */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '12px', 
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              🏎️ Admin Dashboard
            </h1>
            <p style={{ color: '#6b7280' }}>Manage your supercar dealership</p>
          </div>
          <button
            onClick={onBack}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6b7280'}
          >
            ← Back to Site
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '16px', 
          borderRadius: '12px', 
          marginBottom: '24px',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          {[
            { key: 'overview', label: 'Overview', icon: '📊' },
            { key: 'cars', label: 'Cars', icon: '🚗' },
            { key: 'orders', label: 'Orders', icon: '📦' },
            { key: 'users', label: 'Users', icon: '👥' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key)}
              style={{
                padding: '12px 24px',
                backgroundColor: activeSection === tab.key ? '#2563eb' : 'transparent',
                color: activeSection === tab.key ? 'white' : '#6b7280',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div>
            {/* Real-Time Update Banner */}
            {newOrdersCount > 0 && (
              <div style={{
                backgroundColor: '#22c55e',
                color: 'white',
                padding: '16px 24px',
                borderRadius: '12px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                animation: 'slideIn 0.3s ease-out'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>🔔</span>
                  <span style={{ fontWeight: '600', fontSize: '16px' }}>
                    {newOrdersCount} New Order{newOrdersCount > 1 ? 's' : ''} Received!
                  </span>
                </div>
                <button
                  onClick={() => setActiveSection('orders')}
                  style={{
                    backgroundColor: 'white',
                    color: '#22c55e',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  View Orders
                </button>
              </div>
            )}

            {/* Stats Cards */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '20px',
              marginBottom: '24px'
            }}>
              <StatCard 
                title="Total Cars" 
                value={stats.totalCars} 
                icon="🚗" 
                color="#2563eb" 
              />
              <StatCard 
                title="Total Orders" 
                value={stats.totalOrders} 
                icon="📦" 
                color="#22c55e" 
              />
              <StatCard 
                title="Total Users" 
                value={stats.totalUsers} 
                icon="👥" 
                color="#f59e0b" 
              />
              <StatCard 
                title="Total Revenue" 
                value={`₱${stats.totalRevenue.toLocaleString()}`} 
                icon="💰" 
                color="#8b5cf6" 
              />
            </div>

            {/* Live Order Feed */}
            <div style={{ 
              backgroundColor: 'white', 
              padding: '24px', 
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>
                  🔴 Live Order Feed
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#22c55e',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }}></div>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>
                    Last updated: {lastUpdateTime.toLocaleTimeString()}
                  </span>
                </div>
              </div>
              {recentOrders.length === 0 ? (
                <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
                  No recent orders
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      style={{
                        padding: '16px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        borderLeft: '4px solid #2563eb',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                          Order #{order.id} - {order.customer}
                        </div>
                        <div style={{ fontSize: '14px', color: '#6b7280' }}>
                          {order.car} • ₱{order.amount.toLocaleString()}
                        </div>
                      </div>
                      <span style={{
                        padding: '4px 12px',
                        backgroundColor: order.status === 'completed' ? '#dcfce7' : '#fef3c7',
                        color: order.status === 'completed' ? '#166534' : '#92400e',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: '600'
                      }}>
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div style={{ 
              backgroundColor: 'white', 
              padding: '24px', 
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
                Recent Activity
              </h3>
              <div style={{ color: '#6b7280' }}>
                {recentOrders.slice(0, 4).map((order, idx) => (
                  <p key={idx} style={{ padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                    ✅ New order received - {order.car}
                  </p>
                ))}
                {recentOrders.length === 0 && (
                  <p style={{ padding: '12px 0' }}>
                    No recent activity
                  </p>
                )}
              </div>
            </div>

            {/* Add CSS animation */}
            <style>{`
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
              }
              @keyframes slideIn {
                from {
                  transform: translateY(-20px);
                  opacity: 0;
                }
                to {
                  transform: translateY(0);
                  opacity: 1;
                }
              }
            `}</style>
          </div>
        )}

        {/* Cars Section */}
        {activeSection === 'cars' && (
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>
                Car Inventory
              </h3>
              <button 
                onClick={() => setShowAddCarModal(true)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              >
                + Add New Car
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Car</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Price</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Year</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={car.image} alt={car.name} style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} />
                          <span style={{ fontWeight: '500', color: '#111827' }}>{car.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px', color: '#2563eb', fontWeight: '600' }}>
                        ₱{car.price.toLocaleString()}
                      </td>
                      <td style={{ padding: '12px', color: '#6b7280' }}>{car.year}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 12px',
                          backgroundColor: '#dcfce7',
                          color: '#166534',
                          borderRadius: '12px',
                          fontSize: '13px',
                          fontWeight: '600'
                        }}>
                          Available
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <button style={{
                          padding: '6px 12px',
                          backgroundColor: '#eff6ff',
                          color: '#2563eb',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          marginRight: '8px'
                        }}>
                          Edit
                        </button>
                        <button style={{
                          padding: '6px 12px',
                          backgroundColor: '#fef2f2',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Section */}
        {activeSection === 'orders' && (
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#111827' }}>
              Orders Management
            </h3>
            {orders.length === 0 ? (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '40px' }}>
                No orders yet
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Order ID</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Customer</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Car</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Amount</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px', fontWeight: '500', color: '#111827' }}>#{order.id}</td>
                        <td style={{ padding: '12px', color: '#6b7280' }}>{order.customer}</td>
                        <td style={{ padding: '12px', color: '#6b7280' }}>{order.car}</td>
                        <td style={{ padding: '12px', color: '#2563eb', fontWeight: '600' }}>
                          ₱{order.amount.toLocaleString()}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '4px 12px',
                            backgroundColor: order.status === 'completed' ? '#dcfce7' : '#fef3c7',
                            color: order.status === 'completed' ? '#166534' : '#92400e',
                            borderRadius: '12px',
                            fontSize: '13px',
                            fontWeight: '600'
                          }}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Users Section */}
        {activeSection === 'users' && (
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#111827' }}>
              Users Management
            </h3>
            {users.length === 0 ? (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '40px' }}>
                No users yet
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Name</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Email</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Role</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Joined</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px', fontWeight: '500', color: '#111827' }}>{user.name}</td>
                        <td style={{ padding: '12px', color: '#6b7280' }}>{user.email}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '4px 12px',
                            backgroundColor: user.role === 'admin' ? '#ede9fe' : '#dbeafe',
                            color: user.role === 'admin' ? '#6b21a8' : '#1e40af',
                            borderRadius: '12px',
                            fontSize: '13px',
                            fontWeight: '600'
                          }}>
                            {user.role}
                          </span>
                        </td>
                        <td style={{ padding: '12px', color: '#6b7280' }}>{user.joined || 'Nov 2025'}</td>
                        <td style={{ padding: '12px' }}>
                          <button style={{
                            padding: '6px 12px',
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderLeft: `4px solid ${color}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>{title}</p>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>{value}</p>
        </div>
        <div style={{ fontSize: '40px' }}>{icon}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;


// Add Car Modal Component
function AddCarModal({ onClose, onAddCar }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    year: '2025',
    mileage: '0 km',
    engine: '',
    transmission: '',
    horsepower: '',
    topSpeed: '',
    acceleration: '',
    fuelType: 'Gasoline',
    color: '',
    condition: 'Brand New',
    location: 'Metro Manila',
    image: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCar = {
      id: Date.now(),
      ...formData,
      price: parseInt(formData.price)
    };
    onAddCar(newCar);
    alert(`${formData.name} added successfully!`);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 4000,
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
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '24px',
          borderRadius: '16px 16px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            🚗 Add New Car
          </h2>
          <button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '28px',
              cursor: 'pointer'
            }}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {/* Car Name */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                Car Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="2025 Ferrari SF90"
              />
            </div>

            {/* Price */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                Price (₱) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="25000000"
              />
            </div>

            {/* Year */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                Year *
              </label>
              <input
                type="number"
                required
                value={formData.year}
                onChange={(e) => handleChange('year', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="2025"
              />
            </div>

            {/* Engine */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                Engine *
              </label>
              <input
                type="text"
                required
                value={formData.engine}
                onChange={(e) => handleChange('engine', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="6.5L V12"
              />
            </div>

            {/* Horsepower */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                Horsepower *
              </label>
              <input
                type="text"
                required
                value={formData.horsepower}
                onChange={(e) => handleChange('horsepower', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="640 HP"
              />
            </div>

            {/* Transmission */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                Transmission *
              </label>
              <input
                type="text"
                required
                value={formData.transmission}
                onChange={(e) => handleChange('transmission', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="7-Speed Dual-Clutch"
              />
            </div>

            {/* Top Speed */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                Top Speed
              </label>
              <input
                type="text"
                value={formData.topSpeed}
                onChange={(e) => handleChange('topSpeed', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="325 km/h"
              />
            </div>

            {/* Color */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                Color *
              </label>
              <input
                type="text"
                required
                value={formData.color}
                onChange={(e) => handleChange('color', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="Rosso Corsa"
              />
            </div>

            {/* Location */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="Makati City"
              />
            </div>

            {/* Image URL */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                Image URL *
              </label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="https://example.com/car-image.jpg"
              />
            </div>

            {/* Description */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows="4"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
                placeholder="Describe the car..."
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '14px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '14px',
                backgroundColor: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
