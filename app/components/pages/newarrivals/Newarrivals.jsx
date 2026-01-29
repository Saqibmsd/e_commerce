"use client";
import { motion } from "motion/react";
import React, { useState } from "react";
import Link from "next/link";
import { Star, ChevronDown, TrendingUp } from "lucide-react";
import { products } from "@/data/products";
import styles from "./newarrivals.module.css";

export default function NewArrivalsPage() {
  const [sortBy, setSortBy] = useState("latest");

  let sortedProducts = [...products];

  if (sortBy === "highestRated") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "priceHighToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "priceLowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "mostPopular") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.headerContainer}>
        <div className={styles.maxContainer}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className={styles.newArrivalBadge}
          >
            <TrendingUp size={12} className="md:w-4 md:h-4" /> New Arrivals
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className={styles.pageTitle}
          >
            New Arrivals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className={styles.pageDescription}
          >
            Explore the latest trends in our premium collection.
          </motion.p>
        </div>
      </header>

      <div className={styles.maxContainer}>
        <div className={styles.utilityBar}>
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className={styles.countText}
          >
            Showing{" "}
            <span className="font-bold text-black">
              {sortedProducts.length}
            </span>{" "}
            items
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className={styles.selectWrapper}
          >
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
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          className={styles.productGrid}
        >
          {sortedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/tshirt/${product.id}-${product.title.toLowerCase().replace(/ /g, "-")}`}
              className={styles.productCard}
            >
              <div className={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.productImage}
                />

                {product.discount && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`${styles.discountBadge} relative overflow-hidden`}
                  >
                    {product.discount}

                    {/* Mirror / flash sweep */}
                    <motion.span
                      className={`${styles.discountMirror}`}
                      animate={{ left: ["-80%", "130%"] }}
                      transition={{
                        duration: 1.1,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                )}
              </div>

              <div className={styles.detailsSpace}>
                <h3 className={styles.productTitle}>{product.title}</h3>

                <div className={styles.ratingFlex}>
                  <div className={styles.starsContainer}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="md:w-3.5 md:h-3.5"
                        fill={
                          i < Math.floor(product.rating)
                            ? "currentColor"
                            : "none"
                        }
                        stroke="currentColor"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] md:text-sm text-black/60">
                    {product.rating}/5
                  </span>
                </div>

                <div className={styles.pricingFlex}>
                  <span className={styles.currentPrice}>${product.price}</span>
                  {product.oldPrice && (
                    <span className={styles.oldPrice}>${product.oldPrice}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        <div className={styles.footerSection}>
          <button className={styles.viewAllBtn}>View All Products</button>
        </div>
      </div>
    </div>
  );
}
