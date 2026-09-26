import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Check } from 'lucide-react';
import { useCartStore } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { products } from '../../data/products';
import { ProductImage } from '../ui/ProductImage';
import { formatPrice } from '../../lib/utils';

export function BrowsingHistoryRecommendations() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;
  const addItem = useCartStore((s) => s.addItem);
  const { openAuthModal } = useAuth();
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  // Curate recommended products directly from our verified products catalog
  const recommendedItems = products.slice(0, 14);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      setCurrentPage((prev) => {
        if (direction === 'right') return prev < totalPages ? prev + 1 : 1;
        return prev > 1 ? prev - 1 : totalPages;
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    addItem(id);
    setAddedMap((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [id]: false }));
    }, 1800);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
      {/* ── Section Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight">
            {t('customersViewedHistory', 'Customers who viewed items in your browsing history also viewed')}
          </h2>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 self-end sm:self-auto">
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous page"
              className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 shadow-xs flex items-center justify-center text-slate-700 transition-all cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next page"
              className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 shadow-xs flex items-center justify-center text-slate-700 transition-all cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Horizontal Product Carousel ── */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {recommendedItems.map((item) => {
          const discount = item.originalPrice
            ? Math.round((1 - item.price / item.originalPrice) * 100)
            : null;

          return (
            <div
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              className="min-w-[190px] sm:min-w-[210px] max-w-[210px] flex flex-col justify-between group cursor-pointer shrink-0"
            >
              {/* Product Image using ProductImage component with fallback */}
              <div className="aspect-[3/4] w-full bg-slate-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center p-3 border border-slate-100 group-hover:border-slate-200 transition-all">
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title & Details */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-medium text-slate-800 line-clamp-3 leading-snug group-hover:text-emerald-700 transition-colors">
                  {item.name}
                </h3>

                {/* Star Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < Math.round(item.rating) ? 'text-amber-500 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-sky-700 font-semibold">{item.reviewCount.toLocaleString('en-IN')}</span>
                </div>

                {/* Pricing row */}
                <div className="flex items-baseline gap-1.5 pt-0.5">
                  {discount && discount > 0 && (
                    <span className="text-sm font-bold text-red-700">-{discount}%</span>
                  )}
                  <span className="text-base font-extrabold text-slate-900 tracking-tight">{formatPrice(item.price)}</span>
                </div>
                {item.originalPrice && (
                  <p className="text-[10px] text-slate-400">
                    M.R.P.: <span className="line-through">{formatPrice(item.originalPrice)}</span>
                  </p>
                )}

                {/* Delivery Indicator */}
                <p className="text-[10px] text-emerald-700 font-bold pt-0.5">
                  FREE Delivery by ShopNest
                </p>
              </div>

              {/* Quick Add Button */}
              <button
                onClick={(e) => handleAddToCart(e, item.id)}
                className={`mt-3 w-full py-2 btn-add-to-cart rounded-xl text-[11px] font-bold shadow-2xs transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                  addedMap[item.id] ? 'btn-added' : ''
                }`}
              >
                {addedMap[item.id] ? (
                  <><Check size={13} className="stroke-[3]" /> Added</>
                ) : (
                  <><ShoppingCart size={13} /> Add to Cart</>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* ── Amazon-style Personalized Recommendations Sign In Box ── */}
      <div className="pt-6 border-t border-slate-100 flex flex-col items-center justify-center text-center space-y-2 py-4">
        <h4 className="text-xs sm:text-sm font-bold text-slate-800">
          {t('seePersonalizedRecommendations', 'See personalized recommendations')}
        </h4>
        <button
          onClick={() => openAuthModal('signin')}
          className="bg-gradient-to-b from-[#FFD814] to-[#F7CA00] hover:from-[#F7CA00] hover:to-[#E5B800] border border-[#D5A900] text-slate-900 font-bold text-xs py-2 px-16 rounded-lg shadow-xs hover:shadow transition-all cursor-pointer"
        >
          {t('signIn', 'Sign in')}
        </button>
        <p className="text-[11px] text-slate-500">
          New customer?{' '}
          <button
            onClick={() => openAuthModal('signup')}
            className="text-sky-700 hover:text-orange-700 hover:underline font-semibold cursor-pointer"
          >
            Start here.
          </button>
        </p>
      </div>
    </div>
  );
}
