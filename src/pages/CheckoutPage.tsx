import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../context/CartContext';
import { getProductById } from '../data/products';
import { formatPrice, generateOrderId } from '../lib/utils';
import { AmazonLogo } from '../components/ui/AmazonLogo';
import { Lock, ShieldCheck, ChevronRight, Check } from 'lucide-react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();

  const [name, setName] = useState('Rahul Sharma');
  const [phone, setPhone] = useState('9876543210');
  const [address, setAddress] = useState('Flat 402, Sea Green Apartments, Bandra West');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('400050');
  const [paymentMethod, setPaymentMethod] = useState<'amazonpay' | 'upi' | 'card' | 'cod'>('amazonpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const cartProducts = items
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const subtotal = cartProducts.reduce((sum, p) => sum + (p ? p.price * p.quantity : 0), 0);
  const delivery = subtotal > 499 ? 0 : 40;
  const total = subtotal + delivery;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = generateOrderId();
      clearCart();
      navigate('/order-confirmation', {
        state: {
          orderId,
          name,
          address: `${address}, ${city}, ${state} - ${pincode}`,
          total,
          paymentMethod,
          items: cartProducts,
        },
      });
    }, 1500);
  };

  if (cartProducts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center bg-white my-8 rounded-[4px] border border-gray-200">
        <h2 className="text-2xl font-bold text-[#0f1111] mb-2">Your Cart is Empty</h2>
        <p className="text-sm text-[#565959] mb-6">Add items to your cart before proceeding to checkout.</p>
        <Link to="/" className="btn-amazon-primary inline-flex px-6 py-2">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaeded]">
      {/* ── Checkout Minimal Header ───────────────────────────────────────── */}
      <header className="bg-[#131921] text-white py-3 border-b border-[#37475a]">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <Link to="/">
            <AmazonLogo className="h-7" />
          </Link>
          <div className="flex items-center gap-2 text-lg font-normal text-white">
            <span>Checkout</span>
            <span className="text-sm text-gray-400">({cartProducts.length} items)</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Lock className="w-4 h-4 text-[#febd69]" />
            <span className="hidden sm:inline">100% Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* ── Main Checkout Content ─────────────────────────────────────────── */}
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Steps (cols 1-8) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Step 1: Delivery Address */}
            <div className="bg-white p-6 rounded-[4px] border border-[#d5d9d9] shadow-sm">
              <div className="flex items-center gap-3 border-b border-[#e7e7e7] pb-3 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#131921] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-lg font-bold text-[#0f1111]">Delivery address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#0f1111] font-bold mb-1">Full name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-[#0f1111] font-bold mb-1">Mobile number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[#0f1111] font-bold mb-1">
                    Flat, House no., Building, Company, Apartment
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-[#0f1111] font-bold mb-1">Town/City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-[#0f1111] font-bold mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-[#0f1111] font-bold mb-1">6-digit PIN code</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white p-6 rounded-[4px] border border-[#d5d9d9] shadow-sm">
              <div className="flex items-center gap-3 border-b border-[#e7e7e7] pb-3 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#131921] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-lg font-bold text-[#0f1111]">Payment method</h2>
              </div>

              <div className="space-y-3 text-xs">
                {/* Amazon Pay */}
                <label className="flex items-start gap-3 p-3 border rounded-[4px] cursor-pointer hover:bg-gray-50 border-gray-200">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'amazonpay'}
                    onChange={() => setPaymentMethod('amazonpay')}
                    className="mt-0.5 text-[#e77600] focus:ring-[#e77600]"
                  />
                  <div>
                    <span className="font-bold text-sm text-[#0f1111]">Amazon Pay Balance</span>
                    <p className="text-[#565959] text-xs">Available balance: ₹25,000.00 (Instant 1-click checkout)</p>
                  </div>
                </label>

                {/* UPI */}
                <label className="flex items-start gap-3 p-3 border rounded-[4px] cursor-pointer hover:bg-gray-50 border-gray-200">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mt-0.5 text-[#e77600] focus:ring-[#e77600]"
                  />
                  <div>
                    <span className="font-bold text-sm text-[#0f1111]">Other UPI Apps</span>
                    <p className="text-[#565959] text-xs">Google Pay, PhonePe, Paytm, BHIM UPI</p>
                  </div>
                </label>

                {/* Credit / Debit Card */}
                <label className="flex items-start gap-3 p-3 border rounded-[4px] cursor-pointer hover:bg-gray-50 border-gray-200">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-0.5 text-[#e77600] focus:ring-[#e77600]"
                  />
                  <div>
                    <span className="font-bold text-sm text-[#0f1111]">Credit or debit card</span>
                    <p className="text-[#565959] text-xs">Amazon accepts all major credit and debit cards</p>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label className="flex items-start gap-3 p-3 border rounded-[4px] cursor-pointer hover:bg-gray-50 border-gray-200">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-0.5 text-[#e77600] focus:ring-[#e77600]"
                  />
                  <div>
                    <span className="font-bold text-sm text-[#0f1111]">Cash on Delivery / Pay on Delivery</span>
                    <p className="text-[#565959] text-xs">Pay via Cash, UPI, or Card at your doorstep</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 3: Review Items and Delivery */}
            <div className="bg-white p-6 rounded-[4px] border border-[#d5d9d9] shadow-sm">
              <div className="flex items-center gap-3 border-b border-[#e7e7e7] pb-3 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#131921] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="text-lg font-bold text-[#0f1111]">Review items and delivery</h2>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-[#007600]">
                  Guaranteed Delivery: Tomorrow by 11 AM
                </p>
                <div className="divide-y divide-gray-100">
                  {cartProducts.map((p) => {
                    if (!p) return null;
                    return (
                      <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-14 h-14 object-contain rounded" />
                          <div>
                            <p className="text-xs font-medium text-[#0f1111] line-clamp-1">{p.name}</p>
                            <p className="text-xs text-[#565959]">Quantity: {p.quantity}</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-[#0f1111]">
                          {formatPrice(p.price * p.quantity)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── Order Summary Sidebar (cols 9-12) ───────────────────────────── */}
          <div className="lg:col-span-4 bg-white p-5 rounded-[4px] border border-[#d5d9d9] shadow-sm sticky top-6">
            <button
              type="submit"
              disabled={isProcessing}
              className="btn-amazon-primary w-full py-2.5 text-sm font-normal shadow-sm mb-3 cursor-pointer"
            >
              {isProcessing ? 'Placing your order...' : 'Place your order and pay'}
            </button>
            <p className="text-[11px] text-[#565959] text-center mb-4 leading-tight">
              By placing your order, you agree to Amazon's{' '}
              <a href="#" className="text-[#007185] hover:underline">conditions of use</a> and{' '}
              <a href="#" className="text-[#007185] hover:underline">privacy notice</a>.
            </p>

            <div className="border-t border-[#e7e7e7] pt-3 space-y-2 text-xs">
              <h3 className="font-bold text-sm text-[#0f1111]">Order Summary</h3>
              <div className="flex justify-between text-[#565959]">
                <span>Items:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#565959]">
                <span>Delivery:</span>
                <span>{delivery === 0 ? <span className="text-[#007600] font-medium">FREE</span> : formatPrice(delivery)}</span>
              </div>
              <div className="border-t border-[#e7e7e7] pt-2 flex justify-between text-base font-bold text-[#cc0c39]">
                <span>Order Total:</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="border-t border-[#e7e7e7] mt-4 pt-3 text-[11px] text-[#565959] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#007600] shrink-0" />
              <span>Safe and Secure Payments. 100% Authentic products guaranteed.</span>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
