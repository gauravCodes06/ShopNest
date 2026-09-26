import { Link } from 'react-router-dom';
import { useWishlistStore } from '../context/WishlistContext';
import { useCartStore } from '../context/CartContext';
import { getProductById } from '../data/products';
import { formatPrice } from '../lib/utils';
import { ProductImage } from '../components/ui/ProductImage';
import { Heart, Trash2, ShoppingCart, Star, Check } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function WishlistPage() {
  const { t } = useLanguage();
  const { ids, toggle } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const [movedAll, setMovedAll] = useState(false);

  const wishlistProducts = ids.map((id) => getProductById(id)).filter(Boolean);

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach((p) => { if (p) addItem(p.id, 1); });
    setMovedAll(true);
    setTimeout(() => setMovedAll(false), 2000);
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="bg-white p-12 rounded-3xl border border-slate-200/80 shadow-subtle text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{t('wishlistEmpty', 'Your Wishlist is Empty')}</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t('wishlistEmptyDesc', 'Save items you love by tapping the heart icon on any product.')}
          </p>
          <div className="pt-2">
            <Link to="/" className="btn-sage inline-flex px-6 py-2.5 rounded-full text-xs font-semibold">
              {t('startShopping', 'Start Shopping')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-subtle mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {t('myWishlist', 'My Wishlist')} ({wishlistProducts.length} {t('items', 'items')})
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">{t('wishlistEmptyDesc', 'Items saved for future purchases')}</p>
          </div>

          <button onClick={handleMoveAllToCart} className={`btn-add-to-cart px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 ${movedAll ? 'btn-added' : ''}`}>
            {movedAll ? (
              <><Check className="w-4 h-4 stroke-[3]" /><span>{t('added', 'All Moved to Cart!')}</span></>
            ) : (
              <><ShoppingCart className="w-4 h-4" /><span>{t('addToCart', 'Move All to Cart')}</span></>
            )}
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle divide-y divide-slate-100 overflow-hidden">
          {wishlistProducts.map((p) => {
            if (!p) return null;
            return (
              <div key={p.id} className="p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Link to={`/product/${p.id}`} className="w-20 h-20 rounded-2xl bg-slate-50 p-2.5 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                    <ProductImage src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                  </Link>
                  <div className="space-y-1 min-w-0">
                    <Link to={`/product/${p.id}`} className="text-sm font-semibold text-slate-900 hover:text-emerald-600 transition-colors line-clamp-1">
                      {p.name}
                    </Link>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-slate-700">{p.rating.toFixed(1)}</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-medium">{t('inStockFreeDelivery', 'In Stock')}</span>
                    </div>
                    <p className="text-base font-bold text-slate-900">{formatPrice(p.price)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button onClick={() => addItem(p.id, 1)} className="btn-add-to-cart px-4 py-2 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{t('addToCart', 'Move to Cart')}</span>
                  </button>
                  <button onClick={() => toggle(p.id)}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50/60 transition-colors cursor-pointer"
                    title={t('removeFromWishlist', 'Remove from Wishlist')}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
