import { create } from 'zustand';
import { loadWishlist, saveWishlist } from '../lib/storage';

interface WishlistStore {
  ids: string[];
  toggle: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  ids: loadWishlist(),

  toggle: (id) => {
    const ids = get().ids;
    const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
    saveWishlist(next);
    set({ ids: next });
  },

  isWishlisted: (id) => get().ids.includes(id),

  clearWishlist: () => {
    saveWishlist([]);
    set({ ids: [] });
  },
}));
