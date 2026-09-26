import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, TrendingUp, Users, ShieldCheck, Truck, Check, HelpCircle, ArrowRight, Store, Package, Sparkles, X } from 'lucide-react';
import { ShopNestLogo } from '../components/ui/ShopNestLogo';
import { useLanguage } from '../context/LanguageContext';

export function SellPage() {
  const { t } = useLanguage();
  const [businessName, setBusinessName] = useState('Apex Retail Enterprises');
  const [email, setEmail] = useState('');
  const [gstin, setGstin] = useState('22AAAAA0000A1Z5');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [category, setCategory] = useState('Electronics & Gadgets');
  const [registered, setRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sellerModalOpen, setSellerModalOpen] = useState(false);
  const [sellerId, setSellerId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !email || !gstin) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `SELLER-IN-${Math.floor(100000 + Math.random() * 900000)}`;
      setSellerId(generatedId);
      setRegistered(true);
      setSellerModalOpen(true);
    }, 700);
  };

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#eaeded] min-h-screen pb-16">
      {/* Hero Banner */}
      <div className="bg-[#232f3e] text-white py-16 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <span className="bg-[#febd69] text-[#131921] text-xs font-bold px-2.5 py-1 rounded-[2px]">
              {t('becomeSeller', 'BECOME A SHOPNEST SELLER')}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {t('sellOnAmazon', 'Sell on ShopNest — Reach Crores of Customers')}
            </h1>
            <p className="text-sm text-gray-300 leading-relaxed">
              {t('sellSubtitle', "Launch your business on India's most visited shopping destination with 0% fee on select categories for the first 30 days.")}
            </p>
            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={scrollToRegister}
                className="bg-[#008a00] hover:bg-[#007000] text-white px-8 py-3 rounded-md text-sm font-bold cursor-pointer transition-colors shadow-sm"
              >
                {t('startSellingToday', 'Start Selling Today')}
              </button>
            </div>
          </div>

          {/* Quick Registration Form */}
          <div id="register" className="bg-white text-[#0f1111] p-6 rounded-xl shadow-2xl max-w-sm w-full border border-gray-200">
            {registered ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-green-100 text-[#007600] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="font-bold text-lg text-[#007600]">Seller Account Active!</h3>
                <p className="text-xs text-[#565959]">
                  Welcome aboard, <span className="font-bold">{businessName}</span>. Your Seller ID is <span className="font-mono font-bold text-slate-800">{sellerId}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setSellerModalOpen(true)}
                  className="bg-[#008a00] hover:bg-[#007000] text-white w-full py-2.5 rounded-md font-bold text-xs mt-2 transition-colors cursor-pointer"
                >
                  Open Seller Central
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <h3 className="text-base font-bold text-[#0f1111]">{t('registerYourBusiness', 'Register your business')}</h3>
                <p className="text-gray-500 text-[11px]">{t('registerSubtitle', 'All you need is a phone number, bank account, and GSTIN.')}</p>
                <div>
                  <label className="block font-bold mb-1">{t('businessName', 'Business / Company Name')}</label>
                  <input
                    required
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Retail Enterprises"
                    className="input text-xs py-2 focus:border-[#008a00] focus:ring-1 focus:ring-[#008a00] rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{t('emailAddress', 'Email address')}</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="input text-xs py-2 focus:border-[#008a00] focus:ring-1 focus:ring-[#008a00] rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{t('gstinNumber', 'GSTIN Number')}</label>
                  <input
                    required
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="22AAAAA0000A1Z5"
                    className="input text-xs py-2 uppercase font-mono focus:border-[#008a00] focus:ring-1 focus:ring-[#008a00] rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{t('primaryCategory', 'Primary Category')}</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input text-xs py-2 cursor-pointer focus:border-[#008a00] focus:ring-1 focus:ring-[#008a00] rounded-md"
                  >
                    <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#008a00] hover:bg-[#007000] text-white w-full py-2.5 rounded-md font-bold text-sm mt-2 cursor-pointer shadow-sm transition-colors"
                >
                  {isSubmitting ? 'Registering Business...' : t('continueToSellerCentral', 'Continue to Seller Central')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Why Sell on ShopNest Grid */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center text-[#0f1111] mb-10">
          Why sell on ShopNest?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[8px] border border-[#d5d9d9] shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#fff9f3] text-[#e77600] flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0f1111]">14+ Crore Customers</h3>
            <p className="text-xs text-[#565959] leading-relaxed">
              Deliver to 100% of serviceable pincodes in India with ShopNest's unmatched nationwide customer reach.
            </p>
          </div>

          <div className="bg-white p-6 rounded-[8px] border border-[#d5d9d9] shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#fff9f3] text-[#e77600] flex items-center justify-center mb-3">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0f1111]">Fulfilment by ShopNest (FBS)</h3>
            <p className="text-xs text-[#565959] leading-relaxed">
              Store your inventory in ShopNest fulfilment centres. We pick, pack, deliver, and provide customer support for your products.
            </p>
          </div>

          <div className="bg-white p-6 rounded-[8px] border border-[#d5d9d9] shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#fff9f3] text-[#e77600] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0f1111]">Timely & Secure Payments</h3>
            <p className="text-xs text-[#565959] leading-relaxed">
              Funds are safely deposited directly into your bank account every 7 days, including for Cash on Delivery orders.
            </p>
          </div>
        </div>
      </div>

      {/* ── Seller Central Modal ── */}
      {sellerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-base">Seller Central Portal</h3>
              </div>
              <button
                type="button"
                onClick={() => setSellerModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="font-extrabold text-sm text-emerald-950">Welcome, {businessName}!</p>
                <p className="text-xs text-emerald-700">Seller ID: <span className="font-mono font-bold">{sellerId}</span> • 0% Fee Promo Active</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400">Total Listings</span>
                <p className="text-base font-extrabold text-slate-900">0 Active</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400">Orders Pending</span>
                <p className="text-base font-extrabold text-slate-900">0 Units</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Link
                to="/search?q=deal"
                onClick={() => setSellerModalOpen(false)}
                className="btn-sage w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <Package className="w-4 h-4" />
                <span>Explore Marketplace & Benchmark Prices</span>
              </Link>
              <button
                type="button"
                onClick={() => setSellerModalOpen(false)}
                className="btn-outline w-full py-2.5 rounded-xl font-bold text-xs"
              >
                Close Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
