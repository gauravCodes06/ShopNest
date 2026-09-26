import { Link } from 'react-router-dom';
import { Star, ArrowRight, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai, MH',
    avatar: 'PS',
    rating: 5,
    product: 'Sony WH-1000XM5 Headphones',
    text: 'Absolutely love the noise cancellation. Battery life is insane — 30 hours easily. Best purchase of the year!',
    date: '3 days ago',
    color: 'bg-rose-500',
    verified: true,
  },
  {
    name: 'Rahul Verma',
    location: 'Bengaluru, KA',
    avatar: 'RV',
    rating: 5,
    product: 'boAt Rockerz 450 Headphone',
    text: 'Delivered in just 1 day with Prime. Build quality is solid and sound is very clear for the price.',
    date: '1 week ago',
    color: 'bg-blue-500',
    verified: true,
  },
  {
    name: 'Sneha Kulkarni',
    location: 'Pune, MH',
    avatar: 'SK',
    rating: 4,
    product: 'Mamaearth Vitamin C Serum',
    text: 'Skin feels noticeably brighter after 2 weeks of use. Packaging is premium and the serum absorbs quickly.',
    date: '2 weeks ago',
    color: 'bg-violet-500',
    verified: true,
  },
  {
    name: 'Arun Nair',
    location: 'Chennai, TN',
    avatar: 'AN',
    rating: 5,
    product: 'Levi\'s 511 Slim Jeans',
    text: 'Perfect fit, great fabric quality. Runs true to size. Very happy with the purchase and fast delivery.',
    date: '5 days ago',
    color: 'bg-emerald-500',
    verified: true,
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
        />
      ))}
    </div>
  );
}

export function CustomerReviewsSpotlight() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">What Customers Are Saying</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Real reviews from verified buyers</p>
        </div>
        <Link
          to="/search?q=top+rated"
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
        >
          <span>Top Rated</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REVIEWS.map((review, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-subtle hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3 relative overflow-hidden"
          >
            {/* Decorative Quote */}
            <Quote className="absolute -top-1 -right-1 w-10 h-10 text-slate-100 rotate-180" />

            {/* Reviewer */}
            <div className="flex items-center gap-3 relative z-10">
              <div className={`w-9 h-9 ${review.color} text-white rounded-full flex items-center justify-center text-xs font-black shrink-0`}>
                {review.avatar}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-slate-900">{review.name}</p>
                  {review.verified && (
                    <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-1.5 py-0.5 rounded-full">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 font-medium">{review.location}</p>
              </div>
            </div>

            {/* Rating & Product */}
            <div className="space-y-1 relative z-10">
              <StarRow rating={review.rating} />
              <p className="text-[11px] font-semibold text-slate-600 line-clamp-1">{review.product}</p>
            </div>

            {/* Review Text */}
            <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 relative z-10">
              "{review.text}"
            </p>

            {/* Date */}
            <p className="text-[10px] text-slate-400 font-medium mt-auto pt-2 border-t border-slate-100">
              {review.date}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
