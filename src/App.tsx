import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AuthModal } from './components/auth/AuthModal';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { WishlistPage } from './pages/WishlistPage';
import { OrdersPage } from './pages/OrdersPage';
import { MiniTVPage } from './pages/MiniTVPage';
import { SellPage } from './pages/SellPage';
import { PrimePage } from './pages/PrimePage';
import { CustomerServicePage } from './pages/CustomerServicePage';
import { ShopNestPayPage } from './pages/ShopNestPayPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function NotFoundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <div className="text-8xl mb-4 font-black text-slate-200">404</div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h1>
      <p className="text-slate-500 mb-8 max-w-sm mx-auto text-sm">
        We're sorry. The page address you entered does not exist on ShopNest.
      </p>
      <Link to="/" className="btn-sage inline-flex items-center px-6 py-2.5 rounded-full text-sm font-semibold">
        Back to ShopNest Home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#F5F6F8] text-[#0F172A] font-sans">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/minitv" element={<MiniTVPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/prime" element={<PrimePage />} />
            <Route path="/pay" element={<ShopNestPayPage />} />
            <Route path="/customer-service" element={<CustomerServicePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <MobileBottomNav />
        <AuthModal />
      </div>
    </BrowserRouter>
  );
}
