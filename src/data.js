export const CATEGORIES = [
  'Home',
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
  'Tools',
]

export const PRODUCTS = {
  keyboards: [
    { id: 'kb1', name: 'GMMK Pro 75% Black', price: 3500000, stock: 15, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', specs: '75% layout, hot-swappable, aluminum body' },
    { id: 'kb2', name: 'Keychron Q1 Pro QMK/VIA', price: 2800000, stock: 20, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400', specs: 'QMK/VIA supported, Aluminum body, gasket mount' },
    { id: 'kb3', name: 'Mode SixtyFive Custom', price: 5500000, stock: 8, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400', specs: '65% custom build, premium materials' },
    { id: 'kb4', name: 'NK65 Entry Edition', price: 1800000, stock: 30, image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400', specs: 'Entry-level 65%, hot-swap PCB' },
    { id: 'kb5', name: 'Tofu60 Acrylic Kit', price: 1500000, stock: 18, image: 'https://images.unsplash.com/photo-1617755558420-5c3dcfc8eac4?w=400', specs: '60% acrylic case, DIY kit' },
  ],
  switches: [
    { id: 'sw1', name: 'Gateron Oil King Linear 90pcs', price: 650000, stock: 50, image: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b1b?w=400', specs: 'Linear switch, smooth operation' },
    { id: 'sw2', name: 'Cherry MX Black Hyperglide 90pcs', price: 750000, stock: 45, image: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b1c?w=400', specs: 'Linear, premium Cherry switches' },
    { id: 'sw3', name: 'Glorious Panda Tactile 90pcs', price: 850000, stock: 35, image: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b21?w=400', specs: 'Tactile switch with strong bump' },
    { id: 'sw4', name: 'Gateron Milky Yellow Pro 90pcs', price: 280000, stock: 80, image: 'https://images.unsplash.com/photo-1625066086706-d5f47e8b9b1d?w=400', specs: 'Budget linear switches' },

  ],
  keycaps: [
    { id: 'kc1', name: 'GMK Shoko Clone PBT', price: 450000, stock: 35, image: 'https://images.unsplash.com/photo-1611078392338-0c2a6e5e4e2b?w=400', specs: 'PBT keycaps, Cherry profile' },
    { id: 'kc2', name: 'ePBT Retro Cyrillic', price: 1200000, stock: 20, image: 'https://images.unsplash.com/photo-1611078392338-0c2a6e5e4e2c?w=400', specs: 'Premium PBT, retro design' },
    { id: 'kc3', name: 'DSA Lightcycle', price: 950000, stock: 40, image: 'https://images.unsplash.com/photo-1611078392338-0c2a6e5e4e2e?w=400', specs: 'DSA profile keycaps' },
  ],
  pcb: [
    { id: 'pcb1', name: 'DZ65RGB-ANSI', price: 550000, stock: 18, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b123?w=400', specs: '65% PCB with RGB' },
    { id: 'pcb2', name: 'BM60 Hot-Swap PCB', price: 320000, stock: 25, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b124?w=400', specs: '60% hot-swap compatible' },
  ],
  dampeners: [
    { id: 'dp1', name: 'PE Foam Sheet 5pcs', price: 85000, stock: 80, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b127?w=400', specs: 'Sound dampening foam' },
    { id: 'dp2', name: 'Poron Foam 2mm', price: 120000, stock: 65, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b127?w=400', specs: 'Premium dampening material' },

  ],
  lubricants: [
    { id: 'lb1', name: 'Krytox 205g0 10ml', price: 180000, stock: 60, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b128?w=400', specs: 'Premium switch lubricant' },

    { id: 'lb2', name: 'Tribosys 3204', price: 175000, stock: 48, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b129?w=400', specs: 'Tactile switch lube' },
  ],
  plates: [
    { id: 'pl1', name: 'Brass 65% Plate', price: 250000, stock: 30, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b130?w=400', specs: 'CNC brass plate' },
    { id: 'pl2', name: 'Aluminum 60% Plate', price: 180000, stock: 50, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b131?w=400', specs: 'Lightweight aluminum' },
  ],
  deskMats: [
    { id: 'dm1', name: 'DeskMat XL Grey', price: 350000, stock: 25, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b132?w=400', specs: 'Extra large desk mat' },
    { id: 'dm2', name: 'RGB DeskMat', price: 550000, stock: 15, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b133?w=400', specs: 'RGB lighting mat' },
  ],
  stabilizers: [
    { id: 'st1', name: 'Durock V2 Screw-in', price: 250000, stock: 40, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b134?w=400', specs: 'Premium stabilizers' },
    { id: 'st2', name: 'C3 Equalz PCB-mount', price: 220000, stock: 50, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b135?w=400', specs: 'PCB-mount stabs' },
  ],
  cables: [

    { id: 'cb1', name: 'Coiled Aviator Cable 1.8m', price: 150000, stock: 60, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b136?w=400', specs: 'Custom coiled cable' },
    { id: 'cb2', name: 'Straight USB-C Cable 1.5m', price: 90000, stock: 80, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b137?w=400', specs: 'Standard USB-C cable' },
  ],
  tools: [
    { id: 'tl1', name: 'Switch Opener', price: 35000, stock: 100, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b138?w=400', specs: 'Aluminum switch opener' },
    { id: 'tl2', name: 'Lube Brush Set', price: 45000, stock: 100, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b139?w=400', specs: '5-piece brush set' },
    { id: 'tl3', name: 'Keycap Puller', price: 25000, stock: 120, image: 'https://images.unsplash.com/photo-1618247124563-7df0a1a2b140?w=400', specs: 'Wire keycap puller' },
  ],
}

// Helper to get all products as flat array
export const getAllProducts = () => {
  return Object.values(PRODUCTS).flat()
}

// Helper to get category key from category name
export const getCategoryKey = (categoryName) => {
  const map = {
    'Keyboards': 'keyboards',
    'Switches': 'switches',
    'Keycaps': 'keycaps',
    'PCB': 'pcb',
    'Dampeners': 'dampeners',
    'Lubricants': 'lubricants',

    'Plates': 'plates',
    'Desk Mats': 'deskMats',
    'Stabilizers': 'stabilizers',
    'Cables': 'cables',
    'Tools': 'tools',
  }

  return map[categoryName] || null
}
