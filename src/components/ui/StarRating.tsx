import { Star } from 'lucide-react';

interface Props {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
}

export function StarRating({ rating, count, size = 'sm' }: Props) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const sz = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {stars.map((s) => (
          <Star
            key={s}
            className={`${sz} ${s <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`}
          />
        ))}
      </div>
      <span className="text-amber-400 text-xs font-medium">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-slate-500 text-xs">({count.toLocaleString()})</span>
      )}
    </div>
  );
}
