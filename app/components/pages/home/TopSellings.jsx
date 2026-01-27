"use client";
import React, { use } from "react";
import { Star, StarHalf } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const products = [
  {
    id: 1,
    title: "Vertical Striped Shirt",
    price: 212,
    oldPrice: 232,
    discount: "-20%",
    rating: 5.0,
    image: "/images/hero/topselling/verticalstripshirt.png",
  },
  {
    id: 2,
    title: "Courage Graphic T-shirt",
    price: 145,
    rating: 4.0,
    image: "/images/hero/topselling/couragegraphicshirt.png",
  },
  {
    id: 3,
    title: "Loose Fit Bermuda Shorts",
    price: 80,
    rating: 3.0,
    image: "/images/hero/topselling/loose.png",
  },
  {
    id: 4,
    title: "Faded Skinny Jeans",
    price: 210,
    rating: 4.5,
    image: "/images/hero/topselling/fadeskinny.png",
  },
];
const buttonVariant = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const TopSelling = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 lg:px-10">
        {/* Updated Title to match image_a6649d.png */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-black text-center mb-10 md:mb-14 uppercase tracking-tighter"
        >
          TOP SELLING
        </motion.h2>

        {/* Product Grid - 2 on Mobile, 4 on Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group cursor-pointer ${index >= 2 ? "hidden md:block" : "block"}`}
            >
              {/* Image Container */}
              <div className="aspect-square bg-[#F0EEED] rounded-[20px] overflow-hidden flex items-center justify-center mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 px-4"
                />
              </div>

              {/* Updated Titles */}
              <h3 className="font-bold text-sm md:text-lg mb-1 truncate">
                {product.title}
              </h3>

              {/* Star Rating Logic */}
              <div className="flex items-center gap-1 md:gap-2 mb-1">
                <div className="flex text-yellow-400">
                  {[...Array(Math.floor(product.rating))].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                  {product.rating % 1 !== 0 && (
                    <StarHalf size={14} fill="currentColor" />
                  )}
                </div>
                <span className="text-xs md:text-sm">
                  {product.rating.toFixed(1)}/
                  <span className="text-gray-400">5</span>
                </span>
              </div>

              {/* Updated Prices */}
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-2xl font-bold">
                  ${product.price}
                </span>
                {product.oldPrice && (
                  <>
                    <span className="text-lg md:text-2xl font-bold text-black/30 line-through">
                      ${product.oldPrice}
                    </span>
                    <span className="bg-[#FF3333]/10 text-[#FF3333] text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full">
                      {product.discount}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="mt-8 md:mt-16 flex justify-center border-b border-gray-100 pb-16">
          <Link href="/topselling">
            <motion.button
              variants={buttonVariant}
              whileHover="hover"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
              className="sm:w-auto border border-gray-300 bg-transparent text-black py-3 md:py-4 px-8 rounded-full font-semibold text-sm sm:text-base hover:bg-black hover:text-white cursor-pointer"
            >
              View All
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopSelling;
