import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopNestLogo } from '../ui/ShopNestLogo';
import {
  ArrowUp,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CreditCard,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Facebook,
} from 'lucide-react';
import { PolicyModal, PolicyType } from './PolicyModal';
import { useLanguage } from '../../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const TRUST_BADGES = [
    { icon: ShieldCheck, label: t('100% Secure', '100% Secure'), sub: t('SSL Encrypted', 'SSL Encrypted') },
    { icon: Truck,       label: t('Fast Delivery', 'Fast Delivery'), sub: t('Next-day available', 'Next-day available') },
    { icon: RotateCcw,   label: t('easyReturns', 'Easy Returns'), sub: t('10-day policy', '10-day policy') },
    { icon: Headphones,  label: t('24/7 Support', '24/7 Support'), sub: t('Always here for you', 'Always here for you') },
    { icon: CreditCard,  label: t('Safe Payments', 'Safe Payments'), sub: t('UPI, Card, COD', 'UPI, Card, COD') },
  ];

  const FOOTER_LINKS = [
    {
      heading: t('Shop', 'Shop'),
      links: [
        { label: t('catElectronics', 'Electronics & Gadgets'), to: '/category/Electronics' },
        { label: t('catFashion', 'Fashion & Apparel'),     to: '/category/Fashion' },
        { label: t('catHomeLiving', 'Home & Living'),         to: '/category/Home%20%26%20Kitchen' },
        { label: t('catBeauty', 'Beauty & Personal Care'),to: '/category/Beauty' },
        { label: t('catSports', 'Sports & Outdoors'),     to: '/category/Sports' },
        { label: t('todaysDeals', "Today's Deals"),        to: '/search?q=deal' },
      ],
    },
    {
      heading: t('Account', 'Account'),
      links: [
        { label: t('yourOrders', 'Your Orders'),     to: '/orders' },
        { label: t('wishlist', 'Wishlist'),        to: '/wishlist' },
        { label: t('shopnestPay', 'ShopNest Pay'),    to: '/pay' },
        { label: t('prime', 'ShopNest Prime'),  to: '/prime' },
        { label: t('sell', 'Sell on ShopNest'),to: '/sell' },
        { label: t('minitv', 'miniTV'),          to: '/minitv' },
      ],
    },
    {
      heading: t('customerService', 'Support'),
      links: [
        { label: t('helpCenter', 'Help Center'),       to: '/customer-service' },
        { label: t('Returns & Refunds', 'Returns & Refunds'), to: '/customer-service' },
        { label: t('Shipping Policy', 'Shipping Policy'),   to: '/customer-service' },
        { label: t('trackPackage', 'Track Your Order'),  to: '/orders' },
        { label: t('Report an Issue', 'Report an Issue'),   to: '/customer-service' },
      ],
    },
  ];

  const SOCIAL = [
    { icon: Twitter,   label: 'Twitter',   key: 'about' as const },
    { icon: Instagram, label: 'Instagram', key: 'about' as const },
    { icon: Facebook,  label: 'Facebook',  key: 'about' as const },
    { icon: Youtube,   label: 'YouTube',   key: 'about' as const },
    { icon: Linkedin,  label: 'LinkedIn',  key: 'careers' as const },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <footer className="bg-[#0B1222] text-slate-400 text-sm mt-16">

        {/* ── Trust Badges Strip ─────────────────────────────── */}
        <div className="border-b border-slate-800/80">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {TRUST_BADGES.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center shrink-0 group-hover:border-emerald-600/40 transition-colors">
                      <Icon className="w-4.5 h-4.5 text-emerald-500" size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-200 leading-tight">{b.label}</p>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{b.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Main Footer ────────────────────────────────────── */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-5">
              <ShopNestLogo whiteText size="md" showTagline />
              <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
                ShopNest is India's premier online marketplace — delivering curated quality products, transparent pricing, and lightning-fast doorstep delivery to 27,000+ pincodes.
              </p>

              {/* Payment icons */}
              <div>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2.5">{t('weAccept', 'We Accept')}</p>
                <div className="flex flex-wrap gap-2">
                  {['VISA', 'MC', 'UPI', 'RuPay', 'NetBanking', 'COD'].map((pm) => (
                    <span
                      key={pm}
                      className="text-[10px] font-bold text-slate-400 bg-slate-800/60 border border-slate-700/50 px-2.5 py-1 rounded-lg"
                    >
                      {pm}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social icons */}
              <div>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2.5">{t('followUs', 'Follow Us')}</p>
                <div className="flex items-center gap-2">
                  {SOCIAL.map((s) => {
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.label}
                        onClick={() => setActivePolicy(s.key)}
                        aria-label={s.label}
                        className="w-8 h-8 rounded-xl bg-slate-800/70 border border-slate-700/50 hover:border-emerald-600/50 hover:bg-slate-700/60 flex items-center justify-center text-slate-500 hover:text-emerald-400 transition-all cursor-pointer"
                      >
                        <Icon size={14} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Link columns */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {FOOTER_LINKS.map((col) => (
                <div key={col.heading}>
                  <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-widest mb-4">
                    {col.heading}
                  </h4>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.to}
                          className="text-[13px] text-slate-500 hover:text-emerald-400 transition-colors leading-tight"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ────────────────────────────────────── */}
        <div className="border-t border-slate-800/60">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-4 text-[12px] text-slate-600">
              <span>© 2026 ShopNest Technologies Pvt. Ltd. {t('allRightsReserved', 'All rights reserved')}</span>
              <span className="text-slate-800">•</span>
              <button onClick={() => setActivePolicy('privacy')} className="hover:text-slate-400 transition-colors cursor-pointer">{t('privacyPolicy', 'Privacy Policy')}</button>
              <span className="text-slate-800">•</span>
              <button onClick={() => setActivePolicy('terms')} className="hover:text-slate-400 transition-colors cursor-pointer">{t('termsOfService', 'Terms of Service')}</button>
              <span className="text-slate-800">•</span>
              <button onClick={() => setActivePolicy('security')} className="hover:text-slate-400 transition-colors cursor-pointer">{t('security', 'Security')}</button>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-500 font-bold">
                <ShieldCheck size={13} />
                {t('100% Genuine & Verified', '100% Genuine & Verified')}
              </span>
              <button
                onClick={scrollToTop}
                className="w-8 h-8 rounded-xl bg-slate-800/70 border border-slate-700/50 hover:border-emerald-600/50 hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-emerald-400 transition-all cursor-pointer"
                aria-label="Back to top"
              >
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>
      </footer>

      <PolicyModal type={activePolicy} onClose={() => setActivePolicy(null)} />
    </>
  );
}
