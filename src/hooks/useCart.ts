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


  const itemsCount = calculateCartItemsCount(cartItems);
  const subtotal = calculateCartSubtotal(cartItems);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;


  const handleAddToCart = useCallback(
    (product: Product, quantity: number = 1) => {
      dispatch(addToCart({ product, quantity }));
    },
    [dispatch],
  );


  const handleUpdateQuantity = useCallback(
    (id: number, quantity: number) => {
      dispatch(updateQuantity({ id, quantity }));
    },
    [dispatch],
  );


  const handleIncrement = useCallback(
    (id: number) => {
      dispatch(incrementQuantity(id));
    },
    [dispatch],
  );


  const handleDecrement = useCallback(
    (id: number) => {
      dispatch(decrementQuantity(id));
    },
    [dispatch],
  );


  const handleRemove = useCallback(
    (id: number) => {
      dispatch(removeFromCart(id));
    },
    [dispatch],
  );


  const handleClear = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);


  const isInCart = useCallback(
    (productId: number): boolean => {
      return cartItems.some((item) => item.id === productId);
    },
    [cartItems],
  );


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
