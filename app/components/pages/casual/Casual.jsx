"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { motion } from "motion/react";
import {
  Filter,
  ChevronRight,
  ChevronDown,
  Star,
  X,
  Check,
  SlidersHorizontal,
} from "lucide-react";
import styles from "./casual.module.css";

export default function CasualPage() {
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // --- UI STATES ---
  const [tempCategory, setTempCategory] = useState("");
  const [tempColor, setTempColor] = useState("");
  const [tempSize, setTempSize] = useState("");
  const [tempStyle, setTempStyle] = useState("");
  const [tempPrice, setTempPrice] = useState(500);

  // --- ACTIVE STATES ---
  const [appliedFilters, setAppliedFilters] = useState({
    category: "",
    color: "",
    size: "",
    style: "",
    price: 500,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [openSections, setOpenSections] = useState({
    price: true,
    colors: true,
    size: true,
    style: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const colors = [
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-400",
    "bg-orange-500",
    "bg-cyan-400",
    "bg-blue-700",
    "bg-purple-500",
    "bg-pink-500",
    "bg-white",
    "bg-black",
  ];

  const handleApplyFilters = () => {
    setAppliedFilters({
      category: tempCategory,
      color: tempColor,
      size: tempSize,
      style: tempStyle,
      price: tempPrice,
    });
    setMobileFiltersOpen(false);
  };

  const handleClearFilters = () => {
    setTempCategory("");
    setTempColor("");
    setTempSize("");
    setTempStyle("");
    setTempPrice(500);
    setAppliedFilters({
      category: "",
      color: "",
      size: "",
      style: "",
      price: 500,
    });
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      return (
        (!appliedFilters.category || p.category === appliedFilters.category) &&
        p.price <= appliedFilters.price &&
        (!appliedFilters.color || p.color === appliedFilters.color) &&
        (!appliedFilters.size || p.size === appliedFilters.size) &&
        (!appliedFilters.style || p.style === appliedFilters.style)
      );
    });
  }, [appliedFilters]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const SidebarContent = () => (
    <div className="flex flex-col gap-6 overflow-hidden">
      <div className={styles.sidebarTitleRow}>
        <h3 className="text-xl font-bold">Filters</h3>
        <SlidersHorizontal
          size={20}
          className="hidden lg:block opacity-40 overflow-hidden"
        />
        <button
          onClick={() => setMobileFiltersOpen(false)}
          className="lg:hidden"
        >
          <X size={24} />
        </button>
      </div>

      <div className={styles.sidebarSection}>
        {["T-shirts", "Shirts", "Hoodie", "Jeans"].map((cat) => (
          <div
            key={cat}
            onClick={() => setTempCategory(cat)}
            className={`${styles.categoryItem} ${
              tempCategory === cat ? "font-bold text-black" : "text-black/60"
            }`}
          >
            {cat} <ChevronRight size={16} />
          </div>
        ))}
      </div>

      <div className={styles.sidebarSection}>
        <button
          onClick={() => toggleSection("price")}
          className={styles.sectionHeader}
        >
          Price{" "}
          <ChevronDown
            size={18}
            className={openSections.price ? "rotate-180" : ""}
          />
        </button>
        {openSections.price && (
          <div className="px-2">
            <div className="relative w-full h-6 flex items-center">
              <input
                type="range"
                min="50"
                max="500"
                value={tempPrice}
                onChange={(e) => setTempPrice(Number(e.target.value))}
                className={styles.rangeInput}
                style={{
                  background: `linear-gradient(to right, black 0%, black ${
                    ((tempPrice - 50) / (500 - 50)) * 100
                  }%, #F0F0F0 ${((tempPrice - 50) / (500 - 50)) * 100}%, #F0F0F0 100%)`,
                }}
              />
            </div>
            <div className="flex justify-between mt-2 font-bold text-sm">
              <span>$50</span>
              <span className="text-black">${tempPrice}</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.sidebarSection}>
        <button
          onClick={() => toggleSection("colors")}
          className={styles.sectionHeader}
        >
          Colors{" "}
          <ChevronDown
            size={18}
            className={openSections.colors ? "rotate-180" : ""}
          />
        </button>
        {openSections.colors && (
          <div className={styles.colorGrid}>
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setTempColor(c)}
                className={`${styles.colorCircle} ${c}`}
              >
                {tempColor === c && (
                  <Check
                    size={14}
                    className={c === "bg-white" ? "text-black" : "text-white"}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.sidebarSection}>
        <button
          onClick={() => toggleSection("size")}
          className={styles.sectionHeader}
        >
          Size{" "}
          <ChevronDown
            size={18}
            className={openSections.size ? "rotate-180" : ""}
          />
        </button>
        {openSections.size && (
          <div className={styles.sizeFlex}>
            {["Small", "Medium", "Large", "X-Large"].map((s) => (
              <button
                key={s}
                onClick={() => setTempSize(s)}
                className={`${styles.sizeButton} ${
                  tempSize === s
                    ? "bg-black text-white"
                    : "bg-[#F0F0F0] text-black/60 hover:bg-black/10"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pb-6">
        <button
          onClick={() => toggleSection("style")}
          className={styles.sectionHeader}
        >
          Dress Style{" "}
          <ChevronDown
            size={18}
            className={openSections.style ? "rotate-180" : ""}
          />
        </button>
        {openSections.style && (
          <div className="space-y-2">
            {["Casual", "Formal", "Party", "Gym"].map((style) => (
              <div
                key={style}
                onClick={() => setTempStyle(style)}
                className={`${styles.categoryItem} ${
                  tempStyle === style ? "font-bold text-black" : "text-black/60"
                }`}
              >
                {style} <ChevronRight size={16} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <button onClick={handleClearFilters} className={styles.actionButton}>
          Clear Filters
        </button>
        <button onClick={handleApplyFilters} className={styles.actionButton}>
          Apply Filter
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.pageWrapper}>
      <div
        className={`${styles.mobileDrawerOverlay} ${isMobileFiltersOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileFiltersOpen(false)}
      />
      <div
        className={`${styles.mobileDrawerContent} ${isMobileFiltersOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <SidebarContent />
      </div>

      <div className={styles.maxContainer}>
        <div className={styles.mainFlexLayout}>
          <motion.aside
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className={styles.sidebarSticky}
          >
            <SidebarContent />
          </motion.aside>

          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <motion.h2
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl md:text-3xl font-bold"
              >
                Casual
              </motion.h2>
              <div className="flex items-center gap-4">
                <motion.span
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                  className="text-black/60 hidden md:block text-sm"
                >
                  Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}-
                  {Math.min(
                    startIndex + productsPerPage,
                    filteredProducts.length,
                  )}{" "}
                  of {filteredProducts.length} Products
                </motion.span>
                <motion.button
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden w-10 h-10 bg-[#F0F0F0] rounded-full flex items-center justify-center"
                >
                  <Filter size={20} />
                </motion.button>
              </div>
            </div>

            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                  className={styles.productGrid}
                >
                  {paginatedProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/tshirt/${p.id}-${p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      className={styles.productCard}
                    >
                      <div className={styles.imageContainer}>
                        <img
                          src={p.image}
                          alt={p.title}
                          className={styles.productImage}
                        />
                      </div>
                      <h3 className="font-bold text-sm md:text-base mb-1 truncate">
                        {p.title}
                      </h3>
                      <div className="flex items-center gap-1 text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={
                              i < Math.floor(p.rating) ? "currentColor" : "none"
                            }
                            stroke="currentColor"
                          />
                        ))}
                        <span className="text-black/60 text-xs ml-1">
                          {p.rating}/5
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={styles.priceText}>${p.price}</span>
                        {p.oldPrice && (
                          <span className={styles.oldPriceText}>
                            ${p.oldPrice}
                          </span>
                        )}
                        {p.discount && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                              duration: 0.8,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`${styles.discountBadge} relative overflow-hidden`}
                          >
                            {p.discount}

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
                          </motion.span>
                        )}
                      </div>
                    </Link>
                  ))}
                </motion.div>
              ) : (
                <div className="py-20 text-center border-b">
                  <p className="text-black/50 text-xl font-medium">
                    No products match your filters.
                  </p>
                </div>
              )}
            </div>

            <div
              className={`${styles.paginationWrapper} ${filteredProducts.length === 0 ? "opacity-30 pointer-events-none" : ""}`}
            >
              <motion.button
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`${styles.pageBtn} ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"}`}
              >
                Previous
              </motion.button>
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                className=" md:flex"
              >
                {generatePageNumbers().map((num, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      typeof num === "number" && setCurrentPage(num)
                    }
                    disabled={num === "..."}
                    className={`${styles.pageNumber} ${num === currentPage ? "bg-black text-white" : "hover:bg-gray-100"}`}
                  >
                    {num}
                  </button>
                ))}
              </motion.div>
              <motion.button
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className={`${styles.pageBtn} ${currentPage === totalPages || totalPages === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white"}`}
              >
                Next
              </motion.button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
