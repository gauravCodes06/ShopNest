import { useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { searchProducts, categories } from '../data/products';
import { ProductGrid } from '../components/products/ProductGrid';
import { SlidersHorizontal, X } from 'lucide-react';

type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'rating';

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortKey>('relevance');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    let items = searchProducts(query, selectedCategory || undefined);
    if (minRating > 0) items = items.filter((p) => p.rating >= minRating);
    if (maxPrice < 2000) items = items.filter((p) => p.price <= maxPrice);
    switch (sort) {
      case 'price-asc': return [...items].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...items].sort((a, b) => b.price - a.price);
      case 'rating': return [...items].sort((a, b) => b.rating - a.rating);
      default: return items;
    }
  }, [query, selectedCategory, maxPrice, minRating, sort]);

  const clearFilters = () => {
    setSelectedCategory('');
    setMaxPrice(2000);
    setMinRating(0);
    setSort('relevance');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-100">
            {query ? `Results for "${query}"` : 'All Products'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">{results.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 hover:border-teal-500 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filters */}
        <aside className={`${filtersOpen ? 'block' : 'hidden'} lg:block w-56 shrink-0`}>
          <div className="card p-4 sticky top-24 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-200 text-sm">Filters</h3>
              <button onClick={clearFilters} className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1">
                <X className="w-3 h-3" /> Clear
              </button>
            </div>

            {/* Category */}
            <div>
              <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Category</h4>
              <div className="space-y-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="cat" checked={!selectedCategory} onChange={() => setSelectedCategory('')}
                    className="accent-teal-500" />
                  <span className="text-sm text-slate-300">All</span>
                </label>
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="cat" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)}
                      className="accent-teal-500" />
                    <span className="text-sm text-slate-300">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Max Price</h4>
              <input
                type="range" min={10} max={2000} step={10} value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-teal-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>$0</span><span>${maxPrice === 2000 ? 'Any' : `$${maxPrice}`}</span>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Min Rating</h4>
              <div className="space-y-1">
                {[0, 4, 4.5].map((r) => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)}
                      className="accent-teal-500" />
                    <span className="text-sm text-slate-300">{r === 0 ? 'Any' : `${r}★ & up`}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <ProductGrid products={results} cols={3} />
        </div>
      </div>
    </div>
  );
}
