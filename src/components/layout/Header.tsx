import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { calculateCartItemsCount } from "../../utils/formatters";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const cartItems = useAppSelector((state) => state.cart.items);
  const itemsCount = calculateCartItemsCount(cartItems);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-shadow">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">
              ShopCart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/products"
              className={`text-sm font-medium transition-colors ${
                isActive("/products")
                  ? "text-primary-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className={`relative flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive("/cart")
                  ? "text-primary-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>Cart</span>
              {itemsCount > 0 && (
                <span className="absolute -top-2 -right-3 w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-gradient-to-r from-primary-500 to-accent-500 rounded-full shadow-lg animate-pulse">
                  {itemsCount > 99 ? "99+" : itemsCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button & Cart */}
          <div className="flex items-center gap-4 md:hidden">
            <Link to="/cart" className="relative p-2">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {itemsCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-gradient-to-r from-primary-500 to-accent-500 rounded-full">
                  {itemsCount > 99 ? "99+" : itemsCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <Link
                to="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium ${
                  isActive("/products") ? "text-primary-600" : "text-gray-600"
                }`}
              >
                Products
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium flex items-center gap-2 ${
                  isActive("/cart") ? "text-primary-600" : "text-gray-600"
                }`}
              >
                Cart
                {itemsCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold text-white bg-primary-500 rounded-full">
                    {itemsCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
