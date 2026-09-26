import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface DealCard {
  tag: string;
  title: string;
  badge?: string;
  sub: string;
  image: string;
  bgGradient: string;
  borderColor: string;
  to: string;
  accentText?: string;
  sbiOffer?: boolean;
}

const FESTIVAL_DEALS: DealCard[] = [
  {
    tag: 'Earn up to ₹150 cashback*',
    title: 'Great Indian Festival',
    badge: 'STARTS 8TH OCT',
    sub: 'Free Delivery • Easy Returns',
    image: 'https://m.media-amazon.com/images/I/71d7rfSl0wL.jpg',
    bgGradient: 'from-amber-500 via-orange-600 to-red-600',
    borderColor: 'border-amber-400',
    to: '/search?q=deals',
    accentText: 'Shop Early Deals Now',
    sbiOffer: true,
  },
  {
    tag: 'Under ₹499',
    title: "Women's fashion",
    badge: 'SHOP EARLY DEALS',
    sub: 'Kurtis, Dresses, Handbags & Heels',
    image: 'https://m.media-amazon.com/images/I/71BLkd39VKL.jpg',
    bgGradient: 'from-rose-600 via-pink-700 to-red-800',
    borderColor: 'border-pink-400',
    to: '/category/Fashion',
    accentText: 'Top Brands • Latest Trends',
    sbiOffer: true,
  },
  {
    tag: 'Under ₹399',
    title: 'Bestselling kurtas',
    badge: 'MIN 70% OFF',
    sub: 'Rayon, Cotton & Anarkali sets',
    image: 'https://m.media-amazon.com/images/I/71fvaQTBSML.jpg',
    bgGradient: 'from-red-700 via-rose-800 to-red-950',
    borderColor: 'border-red-400',
    to: '/search?q=kurta',
    accentText: 'Top brands • Latest trends',
    sbiOffer: true,
  },
  {
    tag: 'Starting ₹199',
    title: 'Home & Kitchen Essentials',
    badge: 'FREE DELIVERY',
    sub: 'Pure stainless steel, bottles & cookware',
    image: 'https://m.media-amazon.com/images/I/51Zymoq7UnL.jpg',
    bgGradient: 'from-emerald-700 via-teal-800 to-emerald-950',
    borderColor: 'border-emerald-400',
    to: '/category/Home%20%26%20Kitchen',
    accentText: 'Free delivery on first order',
    sbiOffer: true,
  },
  {
    tag: 'Under ₹1,199',
    title: 'Designer Sarees & Ethnic',
    badge: 'FESTIVE PICKS',
    sub: 'Flared Anarkalis & Festive ensembles',
    image: 'https://m.media-amazon.com/images/I/71eUwDk8z+L.jpg',
    bgGradient: 'from-amber-700 via-red-800 to-amber-950',
    borderColor: 'border-amber-500',
    to: '/category/Fashion',
    accentText: 'Top brands • Latest trends',
    sbiOffer: true,
  },
  {
    tag: 'Up to 50% off',
    title: 'Smart Home & Speakers',
    badge: 'ALEXA PICKS',
    sub: 'Echo Pop, Dot & Smart displays',
    image: 'https://m.media-amazon.com/images/I/816ctt5WV5L.jpg',
    bgGradient: 'from-indigo-600 via-purple-700 to-slate-900',
    borderColor: 'border-indigo-400',
    to: '/category/Electronics',
    accentText: 'Voice-controlled • High bass',
    sbiOffer: true,
  },
  {
    tag: 'Up to 75% off',
    title: 'Earbuds & Neckbands',
    badge: 'TOP AUDIO PICKS',
    sub: 'boAt, Sony, Apple & JBL',
    image: 'https://m.media-amazon.com/images/I/61CGHv6kmWL.jpg',
    bgGradient: 'from-blue-700 via-indigo-800 to-slate-900',
    borderColor: 'border-blue-400',
    to: '/category/Electronics',
    accentText: 'ANC • 40Hr Battery Life',
    sbiOffer: true,
  },
  {
    tag: 'Up to 40% off',
    title: 'Gaming & High-End Laptops',
    badge: 'MEGA SAVINGS',
    sub: 'ROG Strix, MacBook Air & XPS 15',
    image: 'https://m.media-amazon.com/images/I/71vFKBpKakL.jpg',
    bgGradient: 'from-violet-800 via-purple-900 to-slate-950',
    borderColor: 'border-purple-400',
    to: '/category/Computers',
    accentText: 'Intel Core i7 • RTX 4060',
    sbiOffer: true,
  },
];

export function FestivalDealsStrip() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-2 group/slider">
      {/* ── Section Header ── */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>{t('todaysDeals', "Today's Deals")}</span>
            <span className="text-xs bg-red-600 text-white font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {t('festiveDeals', 'Great Indian Festival')}
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="w-7 h-7 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Scrollable Horizontal Cards Row ── */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-3 snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {FESTIVAL_DEALS.map((card, idx) => (
          <Link
            key={idx}
            to={card.to}
            className={`min-w-[260px] sm:min-w-[290px] md:min-w-[310px] max-w-[310px] rounded-2xl bg-gradient-to-b ${card.bgGradient} p-4 sm:p-5 text-white flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 snap-start shrink-0 relative overflow-hidden group border ${card.borderColor}/40`}
          >
            {/* Top Tag & Title */}
            <div className="relative z-10 space-y-1">
              <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                {t(card.tag, card.tag)}
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight pt-1 drop-shadow-sm">
                {t(card.title, card.title)}
              </h3>
              <p className="text-white/80 text-xs font-medium line-clamp-1">
                {t(card.sub, card.sub)}
              </p>
            </div>

            {/* Product Centerpiece Image */}
            <div className="relative my-4 aspect-[4/3] rounded-xl overflow-hidden shadow-inner bg-black/10 border border-white/20 flex items-center justify-center p-2">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover rounded-lg group-hover:scale-108 transition-transform duration-500"
              />
              {card.badge && (
                <div className="absolute top-2 left-2 bg-yellow-400 text-slate-900 text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs tracking-wide">
                  {t(card.badge, card.badge)}
                </div>
              )}
            </div>

            {/* Bottom Actions & Bank Strip */}
            <div className="relative z-10 pt-1 space-y-2">
              <div className="bg-white text-slate-900 rounded-xl py-2 px-3 text-center font-bold text-xs shadow-sm hover:bg-yellow-400 transition-colors flex items-center justify-center gap-1.5">
                <span>{t(card.accentText || 'Shop Early Deals Now', card.accentText || 'Shop Early Deals Now')}</span>
              </div>

              {card.sbiOffer && (
                <div className="bg-black/30 backdrop-blur-xs rounded-lg px-2.5 py-1 flex items-center justify-between text-[9px] font-bold text-white/90 border border-white/10">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    10% Instant Discount*
                  </span>
                  <span className="text-yellow-300 font-extrabold">SBI Card EMI</span>
                </div>
              )}
            </div>

            {/* Decorative background glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          </Link>
        ))}
      </div>
    </div>
  );
}
