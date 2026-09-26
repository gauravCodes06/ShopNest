import { ShieldCheck, Smartphone, Zap, Lock, Check, Palette } from 'lucide-react';
import { ShopNestLogo } from '../ui/ShopNestLogo';
import { useTheme, ThemePalette } from '../../context/ThemeContext';

export function BrandFeatureBanner() {
  const { theme, setTheme } = useTheme();

  const colors: { id: ThemePalette; name: string; btnColor: string; swatch: string; ring: string }[] = [
    { id: 'sage',   name: 'Sage Green',    btnColor: 'Yellow Buttons', swatch: 'bg-[#059669] border-emerald-700',  ring: 'ring-emerald-600' },
    { id: 'cream',  name: 'Cream White',   btnColor: 'Black Buttons',  swatch: 'bg-[#E7E5E4] border-stone-300',    ring: 'ring-stone-400' },
    { id: 'orange', name: 'Warm Orange',   btnColor: 'Orange Buttons', swatch: 'bg-[#F97316] border-orange-600',   ring: 'ring-orange-500' },
    { id: 'navy',   name: 'Midnight Navy', btnColor: 'Amber Buttons',  swatch: 'bg-[#0B1222] border-slate-700',    ring: 'ring-slate-900' },
  ];

  const features = [
    {
      icon: ShieldCheck,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50 border-emerald-100',
      title: 'Secure Shopping',
      desc: '256-bit SSL encryption on all transactions',
    },
    {
      icon: Smartphone,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50 border-blue-100',
      title: 'Fully Responsive',
      desc: 'Optimised for mobile, tablet & desktop',
    },
    {
      icon: Zap,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50 border-amber-100',
      title: 'Lightning Fast',
      desc: 'Sub-second page loads & instant search',
    },
    {
      icon: Lock,
      iconColor: 'text-violet-600',
      iconBg: 'bg-violet-50 border-violet-100',
      title: 'Privacy First',
      desc: 'Your data is never shared or sold',
    },
  ];

  return (
    <div className="rounded-3xl bg-white border border-slate-200/70 overflow-hidden"
         style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04)' }}>

      {/* ── Top row ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 px-7 pt-7 pb-6 border-b border-slate-100/80">
        {/* Brand */}
        <div className="space-y-0.5">
          <ShopNestLogo size="md" />
          <p className="text-[11px] text-slate-400 font-medium pl-0.5 tracking-wide">
            Discover More. Shop Smarter.
          </p>
        </div>

        {/* Theme Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <Palette className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
              Theme & Cart Color
            </span>
          </div>
          {colors.map((c) => {
            const selected = theme === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setTheme(c.id)}
                title={`Switch to ${c.name} (${c.btnColor})`}
                className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-150 cursor-pointer border ${
                  selected
                    ? 'border-slate-900/20 bg-slate-50 text-slate-800 shadow-[0_0_0_2px_rgba(0,0,0,0.08)]'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className={`w-3 h-3 rounded-full border ${c.swatch} ${selected ? `ring-2 ${c.ring} ring-offset-1` : ''} transition-all shrink-0`} />
                <span>{c.name}</span>
                <span className="text-[9px] px-1.5 py-0.5 bg-slate-200/70 rounded-md text-slate-600 font-bold hidden sm:inline">{c.btnColor}</span>
                {selected && <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Bottom feature strip ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-4 px-7 py-5 group hover:bg-slate-50/60 transition-colors duration-150"
            >
              <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 ${feat.iconBg}`}>
                <Icon className={`w-5 h-5 ${feat.iconColor}`} />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-800 leading-tight tracking-tight">
                  {feat.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                  {feat.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
