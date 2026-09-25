import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-teal-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-extrabold">
                <span className="text-white">Shop</span>
                <span className="text-teal-400">Sphere</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Discover More. Shop Smarter. Premium products at your fingertips.
            </p>
            <div className="flex gap-3 mt-4">
              {[Github, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-600 hover:text-teal-400 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-slate-200 font-semibold text-sm mb-3">Shop</h4>
            <ul className="space-y-2">
              {['Electronics', 'Fashion', 'Home & Living', 'Accessories', 'Beauty', 'Sports'].map((cat) => (
                <li key={cat}>
                  <Link to={`/category/${encodeURIComponent(cat)}`} className="text-slate-500 hover:text-teal-400 text-sm transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-slate-200 font-semibold text-sm mb-3">My Account</h4>
            <ul className="space-y-2">
              {[
                { label: 'Wishlist', to: '/wishlist' },
                { label: 'Cart', to: '/cart' },
                { label: 'Orders', to: '/orders' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-slate-500 hover:text-teal-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-slate-200 font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2">
              {['About', 'Careers', 'Press', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-teal-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">© {year} ShopSphere. All rights reserved. Demo project — not a real store.</p>
          <div className="flex items-center gap-3">
            <span className="bg-slate-800 text-slate-500 text-xs px-2 py-1 rounded">🔒 Demo Payments Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
