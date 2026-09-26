import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, ShoppingCart, User, Heart } from 'lucide-react';
import { useCartStore } from '../../context/CartContext';
import { useWishlistStore } from '../../context/WishlistContext';

import { useLanguage } from '../../context/LanguageContext';

export function MobileBottomNav() {
  const location = useLocation();
  const totalItems = useCartStore((s) => s.getTotalItems());
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const { t } = useLanguage();

  const navItems = [
    { label: t('home', 'Home'), to: '/', icon: Home },
    { label: t('allCategories', 'Categories'), to: '/category/Electronics', icon: LayoutGrid },
    { label: t('wishlist', 'Wishlist'), to: '/wishlist', icon: Heart, count: wishlistCount },
    { label: t('cart', 'Cart'), to: '/cart', icon: ShoppingCart, count: totalItems },
    { label: t('yourOrders', 'Account'), to: '/orders', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-2 py-1.5 flex items-center justify-around safe-area-bottom">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to);

        return (
          <Link
            key={item.label}
            to={item.to}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive
                ? 'text-emerald-600 font-bold'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {item.count && item.count > 0 ? (
                <span className="absolute -top-1.5 -right-2 bg-emerald-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {item.count}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
