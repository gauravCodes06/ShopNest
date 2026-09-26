import { X, ShieldCheck, FileText, Briefcase, Info } from 'lucide-react';
import { ShopNestLogo } from '../ui/ShopNestLogo';

export type PolicyType = 'about' | 'privacy' | 'terms' | 'careers' | 'security' | null;

interface Props {
  type: PolicyType;
  onClose: () => void;
}

export function PolicyModal({ type, onClose }: Props) {
  if (!type) return null;

  const contentMap: Record<NonNullable<PolicyType>, { title: string; icon: any; body: React.ReactNode }> = {
    about: {
      title: 'About ShopNest',
      icon: Info,
      body: (
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            <strong>ShopNest</strong> is India’s premier modern shopping ecosystem built to deliver an elevated, hassle-free online retail experience.
          </p>
          <p>
            We curate genuine, high-quality products across electronics, fashion, home essentials, beauty, and fitness, with direct manufacturer warranties and nationwide express logistics.
          </p>
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800">
            <strong>Our Mission:</strong> Transparent pricing, zero knockoffs, and real-time reliability powered by modern cloud technology.
          </div>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy Policy & Data Security',
      icon: ShieldCheck,
      body: (
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            At ShopNest, your privacy and data security are our top priorities. We do not sell your personal information or browsing history to third-party data brokers.
          </p>
          <ul className="list-disc pl-4 space-y-1 text-slate-700">
            <li>End-to-end 256-bit encryption for payment and checkout credentials.</li>
            <li>No storage of raw CVVs or banking passwords on our servers.</li>
            <li>Full user rights to download, update, or purge account data at any time.</li>
          </ul>
        </div>
      ),
    },
    terms: {
      title: 'Terms of Service',
      icon: FileText,
      body: (
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            By using ShopNest, you agree to our standard terms of service. All purchases come with our 7-day return guarantee for items in their original condition and packaging.
          </p>
          <p>
            Product descriptions and specifications are provided in good faith from certified manufacturers. Delivery timelines represent standard business day estimates.
          </p>
        </div>
      ),
    },
    careers: {
      title: 'Careers at ShopNest',
      icon: Briefcase,
      body: (
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            We are always looking for passionate engineers, product designers, supply chain specialists, and customer champions!
          </p>
          <div className="space-y-2 pt-1">
            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Frontend Engineer (React / TypeScript)</p>
                <p className="text-[10px] text-slate-400">Bengaluru / Remote • Full-time</p>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Apply</span>
            </div>
            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Supply Chain & Logistics Specialist</p>
                <p className="text-[10px] text-slate-400">Mumbai • Full-time</p>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Apply</span>
            </div>
          </div>
        </div>
      ),
    },
    security: {
      title: 'Security Safeguards',
      icon: ShieldCheck,
      body: (
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            ShopNest is built on enterprise-grade cloud infrastructure with continuous monitoring, firewalls, and fraud prevention algorithms.
          </p>
          <p>
            Our Realtime Database and session handlers ensure protected state across your desktop, tablet, and mobile devices.
          </p>
        </div>
      ),
    },
  };

  const current = contentMap[type];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden z-10 border border-slate-200 animate-in zoom-in-95 duration-200 p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">{current.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-2">
          {current.body}
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-sage px-5 py-2 rounded-xl text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
