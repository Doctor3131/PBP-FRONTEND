import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BerandaPage from "./pages/BerandaPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderDetailPage from "./pages/OrderDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BerandaPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order/:id" element={<OrderDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;