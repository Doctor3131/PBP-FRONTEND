import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// Impor halaman-halaman yang sudah ada dan yang baru
import BerandaPage from "./pages/BerandaPage"
import CheckoutPage from "./pages/CheckoutPage"
import OrderDetailPage from "./pages/OrderDetailPage"
// Anda mungkin juga perlu mengimpor halaman lain seperti LoginPage, AdminPage, dll.
// Untuk saat ini, kita fokus pada rute yang baru dan Beranda.

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Beranda akan menampung seluruh logika SPA lama (Navbar, Sidebar, dll) */}
        <Route path="/" element={<BerandaPage />} />

        {/* Rute baru untuk fitur Checkout dan Order Detail */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order/:id" element={<OrderDetailPage />} />

        {/* Tambahkan rute lain di sini jika Anda memisahkan semua logika per halaman */}
      </Routes>
    </Router>
  )
}

export default App
