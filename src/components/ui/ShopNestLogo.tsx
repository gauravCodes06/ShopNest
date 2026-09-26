import React from 'react';

interface ShopNestLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  whiteText?: boolean;
}

export function ShopNestLogo({
  className = '',
  showTagline = false,
  size = 'md',
  whiteText = false,
}: ShopNestLogoProps) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Stylized double-leaf logo icon in Sage Green */}
      <div className={`${iconSizes[size]} shrink-0 text-emerald-600`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Main Leaf */}
          <path
            d="M8 28C8 14 20 6 34 6C34 20 26 32 12 32C10.5 32 9.2 31.8 8 31.4C8 30.3 8 29.1 8 28Z"
            fill="#059669"
          />
          {/* Leaf vein */}
          <path
            d="M10 30C16 26 24 18 30 10"
            stroke="#A7F3D0"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Accent small sprout leaf */}
          <path
            d="M8 28C6 22 10 16 16 14C16 19 13 25 8 28Z"
            fill="#10B981"
            opacity="0.9"
          />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-center">
          <span
            className={`font-extrabold tracking-tight ${textSizes[size]} ${
              whiteText ? 'text-white' : 'text-slate-900'
            }`}
          >
            Shop<span className="text-emerald-600">Nest</span>
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-slate-500 tracking-normal mt-0.5">
            Discover More. Shop Smarter.
          </span>
        )}
      </div>
    </div>
  );
}
