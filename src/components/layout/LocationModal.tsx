import { useState } from 'react';
import { X, MapPin } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onSelectLocation: (loc: string) => void;
}

export function LocationModal({ isOpen, onClose, currentLocation, onSelectLocation }: Props) {
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const popularCities = [
    { city: 'Mumbai', pincode: '400001' },
    { city: 'Bengaluru', pincode: '560001' },
    { city: 'Delhi', pincode: '110001' },
    { city: 'Hyderabad', pincode: '500001' },
    { city: 'Chennai', pincode: '600001' },
    { city: 'Pune', pincode: '411001' },
    { city: 'Kolkata', pincode: '700001' },
    { city: 'Ahmedabad', pincode: '380001' },
  ];

  const handleApplyPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setError('Please enter a valid 6-digit PIN code');
      return;
    }
    setError('');
    onSelectLocation(`PIN ${pincode.trim()}`);
    onClose();
  };

  const handleSelectCity = (c: { city: string; pincode: string }) => {
    onSelectLocation(`${c.city} ${c.pincode}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden z-10 border border-slate-200/90 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Choose delivery location</h2>
              <p className="text-[11px] text-slate-400">Current: {currentLocation}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          {/* PIN code form */}
          <form onSubmit={handleApplyPincode} className="space-y-2">
            <label className="block font-bold text-slate-700">Enter a 6-digit Indian PIN code</label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="e.g. 560001"
                className="input flex-1"
              />
              <button
                type="submit"
                className="btn-sage px-5 py-2.5 rounded-xl font-semibold shadow-xs"
              >
                Apply
              </button>
            </div>
            {error && <p className="text-rose-500 text-[11px] font-medium">{error}</p>}
          </form>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] text-slate-400 absolute">or select a major city</span>
          </div>

          {/* Quick city buttons */}
          <div className="grid grid-cols-2 gap-2">
            {popularCities.map((c) => (
              <button
                key={c.city}
                onClick={() => handleSelectCity(c)}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-colors cursor-pointer group"
              >
                <p className="font-semibold text-slate-800 group-hover:text-emerald-700">{c.city}</p>
                <p className="text-[10px] text-slate-400">{c.pincode}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
