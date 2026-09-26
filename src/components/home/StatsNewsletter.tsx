import { useState } from 'react';
import { Users, Package, Star, Truck, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

const STATS = [
  { icon: Users, label: 'Happy Customers', value: '2.5 Crore+', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Package, label: 'Products Listed', value: '50 Lakh+', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Star, label: 'Average Rating', value: '4.7 / 5', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Truck, label: 'Orders Delivered', value: '10 Crore+', color: 'text-violet-600', bg: 'bg-violet-50' },
];

export function StatsNewsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Stats Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-1">ShopNest by Numbers</h2>
        <p className="text-xs text-slate-500 mb-6 font-medium">India's fastest growing e-commerce destination</p>
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all"
              >
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-base font-black text-slate-900 leading-tight">{stat.value}</p>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Newsletter Card */}
      <div className="relative bg-gradient-to-br from-[#1C3D34] to-[#0D2B23] rounded-3xl p-6 sm:p-8 overflow-hidden text-white shadow-subtle">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <Mail className="w-4 h-4 text-emerald-300" />
            </div>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Newsletter</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black leading-tight mb-1">
            Deals, Drops & <br />
            <span className="text-emerald-400">Exclusive Offers</span>
          </h2>
          <p className="text-xs text-white/60 mb-6 font-medium leading-relaxed">
            Subscribe and get up to <strong className="text-white">15% off</strong> your next order, early access to flash sales, and curated picks.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <span className="hidden sm:inline">Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-white/40 font-medium">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          ) : (
            <div className="flex items-center gap-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">You're subscribed!</p>
                <p className="text-[11px] text-white/60">Check your inbox for your 15% off coupon.</p>
              </div>
            </div>
          )}

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-white/10">
            {['250K+ subscribers', 'Weekly drops', 'Member-only deals'].map((badge, i) => (
              <span key={i} className="text-[10px] font-semibold text-white/50 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
