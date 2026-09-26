import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

interface FlashDeal {
  id: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  image: string;
  sold: number; // % sold
  to: string;
  badge?: string;
}

const FLASH_DEALS: FlashDeal[] = [
  {
    id: 'fd1',
    name: 'boAt Airdopes 141 TWS Earbuds',
    originalPrice: 37.38,
    salePrice: 12.49,
    discount: 67,
    image: 'https://m.media-amazon.com/images/I/71d7rfSl0wL.jpg',
    sold: 82,
    to: '/product/au1',
    badge: 'Best Seller',
  },
  {
    id: 'fd2',
    name: 'Fossil Gen 6 Smartwatch 44mm (Smoke Stainless Steel)',
    originalPrice: 312.44,
    salePrice: 162.49,
    discount: 48,
    image: 'https://m.media-amazon.com/images/I/71geVdy6-OS.jpg',
    sold: 65,
    to: '/product/e2',
    badge: 'Deal of Day',
  },
  {
    id: 'fd3',
    name: 'Pigeon Mio 3-Piece Non-Stick Induction Cookware Set',
    originalPrice: 37.49,
    salePrice: 16.24,
    discount: 56,
    image: 'https://m.media-amazon.com/images/I/71jG+e7roXL.jpg',
    sold: 74,
    to: '/product/hk1',
  },
  {
    id: 'fd4',
    name: "Levi's Men's 511 Slim Fit Stretch Denim Jeans",
    originalPrice: 49.99,
    salePrice: 19.99,
    discount: 60,
    image: 'https://m.media-amazon.com/images/I/71TPda7cwUL.jpg',
    sold: 55,
    to: '/product/f2',
  },
  {
    id: 'fd5',
    name: 'Nike React Infinity Run Flyknit 3 Running Shoes',
    originalPrice: 187.44,
    salePrice: 112.49,
    discount: 40,
    image: 'https://m.media-amazon.com/images/I/81Os1SDWpcL.jpg',
    sold: 48,
    to: '/search?q=shoes',
    badge: 'Limited Stock',
  },
  {
    id: 'fd6',
    name: 'Mamaearth Vitamin C Radiance Face Serum with Turmeric',
    originalPrice: 8.74,
    salePrice: 4.99,
    discount: 43,
    image: 'https://m.media-amazon.com/images/I/6125mFrzr6L.jpg',
    sold: 91,
    to: '/product/be1',
    badge: 'Almost Gone',
  },
  {
    id: 'fd7',
    name: 'Seagate Expansion 2TB External USB 3.0 Hard Drive',
    originalPrice: 87.49,
    salePrice: 62.49,
    discount: 29,
    image: 'https://m.media-amazon.com/images/I/71Swqqe7XAL.jpg',
    sold: 78,
    to: '/product/sd1',
    badge: 'Mega Deal',
  },
  {
    id: 'fd8',
    name: 'Echo Dot (5th Gen) Alexa Smart Speaker',
    originalPrice: 68.74,
    salePrice: 43.74,
    discount: 36,
    image: 'https://m.media-amazon.com/images/I/71vFKBpKakL.jpg',
    sold: 70,
    to: '/product/hm1',
    badge: 'ShopNest Choice',
  },
];

export function FlashSaleBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 32, seconds: 47 });
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const VISIBLE = 4;

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 32, seconds: 47 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % (FLASH_DEALS.length - VISIBLE + 1));
    }, 3500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  const goLeft = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveIndex((i) => Math.max(0, i - 1));
  };
  const goRight = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveIndex((i) => Math.min(FLASH_DEALS.length - VISIBLE, i + 1));
  };

  const visibleDeals = FLASH_DEALS.slice(activeIndex, activeIndex + VISIBLE);

  return (
    <section className="bg-white rounded-3xl border border-slate-200/80 shadow-subtle overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 pt-5 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-orange-500 text-white px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide">
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>FLASH SALE</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">Lightning Deals</h2>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
          <Clock className="w-4 h-4 text-orange-500 animate-pulse" />
          <span className="text-slate-500 font-medium text-xs">Ends in</span>
          {[pad(timeLeft.hours), pad(timeLeft.minutes), pad(timeLeft.seconds)].map((val, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="bg-slate-900 text-white text-sm font-black px-2.5 py-1 rounded-lg tabular-nums min-w-[2.2rem] text-center">
                {val}
              </span>
              {i < 2 && <span className="text-orange-500 font-black text-base">:</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative px-6 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all duration-300">
          {visibleDeals.map((deal) => (
            <Link
              key={deal.id}
              to={deal.to}
              className="group flex flex-col rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:border-orange-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-square bg-white flex items-center justify-center p-3 border-b border-slate-100">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Discount Badge */}
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  -{deal.discount}%
                </span>
                {deal.badge && (
                  <span className="absolute top-2 right-2 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {deal.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col gap-1.5">
                <p className="text-xs font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
                  {deal.name}
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-black text-slate-900">{formatPrice(deal.salePrice)}</span>
                  <span className="text-[10px] text-slate-400 line-through">{formatPrice(deal.originalPrice)}</span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${deal.sold}%` }}
                    />
                  </div>
                  <p className="text-[10px] font-semibold text-orange-600 mt-0.5">{deal.sold}% sold</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Nav Arrows */}
        <button
          onClick={goLeft}
          disabled={activeIndex === 0}
          className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 transition-all z-10"
        >
          <ChevronLeft className="w-4 h-4 text-slate-700" />
        </button>
        <button
          onClick={goRight}
          disabled={activeIndex >= FLASH_DEALS.length - VISIBLE}
          className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 transition-all z-10"
        >
          <ChevronRight className="w-4 h-4 text-slate-700" />
        </button>
      </div>

      {/* Footer CTA */}
      <div className="px-6 pb-5 text-center">
        <Link
          to="/search?q=flash+deal"
          className="inline-flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold px-5 py-2 rounded-full transition-all"
        >
          <Zap className="w-3.5 h-3.5" />
          See All Lightning Deals
        </Link>
      </div>
    </section>
  );
}
