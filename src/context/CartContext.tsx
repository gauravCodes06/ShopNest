import { create } from 'zustand';
import type { CartItem } from '../types/product';
import { loadCart, saveCart } from '../lib/storage';

interface CartStore {
  items: CartItem[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: loadCart(),

  addItem: (productId, quantity = 1) => {
    const items = get().items;
    const existing = items.find((i) => i.productId === productId);
    let next: CartItem[];
    if (existing) {
      next = items.map((i) =>
        i.productId === productId
          ? { ...i, quantity: i.quantity + quantity }
          : i
      );
    } else {
      next = [...items, { productId, quantity }];
    }
    saveCart(next);
    set({ items: next });
  },

  removeItem: (productId) => {
    const next = get().items.filter((i) => i.productId !== productId);
    saveCart(next);
    set({ items: next });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    const next = get().items.map((i) =>
      i.productId === productId ? { ...i, quantity } : i
    );
    saveCart(next);
    set({ items: next });
  },

  clearCart: () => {
    saveCart([]);
    set({ items: [] });
  },

  getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
