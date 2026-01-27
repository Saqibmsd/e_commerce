"use client";
import React from "react";
import { motion } from "motion/react";

const styles = [
  {
    title: "Casual",
    image: "/images/hero/browse/casual.png",
    gridClass: "md:col-span-1",
  },
  {
    title: "Formal",
    image: "/images/hero/browse/formal.png",
    gridClass: "md:col-span-2",
  },
  {
    title: "Party",
    image: "/images/hero/browse/party.png",
    gridClass: "md:col-span-2",
  },
  {
    title: "Gym",
    image: "/images/hero/browse/gym.png",
    gridClass: "md:col-span-1",
  },
];

const Browse = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
      className="container mx-auto px-4 lg:px-10"
    >
      {/* Light grey rounded background container */}
      <div className="bg-[#F0F0F0] rounded-[20px] md:rounded-[40px] pt-10 pb-8 md:pt-16 md:pb-20 px-6 md:px-16">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-black text-center mb-10 md:mb-14 uppercase tracking-tighter"
        >
          BROWSE BY DRESS STYLE
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          {styles.map((style, index) => (
            <div
              key={index}
              className={`relative h-[190px] md:h-[289px] bg-white rounded-[20px] overflow-hidden group cursor-pointer ${style.gridClass}`}
            >
              {/* Category Label */}
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-4 left-6 md:top-6 md:left-8 text-xl md:text-3xl font-bold z-20"
              >
                {style.title}
              </motion.span>

              {/* Background Image */}
              <img
                src={style.image}
                alt={style.title}
                className="absolute right-0 top-0 h-full w-full object-cover md:object-right-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Browse;
