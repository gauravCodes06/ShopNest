import { useState } from 'react';
import { X, Send, Bot, User, Sparkles, CheckCircle2 } from 'lucide-react';
import { ShopNestLogo } from '../ui/ShopNestLogo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export function LiveChatWidget({ isOpen, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hello! I am NestBot, your ShopNest AI shopping assistant. How can I help you today?',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    '📦 Where is my order?',
    '↩️ How do returns work?',
    '🏷️ What coupons are active?',
    '🚚 How long does delivery take?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text) return;

    const userMsg: Message = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulated smart assistant response
    setTimeout(() => {
      let botReply = "Thank you for reaching out. Our support team is tracking your request!";
      const lower = text.toLowerCase();

      if (lower.includes('order') || lower.includes('where is')) {
        botReply = "Your recent order is confirmed and scheduled for delivery in 2-5 business days. You can view real-time tracking anytime under 'Your Orders'!";
      } else if (lower.includes('return') || lower.includes('refund')) {
        botReply = "ShopNest offers a 7-day hassle-free return policy. You can initiate a return directly from your Orders page, and refunds are processed within 24-48 hours of item pickup.";
      } else if (lower.includes('coupon') || lower.includes('deal') || lower.includes('discount')) {
        botReply = "Active coupons today: Use code 'WELCOME10' for 10% off your order, or 'NEST500' for ₹500 off cart values above ₹4,999!";
      } else if (lower.includes('delivery') || lower.includes('shipping')) {
        botReply = "We offer Free Standard Delivery (2-5 business days), Express Delivery (1-2 days), and Next-Day guaranteed delivery on eligible pin codes!";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[110] w-[360px] sm:w-[400px] h-[540px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
      {/* Top Header */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>ShopNest Live Support</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>
            <p className="text-[10px] text-slate-400">AI Assistant • Online 24/7</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAFC]">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${
              m.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-emerald-600" />}
            </div>

            <div
              className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
              }`}
            >
              <p>{m.text}</p>
              <span
                className={`text-[9px] mt-1 block text-right ${
                  m.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'
                }`}
              >
                {m.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="text-[11px] font-semibold text-slate-600 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50 px-2.5 py-1 rounded-full border border-slate-200 whitespace-nowrap transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question or type order ID..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
