import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const OCCASIONS = [
  {
    title: 'Travel & Luggage',
    subtitle: 'Safari hardcase & backpacks',
    image: 'https://m.media-amazon.com/images/I/71T5NVOgbpL.jpg',
    to: '/search?q=luggage',
    color: 'from-blue-900/80 to-blue-900/30',
  },
  {
    title: 'Back to College & Work',
    subtitle: 'Everyday shoulder bags & totes',
    image: 'https://cdn.dummyjson.com/product-images/womens-bags/blue-women%27s-handbag/thumbnail.webp',
    to: '/category/Fashion',
    color: 'from-amber-900/80 to-amber-900/30',
  },
  {
    title: 'Home Office Productivity',
    subtitle: 'Mechanical keyboards & mice',
    image: 'https://m.media-amazon.com/images/I/61VfL-aiToL.jpg',
    to: '/category/Computers',
    color: 'from-slate-900/80 to-slate-900/30',
  },
  {
    title: 'Festive Luxury Gifting',
    subtitle: 'Ethnic festive collections & attire',
    image: 'https://m.media-amazon.com/images/I/71eUwDk8z+L.jpg',
    to: '/category/Fashion',
    color: 'from-rose-900/80 to-rose-900/30',
  },
];

export function ShopByOccasion() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Shop by Occasion</h2>
        <Link to="/search" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group">
          <span>Browse All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {OCCASIONS.map((occ, idx) => (
          <Link
            key={idx}
            to={occ.to}
            className="relative rounded-2xl overflow-hidden aspect-[3/4] group shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-slate-900"
          >
            <img
              src={occ.image}
              alt={occ.title}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${occ.color}`} />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-black text-sm sm:text-base leading-tight">{occ.title}</h3>
              <p className="text-[11px] text-white/75 mt-0.5 font-medium">{occ.subtitle}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20 group-hover:bg-white/30 transition-colors">
                Shop Now <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
