import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  get,
  push,
  onValue,
  child,
  Database,
} from 'firebase/database';
import { getAnalytics, isSupported } from 'firebase/analytics';
import type { Order, CartItem, Product } from '../types/product';

// Firebase configuration provided by user
export const firebaseConfig = {
  apiKey: "AIzaSyDGDqQhfnaIIpinexOEY6D5S-pYV5LPEEU",
  authDomain: "shopnest-3cdc9.firebaseapp.com",
  databaseURL: "https://shopnest-3cdc9-default-rtdb.firebaseio.com",
  projectId: "shopnest-3cdc9",
  storageBucket: "shopnest-3cdc9.firebasestorage.app",
  messagingSenderId: "127016257180",
  appId: "1:127016257180:web:abefa795a2635b3fc08f59",
  measurementId: "G-DWLTGR2YB0",
};

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Realtime Database
export const rtdb: Database = getDatabase(app);

// Initialize Analytics safely
export let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// ── Realtime Database Helpers ──────────────────────────────────────────────

/**
 * Saves a new order to Firebase Realtime Database at /orders/{orderId}
 */
export async function saveOrderToFirebase(order: any): Promise<boolean> {
  try {
    const cleanId = (order.id || order.orderId || `order_${Date.now()}`).replace(/[#.$[\]/]/g, '_');
    const orderRef = ref(rtdb, `orders/${cleanId}`);
    await set(orderRef, {
      ...order,
      createdAt: order.createdAt || new Date().toISOString(),
      status: order.status || 'Confirmed',
    });
    return true;
  } catch (error) {
    console.warn('Firebase RTDB saveOrder warning (offline or permission):', error);
    return false;
  }
}

/**
 * Real-time listener for orders from Firebase Realtime Database
 */
export function subscribeToOrders(callback: (orders: any[]) => void): () => void {
  try {
    const ordersRef = ref(rtdb, 'orders');
    const unsubscribe = onValue(
      ordersRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const list = Object.keys(data).map((key) => ({
            ...data[key],
            id: data[key].id || data[key].orderId || key,
          }));
          callback(list.reverse());
        } else {
          callback([]);
        }
      },
      (error) => {
        console.warn('Firebase RTDB orders subscription error:', error);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('Firebase RTDB subscribeToOrders error:', err);
    return () => {};
  }
}

/**
 * Fetch orders once from Firebase Realtime Database
 */
export async function fetchOrdersFromFirebase(): Promise<any[]> {
  try {
    const ordersRef = ref(rtdb, 'orders');
    const snapshot = await get(ordersRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((key) => ({
        ...data[key],
        id: data[key].id || data[key].orderId || key,
      })).reverse();
    }
    return [];
  } catch (error) {
    console.warn('Firebase RTDB fetchOrders error:', error);
    return [];
  }
}

/**
 * Sync user cart to Firebase Realtime Database
 */
export async function syncCartToFirebase(cartItems: CartItem[], userId = 'guest_user'): Promise<void> {
  try {
    const cartRef = ref(rtdb, `carts/${userId}`);
    await set(cartRef, {
      items: cartItems,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.warn('Firebase RTDB cart sync warning:', error);
  }
}

/**
 * Sync user wishlist to Firebase Realtime Database
 */
export async function syncWishlistToFirebase(wishlistIds: string[], userId = 'guest_user'): Promise<void> {
  try {
    const wishlistRef = ref(rtdb, `wishlists/${userId}`);
    await set(wishlistRef, {
      ids: wishlistIds,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.warn('Firebase RTDB wishlist sync warning:', error);
  }
}
