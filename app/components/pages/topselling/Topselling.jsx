"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Star, TrendingUp, ChevronDown } from 'lucide-react';
import { products } from "@/data/products";
import styles from "./topselling.module.css"; // Import styles

export default function TopSellingPage() {
  const [sortBy, setSortBy] = useState('mostPopular');

  // Sort logic
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

  return (
    <div className={`${styles.pageWrapper} container mx-auto px-4 lg:px-10`}>
      {/* 1. Hero / Header Section */}
      <div className={styles.heroSection}>
        <div className={styles.maxContainer}>
          <div className={styles.topRatedBadge}>
            <TrendingUp size={12} className="md:w-4 md:h-4" /> Top Rated
          </div>
          <h1 className={styles.title}>Top Selling</h1>
          <p className={styles.description}>
            The community favorites. These are the most-loved pieces that our customers can't get enough of. Grab them before they're gone.
          </p>
        </div>
      </div>

      <div className={styles.maxContainer}>
        {/* 2. Utility Bar */}
        <div className={styles.utilityBar}>
          <span className={styles.showingText}>
            Showing <span className="font-bold text-black">{topSellingProducts.length}</span> items
          </span>
          <div className={styles.selectContainer}>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="mostPopular">Most Popular</option>
              <option value="highestRated">Highest Rated</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="newest">Newest</option>
            </select>
            <ChevronDown size={16} className={styles.selectIcon} />
          </div>
        </div>

        {/* 3. High-Conversion Grid */}
        <div className={styles.productGrid}>
          {topSellingProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/tshirt/${product.id}-${product.title.toLowerCase().replace(/ /g, '-')}`}
              className={styles.productCard}
            >
              {/* Image Container */}
              <div className={styles.imageContainer}>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className={styles.productImage} 
                />
                <div className={styles.bestSellerBadge}>
                  Best Seller
                </div>
              </div>

              {/* Product Info */}
              <div className={styles.infoWrapper}>
                <h3 className={styles.productTitle}>
                  {product.title}
                </h3>
                
                <div className={styles.ratingRow}>
                  <div className={styles.starsContainer}>
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
                  <span className={styles.reviewCount}>({product.rating})</span>
                </div>

                <div className={styles.pricingRow}>
                  <span className={styles.price}>${product.price}</span>
                  {product.oldPrice && (
                    <span className={styles.oldPrice}>
                      ${product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 4. Footer Spacer */}
        <div className={styles.footerSpacer}></div>
      </div>
    </div>
  );
}