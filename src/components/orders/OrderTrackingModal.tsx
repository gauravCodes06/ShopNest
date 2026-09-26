import React from 'react';
import { X, CheckCircle2, Clock, Truck, Package, MapPin, ShieldCheck, ExternalLink } from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import { ProductImage } from '../ui/ProductImage';

interface OrderTrackingModalProps {
  order: any | null;
  onClose: () => void;
}

export function OrderTrackingModal({ order, onClose }: OrderTrackingModalProps) {
  if (!order) return null;

  const orderId = order.id || order.orderId || 'SN-ORD-2026';
  const recipient = order.recipient || 'Gaurav Mali';
  const address = order.address || '123 MG Road, Bengaluru 560001, India';
  const carrier = 'ShopNest Express / BlueDart';
  const trackingNumber = `TRK${orderId.replace(/[^0-9]/g, '') || '987654321'}`;

  // Tracking timeline steps
  const steps = [
    {
      title: 'Order Confirmed',
      description: 'Seller received order & payment authorized',
      date: order.date || 'Today, 10:30 AM',
      completed: true,
      current: false,
    },
    {
      title: 'Packed & Ready for Dispatch',
      description: 'Order packed at ShopNest Fulfillment Hub, Mumbai',
      date: 'Today, 02:15 PM',
      completed: true,
      current: false,
    },
    {
      title: 'In Transit',
      description: `Dispatched via ${carrier} (AWB: ${trackingNumber})`,
      date: 'In Transit',
      completed: true,
      current: true,
    },
    {
      title: 'Out for Delivery',
      description: 'Courier agent will arrive at your doorstep',
      date: 'Expected Tomorrow by 8 PM',
      completed: false,
      current: false,
    },
    {
      title: 'Delivered',
      description: 'Delivered with OTP verification',
      date: 'Estimated in 2 days',
      completed: false,
      current: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden z-10 border border-slate-200 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-50/80 px-6 py-4 flex items-center justify-between border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">Track Package</h2>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">Order ID: {orderId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Tracking Status Pill */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-950">Shipment on Schedule</p>
                <p className="text-[11px] text-emerald-700">Expected Delivery by Tomorrow, 8:00 PM</p>
              </div>
            </div>
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 bg-white text-emerald-700 rounded-full border border-emerald-300">
              In Transit
            </span>
          </div>

          {/* Timeline Steps */}
          <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {steps.map((st, i) => (
              <div key={i} className="relative flex items-start gap-4">
                <div
                  className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                    st.completed
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : st.current
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-100'
                      : 'bg-white border-2 border-slate-300 text-slate-300'
                  }`}
                >
                  {st.completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-current" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-bold ${st.completed || st.current ? 'text-slate-900' : 'text-slate-400'}`}>
                      {st.title}
                    </p>
                    <span className="text-[10px] font-medium text-slate-400">{st.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{st.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Carrier & Delivery Info Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400">Carrier Details</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{carrier}</p>
              <p className="text-[11px] font-mono text-slate-500">Tracking: {trackingNumber}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400">Delivery Address</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{recipient}</p>
              <p className="text-[11px] text-slate-500 truncate">{address}</p>
            </div>
          </div>

          {/* Order Items Preview */}
          {order.items && order.items.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[11px] font-bold uppercase text-slate-400 mb-3">Items in this Package</p>
              <div className="space-y-2">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between gap-3 p-2 rounded-xl bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white p-1 border border-slate-200 shrink-0 flex items-center justify-center overflow-hidden">
                        <ProductImage src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="text-xs">
                        <p className="font-semibold text-slate-900 line-clamp-1">{item.name}</p>
                        <p className="text-[11px] text-slate-400">Qty: {item.quantity || 1}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900">{formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 flex items-center justify-between border-t border-slate-100 text-xs">
          <span className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified by ShopNest Express Delivery Network
          </span>
          <button
            onClick={onClose}
            className="btn-sage px-5 py-2 rounded-xl font-bold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
