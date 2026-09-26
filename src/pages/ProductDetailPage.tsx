import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../data/products';
import { useCartStore } from '../context/CartContext';
import { useWishlistStore } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../lib/utils';
import { ProductImage } from '../components/ui/ProductImage';
import {
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  MapPin,
  Share2,
  CheckCircle2,
  MessageSquarePlus,
  CreditCard,
  RefreshCw,
  HelpCircle,
  ThumbsUp,
  Tag,
  Percent,
} from 'lucide-react';

interface UserReview {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const { user } = useAuth();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Space Gray');
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews' | 'qa'>('details');
  const [added, setAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Delivery Pincode checker state
  const [deliveryPincode, setDeliveryPincode] = useState('400001');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Amazon Exchange Offer state
  const [exchangeOption, setExchangeOption] = useState<'none' | 'exchange'>('none');
  const [exchangeBrand, setExchangeBrand] = useState('Apple');
  const [exchangeDiscount, setExchangeDiscount] = useState(3500);

  // Frequently Bought Together Bundle state
  const bundleItem1 = {
    id: 'acc1',
    name: '65W Fast USB-C GaN Wall Charger Adapter',
    price: 1499,
    image: 'https://m.media-amazon.com/images/I/61VfL-aiToL.jpg',
  };
  const bundleItem2 = {
    id: 'acc2',
    name: 'Impact-Resistant Shockproof Armor Case',
    price: 699,
    image: 'https://m.media-amazon.com/images/I/71xb2xkN5qL.jpg',
  };
  const [bundleChecked, setBundleChecked] = useState({
    main: true,
    item1: true,
    item2: true,
  });
  const [bundleAdded, setBundleAdded] = useState(false);

  // Customer Q&A state
  const [qaSearch, setQaSearch] = useState('');
  const [qaList, setQaList] = useState([
    {
      q: 'Does this product come with official brand warranty in India?',
      a: 'Yes, this product includes a 1-Year National Manufacturer Warranty valid across all authorized service centers in India.',
      by: 'ShopNest Customer Care Team',
      upvotes: 42,
    },
    {
      q: 'Is cash on delivery (COD) available for this item?',
      a: 'Yes, Cash on Delivery is available for all serviceable pin codes across India.',
      by: 'Aarav M. (Verified Buyer)',
      upvotes: 28,
    },
    {
      q: 'Can I exchange my old device for an extra discount?',
      a: 'Yes, select "With Exchange" on the product page and select your brand to claim up to ₹12,000 instant exchange credit at doorstep inspection.',
      by: 'Pooja S. (Verified Buyer)',
      upvotes: 19,
    },
    {
      q: 'What is inside the box?',
      a: 'The package contains the main device, fast charging cable, quick start user manual, and official warranty card.',
      by: 'ShopNest Seller Support',
      upvotes: 15,
    },
  ]);
  const [newQuestion, setNewQuestion] = useState('');
  const [questionSubmitted, setQuestionSubmitted] = useState(false);

  // Interactive Reviews state
  const [reviews, setReviews] = useState<UserReview[]>([
    {
      name: 'Aarav M. — Verified Buyer',
      rating: 5,
      date: '2 days ago',
      comment: 'Exceptional build quality and arrived safely within 2 business days. Very satisfied!',
    },
    {
      name: 'Pooja S. — Verified Buyer',
      rating: 4,
      date: '1 week ago',
      comment: 'Super sleek design, battery life exceeded my expectations. Great value for the price.',
    },
  ]);
  const [newReviewerName, setNewReviewerName] = useState(user?.name || '');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center bg-white my-8 rounded-3xl border border-slate-200 shadow-subtle">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The product you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn-sage inline-flex px-6 py-2.5 rounded-full">
          Back to ShopNest Home
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const currentImage = selectedImage || product.image;
  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 22;

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const colors = [
    { name: 'Space Gray', bg: '#4B5563' },
    { name: 'Silver', bg: '#E2E8F0' },
    { name: 'Midnight', bg: '#0F172A' },
    { name: 'Starlight', bg: '#F5EBE0' },
  ];

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product.id, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{6}$/.test(deliveryPincode.trim())) {
      setPincodeStatus(`Guaranteed Delivery by Tomorrow, 2 PM • FREE Shipping & COD Available for PIN ${deliveryPincode}`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const review: UserReview = {
      name: (newReviewerName.trim() || 'Verified Buyer') + ' — Verified Buyer',
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
    };

    setReviews([review, ...reviews]);
    setNewComment('');
    setShowReviewForm(false);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-6 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation matching Screen 3 */}
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 overflow-x-auto pb-1">
            <Link to="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <Link
              to={`/category/${encodeURIComponent(product.category)}`}
              className="hover:text-emerald-600 transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="text-slate-800 font-semibold truncate max-w-sm">
              {product.name}
            </span>
          </nav>

          {/* Share Product Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors text-xs font-semibold cursor-pointer"
            title="Share Product"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* ── Main Product Display ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Thumbnails + Main Image Card (cols 1-6) */}
          <div className="lg:col-span-6 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Column */}
            {allImages.length > 1 && (
              <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[500px]">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-2xl p-1.5 bg-white border transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                      currentImage === img
                        ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <ProductImage
                      src={img}
                      alt={`Thumbnail ${i}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Big Main Image Container matching Reference */}
            <div className="flex-1 bg-white rounded-3xl border border-slate-200/90 p-8 flex items-center justify-center min-h-[380px] sm:min-h-[460px] relative shadow-subtle">
              <ProductImage
                src={currentImage}
                alt={product.name}
                className="max-h-[360px] sm:max-h-[420px] max-w-full object-contain transition-transform duration-300 hover:scale-105"
              />
              <button
                onClick={() => toggle(product.id)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50/60 transition-all shadow-xs cursor-pointer"
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlisted ? 'text-rose-500 fill-rose-500' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Right Column: Product Info & Actions (cols 7-12) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <span className="font-bold text-slate-800 text-sm">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-slate-400">
                  ({(product.reviewCount + reviews.length - 2).toLocaleString()} reviews)
                </span>
              </div>
            </div>

            {/* Price with Original Price & Discount Pill */}
            <div className="flex items-baseline flex-wrap gap-3 py-2 border-y border-slate-100">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200/80">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Stock & Delivery Badges */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                In Stock
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">Free Express Delivery</span>
            </div>

            {/* Pin Code Delivery Estimator (Amazon.in feature) */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Check Delivery & Payment Options</span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={deliveryPincode}
                  onChange={(e) => setDeliveryPincode(e.target.value)}
                  placeholder="Enter 6-digit PIN"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs flex-1 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="btn-sage px-4 py-1.5 rounded-xl text-xs font-semibold"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className="text-[11px] font-medium text-emerald-700 bg-emerald-50/70 p-2 rounded-xl border border-emerald-100">
                  {pincodeStatus}
                </p>
              )}
            </div>

            {/* Amazon-style Bank Offers & EMI Carousel */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-emerald-600" />
                  Offers & Discounts
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold cursor-pointer hover:underline">
                  3 Offers Available
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-[11px]">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Bank Offer</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    10% Instant Discount up to ₹1,500 on HDFC & ICICI Cards.
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 text-[11px]">
                    <Tag className="w-3.5 h-3.5 text-orange-500" />
                    <span>No Cost EMI</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Avail No Cost EMI from {formatPrice(Math.round(product.price / 6))}/mo on select cards.
                  </p>
                </div>
              </div>
            </div>

            {/* Amazon-style Exchange Offer Radio Box */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                  Exchange Offer
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Save up to ₹12,000
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <label
                  onClick={() => setExchangeOption('none')}
                  className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                    exchangeOption === 'none'
                      ? 'border-emerald-600 bg-emerald-50/40 font-bold text-slate-900'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="exchange"
                      checked={exchangeOption === 'none'}
                      onChange={() => setExchangeOption('none')}
                      className="accent-emerald-600"
                    />
                    <span>Without Exchange</span>
                  </div>
                  <span className="font-bold">{formatPrice(product.price)}</span>
                </label>

                <label
                  onClick={() => setExchangeOption('exchange')}
                  className={`flex flex-col p-2.5 rounded-xl border cursor-pointer transition-all ${
                    exchangeOption === 'exchange'
                      ? 'border-emerald-600 bg-emerald-50/40 text-slate-900 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="exchange"
                        checked={exchangeOption === 'exchange'}
                        onChange={() => setExchangeOption('exchange')}
                        className="accent-emerald-600"
                      />
                      <span>With Exchange</span>
                    </div>
                    <span className="text-emerald-700 font-extrabold">
                      {formatPrice(Math.max(0, product.price - exchangeDiscount))}
                    </span>
                  </div>

                  {exchangeOption === 'exchange' && (
                    <div className="mt-2.5 pt-2 border-t border-emerald-200/60 space-y-2 font-normal text-xs animate-in fade-in">
                      <p className="text-[11px] text-slate-500">
                        Choose the brand of your old device to see estimated discount:
                      </p>
                      <div className="flex gap-2">
                        {['Apple', 'Samsung', 'OnePlus', 'Xiaomi'].map((brand) => (
                          <button
                            key={brand}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExchangeBrand(brand);
                              const discMap: Record<string, number> = {
                                Apple: 4000,
                                Samsung: 3500,
                                OnePlus: 2800,
                                Xiaomi: 2000,
                              };
                              setExchangeDiscount(discMap[brand] || 2500);
                            }}
                            className={`flex-1 py-1 px-2 rounded-lg border text-[11px] font-semibold transition-colors ${
                              exchangeBrand === brand
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-white text-slate-700 border-slate-200'
                            }`}
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                      <p className="text-[11px] text-emerald-800 font-bold">
                        ✓ ₹{exchangeDiscount.toLocaleString()} instant exchange value applied at doorstep verification!
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Color Swatch Selector */}
            <div>
              <p className="text-xs font-bold text-slate-700 mb-2">
                Color: <span className="font-normal text-slate-500">{selectedColor}</span>
              </p>
              <div className="flex items-center gap-3">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-7 h-7 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                      selectedColor === c.name
                        ? 'ring-2 ring-emerald-600 ring-offset-2 scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.bg }}
                    title={c.name}
                  >
                    {selectedColor === c.name && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector + Add to Cart + Wishlist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity [-] 1 [+] */}
                <div className="flex items-center border border-slate-200 bg-white rounded-xl overflow-hidden shadow-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Theme-Uniform "Add to Cart" Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 btn-add-to-cart py-3 rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                    added ? 'btn-added' : ''
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                {/* Add to Wishlist Button */}
                <button
                  onClick={() => toggle(product.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    wishlisted
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                  title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Warm Orange "Buy Now" Button matching Screen 3 */}
              <button
                onClick={handleBuyNow}
                className="w-full btn-orange py-3.5 rounded-xl font-bold text-sm shadow-sm hover:shadow transition-all"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* 3 Service Badges matching Reference UI */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">Free Delivery</h4>
                  <p className="text-[10px] text-slate-400">2-5 business days</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">1 Year Warranty</h4>
                  <p className="text-[10px] text-slate-400">Manufacturer warranty</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <RotateCcw className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">Easy Returns</h4>
                  <p className="text-[10px] text-slate-400">Within 7 days return</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Amazon-style Frequently Bought Together Bundle ──────── */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Frequently Bought Together</h2>
              <p className="text-xs text-slate-500">Buy these items together and save an additional ₹300</p>
            </div>
            {bundleAdded && (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5 animate-in fade-in">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Bundle added to cart!
              </span>
            )}
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Visual Images with Plus Signs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Main Product */}
              <div className={`p-3 rounded-2xl border transition-all ${bundleChecked.main ? 'border-emerald-300 bg-emerald-50/20' : 'opacity-40 border-slate-200'}`}>
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-50 p-2 flex items-center justify-center">
                  <ProductImage src={currentImage} alt={product.name} className="max-h-full max-w-full object-contain" />
                </div>
              </div>

              <span className="text-xl font-bold text-slate-400">+</span>

              {/* Bundle Item 1 */}
              <div className={`p-3 rounded-2xl border transition-all ${bundleChecked.item1 ? 'border-emerald-300 bg-emerald-50/20' : 'opacity-40 border-slate-200'}`}>
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-50 p-2 flex items-center justify-center">
                  <img src={bundleItem1.image} alt={bundleItem1.name} className="max-h-full max-w-full object-cover rounded-lg" />
                </div>
              </div>

              <span className="text-xl font-bold text-slate-400">+</span>

              {/* Bundle Item 2 */}
              <div className={`p-3 rounded-2xl border transition-all ${bundleChecked.item2 ? 'border-emerald-300 bg-emerald-50/20' : 'opacity-40 border-slate-200'}`}>
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-50 p-2 flex items-center justify-center">
                  <img src={bundleItem2.image} alt={bundleItem2.name} className="max-h-full max-w-full object-cover rounded-lg" />
                </div>
              </div>
            </div>

            {/* Checkboxes & Total Pricing */}
            <div className="w-full lg:w-96 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-4">
              <div className="space-y-2 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bundleChecked.main}
                    onChange={(e) => setBundleChecked((prev) => ({ ...prev, main: e.target.checked }))}
                    className="accent-emerald-600 mt-0.5"
                  />
                  <div>
                    <span className="font-semibold text-slate-900">This item:</span> {product.name}
                    <span className="font-bold text-slate-900 block">{formatPrice(product.price)}</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bundleChecked.item1}
                    onChange={(e) => setBundleChecked((prev) => ({ ...prev, item1: e.target.checked }))}
                    className="accent-emerald-600 mt-0.5"
                  />
                  <div>
                    <span className="font-semibold text-slate-900">{bundleItem1.name}</span>
                    <span className="font-bold text-slate-900 block">{formatPrice(bundleItem1.price)}</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bundleChecked.item2}
                    onChange={(e) => setBundleChecked((prev) => ({ ...prev, item2: e.target.checked }))}
                    className="accent-emerald-600 mt-0.5"
                  />
                  <div>
                    <span className="font-semibold text-slate-900">{bundleItem2.name}</span>
                    <span className="font-bold text-slate-900 block">{formatPrice(bundleItem2.price)}</span>
                  </div>
                </label>
              </div>

              {/* Total Calculation */}
              {(() => {
                const bTotal =
                  (bundleChecked.main ? product.price : 0) +
                  (bundleChecked.item1 ? bundleItem1.price : 0) +
                  (bundleChecked.item2 ? bundleItem2.price : 0);
                const count =
                  (bundleChecked.main ? 1 : 0) +
                  (bundleChecked.item1 ? 1 : 0) +
                  (bundleChecked.item2 ? 1 : 0);
                const finalBundlePrice = count >= 2 ? Math.max(0, bTotal - 300) : bTotal;

                return (
                  <div className="pt-3 border-t border-slate-200/80 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-500">Total Price ({count} items):</span>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-slate-900">{formatPrice(finalBundlePrice)}</span>
                        {count >= 2 && (
                          <span className="block text-[10px] text-emerald-600 font-bold">Includes ₹300 Combo Discount</span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={count === 0}
                      onClick={() => {
                        if (bundleChecked.main) addItem(product.id, 1);
                        if (bundleChecked.item1) addItem(bundleItem1.id, 1);
                        if (bundleChecked.item2) addItem(bundleItem2.id, 1);
                        setBundleAdded(true);
                        setTimeout(() => setBundleAdded(false), 2500);
                      }}
                      className={`w-full btn-add-to-cart py-2.5 rounded-xl font-bold text-xs shadow-xs cursor-pointer flex items-center justify-center gap-1.5 ${
                        bundleAdded ? 'btn-added' : ''
                      }`}
                    >
                      {bundleAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Added to Cart!
                        </>
                      ) : (
                        `Add all ${count} to Cart`
                      )}
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* ── Tabs & Related Products Section ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Left Column: Tabs (cols 1-8) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-subtle">
            {/* Tab Headers */}
            <div className="flex items-center gap-6 border-b border-slate-100 pb-3 text-sm font-bold">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 relative transition-colors cursor-pointer ${
                  activeTab === 'details'
                    ? 'text-emerald-600'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Product Details
                {activeTab === 'details' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 relative transition-colors cursor-pointer ${
                  activeTab === 'specs'
                    ? 'text-emerald-600'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Specifications
                {activeTab === 'specs' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 relative transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'text-emerald-600'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Customer Reviews ({reviews.length})
                {activeTab === 'reviews' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('qa')}
                className={`pb-3 relative transition-colors cursor-pointer ${
                  activeTab === 'qa'
                    ? 'text-emerald-600'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Customer Q&A ({qaList.length})
                {activeTab === 'qa' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>
            </div>

            {/* Tab Contents */}
            <div className="pt-6">
              {activeTab === 'details' && (
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                  <h3 className="text-base font-bold text-slate-900">About this item</h3>
                  <p>{product.description}</p>
                  {product.highlights && (
                    <ul className="space-y-2 pt-2">
                      {product.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-4 text-xs text-slate-700">
                  <h3 className="text-base font-bold text-slate-900">Technical Specifications</h3>
                  <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-2 p-3 bg-slate-50/50">
                      <span className="font-semibold text-slate-500">Category</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <div className="grid grid-cols-2 p-3">
                      <span className="font-semibold text-slate-500">Brand / Maker</span>
                      <span className="font-medium">ShopNest Certified</span>
                    </div>
                    <div className="grid grid-cols-2 p-3 bg-slate-50/50">
                      <span className="font-semibold text-slate-500">Condition</span>
                      <span className="font-medium">100% Brand New & Genuine</span>
                    </div>
                    <div className="grid grid-cols-2 p-3">
                      <span className="font-semibold text-slate-500">Warranty</span>
                      <span className="font-medium">1 Year Comprehensive Warranty</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-extrabold text-emerald-800">
                        {product.rating.toFixed(1)}
                      </div>
                      <div>
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Based on {(product.reviewCount + reviews.length - 2).toLocaleString()} verified ratings
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowReviewForm((prev) => !prev)}
                      className="btn-sage px-4 py-2 rounded-xl text-xs font-semibold shadow-xs"
                    >
                      <MessageSquarePlus className="w-4 h-4" />
                      <span>Write a Review</span>
                    </button>
                  </div>

                  {reviewSubmitted && (
                    <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Thank you! Your verified review has been submitted.</span>
                    </div>
                  )}

                  {/* Write Review Form */}
                  {showReviewForm && (
                    <form onSubmit={handleAddReview} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 animate-in fade-in text-xs font-semibold text-slate-700">
                      <h4 className="font-bold text-sm text-slate-900">Share Your Experience</h4>
                      <div>
                        <label className="block mb-1">Your Name</label>
                        <input
                          type="text"
                          value={newReviewerName}
                          onChange={(e) => setNewReviewerName(e.target.value)}
                          placeholder="Your name"
                          className="input"
                        />
                      </div>

                      <div>
                        <label className="block mb-1">Overall Rating</label>
                        <div className="flex items-center gap-1 cursor-pointer">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              type="button"
                              key={s}
                              onClick={() => setNewRating(s)}
                              className="p-1"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  s <= newRating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block mb-1">Your Review *</label>
                        <textarea
                          required
                          rows={3}
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="What did you like or dislike about this product?"
                          className="input"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="btn-outline px-4 py-2 rounded-xl text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn-sage px-5 py-2 rounded-xl text-xs font-semibold"
                        >
                          Submit Review
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-3 pt-2">
                    {reviews.map((rev, i) => (
                      <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-white space-y-2 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">{rev.name}</span>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-3.5 h-3.5 ${
                                idx < rev.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'qa' && (
                <div className="space-y-6 text-xs text-slate-700">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">Have a question?</h3>
                    <p className="text-slate-500">Find answers in product info, Q&As, or ask the community.</p>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <input
                      type="search"
                      value={qaSearch}
                      onChange={(e) => setQaSearch(e.target.value)}
                      placeholder="Search questions and answers..."
                      className="input py-2.5 text-xs rounded-xl"
                    />
                  </div>

                  {/* Ask Question Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <p className="font-bold text-slate-800">Ask a question to the seller or community:</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="e.g. Does this support wireless charging?"
                        className="input text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!newQuestion.trim()) return;
                          setQaList((prev) => [
                            {
                              q: newQuestion,
                              a: 'Thank you for your question! The seller and verified community members have been notified and will answer shortly.',
                              by: 'ShopNest Community Assistant',
                              upvotes: 1,
                            },
                            ...prev,
                          ]);
                          setNewQuestion('');
                          setQuestionSubmitted(true);
                          setTimeout(() => setQuestionSubmitted(false), 3000);
                        }}
                        className="btn-sage px-5 py-2 rounded-xl font-bold text-xs"
                      >
                        Ask
                      </button>
                    </div>
                    {questionSubmitted && (
                      <p className="text-emerald-700 font-bold text-[11px]">✓ Question submitted successfully!</p>
                    )}
                  </div>

                  {/* Questions List */}
                  <div className="space-y-4 pt-2">
                    {qaList
                      .filter((item) =>
                        qaSearch
                          ? item.q.toLowerCase().includes(qaSearch.toLowerCase()) ||
                            item.a.toLowerCase().includes(qaSearch.toLowerCase())
                          : true
                      )
                      .map((item, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">Q:</span>
                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{item.q}</h4>
                          </div>
                          <div className="flex items-start gap-2 pl-1">
                            <span className="font-bold text-slate-400 text-[11px]">A:</span>
                            <div className="space-y-1">
                              <p className="text-slate-600 leading-relaxed">{item.a}</p>
                              <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                                <span>By <strong className="text-slate-700 font-semibold">{item.by}</strong></span>
                                <span>•</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setQaList((prev) =>
                                      prev.map((q, i) => (i === idx ? { ...q, upvotes: q.upvotes + 1 } : q))
                                    );
                                  }}
                                  className="flex items-center gap-1 text-slate-500 hover:text-emerald-700 cursor-pointer"
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                  <span>Helpful ({item.upvotes})</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Related Products rail matching Screen 3 (cols 9-12) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-slate-900">Related Products</h3>
            <div className="space-y-3">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/product/${rel.id}`}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-slate-100 transition-colors group"
                >
                  <div className="w-16 h-16 rounded-xl bg-slate-50 p-2 flex items-center justify-center shrink-0 overflow-hidden">
                    <ProductImage
                      src={rel.image}
                      alt={rel.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-800 group-hover:text-emerald-600 truncate">
                      {rel.name}
                    </h4>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{rel.rating.toFixed(1)}</span>
                      <span>({rel.reviewCount > 1000 ? `${(rel.reviewCount / 1000).toFixed(1)}k` : rel.reviewCount})</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 mt-1">
                      {formatPrice(rel.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
