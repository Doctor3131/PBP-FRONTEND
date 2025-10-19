// Memisahkan style ke file sendiri agar komponen utama lebih rapi
export const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    borderBottom: '3px solid #007bff',
    paddingBottom: '10px',
    color: '#343a40'
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    marginTop: '25px',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  },
  th: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '15px',
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: '0.9em'
  },
  td: {
    padding: '15px',
    borderBottom: '1px solid #e9ecef',
    textAlign: 'left',
  },
  button: {
    marginTop: '30px',
    padding: '12px 25px',
    cursor: 'pointer',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1em',
    transition: 'background-color 0.2s'
  }
}
