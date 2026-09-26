import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../context/CartContext';
import { getProductById } from '../data/products';
import { formatPrice } from '../lib/utils';
import { ProductImage } from '../components/ui/ProductImage';
import { Trash2, ShoppingBag, ShieldCheck, ArrowRight, Minus, Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function CartPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { items, updateQuantity, removeItem, clearCart, getTotalItems } = useCartStore();

  const cartProducts = items
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const subtotal = cartProducts.reduce((sum, p) => sum + (p ? p.price * p.quantity : 0), 0);
  const totalItems = getTotalItems();

  if (cartProducts.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="bg-white p-12 rounded-3xl border border-slate-200/80 shadow-subtle text-center max-w-lg mx-auto space-y-4">
          <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{t('cartEmpty', 'Your Cart is Empty')}</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t('cartEmptyDesc', "Looks like you haven't added anything yet. Explore our top trending products.")}
          </p>
          <div className="pt-2">
            <Link to="/" className="btn-sage inline-flex px-6 py-2.5 rounded-full text-xs font-semibold">
              {t('exploreProducts', 'Explore Products')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8] py-8 pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
          {t('shoppingCart', 'Shopping Cart')} ({totalItems} {totalItems === 1 ? t('item', 'item') : t('items', 'items')})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('itemDetails', 'Item Details')}</span>
              <button onClick={clearCart} className="text-xs font-semibold text-rose-500 hover:text-rose-600 cursor-pointer">
                {t('clearCart', 'Clear Cart')}
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {cartProducts.map((p) => {
                if (!p) return null;
                return (
                  <div key={p.id} className="py-5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <Link to={`/product/${p.id}`}
                        className="w-20 h-20 rounded-2xl bg-slate-50 p-2 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                        <ProductImage src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                      </Link>
                      <div className="space-y-1 min-w-0">
                        <Link to={`/product/${p.id}`} className="text-sm font-semibold text-slate-900 hover:text-emerald-600 transition-colors line-clamp-1">
                          {p.name}
                        </Link>
                        <p className="text-xs text-emerald-600 font-medium">{t('inStockFreeDelivery', 'In Stock • Eligible for Free Delivery')}</p>
                        <p className="text-sm font-bold text-slate-900">{formatPrice(p.price)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                      <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                        <button onClick={() => updateQuantity(p.id, Math.max(1, p.quantity - 1))} className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-800">{p.quantity}</span>
                        <button onClick={() => updateQuantity(p.id, p.quantity + 1)} className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(p.id)} className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50/60 transition-colors cursor-pointer" title="Remove item">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-subtle space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              {t('orderSummary', 'Order Summary')}
            </h2>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{t('subtotal', 'Subtotal')} ({totalItems} {totalItems === 1 ? t('item', 'item') : t('items', 'items')})</span>
                <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('delivery', 'Delivery')}</span>
                <span className="text-emerald-700 font-bold">{t('free', 'FREE')}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-slate-900 pt-3 border-t border-slate-100">
                <span>{t('totalAmount', 'Total Amount')}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full btn-sage py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <span>{t('proceedToCheckout', 'Proceed to Checkout')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100/70 flex items-center gap-2.5 text-xs text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t('secureCheckout', 'Safe & Secure 256-bit encrypted checkout')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
