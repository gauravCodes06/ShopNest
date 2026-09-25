import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck, RotateCcw } from 'lucide-react';
import { getFeaturedProducts, getDeals, getTrendingProducts, categories } from '../data/products';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductCard } from '../components/products/ProductCard';
import { useState } from 'react';

const categoryIcons: Record<string, string> = {
  Electronics: '⚡',
  Fashion: '👗',
  'Home & Living': '🏠',
  Accessories: '💎',
  Beauty: '✨',
  Sports: '🏃',
};

export function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const featured = getFeaturedProducts();
  const deals = getDeals();
  const trending = getTrendingProducts();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-slate-900 to-slate-950 py-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <Zap className="w-3 h-3" /> New arrivals every week
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              Discover More.<br />
              <span className="text-teal-400">Shop Smarter.</span>
            </h1>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Thousands of premium products across every category. Free shipping on orders over $50.
            </p>

            {/* Hero search */}
            <form
              onSubmit={(e) => { e.preventDefault(); if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`); }}
              className="flex gap-3 max-w-lg"
            >
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="flex-1 bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-xl px-5 py-3.5 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors backdrop-blur-sm"
              />
              <button type="submit" className="btn-primary rounded-xl px-6">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, text: 'Free shipping over $50' },
              { icon: Shield, text: 'Secure demo checkout' },
              { icon: RotateCcw, text: '30-day returns' },
              { icon: Zap, text: '1000+ products' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-slate-400">
                <Icon className="w-5 h-5 text-teal-400 shrink-0" />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* Categories */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-slate-100 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${encodeURIComponent(cat)}`}
                className="group flex flex-col items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-teal-500/50 hover:bg-slate-800/80 transition-all duration-200"
              >
                <span className="text-2xl">{categoryIcons[cat] || '📦'}</span>
                <span className="text-xs font-medium text-slate-400 group-hover:text-teal-400 text-center transition-colors leading-tight">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Deals */}
        <section className="py-8 border-t border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Today's Deals</h2>
              <p className="text-slate-500 text-sm mt-1">Limited time discounts on top products</p>
            </div>
            <Link to="/search?sort=discount" className="flex items-center gap-1 text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {deals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Featured */}
        <section className="py-8 border-t border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Featured Products</h2>
              <p className="text-slate-500 text-sm mt-1">Highest rated products in our catalog</p>
            </div>
            <Link to="/search" className="flex items-center gap-1 text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
              Browse all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ProductGrid products={featured} cols={4} />
        </section>

        {/* Trending */}
        <section className="py-8 border-t border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-100">Trending Now</h2>
            <Link to="/search?sort=reviews" className="flex items-center gap-1 text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
              See more <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ProductGrid products={trending} cols={4} />
        </section>
      </div>
    </div>
  );
}
