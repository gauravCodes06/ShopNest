import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, RotateCcw, CreditCard, ShieldCheck, HelpCircle, MessageSquare, Phone, ChevronRight } from 'lucide-react';
import { LiveChatWidget } from '../components/support/LiveChatWidget';
import { CallbackModal } from '../components/support/CallbackModal';

export function CustomerServicePage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  const quickHelpTopics = [
    {
      icon: Package,
      title: 'Your Orders',
      desc: 'Track packages, edit delivery addresses or review purchases',
      link: '/orders',
    },
    {
      icon: RotateCcw,
      title: 'Returns & Refunds',
      desc: 'Easy 7-day hassle-free return and instant refund status',
      link: '/orders',
    },
    {
      icon: CreditCard,
      title: 'Payment & Invoices',
      desc: 'Download tax invoices, update cards, or review demo payments',
      link: '/checkout',
    },
    {
      icon: ShieldCheck,
      title: 'Security & Privacy',
      desc: 'Update password, 2FA security, and manage your account',
      link: '/orders',
    },
  ];

  const faqs = [
    {
      q: 'How do I track my order status in real time?',
      a: 'Go to "Your Orders" from the account menu. Click on any active order to see the live step-by-step dispatch and courier status synced with Firebase Realtime Database.',
    },
    {
      q: 'What is the ShopNest 7-Day Return Policy?',
      a: 'We provide 7 days return/replacement for all eligible products. Our courier executive will inspect and pick up the item from your doorstep at zero cost.',
    },
    {
      q: 'Are online payments secure?',
      a: 'Yes, all transactions are secured with 256-bit bank-grade encryption and tokenization to safeguard your financial details.',
    },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-10 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Hello, how can we assist you today?
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Access quick self-service actions or connect with our customer care champions.
          </p>
        </div>

        {/* Quick Help Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {quickHelpTopics.map((topic, i) => {
            const Icon = topic.icon;
            return (
              <Link
                key={i}
                to={topic.link}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-subtle hover:border-emerald-300 hover:shadow-card-hover transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{topic.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Contact Us Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Need personal assistance?</h2>
            <p className="text-xs text-slate-500">
              Our support team is available round the clock 24/7.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setChatOpen(true)}
              className="btn-sage px-6 py-2.5 rounded-full text-xs font-semibold cursor-pointer shadow-sm hover:shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start Live Chat</span>
            </button>
            <button
              onClick={() => setCallbackOpen(true)}
              className="btn-outline px-6 py-2.5 rounded-full text-xs font-semibold cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Request Call Back</span>
            </button>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-subtle space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="divide-y divide-slate-100">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-3.5 space-y-1">
                <p className="text-xs font-bold text-slate-800">{faq.q}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Chat Modal Widget */}
      <LiveChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Call Back Request Modal */}
      <CallbackModal isOpen={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </div>
  );
}
