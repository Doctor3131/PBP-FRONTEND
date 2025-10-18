export default function Notification({ message, type, onClose }) {
  if (!message) return null

  const bgColor = type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#28a745'

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: bgColor,
      color: '#fff',
      padding: '15px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      zIndex: 2000,
      maxWidth: '300px',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{message}</span>
        <button onClick={onClose} style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: '20px',
          cursor: 'pointer',
          marginLeft: '10px'
        }}>×</button>
      </div>
    </div>
  )
}
