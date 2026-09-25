import { Link } from 'react-router-dom';
import { useWishlistStore } from '../context/WishlistContext';
import { useCartStore } from '../context/CartContext';
import { getProductById } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { Heart, ArrowRight, ShoppingCart, Trash2 } from 'lucide-react';

export function WishlistPage() {
  const { ids, toggle } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  const wishlistedProducts = ids
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach((p) => addItem(p.id, 1));
  };

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-500">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Your Wishlist is Empty</h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Save your favorite products to keep track of deals, stock, and future buys.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          Discover Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Your Wishlist</h1>
          <p className="text-slate-400 text-sm mt-1">
            {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddAllToCart}
            className="btn-primary flex items-center gap-2 text-sm py-2.5 px-4"
          >
            <ShoppingCart className="w-4 h-4" /> Add All to Cart
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
