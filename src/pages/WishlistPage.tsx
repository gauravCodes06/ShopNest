import { Link } from 'react-router-dom';
import { useWishlistStore } from '../context/WishlistContext';
import { useCartStore } from '../context/CartContext';
import { getProductById } from '../data/products';
import { formatPrice } from '../lib/utils';
import { StarRating } from '../components/ui/StarRating';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';

export function WishlistPage() {
  const { ids, toggle } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  const wishlistProducts = ids.map((id) => getProductById(id)).filter(Boolean);

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-[4px] border border-[#d5d9d9] shadow-sm text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-[#0f1111] mb-2">Your Wish List is empty</h1>
          <p className="text-xs text-[#565959] mb-6">
            Explore products and tap the heart icon on items you love to save them for later.
          </p>
          <Link to="/" className="btn-amazon-primary inline-flex px-6 py-2 text-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-[4px] border border-[#d5d9d9] shadow-sm">
        <div className="flex items-center justify-between border-b border-[#e7e7e7] pb-4 mb-4">
          <h1 className="text-2xl font-bold text-[#0f1111]">Your Wish List</h1>
          <span className="text-xs text-[#565959]">{wishlistProducts.length} items</span>
        </div>

        <div className="divide-y divide-[#e7e7e7]">
          {wishlistProducts.map((p) => {
            if (!p) return null;
            return (
              <div key={p.id} className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Link to={`/product/${p.id}`} className="w-24 h-24 p-2 bg-white border border-gray-100 rounded shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                  </Link>
                  <div>
                    <Link
                      to={`/product/${p.id}`}
                      className="text-sm font-medium text-[#007185] hover:text-[#c7511f] hover:underline line-clamp-2"
                    >
                      {p.name}
                    </Link>
                    <div className="my-1">
                      <StarRating rating={p.rating} count={p.reviewCount} />
                    </div>
                    <p className="text-base font-bold text-[#0f1111]">{formatPrice(p.price)}</p>
                    <p className="text-xs text-[#007600] font-medium">In stock</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => addItem(p.id)}
                    className="btn-amazon-primary px-4 py-1.5 text-xs font-normal"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toggle(p.id)}
                    className="p-2 text-gray-400 hover:text-[#cc0c39] border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                    aria-label="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
