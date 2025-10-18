export default function LoginPage({ onLogin }) {
  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '50px auto', background: '#fff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
      <h2>Please Log In</h2>
      <p>Simulate logging in as a different user type:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <button
          onClick={() => onLogin('user')}
          style={{ padding: "10px 20px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Login as Standard User
        </button>
        <button
          onClick={() => onLogin('')}
          style={{ padding: "10px 20px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Login as Admin
        </button>
      </div>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={() => onLogin('visitor')} style={{ border: 'none', background: 'none', color: '#6c757d', cursor: 'pointer', textDecoration: 'underline' }}>
          Continue as Visitor
        </button>
      </p>
    </div>
  )
}
