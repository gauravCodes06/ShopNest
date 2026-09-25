import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../data/products';
import { useCartStore } from '../context/CartContext';
import { useWishlistStore } from '../context/WishlistContext';
import { formatPrice } from '../lib/utils';
import { StarRating } from '../components/ui/StarRating';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { ProductImage } from '../components/ui/ProductImage';
import { ProductCard } from '../components/products/ProductCard';
import {
  Heart,
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">Product Not Found</h2>
        <p className="text-slate-400 mb-8">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const currentImage = selectedImage || product.image;
  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product.id, quantity);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 overflow-x-auto pb-2">
        <Link to="/" className="hover:text-teal-400 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
        <Link
          to={`/category/${encodeURIComponent(product.category)}`}
          className="hover:text-teal-400 transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
        <span className="text-slate-200 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left: Gallery (5 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="card relative aspect-square bg-slate-900 border-slate-800 flex items-center justify-center overflow-hidden">
            <ProductImage
              src={currentImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300"
            />
            {discount && (
              <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
                Save {discount}%
              </span>
            )}
            <button
              onClick={() => toggle(product.id)}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                wishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-slate-900/80 text-slate-400 hover:text-red-400 hover:bg-slate-900'
              }`}
            >
              <Heart className="w-5 h-5" fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    currentImage === img
                      ? 'border-teal-400 shadow-md shadow-teal-500/20'
                      : 'border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Purchase (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <div className="inline-block bg-teal-500/10 text-teal-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-teal-500/20 mb-3">
              {product.category}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <StarRating rating={product.rating} count={product.reviewCount} size="md" />
              <span className="text-slate-600">|</span>
              <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock ({product.stock} available)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-baseline gap-3">
            <span className="text-3xl font-black text-white">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-base text-slate-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-xs font-bold text-orange-400">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm leading-relaxed">{product.description}</p>

          {/* Feature highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-200 mb-3">Key Features:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-300">Quantity:</span>
              <QuantitySelector
                value={quantity}
                min={1}
                max={Math.min(product.stock, 10)}
                onChange={setQuantity}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="btn-primary flex items-center justify-center gap-2 py-3.5"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-200" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                className="btn-teal flex items-center justify-center gap-2 py-3.5"
              >
                <Zap className="w-5 h-5" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-center">
            <div className="flex flex-col items-center gap-1 p-2 bg-slate-900/40 rounded-lg">
              <Truck className="w-5 h-5 text-teal-400" />
              <span className="text-xs text-slate-300 font-medium">Free Shipping</span>
              <span className="text-[10px] text-slate-500">Orders over $50</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 bg-slate-900/40 rounded-lg">
              <RotateCcw className="w-5 h-5 text-teal-400" />
              <span className="text-xs text-slate-300 font-medium">30 Days Return</span>
              <span className="text-[10px] text-slate-500">Hassle-free guarantee</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 bg-slate-900/40 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
              <span className="text-xs text-slate-300 font-medium">Safe Checkout</span>
              <span className="text-[10px] text-slate-500">Demo certified secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-100">Related Products</h2>
            <Link
              to={`/category/${encodeURIComponent(product.category)}`}
              className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors"
            >
              View all in {product.category} &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
