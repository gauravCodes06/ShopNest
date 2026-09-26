import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface Brand {
  name: string;
  logo: string;
  tag: string;
  discount: string;
  bg: string;
  to: string;
}

const BRANDS: Brand[] = [
  {
    name: 'Samsung',
    logo: 'https://m.media-amazon.com/images/I/71geVdy6-OS.jpg',
    tag: 'Galaxy AI & Display',
    discount: 'Up to 40% off',
    bg: 'from-blue-50 to-blue-100/60',
    to: '/search?q=samsung',
  },
  {
    name: 'Puma',
    logo: 'https://m.media-amazon.com/images/I/71D9ImsvEtL.jpg',
    tag: 'Sneakers & Sportswear',
    discount: 'Min 40% off',
    bg: 'from-slate-50 to-slate-100/60',
    to: '/search?q=puma',
  },
  {
    name: 'Apple',
    logo: 'https://m.media-amazon.com/images/I/71jG+e7roXL.jpg',
    tag: 'MacBook & iPhone',
    discount: 'Up to ₹10,000 off',
    bg: 'from-zinc-50 to-zinc-100/60',
    to: '/search?q=apple',
  },
  {
    name: "Levi's",
    logo: 'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp',
    tag: "Men's Jackets & Denim",
    discount: 'Up to 60% off',
    bg: 'from-indigo-50 to-indigo-100/60',
    to: '/search?q=levis',
  },
  {
    name: 'Minimalist',
    logo: 'https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-shea-butter-body-wash/thumbnail.webp',
    tag: 'Dermatology Serums',
    discount: 'Flat 30% off',
    bg: 'from-green-50 to-green-100/60',
    to: '/search?q=minimalist',
  },
  {
    name: 'Pigeon',
    logo: 'https://m.media-amazon.com/images/I/81O+GNdkzKL.jpg',
    tag: 'Non-stick Cookware',
    discount: 'Up to 55% off',
    bg: 'from-orange-50 to-orange-100/60',
    to: '/search?q=cookware',
  },
];

export function TrendingBrands() {
  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Trending Brands
          </h2>
        </div>
        <Link
          to="/search?q=brands"
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
        >
          <span>All Brands</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {BRANDS.map((brand, idx) => (
          <Link
            key={idx}
            to={brand.to}
            className={`group bg-gradient-to-br ${brand.bg} rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col`}
          >
            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden bg-white/60 p-2 flex items-center justify-center">
              <img
                src={brand.logo}
                alt={brand.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col gap-0.5">
              <p className="text-xs font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                {brand.name}
              </p>
              <p className="text-[10px] text-slate-500 font-medium">{brand.tag}</p>
              <p className="text-[10px] font-bold text-emerald-600 mt-0.5">{brand.discount}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
