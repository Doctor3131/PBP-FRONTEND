// src/data.js
export const CATEGORIES = [
  'Keyboards',
  'Switches', 
  'Keycaps',
  'PCB',
  'Dampeners',
  'Lubricants',
  'Plates',
  'Desk Mats',
  'Stabilizers',
  'Cables',
  'Tools & Accessories'
];

export const PRODUCTS = {
  keyboards: [
    { name: 'GMMK Pro 75% Black', price: 3500000, stock: 15, img: 'https://images.unsplash.com/photo-1611078481967-9c2763a58d53', specs: '75% layout, hot-swappable' },
    { name: 'Keychron Q1 Pro QMK/VIA', price: 2800000, stock: 20, img: 'https://images.unsplash.com/photo-1598300050365-1c71da7d129c', specs: 'QMK/VIA supported, Aluminum body' },
    { name: 'Mode SixtyFive Custom', price: 5500000, stock: 8, img: 'https://images.unsplash.com/photo-1625721123452-9ff0a5c4a8f2', specs: '65% custom build, premium keycaps' },
    { name: 'Zoom65 Essential Edition', price: 2200000, stock: 25, img: 'https://images.unsplash.com/photo-1618255692741-3e71aaf91b30', specs: '65% layout, budget-friendly' },
    { name: 'NK65 Entry Edition Smoke', price: 1800000, stock: 30, img: 'https://images.unsplash.com/photo-1605902711622-cfb43c4430da', specs: 'Entry-level 65%, smoke edition' },
    { name: 'Tofu60 Acrylic Case Kit', price: 1500000, stock: 18, img: 'https://images.unsplash.com/photo-1617755558420-5c3dcfc8eac4', specs: '60% acrylic kit, DIY assembly' },
    { name: 'KBD67 Lite R4 Wireless', price: 1900000, stock: 22, img: 'https://images.unsplash.com/photo-1621035354254-1f20672a3a01', specs: 'Wireless 65%, hot-swap' },
    { name: 'Bakeneko60 Hotswap Kit', price: 950000, stock: 35, img: 'https://images.unsplash.com/photo-1624903956392-1a1c05c8b4f2', specs: '60% hotswap kit, budget' },
    { name: 'Tiger Lite 80 TKL Kit', price: 2400000, stock: 12, img: 'https://images.unsplash.com/photo-1618237188504-83a6b38c5c34', specs: 'TKL kit, premium feel' },
    { name: 'Ikki68 Aurora R2 Charcoal', price: 3200000, stock: 10, img: 'https://images.unsplash.com/photo-1621737713312-b8c7a06e1b92', specs: '68% layout, charcoal color' },
    { name: 'Royal Kludge RK84 Hotswap', price: 850000, stock: 40, img: 'https://images.unsplash.com/photo-1617899524012-0e7d5c23f1d3', specs: '84 keys, hot-swap' },
    { name: 'Keychron K8 Pro Brown', price: 1650000, stock: 28, img: 'https://images.unsplash.com/photo-1621737093564-6b9d6e2d9b84', specs: 'TKL, brown switches' },
    { name: 'Womier K87 Gasket Mount', price: 950000, stock: 32, img: 'https://images.unsplash.com/photo-1618246438935-98f2b49a5c02', specs: '87 keys, gasket mount' }
  ],

  switches: [
    { name: 'Gateron Oil King Linear 90pcs', price: 650000, stock: 50, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b1b', specs: 'Linear switch pack' },
    { name: 'Cherry MX Black Hyperglide 90pcs', price: 750000, stock: 45, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b1c', specs: 'Linear black switches' },
    { name: 'Gateron Milky Yellow Pro 90pcs', price: 280000, stock: 80, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b1d', specs: 'Linear yellow switches' },
    { name: 'Akko V3 Cream Yellow 90pcs', price: 320000, stock: 70, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b1e', specs: 'Linear yellow cream switches' },
    { name: 'Gateron CJ Linear 90pcs', price: 580000, stock: 55, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b1f', specs: 'Linear pack' },
    { name: 'JWK Durock L7 Linear 90pcs', price: 720000, stock: 40, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b20', specs: 'Linear L7 switches' },
    { name: 'Glorious Panda Tactile 90pcs', price: 850000, stock: 35, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b21', specs: 'Tactile pack' },
    { name: 'Durock T1 Tactile 90pcs', price: 620000, stock: 48, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b22', specs: 'Tactile T1 switches' },
    { name: 'Akko V3 Lavender Purple 90pcs', price: 340000, stock: 65, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b23', specs: 'Tactile purple switches' },
    { name: 'Boba U4T Tactile 90pcs', price: 780000, stock: 42, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b24', specs: 'Tactile U4T' },
    { name: 'Gateron Brown Pro 90pcs', price: 380000, stock: 75, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b25', specs: 'Tactile brown switches' },
    { name: 'Kailh Box White Clicky 90pcs', price: 420000, stock: 30, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b26', specs: 'Clicky white switches' },
    { name: 'Cherry MX Blue 90pcs', price: 680000, stock: 25, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b27', specs: 'Clicky blue switches' },
    { name: 'Gateron Blue Pro 90pcs', price: 350000, stock: 45, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b28', specs: 'Clicky blue switches' },
    { name: 'Gateron Silent Black 90pcs', price: 480000, stock: 38, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b29', specs: 'Silent linear black' },
    { name: 'Cherry MX Silent Red 90pcs', price: 820000, stock: 28, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b30', specs: 'Silent linear red' },
    { name: 'Boba U4 Silent Tactile 90pcs', price: 750000, stock: 32, img: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b31', specs: 'Silent tactile U4' }
  ],

  // keycaps
  keycaps: [
    { name: 'GMK Shoko Clone PBT', price: 450000, stock: 35, img: 'https://images.unsplash.com/photo-1611078392338-0c2a6e5e4e2b', specs: 'PBT keycaps set' },
    { name: 'ePBT Retro Cyrillic', price: 1200000, stock: 20, img: 'https://images.unsplash.com/photo-1611078392338-0c2a6e5e4e2c', specs: 'Retro style PBT' },
    { name: 'KAT Yuri Profile', price: 750000, stock: 50, img: 'https://images.unsplash.com/photo-1611078392338-0c2a6e5e4e2d', specs: 'KAT profile keycaps' },
    { name: 'DSA Lightcycle', price: 950000, stock: 40, img: 'https://images.unsplash.com/photo-1611078392338-0c2a6e5e4e2e', specs: 'DSA profile, custom set' },
    { name: 'MT3 /dev/tty', price: 1300000, stock: 15, img: 'https://images.unsplash.com/photo-1611078392338-0c2a6e5e4e2f', specs: 'MT3 profile premium set' }
  ],

  pcb: [
    { name: 'DZ65RGB-ANSI', price: 550000, stock: 18, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b123', specs: '65% PCB, RGB support' },
    { name: 'BM60 Hot-Swap PCB', price: 320000, stock: 25, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b124', specs: '60% hot-swap PCB' },
    { name: 'Taro 68 PCB', price: 420000, stock: 12, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b125', specs: '68% layout, QMK support' }
  ],

  dampeners: [
    { name: 'Deskey Silencing Ring', price: 120000, stock: 50, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b126', specs: 'Rubber o-ring dampeners' },
    { name: 'KBDfans Sound Dampener', price: 180000, stock: 35, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b127', specs: 'Foam sheet for sound reduction' }
  ],

  lubricants: [
    { name: 'Krytox 205g0 10ml', price: 150000, stock: 60, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b128', specs: 'Switch lube, smooth linear' },
    { name: 'Tribosys 3204', price: 180000, stock: 40, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b129', specs: 'Tactile switches lubrication' }
  ],

  plates: [
    { name: 'Brass 65% Plate', price: 250000, stock: 30, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b130', specs: 'Brass 65% plate, CNC cut' },
    { name: 'Aluminum 60% Plate', price: 180000, stock: 50, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b131', specs: 'Aluminum 60% plate' }
  ],

  deskMats: [
    { name: 'DeskMat XL Grey', price: 350000, stock: 25, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b132', specs: 'Extra large desk mat' },
    { name: 'RGB DeskMat', price: 550000, stock: 15, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b133', specs: 'RGB lighting mat' }
  ],

  stabilizers: [
    { name: 'Durock V2 Screw-in', price: 250000, stock: 40, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b134', specs: 'Screw-in stabilizers' },
    { name: 'C3 Everglide PCB-mount', price: 220000, stock: 50, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b135', specs: 'PCB-mount stabilizers' }
  ],

  cables: [
    { name: 'Coiled Aviator Cable 1.8m', price: 150000, stock: 60, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b136', specs: 'Aviator coiled USB cable' },
    { name: 'Straight USB-C Cable 1.5m', price: 90000, stock: 80, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b137', specs: 'Straight USB-C cable' }
  ],

  tools: [
    { name: 'Switch Opener', price: 35000, stock: 100, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b138', specs: 'Opener for mechanical switches' },
    { name: 'Lube Brush Set', price: 45000, stock: 100, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b139', specs: 'Brush set for lubricating switches' },
    { name: 'Keycap Puller', price: 25000, stock: 120, img: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b140', specs: 'Keycap puller tool' }
  ]
};
