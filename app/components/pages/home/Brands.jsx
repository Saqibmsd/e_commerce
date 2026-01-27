"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

const Brands = () => {
  const controls = useAnimationControls();
  const currentX = useRef(0);

  const brandList = [
    { name: "VERSACE", className: "font-serif tracking-widest" },
    { name: "ZARA", className: "font-sans font-bold tracking-tighter" },
    { name: "GUCCI", className: "font-serif font-semibold" },
    { name: "PRADA", className: "font-serif font-black" },
    { name: "CALVIN KLEIN", className: "font-sans font-bold" },
  ];

  const duplicatedBrands = [...brandList, ...brandList, ...brandList];

  useEffect(() => {
    startNormalSpeed();
  }, []);

  const startNormalSpeed = () => {
    controls.start({
      x: [currentX.current, "-33.33%"],
      transition: {
        ease: "linear",
        duration: 18,
        repeat: Infinity,
      },
    });
  };

  const startSlowSpeed = () => {
    controls.start({
      x: [currentX.current, "-33.33%"],
      transition: {
        ease: "linear",
        duration: 40, // 👈 slower
        repeat: Infinity,
      },
    });
  };

  return (
    <div className="bg-black w-full py-4 md:py-6 lg:py-8 overflow-hidden cursor-grab active:cursor-grabbing">
      <div className="container mx-auto px-4 lg:px-10">
        <div className="flex w-max">
          <motion.div
            className="flex items-center gap-x-8 md:gap-x-20 lg:gap-x-28 pr-8 md:pr-20 lg:pr-28"
            animate={controls}
            onUpdate={(latest) => {
              currentX.current = latest.x;
            }}
            onMouseEnter={startSlowSpeed}
            onMouseLeave={startNormalSpeed}
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div
                key={index}
                className="flex justify-center flex-shrink-0 select-none"
              >
                <h2
                  className={`text-white text-s md:text-3xl lg:text-[44px] ${brand.className}`}
                >
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
