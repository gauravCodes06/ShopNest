import { Star } from 'lucide-react';

interface Props {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export function StarRating({ rating, count, size = 'sm', showCount = true }: Props) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const sz = size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-1.5 select-none">
      <div className="flex items-center text-[#de7921]">
        {[1, 2, 3, 4, 5].map((s) => {
          const isFilled = s <= fullStars || (s === fullStars + 1 && hasHalf);
          return (
            <Star
              key={s}
              className={`${sz} ${isFilled ? 'text-[#de7921] fill-[#de7921]' : 'text-gray-300'}`}
              strokeWidth={1}
            />
          );
        })}
      </div>
      <span className="text-xs text-[#007185] hover:text-[#c7511f] font-normal hover:underline cursor-pointer">
        {rating.toFixed(1)}
      </span>
      {count !== undefined && showCount && (
        <span className="text-xs text-[#007185] hover:text-[#c7511f] font-normal hover:underline cursor-pointer">
          ({count.toLocaleString('en-IN')})
        </span>
      )}
    </div>
  );
}
