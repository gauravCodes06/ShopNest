import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../data/products';
import { useCartStore } from '../context/CartContext';
import { useWishlistStore } from '../../src/context/WishlistContext';
import { formatPrice } from '../lib/utils';
import { StarRating } from '../components/ui/StarRating';
import { PrimeBadge } from '../components/ui/AmazonLogo';
import { ProductCard } from '../components/products/ProductCard';
import {
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
  MapPin,
  Lock,
  Tag,
  CreditCard,
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
      <div className="max-w-7xl mx-auto px-4 py-20 text-center bg-white my-8 rounded-[4px] border border-gray-200">
        <h2 className="text-2xl font-bold text-[#0f1111] mb-2">Looking for something?</h2>
        <p className="text-sm text-[#565959] mb-6">
          We're sorry. The Web address you entered is not a functioning page on our site.
        </p>
        <Link to="/" className="btn-amazon-primary inline-flex px-6 py-2">
          Go to Amazon.in's Home Page
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const currentImage = selectedImage || product.image;
  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 25;

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
    <div className="bg-white min-h-screen py-4 border-b border-[#e7e7e7]">
      <div className="max-w-[1500px] mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-[#565959] mb-4 overflow-x-auto pb-1">
          <Link to="/" className="hover:text-[#c7511f] hover:underline">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
          <Link
            to={`/category/${encodeURIComponent(product.category)}`}
            className="hover:text-[#c7511f] hover:underline"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
          <span className="text-[#0f1111] truncate max-w-sm">{product.name}</span>
        </nav>

        {/* ── Product Main Layout: Left Images, Center Info, Right Buy Box ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── Left: Image Gallery (cols 1-5) ───────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Column */}
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-[480px]">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-[4px] border-2 p-1 bg-white shrink-0 cursor-pointer overflow-hidden transition-all ${
                    currentImage === img
                      ? 'border-[#e77600] shadow-sm'
                      : 'border-[#d5d9d9] hover:border-[#888c8c]'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Main Interactive Image */}
            <div className="flex-1 aspect-square bg-white flex items-center justify-center p-4 border border-[#e7e7e7] rounded-[4px] relative">
              <img
                src={currentImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* ── Center: Product Details (cols 6-9) ────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div>
              <p className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline cursor-pointer font-medium">
                Visit the {product.category} Store
              </p>
              <h1 className="text-xl sm:text-2xl font-medium text-[#0f1111] leading-snug mt-1">
                {product.name}
              </h1>
            </div>

            {/* Ratings & Choice Badge */}
            <div className="flex flex-wrap items-center gap-3 pb-3 border-b border-[#e7e7e7]">
              <StarRating rating={product.rating} count={product.reviewCount} size="md" />
              {product.rating >= 4.6 && (
                <span className="bg-[#232f3e] text-white text-[10px] font-bold px-2 py-0.5 rounded-[2px]">
                  Amazon's <span className="text-[#febd69]">Choice</span>
                </span>
              )}
            </div>

            {/* Pricing Section */}
            <div className="pb-3 border-b border-[#e7e7e7]">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl text-[#cc0c39] font-light">-{discount}%</span>
                <span className="text-3xl font-normal text-[#0f1111] tracking-tight">
                  {formatPrice(product.price)}
                </span>
              </div>
              {product.originalPrice && (
                <p className="text-xs text-[#565959] mt-0.5">
                  M.R.P.: <span className="line-through">{formatPrice(product.originalPrice)}</span>
                </p>
              )}
              <p className="text-xs text-[#0f1111] mt-1">Inclusive of all taxes</p>
              <p className="text-xs text-[#0f1111] mt-1 flex items-center gap-1 font-medium">
                <CreditCard className="w-3.5 h-3.5 text-[#007185]" />
                EMI starts at ₹1,120. No Cost EMI available
              </p>
            </div>

            {/* Special Offers Box */}
            <div className="bg-[#fcfcfc] border border-[#d5d9d9] p-3 rounded-[4px]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0f1111] mb-2">
                <Tag className="w-4 h-4 text-[#cc0c39]" />
                <span>Offers</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="border border-[#e7e7e7] bg-white p-2 rounded-[4px]">
                  <p className="font-bold text-[#0f1111]">Bank Offer</p>
                  <p className="text-[11px] text-[#565959]">Up to ₹1,500 discount on select Credit Cards</p>
                </div>
                <div className="border border-[#e7e7e7] bg-white p-2 rounded-[4px]">
                  <p className="font-bold text-[#0f1111]">Partner Offer</p>
                  <p className="text-[11px] text-[#565959]">Get GST invoice and save up to 28% on business purchases</p>
                </div>
              </div>
            </div>

            {/* Amazon Trust Features Icons */}
            <div className="grid grid-cols-4 gap-2 py-3 border-y border-[#e7e7e7] text-center text-[11px] text-[#007185]">
              <div className="flex flex-col items-center">
                <RotateCcw className="w-6 h-6 mb-1 text-[#0f1111]" />
                <span>7 days Replacement</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-6 h-6 mb-1 text-[#0f1111]" />
                <span>Free Delivery</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-6 h-6 mb-1 text-[#0f1111]" />
                <span>1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-[#febd69] rounded-full flex items-center justify-center font-bold text-[#131921] mb-1 text-xs">
                  A
                </div>
                <span>Amazon Delivered</span>
              </div>
            </div>

            {/* About this item */}
            <div className="pt-2">
              <h2 className="text-sm font-bold text-[#0f1111] mb-2">About this item</h2>
              <ul className="space-y-1.5 text-xs text-[#0f1111] list-disc list-inside leading-relaxed">
                {product.highlights && product.highlights.length > 0
                  ? product.highlights.map((h, i) => <li key={i}>{h}</li>)
                  : (
                    <>
                      <li>High quality materials engineered for maximum reliability and daily use.</li>
                      <li>Designed with ergonomic comfort and modern aesthetic standards.</li>
                      <li>Includes comprehensive manufacturer warranty and customer support.</li>
                    </>
                  )}
                <li>{product.description}</li>
              </ul>
            </div>
          </div>

          {/* ── Right: Amazon Buy Box (cols 10-12) ─────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="border border-[#d5d9d9] rounded-[8px] p-4 bg-white shadow-sm flex flex-col gap-3 sticky top-24">
              <div>
                <span className="text-2xl font-normal text-[#0f1111]">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Prime Delivery info */}
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex items-center gap-1.5">
                  <PrimeBadge />
                </div>
                <p className="text-[#0f1111]">
                  FREE delivery <span className="font-bold">Tomorrow, 11 AM</span>
                </p>
                <div className="flex items-center gap-1 text-[#007185] hover:text-[#c7511f] cursor-pointer">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Delivering to Mumbai 400001</span>
                </div>
              </div>

              {/* Stock Status */}
              <div>
                {product.stock > 0 ? (
                  <p className="text-lg font-medium text-[#007600]">In stock</p>
                ) : (
                  <p className="text-lg font-medium text-[#cc0c39]">Currently unavailable</p>
                )}
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="flex items-center gap-2">
                  <label htmlFor="qty" className="text-xs text-[#0f1111]">Quantity:</label>
                  <select
                    id="qty"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-[#d5d9d9] bg-[#f0f2f2] hover:bg-[#e3e6e6] rounded-[8px] px-2 py-1 text-xs font-medium text-[#0f1111] shadow-inner outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="btn-amazon-primary w-full py-2.5 shadow-sm font-normal text-sm cursor-pointer"
                >
                  {added ? (
                    <span className="flex items-center justify-center gap-1 text-[#007600] font-bold">
                      <Check className="w-4 h-4 stroke-[3]" /> Added to Cart
                    </span>
                  ) : (
                    'Add to Cart'
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="btn-amazon-secondary w-full py-2.5 shadow-sm font-normal text-sm cursor-pointer"
                >
                  Buy Now
                </button>
              </div>

              {/* Security & Seller Details */}
              <div className="text-[11px] text-[#565959] space-y-1 pt-2 border-t border-[#e7e7e7]">
                <div className="flex items-center gap-1.5 text-[#007185]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Secure transaction</span>
                </div>
                <div className="grid grid-cols-2 gap-1 pt-1">
                  <span className="text-[#565959]">Ships from</span>
                  <span className="text-[#0f1111] font-medium">Amazon</span>
                  <span className="text-[#565959]">Sold by</span>
                  <span className="text-[#007185] hover:underline cursor-pointer font-medium">
                    RetailNet
                  </span>
                </div>
              </div>

              {/* Wishlist Button */}
              <div className="pt-2 border-t border-[#e7e7e7]">
                <button
                  onClick={() => toggle(product.id)}
                  className="btn-amazon-white w-full py-2 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${wishlisted ? 'text-[#cc0c39] fill-[#cc0c39]' : 'text-gray-500'}`}
                  />
                  <span>{wishlisted ? 'Remove from Wish List' : 'Add to Wish List'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Products Carousel ────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-[#e7e7e7]">
            <h2 className="text-xl font-bold text-[#0f1111] mb-4">
              Customers who viewed this item also viewed
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
