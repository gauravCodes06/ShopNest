import { useLocation, useParams, Link } from 'react-router-dom';
import { loadOrders } from '../lib/storage';
import { formatPrice } from '../lib/utils';
import type { Order } from '../types/product';
import { CheckCircle, Truck, Package, ArrowRight, Home } from 'lucide-react';

export function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const stateData = location.state as {
    orderId?: string;
    name?: string;
    address?: string;
    total?: number;
    paymentMethod?: string;
    items?: any[];
  } | undefined;

  const orderId = stateData?.orderId || id || '408-7291834-1928374';
  const total = stateData?.total || 4999;
  const items = stateData?.items || [];
  const address = stateData?.address || 'Flat 402, Sea Green Apartments, Bandra West, Mumbai, Maharashtra - 400050';

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      {/* ── Order Placed Amazon Green Banner ─────────────────────────────── */}
      <div className="bg-white p-6 rounded-[4px] border border-[#d5d9d9] shadow-sm mb-6">
        <div className="flex items-start gap-4">
          <CheckCircle className="w-8 h-8 text-[#007600] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-[#007600]">
              Order placed, thank you!
            </h1>
            <p className="text-sm text-[#0f1111]">
              Confirmation will be sent to your email address.
            </p>
            <p className="text-xs text-[#565959]">
              Order <span className="font-bold text-[#0f1111]">#{orderId}</span>
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#e7e7e7] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <p className="font-bold text-[#0f1111] mb-1">Shipping to:</p>
            <p className="text-[#565959] leading-relaxed">{address}</p>
          </div>
          <div>
            <p className="font-bold text-[#0f1111] mb-1">Guaranteed Delivery:</p>
            <p className="text-[#007600] font-bold flex items-center gap-1">
              <Truck className="w-4 h-4" /> Tomorrow by 11:00 AM
            </p>
          </div>
          <div>
            <p className="font-bold text-[#0f1111] mb-1">Order Total:</p>
            <p className="text-base font-bold text-[#cc0c39]">{formatPrice(total / 80)}</p>
          </div>
        </div>
      </div>

      {/* ── Ordered Items Card ───────────────────────────────────────────── */}
      {items.length > 0 && (
        <div className="bg-white p-6 rounded-[4px] border border-[#d5d9d9] shadow-sm mb-6">
          <h2 className="text-base font-bold text-[#0f1111] mb-4">Items in this delivery</h2>
          <div className="divide-y divide-[#e7e7e7]">
            {items.map((item, i) => (
              <div key={i} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded" />
                  <div>
                    <p className="text-sm font-medium text-[#0f1111] hover:text-[#c7511f] cursor-pointer">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#565959]">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-[#0f1111]">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Action Buttons ────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-4">
        <Link to="/orders" className="btn-amazon-primary px-6 py-2 text-sm font-medium">
          View or manage your orders
        </Link>
        <Link to="/" className="btn-amazon-white px-6 py-2 text-sm font-medium">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
