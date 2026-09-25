import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/product';
import { ProductImage } from '../ui/ProductImage';
import { StarRating } from '../ui/StarRating';
import { useCartStore } from '../../context/CartContext';
import { useWishlistStore } from '../../context/WishlistContext';
import { formatPrice } from '../../lib/utils';
import { ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();
  const [added, setAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="card group cursor-pointer hover:border-slate-600 transition-all duration-200 hover:shadow-lg hover:shadow-black/30 flex flex-col"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-800">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            -{discount}%
          </span>
        )}
        <button
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(e) => { e.stopPropagation(); toggle(product.id); }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            wishlisted
              ? 'bg-red-500/90 text-white'
              : 'bg-slate-900/70 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-red-400'
          }`}
        >
          <Heart className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="text-xs text-teal-400 font-medium uppercase tracking-wide">{product.category}</p>
        <h3 className="text-sm font-semibold text-slate-100 line-clamp-2 leading-snug group-hover:text-teal-300 transition-colors">
          {product.name}
        </h3>
        <StarRating rating={product.rating} count={product.reviewCount} />

        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className="text-lg font-bold text-slate-100">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-500 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            added
              ? 'bg-teal-500 text-white'
              : product.stock === 0
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 text-white active:scale-95'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {added ? 'Added!' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
