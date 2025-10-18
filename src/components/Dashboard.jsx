import React from "react";

function Dashboard() {
  return (
    <div>
      <h2>Dashboard Overview</h2>
      <div className="stats">
        <div className="card">Total Products: 120</div>
        <div className="card">Orders Today: 15</div>
        <div className="card">Customers: 340</div>
        <div className="card">Revenue: $4,200</div>
      </div>
    </div>
  );
}

export default Dashboard;
