import { useParams, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { getProductsByCategory, products as allProducts } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { ChevronRight, Star, SlidersHorizontal, Check } from 'lucide-react';
import { formatPrice } from '../lib/utils';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export function CategoryPage() {
  const { category = '' } = useParams<{ category: string }>();
  const decodedCategory = decodeURIComponent(category);

  const [sort, setSort] = useState<SortKey>('featured');
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(100000);

  const allCategoryProducts = useMemo(() => {
    return getProductsByCategory(decodedCategory);
  }, [decodedCategory]);

  const filteredProducts = useMemo(() => {
    let list = [...allCategoryProducts];
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    if (inStockOnly) list = list.filter((p) => p.stock > 0);
    if (maxPrice < 100000) list = list.filter((p) => p.price <= maxPrice);

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
  }, [allCategoryProducts, minRating, inStockOnly, maxPrice, sort]);

  // Available categories for sidebar filter with accurate product counts
  const categoryFilters = useMemo(() => {
    const mainCategories = [
      { name: 'Mobiles', path: '/category/Mobiles' },
      { name: 'Computers', path: '/category/Computers' },
      { name: 'Electronics', path: '/category/Electronics' },
      { name: 'Fashion', path: '/category/Fashion' },
      { name: 'Home & Kitchen', path: '/category/Home%20%26%20Kitchen' },
      { name: 'Beauty', path: '/category/Beauty' },
      { name: 'Sports', path: '/category/Sports' },
      { name: 'Books', path: '/category/Books' },
    ];
    return mainCategories.map((c) => ({
      ...c,
      count: getProductsByCategory(c.name).length,
    }));
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16">
      {/* ── Breadcrumb & Category Title Header ───────────────────────── */}
      <div className="bg-white border-b border-slate-200/80 py-4 px-4 sm:px-6 lg:px-8 mb-6">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Link to="/" className="hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-slate-700 font-medium capitalize">
                {decodedCategory}
              </span>
            </div>
            {/* Title + Count matching reference Screen 2 */}
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight capitalize">
                {decodedCategory}
              </h1>
              <span className="text-xs font-semibold text-slate-500">
                {allCategoryProducts.length} products
              </span>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Sort by:</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer appearance-none pr-8"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content: Sidebar Filters + Products Grid ─────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Sidebar Filter Card (matching Screen 2) */}
          <aside className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                <span>Filters</span>
              </div>
              {(minRating > 0 || inStockOnly || maxPrice < 100000) && (
                <button
                  onClick={() => {
                    setMinRating(0);
                    setInStockOnly(false);
                    setMaxPrice(100000);
                  }}
                  className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer"
                >
                  Reset all
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                Category
              </h3>
              <ul className="space-y-2">
                {categoryFilters.map((cat, idx) => {
                  const isCurrent =
                    decodedCategory.toLowerCase().trim() === cat.name.toLowerCase().trim() ||
                    (cat.name === 'Home & Kitchen' && (decodedCategory.toLowerCase().includes('home') || decodedCategory.toLowerCase().includes('kitchen')));
                  return (
                    <li key={idx}>
                      <Link
                        to={cat.path}
                        className={`flex items-center justify-between text-xs py-1 px-1.5 rounded-lg transition-colors ${
                          isCurrent
                            ? 'text-emerald-700 font-bold bg-emerald-50/70'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center ${
                              isCurrent
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300'
                            }`}
                          >
                            {isCurrent && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </span>
                          <span>{cat.name}</span>
                        </span>
                        <span className="text-[11px] text-slate-400">({cat.count})</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                  Price Range
                </h3>
                <span className="text-xs font-bold text-slate-800">
                  Up to {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>₹500</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2.5">
                Rating
              </h3>
              <div className="space-y-1.5">
                {[4, 3, 2].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setMinRating(minRating === stars ? 0 : stars)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                      minRating === stars
                        ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < stars
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span>& up</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="border-t border-slate-100 pt-4">
              <label className="flex items-center justify-between text-xs text-slate-700 font-medium cursor-pointer">
                <span>Only in stock</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                />
              </label>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-subtle">
                <p className="text-slate-500 text-sm mb-4">
                  No products found matching your active filters.
                </p>
                <button
                  onClick={() => {
                    setMinRating(0);
                    setInStockOnly(false);
                    setMaxPrice(100000);
                  }}
                  className="btn-sage inline-flex px-5 py-2 text-xs"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
