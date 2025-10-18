// src/components/Modals.jsx
import React, { useState } from 'react'

function RecipientInfoModal({ onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Informasi Penerima</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nama Penerima</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Nomor Telepon</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Batal</button>
            <button type="submit" className="btn-save">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function AddressModal({ onClose, onSubmit }) {
  const [address, setAddress] = useState({
    detail: '', village: '', district: '', city: '', province: '', postalCode: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(address)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Masukkan Alamat</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Detail Alamat</label><input type="text" value={address.detail} onChange={e => setAddress({ ...address, detail: e.target.value })} placeholder="Jl. Contoh No. 123" required /></div>
          <div className="form-group"><label>Kelurahan</label><input type="text" value={address.village} onChange={e => setAddress({ ...address, village: e.target.value })} required /></div>
          <div className="form-group"><label>Kecamatan</label><input type="text" value={address.district} onChange={e => setAddress({ ...address, district: e.target.value })} required /></div>
          <div className="form-group"><label>Kota</label><input type="text" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} required /></div>
          <div className="form-group"><label>Provinsi</label><input type="text" value={address.province} onChange={e => setAddress({ ...address, province: e.target.value })} required /></div>
          <div className="form-group"><label>Kode Pos</label><input type="text" value={address.postalCode} onChange={e => setAddress({ ...address, postalCode: e.target.value })} required /></div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Batal</button>
            <button type="submit" className="btn-save">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function PaymentModal({ onClose, onSelect }) {
  const [selected, setSelected] = useState('')
  const methods = ['Transfer Bank', 'E-Wallet (OVO/GoPay)', 'COD (Cash on Delivery)']

  const handleSelect = () => {
    if (selected) {
      onSelect(selected)
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Pilih Metode Pembayaran</h2>
        {methods.map(method => (
          <div
            key={method}
            className={`payment-option ${selected === method ? 'selected' : ''}`}
            onClick={() => setSelected(method)}
          >
            <input
              type="radio"
              checked={selected === method}
              onChange={() => setSelected(method)}
            />
            <span>{method}</span>
          </div>
        ))}
        <div className="modal-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>Batal</button>
          <button type="button" className="btn-save" onClick={handleSelect}>Pilih</button>
        </div>
      </div>
    </div>
  )
}

// Ekspor semua modal
export { AddressModal, PaymentModal, RecipientInfoModal }
