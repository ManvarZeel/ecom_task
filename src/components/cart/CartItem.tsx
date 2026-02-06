import React from "react";
import { Link } from "react-router-dom";
import type { CartItem as CartItemType } from "../../types";
import { formatPrice } from "../../utils/formatters";
import { useCart } from "../../hooks/useCart";
import toast from "react-hot-toast";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();

  const handleRemove = () => {
    removeFromCart(item.id);
    toast.success(`${item.title} removed from cart`, {
      duration: 2000,
      icon: "🗑️",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      {/* Product Image */}
      <Link
        to={`/products/${item.id}`}
        className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100 hover:opacity-80 transition-opacity"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/products/${item.id}`}
          className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-1"
        >
          {item.title}
        </Link>
        <p className="text-sm text-gray-500 mt-1">
          Unit price: {formatPrice(item.price)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => decrementQuantity(item.id)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Decrease quantity"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
          <span className="w-10 h-8 flex items-center justify-center font-medium text-gray-900 border-x border-gray-200">
            {item.quantity}
          </span>
          <button
            onClick={() => incrementQuantity(item.id)}
            disabled={item.quantity >= 10}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Increase quantity"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>

        {/* Subtotal */}
        <span className="w-24 text-right font-semibold text-gray-900">
          {formatPrice(item.subtotal)}
        </span>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Remove item"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
