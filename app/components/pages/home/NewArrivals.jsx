import React from "react";
import { Star, StarHalf } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: 1,
    title: "T-shirt with Tape Details",
    price: 120,
    rating: 4.5,
    image: "/images/hero/newarrivals/tshirt.png",
  },
  {
    id: 2,
    title: "Skinny Fit Jeans",
    price: 240,
    oldPrice: 260,
    discount: "-20%",
    rating: 3.5,
    image: "/images/hero/newarrivals/jeans.png",
  },
  {
    id: 3,
    title: "Checkered Shirt",
    price: 180,
    rating: 4.5,
    image: "/images/hero/newarrivals/checkshirt.png",
  },
  {
    id: 4,
    title: "Sleeve Striped T-shirt",
    price: 130,
    oldPrice: 160,
    discount: "-30%",
    rating: 4.5,
    image: "/images/hero/newarrivals/sleevsshirt.png",
  },
];

const NewArrivals = () => {
  return (
    <section className="py-12 md:py-20 border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-10">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-10 md:mb-14 uppercase tracking-tighter">
          NEW ARRIVALS
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group cursor-pointer ${index >= 2 ? "hidden md:block" : "block"}`}
            >
              {/* Image Container */}
              <div className="aspect-[3/4] md:aspect-square bg-[#F0EEED] rounded-[15px] md:rounded-[20px] overflow-hidden flex items-center justify-center mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 px-4"
                />
              </div>

              {/* Details */}
              <h3 className="font-bold text-[14px] md:text-lg mb-1 truncate">
                {product.title}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 md:gap-2 mb-1">
                <div className="flex text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <StarHalf size={14} fill="currentColor" />
                </div>
                <span className="text-xs md:text-sm">
                  {product.rating}/<span className="text-gray-400">5</span>
                </span>
              </div>

              {/* Price */}
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
        </div>

        {/* View All Button */}
        <div className="mt-8 md:mt-16 flex justify-center">
          <Link href="/newarrivals">
            <button className="sm:w-auto border border-gray-300 bg-transparent text-black py-3 md:py-4 px-8 rounded-full font-semibold text-sm sm:text-base hover:bg-black hover:text-white transition-all duration-300 active:scale-95">
              View All
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
