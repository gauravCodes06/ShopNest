import { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';
import { useTheme, ThemePalette } from '../../context/ThemeContext';

const THEMES: {
  id: ThemePalette;
  name: string;
  buttonColorName: string;
  badgeBg: string;
  swatch: string;
  btnPreview: string;
  desc: string;
}[] = [
  {
    id: 'sage',
    name: 'Sage Green',
    buttonColorName: 'Golden Yellow',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    swatch: 'bg-[#059669]',
    btnPreview: 'bg-[#FFD814] text-slate-900 border border-[#D5A900]',
    desc: 'Classic Golden Yellow Buttons',
  },
  {
    id: 'cream',
    name: 'Cream White',
    buttonColorName: 'Luxury Black',
    badgeBg: 'bg-slate-900 text-white border-slate-700',
    swatch: 'bg-[#E7E5E4] border border-stone-300',
    btnPreview: 'bg-[#18181B] text-white border border-slate-700',
    desc: 'Sleek Minimal Black Buttons',
  },
  {
    id: 'orange',
    name: 'Warm Orange',
    buttonColorName: 'Vibrant Orange',
    badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
    swatch: 'bg-[#F97316]',
    btnPreview: 'bg-[#F97316] text-white border border-[#EA580C]',
    desc: 'Energetic Orange Buttons',
  },
  {
    id: 'navy',
    name: 'Midnight Navy',
    buttonColorName: 'Radiant Amber',
    badgeBg: 'bg-indigo-900 text-amber-300 border-indigo-700',
    swatch: 'bg-[#0F172A]',
    btnPreview: 'bg-[#FBBF24] text-slate-900 border border-[#F59E0B]',
    desc: 'Dark Mode Amber Gold Buttons',
  },
];

export function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors text-xs font-semibold cursor-pointer border border-slate-200/60 shadow-2xs"
        title="Toggle Theme & Button Colors"
      >
        <span className={`w-3.5 h-3.5 rounded-full ${current.swatch} border border-white shadow-2xs shrink-0`} />
        <span className="hidden sm:inline font-bold text-slate-800 text-xs">
          {current.name}
        </span>
        <span className={`hidden md:inline text-[10px] font-extrabold px-1.5 py-0.5 rounded-md border ${current.badgeBg}`}>
          {current.buttonColorName}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <Palette className="w-3.5 h-3.5 text-emerald-600" />
              <span>THEME & BUTTON COLOR</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Uniform across all</span>
          </div>

          <div className="p-2 space-y-1">
            {THEMES.map((item) => {
              const isSelected = theme === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setTheme(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-100 font-bold border border-slate-300/80 shadow-2xs'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-4 h-4 rounded-full ${item.swatch} border border-slate-300 shadow-2xs shrink-0`} />
                    <div>
                      <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        {item.name}
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />}
                      </p>
                      <p className="text-[11px] text-slate-400 font-normal">{item.desc}</p>
                    </div>
                  </div>

                  {/* Button Color Preview Pill */}
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold shadow-2xs shrink-0 ${item.btnPreview}`}>
                    Cart Btn
                  </span>
                </button>
              );
            })}
          </div>

          <div className="px-3.5 pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
            <span>All "Add to Cart" buttons stay 100% uniform for active theme.</span>
          </div>
        </div>
      )}
    </div>
  );
}
