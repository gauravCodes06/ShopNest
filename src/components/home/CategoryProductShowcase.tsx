import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import type { Product } from '../../types/product';
import { ProductCard } from '../products/ProductCard';
import { useLanguage } from '../../context/LanguageContext';

interface CategorySectionConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  badge?: string;
  linkTo: string;
  filterFn: (p: Product) => boolean;
}

interface Props {
  products: Product[];
}

export function CategoryProductShowcase({ products }: Props) {
  const { t } = useLanguage();

  const sections: CategorySectionConfig[] = [
    {
      id: 'mobiles',
      title: 'Flagship Smartphones & 5G Mobiles',
      subtitle: 'Apple iPhone, Samsung Galaxy, OnePlus, Pixel & Xiaomi flagship smartphones',
      icon: '📱',
      badge: '100% Mobiles Only',
      linkTo: '/category/Mobiles',
      filterFn: (p) => p.category === 'Mobiles',
    },
    {
      id: 'computers',
      title: 'High-Performance Laptops & Desktops',
      subtitle: 'Apple MacBooks, Dell XPS, ASUS ROG gaming laptops & Keychron mechanical gear',
      icon: '💻',
      badge: 'Computers & PCs',
      linkTo: '/category/Computers',
      filterFn: (p) => p.category === 'Computers',
    },
    {
      id: 'electronics',
      title: 'Audio, Headphones & Smart Home Tech',
      subtitle: 'Sony ANC headphones, Apple AirPods Pro, Echo Dot Alexa & Galaxy Smartwatches',
      icon: '🎧',
      badge: 'Up to 60% off',
      linkTo: '/category/Electronics',
      filterFn: (p) => p.category === 'Electronics',
    },
    {
      id: 'fashion',
      title: 'Fashion, Apparel & Footwear Trends',
      subtitle: 'Puma sneakers, formal linen shirts, ANNI ethnic kurtis & luxury totes',
      icon: '👗',
      badge: 'Min. 40% Off',
      linkTo: '/category/Fashion',
      filterFn: (p) => p.category === 'Fashion',
    },
    {
      id: 'home-kitchen',
      title: 'Home, Kitchen & Cookware Essentials',
      subtitle: 'Prestige mixer grinders, non-stick cookware woks & countertop appliances',
      icon: '🍳',
      badge: 'Starting ₹399',
      linkTo: '/category/Home%20%26%20Kitchen',
      filterFn: (p) => p.category === 'Home & Kitchen',
    },
    {
      id: 'beauty',
      title: 'Beauty, Skincare & Luxury Cosmetics',
      subtitle: 'Essence false lash mascaras, eyeshadow palettes, matte lipsticks & lotions',
      icon: '✨',
      badge: 'Glow Deals',
      linkTo: '/category/Beauty',
      filterFn: (p) => p.category === 'Beauty',
    },
    {
      id: 'sports',
      title: 'Sports Gear, Fitness & Outdoor Games',
      subtitle: 'English willow cricket bats, match basketballs, baseball gloves & shuttlecocks',
      icon: '🏏',
      badge: 'Match Ready',
      linkTo: '/category/Sports',
      filterFn: (p) => p.category === 'Sports',
    },
    {
      id: 'books',
      title: 'Bestselling Books & Mindset Classics',
      subtitle: 'Atomic Habits, The Psychology of Money, Ikigai, Rich Dad Poor Dad & more',
      icon: '📚',
      badge: 'Bestsellers',
      linkTo: '/category/Books',
      filterFn: (p) => p.category === 'Books',
    },
  ];

  return (
    <div className="space-y-12">
      {sections.map((sec) => {
        const secProducts = products.filter(sec.filterFn);
        if (secProducts.length === 0) return null;

        return (
          <SectionShelf
            key={sec.id}
            config={sec}
            products={secProducts.slice(0, 12)}
            t={t}
          />
        );
      })}
    </div>
  );
}

function SectionShelf({
  config,
  products,
  t,
}: {
  config: CategorySectionConfig;
  products: Product[];
  t: (key: string, fallback: string) => string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
      {/* ── Section Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="text-xl sm:text-2xl">{config.icon}</span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {t(config.id, config.title)}
            </h2>
            {config.badge && (
              <span className="hidden sm:inline-flex bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {config.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-medium pl-8 sm:pl-9">
            {config.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Scroll arrow buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 shadow-xs flex items-center justify-center text-slate-700 transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 shadow-xs flex items-center justify-center text-slate-700 transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <Link
            to={config.linkTo}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors group ml-2"
          >
            <span>{t('seeAllDeals', 'See All')}</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── Product Carousel Row ── */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[230px] sm:w-[250px] shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
