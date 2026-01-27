"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Icons
import { Star, Check, ArrowLeft, ArrowRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    text:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: "Alex K.",
    text:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    id: 3,
    name: "James L.",
    text:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    id: 4,
    name: "Mooen X.",
    text:
      "The selection of clothes is not only diverse but also on-point with the latest trends. Every piece I've bought has exceeded my expectations.",
  },
  {
    id: 5,
    name: "Rose D.",
    text:
      "I love how the clothes fit and the quality of the fabric is amazing. Highly recommended for anyone looking for stylish clothes.",
  },
];

const Reviews = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 lg:px-10">

        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
            OUR HAPPY CUSTOMERS
          </motion.h2>

          {/* Custom Navigation */}
          <motion.div
                          initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          className="flex md:gap-4 gap-2">
            <button className="review-prev p-2 rounded-full border border-black/10 hover:bg-gray-100 transition">
              <ArrowLeft className="md:w-6 md:h-6 w-4 h-4" />
            </button>
            <button className="review-next p-2 rounded-full border border-black/10 hover:bg-gray-100 transition">
              <ArrowRight className="md:w-6 md:h-6 w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            prevEl: ".review-prev",
            nextEl: ".review-next",
          }}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
          className="w-full"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="h-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                className="h-full min-h-[280px] border border-black/10 rounded-[20px] p-6 md:p-8 flex flex-col gap-4">

                {/* Stars */}
                <div className="flex gap-1 text-[#FFC633]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>

                {/* Name + Verified */}
                <div className="flex items-center gap-2">
                  <span className="text-lg md:text-xl font-bold">
                    {review.name}
                  </span>
                  <div className="bg-[#01AB31] rounded-full p-0.5 flex items-center justify-center">
                    <Check size={12} className="text-white" strokeWidth={4} />
                  </div>
                </div>

                {/* Review Text */}
                <p className="flex-grow text-black/60 leading-relaxed text-sm md:text-base italic">
                  {review.text}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
