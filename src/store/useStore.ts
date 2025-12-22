'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, ProductColor } from '@/types';

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color: ProductColor, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // UI State
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart State
      cart: [],

      addToCart: (product, color, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product.id === product.id && item.selectedColor.name === color.name
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id && item.selectedColor.name === color.name
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, { product, quantity, selectedColor: color }],
          };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },

      getCartCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Wishlist State
      wishlist: [],

      addToWishlist: (product) => {
        set((state) => {
          if (state.wishlist.find((p) => p.id === product.id)) {
            return state;
          }
          return { wishlist: [...state.wishlist, product] };
        });
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((p) => p.id !== productId),
        }));
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((p) => p.id === productId);
      },

      // UI State
      isCartOpen: false,
      setIsCartOpen: (open) => set({ isCartOpen: open }),

      isSearchOpen: false,
      setIsSearchOpen: (open) => set({ isSearchOpen: open }),
    }),
    {
      name: 'luxe-coach-store',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
      }),
    }
  )
);
