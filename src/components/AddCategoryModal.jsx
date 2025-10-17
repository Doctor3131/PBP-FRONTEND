import React, { useState } from 'react';

const AddCategoryModal = ({ onClose, onAdd }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      onAdd(categoryName.trim());
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Tambah Kategori Baru</h2>
        <form onSubmit={handleSubmit}>
          <label>Nama Kategori</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <div className="modal-actions">
            <button type="submit">Tambah</button>
            <button type="button" onClick={onClose}>Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;