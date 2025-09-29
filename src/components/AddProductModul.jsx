import React, { useState } from "react";

const AddProductModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("image", image); 

    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal menambah produk");

      const data = await res.json();
      onAdd(data); 
      onClose();   
    } catch (err) {
      console.error(err);
      alert("Gagal menambah produk");
    }
  };

  return (
    <div className="modul-overlay">
      <div className="modul">
        <h2>Tambah Produk</h2>
        <form onSubmit={handleSubmit}>
          <label>Nama Produk</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Harga</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

          <label>Stok</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />

          <label>Deskripsi</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

          <label>Gambar</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />

          <div className="modul-actions">
            <button type="submit">Tambah</button>
            <button type="button" onClick={onClose}>Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
