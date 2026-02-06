import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  addToCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "../store/slices/cartSlice";
import type { Product, CartItem } from "../types";
import {
  calculateCartItemsCount,
  calculateCartSubtotal,
} from "../utils/formatters";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  // Calculate totals
  const itemsCount = calculateCartItemsCount(cartItems);
  const subtotal = calculateCartSubtotal(cartItems);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  // Add product to cart
  const handleAddToCart = useCallback(
    (product: Product, quantity: number = 1) => {
      dispatch(addToCart({ product, quantity }));
    },
    [dispatch],
  );

  // Update item quantity
  const handleUpdateQuantity = useCallback(
    (id: number, quantity: number) => {
      dispatch(updateQuantity({ id, quantity }));
    },
    [dispatch],
  );

  // Increment item quantity
  const handleIncrement = useCallback(
    (id: number) => {
      dispatch(incrementQuantity(id));
    },
    [dispatch],
  );

  // Decrement item quantity
  const handleDecrement = useCallback(
    (id: number) => {
      dispatch(decrementQuantity(id));
    },
    [dispatch],
  );

  // Remove item from cart
  const handleRemove = useCallback(
    (id: number) => {
      dispatch(removeFromCart(id));
    },
    [dispatch],
  );

  // Clear entire cart
  const handleClear = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  // Check if product is in cart
  const isInCart = useCallback(
    (productId: number): boolean => {
      return cartItems.some((item) => item.id === productId);
    },
    [cartItems],
  );

  // Get cart item by product ID
  const getCartItem = useCallback(
    (productId: number): CartItem | undefined => {
      return cartItems.find((item) => item.id === productId);
    },
    [cartItems],
  );

  return {
    cartItems,
    itemsCount,
    subtotal,
    tax,
    total,
    addToCart: handleAddToCart,
    updateQuantity: handleUpdateQuantity,
    incrementQuantity: handleIncrement,
    decrementQuantity: handleDecrement,
    removeFromCart: handleRemove,
    clearCart: handleClear,
    isInCart,
    getCartItem,
  };
};

export default useCart;
