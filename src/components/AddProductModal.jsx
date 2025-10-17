import React, { useState } from "react";

const AddProductModal = ({ onClose, onAdd, categories }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState(categories[0] || ""); // Default ke kategori pertama
  const [image, setImage] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Untuk contoh ini, kita buat objek produk.
    // Dalam aplikasi nyata, Anda akan mengirim FormData ke backend.
    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      image: image ? URL.createObjectURL(image) : "https://via.placeholder.com/250", // Placeholder jika tidak ada gambar
    };

    onAdd(newProduct); 
    onClose();   
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Tambah Produk</h2>
        <form onSubmit={handleSubmit}>
          <label>Nama Produk</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Harga</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

          <label>Stok</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />

          <label>Kategori</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <label>Gambar</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

          <div className="modal-actions">
            <button type="submit">Tambah</button>
            <button type="button" onClick={onClose}>Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;