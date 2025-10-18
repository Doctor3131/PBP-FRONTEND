import React, { useState } from 'react';

const PaymentModal = ({ onClose, onSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleSelect = () => {
    if (!selectedMethod) {
      alert('Pilih metode pembayaran terlebih dahulu.');
      return;
    }
    onSelect(selectedMethod);
    onClose();
  };

  const paymentMethods = ['Transfer Bank', 'E-Wallet (GoPay)', 'E-Wallet (OVO)', 'COD (Bayar di Tempat)'];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Pilih Metode Pembayaran</h2>
        <div className="payment-options">
          {paymentMethods.map(method => (
            <label 
              key={method} 
              className={`payment-option ${selectedMethod === method ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={selectedMethod === method}
                onChange={(e) => setSelectedMethod(e.target.value)}
              />
              {method}
            </label>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={handleSelect}>Pilih</button>
          <button type="button" onClick={onClose}>Batal</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;