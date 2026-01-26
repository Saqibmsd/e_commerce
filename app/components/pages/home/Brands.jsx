"use client";
import React, { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

const Brands = () => {
  const brandList = [
    { name: "VERSACE", className: "font-serif tracking-widest" },
    { name: "ZARA", className: "font-sans font-bold tracking-tighter" },
    { name: "GUCCI", className: "font-serif font-semibold" },
    { name: "PRADA", className: "font-serif font-black" },
    { name: "CALVIN KLEIN", className: "font-sans font-bold" },
  ];

  const duplicatedBrands = [...brandList, ...brandList, ...brandList]; // Tripled for better manual drag range
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-black w-full py-4 md:py-6 lg:py-8 overflow-hidden cursor-grab active:cursor-grabbing">
      <div className="container mx-auto px-4 lg:px-10">
        <div className="flex w-max">
          <motion.div
            className="flex items-center gap-x-8 md:gap-x-20 lg:gap-x-28 pr-8 md:pr-20 lg:pr-28"
            // 1. Auto Animation
            animate={isHovered ? {} : { x: ["0%", "-33.33%"] }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
            }}
            // 2. Hover to Stop
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // 3. Manual Drag/Scroll
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }} // Limits how far it can be dragged
            style={{ x: 0 }} 
          >
            {duplicatedBrands.map((brand, index) => (
              <div key={index} className="flex justify-center flex-shrink-0 select-none">
                <h2 className={`text-white text-s md:text-3xl lg:text-[44px] ${brand.className}`}>
                  {brand.name}
                </h2>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Brands;