import { useLocation, useParams, Link } from 'react-router-dom';
import { formatPrice } from '../lib/utils';
import { CheckCircle2, Mail, Package, Home, ArrowRight, ShieldCheck } from 'lucide-react';

export function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const stateData = location.state as {
    orderId?: string;
    name?: string;
    address?: string;
    total?: number;
    deliveryMethod?: string;
    items?: any[];
  } | undefined;

  const orderId = stateData?.orderId || id || '#55202604061234';
  const name = stateData?.name || 'Gaurav';
  const total = stateData?.total || 82421;
  const items = stateData?.items || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Main Confirmed Card matching Screen 5 */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle p-8 sm:p-12 text-center space-y-6">
          {/* Big Green Circular Checkmark */}
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-1.5">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Order Confirmed!
            </h1>
            <p className="text-base font-semibold text-slate-700">
              Thank you for your purchase, {name}!
            </p>
            <p className="text-xs text-slate-500">
              Your order has been placed successfully.
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Order ID
              </p>
              <p className="text-sm font-extrabold text-slate-900 font-mono mt-0.5">
                {orderId}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Estimated Delivery
              </p>
              <p className="text-sm font-extrabold text-emerald-700 mt-0.5">
                2 - 5 business days
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/orders"
              className="w-full sm:w-auto btn-sage px-8 py-3 rounded-xl font-semibold shadow-sm hover:shadow text-sm"
            >
              View Order Details
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto btn-outline px-8 py-3 rounded-xl font-semibold text-sm"
            >
              Continue Shopping
            </Link>
          </div>

          {/* "What's Next?" 3-step Timeline matching Screen 5 */}
          <div className="pt-8 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 text-left mb-5">
              What's Next?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">1. Email confirmation</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    We'll email you the order details & invoice
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">2. Track package</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Track your order live in your account
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">3. Doorstep delivery</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Get your package safely at your doorstep
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
