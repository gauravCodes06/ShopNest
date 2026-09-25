export const formatPrice = (price: number): string => {
  const inr = Math.round(price * 80);
  return '₹' + inr.toLocaleString('en-IN');
};

export const generateOrderId = (): string => {
  const p1 = Math.floor(100 + Math.random() * 900);
  const p2 = Math.floor(1000000 + Math.random() * 9000000);
  const p3 = Math.floor(1000000 + Math.random() * 9000000);
  return `${p1}-${p2}-${p3}`;
};

export const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

export const cn = (...classes: (string | undefined | false | null)[]): string =>
  classes.filter(Boolean).join(' ');
