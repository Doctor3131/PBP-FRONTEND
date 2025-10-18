export default function Sidebar({ open, categories, onCategoryClick, onLoginClick, onLogoutClick, isLoggedIn }) {
  return (
    <div style={{
      position: "fixed",
      top: 0,

      left: open ? 0 : "-250px",

      width: "250px",
      height: "100vh",
      backgroundColor: "#fff",
      boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
      transition: "left 0.3s",
      zIndex: 1000,
      paddingTop: "50px",
      paddingBottom: "20px",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto"
    }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryClick(cat)}
            style={{
              padding: "15px 20px",
              textAlign: "left",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "16px",
              width: "100%",
              display: "block"
            }}

          >
            {cat}
          </button>
        ))}
      </div>
      <button

        onClick={isLoggedIn ? onLogoutClick : onLoginClick}
        style={{
          padding: "15px 20px",
          textAlign: "left",
          border: "none",
          backgroundColor: isLoggedIn ? "#dc3545" : "#007bff",
          color: "#fff",
          cursor: "pointer",
          fontSize: "16px",
          width: "100%",
          flexShrink: 0

        }}
      >
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </div>
  )
}
