"use client";
import React from "react";
import { Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Newsletter = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
      className="px-4 md:px-10 relative z-30 -mb-[90px] md:-mb-[100px] overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-10">
        <div className="bg-black rounded-[20px] py-9 px-6 md:py-11 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-3xl md:text-[40px] font-black leading-tight uppercase tracking-tighter max-w-[550px]"
          >
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </motion.h2>

          {/* Form Controls */}
          <div
            className="flex flex-col gap-3 w-full lg:w-[350px]"
          >
            {/* Input Field */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
              className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 w-5 h-5"
              />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white py-3 md:py-4 pl-12 pr-4 rounded-full text-black placeholder:text-black/40 outline-none"
              />
            </motion.div>

            {/* Subscribe Button */}
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-white text-black py-3 md:py-4 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Subscribe to Newsletter
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Newsletter;
