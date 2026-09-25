import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/product';
import { ProductImage } from '../ui/ProductImage';
import { StarRating } from '../ui/StarRating';
import { PrimeBadge } from '../ui/AmazonLogo';
import { useCartStore } from '../../context/CartContext';
import { useWishlistStore } from '../../context/WishlistContext';
import { formatPrice } from '../../lib/utils';
import { Heart, Check } from 'lucide-react';
import { useState } from 'react';

interface Props {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: Props) {
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
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white border border-[#e7e7e7] hover:border-[#bbb] hover:shadow-lg transition-all duration-200 flex flex-col p-4 relative group cursor-pointer rounded-[4px]"
    >
      {/* Wishlist Heart */}
      <button
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        onClick={(e) => {
          e.stopPropagation();
          toggle(product.id);
        }}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#cc0c39] hover:border-[#cc0c39] transition-all shadow-sm"
      >
        <Heart
          className={`w-4 h-4 ${wishlisted ? 'text-[#cc0c39] fill-[#cc0c39]' : ''}`}
        />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square w-full mb-3 flex items-center justify-center overflow-hidden bg-white">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {product.rating >= 4.7 && (
          <span className="absolute top-0 left-0 bg-[#232f3e] text-white text-[10px] font-bold px-2 py-0.5 rounded-r-[2px]">
            Amazon's <span className="text-[#febd69]">Choice</span>
          </span>
        )}
      </div>

      {/* Info Section */}
      <div className="flex flex-col flex-1 gap-1">
        {/* Title */}
        <h3 className="text-sm font-normal text-[#0f1111] group-hover:text-[#c7511f] line-clamp-2 leading-snug transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <StarRating rating={product.rating} count={product.reviewCount} />

        {/* Bought Count */}
        <p className="text-[11px] text-[#565959]">500+ bought in past month</p>

        {/* Deal Badge (if high discount) */}
        {discount && discount >= 20 && (
          <div className="flex items-center gap-1.5 my-0.5">
            <span className="bg-[#cc0c39] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-[2px]">
              Limited time deal
            </span>
          </div>
        )}

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mt-1">
          {discount && (
            <span className="text-sm text-[#cc0c39] font-light">-{discount}%</span>
          )}
          <span className="text-xl font-medium text-[#0f1111] tracking-tight">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#565959] line-through">
              M.R.P.: {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Prime & Delivery */}
        <div className="flex items-center gap-2 mt-0.5">
          <PrimeBadge />
        </div>
        <p className="text-xs text-[#0f1111]">
          Get it by <span className="font-bold">Tomorrow, 11 AM</span>
        </p>
        <p className="text-xs text-[#565959]">FREE Delivery by Amazon</p>

        {/* Add to Cart button */}
        {!compact && (
          <div className="mt-3 pt-1">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-1.5 px-4 text-xs font-normal rounded-full transition-colors shadow-sm flex items-center justify-center gap-1 cursor-pointer ${
                added
                  ? 'bg-[#007600] text-white border border-[#007600]'
                  : product.stock === 0
                  ? 'bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed'
                  : 'bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] border border-[#fcd200]'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Added to Cart
                </>
              ) : product.stock === 0 ? (
                'Out of Stock'
              ) : (
                'Add to cart'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
