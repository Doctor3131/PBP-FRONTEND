import React, { useState } from 'react';

const AddressModal = ({ onClose, onSubmit }) => {
  const [address, setAddress] = useState({
    province: '',
    city: '',
    district: '',
    village: '',
    postalCode: '',
    detail: '',
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Alamat Pengiriman</h2>
        <form onSubmit={handleSubmit} className="address-form">
          <div className="form-row">
            <div className="form-group">
              <label>Provinsi</label>
              <input type="text" name="province" value={address.province} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Kota/Kabupaten</label>
              <input type="text" name="city" value={address.city} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Kecamatan</label>
              <input type="text" name="district" value={address.district} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Desa</label>
              <input type="text" name="village" value={address.village} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="form-group">
            <label>Kode Pos</label>
            <input type="text" name="postalCode" value={address.postalCode} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Detail Alamat</label>
            <textarea name="detail" value={address.detail} onChange={handleChange} required />
          </div>

          <div className="modal-actions">
            <button type="submit">Simpan</button>
            <button type="button" onClick={onClose}>Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;