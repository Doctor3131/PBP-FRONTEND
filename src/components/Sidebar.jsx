import React from "react";

export default function Sidebar({ open, toggle, categories, onCategoryClick, onLoginClick }) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: open ? 0 : "-250px",
      width: "250px",
      height: "100%",
      backgroundColor: "#fff",
      boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      transition: "left 0.3s",
      zIndex: 1000,
      paddingTop: "50px",
      display: "flex",
      flexDirection: "column"
    }}>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => cat === "Login" ? onLoginClick() : onCategoryClick(cat)}
          style={{ padding: "15px 20px", textAlign: "left", border: "none", background: "none", cursor: "pointer", fontSize: "16px" }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
