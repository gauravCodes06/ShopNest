interface Props {
  className?: string;
  light?: boolean;
}

export function AmazonLogo({ className = 'h-7', light = true }: Props) {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <div className="flex flex-col relative">
        <div className="flex items-baseline">
          <span className={`text-2xl font-black tracking-tight leading-none ${light ? 'text-white' : 'text-[#0f1111]'}`}>
            amazon
          </span>
          <span className="text-[12px] font-semibold text-[#febd69] ml-0.5 leading-none">
            .in
          </span>
        </div>
        {/* Amazon iconic curved smile arrow */}
        <svg
          viewBox="0 0 100 24"
          className="w-[72px] h-[14px] -mt-1 text-[#ff9900]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 6C25 18 65 18 85 8"
            stroke="#ff9900"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M80 3L87 8L82 14"
            fill="#ff9900"
            stroke="#ff9900"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export function PrimeBadge({ className = '' }: Props) {
  return (
    <span className={`inline-flex items-center text-xs font-bold italic tracking-tighter ${className}`}>
      <span className="text-[#00a8e1] font-black text-sm">prime</span>
      <span className="text-[#ff9900] ml-0.5 text-xs font-bold">✔</span>
    </span>
  );
}
