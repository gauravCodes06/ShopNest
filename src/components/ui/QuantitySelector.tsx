import { Minus, Plus } from 'lucide-react';
import { clamp } from '../../lib/utils';

interface Props {
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
}

export function QuantitySelector({ value, min = 1, max = 99, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1">
      <button
        aria-label="Decrease quantity"
        onClick={() => onChange(clamp(value - 1, min, max))}
        disabled={value <= min}
        className="w-8 h-8 flex items-center justify-center rounded text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-10 text-center text-slate-100 font-medium text-sm">{value}</span>
      <button
        aria-label="Increase quantity"
        onClick={() => onChange(clamp(value + 1, min, max))}
        disabled={value >= max}
        className="w-8 h-8 flex items-center justify-center rounded text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
