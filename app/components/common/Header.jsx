"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  CircleUserRound,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { newItemsCount, clearNotificationBadge } = useCart();

  return (
    <header className="w-full bg-white sticky top-0 z-50">
      {/* Main Container */}
      <div className="container mx-auto px-4 lg:px-10 flex items-center justify-between h-16 md:h-20 gap-4">
        {/* Left Section: Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <a
            href="/"
            className="text-2xl md:text-3xl font-black tracking-tighter text-black"
          >
            SHOP.CO
          </a>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {/* <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600 transition-colors">
            <span>Shop</span>
            <ChevronDown size={16} />
          </div> */}
          <a
            href="/"
            className="hover:text-gray-600 transition-colors whitespace-nowrap"
          >
            Home
          </a>
          <a
            href="/casual"
            className="hover:text-gray-600 transition-colors whitespace-nowrap"
          >
            Casual
          </a>
          <a
            href="/newarrivals"
            className="hover:text-gray-600 transition-colors whitespace-nowrap"
          >
            New Arrivals
          </a>
          <a
            href="/topselling"
            className="hover:text-gray-600 transition-colors whitespace-nowrap"
          >
            Top Selling
          </a>
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 items-center bg-[#f0f0f0] rounded-full px-4 py-2.5 max-w-[600px]">
          <Search className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent w-full outline-none text-sm placeholder:text-gray-500"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search Icon - Mobile Only */}
          <button className="md:hidden text-black">
            <Search size={22} />
          </button>

          <Link href="/cart" onClick={() => clearNotificationBadge()}>
            <button className="text-black hover:opacity-70 cursor-pointer mt-2 relative">
              <ShoppingCart size={22} />
              {newItemsCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {newItemsCount}
                </div>
              )}
            </button>
          </Link>

          <button className="text-black hover:opacity-70">
            <CircleUserRound size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 py-4 px-6 flex flex-col gap-4 font-medium animate-in slide-in-from-top-2">
          {/* <a href="/shop" onClick={() => setIsMenuOpen(false)}>
            Shop
          </a> */}
          <a href="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </a>
          <a href="/casual" onClick={() => setIsMenuOpen(false)}>
            Casual
          </a>
          <a href="/topselling" onClick={() => setIsMenuOpen(false)}>
            Top Selling
          </a>
          <a href="/newarrivals" onClick={() => setIsMenuOpen(false)}>
            New Arrivals
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
