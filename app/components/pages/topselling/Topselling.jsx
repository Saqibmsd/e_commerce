"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Star, TrendingUp, ChevronDown } from 'lucide-react';
import { products } from "@/data/products";

export default function TopSellingPage() {
  const [sortBy, setSortBy] = useState('mostPopular');

  // Sort products based on selected option
  let topSellingProducts = [...products].sort((a, b) => b.rating - a.rating);
  
  if (sortBy === 'highestRated') {
    topSellingProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'priceHighToLow') {
    topSellingProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'priceLowToHigh') {
    topSellingProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'newest') {
    topSellingProducts.sort((a, b) => b.id - a.id);
  }
  // mostPopular keeps the default rating sort

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero / Header Section */}
      <div className="mb-12">
        <div className="max-w-[1240px] mx-auto px-4 pt-6 md:pt-8 lg:pt-12">
            <div className="inline-flex items-center gap-2 bg-black text-white px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 md:mb-4">
                <TrendingUp size={12} className="md:w-4 md:h-4" /> Top Rated
            </div>
                      <h1 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase mb-2 md:mb-3">Top Selling</h1>
          <p className="text-black/60 text-xs md:text-sm lg:text-base max-w-2xl">
            The community favorites. These are the most-loved pieces that our customers can't get enough of. Grab them before they're gone.
          </p>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4">
        {/* 2. Utility Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-black/10">
            <span className="text-sm md:text-base font-medium text-black/60">
                Showing <span className="font-bold text-black">{topSellingProducts.length}</span> items
            </span>
            <div className="w-full sm:w-auto relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto bg-[#F0F0F0] text-sm md:text-base font-medium cursor-pointer outline-none px-4 py-2 rounded-full appearance-none pr-10"
                >
                    <option value="mostPopular">Most Popular</option>
                    <option value="highestRated">Highest Rated</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="newest">Newest</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-black/60" />
            </div>
        </div>

        {/* 3. High-Conversion Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 gap-y-6 md:gap-y-10 lg:gap-y-14">
          {topSellingProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/tshirt/${product.id}-${product.title.toLowerCase().replace(/ /g, '-')}`}
              className="group relative"
            >
              {/* Image Container with "Best Seller" Tag */}
              <div className="relative aspect-square bg-[#F0EEED] rounded-[12px] md:rounded-[20px] overflow-hidden mb-3 md:mb-5">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-contain p-3 md:p-6 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                
                {/* Visual Badge for Top Sellers */}
                <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/90 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1 rounded-full shadow-sm text-[8px] md:text-[10px] font-bold uppercase text-black">
                  Best Seller
                </div>
              </div>

              {/* Product Info */}
              <div className="px-1">
                <h3 className="font-bold text-xs md:text-base lg:text-lg mb-1 md:mb-2 truncate leading-tight">
                  {product.title}
                </h3>
                
                {/* Star Rating with Review Count Placeholder */}
                <div className="flex items-center gap-1 md:gap-1.5 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        className="md:w-4 md:h-4"
                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                        stroke="currentColor" 
                      />
                    ))}
                  </div>
                  <span className="text-[10px] md:text-xs text-black/50">({product.rating})</span>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-base md:text-xl font-black text-black">${product.price}</span>
                  {product.oldPrice && (
                    <span className="text-black/30 line-through text-xs md:text-base font-bold">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 4. Footer Spacer */}
        <div className="h-24"></div>
      </div>
    </div>
  );
}