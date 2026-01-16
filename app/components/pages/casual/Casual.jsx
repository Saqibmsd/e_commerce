"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import {
  Filter,
  ChevronRight,
  ChevronDown,
  Star,
  X,
  Check,
  SlidersHorizontal,
} from "lucide-react";

export default function CasualPage() {
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // --- UI STATES (Temporary values while clicking) ---
  const [tempCategory, setTempCategory] = useState("");
  const [tempColor, setTempColor] = useState("");
  const [tempSize, setTempSize] = useState("");
  const [tempStyle, setTempStyle] = useState("");
  const [tempPrice, setTempPrice] = useState(500);

  // --- ACTIVE STATES (Actual values used for filtering) ---
  const [appliedFilters, setAppliedFilters] = useState({
    category: "",
    color: "",
    size: "",
    style: "",
    price: 500,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Toggle sections state
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

  // Apply filters function
  const handleApplyFilters = () => {
    setAppliedFilters({
      category: tempCategory,
      color: tempColor,
      size: tempSize,
      style: tempStyle,
      price: tempPrice,
    });
    setMobileFiltersOpen(false); // Close drawer on mobile after applying
  };

  // Clear all filters function
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
    setCurrentPage(1); // Reset to page 1
  };

  // Filter logic uses appliedFilters, NOT temp states
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

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Generate page numbers dynamically
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const SidebarContent = () => (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h3 className="text-xl font-bold">Filters</h3>
        <SlidersHorizontal size={20} className="hidden lg:block opacity-40" />
        <button
          onClick={() => setMobileFiltersOpen(false)}
          className="lg:hidden"
        >
          <X size={24} />
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-4 border-b pb-6">
        {["T-shirts", "Shirts", "Hoodie", "Jeans"].map((cat) => (
          <div
            key={cat}
            onClick={() => setTempCategory(cat)}
            className={`flex justify-between items-center cursor-pointer transition-all ${
              tempCategory === cat ? "font-bold text-black" : "text-black/60"
            }`}
          >
            {cat} <ChevronRight size={16} />
          </div>
        ))}
      </div>

      {/* Price Section */}
      <div className="border-b pb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex justify-between items-center w-full mb-4 font-bold"
        >
          Price{" "}
          <ChevronDown
            size={18}
            className={`transition-transform ${
              openSections.price ? "rotate-180" : ""
            }`}
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
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-black bg-transparent z-10"
                style={{
                  // This creates the black "fill" effect on the left side of the slider
                  background: `linear-gradient(to right, black 0%, black ${
                    ((tempPrice - 50) / (500 - 50)) * 100
                  }%, #F0F0F0 ${
                    ((tempPrice - 50) / (500 - 50)) * 100
                  }%, #F0F0F0 100%)`,
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

      {/* Colors */}
      <div className="border-b pb-6">
        <button
          onClick={() => toggleSection("colors")}
          className="flex justify-between items-center w-full mb-4 font-bold"
        >
          Colors{" "}
          <ChevronDown
            size={18}
            className={`transition-transform ${
              openSections.colors ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.colors && (
          <div className="grid grid-cols-5 gap-3">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setTempColor(c)}
                className={`w-9 h-9 rounded-full ${c} border border-black/10 flex items-center justify-center transition-transform active:scale-90`}
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

      {/* Size */}
      <div className="border-b pb-6">
        <button
          onClick={() => toggleSection("size")}
          className="flex justify-between items-center w-full mb-4 font-bold"
        >
          Size{" "}
          <ChevronDown
            size={18}
            className={`transition-transform ${
              openSections.size ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.size && (
          <div className="flex flex-wrap gap-2">
            {["Small", "Medium", "Large", "X-Large"].map((s) => (
              <button
                key={s}
                onClick={() => setTempSize(s)}
                className={`px-5 py-2 rounded-full text-sm transition-all ${
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

      {/* Dress Style */}
      <div className="pb-6">
        <button
          onClick={() => toggleSection("style")}
          className="flex justify-between items-center w-full mb-4 font-bold"
        >
          Dress Style{" "}
          <ChevronDown
            size={18}
            className={`transition-transform ${
              openSections.style ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.style && (
          <div className="space-y-2">
            {["Casual", "Formal", "Party", "Gym"].map((style) => (
              <div
                key={style}
                onClick={() => setTempStyle(style)}
                className={`flex justify-between items-center py-1 cursor-pointer transition-all ${
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
                <button
          onClick={handleClearFilters}
          className="w-full bg-black text-white py-4 rounded-full font-medium mt-2 hover:bg-black/90 active:scale-[0.98] transition-all cursor-pointer"
        >
          Clear Filters
        </button>
        <button
          onClick={handleApplyFilters}
          className="w-full bg-black text-white py-4 rounded-full font-medium mt-2 hover:bg-black/90 active:scale-[0.98] transition-all cursor-pointer"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* MOBILE FILTER DRAWER */}
      <div
        className={`fixed inset-0 bg-black/40 z-[100] transition-opacity lg:hidden ${
          isMobileFiltersOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileFiltersOpen(false)}
      />
      <div
        className={`fixed inset-x-0 bottom-0 z-[101] bg-white rounded-t-[30px] p-6 transition-transform duration-300 lg:hidden max-h-[90vh] overflow-y-auto ${
          isMobileFiltersOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <SidebarContent />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-20 py-8">
        {/* <div className="flex items-center gap-2 text-sm text-black/60 mb-8 border-t pt-6">
          Home <ChevronRight size={14} />{" "}
          <span className="text-black">Casual</span>
        </div> */}

        <div className="flex gap-8">
          <aside className="hidden lg:block w-[295px] border rounded-[20px] p-6 h-fit sticky top-6">
            <SidebarContent />
          </aside>

          <main className="flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Casual</h2>
              <div className="flex items-center gap-4">
                <span className="text-black/60 hidden md:block text-sm">
                  Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}-
                  {Math.min(startIndex + productsPerPage, filteredProducts.length)} of{" "}
                  {filteredProducts.length} Products
                </span>
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden w-10 h-10 bg-[#F0F0F0] rounded-full flex items-center justify-center"
                >
                  <Filter size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 border-b pb-12">
                  {paginatedProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/tshirt/${p.id}-${p.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "")}`}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-square bg-[#F0EEED] rounded-[20px] overflow-hidden mb-4">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-contain group-hover:scale-110 transition duration-500"
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
                        <span className="font-bold text-lg md:text-xl">
                          ${p.price}
                        </span>
                        {p.oldPrice && (
                          <span className="text-black/40 line-through font-bold text-sm md:text-lg">
                            ${p.oldPrice}
                          </span>
                        )}
                        {p.discount && (
                          <span className="bg-red-100 text-red-500 text-[10px] px-2 py-0.5 rounded-full">
                            {p.discount}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center border-b">
                  <p className="text-black/50 text-xl font-medium">
                    No products match your filters.
                  </p>
                </div>
              )}
            </div>

            <div
              className={`flex justify-between items-center mt-10 transition-all ${
                filteredProducts.length === 0 ? "opacity-30 pointer-events-none" : ""
              }`}
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-black hover:text-white"
                }`}
              >
                Previous
              </button>
              <div className="hidden md:flex gap-2">
                {generatePageNumbers().map((num, i) => (
                  <button
                    key={i}
                    onClick={() => typeof num === "number" && setCurrentPage(num)}
                    disabled={num === "..." || filteredProducts.length === 0}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                      num === currentPage
                        ? "bg-black text-white"
                        : num === "..."
                        ? "cursor-default"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                  currentPage === totalPages || totalPages === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-black hover:text-white"
                }`}
              >
                Next
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
