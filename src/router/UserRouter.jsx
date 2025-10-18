import HomePage from '../pages/HomePage.jsx';
import CartPage from '../pages/CartPage.jsx';
import WishlistPage from '../pages/WishlistPage.jsx';
import ProductDetailPage from '../pages/ProductDetailPage.jsx';
import UserDashboard from '../pages/UserDashboard.jsx';
import AdminPage from '../pages/AdminPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';

export default function UserRouter({
  userRole,
  currentAppView,
  onLogin,
  mainProps
}) {
  const isVisitor = userRole === 'visitor';
  const isAdmin = userRole === 'admin';

  if (currentAppView === 'login') {
    return <LoginPage onLogin={onLogin} />;
  }

  // 2. If a visitor tries to access a protected page, redirect them to the Login Page.
  if (isVisitor && (currentAppView === 'cart' || currentAppView === 'wishlist' || currentAppView === 'dashboard')) {
    // Note: The Navbar already prevents visitors from clicking these, but this is the ultimate guard.
    return <LoginPage onLogin={onLogin} />;
  }

  // 3. Admin-only pages
  if (isAdmin && currentAppView === 'admin') {
    return <AdminPage />;
  }

  // --- Logged-in User Pages (user or admin role can access) ---

  // Check against currentAppView state
  if (currentAppView === 'cart' && !isVisitor) {
    return <CartPage {...mainProps} />;
  }
  if (currentAppView === 'wishlist' && !isVisitor) {
    return <WishlistPage {...mainProps} />;
  }
  if (currentAppView === 'dashboard' && userRole === 'user') {
    return <UserDashboard />;
  }

  // 4. Product Detail Page (Accessible by all roles)
  // Checks if currentAppView holds a product object (not a string view key)
  if (currentAppView && typeof currentAppView === 'object') {
    return <ProductDetailPage product={currentAppView} {...mainProps} />;
  }

  // 5. Default Route: Home Page (Accessible by all roles)
  return <HomePage {...mainProps} />;
}
