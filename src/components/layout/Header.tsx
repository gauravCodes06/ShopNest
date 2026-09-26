import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  Menu,
  Heart,
  User,
  MapPin,
  ChevronDown,
  Sparkles,
  Mic,
  ArrowRight,
} from 'lucide-react';
import { useCartStore } from '../../context/CartContext';
import { useWishlistStore } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { ShopNestLogo } from '../ui/ShopNestLogo';
import { AllDrawer } from './AllDrawer';
import { LocationModal } from './LocationModal';
import { AccountDropdown } from './AccountDropdown';
import { LanguageSelector } from './LanguageSelector';
import { ThemeSelector } from './ThemeSelector';
import { useLanguage } from '../../context/LanguageContext';
import { searchProducts } from '../../data/products';
import { formatPrice } from '../../lib/utils';

export function Header() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allDrawerOpen, setAllDrawerOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Mumbai 400001');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const { t } = useLanguage();
  const navigate = useNavigate();
  const totalItems = useCartStore((s) => s.getTotalItems());
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('shopnest_location');
    if (saved) setCurrentLocation(saved);
  }, []);

  // Close search suggestions & category dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSetLocation = (loc: string) => {
    setCurrentLocation(loc);
    localStorage.setItem('shopnest_location', loc);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    const q = query.trim();
    const catParam =
      selectedCategory !== 'All'
        ? `&category=${encodeURIComponent(selectedCategory)}`
        : '';
    navigate(`/search?q=${encodeURIComponent(q)}${catParam}`);
  };

  const handleVoiceSearch = () => {
    const samples = ['MacBook Air', 'Smart Watch', 'Wireless Headphones', 'Gaming Laptop', 'Running Shoes'];
    const chosen = samples[Math.floor(Math.random() * samples.length)];
    setQuery(chosen);
    setShowSuggestions(true);
  };

  // Instant live matched suggestions
  const suggestions = query.trim() ? searchProducts(query).slice(0, 5) : [];

  const navCategories = [
    { label: t('todaysDeals', "Today's Deals"), to: '/search?q=deal', highlight: true },
    { label: t('mobiles', 'Mobiles'), to: '/category/Mobiles', highlight: false },
    { label: t('computers', 'Computers'), to: '/category/Computers', highlight: false },
    { label: t('electronics', 'Electronics'), to: '/category/Electronics' },
    { label: t('fashion', 'Fashion'), to: '/category/Fashion' },
    { label: t('homeKitchen', 'Home & Kitchen'), to: '/category/Home%20%26%20Kitchen' },
    { label: t('beauty', 'Beauty'), to: '/category/Beauty' },
    { label: t('sports', 'Sports'), to: '/category/Sports' },
    { label: t('books', 'Books'), to: '/category/Books' },
    { label: t('shopnestPay', 'ShopNest Pay'), to: '/pay', highlight: false },
    { label: t('prime', 'Prime'), to: '/prime', highlight: false },
    { label: t('minitv', 'miniTV'), to: '/minitv', highlight: false },
    { label: t('sell', 'Sell'), to: '/sell', highlight: false },
    { label: t('customerService', 'Customer Service'), to: '/customer-service', highlight: false },
  ];

  const searchCategories = [
    { label: t('allCategories', 'All Categories'), value: 'All' },
    { label: t('electronics', 'Electronics'), value: 'Electronics' },
    { label: t('fashion', 'Fashion'), value: 'Fashion' },
    { label: t('homeLiving', 'Home & Living'), value: 'Home & Kitchen' },
    { label: t('beauty', 'Beauty'), value: 'Beauty' },
    { label: t('sports', 'Sports'), value: 'Sports' },
    { label: t('computers', 'Computers'), value: 'Computers' },
    { label: t('mobiles', 'Mobiles'), value: 'Mobiles' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 select-none bg-white/98 backdrop-blur-sm" style={{boxShadow:'0 1px 0 rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)'}}>
        {/* ── Main Top Bar ────────────────────────────────────────── */}
        <div className="border-b border-slate-100">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-3 sm:gap-6">
            {/* Mobile Hamburger Drawer Button */}
            <button
              onClick={() => setAllDrawerOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* ShopNest Brand Logo */}
            <Link
              to="/"
              className="flex items-center shrink-0 py-1 rounded-xl transition-transform active:scale-95"
              aria-label="ShopNest Home"
            >
              <ShopNestLogo size="md" />
            </Link>

            {/* Search Bar with Auto-Complete Suggestions */}
            <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-2xl mx-2 relative">
              <form
                onSubmit={handleSearch}
                className="w-full flex items-center bg-[#F5F6F8] border border-slate-200/80 hover:border-emerald-400/60 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/12 rounded-full px-3 py-2 transition-all duration-200" style={{boxShadow:'0 1px 3px rgba(0,0,0,0.04) inset'}}
              >
                <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1.5 mr-2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder={t('searchPlaceholder', 'Search for products, brands and more...')}
                  className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                />

                {/* Voice Search button */}
                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  className="p-1 rounded-full text-slate-400 hover:text-emerald-600 hover:bg-slate-100 transition-colors mr-1"
                  title="Search by voice"
                >
                  <Mic className="w-4 h-4" />
                </button>

                {/* Custom Category Dropdown matching Image 2 */}
                <div className="relative shrink-0 border-l border-slate-200 pl-2.5 ml-1" ref={categoryDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setCategoryDropdownOpen((prev) => !prev)}
                    className="bg-transparent text-xs font-semibold text-slate-700 hover:text-emerald-700 flex items-center gap-1 cursor-pointer pr-1 py-1"
                    title="Select category"
                  >
                    <span>{searchCategories.find((c) => c.value === selectedCategory)?.label || 'All Categories'}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {categoryDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-md shadow-xl border border-slate-400/80 py-1 z-50 animate-in fade-in zoom-in-95 duration-75">
                      {searchCategories.map((cat) => {
                        const isSelected = selectedCategory === cat.value;
                        return (
                          <div
                            key={cat.value}
                            onClick={() => {
                              setSelectedCategory(cat.value);
                              setCategoryDropdownOpen(false);
                            }}
                            className={`px-3 py-1.5 text-xs cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-[#565959] text-white font-medium'
                                : 'text-slate-800 hover:bg-[#565959] hover:text-white'
                            }`}
                          >
                            {cat.label}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="ml-2 w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white flex items-center justify-center shrink-0 transition-all duration-150 cursor-pointer"
                  style={{boxShadow:'0 1px 3px rgba(5,150,105,0.3), 0 1px 0 rgba(5,150,105,0.2)'}}
                  title="Search"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Auto-Complete Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden z-50 divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-100">
                  <div className="p-2 bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                    <span>Products matching "{query}"</span>
                    <span>Press Enter to search all</span>
                  </div>
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setShowSuggestions(false);
                        navigate(`/product/${item.id}`);
                      }}
                      className="p-3 flex items-center gap-3 hover:bg-emerald-50/50 cursor-pointer transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-contain rounded-lg p-1 bg-slate-50 border border-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">{item.name}</p>
                        <p className="text-[11px] text-slate-400">{item.category}</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-700">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Action Icons: Location, Account, Wishlist, Cart */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Delivery location badge */}
              <button
                onClick={() => setLocationModalOpen(true)}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-emerald-700 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                title="Change delivery location"
              >
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="text-left leading-tight">
                  <p className="text-[10px] text-slate-400">{t('deliverTo', 'Deliver to')}</p>
                  <p className="font-semibold text-slate-700 truncate max-w-[110px]">
                    {currentLocation}
                  </p>
                </div>
              </button>

              {/* Language Selector */}
              <div className="hidden lg:block">
                <LanguageSelector />
              </div>

              {/* Theme & Button Color Toggle */}
              <div className="hidden sm:block">
                <ThemeSelector />
              </div>

              {/* Account Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setAccountMenuOpen(true)}
              >
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      openAuthModal('signin');
                    } else {
                      setAccountMenuOpen((prev) => !prev);
                    }
                  }}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors text-sm font-medium cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    isAuthenticated
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isAuthenticated && user ? user.name.charAt(0) : <User className="w-4 h-4" />}
                  </div>
                  <div className="hidden sm:flex flex-col text-left leading-tight">
                    <span className="text-[10px] text-slate-400">
                      {isAuthenticated && user ? 'Account' : t('helloSignIn', 'Sign In')}
                    </span>
                    <span className="text-xs font-bold text-slate-800 truncate max-w-[90px]">
                      {isAuthenticated && user ? user.name : t('helloSignIn', 'Sign In')}
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:inline" />
                </button>
                <AccountDropdown
                  isOpen={accountMenuOpen}
                  onClose={() => setAccountMenuOpen(false)}
                />
              </div>

              {/* Wishlist Link with Badge */}
              <Link
                to="/wishlist"
                className="relative p-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-slate-100 transition-colors"
                title={t('wishlist', 'View Wishlist')}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Link */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl transition-all duration-150 cursor-pointer"
                style={{boxShadow:'0 1px 3px rgba(5,150,105,0.3), 0 1px 0 rgba(5,150,105,0.2)'}}
                title={t('cart', 'View Shopping Cart')}
              >
                <div className="relative">
                  <ShoppingCart className="w-4.5 h-4.5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2.5 -right-2.5 bg-orange-500 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center" style={{minWidth:'1.125rem',minHeight:'1.125rem'}}>
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-[13px] font-bold tracking-tight">
                  {t('cart', 'Cart')}
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Search input bar */}
          <div className="md:hidden px-4 pb-3">
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-sm"
            >
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands..."
                className="w-full bg-transparent text-xs text-slate-800 focus:outline-none"
              />
              <button
                type="submit"
                className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 ml-1 text-xs"
              >
                <Search className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>

        {/* ── Announcement Ticker ─────────────────────────────────── */}
        <div className="bg-gradient-to-r from-[#0B1222] via-[#112240] to-[#0B1222] text-white py-1.5 text-center text-[11px] font-semibold tracking-wide">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="text-slate-200">Free delivery on orders over ₹499 &nbsp;·&nbsp; <span className="text-amber-400 font-bold">Flash Sale: Up to 67% off</span> &nbsp;·&nbsp; Try ShopNest Prime for exclusive benefits</span>
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
          </div>
        </div>

        {/* ── Sub Navigation Bar ──────────────────────────────────── */}
        <div className="bg-white/98 border-b border-slate-100">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-10 flex items-center justify-between overflow-x-auto" style={{scrollbarWidth:'none'}}>
            <div className="flex items-center gap-0.5 shrink-0">
              {/* All Categories Drawer Trigger */}
              <button
                onClick={() => setAllDrawerOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-lg transition-all duration-150 cursor-pointer mr-1 border border-transparent hover:border-emerald-200/60"
              >
                <Menu className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('allCategories', 'All Categories')}</span>
              </button>

              <div className="h-3.5 w-px bg-slate-200 mx-1.5 hidden sm:block" />

              {/* Nav Category Links */}
              {navCategories.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.to}
                  className={`px-2.5 py-1.5 text-[12px] rounded-lg whitespace-nowrap transition-all duration-150 ${
                    item.highlight
                      ? 'text-orange-600 font-extrabold hover:bg-orange-50/80'
                      : 'text-slate-600 font-semibold hover:text-emerald-700 hover:bg-slate-50/80'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right trust signal */}
            <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-500 shrink-0 pl-4 font-medium">
              <ArrowRight className="w-3 h-3 text-emerald-500" />
              <span>Super Deals up to 60% Off • Free Express Delivery</span>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out All Categories Drawer */}
      <AllDrawer
        isOpen={allDrawerOpen}
        onClose={() => setAllDrawerOpen(false)}
      />

      {/* Location Modal */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        currentLocation={currentLocation}
        onSelectLocation={handleSetLocation}
      />
    </>
  );
}
