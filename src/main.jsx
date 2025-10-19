import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
// Asumsikan reportWebVitals ada di direktori yang sama atau pindahkan ke utils
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// reportWebVitals();
