import { useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { searchProducts, categories } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { PrimeBadge } from '../components/ui/AmazonLogo';
import { Star } from 'lucide-react';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const initialCategory = params.get('category') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortKey>('featured');
  const [minRating, setMinRating] = useState(0);
  const [primeOnly, setPrimeOnly] = useState(false);

  const results = useMemo(() => {
    let items = searchProducts(query, selectedCategory || undefined);
    if (minRating > 0) items = items.filter((p) => p.rating >= minRating);
    switch (sort) {
      case 'price-asc':
        return [...items].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...items].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...items].sort((a, b) => b.rating - a.rating);
      default:
        return items;
    }
  }, [query, selectedCategory, minRating, sort]);

  return (
    <div className="bg-[#eaeded] min-h-screen pb-12">
      {/* ── Search Results Bar ───────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#d5d9d9] shadow-sm py-2.5 px-4 mb-4">
        <div className="max-w-[1500px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="text-[#565959]">
            <span>1-{results.length} of {results.length} results for </span>
            <span className="font-bold text-[#c7511f]">"{query || 'All Products'}"</span>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="search-sort" className="text-[#565959]">Sort by:</label>
            <select
              id="search-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-[#f0f2f2] hover:bg-[#e3e6e6] border border-[#d5d9d9] rounded-[8px] px-2.5 py-1 text-xs text-[#0f1111] shadow-inner outline-none cursor-pointer font-medium"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Avg. Customer Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Main Layout: Filters + Results ───────────────────────────────── */}
      <div className="max-w-[1500px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Filters */}
          <aside className="lg:col-span-3 bg-white p-4 rounded-[4px] border border-[#e7e7e7] shadow-sm text-xs space-y-5">
            {/* Prime */}
            <div>
              <h3 className="font-bold text-sm text-[#0f1111] mb-2">Amazon Prime</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={primeOnly}
                  onChange={(e) => setPrimeOnly(e.target.checked)}
                  className="rounded text-[#e77600] focus:ring-[#e77600]"
                />
                <PrimeBadge />
              </label>
            </div>

            {/* Delivery Day */}
            <div>
              <h3 className="font-bold text-sm text-[#0f1111] mb-2">Delivery Day</h3>
              <label className="flex items-center gap-2 text-[#0f1111] cursor-pointer">
                <input
                  type="checkbox"
                  checked={primeOnly}
                  onChange={(e) => setPrimeOnly(e.target.checked)}
                  className="rounded text-[#e77600] focus:ring-[#e77600]"
                />
                <span>Get It by Tomorrow</span>
              </label>
            </div>

            {/* Department */}
            <div>
              <h3 className="font-bold text-sm text-[#0f1111] mb-2">Department</h3>
              <ul className="space-y-1.5 text-[#007185]">
                <li
                  onClick={() => setSelectedCategory('')}
                  className={`hover:text-[#c7511f] hover:underline cursor-pointer ${
                    !selectedCategory ? 'font-bold text-[#0f1111]' : ''
                  }`}
                >
                  All Categories
                </li>
                {categories.map((c) => (
                  <li
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`hover:text-[#c7511f] hover:underline cursor-pointer ${
                      selectedCategory === c ? 'font-bold text-[#0f1111]' : ''
                    }`}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Review */}
            <div>
              <h3 className="font-bold text-sm text-[#0f1111] mb-2">Avg. Customer Review</h3>
              <div className="space-y-1">
                {[4, 3, 2, 1].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(minRating === r ? 0 : r)}
                    className={`flex items-center gap-1.5 hover:text-[#c7511f] cursor-pointer w-full text-left py-0.5 ${
                      minRating === r ? 'font-bold text-[#c7511f]' : 'text-[#0f1111]'
                    }`}
                  >
                    <div className="flex text-[#de7921]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${s <= r ? 'fill-[#de7921]' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span>& Up</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pay on Delivery */}
            <div>
              <h3 className="font-bold text-sm text-[#0f1111] mb-2">Payment</h3>
              <label className="flex items-center gap-2 text-[#0f1111] cursor-pointer">
                <input type="checkbox" className="rounded text-[#e77600] focus:ring-[#e77600]" />
                <span>Eligible for Pay On Delivery</span>
              </label>
            </div>
          </aside>

          {/* Results Grid */}
          <main className="lg:col-span-9">
            {results.length === 0 ? (
              <div className="bg-white p-12 rounded-[4px] border border-[#e7e7e7] text-center">
                <p className="text-base font-bold text-[#0f1111] mb-2">
                  No results for "{query}"
                </p>
                <p className="text-xs text-[#565959] mb-4">
                  Try checking your spelling or use more general terms
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {results.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
