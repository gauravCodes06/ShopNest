import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, User, ChevronRight, ArrowLeft, ShieldCheck, LogOut } from 'lucide-react';
import { ShopNestLogo } from '../ui/ShopNestLogo';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface SubCategoryItem {
  label: string;
  query: string;
  category?: string;
  isHeader?: boolean;
}

interface CategoryDefinition {
  id: string;
  name: string;
  subcategories: SubCategoryItem[];
}

const CATEGORY_DATA: CategoryDefinition[] = [
  {
    id: 'mobiles-computers',
    name: 'Mobiles, Computers',
    subcategories: [
      { label: 'Mobiles', isHeader: true, query: '' },
      { label: 'All Mobile Phones', category: 'Mobiles', query: '' },
      { label: 'Flagship Smartphones', category: 'Mobiles', query: 'flagship' },
      { label: 'Apple iPhones', category: 'Mobiles', query: 'apple' },
      { label: 'Samsung Galaxy Phones', category: 'Mobiles', query: 'samsung' },
      { label: 'OnePlus & Android Phones', category: 'Mobiles', query: 'oneplus' },
      { label: 'Google Pixel & 5G Phones', category: 'Mobiles', query: 'pixel' },
      { label: 'Computers & Laptops', isHeader: true, query: '' },
      { label: 'All Laptops & Desktops', category: 'Computers', query: '' },
      { label: 'Apple MacBooks', category: 'Computers', query: 'macbook' },
      { label: 'Gaming Laptops', category: 'Computers', query: 'gaming' },
      { label: 'Thin & Light Laptops', category: 'Computers', query: 'laptop' },
      { label: 'Keyboards & Mice', category: 'Computers', query: 'keyboard' },
    ],
  },
  {
    id: 'tv-appliances-electronics',
    name: 'TV, Appliances, Electronics',
    subcategories: [
      { label: 'All Electronics', category: 'Electronics', query: '' },
      { label: 'Wireless Headphones', category: 'Electronics', query: 'headphones' },
      { label: 'True Wireless Earbuds', category: 'Electronics', query: 'earbuds' },
      { label: 'Smart Speakers & Alexa', category: 'Electronics', query: 'echo' },
      { label: 'Smartwatches & Fitness Bands', category: 'Electronics', query: 'watch' },
      { label: 'Bluetooth Speakers', category: 'Electronics', query: 'speaker' },
    ],
  },
  {
    id: 'mens-fashion',
    name: "Men's Fashion",
    subcategories: [
      { label: "All Men's Fashion", category: 'Fashion', query: 'men' },
      { label: 'Shirts & Casual Wear', category: 'Fashion', query: 'shirt' },
      { label: 'Puma & Sport Shoes', category: 'Fashion', query: 'sneakers' },
      { label: 'Chronograph Watches', category: 'Fashion', query: 'watch' },
      { label: 'Hardcase Luggage & Bags', category: 'Fashion', query: 'luggage' },
    ],
  },
  {
    id: 'womens-fashion',
    name: "Women's Fashion",
    subcategories: [
      { label: "All Women's Fashion", category: 'Fashion', query: 'women' },
      { label: 'Kurtas & Kurti Sets', category: 'Fashion', query: 'kurti' },
      { label: 'Festive Anarkali Suits', category: 'Fashion', query: 'anarkali' },
      { label: 'Party Dresses & Gowns', category: 'Fashion', query: 'gown' },
      { label: 'Shoulder Bags & Handbags', category: 'Fashion', query: 'handbag' },
    ],
  },
  {
    id: 'home-kitchen-pets',
    name: 'Home, Kitchen, Pets',
    subcategories: [
      { label: 'All Home & Kitchen', category: 'Home & Kitchen', query: '' },
      { label: 'Mixer Grinders & Blenders', category: 'Home & Kitchen', query: 'blender' },
      { label: 'Cookware Sets & Non-Stick Woks', category: 'Home & Kitchen', query: 'cookware' },
      { label: 'Electric Stoves & Cooktops', category: 'Home & Kitchen', query: 'stove' },
      { label: 'Microwave Ovens', category: 'Home & Kitchen', query: 'microwave' },
      { label: 'Thermosteel Bottles & Flasks', category: 'Home & Kitchen', query: 'bottle' },
    ],
  },
  {
    id: 'beauty-health-grocery',
    name: 'Beauty, Health, Grocery',
    subcategories: [
      { label: 'All Beauty & Personal Care', category: 'Beauty', query: '' },
      { label: 'Mascaras & Eye Makeup', category: 'Beauty', query: 'mascara' },
      { label: 'Eyeshadow Palettes', category: 'Beauty', query: 'eyeshadow' },
      { label: 'Lipsticks & Lip Color', category: 'Beauty', query: 'lipstick' },
      { label: 'Nail Polish & Manicure', category: 'Beauty', query: 'nail polish' },
      { label: 'Body Lotions & Skincare', category: 'Beauty', query: 'lotion' },
    ],
  },
  {
    id: 'sports-fitness-bags-luggage',
    name: 'Sports, Fitness, Bags, Luggage',
    subcategories: [
      { label: 'All Sports & Fitness', category: 'Sports', query: '' },
      { label: 'Cricket Bats & Balls', category: 'Sports', query: 'cricket' },
      { label: 'Basketballs & Hoops', category: 'Sports', query: 'basketball' },
      { label: 'Badminton & Shuttlecocks', category: 'Sports', query: 'shuttlecock' },
      { label: 'Baseball Gloves & Equipment', category: 'Sports', query: 'baseball' },
      { label: 'Football & Outdoor Balls', category: 'Sports', query: 'football' },
    ],
  },
  {
    id: 'toys-baby-products-kids-fashion',
    name: "Toys, Baby Products, Kids' Fashion",
    subcategories: [
      { label: 'Remote Control Toys & Cars', query: 'toy' },
      { label: 'Building Blocks & LEGO', query: 'lego' },
      { label: 'Baby Care & Diapers', query: 'baby' },
      { label: "Boys' Fashion & Clothing", category: 'Fashion', query: 'men' },
      { label: "Girls' Fashion & Dresses", category: 'Fashion', query: 'dress' },
    ],
  },
  {
    id: 'car-motorbike-industrial',
    name: 'Car, Motorbike, Industrial',
    subcategories: [
      { label: 'Smart Dash Cameras', category: 'Electronics', query: 'camera' },
      { label: 'Motorcycle Helmets & Accessories', category: 'Sports', query: 'sports' },
    ],
  },
  {
    id: 'books',
    name: 'Books',
    subcategories: [
      { label: 'All Books & Bestsellers', category: 'Books', query: '' },
      { label: 'Atomic Habits & Mindset', category: 'Books', query: 'habits' },
      { label: 'The Psychology of Money', category: 'Books', query: 'money' },
      { label: 'Ikigai & Happiness', category: 'Books', query: 'ikigai' },
      { label: 'Rich Dad Poor Dad & Finance', category: 'Books', query: 'rich dad' },
      { label: 'Philosophy, Sapiens & Classics', category: 'Books', query: 'sapiens' },
    ],
  },
  {
    id: 'movies-music-video-games',
    name: 'Movies, Music & Video Games',
    subcategories: [
      { label: 'Video Games & Consoles', category: 'Electronics', query: 'gaming' },
      { label: 'Gaming Headsets & Controllers', category: 'Electronics', query: 'headphones' },
      { label: 'PC Gaming Keyboards & Mice', category: 'Computers', query: 'keyboard' },
    ],
  },
  {
    id: 'gift-cards-recharges',
    name: 'Gift Cards & Mobile Recharges',
    subcategories: [
      { label: 'ShopNest Gift Cards', query: 'gift cards' },
      { label: 'Mobile Pre-paid Recharge', query: 'recharge' },
      { label: 'Brand Vouchers (Fashion & Dining)', query: 'brand vouchers' },
    ],
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AllDrawer({ isOpen, onClose }: Props) {
  const { user, isAuthenticated, signOut, openAuthModal } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  // Active subcategory ID for the sliding flyout view
  const [activeCategory, setActiveCategory] = useState<CategoryDefinition | null>(null);

  if (!isOpen) return null;

  const handleSelectSubcategory = (sub: SubCategoryItem) => {
    onClose();
    if (sub.category && !sub.query) {
      navigate(`/category/${encodeURIComponent(sub.category)}`);
    } else if (sub.category && sub.query) {
      navigate(`/search?q=${encodeURIComponent(sub.query)}&category=${encodeURIComponent(sub.category)}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(sub.query || '')}`);
    }
  };

  const programsAndFeatures = [
    { label: 'Gift Cards & Mobile Recharges', hasArrow: true, categoryId: 'gift-cards-recharges' },
    { label: 'ShopNest Launchpad', to: '/search?q=launchpad%20innovations', hasArrow: false },
    { label: 'ShopNest Business', to: '/search?q=business%20purchases', hasArrow: false },
    { label: 'Handloom and Handicrafts', to: '/search?q=handloom%20handicrafts', hasArrow: false },
    { divider: true },
    { label: 'ShopNest Saheli', to: '/search?q=women%20entrepreneurs%20saheli', hasArrow: false },
    { label: 'ShopNest Custom', to: '/search?q=customized%20gifts', hasArrow: false },
    { label: 'Flight Tickets', to: '/pay', hasArrow: false },
    { label: 'Buy more, Save more', to: '/search?q=super%20value%20save%20more', hasArrow: false },
    { label: 'Clearance store', to: '/search?q=clearance%20deals', hasArrow: false },
    { label: 'International Brands', to: '/search?q=global%20international%20store', hasArrow: false },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer panel with smooth sliding container */}
      <div className="relative w-80 sm:w-96 bg-white h-full z-10 flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-left duration-300">
        {/* Header with ShopNest Logo */}
        <div className="bg-[#232F3E] text-white p-4 sm:p-5 flex items-center justify-between shrink-0 shadow-md">
          <ShopNestLogo whiteText size="sm" />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User bar matching Amazon's "Hello, Sign In" */}
        <div className="bg-[#131921] px-5 py-3.5 text-slate-200 flex items-center justify-between text-xs border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
              {isAuthenticated && user ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
            </div>
            <div>
              <p className="font-bold text-white text-sm">
                {isAuthenticated && user ? `Hello, ${user.name}` : t('helloSignIn', 'Hello, Sign In')}
              </p>
              <p className="text-[11px] text-slate-400">{isAuthenticated ? 'ShopNest Prime Member' : 'Customer Account'}</p>
            </div>
          </div>

          {isAuthenticated ? (
            <button
              onClick={() => {
                signOut();
                onClose();
              }}
              className="text-slate-400 hover:text-rose-400 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('signOut', 'Sign Out')}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                openAuthModal('signin');
              }}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer shadow-xs transition-colors"
            >
              {t('signIn', 'Sign In')}
            </button>
          )}
        </div>

        {/* ── Slideable Double-pane Container ── */}
        <div className="relative flex-1 overflow-hidden">
          {/* Main Root Menu Pane */}
          <div
            className={`absolute inset-0 overflow-y-auto transition-transform duration-300 ease-in-out ${
              activeCategory ? '-translate-x-full' : 'translate-x-0'
            }`}
          >
            {/* Trending & Highlights */}
            <div className="py-2.5 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 px-6 py-2 uppercase tracking-wide">
                {t('trending', 'Trending')}
              </h3>
              <ul className="text-sm">
                <li>
                  <Link
                    to="/search?q=best%20seller"
                    onClick={onClose}
                    className="block px-6 py-2.5 text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium transition-colors"
                  >
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search?q=new"
                    onClick={onClose}
                    className="block px-6 py-2.5 text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium transition-colors"
                  >
                    New Releases
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search?q=deal"
                    onClick={onClose}
                    className="block px-6 py-2.5 text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium transition-colors"
                  >
                    Movers and Shakers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Digital Content and Devices */}
            <div className="py-2.5 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 px-6 py-2 uppercase tracking-wide">
                Digital Content and Devices
              </h3>
              <ul className="text-sm">
                <li>
                  <Link
                    to="/minitv"
                    onClick={onClose}
                    className="flex items-center justify-between px-6 py-2.5 text-slate-700 hover:bg-slate-100 font-medium transition-colors"
                  >
                    <span>ShopNest MiniTV- FREE entertainment</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search?q=alexa%20echo"
                    onClick={onClose}
                    className="flex items-center justify-between px-6 py-2.5 text-slate-700 hover:bg-slate-100 font-medium transition-colors"
                  >
                    <span>Echo & Alexa</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search?q=fire%20tv%20stick"
                    onClick={onClose}
                    className="flex items-center justify-between px-6 py-2.5 text-slate-700 hover:bg-slate-100 font-medium transition-colors"
                  >
                    <span>Fire TV</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/prime"
                    onClick={onClose}
                    className="flex items-center justify-between px-6 py-2.5 text-slate-700 hover:bg-slate-100 font-medium transition-colors"
                  >
                    <span>ShopNest Prime Video</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* ── Shop by Category (Matching Exact Reference Images 1 & 2) ── */}
            <div className="py-2.5 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 px-6 py-2 uppercase tracking-wide">
                {t('shopByCategory', 'Shop by Category')}
              </h3>
              <ul className="text-sm">
                {CATEGORY_DATA.slice(0, 4).map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left flex items-center justify-between px-6 py-2.5 font-medium transition-colors cursor-pointer ${
                        activeCategory?.id === cat.id
                          ? 'bg-slate-100 text-slate-950 font-bold'
                          : 'text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </button>
                  </li>
                ))}

                {/* Visual separator line as seen in Screenshot 1 & 2 */}
                <li className="my-2 border-t border-slate-150 mx-4" />

                {CATEGORY_DATA.slice(4).filter((c) => c.id !== 'gift-cards-recharges').map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left flex items-center justify-between px-6 py-2.5 font-medium transition-colors cursor-pointer ${
                        activeCategory?.id === cat.id
                          ? 'bg-slate-100 text-slate-950 font-bold'
                          : 'text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Programs & Features (Matching Exact Reference Image 3) ── */}
            <div className="py-2.5 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 px-6 py-2 uppercase tracking-wide">
                Programs & Features
              </h3>
              <ul className="text-sm">
                {programsAndFeatures.map((item, idx) => {
                  if (item.divider) {
                    return <li key={idx} className="my-2 border-t border-slate-150 mx-4" />;
                  }

                  if (item.hasArrow && item.categoryId) {
                    const linkedCat = CATEGORY_DATA.find((c) => c.id === item.categoryId);
                    return (
                      <li key={idx}>
                        <button
                          onClick={() => linkedCat && setActiveCategory(linkedCat)}
                          className="w-full text-left flex items-center justify-between px-6 py-2.5 text-slate-800 hover:bg-slate-50 font-medium transition-colors cursor-pointer"
                        >
                          <span>{item.label}</span>
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                        </button>
                      </li>
                    );
                  }

                  return (
                    <li key={idx}>
                      <Link
                        to={item.to || '/search'}
                        onClick={onClose}
                        className="block px-6 py-2.5 text-slate-800 hover:bg-slate-50 font-medium transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Help & Settings */}
            <div className="py-2.5">
              <h3 className="text-xs font-bold text-slate-900 px-6 py-2 uppercase tracking-wide">
                Help & Settings
              </h3>
              <ul className="text-sm">
                <li>
                  <Link
                    to="/orders"
                    onClick={onClose}
                    className="block px-6 py-2.5 text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                  >
                    Your Account & Orders
                  </Link>
                </li>
                {/* Theme & Uniform Cart Button Color */}
                <li className="px-6 py-2.5 bg-slate-50/70 border-y border-slate-100 my-1">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Theme & Button Color
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'sage', name: 'Sage Green', btn: 'Yellow' },
                      { id: 'cream', name: 'Cream White', btn: 'Black' },
                      { id: 'orange', name: 'Warm Orange', btn: 'Orange' },
                      { id: 'navy', name: 'Midnight Navy', btn: 'Amber' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setTheme(item.id as any)}
                        className={`text-left p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex flex-col ${
                          theme === item.id
                            ? 'bg-white border-slate-900 shadow-2xs font-bold text-slate-900'
                            : 'bg-white/80 border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-[11px] truncate">{item.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">Btn: {item.btn}</span>
                      </button>
                    ))}
                  </div>
                </li>

                <li>
                  <Link
                    to="/customer-service"
                    onClick={onClose}
                    className="block px-6 py-2.5 text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                  >
                    Customer Service 24/7
                  </Link>
                </li>
                {isAuthenticated ? (
                  <li>
                    <button
                      onClick={() => {
                        signOut();
                        onClose();
                      }}
                      className="w-full text-left px-6 py-2.5 text-rose-600 hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </li>
                ) : (
                  <li>
                    <button
                      onClick={() => {
                        onClose();
                        openAuthModal('signin');
                      }}
                      className="w-full text-left px-6 py-2.5 text-emerald-700 hover:bg-emerald-50 font-bold transition-colors cursor-pointer"
                    >
                      Sign In
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* ── Subcategory Sliding Flyout Pane (Level 2) ── */}
          <div
            className={`absolute inset-0 bg-white overflow-y-auto transition-transform duration-300 ease-in-out ${
              activeCategory ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {activeCategory && (
              <div>
                {/* Back button matching Amazon standard */}
                <button
                  onClick={() => setActiveCategory(null)}
                  className="w-full flex items-center gap-3 px-6 py-3.5 bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-xs uppercase tracking-wider border-b border-slate-200 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Main Menu</span>
                </button>

                {/* Subcategory title */}
                <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {activeCategory.name}
                  </h3>
                </div>

                {/* Subcategory links */}
                <ul className="text-sm py-2">
                  {activeCategory.subcategories.map((sub, sidx) => {
                    if (sub.isHeader) {
                      return (
                        <li key={sidx} className="pt-3 pb-1 px-6">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                            {sub.label}
                          </span>
                        </li>
                      );
                    }
                    return (
                      <li key={sidx}>
                        <button
                          onClick={() => handleSelectSubcategory(sub)}
                          className="w-full text-left px-6 py-2.5 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 font-medium transition-colors cursor-pointer flex items-center justify-between group"
                        >
                          <span>{sub.label}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom banner */}
        <div className="p-3.5 bg-emerald-50 border-t border-emerald-100/60 flex items-center gap-3 text-[11px] text-emerald-800 shrink-0 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>100% Genuine Products • Free Delivery on ₹499+</span>
        </div>
      </div>
    </div>
  );
}
