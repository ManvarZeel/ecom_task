import React from "react";
import { formatPrice } from "../../utils/formatters";
import { useCart } from "../../hooks/useCart";

export const CartSummary: React.FC = () => {
  const { itemsCount, subtotal, tax, total } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-4">
        {/* Items Count */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Items ({itemsCount})</span>
          <span className="text-gray-900">{formatPrice(subtotal)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>

        {/* Tax */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Estimated Tax (10%)</span>
          <span className="text-gray-900">{formatPrice(tax)}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-baseline">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        className="w-full mt-6 btn-primary flex items-center justify-center gap-2"
        onClick={() =>
          alert("Checkout functionality would be implemented here!")
        }
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
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
        Proceed to Checkout
      </button>

      {/* Security Badge */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
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
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        Secure checkout with SSL
      </div>
    </div>
  );
};

export default CartSummary;
