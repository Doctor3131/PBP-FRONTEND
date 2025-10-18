// src/hooks/useProducts.js
import { useMemo } from 'react'

// Data Produk (Anda harus memindahkannya ke sini atau mengimpornya dari src/utils/data.js)
const CATEGORIES = [
  'Home', 'Keyboards', 'Switches', 'Keycaps', 'PCB', 'Dampeners',
  'Lubricants', 'Plates', 'Desk Mats', 'Stabilizers', 'Cables', 'Tools & Accessories'
]

const PRODUCTS = {
  keyboards: [
    { name: 'GMMK Pro 75% Black', price: 3500000, stock: 15 },
    { name: 'Keychron Q1 Pro QMK/VIA', price: 2800000, stock: 20 },
    { name: 'Mode SixtyFive Custom', price: 5500000, stock: 8 },
    { name: 'Zoom65 Essential Edition', price: 2200000, stock: 25 },
    { name: 'NK65 Entry Edition Smoke', price: 1800000, stock: 30 },
    { name: 'Tofu60 Acrylic Case Kit', price: 1500000, stock: 18 },
  ],
  switches: [
    { name: 'Gateron Oil King Linear 90pcs', price: 650000, stock: 50 },
    { name: 'Cherry MX Black Hyperglide 90pcs', price: 750000, stock: 45 },
    { name: 'Gateron Milky Yellow Pro 90pcs', price: 280000, stock: 80 },
    { name: 'Akko V3 Cream Yellow 90pcs', price: 320000, stock: 70 },
    { name: 'Glorious Panda Tactile 90pcs', price: 850000, stock: 35 },
    { name: 'Durock T1 Tactile 90pcs', price: 620000, stock: 48 },
  ],
  keycaps: [
    { name: 'GMK Shoko Clone PBT', price: 450000, stock: 35 },
    { name: 'ePBT Retro Cyrillic', price: 1200000, stock: 20 },
    { name: 'Akko ASA Black Pink', price: 380000, stock: 55 },
    { name: 'GMK Botanical R2', price: 3500000, stock: 8 },
    { name: 'HyperX Pudding PBT White', price: 350000, stock: 60 },
  ],
  pcb: [
    { name: 'DZ60RGB V3 Hotswap PCB', price: 850000, stock: 25 },
    { name: 'BM65 RGB ISO Hotswap PCB', price: 650000, stock: 30 },
    { name: 'GK61 Hotswap PCB', price: 380000, stock: 45 },
    { name: 'WT60-D Hotswap PCB', price: 1200000, stock: 18 },
  ],
  dampeners: [
    { name: 'StupidFish Design Foam Kit', price: 180000, stock: 50 },
    { name: 'PE Foam Sheet A4 5pcs', price: 85000, stock: 80 },
    { name: 'Poron Foam Sheet 2mm', price: 120000, stock: 65 },
    { name: 'IXPE Switch Foam 120pcs', price: 95000, stock: 70 },
  ],
  lubricants: [
    { name: 'Krytox GPL 205g0 5ml', price: 180000, stock: 60 },
    { name: 'Krytox GPL 105 Oil 5ml', price: 150000, stock: 55 },
    { name: 'Tribosys 3203 5ml', price: 165000, stock: 50 },
    { name: 'Tribosys 3204 5ml', price: 175000, stock: 48 },
  ],
  plates: [
    { name: 'DZ60 Aluminum Plate Black', price: 320000, stock: 35 },
    { name: 'Tofu60 Brass Plate', price: 580000, stock: 22 },
    { name: 'GK61 FR4 Plate', price: 180000, stock: 45 },
    { name: 'Universal 60% Carbon Fiber', price: 650000, stock: 18 },
  ],
  'desk-mats': [
    { name: 'GMK Botanical Deskmat', price: 450000, stock: 40 },
    { name: 'Minimal Wave Deskmat Black', price: 280000, stock: 60 },
    { name: 'Pixel Art Cyberpunk', price: 320000, stock: 55 },
    { name: 'Olivia++ Dark Deskmat', price: 480000, stock: 35 },
  ],
  stabilizers: [
    { name: 'Durock V2 Stabilizers Clear', price: 280000, stock: 50 },
    { name: 'Cherry Clip-in Stabilizers', price: 180000, stock: 60 },
    { name: 'TX Stabilizers V3', price: 420000, stock: 35 },
    { name: 'Staebies Screw-in Black', price: 380000, stock: 40 },
  ],
  cables: [
    { name: 'Custom Coiled USB-C Black', price: 350000, stock: 30 },
    { name: 'Aviator Cable Navy Blue', price: 420000, stock: 25 },
    { name: 'Pastel Pink Coiled Cable', price: 380000, stock: 28 },
    { name: 'GMK Botanical Cable', price: 520000, stock: 18 },
  ],
  tools: [
    { name: 'Switch Opener Aluminum', price: 120000, stock: 80 },
    { name: 'Keycap Puller Wire', price: 45000, stock: 120 },
    { name: 'Switch Puller Tool', price: 55000, stock: 110 },
    { name: 'Precision Screwdriver Set', price: 180000, stock: 50 },
  ]
}
// End of data

export function useProducts() {
  const categoryMap = useMemo(() => {
    const map = new Map()
    // Map kategori yang menggunakan spasi/huruf besar ke kunci objek
    CATEGORIES.forEach(cat => {
      map.set(cat.toLowerCase().replace(/ /g, '-'), cat)
    })
    return map
  }, [])

  const initialProducts = useMemo(() => {
    const products = []
    let productIdCounter = 1

    for (const categoryKey in PRODUCTS) {
      const categoryName = categoryMap.get(categoryKey) || categoryKey // Fallback ke key
      if (PRODUCTS.hasOwnProperty(categoryKey) && Array.isArray(PRODUCTS[categoryKey])) {
        PRODUCTS[categoryKey].forEach(product => {
          products.push({
            id: productIdCounter++,
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: categoryName,
            // Menggunakan placeholder image sederhana
            image: `https://via.placeholder.com/250?text=${encodeURIComponent(product.name.split(' ')[0])}`,
            specs: product.specs || `High quality ${categoryName} component.`
          })
        })
      }
    }
    return products
  }, [categoryMap])

  return { products: initialProducts, categories: CATEGORIES }
}
