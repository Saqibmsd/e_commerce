import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="overflow-hidden">
      <div className="container mx-auto px-4 lg:px-10 py-10 md:py-0 flex flex-col md:flex-row items-center">
        {/* Left Content */}
        <div className="w-full md:w-1/2 pt-10 md:pt-20 pb-10 md:pb-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 tracking-tighter text-black">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-gray-600 text-sm md:text-base mb-8 max-w-[540px]">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Link href="/casual">
            <button className="w-full md:w-52 bg-black text-white py-4 rounded-full font-medium cursor-pointer hover:bg-black/80 transition-all mb-10 md:mb-12">
              Shop Now
            </button>
          </Link>
          {/* Stats */}
          <div className="flex flex-nowrap md:flex-wrap justify-between md:justify-start gap-4 md:gap-12">
            <div className="text-center">
              <h3 className="text-xl md:text-4xl font-bold text-black">200+</h3>
              <p className="text-gray-500 text-xs md:text-base">
                International Brands
              </p>
            </div>

            <div className="text-center md:border-x md:border-gray-300 md:px-8">
              <h3 className="text-xl md:text-4xl font-bold text-black">
                2,000+
              </h3>
              <p className="text-gray-500 text-xs md:text-base">
                High-Quality Products
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl md:text-4xl font-bold text-black">
                30,000+
              </h3>
              <p className="text-gray-500 text-xs md:text-base">
                Happy Customers
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative min-h-[448px] md:min-h-[663px]">
          <img
            src="/images/hero/hero.png"
            alt="Fashion Models"
            className="absolute bottom-0 md:right-[18%] object-contain md:object-cover object-bottom z-10"
          />

          <div className="absolute top-10 right-4 md:top-[80px] md:right-0 z-20">
            <img
              src="/images/hero/Vector.png"
              alt="star icon"
              className="w-[56px] h-[56px] md:w-[104px] md:h-[104px] object-contain"
            />
          </div>
          <div className="absolute top-1/2 left-0 md:left-6 -translate-y-1/2 z-20">
            <img
              src="/images/hero/Vector.png"
              alt="star icon"
              className="w-10 h-10 md:w-14 md:h-14 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
