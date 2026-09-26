import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getProductById } from '../data/products';
import { formatPrice, generateOrderId } from '../lib/utils';
import { ShopNestLogo } from '../components/ui/ShopNestLogo';
import { saveOrderToFirebase } from '../lib/firebase';
import { saveOrder } from '../lib/storage';
import {
  Lock,
  ShieldCheck,
  Check,
  Truck,
  CreditCard,
  ChevronRight,
  Tag,
  QrCode,
  Smartphone,
  CheckCircle2,
  Wallet,
} from 'lucide-react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || 'Gaurav Mali');
  const [email, setEmail] = useState(user?.email || 'gaurav@example.com');
  const [address, setAddress] = useState('123 MG Road');
  const [city, setCity] = useState('Bengaluru');
  const [postalCode, setPostalCode] = useState('560001');
  const [country, setCountry] = useState('India');

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express' | 'nextday'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod' | 'pay_balance'>('card');
  const [payBalance, setPayBalance] = useState(() => {
    const saved = localStorage.getItem('shopnest_pay_balance');
    return saved ? parseFloat(saved) : 1250;
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Card details state
  const [cardNumber, setCardNumber] = useState('4532 8920 1829 4920');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('821');

  // UPI details state
  const [upiId, setUpiId] = useState('gaurav@okaxis');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');

  // Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  const cartProducts = items
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const subtotal = cartProducts.reduce(
    (sum, p) => sum + (p ? p.price * p.quantity : 0),
    0
  );

  const deliveryCost = {
    standard: 0,
    express: 99,
    nextday: 199,
  }[deliveryMethod];

  // Calculate promo discount
  let discountAmount = 0;
  if (appliedPromo) {
    discountAmount = appliedPromo.discount;
  }

  const total = Math.max(0, subtotal + deliveryCost - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'WELCOME10') {
      const disc = Math.round(subtotal * 0.1);
      setAppliedPromo({ code, discount: disc });
    } else if (code === 'NEST500') {
      setAppliedPromo({ code, discount: 500 });
    } else if (code === 'FREESHIP') {
      setAppliedPromo({ code, discount: deliveryCost });
    } else {
      setPromoError('Invalid coupon code. Try WELCOME10 or NEST500.');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderId = `#552026${Math.floor(100000 + Math.random() * 900000)}`;
    const fullAddress = `${address}, ${city} ${postalCode}, ${country}`;

    const newOrder = {
      id: orderId,
      orderId,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      createdAt: new Date().toISOString(),
      recipient: name,
      email,
      address: fullAddress,
      total,
      deliveryMethod,
      paymentMethod,
      status: 'Order Confirmed — Delivery in 2-5 days',
      items: cartProducts,
    };

    // Save to Firebase Realtime Database
    await saveOrderToFirebase(newOrder);

    // Deduct Pay balance if used
    if (paymentMethod === 'pay_balance') {
      const remaining = Math.max(0, payBalance - total);
      setPayBalance(remaining);
      localStorage.setItem('shopnest_pay_balance', remaining.toString());
    }

    // Save to local storage
    try {
      saveOrder(newOrder as any);
    } catch (err) {
      console.warn('Storage save warning:', err);
    }

    clearCart();
    navigate('/order-confirmation', {
      state: {
        orderId,
        name,
        email,
        address: fullAddress,
        total,
        deliveryMethod,
        items: cartProducts,
      },
    });
  };

  if (cartProducts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center bg-white my-12 rounded-3xl border border-slate-200 shadow-subtle">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Cart is Empty</h2>
        <p className="text-sm text-slate-500 mb-6">
          Add items to your cart before proceeding to checkout.
        </p>
        <Link to="/" className="btn-sage inline-flex px-6 py-2.5 rounded-full">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* ── Checkout Minimal Header ─────────────────────────────────── */}
      <header className="bg-white border-b border-slate-200/80 py-4">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link to="/">
            <ShopNestLogo size="md" />
          </Link>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Bank-Grade 256-Bit SSL Checkout</span>
          </div>
        </div>
      </header>

      {/* ── Main Checkout Content ───────────────────────────────────── */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
          Checkout
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact & Shipping (cols 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact Information Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-subtle space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Contact Information
              </h2>
              <div className="space-y-4 text-xs font-semibold text-slate-700">
                <div>
                  <label className="block mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="input"
                  />
                </div>
                <div>
                  <label className="block mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-subtle space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Shipping Address
              </h2>
              <div className="space-y-4 text-xs font-semibold text-slate-700">
                <div>
                  <label className="block mb-1.5">Address *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street address, apartment or suite"
                    className="input"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5">Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="Postal code / ZIP"
                      className="input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-1.5">Country *</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="input cursor-pointer"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Amazon-style Promo Code Box */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle space-y-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Have a Promo Code or Gift Card?</h3>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Try WELCOME10 or NEST500"
                  className="input flex-1 uppercase font-semibold"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="btn-sage px-5 py-2.5 rounded-xl font-bold text-xs"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-xs text-rose-500 font-medium">{promoError}</p>}
              {appliedPromo && (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Coupon '{appliedPromo.code}' Applied (-{formatPrice(appliedPromo.discount)})
                  </span>
                  <button
                    type="button"
                    onClick={() => setAppliedPromo(null)}
                    className="text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Delivery Method, Payment & Place Order (cols 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Delivery Method Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-subtle space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Delivery Method
              </h2>
              <div className="space-y-2.5">
                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    deliveryMethod === 'standard'
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'standard'}
                      onChange={() => setDeliveryMethod('standard')}
                      className="accent-emerald-600"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Standard Delivery</p>
                      <p className="text-[11px] text-slate-500">2-5 business days</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    FREE
                  </span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    deliveryMethod === 'express'
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'express'}
                      onChange={() => setDeliveryMethod('express')}
                      className="accent-emerald-600"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Express Delivery</p>
                      <p className="text-[11px] text-slate-500">1-2 business days</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    ₹99
                  </span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('nextday')}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    deliveryMethod === 'nextday'
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'nextday'}
                      onChange={() => setDeliveryMethod('nextday')}
                      className="accent-emerald-600"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Next Day Delivery</p>
                      <p className="text-[11px] text-slate-500">Tomorrow guaranteed</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    ₹199
                  </span>
                </label>
              </div>
            </div>

            {/* Payment Method Card matching Screen 4 & Screenshot 2 */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-subtle space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Payment (Demo)</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  This is a demo checkout. No real payment will be processed.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                {/* Option 0: ShopNest Pay Balance (Amazon Pay Style) */}
                <label
                  onClick={() => setPaymentMethod('pay_balance')}
                  className={`flex flex-col p-3 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'pay_balance'
                      ? 'border-emerald-600 bg-emerald-50/30 ring-1 ring-emerald-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'pay_balance'}
                        onChange={() => setPaymentMethod('pay_balance')}
                        className="accent-emerald-600"
                      />
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Wallet className="w-4 h-4 text-emerald-600" />
                        ShopNest Pay Balance
                      </span>
                    </div>
                    <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full text-[11px]">
                      {formatPrice(payBalance)} Available
                    </span>
                  </div>

                  {paymentMethod === 'pay_balance' && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[11px] text-slate-600 space-y-1 animate-in fade-in pl-6">
                      <p className="font-semibold text-emerald-800">
                        ⚡ 1-Click Instant Payment. Zero OTP or CVV required.
                      </p>
                      <p className="text-slate-500">
                        Eligible for 5% cashback on this order!
                      </p>
                    </div>
                  )}
                </label>

                {/* Option 1: Card */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col p-3 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-emerald-600 bg-emerald-50/30 ring-1 ring-emerald-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-emerald-600"
                    />
                    <span className="font-bold text-slate-900">Credit/Debit Card (Demo)</span>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-3 pt-3 border-t border-slate-200/60 space-y-2.5 animate-in fade-in">
                      <div>
                        <label className="text-[10px] text-slate-500 uppercase font-bold">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="input mt-1 py-1.5 text-xs font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-500 uppercase font-bold">Expires</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="input mt-1 py-1.5 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 uppercase font-bold">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="input mt-1 py-1.5 text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </label>

                {/* Option 2: UPI */}
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex flex-col p-3 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-emerald-600 bg-emerald-50/30 ring-1 ring-emerald-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-emerald-600"
                    />
                    <span className="font-bold text-slate-900">UPI (Demo)</span>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-slate-200/60 space-y-2 animate-in fade-in">
                      <div className="flex gap-2">
                        {['gpay', 'phonepe', 'paytm'].map((app) => (
                          <button
                            type="button"
                            key={app}
                            onClick={() => setSelectedUpiApp(app)}
                            className={`flex-1 py-1.5 rounded-lg border text-[11px] font-bold uppercase transition-colors ${
                              selectedUpiApp === app
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {app}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@bank"
                        className="input py-1.5 text-xs font-medium"
                      />
                    </div>
                  )}
                </label>

                {/* Option 3: COD */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex flex-col p-3 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-600 bg-emerald-50/30 ring-1 ring-emerald-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-emerald-600"
                    />
                    <span className="font-bold text-slate-900">Cash on Delivery (Demo)</span>
                  </div>

                  {paymentMethod === 'cod' && (
                    <p className="mt-2 text-[11px] text-slate-500 pl-6 animate-in fade-in">
                      Pay easily via Cash or UPI QR scan upon delivery at your doorstep.
                    </p>
                  )}
                </label>
              </div>

              {/* Order Breakdown */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal ({cartProducts.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{deliveryCost === 0 ? 'FREE' : formatPrice(deliveryCost)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Coupon ({appliedPromo.code})</span>
                    <span>-{formatPrice(appliedPromo.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Amount</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Big Sage Green Button matching Screen 4 & Screenshot 2 */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full btn-sage py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </span>
                ) : (
                  <span>Place Order (Demo) {formatPrice(total)}</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
