import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Package, Heart, Headphones, Sparkles, LogIn, LogOut, CheckCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountDropdown({ isOpen, onClose }: Props) {
  const { user, isAuthenticated, signOut, openAuthModal } = useAuth();

  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-5 text-slate-800 z-50 animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Top CTA or User Profile */}
      {isAuthenticated && user ? (
        <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-sm shadow-xs">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900 leading-tight">
                Hello, {user.name}
              </p>
              <p className="text-[11px] text-slate-400 truncate max-w-[150px]">
                {user.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              signOut();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="text-center pb-4 border-b border-slate-100">
          <button
            type="button"
            onClick={() => {
              openAuthModal('signin');
              onClose();
            }}
            className="btn-sage w-full py-2.5 text-sm font-semibold rounded-xl cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In / Register</span>
          </button>
          <p className="text-xs text-slate-500 mt-2.5">
            New to ShopNest?{' '}
            <button
              type="button"
              onClick={() => {
                openAuthModal('signup');
                onClose();
              }}
              className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline cursor-pointer"
            >
              Create account
            </button>
          </p>
        </div>
      )}

      {/* Account Links */}
      <div className="pt-3 space-y-1 text-xs">
        <p className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Account Shortcuts
        </p>
        <Link
          to="/orders"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-emerald-600 font-medium transition-colors"
        >
          <Package className="w-4 h-4 text-slate-400" />
          <span>Your Orders & Purchases</span>
        </Link>
        <Link
          to="/pay"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-emerald-600 font-medium transition-colors"
        >
          <Sparkles className="w-4 h-4 text-slate-400" />
          <span>ShopNest Pay & Balance</span>
        </Link>
        <Link
          to="/wishlist"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-emerald-600 font-medium transition-colors"
        >
          <Heart className="w-4 h-4 text-slate-400" />
          <span>Saved Wishlist</span>
        </Link>
        <Link
          to="/customer-service"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-emerald-600 font-medium transition-colors"
        >
          <Headphones className="w-4 h-4 text-slate-400" />
          <span>Customer Help Center</span>
        </Link>
      </div>
    </div>
  );
}
