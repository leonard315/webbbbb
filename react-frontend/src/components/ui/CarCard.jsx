const CarCard = ({ car }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      padding: '12px',
      display: 'flex',
      gap: '12px',
      cursor: 'pointer',
      transition: 'box-shadow 0.2s'
    }}>
      <img 
        src={car.imageUrl} 
        alt={car.name} 
        style={{
          width: '100px',
          height: '70px',
          objectFit: 'cover',
          borderRadius: '4px'
        }}
      />
      <div style={{ flex: 1 }}>
        <h4 style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '6px',
          lineHeight: '1.3'
        }}>
          {car.name}
        </h4>
        <p style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#2563eb',
          marginBottom: '4px'
        }}>
          ₱{car.price.toLocaleString()}
        </p>
        <p style={{
          fontSize: '11px',
          color: '#6b7280'
        }}>
          📍 {car.location}
        </p>
      </div>
    </div>
  );
};

export default CarCard;
