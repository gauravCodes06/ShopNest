import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/product';
import { ProductImage } from '../ui/ProductImage';
import { useCartStore } from '../../context/CartContext';
import { useWishlistStore } from '../../context/WishlistContext';
import { formatPrice } from '../../lib/utils';
import { Heart, Check, Star, ShoppingCart, Zap } from 'lucide-react';
import { useState } from 'react';

import { useLanguage } from '../../context/LanguageContext';

interface Props {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: Props) {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();
  const { t } = useLanguage();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const isTopRated  = product.rating >= 4.7;
  const isBestSell  = product.reviewCount > 5000;
  const isLowStock  = product.stock > 0 && product.stock <= 5;

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-2xl border border-slate-200/70 hover:border-emerald-300/60 hover:shadow-card-hover transition-all duration-250 flex flex-col cursor-pointer overflow-hidden"
      style={{ transition: 'border-color 0.2s, box-shadow 0.25s, transform 0.2s' }}
    >
      {/* ── Subtle top gradient accent on hover ── */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* ── Image Container ── */}
      <div className="relative bg-gradient-to-b from-slate-50/80 to-slate-100/40 overflow-hidden">
        {/* Badges row */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
          {isTopRated && (
            <span className="inline-flex items-center gap-1 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
              ★ {t('topRatedBadge', 'Top Rated')}
            </span>
          )}
          {isBestSell && !isTopRated && (
            <span className="inline-flex items-center bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {t('bestSeller', 'Best Seller')}
            </span>
          )}
          {isLowStock && (
            <span className="inline-flex items-center gap-0.5 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {t('onlyLeft', 'Only')} {product.stock} {t('leftInStock', 'left')}
            </span>
          )}
        </div>

        {/* Discount badge */}
        {discount && discount > 0 && (
          <div className="absolute top-2.5 right-10 z-10">
            <span className="inline-flex bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          </div>
        )}

        {/* Wishlist heart */}
        <button
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(e) => { e.stopPropagation(); toggle(product.id); }}
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white shadow-card border border-slate-200/80 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-200/80 hover:bg-rose-50 transition-all duration-150"
        >
          <Heart className={`w-3.5 h-3.5 transition-all ${wishlisted ? 'text-rose-500 fill-rose-500 scale-110' : ''}`} />
        </button>

        {/* Product image */}
        <div className="aspect-square w-full p-5 flex items-center justify-center overflow-hidden">
          <ProductImage
            src={product.image}
            alt={product.name}
            className={`max-h-full max-w-full object-contain transition-transform duration-350 ${hovered ? 'scale-110' : 'scale-100'}`}
          />
        </div>

        {/* Quick add overlay on hover */}
        {!compact && product.stock > 0 && (
          <div className={`absolute inset-x-0 bottom-0 transition-all duration-200 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <button
              onClick={handleAddToCart}
              className="w-full bg-slate-900/90 backdrop-blur-sm text-white text-[11px] font-bold py-2 flex items-center justify-center gap-1.5 hover:bg-emerald-700 transition-colors"
            >
              {added ? (
                <><Check className="w-3.5 h-3.5 stroke-[3]" /> {t('added', 'Added!')}</>
              ) : (
                <><ShoppingCart className="w-3.5 h-3.5" /> {t('quickAdd', 'Quick Add')}</>
              )}
            </button>
          </div>
        )}
      </div>

      {/* ── Info Section ── */}
      <div className="flex flex-col flex-1 p-3.5 gap-2">
        {/* Brand/Category label */}
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="text-[13px] font-semibold text-slate-800 group-hover:text-emerald-700 line-clamp-2 leading-snug transition-colors tracking-snug">
          {product.name}
        </h3>

        {/* Rating row */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 transition-colors ${
                  i < Math.round(product.rating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-200 fill-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-bold text-slate-700">{product.rating.toFixed(1)}</span>
          <span className="text-[11px] text-slate-400">
            ({product.reviewCount > 1000 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount})
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-center flex-wrap gap-1.5 mt-auto">
          <span className="text-[15px] font-extrabold text-slate-900 tracking-tight">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-slate-400 line-through font-medium">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Free delivery indicator */}
        {product.price >= 499 && (
          <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <Zap className="w-3 h-3" /> {t('freeDeliveryBadge', 'Free Delivery')}
          </p>
        )}

        {/* Add to Cart button */}
        {!compact && (
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`mt-1 w-full py-2.5 text-[12px] font-bold rounded-xl transition-all duration-150 active:scale-[0.97] flex items-center justify-center gap-1.5 cursor-pointer tracking-tight ${
              added
                ? 'btn-add-to-cart btn-added'
                : product.stock === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'btn-add-to-cart'
            }`}
          >
            {added ? (
              <><Check className="w-3.5 h-3.5 stroke-[3]" /> {t('addedToCart', 'Added to Cart')}</>
            ) : product.stock === 0 ? (
              t('outOfStock', 'Out of Stock')
            ) : (
              <><ShoppingCart className="w-3.5 h-3.5" /> {t('addToCart', 'Add to Cart')}</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
