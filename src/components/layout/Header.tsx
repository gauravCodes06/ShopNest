import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, MapPin, Search, Menu, X, ChevronDown, Heart } from 'lucide-react';
import { useCartStore } from '../../context/CartContext';
import { useWishlistStore } from '../../context/WishlistContext';
import { AmazonLogo } from '../ui/AmazonLogo';

export function Header() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const totalItems = useCartStore((s) => s.getTotalItems());
  const wishlistCount = useWishlistStore((s) => s.ids.length);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const catParam = selectedCategory !== 'All' ? `&category=${encodeURIComponent(selectedCategory)}` : '';
      navigate(`/search?q=${encodeURIComponent(query.trim())}${catParam}`);
    }
  };

  const navCategories = [
    'Amazon miniTV',
    'Sell',
    'Best Sellers',
    "Today's Deals",
    'Mobiles',
    'Prime',
    'Customer Service',
    'Electronics',
    'Home & Kitchen',
    'Fashion',
    'Computers',
  ];

  const searchCategories = [
    'All Categories',
    'Electronics',
    'Fashion',
    'Home & Living',
    'Accessories',
    'Beauty',
    'Sports',
  ];

  return (
    <header className="sticky top-0 z-50 select-none shadow-md">
      {/* ── Top Bar (Amazon Dark #131921) ─────────────────────────────────── */}
      <div className="bg-[#131921] text-white">
        <div className="max-w-[1500px] mx-auto px-2 sm:px-4 h-[60px] flex items-center gap-2 md:gap-4">
          {/* Amazon.in Logo */}
          <Link
            to="/"
            className="p-2 border border-transparent hover:border-white rounded-[2px] transition-colors flex items-center shrink-0"
            aria-label="Amazon.in Home"
          >
            <AmazonLogo />
          </Link>

          {/* Location Delivery Selector (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 p-2 border border-transparent hover:border-white rounded-[2px] cursor-pointer text-xs shrink-0">
            <MapPin className="w-4 h-4 text-white -mt-2.5" />
            <div className="flex flex-col leading-tight">
              <span className="text-[#cccccc] text-[11px]">Delivering to Mumbai 400001</span>
              <span className="text-white font-bold text-xs">Update location</span>
            </div>
          </div>

          {/* Unified Amazon Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex-1 flex items-center h-10 rounded-[4px] focus-within:ring-2 focus-within:ring-[#e77600] overflow-hidden"
          >
            {/* Category Dropdown */}
            <div className="hidden md:flex items-center h-full bg-[#e6e6e6] hover:bg-[#dadada] text-[#0f1111] text-xs border-r border-[#cdcdcd] px-3 cursor-pointer shrink-0 transition-colors">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-xs text-[#0f1111] cursor-pointer outline-none border-none py-1 pr-1 font-normal"
              >
                {searchCategories.map((c) => (
                  <option key={c} value={c === 'All Categories' ? 'All' : c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Amazon.in"
              className="flex-1 h-full px-3 text-[#0f1111] bg-white text-sm outline-none placeholder:text-[#565959]"
            />

            {/* Amber Search Button */}
            <button
              type="submit"
              className="h-full px-4 bg-[#febd69] hover:bg-[#f3a847] text-[#131921] transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>
          </form>

          {/* Language Selector */}
          <div className="hidden xl:flex items-center gap-1 p-2 border border-transparent hover:border-white rounded-[2px] cursor-pointer text-xs font-bold shrink-0">
            <span className="text-base">🇮🇳</span>
            <span>EN</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          {/* Accounts & Lists */}
          <Link
            to="/orders"
            className="hidden sm:flex flex-col leading-tight p-2 border border-transparent hover:border-white rounded-[2px] cursor-pointer shrink-0 text-left"
          >
            <span className="text-[11px] text-[#cccccc]">Hello, sign in</span>
            <span className="text-xs font-bold flex items-center gap-0.5">
              Account & Lists
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </span>
          </Link>

          {/* Returns & Orders */}
          <Link
            to="/orders"
            className="hidden sm:flex flex-col leading-tight p-2 border border-transparent hover:border-white rounded-[2px] cursor-pointer shrink-0 text-left"
          >
            <span className="text-[11px] text-[#cccccc]">Returns</span>
            <span className="text-xs font-bold">& Orders</span>
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="flex items-center gap-1 p-2 border border-transparent hover:border-white rounded-[2px] cursor-pointer shrink-0 text-white hover:text-[#febd69] transition-colors"
            aria-label="Wishlist"
          >
            <div className="relative">
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#cc0c39] text-white text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline text-xs font-bold mt-2">Wishlist</span>
          </Link>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="flex items-end p-2 border border-transparent hover:border-white rounded-[2px] cursor-pointer shrink-0"
            aria-label="Shopping Cart"
          >
            <div className="relative flex items-center">
              <ShoppingCart className="w-8 h-8 text-white" />
              <span className="absolute left-[11px] top-[-2px] text-[#f08804] text-[15px] font-bold">
                {totalItems}
              </span>
            </div>
            <span className="text-xs font-bold mb-1 hidden sm:inline ml-1">Cart</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 text-white hover:border border-white rounded-[2px]"
            aria-label="Open Mobile Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Sub Navigation Bar (Amazon Slate #232f3e) ─────────────────────── */}
      <div className="bg-[#232f3e] text-white text-xs">
        <div className="max-w-[1500px] mx-auto px-2 sm:px-4 h-10 flex items-center justify-between">
          <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
            {/* "All" Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1.5 font-bold px-2 py-1.5 border border-transparent hover:border-white rounded-[2px] whitespace-nowrap"
            >
              <Menu className="w-4 h-4" />
              <span>All</span>
            </button>

            {/* Quick Links */}
            {navCategories.map((item) => (
              <Link
                key={item}
                to={
                  item === "Today's Deals"
                    ? '/search?q=deal'
                    : item === 'Best Sellers'
                    ? '/category/Electronics'
                    : item === 'Mobiles'
                    ? '/category/Electronics'
                    : item === 'Electronics'
                    ? '/category/Electronics'
                    : item === 'Home & Kitchen'
                    ? '/category/Home%20%26%20Living'
                    : item === 'Fashion'
                    ? '/category/Fashion'
                    : item === 'Customer Service'
                    ? '/orders'
                    : `/category/${encodeURIComponent(item)}`
                }
                className="px-2 py-1.5 border border-transparent hover:border-white rounded-[2px] whitespace-nowrap text-white font-normal hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Great Indian Festival banner prompt */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-[#febd69] font-medium pr-2 shrink-0">
            <span>Great Indian Festival | Deals Live Now</span>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer / Dropdown ──────────────────────────────────────── */}
      {menuOpen && (
        <div className="bg-[#131921] border-t border-[#37475a] p-4 text-white flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#37475a]">
            <span className="font-bold text-sm">Browse Amazon</span>
            <button onClick={() => setMenuOpen(false)}>
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {searchCategories.map((cat) => (
              <Link
                key={cat}
                to={cat === 'All Categories' ? '/' : `/category/${encodeURIComponent(cat)}`}
                onClick={() => setMenuOpen(false)}
                className="p-2 bg-[#232f3e] rounded hover:bg-[#37475a] transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
          <div className="border-t border-[#37475a] pt-3 flex flex-col gap-2 text-xs text-[#cccccc]">
            <Link to="/orders" onClick={() => setMenuOpen(false)} className="hover:text-white">Your Orders</Link>
            <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="hover:text-white">Your Wish List</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-white">Your Cart ({totalItems})</Link>
          </div>
        </div>
      )}
    </header>
  );
}
