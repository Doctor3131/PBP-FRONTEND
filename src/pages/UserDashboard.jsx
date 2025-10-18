export default function UserDashboard() {
  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <h2>User Dashboard</h2>
      <p>Welcome back to your personalized dashboard!</p>
      <div style={{ marginTop: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
        <h3>Profile Summary</h3>
        <p>Status: Logged In</p>
        <p>Member Since: Oct 2025</p>
      </div>
    </div>
  )
}
