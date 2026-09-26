import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
}

export function ProductImage({ src, alt, className = '', fallbackText = '' }: Props) {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return (
      <div className={`bg-[#f8f9fa] border border-[#e7e7e7] flex flex-col items-center justify-center p-3 text-center ${className}`}>
        <svg
          className="w-10 h-10 text-gray-400 mb-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-[11px] font-medium text-[#565959] line-clamp-1 max-w-full">
          {fallbackText || alt || 'ShopNest Product'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      loading="lazy"
      onLoad={(e) => {
        const img = e.currentTarget;
        if (img.naturalWidth <= 10 || img.naturalHeight <= 10) {
          setErrored(true);
        }
      }}
      onError={() => setErrored(true)}
    />
  );
}
