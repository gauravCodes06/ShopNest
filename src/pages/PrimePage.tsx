import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Film, Sparkles, CreditCard, Gift, ShieldCheck, Check, Zap, X, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function PrimePage() {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual');
  const [isActivating, setIsActivating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [membershipActive, setMembershipActive] = useState(() => {
    return localStorage.getItem('shopnest_plus_active') === 'true';
  });

  const handleStartTrial = () => {
    setShowModal(true);
  };

  const handleConfirmActivation = () => {
    setIsActivating(true);
    setTimeout(() => {
      setIsActivating(false);
      setMembershipActive(true);
      localStorage.setItem('shopnest_plus_active', 'true');
    }, 800);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16">
      {/* Prime / NestClub Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white py-16 px-6">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-400">
              <Zap className="w-3.5 h-3.5" />
              <span>{t('shopnestPlusMember', 'ShopNest Plus Member')}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {t('unlimitedFreeDelivery', 'Unlimited FREE Fast Delivery & Exclusive Member Discounts')}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t('joinShopNestPlus', 'Join ShopNest Plus. Enjoy zero delivery charges on all orders, early access to flash sales, extended 14-day returns, and special member-only prices.')}
            </p>
            <div className="pt-2">
              {membershipActive ? (
                <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-xl">
                  <Check className="w-5 h-5 stroke-[3]" /> You are an Active ShopNest Plus Member!
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleStartTrial}
                  className="btn-sage px-8 py-3.5 text-sm font-bold shadow-xl cursor-pointer"
                >
                  {t('startFreeTrial', 'Start your 30-day FREE Trial')}
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              Only ₹999/year or ₹149/month after free trial. Cancel anytime.
            </p>
          </div>

          {/* Membership Plans Selector */}
          <div className="w-full md:w-84 bg-white text-slate-900 p-6 rounded-3xl shadow-2xl space-y-3.5 text-xs border border-slate-200">
            <h3 className="font-bold text-base text-slate-900">Membership Plans</h3>

            {/* Annual Plan Option */}
            <div
              onClick={() => setSelectedPlan('annual')}
              className={`p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                selectedPlan === 'annual'
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-500/10'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-center font-bold text-sm">
                <span className="flex items-center gap-1.5">
                  <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'annual' ? 'border-emerald-600' : 'border-slate-400'}`}>
                    {selectedPlan === 'annual' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                  </span>
                  <span>{t('annualPlan', 'Annual Plan')}</span>
                </span>
                <span className="text-emerald-700">₹999/yr</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 pl-5">{t('bestValueSave', 'Best value • Save ₹789 every year')}</p>
            </div>

            {/* Monthly Plan Option */}
            <div
              onClick={() => setSelectedPlan('monthly')}
              className={`p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                selectedPlan === 'monthly'
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-500/10'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-center font-bold text-sm">
                <span className="flex items-center gap-1.5">
                  <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'monthly' ? 'border-emerald-600' : 'border-slate-400'}`}>
                    {selectedPlan === 'monthly' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                  </span>
                  <span>{t('monthlyPlan', 'Monthly Plan')}</span>
                </span>
                <span>₹149/mo</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 pl-5">{t('flexibleBilling', 'Flexible monthly billing')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Perks Grid */}
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center">
          Everything Included with ShopNest Plus
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">FREE Next-Day Delivery</h3>
            <p className="text-xs text-slate-500">Zero shipping fees on millions of items nationwide.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Early Access Deals</h3>
            <p className="text-xs text-slate-500">Shop limited-time flash deals 24 hours before everyone else.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Extended 14-Day Returns</h3>
            <p className="text-xs text-slate-500">Double the return period with instant refund processing.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Surprise Member Rewards</h3>
            <p className="text-xs text-slate-500">Earn cashback coupons and seasonal festive reward boxes.</p>
          </div>
        </div>
      </div>

      {/* ── Activation Confirmation Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-base">Activate Plus Membership</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {membershipActive ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-lg text-slate-900">Membership Active!</h4>
                <p className="text-xs text-slate-500">
                  Congratulations! You now get free express delivery on all orders.
                </p>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-sage w-full py-3 rounded-xl font-bold text-xs"
                >
                  Start Shopping with Plus
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center font-bold text-slate-800 text-sm">
                    <span>{selectedPlan === 'annual' ? 'Annual Plan (12 Months)' : 'Monthly Plan (30 Days)'}</span>
                    <span className="text-emerald-700">{selectedPlan === 'annual' ? '₹999' : '₹149'}</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">First 30 days are 100% FREE. Auto-renews unless cancelled.</p>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-slate-800">Payment Option for Trial</p>
                  <label className="flex items-center justify-between p-3 rounded-xl border border-emerald-500 bg-emerald-50/50 cursor-pointer">
                    <span className="font-bold text-slate-800">ShopNest Pay Balance / UPI (Instant)</span>
                    <input type="radio" checked readOnly className="accent-emerald-600" />
                  </label>
                </div>

                <button
                  type="button"
                  disabled={isActivating}
                  onClick={handleConfirmActivation}
                  className="btn-sage w-full py-3.5 rounded-xl font-bold text-xs shadow-md cursor-pointer"
                >
                  {isActivating ? 'Activating 30-Day Free Trial...' : 'Confirm & Start 30-Day Free Trial'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
