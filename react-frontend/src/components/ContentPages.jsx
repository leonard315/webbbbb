// Content Pages Component for Navigation Links

export function UsedCarsPage({ cars, onViewDetails, onAddToCart }) {
  const usedCars = cars.filter(car => car.year < 2024);
  
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 16px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
        Used Supercars for Sale
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '32px', lineHeight: '1.7', fontSize: '16px' }}>
        Browse our collection of pre-owned luxury supercars. All vehicles are thoroughly inspected, certified, and come with complete service history.
      </p>

      {/* Stats Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {[
          { icon: '🚗', label: 'Available Cars', value: usedCars.length },
          { icon: '✅', label: 'Certified Pre-Owned', value: '100%' },
          { icon: '📋', label: 'Full History', value: 'Verified' },
          { icon: '🛡️', label: 'Warranty', value: 'Available' }
        ].map((stat, idx) => (
          <div key={idx} style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', marginBottom: '4px' }}>{stat.value}</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Why Buy Used Section */}
      <div style={{ backgroundColor: '#eff6ff', padding: '32px', borderRadius: '12px', marginBottom: '40px', border: '2px solid #2563eb' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#1e40af' }}>
          Why Buy a Used Supercar?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {[
            { title: 'Better Value', desc: 'Save up to 40% compared to new models' },
            { title: 'Lower Depreciation', desc: 'Minimal value loss after purchase' },
            { title: 'Proven Reliability', desc: 'Real-world performance history' },
            { title: 'Immediate Availability', desc: 'Drive home today, no waiting' }
          ].map((benefit, idx) => (
            <div key={idx}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>
                ✓ {benefit.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Car Grid */}
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>
        Available Used Supercars
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {usedCars.map((car) => (
          <CarCard key={car.id} car={car} onViewDetails={onViewDetails} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export function NewCarsPage({ cars, onViewDetails, onAddToCart }) {
  const newCars = cars.filter(car => car.year >= 2024);
  
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 16px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
        New Supercars 2024-2025
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '32px', lineHeight: '1.7', fontSize: '16px' }}>
        Discover the latest supercar models with cutting-edge technology, breathtaking performance, and stunning design. Be the first to own these automotive masterpieces.
      </p>

      {/* Features Section */}
      <div style={{ backgroundColor: '#f0fdf4', padding: '32px', borderRadius: '12px', marginBottom: '40px', border: '2px solid #22c55e' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#166534' }}>
          🌟 New Car Benefits
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {[
            { title: 'Factory Warranty', desc: 'Full manufacturer warranty coverage' },
            { title: 'Latest Technology', desc: 'Newest features and innovations' },
            { title: 'Customization', desc: 'Build your dream configuration' },
            { title: 'Zero Mileage', desc: 'Brand new, never driven' }
          ].map((benefit, idx) => (
            <div key={idx}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#166534', marginBottom: '8px' }}>
                ✓ {benefit.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Financing Options */}
      <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', marginBottom: '40px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
          💳 Flexible Financing Options
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>
          We offer competitive financing rates and flexible payment plans to make your dream car more accessible.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Calculate Monthly Payment
          </button>
          <button style={{
            padding: '12px 24px',
            backgroundColor: 'white',
            color: '#2563eb',
            border: '2px solid #2563eb',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Pre-Qualify Now
          </button>
        </div>
      </div>

      {/* Car Grid */}
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>
        Latest 2024-2025 Models
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {newCars.map((car) => (
          <CarCard key={car.id} car={car} onViewDetails={onViewDetails} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export function DealershipsPage() {
  const dealerships = [
    {
      name: 'Ferrari Manila',
      location: 'BGC, Taguig City',
      phone: '+63 2 8888 1234',
      hours: 'Mon-Sat: 9AM-7PM, Sun: 10AM-6PM',
      brands: ['Ferrari'],
      rating: 4.9,
      image: '🏢'
    },
    {
      name: 'Lamborghini BGC',
      location: 'Bonifacio Global City',
      phone: '+63 2 8888 5678',
      hours: 'Mon-Sat: 9AM-7PM, Sun: 10AM-6PM',
      brands: ['Lamborghini'],
      rating: 4.8,
      image: '🏢'
    },
    {
      name: 'Porsche Makati',
      location: 'Makati City',
      phone: '+63 2 8888 9012',
      hours: 'Mon-Sat: 9AM-7PM, Sun: Closed',
      brands: ['Porsche'],
      rating: 4.9,
      image: '🏢'
    },
    {
      name: 'McLaren Manila',
      location: 'Pasig City',
      phone: '+63 2 8888 3456',
      hours: 'Mon-Sat: 9AM-7PM, Sun: 10AM-5PM',
      brands: ['McLaren'],
      rating: 4.7,
      image: '🏢'
    },
    {
      name: 'Bentley Makati',
      location: 'Makati Avenue',
      phone: '+63 2 8888 7890',
      hours: 'Mon-Sat: 9AM-7PM, Sun: 10AM-6PM',
      brands: ['Bentley', 'Rolls-Royce'],
      rating: 4.9,
      image: '🏢'
    },
    {
      name: 'Aston Martin BGC',
      location: 'BGC, Taguig',
      phone: '+63 2 8888 2345',
      hours: 'Mon-Sat: 9AM-7PM, Sun: Closed',
      brands: ['Aston Martin'],
      rating: 4.8,
      image: '🏢'
    }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 16px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
        Authorized Dealerships
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '40px', lineHeight: '1.7', fontSize: '16px' }}>
        Visit our network of authorized dealerships across Metro Manila. Experience world-class service, expert consultation, and exclusive test drives.
      </p>

      {/* Dealership Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {dealerships.map((dealer, idx) => (
          <div key={idx} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '2px solid #e5e7eb',
            transition: 'transform 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px', textAlign: 'center' }}>{dealer.image}</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>
              {dealer.name}
            </h3>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📍</span> {dealer.location}
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📞</span> {dealer.phone}
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🕐</span> {dealer.hours}
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>⭐</span> {dealer.rating}/5.0 Rating
              </p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Brands:</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {dealer.brands.map((brand, i) => (
                  <span key={i} style={{
                    padding: '4px 12px',
                    backgroundColor: '#eff6ff',
                    color: '#2563eb',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {brand}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                flex: 1,
                padding: '10px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                Visit Dealer
              </button>
              <button style={{
                flex: 1,
                padding: '10px',
                backgroundColor: 'white',
                color: '#2563eb',
                border: '2px solid #2563eb',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                Get Directions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NewsPage() {
  const articles = [
    {
      title: '2025 Ferrari SF90 XX Stradale: Track-Focused Hybrid Hypercar',
      date: 'November 10, 2025',
      category: 'New Release',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Ferrari unveils the most powerful road-legal car ever made, combining a twin-turbo V8 with three electric motors for a total of 1,030 horsepower.',
      readTime: '5 min read'
    },
    {
      title: 'Lamborghini Revuelto: The Future of V12 Supercars',
      date: 'November 8, 2025',
      category: 'Review',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=600&q=80',
      excerpt: 'We test drive Lamborghini\'s first plug-in hybrid supercar. Does the electrified V12 live up to the legendary Aventador?',
      readTime: '8 min read'
    },
    {
      title: 'Porsche 911 Turbo S vs McLaren 720S: Track Battle',
      date: 'November 5, 2025',
      category: 'Comparison',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Two of the fastest supercars go head-to-head on the track. Which one comes out on top in our comprehensive comparison?',
      readTime: '10 min read'
    },
    {
      title: 'Electric Supercars: The Rise of Silent Speed',
      date: 'November 3, 2025',
      category: 'Industry News',
      image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=600&q=80',
      excerpt: 'How electric powertrains are revolutionizing the supercar industry. We explore the latest EV supercars and their incredible performance.',
      readTime: '6 min read'
    },
    {
      title: 'Buying Guide: What to Look for in a Used Supercar',
      date: 'November 1, 2025',
      category: 'Buying Guide',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Expert tips on purchasing a pre-owned supercar. Learn about inspection points, maintenance costs, and common issues to avoid.',
      readTime: '12 min read'
    },
    {
      title: 'Top 10 Supercars of 2025: Our Definitive List',
      date: 'October 28, 2025',
      category: 'Rankings',
      image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=600&q=80',
      excerpt: 'From Ferrari to McLaren, we rank the best supercars money can buy in 2025. Performance, design, and value all considered.',
      readTime: '15 min read'
    }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 16px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
        Supercar News & Reviews
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '40px', lineHeight: '1.7', fontSize: '16px' }}>
        Stay updated with the latest supercar news, expert reviews, buying guides, and industry insights from our team of automotive journalists.
      </p>

      {/* Featured Article */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '40px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '2px solid #2563eb'
      }}>
        <img src={articles[0].image} alt={articles[0].title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
        <div style={{ padding: '32px' }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center' }}>
            <span style={{
              padding: '6px 12px',
              backgroundColor: '#2563eb',
              color: 'white',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              FEATURED
            </span>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>{articles[0].date}</span>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>• {articles[0].readTime}</span>
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
            {articles[0].title}
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px', lineHeight: '1.7' }}>
            {articles[0].excerpt}
          </p>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            Read Full Article →
          </button>
        </div>
      </div>

      {/* Article Grid */}
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>
        Latest Articles
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {articles.slice(1).map((article, idx) => (
          <div key={idx} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            transition: 'transform 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <img src={article.image} alt={article.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{
                  padding: '4px 10px',
                  backgroundColor: '#eff6ff',
                  color: '#2563eb',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  {article.category}
                </span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>{article.date}</span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>• {article.readTime}</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#111827', lineHeight: '1.4' }}>
                {article.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', lineHeight: '1.6' }}>
                {article.excerpt}
              </p>
              <button style={{
                color: '#2563eb',
                backgroundColor: 'transparent',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px',
                padding: 0
              }}>
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Reusable Car Card Component
function CarCard({ car, onViewDetails, onAddToCart }) {
  return (
    <div style={{
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
            onClick={() => onViewDetails(car)}
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
            onClick={() => onAddToCart(car)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
