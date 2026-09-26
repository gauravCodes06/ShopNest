import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useLanguage, LANGUAGES, LanguageCode } from '../../context/LanguageContext';

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
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

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors text-xs font-semibold cursor-pointer"
        title="Change Language"
      >
        <span className="text-xs">🇮🇳</span>
        <span className="uppercase font-bold text-slate-800 text-xs">IN • {current.code}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-4 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            SELECT LANGUAGE
          </div>
          <div className="py-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-emerald-50/60 cursor-pointer transition-colors ${
                  language === lang.code ? 'font-bold text-emerald-700 bg-emerald-50/40' : 'text-slate-700'
                }`}
              >
                <span>
                  {lang.native} <span className="text-slate-400 text-[11px]">({lang.name})</span>
                </span>
                {language === lang.code && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            ))}
          </div>
          <div className="px-3 pt-1.5 border-t border-slate-100 text-[10px] text-slate-400 text-center">
            {t('shoppingInIndia', 'You are shopping on ShopNest India')}
          </div>
        </div>
      )}
    </div>
  );
}
