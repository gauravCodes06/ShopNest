import { useState } from 'react';
import { Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function LanguageDropdown({ isOpen, onClose }: Props) {
  const [selectedLang, setSelectedLang] = useState('EN');

  if (!isOpen) return null;

  const languages = [
    { code: 'EN', name: 'English', native: 'EN' },
    { code: 'HI', name: 'हिन्दी', native: 'HI' },
    { code: 'TA', name: 'தமிழ்', native: 'TA' },
    { code: 'TE', name: 'తెలుగు', native: 'TE' },
    { code: 'KN', name: 'ಕನ್ನಡ', native: 'KN' },
    { code: 'ML', name: 'മലയാളം', native: 'ML' },
    { code: 'BN', name: 'বাংলা', native: 'BN' },
    { code: 'MR', name: 'मराठी', native: 'MR' },
  ];

  return (
    <div
      onMouseLeave={onClose}
      className="absolute right-0 top-full mt-1 w-64 bg-white rounded-[4px] shadow-2xl border border-[#d5d9d9] p-4 text-[#0f1111] z-50 animate-in fade-in zoom-in-95 duration-150 text-xs"
    >
      <div className="border-b border-[#e7e7e7] pb-3 mb-3">
        <h4 className="font-bold text-xs text-[#0f1111] mb-2">Change language</h4>
        <div className="space-y-2">
          {languages.map((l) => (
            <label
              key={l.code}
              onClick={() => setSelectedLang(l.code)}
              className="flex items-center justify-between cursor-pointer hover:text-[#c7511f] group py-0.5"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="lang"
                  checked={selectedLang === l.code}
                  onChange={() => setSelectedLang(l.code)}
                  className="text-[#e77600] focus:ring-[#e77600]"
                />
                <span className={selectedLang === l.code ? 'font-bold' : ''}>
                  {l.name} - {l.native}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-bold text-xs text-[#0f1111] mb-1">Currency Settings</h4>
        <p className="text-[11px] text-[#565959]">₹ - INR - Indian Rupee (Default)</p>
      </div>
    </div>
  );
}
