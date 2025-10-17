import { useState } from "react";
import userIcon from "../assets/image.png"; // Impor gambar

export default function ProfileButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="profile-container">
      <button
        className="profile-btn"
        onClick={() => setOpen(!open)}
      >
        <img src={userIcon} alt="Profile" />
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