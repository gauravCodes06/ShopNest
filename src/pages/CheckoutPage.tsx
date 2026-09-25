import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../context/CartContext';
import { getProductById } from '../data/products';
import { formatPrice, generateOrderId } from '../lib/utils';
import { saveOrder } from '../lib/storage';
import type { Order } from '../types/product';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowLeft,
  Truck,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();

  const [fullName, setFullName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Springfield');
  const [postalCode, setPostalCode] = useState('97477');
  const [country, setCountry] = useState('United States');

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'demo'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        <h2 className="text-2xl font-bold text-slate-100 mb-4">No items to checkout</h2>
        <p className="text-slate-400 mb-8">Your cart is currently empty.</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Return to Shop
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !address.trim() || !city.trim() || !postalCode.trim()) {
      setError('Please complete all required shipping fields.');
      return;
    }

    setError(null);
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = generateOrderId();
      const newOrder: Order = {
        id: orderId,
        items,
        subtotal,
        shipping,
        tax,
        total,
        shippingAddress: {
          fullName,
          email,
          address,
          city,
          postalCode,
          country,
        },
        status: 'demo-confirmed',
        createdAt: new Date().toISOString(),
      };

      saveOrder(newOrder);
      clearCart();
      setIsProcessing(false);
      navigate(`/order-confirmation/${orderId}`, { state: { order: newOrder } });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Checkout</h1>
        <p className="text-slate-400 text-sm mt-1">Complete your order securely</p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Shipping & Payment details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Shipping Address */}
          <div className="card p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Truck className="w-5 h-5 text-teal-400" />
              <h2 className="text-base font-bold text-white">1. Shipping Address</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Street Address *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input text-sm"
                  placeholder="123 Main St, Apt 4B"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">City *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="input text-sm"
                  placeholder="City"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Postal / ZIP Code *</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="input text-sm"
                  placeholder="10001"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Country *</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="input text-sm"
                  placeholder="Country"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="card p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <CreditCard className="w-5 h-5 text-teal-400" />
              <h2 className="text-base font-bold text-white">2. Payment Method (Demo)</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'card', label: 'Credit Card', desc: 'Demo card pre-filled' },
                { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when delivered' },
                { id: 'demo', label: 'Mock 1-Click', desc: 'Instant demo approval' },
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMethod === m.id
                      ? 'border-teal-400 bg-teal-500/10 text-white shadow-sm shadow-teal-500/10'
                      : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-200">{m.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>

            {paymentMethod === 'card' && (
              <div className="pt-3 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-400">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="input text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-400">Expiration</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="input text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-400">Security CVC</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="input text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary (5 cols) */}
        <div className="lg:col-span-5">
          <div className="card p-6 sticky top-24 space-y-6">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Order Review ({cartWithProducts.length} items)
            </h2>

            {/* Items list preview */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartWithProducts.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3 text-sm">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded object-cover bg-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-200 text-xs font-medium truncate">{product.name}</p>
                    <p className="text-slate-500 text-[11px]">Qty: {quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-white shrink-0">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-slate-800 text-sm">
              <div className="flex justify-between text-slate-400 text-xs">
                <span>Subtotal</span>
                <span className="text-slate-200 font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-xs">
                <span>Shipping</span>
                <span className="text-slate-200 font-semibold">
                  {shipping === 0 ? <span className="text-emerald-400">FREE</span> : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-slate-400 text-xs">
                <span>Estimated Tax (8%)</span>
                <span className="text-slate-200 font-semibold">{formatPrice(tax)}</span>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Order Total</span>
                <span className="text-2xl font-black text-white">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 shadow-lg shadow-orange-500/20"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing Order…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Place Demo Order ({formatPrice(total)})
                </span>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-800">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Simulated demo transaction — no charges applied</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
