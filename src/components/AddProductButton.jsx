import React from 'react';

const AddProductButton = ({ onClick }) => {
  return (
    <button className="add-btn" onClick={onClick} aria-label="Tambah produk">
      +
    </button>
  );
};

export default AddProductButton;