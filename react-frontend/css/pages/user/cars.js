// src/data/cars.js

export const cars = [
    {
      id: 1,
      name: 'Azure Phantom',
      company: 'Ferrari',
      description: 'A masterpiece of speed and elegance, with a top speed of 250 mph.',
      imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
      price: 450000,
      specs: [
        { icon: '⚡️', label: 'Engine', value: 'V12 Hybrid' },
        { icon: '🐎', label: 'Horsepower', value: '986 HP' },
        { icon: '⏱️', label: '0-60 mph', value: '2.5s' },
        { icon: '🎨', label: 'Color', value: 'Azure Blue' },
      ],
    },
    {
      id: 2,
      name: 'Crimson Fury',
      company: 'Lamborghini',
      description: 'Unleash the beast with this V12-powered hypercar.',
      imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      price: 780000,
      specs: [
        { icon: '⚡️', label: 'Engine', value: 'V12 Aspirated' },
        { icon: '🐎', label: 'Horsepower', value: '759 HP' },
        { icon: '⏱️', label: '0-60 mph', value: '2.8s' },
        { icon: '🎨', label: 'Color', value: 'Crimson Red' },
      ],
    },
    {
      id: 3,
      name: 'Solaris GT',
      company: 'Porsche',
      description: 'Experience the future of driving with advanced hybrid technology.',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      price: 620000,
      specs: [
        { icon: '⚡️', label: 'Engine', value: '4.6L V8 Hybrid' },
        { icon: '🐎', label: 'Horsepower', value: '887 HP' },
        { icon: '⏱️', label: '0-60 mph', value: '2.6s' },
        { icon: '🎨', label: 'Color', value: 'Liquid Metal Silver' },
      ],
    },
    {
      id: 4,
      name: 'Midnight Shadow',
      company: 'McLaren',
      description: 'Sleek, silent, and deadly fast. The ultimate electric supercar.',
      imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80',
      price: 890000,
      specs: [
        { icon: '⚡️', label: 'Engine', value: '4.0L Twin-Turbo V8' },
        { icon: '🐎', label: 'Horsepower', value: '789 HP' },
        { icon: '⏱️', label: '0-60 mph', value: '2.8s' },
        { icon: '🎨', label: 'Color', 'value': 'Onyx Black' },
      ],
    },
  ];
  
  export const getCarById = (id) => {
    // eslint-disable-next-line eqeqeq
    return cars.find(car => car.id == id);
  };
  