import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../context/CartContext';
import { getProductById } from '../data/products';
import { formatPrice } from '../lib/utils';
import { PrimeBadge } from '../components/ui/AmazonLogo';
import { Trash2, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';

export function CartPage() {
  const navigate = useNavigate();
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
      <div className="max-w-[1500px] mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-[4px] border border-[#e7e7e7] shadow-sm flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 bg-[#f7fafa] rounded-full flex items-center justify-center shrink-0">
            <ShoppingBag className="w-24 h-24 text-gray-300" />
          </div>
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-[#0f1111]">Your Amazon Cart is empty</h1>
            <p className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline cursor-pointer">
              Shop today's deals
            </p>
            <div className="pt-2 flex gap-3">
              <Link to="/" className="btn-amazon-primary px-6 py-2">
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── Left Column: Shopping Cart Items ────────────────────────────── */}
        <div className="lg:col-span-9 bg-white p-6 rounded-[4px] border border-[#e7e7e7] shadow-sm">
          <div className="flex items-baseline justify-between border-b border-[#e7e7e7] pb-3 mb-4">
            <h1 className="text-2xl font-medium text-[#0f1111]">Shopping Cart</h1>
            <span className="text-xs text-[#565959] hidden sm:inline">Price</span>
          </div>

          <div className="divide-y divide-[#e7e7e7]">
            {cartProducts.map((p) => {
              if (!p) return null;
              return (
                <div key={p.id} className="py-5 flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="flex gap-4">
                    {/* Image */}
                    <Link
                      to={`/product/${p.id}`}
                      className="w-28 h-28 shrink-0 bg-white flex items-center justify-center p-1 border border-gray-100 rounded"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex flex-col gap-1">
                      <Link
                        to={`/product/${p.id}`}
                        className="text-base font-medium text-[#0f1111] hover:text-[#c7511f] line-clamp-2 leading-snug"
                      >
                        {p.name}
                      </Link>

                      <p className="text-xs text-[#007600] font-medium">In stock</p>
                      <p className="text-xs text-[#565959]">Eligible for FREE Shipping</p>

                      <div className="flex items-center gap-2 mt-0.5">
                        <PrimeBadge />
                      </div>

                      {/* Controls: Qty, Delete */}
                      <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#007185]">
                        <div className="flex items-center border border-[#d5d9d9] bg-[#f0f2f2] hover:bg-[#e3e6e6] rounded-[8px] px-2 py-0.5 text-xs text-[#0f1111] shadow-inner">
                          <label htmlFor={`qty-${p.id}`} className="mr-1">Qty:</label>
                          <select
                            id={`qty-${p.id}`}
                            value={p.quantity}
                            onChange={(e) => updateQuantity(p.id, Number(e.target.value))}
                            className="bg-transparent font-medium outline-none cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                              <option key={n} value={n}>
                                {n}
                              </option>
                            ))}
                          </select>
                        </div>

                        <span className="text-gray-300">|</span>

                        <button
                          onClick={() => removeItem(p.id)}
                          className="hover:underline hover:text-[#c7511f] cursor-pointer"
                        >
                          Delete
                        </button>

                        <span className="text-gray-300">|</span>

                        <button className="hover:underline hover:text-[#c7511f] cursor-pointer">
                          Save for later
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right sm:text-right shrink-0">
                    <span className="text-lg font-bold text-[#0f1111]">
                      {formatPrice(p.price * p.quantity)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtotal Footer */}
          <div className="border-t border-[#e7e7e7] pt-4 text-right">
            <p className="text-base text-[#0f1111]">
              Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):{' '}
              <span className="font-bold text-lg">{formatPrice(subtotal)}</span>
            </p>
          </div>
        </div>

        {/* ── Right Column: Checkout Summary Box ──────────────────────────── */}
        <div className="lg:col-span-3 bg-white p-5 rounded-[4px] border border-[#e7e7e7] shadow-sm flex flex-col gap-4 sticky top-24">
          <div className="flex items-start gap-2 text-xs text-[#007600] font-medium leading-tight">
            <CheckCircle className="w-5 h-5 text-[#007600] shrink-0" />
            <p>
              Your order qualifies for <span className="font-bold">FREE Delivery</span>. Select this option at checkout.
            </p>
          </div>

          <div>
            <p className="text-lg text-[#0f1111]">
              Subtotal ({totalItems} items):{' '}
              <span className="font-bold">{formatPrice(subtotal)}</span>
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <input type="checkbox" id="gift" className="rounded text-[#e77600] focus:ring-[#e77600]" />
              <label htmlFor="gift" className="text-xs text-[#0f1111] cursor-pointer">
                This order contains a gift
              </label>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="btn-amazon-primary w-full py-2.5 text-sm font-normal shadow-sm cursor-pointer"
          >
            Proceed to Buy
          </button>

          <div className="border-t border-[#e7e7e7] pt-3 text-[11px] text-[#565959]">
            <p className="font-bold text-[#0f1111] mb-1">EMI Available</p>
            <p>No Cost EMI available on selected cards. Details at checkout.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
