import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getFeaturedProducts, getDeals, getTrendingProducts } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { formatPrice } from '../lib/utils';

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featured = getFeaturedProducts();
  const deals = getDeals();
  const trending = getTrendingProducts();

  const heroBanners = [
    {
      id: 1,
      title: 'Great Indian Festival | Starting Early for Prime',
      subtitle: 'Up to 80% off on Mobiles, Electronics & Home',
      bgGradient: 'from-[#0b2447] via-[#19376d] to-[#576cbc]',
      tag: 'MEGA SALE',
      buttonText: 'Shop All Deals',
      link: '/category/Electronics',
    },
    {
      id: 2,
      title: 'Upgrade Your Workspace & Tech Gadgets',
      subtitle: 'Premium Laptops, 4K Monitors & Noise Cancelling Audio',
      bgGradient: 'from-[#1e3c72] via-[#2a5298] to-[#0f2027]',
      tag: 'NEW LAUNCHES',
      buttonText: 'Explore Tech',
      link: '/category/Electronics',
    },
    {
      id: 3,
      title: 'Festive Fashion & Beauty Trends',
      subtitle: 'Top Indian & Global Brands at Unbeatable Prices',
      bgGradient: 'from-[#4a154b] via-[#611f69] to-[#ecb22e]',
      tag: 'TRENDING NOW',
      buttonText: 'Shop Fashion',
      link: '/category/Fashion',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroBanners.length]);

  return (
    <div className="min-h-screen bg-[#eaeded] pb-12">
      {/* ── Hero Carousel with Gradient Fade ─────────────────────────────── */}
      <div className="relative w-full max-w-[1500px] mx-auto overflow-hidden h-[260px] sm:h-[350px] md:h-[420px] lg:h-[480px]">
        {/* Slides */}
        {heroBanners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 bg-gradient-to-r ${banner.bgGradient} flex items-center px-8 md:px-16 ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="max-w-xl text-white pt-4 pb-20">
              <span className="inline-block bg-[#ffd814] text-[#0f1111] text-[11px] font-bold px-2 py-0.5 rounded-[2px] mb-3">
                {banner.tag}
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-2 drop-shadow-sm">
                {banner.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-200 mb-5 font-normal">
                {banner.subtitle}
              </p>
              <Link
                to={banner.link}
                className="btn-amazon-primary inline-flex px-6 py-2.5 font-medium"
              >
                {banner.buttonText}
              </Link>
            </div>
          </div>
        ))}

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length)}
          className="absolute left-2 top-[35%] -translate-y-1/2 z-20 w-10 h-16 bg-white/30 hover:bg-white/70 text-[#0f1111] flex items-center justify-center rounded-[2px] transition-colors cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroBanners.length)}
          className="absolute right-2 top-[35%] -translate-y-1/2 z-20 w-10 h-16 bg-white/30 hover:bg-white/70 text-[#0f1111] flex items-center justify-center rounded-[2px] transition-colors cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Fade to #eaeded background */}
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#eaeded] to-transparent z-10 pointer-events-none" />
      </div>

      {/* ── Main Content Container (Overlapping Hero) ────────────────────── */}
      <div className="max-w-[1500px] mx-auto px-4 -mt-24 sm:-mt-36 md:-mt-48 lg:-mt-56 relative z-20 space-y-6">
        {/* ── 4-Column Card Grid (Classic Amazon Quad-box) ───────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Home & Living */}
          <div className="bg-white p-5 rounded-[4px] shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#0f1111] mb-3">
                Revamp your home in style
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Link to="/category/Home%20%26%20Living" className="group">
                  <div className="aspect-square bg-gray-100 overflow-hidden mb-1">
                    <img
                      src="https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=300&q=80"
                      alt="Cushion covers"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs text-[#0f1111]">Cushion covers & bedsheets</span>
                </Link>
                <Link to="/category/Home%20%26%20Living" className="group">
                  <div className="aspect-square bg-gray-100 overflow-hidden mb-1">
                    <img
                      src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&q=80"
                      alt="Home decor"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs text-[#0f1111]">Figurines & vases</span>
                </Link>
                <Link to="/category/Home%20%26%20Living" className="group">
                  <div className="aspect-square bg-gray-100 overflow-hidden mb-1">
                    <img
                      src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&q=80"
                      alt="Home storage"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs text-[#0f1111]">Home storage organizers</span>
                </Link>
                <Link to="/category/Home%20%26%20Living" className="group">
                  <div className="aspect-square bg-gray-100 overflow-hidden mb-1">
                    <img
                      src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&q=80"
                      alt="Lighting"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs text-[#0f1111]">Lighting solutions</span>
                </Link>
              </div>
            </div>
            <Link to="/category/Home%20%26%20Living" className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline font-medium">
              Explore all
            </Link>
          </div>

          {/* Card 2: Electronics */}
          <div className="bg-white p-5 rounded-[4px] shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#0f1111] mb-3">
                Up to 75% off | Electronics & accessories
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Link to="/category/Electronics" className="group">
                  <div className="aspect-square bg-gray-100 overflow-hidden mb-1">
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"
                      alt="Headphones"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs text-[#0f1111]">Noise cancelling headphones</span>
                </Link>
                <Link to="/category/Electronics" className="group">
                  <div className="aspect-square bg-gray-100 overflow-hidden mb-1">
                    <img
                      src="https://images.unsplash.com/photo-1527443224154-c4a573d5f237?w=300&q=80"
                      alt="Monitors"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs text-[#0f1111]">4K Ultra Monitors</span>
                </Link>
                <Link to="/category/Electronics" className="group">
                  <div className="aspect-square bg-gray-100 overflow-hidden mb-1">
                    <img
                      src="https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&q=80"
                      alt="Fast Chargers"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs text-[#0f1111]">Wireless fast pads</span>
                </Link>
                <Link to="/category/Electronics" className="group">
                  <div className="aspect-square bg-gray-100 overflow-hidden mb-1">
                    <img
                      src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80"
                      alt="Cameras"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs text-[#0f1111]">DSLR & mirrorless</span>
                </Link>
              </div>
            </div>
            <Link to="/category/Electronics" className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline font-medium">
              See all offers
            </Link>
          </div>

          {/* Card 3: Fashion Deals */}
          <div className="bg-white p-5 rounded-[4px] shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#0f1111] mb-3">
                Minimum 50% off | Top fashion styles
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Link to="/category/Fashion" className="group">
                  <div className="aspect-square bg-gray-100 overflow-hidden mb-1">
                    <img
                      src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80"
                      alt="Shirts"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs text-[#0f1111]">Men's shirts & tees</span>
                </Link>
                <Link to="/category/Fashion" className="group">
                  <div className="aspect-square bg-gray-100 overflow-hidden mb-1">
                    <img
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80"
                      alt="Dresses"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs text-[#0f1111]">Women's festive wear</span>
                </Link>
                <Link to="/category/Fashion" className="group">
                  <div className="aspect-square bg-gray-100 overflow-hidden mb-1">
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80"
                      alt="Footwear"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs text-[#0f1111]">Footwear & sneakers</span>
                </Link>
                <Link to="/category/Accessories" className="group">
                  <div className="aspect-square bg-gray-100 overflow-hidden mb-1">
                    <img
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80"
                      alt="Watches"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs text-[#0f1111]">Smartwatches & bags</span>
                </Link>
              </div>
            </div>
            <Link to="/category/Fashion" className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline font-medium">
              See more deals
            </Link>
          </div>

          {/* Card 4: Sign in / Prime Card */}
          <div className="flex flex-col gap-4">
            <div className="bg-white p-5 rounded-[4px] shadow-sm">
              <h2 className="text-xl font-bold text-[#0f1111] mb-2">
                Sign in for your best experience
              </h2>
              <p className="text-xs text-[#565959] mb-4">
                Personalized deals, tracking, and Prime benefits just for you.
              </p>
              <Link to="/orders" className="btn-amazon-primary w-full py-2.5 text-center font-medium block">
                Sign in securely
              </Link>
            </div>

            {/* Sponsored Prime Card */}
            <div className="bg-white p-4 rounded-[4px] shadow-sm flex items-center gap-3 border border-[#d5d9d9]">
              <div className="w-12 h-12 bg-[#00a8e1] rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-black italic text-lg">✔</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#0f1111]">Amazon Prime</p>
                <p className="text-[11px] text-[#565959]">FREE fast delivery & video streaming</p>
                <Link to="/category/Electronics" className="text-xs text-[#007185] hover:underline font-medium">
                  Try Prime Free
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Today's Deals Horizontal Scroller ─────────────────────────── */}
        <section className="bg-white p-5 rounded-[4px] shadow-sm border border-[#e7e7e7]">
          <div className="flex items-baseline justify-between mb-4">
            <div className="flex items-baseline gap-3">
              <h2 className="text-xl font-bold text-[#0f1111]">
                Today's Deals
              </h2>
              <span className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline cursor-pointer">
                See all deals
              </span>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar">
            {deals.slice(0, 8).map((product) => {
              const discount = product.originalPrice
                ? Math.round((1 - product.price / product.originalPrice) * 100)
                : 35;
              return (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="min-w-[190px] max-w-[210px] shrink-0 group flex flex-col p-2 border border-transparent hover:border-gray-200 rounded transition-all"
                >
                  <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden mb-2 p-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="bg-[#cc0c39] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-[2px]">
                      Up to {discount}% off
                    </span>
                    <span className="text-[11px] text-[#cc0c39] font-bold">Deal of the Day</span>
                  </div>
                  <p className="text-sm font-medium text-[#0f1111]">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-xs text-[#565959] line-clamp-1 group-hover:text-[#c7511f] transition-colors">
                    {product.name}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Best Sellers in Electronics Grid ──────────────────────────── */}
        <section className="bg-white p-5 rounded-[4px] shadow-sm border border-[#e7e7e7]">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-bold text-[#0f1111]">
              Best Sellers in Electronics & Gadgets
            </h2>
            <Link
              to="/category/Electronics"
              className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline"
            >
              See all in Electronics
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {featured.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} compact={true} />
            ))}
          </div>
        </section>

        {/* ── Amazon Festive Banner Promo ───────────────────────────────── */}
        <div className="bg-[#131921] text-white p-6 rounded-[4px] flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#febd69] uppercase tracking-wider">
              Prime Exclusive Offers
            </span>
            <h3 className="text-2xl font-bold mt-1">
              Save more with Amazon Pay ICICI Bank Credit Card
            </h3>
            <p className="text-xs text-gray-300 mt-1">
              Get unlimited 5% cashback on every purchase, no minimum spending limit.
            </p>
          </div>
          <Link
            to="/category/Electronics"
            className="btn-amazon-primary px-6 py-2.5 font-medium shrink-0"
          >
            Apply & Earn ₹2,000 Rewards
          </Link>
        </div>

        {/* ── Trending Products Across All Categories ───────────────────── */}
        <section className="bg-white p-5 rounded-[4px] shadow-sm border border-[#e7e7e7]">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-bold text-[#0f1111]">
              Up to 60% off | Trending Deals & New Arrivals
            </h2>
            <span className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline cursor-pointer">
              Explore more
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trending.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ── Personalized Recommendation CTA (Bottom Bar) ─────────────── */}
        <div className="bg-white border-t border-b border-[#e7e7e7] p-8 text-center rounded-[4px]">
          <p className="text-xs text-[#0f1111] mb-2 font-normal">
            See personalized recommendations
          </p>
          <div className="max-w-xs mx-auto mb-2">
            <Link to="/orders" className="btn-amazon-primary w-full py-2 font-medium block">
              Sign in
            </Link>
          </div>
          <p className="text-[11px] text-[#565959]">
            New customer?{' '}
            <Link to="/orders" className="text-[#007185] hover:text-[#c7511f] hover:underline">
              Start here.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
