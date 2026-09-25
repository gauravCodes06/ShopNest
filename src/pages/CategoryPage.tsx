import { useParams, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { getProductsByCategory, categories } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { PrimeBadge } from '../components/ui/AmazonLogo';
import { ChevronRight, Star } from 'lucide-react';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export function CategoryPage() {
  const { category = '' } = useParams<{ category: string }>();
  const decodedCategory = decodeURIComponent(category);

  const [sort, setSort] = useState<SortKey>('featured');
  const [minRating, setMinRating] = useState(0);
  const [primeOnly, setPrimeOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  const allCategoryProducts = useMemo(() => {
    return getProductsByCategory(decodedCategory);
  }, [decodedCategory]);

  const filteredProducts = useMemo(() => {
    let list = [...allCategoryProducts];
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    if (inStockOnly) list = list.filter((p) => p.stock > 0);

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
  }, [allCategoryProducts, minRating, inStockOnly, sort]);

  return (
    <div className="bg-[#eaeded] min-h-screen pb-12">
      {/* ── Amazon Search & Result Count Bar ─────────────────────────────── */}
      <div className="bg-white border-b border-[#d5d9d9] shadow-sm py-2.5 px-4 mb-4">
        <div className="max-w-[1500px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="text-[#565959]">
            <span>1-{filteredProducts.length} of {allCategoryProducts.length} results for </span>
            <span className="font-bold text-[#c7511f]">"{decodedCategory}"</span>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-[#565959]">Sort by:</label>
            <select
              id="sort-select"
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

      {/* ── Main Category Content: Filters + Product Grid ─────────────────── */}
      <div className="max-w-[1500px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Sidebar Filters (cols 1-3) */}
          <aside className="lg:col-span-3 bg-white p-4 rounded-[4px] border border-[#e7e7e7] shadow-sm text-xs space-y-5">
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

            {/* Amazon Prime */}
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

            {/* Department */}
            <div>
              <h3 className="font-bold text-sm text-[#0f1111] mb-2">Department</h3>
              <ul className="space-y-1.5 text-[#007185]">
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      to={`/category/${encodeURIComponent(c)}`}
                      className={`hover:text-[#c7511f] hover:underline block ${
                        c === decodedCategory ? 'font-bold text-[#0f1111]' : ''
                      }`}
                    >
                      {c}
                    </Link>
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

            {/* Availability */}
            <div>
              <h3 className="font-bold text-sm text-[#0f1111] mb-2">Availability</h3>
              <label className="flex items-center gap-2 text-[#0f1111] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#e77600] focus:ring-[#e77600]"
                />
                <span>Include Out of Stock</span>
              </label>
            </div>
          </aside>

          {/* Product Grid (cols 4-12) */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-[4px] border border-[#e7e7e7] text-center">
                <p className="text-base font-bold text-[#0f1111] mb-2">No matching products found</p>
                <p className="text-xs text-[#565959] mb-4">Try clearing some filters to see more results.</p>
                <button
                  onClick={() => {
                    setMinRating(0);
                    setPrimeOnly(false);
                    setInStockOnly(false);
                  }}
                  className="btn-amazon-primary px-6 py-2 text-xs"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((p) => (
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
