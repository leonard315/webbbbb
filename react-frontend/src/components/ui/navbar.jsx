const NavBar = () => {
  return (
    <nav style={{ backgroundColor: '#1e40af', color: 'white' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' }}>
          <div style={{ display: 'flex', gap: '24px', fontSize: '13px', fontWeight: '600' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>CARS FOR SALE</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>USED CARS</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>NEW CARS</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>DEALERSHIPS</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>NEWS & REVIEWS</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>•••</a>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              🔍
            </button>
            <button style={{
              backgroundColor: '#22c55e',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '4px',
              border: 'none',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '13px'
            }}>
              SELL MY CAR
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
