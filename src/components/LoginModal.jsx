import React from "react";

export default function LoginModal({ onClose }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div style={{ background: "#fff", padding: "30px", borderRadius: "10px", width: "300px" }}>
        <h2>Login</h2>
        <p>This is a simulated login. Clicking close will close this modal.</p>
        <button onClick={onClose} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>Close</button>
      </div>
    </div>
  );
}
