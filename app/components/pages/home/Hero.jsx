"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

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
const phrases = ["STYLE", "VIBE", "LOOK", "TREND", "CLASS", "ELITE", "TASTE"];

const Hero = () => {
  const [index, setIndex] = useState(0);

  // Timer to cycle phrases
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000); // Change phrase every 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="overflow-hidden bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12">
        {/* Left Content */}
        <div className="w-full md:w-1/2 py-1 sm:py-1.5 md:py-2 lg:py-3 mb-12 sm:mb-14 md:mb-16 lg:mb-18 flex flex-col items-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black leading-tight mb-4 sm:mb-5 md:mb-6 lg:mb-6 tracking-tighter text-black">
            FIND CLOTHES THAT MATCH YOUR {" "}
            <span className="inline-flex ml-2 min-h-[1em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  className="inline-flex"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {phrases[index].split("").map((char, charIndex) => (
                    <motion.span
                      key={`${index}-${charIndex}`} 
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { delay: charIndex * 0.12 }, // Typing speed
                        },
                        exit: {
                          opacity: 0,
                          transition: {
                            // Backspace speed: calculates delay from right to left
                            delay: (phrases[index].length - charIndex) * 0.12,
                          },
                        },
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {/* Optional: Blinking Cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-base mb-6 sm:mb-7 md:mb-8 lg:mb-8 max-w-[540px] leading-relaxed">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <Link href="/casual">
            <motion.button
              variants={buttonVariant}
              whileHover="hover"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5, ease: [0.16, 1, 0.3, 1] }}
              className="sm:w-auto md:w-52 bg-black text-white py-3 sm:py-3 md:py-3 lg:py-4 px-8 sm:px-10 md:px-12 rounded-full font-medium cursor-pointer hover:bg-black/80 mb-8 sm:mb-10 md:mb-12 lg:mb-12 text-sm sm:text-base"
            >
              Shop Now
            </motion.button>
          </Link>

          {/* Stats */}

          <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6 lg:gap-12">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-black">
                200+
              </h3>

              <p className="text-gray-500 text-xs sm:text-sm md:text-sm lg:text-base mt-1 sm:mt-2">
                International Brands
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-black">
                2,000+
              </h3>

              <p className="text-gray-500 text-xs sm:text-sm md:text-sm lg:text-base mt-1 sm:mt-2">
                High-Quality Products
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-black">
                30,000+
              </h3>

              <p className="text-gray-500 text-xs sm:text-sm md:text-sm lg:text-base mt-1 sm:mt-2">
                Happy Customers
              </p>
            </div>
          </div>
        </div>

        {/* Right Image Section */}

        <div className="w-full md:w-1/2 relative flex items-end justify-center md:justify-end min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] overflow-hidden">
          {/* Hero Image */}
          <motion.img
            src="/images/hero/hero.png"
            alt="Fashion Models"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 5, ease: [0.16, 1, 0.3, 1] }}
            className="w-[75%] sm:w-[80%] md:w-[85%] lg:w-auto h-auto max-h-full object-contain md:object-cover z-10"
          />

          {/* Right Star */}

          <div className="absolute top-4 right-2 sm:top-6 md:top-8 lg:top-[80px] lg:right-0 z-20">
            <motion.img
              src="/images/hero/Vector.png"
              alt="star icon"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              variants={buttonVariant}
              transition={{ duration: 5, ease: [0.16, 1, 0.3, 1] }}
              whileHover="hover"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-[104px] lg:h-[104px]"
            />
          </div>

          {/* Left Star */}

          <div className="absolute top-1/2 left-1 sm:left-2 md:left-4 lg:left-8 -translate-y-1/2 z-20">
            <motion.img
              src="/images/hero/Vector.png"
              alt="star icon"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 5, ease: [0.16, 1, 0.3, 1] }}
              variants={buttonVariant}
              whileHover="hover"
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-14 lg:h-14"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
