// src/pages/LoginPage.jsx
// Kode dari input Anda
export default function LoginPage({ onLogin }) {
  // ... (kode dari input Anda)
  return (
    <div style={{
      padding: '40px',
      maxWidth: '400px',
      margin: '100px auto',
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login to KeyStore</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Pilih role untuk simulasi login:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <button
          onClick={() => onLogin('user')}
          style={{
            padding: "12px 20px",
            backgroundColor: "#2c3e50",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: '1em',
            fontWeight: '500'
          }}
        >
          Login sebagai User
        </button>
        <button
          onClick={() => onLogin('admin')}
          style={{
            padding: "12px 20px",
            backgroundColor: "#e74c3c",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: '1em',
            fontWeight: '500'
          }}
        >
          Login sebagai Admin
        </button>
      </div>
      <p style={{ marginTop: '30px', textAlign: 'center' }}>
        <button
          onClick={() => onLogin('visitor')}
          style={{
            border: 'none',
            background: 'none',
            color: '#6c757d',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontSize: '0.95em'
          }}
        >
          Lanjutkan sebagai Visitor
        </button>
      </p>
    </div>
  )
}
