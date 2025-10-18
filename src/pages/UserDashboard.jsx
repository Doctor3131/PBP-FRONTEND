export default function UserDashboard({ onNavigate }) {
  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", maxWidth: "800px", margin: "20px auto" }}>
      <h2>User Dashboard</h2>
      <p>Welcome back to your personalized dashboard!</p>

      <div style={{ marginTop: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
        <h3>Account Overview</h3>
        <p><strong>Status:</strong> Logged In</p>
        <p><strong>Member Since:</strong> Oct 2025</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => onNavigate('my-orders')}
          style={{
            padding: '10px 15px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#2c3e50',
            color: 'white',
            marginRight: '10px'
          }}
        >
          View My Orders
        </button>
        <button
          onClick={() => onNavigate('home')}
          style={{
            padding: '10px 15px',
            cursor: 'pointer',
            border: '1px solid #2c3e50',
            borderRadius: '5px',
            backgroundColor: 'transparent',
            color: '#2c3e50'
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}
