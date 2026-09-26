import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ProductImage } from '../ui/ProductImage';

export interface CategoryCardItem {
  name: string;
  sub: string;
  image: string;
  to: string;
}

export interface CategoryCard {
  title: string;
  badge?: string;
  badgeColor?: string;
  linkText: string;
  linkTo: string;
  items: CategoryCardItem[];
}

const CARDS: CategoryCard[] = [
  // ── Row 1 ──────────────────────────────────────────────────
  {
    title: 'Flagship Smartphones & 5G Mobiles',
    badge: 'Up to 30% off',
    badgeColor: 'bg-emerald-600',
    linkText: 'Explore all Smartphones',
    linkTo: '/category/Mobiles',
    items: [
      { name: 'Apple iPhone 16 Pro Max', sub: 'From ₹1,44,900', image: 'https://m.media-amazon.com/images/I/71d7rfSl0wL.jpg', to: '/product/m1' },
      { name: 'Samsung Galaxy S24 Ultra', sub: 'From ₹1,29,999', image: 'https://m.media-amazon.com/images/I/71geVdy6-OS.jpg', to: '/product/m2' },
      { name: 'OnePlus 12 5G Flagship', sub: 'From ₹64,999', image: 'https://m.media-amazon.com/images/I/71yzJoE7WlL.jpg', to: '/product/m3' },
      { name: 'Apple iPhone 13 128GB', sub: 'From ₹49,999', image: 'https://m.media-amazon.com/images/I/71GLMJ7TQiL.jpg', to: '/product/m4' },
    ],
  },
  {
    title: 'High-Performance Laptops & Creators',
    badge: 'Min 20% off',
    badgeColor: 'bg-blue-600',
    linkText: 'Explore Laptops & PCs',
    linkTo: '/category/Computers',
    items: [
      { name: 'Apple MacBook Air 15" M3', sub: 'From ₹1,34,900', image: 'https://m.media-amazon.com/images/I/71jG+e7roXL.jpg', to: '/product/c1' },
      { name: 'Apple MacBook Pro 16" M3', sub: 'From ₹3,49,900', image: 'https://m.media-amazon.com/images/I/71TPda7cwUL.jpg', to: '/product/c2' },
      { name: 'Dell XPS 15 9530 Creator', sub: 'From ₹2,19,999', image: 'https://m.media-amazon.com/images/I/81Os1SDWpcL.jpg', to: '/product/c3' },
      { name: 'ASUS ROG Strix G16 Gaming', sub: 'From ₹1,24,999', image: 'https://m.media-amazon.com/images/I/71vFKBpKakL.jpg', to: '/product/c4' },
    ],
  },
  {
    title: 'Wireless Audio & Premium Earbuds',
    badge: 'Hot Deal',
    badgeColor: 'bg-violet-600',
    linkText: 'Explore Audio & Headphones',
    linkTo: '/category/Electronics',
    items: [
      { name: 'Apple AirPods Pro 2 USB-C', sub: 'From ₹20,999', image: 'https://m.media-amazon.com/images/I/61SUj2aKoEL.jpg', to: '/product/e1' },
      { name: 'Sony WH-1000XM5 ANC', sub: 'From ₹26,999', image: 'https://m.media-amazon.com/images/I/71ZOtNdaZCL.jpg', to: '/product/e2' },
      { name: 'Sony WF-C500 Earbuds', sub: 'From ₹4,999', image: 'https://m.media-amazon.com/images/I/51SKmu2G9FL.jpg', to: '/product/e3' },
      { name: 'boAt Rockerz 255 Pro+', sub: 'From ₹1,299', image: 'https://m.media-amazon.com/images/I/61CGHv6kmWL.jpg', to: '/product/e4' },
    ],
  },
  {
    title: 'Smart Home, Audio & Wearables',
    badge: 'Top Picks',
    badgeColor: 'bg-amber-600',
    linkText: 'Explore Smart Tech',
    linkTo: '/category/Electronics',
    items: [
      { name: 'JBL Flip 6 Bluetooth', sub: 'From ₹9,999', image: 'https://m.media-amazon.com/images/I/71h6PpGaz9L.jpg', to: '/product/e5' },
      { name: 'Echo Dot 5th Gen Alexa', sub: 'From ₹4,499', image: 'https://m.media-amazon.com/images/I/61bK6PMOC3L.jpg', to: '/product/e6' },
      { name: 'Echo Pop Compact Alexa', sub: 'From ₹3,499', image: 'https://m.media-amazon.com/images/I/816ctt5WV5L.jpg', to: '/product/e7' },
      { name: 'Galaxy Watch 6 44mm', sub: 'From ₹19,999', image: 'https://m.media-amazon.com/images/I/71xb2xkN5qL.jpg', to: '/product/e8' },
    ],
  },

  // ── Row 2 ──────────────────────────────────────────────────
  {
    title: "Men's Trendsetting Fashion & Footwear",
    badge: 'Min 40% off',
    badgeColor: 'bg-rose-500',
    linkText: "Explore Men's Fashion",
    linkTo: '/category/Fashion',
    items: [
      { name: 'Puma Smashic Sneakers', sub: 'From ₹1,799', image: 'https://m.media-amazon.com/images/I/71D9ImsvEtL.jpg', to: '/product/f5' },
      { name: 'Safari Hardcase Trolley', sub: 'From ₹5,999', image: 'https://m.media-amazon.com/images/I/71T5NVOgbpL.jpg', to: '/product/f6' },
      { name: 'Slim Fit Check Shirt', sub: 'From ₹899', image: 'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp', to: '/product/f7' },
      { name: 'Sport Retro Sneakers', sub: 'From ₹1,999', image: 'https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/thumbnail.webp', to: '/product/f8' },
    ],
  },
  {
    title: "Women's Ethnic & Festive Fashion",
    badge: 'Festive Deals',
    badgeColor: 'bg-pink-600',
    linkText: "Explore Women's Ethnic",
    linkTo: '/category/Fashion',
    items: [
      { name: 'ANNI Printed Kurti Set', sub: 'From ₹699', image: 'https://m.media-amazon.com/images/I/71fvaQTBSML.jpg', to: '/product/f1' },
      { name: 'GoSriKi Festive Suit', sub: 'From ₹799', image: 'https://m.media-amazon.com/images/I/71BLkd39VKL.jpg', to: '/product/f2' },
      { name: 'Floral Straight Kurti', sub: 'From ₹499', image: 'https://m.media-amazon.com/images/I/41JXozbh-CL.jpg', to: '/product/f3' },
      { name: 'Ryras Anarkali Suit', sub: 'From ₹1,199', image: 'https://m.media-amazon.com/images/I/71eUwDk8z+L.jpg', to: '/product/f4' },
    ],
  },
  {
    title: 'Kitchen Cooking Essentials & Appliances',
    badge: 'Up to 50% off',
    badgeColor: 'bg-teal-600',
    linkText: 'Explore Kitchenware',
    linkTo: '/category/Home%20%26%20Kitchen',
    items: [
      { name: 'Prestige Iris Mixer Grinder', sub: 'From ₹2,899', image: 'https://m.media-amazon.com/images/I/81O+GNdkzKL.jpg', to: '/product/h1' },
      { name: 'Milton Insulated Bottle', sub: 'From ₹899', image: 'https://m.media-amazon.com/images/I/51Zymoq7UnL.jpg', to: '/product/h2' },
      { name: 'Boxed Smoothie Blender', sub: 'From ₹3,499', image: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/thumbnail.webp', to: '/product/h3' },
      { name: 'Carbon Steel Cooking Wok', sub: 'From ₹1,499', image: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/carbon-steel-wok/thumbnail.webp', to: '/product/h4' },
    ],
  },
  {
    title: 'Modern Home & Kitchen Essentials',
    badge: 'Under ₹1,999',
    badgeColor: 'bg-indigo-600',
    linkText: 'Explore Home & Kitchen',
    linkTo: '/category/Home%20%26%20Kitchen',
    items: [
      { name: 'Countertop Electric Cooker', sub: 'From ₹1,899', image: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/thumbnail.webp', to: '/product/h5' },
      { name: 'Bamboo Spatula Set', sub: 'From ₹399', image: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp', to: '/product/h6' },
      { name: 'Digital Solo Microwave 20L', sub: 'From ₹5,499', image: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/thumbnail.webp', to: '/product/h7' },
      { name: 'Stainless Hand Blender', sub: 'From ₹1,299', image: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/thumbnail.webp', to: '/product/h8' },
    ],
  },

  // ── Row 3 ──────────────────────────────────────────────────
  {
    title: 'Beauty, Skincare & Grooming',
    badge: 'Glow Picks',
    badgeColor: 'bg-rose-600',
    linkText: 'Explore Beauty Store',
    linkTo: '/category/Beauty',
    items: [
      { name: 'Essence Mascara Princess', sub: 'From ₹399', image: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp', to: '/product/b1' },
      { name: '16-Color Eyeshadow Palette', sub: 'From ₹799', image: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp', to: '/product/b2' },
      { name: 'Velvet Matte Red Lipstick', sub: 'From ₹499', image: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp', to: '/product/b3' },
      { name: 'Glossy Red Nail Polish', sub: 'From ₹249', image: 'https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp', to: '/product/b4' },
    ],
  },
  {
    title: 'Sports, Fitness & Outdoor Games',
    badge: 'Active Life',
    badgeColor: 'bg-orange-600',
    linkText: 'Explore Sports & Fitness',
    linkTo: '/category/Sports',
    items: [
      { name: 'Match American Football', sub: 'From ₹999', image: 'https://cdn.dummyjson.com/product-images/sports-accessories/american-football/thumbnail.webp', to: '/product/s1' },
      { name: 'Regulation Basketball', sub: 'From ₹899', image: 'https://cdn.dummyjson.com/product-images/sports-accessories/basketball/thumbnail.webp', to: '/product/s2' },
      { name: 'Steel Wall Basketball Rim', sub: 'From ₹1,499', image: 'https://cdn.dummyjson.com/product-images/sports-accessories/basketball-rim/thumbnail.webp', to: '/product/s3' },
      { name: 'Leather Baseball Glove', sub: 'From ₹1,899', image: 'https://cdn.dummyjson.com/product-images/sports-accessories/baseball-glove/thumbnail.webp', to: '/product/s4' },
    ],
  },
  {
    title: 'Cricket, Training & Outdoor Sports',
    badge: 'Match Ready',
    badgeColor: 'bg-emerald-700',
    linkText: 'Explore All Sports Gear',
    linkTo: '/category/Sports',
    items: [
      { name: 'Competition Baseball', sub: 'From ₹499', image: 'https://cdn.dummyjson.com/product-images/sports-accessories/baseball-ball/thumbnail.webp', to: '/product/s5' },
      { name: 'Willow Cricket Bat', sub: 'From ₹3,499', image: 'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-bat/thumbnail.webp', to: '/product/s6' },
      { name: 'Leather Cricket Ball', sub: 'From ₹799', image: 'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-ball/thumbnail.webp', to: '/product/s7' },
      { name: 'Duck Feather Shuttlecock', sub: 'From ₹899', image: 'https://cdn.dummyjson.com/product-images/sports-accessories/feather-shuttlecock/thumbnail.webp', to: '/product/s8' },
    ],
  },
  {
    title: 'Bestselling Books & Self-Development',
    badge: "Reader's Pick",
    badgeColor: 'bg-teal-800',
    linkText: 'Explore Book Bestsellers',
    linkTo: '/category/Books',
    items: [
      { name: 'Atomic Habits by James Clear', sub: 'From ₹499', image: 'https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg', to: '/product/bk1' },
      { name: 'Ikigai: Japanese Secret', sub: 'From ₹349', image: 'https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg', to: '/product/bk2' },
      { name: 'Psychology of Money', sub: 'From ₹399', image: 'https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg', to: '/product/bk3' },
      { name: 'Rich Dad Poor Dad', sub: 'From ₹389', image: 'https://m.media-amazon.com/images/I/81wgcld4wxL.jpg', to: '/product/bk4' },
    ],
  },

  // ── Row 4 ──────────────────────────────────────────────────
  {
    title: 'Computer Keyboards, Mice & Desk Setup',
    badge: 'Work & Play',
    badgeColor: 'bg-cyan-700',
    linkText: 'Explore Computer Accessories',
    linkTo: '/category/Computers',
    items: [
      { name: 'Logitech MX Master 3S', sub: 'From ₹8,999', image: 'https://m.media-amazon.com/images/I/61ni3t1ryQL.jpg', to: '/product/c8' },
      { name: 'Keychron Q1 Pro Keyboard', sub: 'From ₹17,999', image: 'https://m.media-amazon.com/images/I/61VfL-aiToL.jpg', to: '/product/c9' },
      { name: 'ASUS Zenbook 14 OLED', sub: 'From ₹99,999', image: 'https://m.media-amazon.com/images/I/71an9eiBxpL.jpg', to: '/product/c5' },
      { name: 'HP Pavilion 15 Intel i5', sub: 'From ₹62,999', image: 'https://m.media-amazon.com/images/I/71Swqqe7XAL.jpg', to: '/product/c6' },
    ],
  },
  {
    title: 'Budget Smartphones & Everyday Devices',
    badge: 'Great Value',
    badgeColor: 'bg-lime-700',
    linkText: 'Explore Budget Phones',
    linkTo: '/category/Mobiles',
    items: [
      { name: 'Samsung Galaxy M34 5G', sub: 'From ₹15,999', image: 'https://m.media-amazon.com/images/I/8195A49fZbL.jpg', to: '/product/m5' },
      { name: 'Redmi Note 13 Pro 5G', sub: 'From ₹24,999', image: 'https://m.media-amazon.com/images/I/71d1ytcCntL.jpg', to: '/product/m6' },
      { name: 'Realme Narzo 60 Pro 5G', sub: 'From ₹21,999', image: 'https://m.media-amazon.com/images/I/71XNeka-BRL.jpg', to: '/product/m7' },
      { name: 'Google Pixel 7a 5G', sub: 'From ₹36,999', image: 'https://m.media-amazon.com/images/I/618d5bS2lUL.jpg', to: '/product/m8' },
    ],
  },
  {
    title: 'Timeless Literature & Psychology Classics',
    badge: 'Top Reads',
    badgeColor: 'bg-stone-700',
    linkText: 'Explore Classic Books',
    linkTo: '/category/Books',
    items: [
      { name: 'The Alchemist: Paulo Coelho', sub: 'From ₹299', image: 'https://m.media-amazon.com/images/I/71sBtM3Yi5L.jpg', to: '/product/bk5' },
      { name: 'Sapiens: A Brief History', sub: 'From ₹549', image: 'https://m.media-amazon.com/images/I/91bYsX41DVL.jpg', to: '/product/bk6' },
      { name: 'Thinking, Fast and Slow', sub: 'From ₹449', image: 'https://m.media-amazon.com/images/I/713jIoMO3UL.jpg', to: '/product/bk7' },
      { name: "Man's Search For Meaning", sub: 'From ₹269', image: 'https://m.media-amazon.com/images/I/81JJPDNlxSL.jpg', to: '/product/bk8' },
    ],
  },
  {
    title: 'Skincare, Serums & Daily Pampering',
    badge: 'Self Care',
    badgeColor: 'bg-fuchsia-600',
    linkText: 'Explore Personal Care',
    linkTo: '/category/Beauty',
    items: [
      { name: 'Mineral Loose Powder', sub: 'From ₹599', image: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp', to: '/product/b5' },
      { name: 'Olay Shea Butter Body Wash', sub: 'From ₹449', image: 'https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-shea-butter-body-wash/thumbnail.webp', to: '/product/b6' },
      { name: 'Vaseline Men Moisture Lotion', sub: 'From ₹349', image: 'https://cdn.dummyjson.com/product-images/skin-care/vaseline-men-body-and-face-lotion/thumbnail.webp', to: '/product/b7' },
      { name: 'Super Leaves Body Wash', sub: 'From ₹699', image: 'https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/thumbnail.webp', to: '/product/b8' },
    ],
  },
];

export function AmazonCategoryGrid() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CARDS.map((card, cidx) => (
          <div
            key={cidx}
            className="bg-white rounded-2xl border border-slate-200/80 flex flex-col overflow-hidden group hover:border-slate-300 hover:shadow-card-hover transition-all duration-200"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
          >
            {/* Card Header */}
            <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-2">
              <h3 className="font-extrabold text-slate-900 text-[13px] leading-snug tracking-tight flex-1">
                {t(card.title, card.title)}
              </h3>
              {card.badge && (
                <span className={`shrink-0 text-[9px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-wider ${card.badgeColor || 'bg-emerald-500'}`}>
                  {t(card.badge, card.badge)}
                </span>
              )}
            </div>

            {/* 4-item image grid */}
            <div className="grid grid-cols-2 gap-px bg-slate-100 border-y border-slate-100 flex-1">
              {card.items.map((item, iidx) => (
                <Link
                  key={iidx}
                  to={item.to}
                  className="group/item bg-white p-3 flex flex-col items-center text-center hover:bg-emerald-50/30 transition-colors duration-150"
                >
                  <div className="w-full aspect-square rounded-xl bg-slate-50 overflow-hidden mb-2 flex items-center justify-center border border-slate-100/80 p-2">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      fallbackText={item.name}
                      className="max-h-full max-w-full object-contain rounded-lg group-hover/item:scale-106 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-[11px] font-semibold text-slate-700 line-clamp-1 leading-tight group-hover/item:text-emerald-700 transition-colors">
                    {t(item.name, item.name)}
                  </p>
                  <p className="text-[10px] font-bold text-emerald-600 mt-0.5">{item.sub}</p>
                </Link>
              ))}
            </div>

            {/* Card Footer */}
            <Link
              to={card.linkTo}
              className="flex items-center justify-between px-5 py-3.5 text-[12px] font-bold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50/50 transition-all duration-150 mt-auto group/link border-t border-slate-50"
            >
              <span>{t(card.linkText, card.linkText)}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
