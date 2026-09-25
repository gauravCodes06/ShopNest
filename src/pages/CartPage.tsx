import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../context/CartContext';
import { getProductById } from '../data/products';
import { formatPrice } from '../lib/utils';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { ProductImage } from '../components/ui/ProductImage';
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';

export function CartPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();

  const cartWithProducts = items
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { ...item, product } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const subtotal = cartWithProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartWithProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-500">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Your Shopping Cart is Empty</h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Explore our trending gadgets, modern fashion, and premium accessories to fill it up.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Shopping Cart</h1>
          <p className="text-slate-400 text-sm mt-1">
            {cartWithProducts.length} unique {cartWithProducts.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartWithProducts.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-1">
                <Link
                  to={`/product/${product.id}`}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-slate-800 overflow-hidden shrink-0"
                >
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </Link>
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <Link
                    to={`/product/${product.id}`}
                    className="block font-semibold text-slate-100 hover:text-teal-400 text-sm sm:text-base transition-colors line-clamp-2"
                  >
                    {product.name}
                  </Link>
                  <div className="text-sm font-bold text-white sm:hidden">
                    {formatPrice(product.price)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <QuantitySelector
                  value={quantity}
                  min={1}
                  max={Math.min(product.stock, 10)}
                  onChange={(qty) => updateQuantity(product.id, qty)}
                />

                <div className="text-right min-w-[80px]">
                  <div className="font-extrabold text-white text-base">
                    {formatPrice(product.price * quantity)}
                  </div>
                  {quantity > 1 && (
                    <div className="text-xs text-slate-500">
                      {formatPrice(product.price)} each
                    </div>
                  )}
                </div>

                <button
                  onClick={() => removeItem(product.id)}
                  aria-label="Remove item"
                  className="text-slate-500 hover:text-red-400 p-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="card p-6 sticky top-24 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-200 font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Shipping</span>
                <span className="text-slate-200 font-semibold">
                  {shipping === 0 ? (
                    <span className="text-emerald-400">FREE</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-[11px] text-amber-400/90 bg-amber-500/10 p-2 rounded border border-amber-500/20">
                  Add {formatPrice(50 - subtotal)} more to qualify for FREE Shipping!
                </p>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Estimated Tax (8%)</span>
                <span className="text-slate-200 font-semibold">{formatPrice(tax)}</span>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-base font-bold text-white">Total</span>
                <span className="text-2xl font-black text-white">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 shadow-lg shadow-orange-500/20"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-800">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Safe & Secure 256-bit Demo Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
