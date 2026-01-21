import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12">
        {/* Left Content */}
        <div className="w-full md:w-1/2 pt-4 sm:pt-6 md:pt-8 lg:pt-20 pb-6 sm:pb-8 md:pb-12 lg:pb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight mb-4 sm:mb-5 md:mb-6 lg:mb-6 tracking-tighter text-black">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-base mb-6 sm:mb-7 md:mb-8 lg:mb-8 max-w-[540px] leading-relaxed">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Link href="/casual">
            <button className="w-full sm:w-auto md:w-52 bg-black text-white py-3 sm:py-3 md:py-3 lg:py-4 px-8 sm:px-10 md:px-12 rounded-full font-medium cursor-pointer hover:bg-black/80 transition-all mb-8 sm:mb-10 md:mb-12 lg:mb-12 text-sm sm:text-base">
              Shop Now
            </button>
          </Link>
          
          {/* Stats */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6 lg:gap-12">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-black">200+</h3>
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
        <div className="w-full md:w-1/2 relative flex items-end justify-center md:justify-end min-h-[350px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[752px] overflow-hidden">
          {/* Hero Image */}
          <img
            src="/images/hero/hero.png"
            alt="Fashion Models"
            className="w-[85%] sm:w-[90%] md:w-[95%] lg:w-auto h-auto max-h-full object-contain md:object-cover z-10"
          />

          {/* Right Star */}
          <div className="absolute top-4 right-2 sm:top-6 md:top-8 lg:top-[80px] lg:right-0 z-20">
            <img
              src="/images/hero/Vector.png"
              alt="star icon"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-[104px] lg:h-[104px]"
            />
          </div>

          {/* Left Star */}
          <div className="absolute top-1/2 left-1 sm:left-2 md:left-4 lg:left-6 -translate-y-1/2 z-20">
            <img
              src="/images/hero/Vector.png"
              alt="star icon"
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-14 lg:h-14"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
