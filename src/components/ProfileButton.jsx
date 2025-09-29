import { useState } from "react";

export default function ProfileButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="profile-container">
      <button
        className="profile-btn"
        onClick={() => setOpen(!open)}
      >
        P
      </button>
      {open && (
        <div className="logout-popup">
          <button onClick={() => alert("Logout berhasil!")}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
