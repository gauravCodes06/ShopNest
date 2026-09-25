import type { CartItem, Order } from '../types/product';

const CART_KEY = 'shopsphere_cart';
const WISHLIST_KEY = 'shopsphere_wishlist';
const ORDERS_KEY = 'shopsphere_orders';

export const loadCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCart = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const loadWishlist = (): string[] => {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveWishlist = (ids: string[]) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
};

export const saveOrder = (order: Order) => {
  const existing: Order[] = loadOrders();
  localStorage.setItem(ORDERS_KEY, JSON.stringify([...existing, order]));
};

export const loadOrders = (): Order[] => {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
