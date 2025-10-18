export default function AdminPage() {
  return (
    <div style={{ background: "#dc3545", color: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Administrator! You have access to all backend controls and reporting.</p>
      <ul>
        <li>Manage Products</li>
        <li>View All Orders</li>
        <li>User Management</li>
      </ul>
      <p>This page is only visible to users with the 'admin' role.</p>
    </div>
  )
}
