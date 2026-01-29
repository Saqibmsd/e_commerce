"use client";
import { usePathname } from "next/navigation";

import React, { useState } from "react";
import { ArrowRight, Instagram, Twitter, Facebook } from "lucide-react";
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
  const pathname = usePathname();

  return (
    <header className="w-full bg-white sticky top-0 z-50 overflow-hidden">
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
          {[
            { name: "Home", href: "/" },
            { name: "Casual", href: "/casual" },
            { name: "New Arrivals", href: "/newarrivals" },
            { name: "Top Selling", href: "/topselling" },
          ].map((link) => {
            const isActive = pathname === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative pb-1 font-medium whitespace-nowrap transition-colors
          ${isActive ? "text-black" : "text-gray-500 hover:text-black"}
        `}
              >
                {link.name}

                {/* Underline */}
                <span
                  className={`absolute left-0 -bottom-0.5 h-[2px] w-full rounded-full transition-all duration-300
            ${
              isActive
                ? "bg-[rgb(35,94,30)] scale-x-100"
                : "bg-[rgb(26,255,0)] scale-x-0 group-hover:scale-x-100"
            }
          `}
                />
              </a>
            );
          })}
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

          <Link href="/profile">
            <button className="text-black hover:opacity-70 cursor-pointer mt-2 relative">
              <CircleUserRound size={22} />
            </button>
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* 1. Blurred Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* 2. Menu Content Card */}
          <div className="absolute left-0 top-0 rounded-r-4xl border-rounded h-full w-[85%] bg-gray-900 py-8 px-6 shadow-2xl animate-in slide-in-from-left duration-500 ease-out flex flex-col">
            {/* Close Button Header */}
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full bg-gray-300 hover:bg-gray-200 transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 3. Main Navigation Links */}
            <nav className="flex flex-col gap-4">
              {[
                { name: "Home", href: "/" },
                { name: "Casual", href: "/casual" },
                { name: "New Arrivals", href: "/newarrivals" },
                { name: "Top Selling", href: "/topselling" },
              ].map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-between border-b border-gray-300 pb-2"
                  style={{
                    animationDelay: `${index * 75}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <span className="text-2xl font-bold tracking-tight text-gray-300 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </span>
                  <ArrowRight className=" -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gray-300" />
                </a>
              ))}
            </nav>

            {/* 4. Bottom Section (Socials & Contact) */}
            <div className="mt-12">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-6">
                Follow Us
              </p>
              <div className="flex gap-4">
                <Instagram className="w-6 h-6 text-gray-400 hover:text-pink-600 transition-colors cursor-pointer" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer" />
                <Facebook className="w-6 h-6 text-gray-400 hover:text-blue-700 transition-colors cursor-pointer" />
              </div>

              <div className="mt-8 p-4 bg-gray-100 rounded-2xl">
                <p className="text-sm font-medium text-gray-900">Need help?</p>
                <p className="text-xs text-gray-500">support@yourbrand.com</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
