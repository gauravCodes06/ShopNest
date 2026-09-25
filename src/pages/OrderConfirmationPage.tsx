import { useLocation, useParams, Link } from 'react-router-dom';
import { loadOrders } from '../lib/storage';
import { getProductById } from '../data/products';
import { formatPrice } from '../lib/utils';
import type { Order } from '../types/product';
import { CheckCircle2, Package, Truck, ArrowRight, Home } from 'lucide-react';

export function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  // Try retrieving order from navigation state or fallback to localStorage
  const stateOrder = location.state?.order as Order | undefined;
  const order: Order | undefined =
    stateOrder || loadOrders().find((o) => o.id === id);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">Order Not Found</h2>
        <p className="text-slate-400 mb-8">We could not find records for order #{id}.</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          Return Home <Home className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Delivery date estimate (+3 days)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Success banner */}
      <div className="card p-8 text-center relative overflow-hidden mb-8 border-teal-500/30 bg-gradient-to-b from-teal-500/10 via-slate-900 to-slate-900">
        <div className="w-16 h-16 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-500/40">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="badge mb-2">Order Confirmed (Demo)</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Thank you for your order!</h1>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          We’ve received your order. A confirmation email has been dispatched to{' '}
          <span className="text-teal-400 font-semibold">{order.shippingAddress.email}</span>.
        </p>

        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-6 bg-slate-950/60 border border-slate-800 rounded-xl px-6 py-3 text-xs">
          <div>
            <span className="text-slate-500 block">Order Number</span>
            <span className="font-mono font-bold text-slate-200">{order.id}</span>
          </div>
          <div className="w-px h-6 bg-slate-800 hidden sm:block" />
          <div>
            <span className="text-slate-500 block">Estimated Delivery</span>
            <span className="font-bold text-teal-400 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> {formattedDelivery}
            </span>
          </div>
          <div className="w-px h-6 bg-slate-800 hidden sm:block" />
          <div>
            <span className="text-slate-500 block">Total Amount</span>
            <span className="font-extrabold text-white">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Shipping details */}
        <div className="card p-5 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Shipping Destination
          </h3>
          <p className="text-sm font-semibold text-white">{order.shippingAddress.fullName}</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            {order.shippingAddress.address}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            <br />
            {order.shippingAddress.country}
          </p>
        </div>

        {/* Shipping Method */}
        <div className="card p-5 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Delivery Method
          </h3>
          <p className="text-sm font-semibold text-white">Standard Express Shipping</p>
          <p className="text-xs text-slate-400">
            Delivered in 2-3 business days with tracking updates sent to your email.
          </p>
        </div>

        {/* Payment Summary */}
        <div className="card p-5 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Payment Method
          </h3>
          <p className="text-sm font-semibold text-white">Demo Transaction (Simulated)</p>
          <p className="text-xs text-slate-400">
            Status: <span className="text-emerald-400 font-semibold">Completed / Paid</span>
          </p>
        </div>
      </div>

      {/* Items list */}
      <div className="card p-6 mb-8 space-y-4">
        <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Package className="w-4 h-4 text-teal-400" />
          <span>Items in this Order ({order.items.length})</span>
        </h2>

        <div className="divide-y divide-slate-800">
          {order.items.map((item) => {
            const product = getProductById(item.productId);
            if (!product) return null;
            return (
              <div key={product.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-lg object-cover bg-slate-800"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{product.name}</h4>
                    <p className="text-xs text-slate-500">
                      Qty: {item.quantity} × {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-white">
                  {formatPrice(product.price * item.quantity)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Totals */}
        <div className="pt-4 border-t border-slate-800 space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Subtotal</span>
            <span className="text-slate-200">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Shipping</span>
            <span className="text-slate-200">
              {order.shipping === 0 ? <span className="text-emerald-400">FREE</span> : formatPrice(order.shipping)}
            </span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Estimated Tax</span>
            <span className="text-slate-200">{formatPrice(order.tax)}</span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
            <span>Total Paid</span>
            <span className="text-teal-400 font-black">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Link to="/" className="btn-primary inline-flex items-center gap-2 px-8">
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link to="/orders" className="btn-secondary inline-flex items-center gap-2">
          View All Orders
        </Link>
      </div>
    </div>
  );
}
