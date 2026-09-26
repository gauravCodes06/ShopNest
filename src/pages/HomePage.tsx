import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Laptop, Shirt, Armchair, Sparkles, Trophy, Gamepad2,
  ArrowRight, Clock, Smartphone, BookOpen, Headphones,
  Baby, ChefHat, Camera,
} from 'lucide-react';
import { products, getFeaturedProducts, getTrendingProducts } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { AmazonCategoryGrid } from '../components/home/AmazonCategoryGrid';
import { CategoryProductShowcase } from '../components/home/CategoryProductShowcase';
import { BrandFeatureBanner } from '../components/home/BrandFeatureBanner';
import { FlashSaleBanner } from '../components/home/FlashSaleBanner';
import { FestivalDealsStrip } from '../components/home/FestivalDealsStrip';
import { BrowsingHistoryRecommendations } from '../components/home/BrowsingHistoryRecommendations';
import { TrendingBrands } from '../components/home/TrendingBrands';
import { ShopByOccasion } from '../components/home/ShopByOccasion';
import { StatsNewsletter } from '../components/home/StatsNewsletter';
import { CustomerReviewsSpotlight } from '../components/home/CustomerReviews';
import { ShopNestLogo } from '../components/ui/ShopNestLogo';
import { formatPrice } from '../lib/utils';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export function HomePage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isNavy = theme === 'navy';
  const trending = getTrendingProducts().slice(0, 10);
  const featured = getFeaturedProducts().slice(0, 10);
  const moreProducts = getFeaturedProducts().slice(10, 20);

  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 32 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 14, seconds: 32 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2 = (n: number) => n.toString().padStart(2, '0');

  const categoryPills = [
    { key: 'catMobiles',     to: '/category/Mobiles',            icon: Smartphone, color: 'bg-violet-50 text-violet-600 border-violet-100' },
    { key: 'catComputers',   to: '/category/Computers',          icon: Laptop,     color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
    { key: 'catElectronics', to: '/category/Electronics',        icon: Headphones, color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { key: 'catFashion',     to: '/category/Fashion',            icon: Shirt,      color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { key: 'catHomeLiving',  to: '/category/Home%20%26%20Kitchen',icon: Armchair,   color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { key: 'catBeauty',      to: '/category/Beauty',             icon: Sparkles,   color: 'bg-rose-50 text-rose-600 border-rose-100' },
    { key: 'catSports',      to: '/category/Sports',             icon: Trophy,     color: 'bg-orange-50 text-orange-600 border-orange-100' },
    { key: 'catBooks',       to: '/category/Books',              icon: BookOpen,   color: 'bg-teal-50 text-teal-600 border-teal-100' },
    { key: 'catKitchen',     to: '/category/Home%20%26%20Kitchen',icon: ChefHat,   color: 'bg-lime-50 text-lime-600 border-lime-100' },
    { key: 'catCameras',     to: '/search?q=camera',             icon: Camera,     color: 'bg-cyan-50 text-cyan-600 border-cyan-100' },
  ];

  const dealItems = [
    products.find(p => p.id === 'e7'), // Echo Pop Smart Speaker
    products.find(p => p.id === 'h2'), // Milton Insulated Bottle
    products.find(p => p.id === 'c8'), // Logitech MX Master 3S
    products.find(p => p.id === 'e4'), // boAt Rockerz 255 Pro+
    products.find(p => p.id === 'h1'), // Prestige Iris Mixer Grinder
    products.find(p => p.id === 'm12'), // OnePlus Nord CE4 Lite
  ].filter(Boolean).map(p => ({
    name: p!.name,
    price: p!.price,
    image: p!.image,
    to: `/product/${p!.id}`
  }));

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-10">

        {/* ── 1. Hero Banner ─────────────────────────────────── */}
        <div className={`relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden hero-banner transition-all duration-300 ${
          isNavy
            ? 'bg-gradient-to-r from-[#0B132B] via-[#142342] to-[#0E1A33] border border-[#1E2D45] shadow-2xl text-white'
            : theme === 'orange'
            ? 'bg-gradient-to-r from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA] border border-orange-200 shadow-xs'
            : theme === 'cream'
            ? 'bg-gradient-to-r from-[#FAF8F5] via-[#F5F0EB] to-[#ECE5DC] border border-[#E2DAD0] shadow-xs'
            : 'bg-gradient-to-r from-[#F4EFE6] via-[#F2EDE2] to-[#ECE5D8] border border-[#E4DCce] shadow-xs'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold shadow-xs transition-colors ${
                isNavy
                  ? 'bg-[#17233D] border border-[#2B3E60] text-slate-200'
                  : 'bg-white/80 border border-slate-200 text-slate-600'
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {t('heroTagline', "India's #1 Smart Shopping Platform")}
              </div>
              <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] transition-colors ${
                isNavy ? 'text-white' : 'text-slate-900'
              }`}>
                {t('heroHeadline', 'Upgrade Your')}<br />
                <span className={
                  isNavy
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent drop-shadow-sm'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent'
                }>
                  {t('heroHeadlineSub', 'Everyday Life')}
                </span>
              </h1>
              <p className={`text-sm sm:text-base max-w-lg leading-relaxed font-normal transition-colors ${
                isNavy ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {t('heroSubtitle', 'Discover top-quality products, unbeatable prices and a smoother shopping experience.')}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link to="/search?q=deal" className="btn-sage px-6 py-3 rounded-full text-sm font-semibold shadow-sm hover:shadow transition-all inline-flex items-center gap-2">
                  <span>{t('shopNow', 'Shop Now')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/prime" className={`px-6 py-3 rounded-full text-sm font-semibold shadow-xs transition-colors inline-flex items-center gap-2 ${
                  isNavy
                    ? 'bg-[#17233D] hover:bg-[#1E2E4E] text-white border border-[#2B3E60]'
                    : 'bg-white/90 hover:bg-white text-slate-800 border border-slate-300/80'
                }`}>
                  <ShopNestLogo size="sm" />
                  <span>{t('tryPrime', 'Try Prime')}</span>
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                {[
                  { label: t('freeDelivery', 'Free Delivery'), sub: t('freeDeliverySub', 'On orders ₹499+') },
                  { label: t('easyReturns', '10-Day Returns'), sub: t('easyReturnsSub', 'Hassle free') },
                  { label: t('hugeSelection', '2.5 Cr+ Products'), sub: t('hugeSelectionSub', 'Huge selection') },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <span className={`text-xs font-bold ${isNavy ? 'text-slate-100' : 'text-slate-800'}`}>{s.label}</span>
                    <span className={`text-[10px] font-medium ${isNavy ? 'text-slate-400' : 'text-slate-500'}`}>{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className={`relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border ${
                isNavy ? 'border-[#2B3E60]' : 'border-white/60'
              }`}>
                <img src='https://m.media-amazon.com/images/I/71Swqqe7XAL.jpg' alt="Modern interior lifestyle" className="w-full h-full object-cover" />
              </div>
              <div className={`absolute -top-3 -right-2 sm:right-2 backdrop-blur-md shadow-md rounded-full px-4 py-1.5 flex items-center gap-2 text-xs font-semibold ${
                isNavy ? 'bg-[#17233D]/95 border border-[#2B3E60] text-slate-100' : 'bg-white/95 border border-slate-200 text-slate-800'
              }`}>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{t('betterChoices', 'Better Choices, Brighter Days')}</span>
              </div>
              <div className={`absolute -bottom-4 left-2 sm:left-4 backdrop-blur-md shadow-lg rounded-2xl px-4 py-3 hidden sm:flex items-center gap-3 max-w-[180px] ${
                isNavy ? 'bg-[#17233D]/95 border border-[#2B3E60] text-slate-100' : 'bg-white/95 border border-slate-200 text-slate-800'
              }`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isNavy ? 'bg-amber-400/20 text-amber-300' : 'bg-orange-100'
                }`}>
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <p className={`text-[10px] font-bold ${isNavy ? 'text-white' : 'text-slate-900'}`}>{t('flashDealLive', 'Flash Deal Live!')}</p>
                  <p className={`text-[9px] font-bold ${isNavy ? 'text-amber-400' : 'text-orange-600'}`}>{t('upTo67Off', 'Up to 67% off')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. Category Pills ──────────────────────────────── */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-3">
          {categoryPills.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link key={idx} to={cat.to}
                className="bg-white rounded-2xl p-3 border border-slate-200/80 hover:border-emerald-300 hover:shadow-card-hover transition-all duration-200 flex flex-col items-center text-center group cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl ${cat.color} border flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-700 group-hover:text-emerald-600 transition-colors leading-tight">
                  {t(cat.key, cat.key)}
                </span>
              </Link>
            );
          })}
        </div>

        {/* ── 3. Great Indian Festival & Today's Deals Cards Strip (Image 1) ── */}
        <FestivalDealsStrip />

        {/* ── 4. Flash Sale Carousel ─────────────────────────── */}
        <FlashSaleBanner />

        {/* ── 5. Amazon Multi-Quadrant Category Grid (Images 2, 3, 5) ── */}
        <AmazonCategoryGrid />

        {/* ── 6. Browsing History Recommendations Carousel (Image 4) ── */}
        <BrowsingHistoryRecommendations />

        {/* ── 7. Trending Now (Expanded Products with Real Images) ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{t('trendingNow', 'Trending Now')}</h2>
            <Link to="/search?q=best%20seller" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group">
              <span>{t('viewAll', 'View All')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {trending.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>

        {/* ── 8. Dedicated Showcase Shelves for All Product Categories ── */}
        <CategoryProductShowcase products={products} />

        {/* ── 6. Split Feature Banners ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left green banner */}
          <div className="lg:col-span-7 bg-[#1C3D34] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-xs min-h-[220px]">
            <div className="relative z-10 space-y-3 max-w-sm">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1 text-[10px] font-bold text-emerald-300 uppercase tracking-wide">
                {t('newArrivals', 'New Arrivals')} ✦ Season 2026
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                {t('homeEssentials', 'Home Essentials for a Better Tomorrow')}
              </h3>
              <p className="text-emerald-100/80 text-xs sm:text-sm font-normal">
                {t('homeEssentialsSub', 'Stylish. Functional. Made for You.')}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <Link to="/category/Home%20%26%20Kitchen"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-5 py-2.5 rounded-full text-xs transition-colors inline-flex items-center gap-1.5 shadow-sm">
                  <span>{t('shopHome', 'Shop Home')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link to="/prime" className="text-xs font-semibold text-emerald-300 hover:text-white transition-colors">
                  {t('primeBenefitsLink', 'Prime benefits')} →
                </Link>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-80 pointer-events-none hidden sm:block">
              <img src='https://m.media-amazon.com/images/I/71vFKBpKakL.jpg' alt="Cozy Home Living" className="w-full h-full object-cover object-left" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1C3D34] via-[#1C3D34]/70 to-transparent" />
            </div>
          </div>

          {/* Right deals countdown */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">{t('bestDeals', 'Best Deals')}</h3>
                <div className="flex items-center gap-1.5 text-xs text-orange-600 font-bold">
                  <Clock className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                  <span>{t('endsIn', 'Ends in')} {format2(timeLeft.hours)} : {format2(timeLeft.minutes)} : {format2(timeLeft.seconds)}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-4">
                {dealItems.map((item, idx) => (
                  <Link key={idx} to={item.to} className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                    <div className="w-20 h-20 rounded-xl bg-slate-50 p-2 mb-2 flex items-center justify-center overflow-hidden border border-slate-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-700 line-clamp-1 group-hover:text-emerald-600">{item.name}</span>
                    <span className="text-xs font-bold text-slate-900 mt-0.5">{formatPrice(item.price)}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">{t('newDealsEveryHour', 'New deals every hour')}</span>
              <Link to="/search?q=deal" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 group">
                <span>{t('viewAllDeals', 'View All Deals')}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── 7. Shop by Occasion ───────────────────────────── */}
        <ShopByOccasion />

        {/* ── 8. Trending Brands ────────────────────────────── */}
        <TrendingBrands />

        {/* ── 9. Recommended for You ────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{t('recommendedForYou', 'Recommended for You')}</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{t('basedOnHistory', 'Based on your browsing history')}</p>
            </div>
            <Link to="/search?q=recommended" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group">
              <span>{t('viewAll', 'View All')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>

        {/* ── 10. More to Explore ───────────────────────────── */}
        {moreProducts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{t('moreToExplore', 'More to Explore')}</h2>
              <Link to="/search" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group">
                <span>{t('browseAll', 'Browse All')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {moreProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </section>
        )}

        {/* ── 11. Customer Reviews ──────────────────────────── */}
        <CustomerReviewsSpotlight />

        {/* ── 12. Stats + Newsletter ────────────────────────── */}
        <StatsNewsletter />

        {/* ── 13. Brand Feature Banner ─────────────────────── */}
        <BrandFeatureBanner />

      </div>
    </div>
  );
}
