import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShopNestLogo } from '../ui/ShopNestLogo';
import { X, Mail, Lock, User, Phone, CheckCircle, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMode, openAuthModal, signIn, signUp } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync mode with context state when opening
  if (authModalMode !== mode && isAuthModalOpen) {
    setMode(authModalMode);
  }

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signin') {
      if (!email.trim() || !password.trim()) {
        setError('Please enter both email and password.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        signIn(email);
      }, 600);
    } else {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError('Please fill in all required fields.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        signUp(name, email, phone);
      }, 600);
    }
  };

  const handleQuickDemoLogin = (demoName: string, demoEmail: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      signIn(demoEmail, demoName);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={closeAuthModal}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden z-10 border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-slate-50/80 px-6 py-5 flex items-center justify-between border-b border-slate-100">
          <ShopNestLogo size="sm" />
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 text-xs font-bold text-center">
          <button
            onClick={() => {
              setMode('signin');
              setError('');
            }}
            className={`flex-1 py-3 transition-colors cursor-pointer ${
              mode === 'signin'
                ? 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50/30 font-extrabold'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setMode('signup');
              setError('');
            }}
            className={`flex-1 py-3 transition-colors cursor-pointer ${
              mode === 'signup'
                ? 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50/30 font-extrabold'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-semibold text-slate-700">
            {mode === 'signup' && (
              <div>
                <label className="block mb-1">Your Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First and last name"
                    className="input pl-9"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block mb-1">Email or Phone Number *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="input pl-9"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block mb-1">Mobile Number (Optional)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="input pl-9"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label>Password *</label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to demo email!')}
                    className="text-[11px] text-emerald-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : 'Enter password'}
                  className="input pl-9"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-sage py-3 rounded-xl font-bold text-sm shadow-sm hover:shadow mt-2"
            >
              {isLoading ? (
                <span>Please wait...</span>
              ) : mode === 'signin' ? (
                <span>Sign In to ShopNest</span>
              ) : (
                <span>Create Your Account</span>
              )}
            </button>
          </form>

          {/* Quick Demo Login Pill */}
          <div className="pt-2">
            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-slate-100 w-full" />
              <span className="bg-white px-2.5 text-[11px] text-slate-400 absolute">or instant access</span>
            </div>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('Gaurav Mali', 'gaurav.mali@example.com')}
              className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-xl text-xs font-bold text-emerald-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-emerald-600 fill-emerald-500" />
              <span>1-Click Sign In as Gaurav Mali (Demo)</span>
            </button>
          </div>

          <div className="pt-2 text-center text-[11px] text-slate-400">
            <span>By continuing, you agree to ShopNest's </span>
            <a href="/customer-service" className="text-emerald-600 hover:underline">Conditions of Use</a>
            <span> and </span>
            <a href="/customer-service" className="text-emerald-600 hover:underline">Privacy Notice</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
