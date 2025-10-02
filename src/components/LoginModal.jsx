import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin({ username });
    } else {
      alert('Harap isi username dan password!');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Login Required</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="login-icon">🔐</div>
          <p>Anda harus login untuk menambahkan produk ke keranjang</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="login-btn">
                Login
              </button>
              <button type="button" className="cancel-btn" onClick={onClose}>
                Nanti Saja
              </button>
            </div>
          </form>
          
          <div className="demo-info">
            <p><small>Demo: Isi username dan password apa saja</small></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;