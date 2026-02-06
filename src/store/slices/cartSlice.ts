import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartState, CartItem, Product } from "../../types";


const CART_STORAGE_KEY = "ecommerce_cart";


const loadCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
  }
  return [];
};


const saveCartToStorage = (items: CartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};


const initialState: CartState = {
  items: loadCartFromStorage(),
};

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>,
    ) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.subtotal = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: quantity,
          image: product.thumbnail,
          subtotal: product.price * quantity,
        });
      }
      saveCartToStorage(state.items);
    },


    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;
        item.subtotal = item.price * item.quantity;
        saveCartToStorage(state.items);
      }
    },


    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.subtotal = item.price * item.quantity;
        saveCartToStorage(state.items);
      }
    },


    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.subtotal = item.price * item.quantity;
        saveCartToStorage(state.items);
      }
    },


    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },

    loadCart: (state) => {
      state.items = loadCartFromStorage();
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  loadCart,
} = cartSlice.actions;

export default cartSlice.reducer;
