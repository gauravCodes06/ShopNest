import { useParams, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { getProductsByCategory, categories } from '../data/products';
import { ProductGrid } from '../components/products/ProductGrid';
import { SlidersHorizontal, ArrowLeft } from 'lucide-react';

type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'rating';

export function CategoryPage() {
  const { category = '' } = useParams<{ category: string }>();
  const decodedCategory = decodeURIComponent(category);

  const [sort, setSort] = useState<SortKey>('relevance');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allCategoryProducts = useMemo(() => {
    return getProductsByCategory(decodedCategory);
  }, [decodedCategory]);

  const filteredProducts = useMemo(() => {
    let list = [...allCategoryProducts];
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    if (maxPrice < 2000) list = list.filter((p) => p.price <= maxPrice);

    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [allCategoryProducts, minRating, maxPrice, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{decodedCategory}</h1>
          <p className="text-slate-400 text-sm mt-1">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} available
          </p>
        </div>

        {/* Sort and mobile filter toggle */}
        <div className="flex items-center gap-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500"
          >
            <option value="relevance">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="sm:hidden flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 hover:border-teal-500 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`lg:block ${
            filtersOpen ? 'block' : 'hidden'
          } space-y-6 bg-slate-900 border border-slate-800 rounded-xl p-5 h-fit`}
        >
          <div>
            <h3 className="text-sm font-semibold text-slate-200 mb-3">Other Categories</h3>
            <ul className="space-y-1.5 text-sm">
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/category/${encodeURIComponent(c)}`}
                    className={`block px-2.5 py-1.5 rounded-lg transition-colors ${
                      c === decodedCategory
                        ? 'bg-teal-500/10 text-teal-400 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-sm font-semibold text-slate-200 mb-2">Max Price (${maxPrice})</h3>
            <input
              type="range"
              min={20}
              max={2000}
              step={20}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-teal-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>$20</span>
              <span>$2,000</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-sm font-semibold text-slate-200 mb-2">Minimum Rating</h3>
            <div className="space-y-1.5">
              {[4, 3, 2, 0].map((star) => (
                <label key={star} className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
                  <input
                    type="radio"
                    name="categoryRating"
                    checked={minRating === star}
                    onChange={() => setMinRating(star)}
                    className="accent-teal-500"
                  />
                  <span>{star === 0 ? 'All ratings' : `${star} stars & above`}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
          <ProductGrid products={filteredProducts} cols={3} />
        </main>
      </div>
    </div>
  );
}
