import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X, Zap } from 'lucide-react';
import { useCartStore } from '../../context/CartContext';
import { useWishlistStore } from '../../context/WishlistContext';

export function Header() {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const totalItems = useCartStore((s) => s.getTotalItems());
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const categories = ['Electronics', 'Fashion', 'Home & Living', 'Accessories', 'Beauty', 'Sports'];

  return (
    <header className="sticky top-0 z-50 bg-navy-900 border-b border-slate-800 shadow-lg shadow-black/30">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center group-hover:bg-teal-400 transition-colors">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-white">Shop</span>
            <span className="text-teal-400">Sphere</span>
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 flex items-center hidden sm:flex">
          <div className="relative w-full max-w-2xl">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, brands, categories…"
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-lg pl-4 pr-12 py-2.5 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors text-sm"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 bg-teal-500 hover:bg-teal-600 rounded-r-lg text-white transition-colors flex items-center"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto sm:ml-0">
          <Link
            to="/wishlist"
            className="relative w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-slate-800"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount > 9 ? '9+' : wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative w-10 h-10 flex items-center justify-center text-slate-400 hover:text-orange-400 transition-colors rounded-lg hover:bg-slate-800"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Category nav — desktop */}
      <div className="hidden sm:block border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1 py-1 overflow-x-auto">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${encodeURIComponent(cat)}`}
                className="whitespace-nowrap text-xs font-medium text-slate-400 hover:text-teal-400 px-3 py-1.5 rounded hover:bg-slate-800/60 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-navy-900 px-4 py-3 flex flex-col gap-2">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="flex-1 input text-sm py-2"
            />
            <button type="submit" className="btn-teal py-2 px-4 rounded-lg text-sm">
              <Search className="w-4 h-4" />
            </button>
          </form>
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${encodeURIComponent(cat)}`}
                onClick={() => setMenuOpen(false)}
                className="text-xs text-slate-400 hover:text-teal-400 bg-slate-800 px-3 py-1.5 rounded-full transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
