import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wallet,
  Smartphone,
  Tv,
  Zap,
  Flame,
  Car,
  Gift,
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  PlusCircle,
  CreditCard,
  CheckCircle2,
  X,
  Receipt,
  Award,
} from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { ShopNestLogo } from '../components/ui/ShopNestLogo';
import { useLanguage } from '../context/LanguageContext';

interface QuickService {
  id: string;
  icon: any;
  label: string;
  desc: string;
  providers: string[];
  placeholder: string;
  fieldLabel: string;
  defaultAmount: number;
}

export function ShopNestPayPage() {
  const { t } = useLanguage();
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('shopnest_pay_balance');
    return saved ? parseFloat(saved) : 1250;
  });
  const [addAmount, setAddAmount] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'recharges' | 'bills' | 'rewards'>('all');

  // Interactive Bill Pay Modal state
  const [activeService, setActiveService] = useState<QuickService | null>(null);
  const [billProvider, setBillProvider] = useState('');
  const [billAccount, setBillAccount] = useState('');
  const [billAmount, setBillAmount] = useState('299');
  const [isProcessingBill, setIsProcessingBill] = useState(false);
  const [billSuccess, setBillSuccess] = useState<any | null>(null);
  const [scratchedReward, setScratchedReward] = useState<number | null>(null);

  // Transactions list
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN-908123',
      title: 'Order Payment #55202604061234',
      date: '24 Sep 2026, 04:30 PM',
      type: 'debit',
      amount: 15998,
      status: 'Success',
    },
    {
      id: 'TXN-876124',
      title: 'Super Deal Cashback Reward',
      date: '22 Sep 2026, 11:15 AM',
      type: 'credit',
      amount: 250,
      status: 'Credited',
    },
    {
      id: 'TXN-765431',
      title: 'Added Money to Wallet (UPI)',
      date: '19 Sep 2026, 02:40 PM',
      type: 'credit',
      amount: 2000,
      status: 'Completed',
    },
    {
      id: 'TXN-654320',
      title: 'Mobile Recharge (Jio 5G)',
      date: '15 Sep 2026, 08:20 AM',
      type: 'debit',
      amount: 299,
      status: 'Success',
    },
  ]);

  const handleAddMoney = (amountToAdd: number) => {
    if (!amountToAdd || amountToAdd <= 0) return;
    setIsAdding(true);
    setTimeout(() => {
      const newBal = balance + amountToAdd;
      setBalance(newBal);
      localStorage.setItem('shopnest_pay_balance', newBal.toString());
      setTransactions((prev) => [
        {
          id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
          title: 'Added Money to Wallet (Instant UPI)',
          date: 'Just now',
          type: 'credit',
          amount: amountToAdd,
          status: 'Completed',
        },
        ...prev,
      ]);
      setIsAdding(false);
      setAddAmount('');
      setSuccessMsg(`Successfully added ${formatPrice(amountToAdd)} to your ShopNest Pay Balance!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    }, 600);
  };

  const quickServices: QuickService[] = [
    {
      id: 'mobile',
      icon: Smartphone,
      label: t('mobilePrepaid', 'Mobile Prepaid'),
      desc: 'Recharge & get ₹20 back',
      providers: ['Jio 5G Prepaid', 'Airtel India', 'Vodafone Idea (Vi)', 'BSNL Mobile'],
      fieldLabel: '10-digit Mobile Number',
      placeholder: 'e.g. 9876543210',
      defaultAmount: 299,
    },
    {
      id: 'dth',
      icon: Tv,
      label: t('dthRecharge', 'DTH Recharge'),
      desc: 'Tata Play, Airtel, Sun',
      providers: ['Tata Play (Tata Sky)', 'Airtel Digital TV', 'Dish TV India', 'Sun Direct', 'D2H'],
      fieldLabel: 'Subscriber ID / Smart Card Number',
      placeholder: 'e.g. 1002938475',
      defaultAmount: 350,
    },
    {
      id: 'electricity',
      icon: Zap,
      label: t('electricityBill', 'Electricity Bill'),
      desc: 'Instant BBPS receipt',
      providers: ['BESCOM - Karnataka', 'Tata Power - Mumbai', 'Adani Electricity', 'MSEDCL - Maharashtra', 'BSES Rajdhani - Delhi'],
      fieldLabel: 'Consumer Account ID (CA Number)',
      placeholder: 'e.g. 1029384756',
      defaultAmount: 850,
    },
    {
      id: 'gas',
      icon: Flame,
      label: t('gasCylinder', 'Gas Cylinder'),
      desc: 'HP, Indane, Bharat Gas',
      providers: ['Indane Gas (Indian Oil)', 'HP Gas (Hindustan Petroleum)', 'Bharat Gas (BPCL)'],
      fieldLabel: '17-digit LPG ID / Registered Mobile',
      placeholder: 'e.g. 9876543210',
      defaultAmount: 803,
    },
    {
      id: 'fastag',
      icon: Car,
      label: t('fastagRecharge', 'FASTag Recharge'),
      desc: 'Zero convenience fee',
      providers: ['ICICI Bank FASTag', 'HDFC Bank FASTag', 'Paytm Payments Bank', 'SBI FASTag', 'Kotak FASTag'],
      fieldLabel: 'Vehicle Registration Number',
      placeholder: 'e.g. MH02AB1234',
      defaultAmount: 500,
    },
    {
      id: 'play',
      icon: Gift,
      label: t('googlePlay', 'Google Play'),
      desc: 'Instant gift codes',
      providers: ['Google Play India Recharge Code'],
      fieldLabel: 'Account Email for Digital Code',
      placeholder: 'your.email@gmail.com',
      defaultAmount: 250,
    },
  ];

  const handleOpenService = (svc: QuickService) => {
    setActiveService(svc);
    setBillProvider(svc.providers[0]);
    setBillAccount('');
    setBillAmount(svc.defaultAmount.toString());
    setBillSuccess(null);
    setScratchedReward(null);
  };

  const handlePayBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billAccount.trim() || !billAmount) return;

    const numAmt = parseFloat(billAmount);
    setIsProcessingBill(true);

    setTimeout(() => {
      const newBal = Math.max(0, balance - numAmt);
      setBalance(newBal);
      localStorage.setItem('shopnest_pay_balance', newBal.toString());

      const txnId = `BBPS-${Math.floor(10000000 + Math.random() * 90000000)}`;
      setTransactions((prev) => [
        {
          id: txnId,
          title: `${activeService?.label} (${billProvider})`,
          date: 'Just now',
          type: 'debit',
          amount: numAmt,
          status: 'Success',
        },
        ...prev,
      ]);

      setBillSuccess({
        id: txnId,
        service: activeService?.label,
        provider: billProvider,
        account: billAccount,
        amount: numAmt,
        timestamp: new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      });

      setIsProcessingBill(false);
    }, 800);
  };

  const handleScratchReward = () => {
    if (scratchedReward !== null) return;
    const won = Math.floor(15 + Math.random() * 35);
    setScratchedReward(won);
    const newBal = balance + won;
    setBalance(newBal);
    localStorage.setItem('shopnest_pay_balance', newBal.toString());
    setTransactions((prev) => [
      {
        id: `REW-${Math.floor(100000 + Math.random() * 900000)}`,
        title: `Scratch Card Cashback Reward (${activeService?.label})`,
        date: 'Just now',
        type: 'credit',
        amount: won,
        status: 'Credited',
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Page Top Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                ShopNest Pay
              </h1>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Fast & 100% Secure
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              One-click checkout, instant refunds, bill payments, and assured cashback rewards.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/orders"
              className="btn-outline px-4 py-2 rounded-xl text-xs font-semibold"
            >
              Order History
            </Link>
            <Link
              to="/customer-service"
              className="btn-sage px-4 py-2 rounded-xl text-xs font-semibold"
            >
              24/7 Pay Support
            </Link>
          </div>
        </div>

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Balance Card & Quick Add Money */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Wallet Balance Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-7 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Available Balance
              </span>
              <span className="text-xs text-slate-400">Instant UPI Sync</span>
            </div>

            <div className="relative z-10">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                {formatPrice(balance)}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Usable for 1-click checkout, recharges, and bill payments
              </p>
            </div>

            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs relative z-10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">RBI Licensed Prepaid Instrument</span>
              </div>
              <span className="font-bold text-emerald-400">Verified</span>
            </div>
          </div>

          {/* Quick Top-Up Wallet Card */}
          <div className="lg:col-span-6 bg-white p-7 rounded-3xl border border-slate-200/80 shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              Add Money to ShopNest Pay Balance
            </h3>

            <div className="flex gap-2 text-xs font-semibold">
              {[500, 1000, 2000, 5000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAddAmount(amt.toString())}
                  className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 transition-colors"
                >
                  +{formatPrice(amt)}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                  ₹
                </span>
                <input
                  type="number"
                  min="1"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  placeholder="Enter custom amount"
                  className="input pl-7 text-xs font-bold"
                />
              </div>
              <button
                type="button"
                disabled={isAdding || !addAmount}
                onClick={() => handleAddMoney(parseFloat(addAmount))}
                className="btn-sage px-6 py-2.5 rounded-xl font-bold text-xs shadow-xs"
              >
                {isAdding ? 'Adding...' : 'Add Balance'}
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              * Supports GPay, PhonePe, Paytm, NetBanking, and Debit/Credit Cards. Zero transaction fee.
            </p>
          </div>
        </div>

        {/* Quick Recharges & Bill Payments (Bharat BillPay Enabled) */}
        <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-subtle space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">{t('rechargesBillPayments', 'Recharges & Bill Payments')}</h2>
              <p className="text-xs text-slate-500">{t('payBillsSeamlessly', 'Pay bills seamlessly and earn instant scratch rewards')}</p>
            </div>
            <span className="text-xs font-bold text-emerald-600">{t('bharatBillPay', 'Bharat BillPay Enabled')}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {quickServices.map((svc) => {
              const Icon = svc.icon;
              const isSelected = activeService?.id === svc.id;
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => handleOpenService(svc)}
                  className={`p-4 rounded-2xl text-center transition-all group cursor-pointer flex flex-col items-center justify-center border ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20'
                      : 'bg-slate-50 hover:bg-emerald-50/60 border-slate-200/80 hover:border-emerald-300'
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-white shadow-xs text-slate-700 group-hover:text-emerald-600 group-hover:scale-110 flex items-center justify-center mb-2.5 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">{svc.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{svc.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rewards & Scratch Cards Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-extrabold bg-white/20 px-2.5 py-0.5 rounded-full">
              Exclusive Offer
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Earn Flat 5% Cashback on Every Order!
            </h3>
            <p className="text-xs text-white/90 max-w-xl">
              Pay using ShopNest Pay Balance on your next fashion, electronics, or home essentials order and get instant wallet cashback credited within 10 minutes.
            </p>
          </div>
          <Link
            to="/search?q=deal"
            className="px-6 py-3 rounded-full bg-white text-orange-600 font-extrabold text-xs shadow-md hover:bg-slate-50 transition-all shrink-0"
          >
            Explore Eligible Deals
          </Link>
        </div>

        {/* Transactions & Passbook */}
        <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Passbook Statement</h3>
            <span className="text-xs text-slate-400">Recent Transactions</span>
          </div>

          <div className="divide-y divide-slate-100">
            {transactions.map((tx) => (
              <div key={tx.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      tx.type === 'credit'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tx.type === 'credit' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{tx.title}</p>
                    <p className="text-[10px] text-slate-400">{tx.date} • {tx.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`font-black ${
                      tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'
                    }`}
                  >
                    {tx.type === 'credit' ? '+' : '-'}{formatPrice(tx.amount)}
                  </span>
                  <p className="text-[10px] text-slate-400">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bill Payment & Recharge Interactive Modal ── */}
      {activeService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <activeService.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{activeService.label}</h3>
                  <p className="text-[11px] text-emerald-600 font-semibold">Bharat BillPay (BBPS) Guaranteed</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveService(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {billSuccess ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto animate-in zoom-in">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-slate-900">Payment Successful!</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Reference ID: {billSuccess.id}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-left space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service</span>
                    <span className="font-bold text-slate-800">{billSuccess.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Provider</span>
                    <span className="font-semibold text-slate-800">{billSuccess.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Account</span>
                    <span className="font-mono text-slate-800">{billSuccess.account}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-sm">
                    <span>Amount Paid</span>
                    <span className="text-emerald-700">{formatPrice(billSuccess.amount)}</span>
                  </div>
                </div>

                {/* Instant Scratch Card Reward */}
                <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl text-white text-center space-y-2">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                    <Award className="w-4 h-4 text-amber-200" />
                    <span>Instant Scratch Reward</span>
                  </div>
                  {scratchedReward === null ? (
                    <button
                      type="button"
                      onClick={handleScratchReward}
                      className="w-full py-2.5 bg-white text-orange-600 rounded-xl font-black text-xs shadow-md hover:bg-slate-50 cursor-pointer"
                    >
                      Tap to Scratch & Reveal Cashback!
                    </button>
                  ) : (
                    <div className="p-2 bg-white/20 rounded-xl text-center animate-in zoom-in">
                      <p className="text-xs font-medium">You Won Cashback!</p>
                      <p className="text-2xl font-black">{formatPrice(scratchedReward)}</p>
                      <p className="text-[10px] text-white/80">Credited to your ShopNest Pay wallet balance.</p>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveService(null)}
                  className="btn-sage w-full py-3 rounded-xl font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handlePayBill} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Select Operator / Provider</label>
                  <select
                    value={billProvider}
                    onChange={(e) => setBillProvider(e.target.value)}
                    className="input py-2 text-xs font-semibold cursor-pointer"
                  >
                    {activeService.providers.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">{activeService.fieldLabel}</label>
                  <input
                    required
                    type="text"
                    value={billAccount}
                    onChange={(e) => setBillAccount(e.target.value)}
                    placeholder={activeService.placeholder}
                    className="input py-2 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Recharge / Bill Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                    <input
                      required
                      type="number"
                      min="10"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      className="input pl-7 py-2 font-bold text-xs"
                    />
                  </div>
                  {/* Preset chips */}
                  <div className="flex gap-2 mt-2">
                    {[199, 299, 499, 999].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setBillAmount(chip.toString())}
                        className="flex-1 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 text-[11px] font-semibold border border-slate-200"
                      >
                        ₹{chip}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">ShopNest Pay Balance:</span>
                  <span className="font-bold text-slate-800">{formatPrice(balance)}</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessingBill}
                  className="btn-sage w-full py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer"
                >
                  {isProcessingBill ? 'Processing Secure Payment...' : `Pay ${formatPrice(parseFloat(billAmount) || 0)}`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
