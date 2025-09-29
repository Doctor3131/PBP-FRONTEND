import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardAdmin from "./pages/DashboardAdmin.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
