import React from "react";

const Brands = () => {
  return (
    <div className="bg-black w-full py-6 md:py-10">
      <div className="container mx-auto px-4 lg:px-10">
        {/* Responsive Grid: 
            - 2 columns on mobile (to match image_a52530)
            - 5 columns on desktop (to match image_a5218b) 
        */}
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-y-6 md:gap-x-8 lg:gap-x-12">
          
          {/* VERSACE */}
          <div className="w-[45%] md:w-auto flex justify-center">
             <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-serif tracking-widest">
               VERSACE
             </h2>
          </div>

          {/* ZARA */}
          <div className="w-[45%] md:w-auto flex justify-center">
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-sans font-bold tracking-tighter">
              ZARA
            </h2>
          </div>

          {/* GUCCI */}
          <div className="w-[45%] md:w-auto flex justify-center">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-serif font-semibold">
              GUCCI
            </h2>
          </div>

          {/* PRADA */}
          <div className="w-[45%] md:w-auto flex justify-center">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-serif font-black">
              PRADA
            </h2>
          </div>

          {/* Calvin Klein */}
          <div className="w-full md:w-auto flex justify-center">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-sans font-light">
              Calvin Klein
            </h2>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Brands;