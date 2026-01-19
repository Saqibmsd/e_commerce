"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Star, ChevronDown, TrendingUp } from 'lucide-react';
import { products } from "@/data/products";
import styles from "./newarrivals.module.css";

export default function NewArrivalsPage() {
  const [sortBy, setSortBy] = useState('latest');

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

  return (
    <div className={`${styles.pageWrapper} container mx-auto px-4 lg:px-10`}>
      <header className={styles.headerContainer}>
        <div className={styles.maxContainer}>
          <div className={styles.newArrivalBadge}>
            <TrendingUp size={12} className="md:w-4 md:h-4" /> New Arrivals
          </div>
          <h1 className={styles.pageTitle}>New Arrivals</h1>
          <p className={styles.pageDescription}>
            Explore the latest trends in our premium collection.
          </p>
        </div>
      </header>

      <div className={styles.maxContainer}>
        <div className={styles.utilityBar}>
          <span className={styles.countText}>
            Showing <span className="font-bold text-black">{sortedProducts.length}</span> items
          </span>
          <div className={styles.selectWrapper}>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="latest">Latest</option>
              <option value="highestRated">Highest Rated</option>
              <option value="mostPopular">Most Popular</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="priceLowToHigh">Price: Low to High</option>
            </select>
            <ChevronDown size={16} className={styles.selectIcon} />
          </div>
        </div>

        <div className={styles.productGrid}>
          {sortedProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/tshirt/${product.id}-${product.title.toLowerCase().replace(/ /g, '-')}`}
              className={styles.productCard}
            >
              <div className={styles.imageContainer}>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className={styles.productImage} 
                />
                {product.discount && (
                  <div className={styles.discountBadge}>
                    {product.discount}
                  </div>
                )}
              </div>

              <div className={styles.detailsSpace}>
                <h3 className={styles.productTitle}>
                  {product.title}
                </h3>
                
                <div className={styles.ratingFlex}>
                  <div className={styles.starsContainer}>
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

                <div className={styles.pricingFlex}>
                  <span className={styles.currentPrice}>${product.price}</span>
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

        <div className={styles.footerSection}>
          <button className={styles.viewAllBtn}>
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
}