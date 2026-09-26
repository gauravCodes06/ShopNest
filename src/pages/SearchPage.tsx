import { useSearchParams, Link } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { searchProducts } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { ChevronRight, Star, SlidersHorizontal, Check } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { useLanguage } from '../context/LanguageContext';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export function SearchPage() {
  const { t } = useLanguage();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const initialCategory = params.get('category') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortKey>('featured');
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(100000);

  // Synchronize category state when URL changes (e.g. from drawer, header or back button)
  useEffect(() => {
    setSelectedCategory(params.get('category') || '');
  }, [params]);

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(params);
    if (catId) {
      newParams.set('category', catId);
    } else {
      newParams.delete('category');
    }
    setParams(newParams);
  };

  const categories = [
    { id: '', label: t('allCategories', 'All Categories') },
    { id: 'Mobiles', label: t('catMobiles', 'Mobiles') },
    { id: 'Computers', label: 'Computers & Laptops' },
    { id: 'Electronics', label: t('catElectronics', 'Electronics') },
    { id: 'Fashion', label: t('catFashion', 'Fashion') },
    { id: 'Home & Kitchen', label: 'Home & Kitchen' },
    { id: 'Beauty', label: t('catBeauty', 'Beauty') },
    { id: 'Sports', label: t('catSports', 'Sports') },
    { id: 'Books', label: 'Books' },
  ];

  const { results, isFallbackCategory } = useMemo(() => {
    let items = searchProducts(query, selectedCategory || undefined);
    let fallback = false;

    // If query has 0 results in the selected category, show the category products rather than empty screen
    if (items.length === 0 && selectedCategory) {
      items = searchProducts('', selectedCategory);
      fallback = true;
    }

    if (minRating > 0) items = items.filter((p) => p.rating >= minRating);
    if (inStockOnly) items = items.filter((p) => p.stock > 0);
    if (maxPrice < 100000) items = items.filter((p) => p.price <= maxPrice);

    const sorted = [...items];
    switch (sort) {
      case 'price-asc':  sorted.sort((a, b) => a.price - b.price); break;
      case 'price-desc': sorted.sort((a, b) => b.price - a.price); break;
      case 'rating':     sorted.sort((a, b) => b.rating - a.rating); break;
      default:           break;
    }

    return { results: sorted, isFallbackCategory: fallback };
  }, [query, selectedCategory, minRating, inStockOnly, maxPrice, sort]);

  const resetFilters = () => {
    setMinRating(0);
    setInStockOnly(false);
    setMaxPrice(100000);
    setSelectedCategory('');
    const newParams = new URLSearchParams(params);
    newParams.delete('category');
    setParams(newParams);
  };

  return (
    <div className="bg-[#F5F6F8] min-h-screen pb-16">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-100" style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.05)' }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-slate-700 font-medium">{t('searchResults', 'Search Results')}</span>
            </div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {query ? `${t('searchResultsFor', 'Results for')} "${query}"` : selectedCategory ? `${selectedCategory}` : t('allCategories', 'All Products')}
              </h1>
              <span className="text-xs font-semibold text-slate-500">
                {results.length} {t('productsFound', 'products found')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">{t('sortBy', 'Sort by')}:</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer appearance-none pr-8"
              >
                <option value="featured">{t('featured', 'Featured')}</option>
                <option value="price-asc">{t('priceLowHigh', 'Price: Low to High')}</option>
                <option value="price-desc">{t('priceHighLow', 'Price: High to Low')}</option>
                <option value="rating">{t('topRatedSort', 'Top Rated')}</option>
              </select>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Filters + Results */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                <span>{t('filters', 'Filters')}</span>
              </div>
              {(minRating > 0 || inStockOnly || maxPrice < 100000 || selectedCategory) && (
                <button onClick={resetFilters} className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer">
                  {t('clearFilters', 'Reset all')}
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2.5">{t('category', 'Category')}</h3>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const active = cat.id ? selectedCategory === cat.id : !selectedCategory;
                  return (
                    <button
                      key={cat.id || 'all'}
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-lg transition-colors text-left cursor-pointer ${
                        active ? 'text-emerald-700 font-bold bg-emerald-50/70' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {active && <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">{t('maxPriceLabel', 'Price Range')}</h3>
                <span className="text-xs font-bold text-slate-800">Up to {formatPrice(maxPrice)}</span>
              </div>
              <input type="range" min="500" max="100000" step="500" value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer" />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>₹500</span><span>₹1,00,000</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2.5">{t('minRatingLabel', 'Rating')}</h3>
              <div className="space-y-1.5">
                {[4, 3, 2].map((stars) => (
                  <button key={stars} onClick={() => setMinRating(minRating === stars ? 0 : stars)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                      minRating === stars ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200' : 'text-slate-600 hover:bg-slate-50'
                    }`}>
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < stars ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      <span>& up</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock Filter */}
            <div className="border-t border-slate-100 pt-4">
              <label className="flex items-center justify-between text-xs text-slate-700 font-medium cursor-pointer">
                <span>{t('inStockOnlyLabel', 'Only in stock')}</span>
                <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 cursor-pointer" />
              </label>
            </div>
          </aside>

          {/* Results Grid */}
          <main className="lg:col-span-9">
            {isFallbackCategory && (
              <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div>
                  <p className="text-xs font-bold text-amber-900">
                    No products matching "{query}" found in {selectedCategory}.
                  </p>
                  <p className="text-[11px] text-amber-700 mt-0.5">
                    Showing all products in <strong>{selectedCategory}</strong> instead.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="px-3 py-1.5 bg-white border border-amber-300 text-amber-900 rounded-xl text-xs font-bold hover:bg-amber-100 transition-colors cursor-pointer shadow-xs"
                  >
                    Search "{query}" in All Categories
                  </button>
                  <button
                    onClick={() => {
                      setParams(selectedCategory ? { category: selectedCategory } : {});
                    }}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
                  >
                    Browse {selectedCategory} Only
                  </button>
                </div>
              </div>
            )}

            {results.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-subtle">
                <p className="text-slate-700 font-semibold mb-2">{t('noResultsFound', 'No matching products found')}</p>
                <p className="text-slate-400 text-xs mb-4">{t('noResultsDesc', 'Try checking your spelling or adjusting your filter criteria.')}</p>
                <button onClick={resetFilters} className="btn-sage inline-flex px-5 py-2 text-xs">
                  {t('clearFilters', 'Clear All Filters')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {results.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
