"use client";
import { motion } from "motion/react";
import React, { useState } from "react";
import Link from "next/link";
import { Star, TrendingUp, ChevronDown } from "lucide-react";
import { products } from "@/data/products";
import styles from "./topselling.module.css"; // Import styles

export default function TopSellingPage() {
  const [sortBy, setSortBy] = useState("mostPopular");

  // Sort logic
  let topSellingProducts = [...products].sort((a, b) => b.rating - a.rating);

  if (sortBy === "highestRated") {
    topSellingProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "priceHighToLow") {
    topSellingProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "priceLowToHigh") {
    topSellingProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "newest") {
    topSellingProducts.sort((a, b) => b.id - a.id);
  }

  return (
    <div className={styles.pageWrapper}>
      {/* 1. Hero / Header Section */}
      <div className={styles.heroSection}>
        <div className={styles.maxContainer}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className={styles.topRatedBadge}
          >
            <TrendingUp size={12} className="md:w-4 md:h-4" /> Top Rated
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className={styles.title}
          >
            Top Selling
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className={styles.pageDescription}
          >
            The community favorites. These are the most-loved pieces that our
            customers can't get enough of. Grab them before they're gone.
          </motion.p>
        </div>
      </div>

      <div className={styles.maxContainer}>
        {/* 2. Utility Bar */}
        <div className={styles.utilityBar}>
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className={styles.showingText}
          >
            Showing{" "}
            <span className="font-bold text-black">
              {topSellingProducts.length}
            </span>{" "}
            items
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className={styles.selectContainer}
          >
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
          </motion.div>
        </div>

        {/* 3. High-Conversion Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          className={styles.productGrid}
        >
          {topSellingProducts.map((product) => (
            <Link
              key={product.id}
              href={`/tshirt/${product.id}-${product.title.toLowerCase().replace(/ /g, "-")}`}
              className={styles.productCard}
            >
              {/* Image Container */}
              <div className={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.productImage}
                />

                {/* Best Seller Badge with shine effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`${styles.bestSellerBadge} relative overflow-hidden`}
                >
                  Best Seller
                  {/* Mirror / flash sweep */}
                  <motion.span
                    className={styles.bestSellerBadgeMirror}
                    animate={{ left: ["-80%", "130%"] }}
                    transition={{
                      duration: 1.1,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>

              {/* Product Info */}
              <div className={styles.infoWrapper}>
                <h3 className={styles.productTitle}>{product.title}</h3>

                <div className={styles.ratingRow}>
                  <div className={styles.starsContainer}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="md:w-4 md:h-4"
                        fill={
                          i < Math.floor(product.rating)
                            ? "currentColor"
                            : "none"
                        }
                        stroke="currentColor"
                      />
                    ))}
                  </div>
                  <span className={styles.reviewCount}>({product.rating})</span>
                </div>

                <div className={styles.pricingRow}>
                  <span className={styles.price}>${product.price}</span>
                  {product.oldPrice && (
                    <span className={styles.oldPrice}>${product.oldPrice}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* 4. Footer Spacer */}
        <div className={styles.footerSpacer}></div>
      </div>
    </div>
  );
}
