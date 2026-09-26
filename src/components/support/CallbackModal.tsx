import { useState } from 'react';
import { X, Phone, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CallbackModal({ isOpen, onClose }: Props) {
  const [phone, setPhone] = useState('+91 98765 43210');
  const [slot, setSlot] = useState('Within 15 minutes');
  const [topic, setTopic] = useState('Order Tracking');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // keep success visible
    }, 200);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden z-10 border border-slate-200 animate-in zoom-in-95 duration-200 p-6 sm:p-7 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Request a Call Back</h3>
              <p className="text-[11px] text-slate-400">We'll connect you with an expert</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-3 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Call Back Scheduled!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Our support specialist will call you at <strong className="text-slate-800">{phone}</strong> during the requested window: <strong className="text-emerald-700">{slot}</strong>.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="btn-sage px-6 py-2 rounded-xl text-xs font-semibold mx-auto"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
            <div>
              <label className="block mb-1.5">Phone Number *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="input"
              />
            </div>

            <div>
              <label className="block mb-1.5">Preferred Time Window</label>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="input cursor-pointer"
              >
                <option value="Within 15 minutes">Within 15 minutes (Fastest)</option>
                <option value="Today: 2:00 PM - 4:00 PM">Today: 2:00 PM - 4:00 PM</option>
                <option value="Today: 5:00 PM - 7:00 PM">Today: 5:00 PM - 7:00 PM</option>
                <option value="Tomorrow: 10:00 AM - 1:00 PM">Tomorrow: 10:00 AM - 1:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block mb-1.5">What is this regarding?</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="input cursor-pointer"
              >
                <option value="Order Tracking">Order Tracking & Delivery</option>
                <option value="Returns & Refunds">Returns, Exchange & Refunds</option>
                <option value="Product Inquiries">Product Specifications / Warranty</option>
                <option value="Payment Issue">Payment / Billing Issue</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn-sage py-3 rounded-xl font-bold text-xs shadow-sm hover:shadow"
              >
                Confirm Call Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
