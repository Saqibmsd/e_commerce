"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Filter, ChevronDown, TrendingUp } from 'lucide-react';
import { products } from "@/data/products";

export default function NewArrivalsPage() {
  const [sortBy, setSortBy] = useState('latest');

  // Sort products based on selected option
  let sortedProducts = [...products];
  
  if (sortBy === 'highestRated') {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'priceHighToLow') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'priceLowToHigh') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'mostPopular') {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }
  // latest keeps the default order
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header Section */}
      <div className="mb-12">
        <div className="max-w-[1240px] mx-auto px-4 pt-6 md:pt-8 lg:pt-12">
          <div className="inline-flex items-center gap-2 bg-black text-white px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 md:mb-4">
              <TrendingUp size={12} className="md:w-4 md:h-4" /> New Arrivals
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase mb-2 md:mb-3">New Arrivals</h1>
          <p className="text-black/60 text-xs md:text-sm lg:text-base max-w-2xl">
            Explore the latest trends in our premium collection.
          </p>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4">
        {/* 2. Utility Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-black/10">
            <span className="text-sm md:text-base font-medium text-black/60">
                Showing <span className="font-bold text-black">{sortedProducts.length}</span> items
            </span>
            <div className="w-full sm:w-auto relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto bg-[#F0F0F0] text-sm md:text-base font-medium cursor-pointer outline-none px-4 py-2 rounded-full appearance-none pr-10"
                >
                    <option value="latest">Latest</option>
                    <option value="highestRated">Highest Rated</option>
                    <option value="mostPopular">Most Popular</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-black/60" />
            </div>
        </div>

        {/* 2. Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 gap-y-6 md:gap-y-10 lg:gap-y-14">
          {sortedProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/tshirt/${product.id}-${product.title.toLowerCase().replace(/ /g, '-')}`}
              className="group"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] bg-[#F0EEED] rounded-[12px] md:rounded-[20px] overflow-hidden mb-3 md:mb-4">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-contain p-3 md:p-4 group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badge if it's high rated or has discount */}
                {product.discount && (
                  <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-500 text-white text-[8px] md:text-xs font-bold px-2 py-1 rounded">
                    {product.discount}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-1 md:space-y-2">
                <h3 className="font-bold text-xs md:text-base lg:text-lg truncate group-hover:underline">
                  {product.title}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12}
                        className="md:w-3.5 md:h-3.5"
                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                        stroke="currentColor" 
                      />
                    ))}
                  </div>
                  <span className="text-[10px] md:text-sm text-black/60">{product.rating}/5</span>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-base md:text-xl font-bold">${product.price}</span>
                  {product.oldPrice && (
                    <span className="text-black/30 line-through text-xs md:text-lg font-bold">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 3. Pagination / Load More */}
        <div className="mt-16 mb-20 flex justify-center border-t border-black/10 pt-10">
          <button className="px-8 md:px-10 py-3 md:py-4 border border-black/10 rounded-full text-sm md:text-base font-medium hover:bg-black hover:text-white transition-all active:scale-95">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
}