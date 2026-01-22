import React from "react";

const Brands = () => {
  return (
    <div className="bg-black w-full py-8 md:py-10">
      <div className="container mx-auto px-4 lg:px-10">
        {/* Mobile: Grid with 2 columns, centered items. 
            Tablet (768px): Flex row with wrapping.
            Desktop (1024px): Single spread-out row.
        */}
        <div className="xs grid grid-cols-4 gap-4 md:flex md:flex-nowrap items-center justify-center md:justify-between md:gap-x-8 lg:gap-x-12">
          
          {/* VERSACE */}
          <div className="flex justify-center">
             <h2 className="text-white text-s md:text-3xl lg:text-[44px] font-serif tracking-widest">
               VERSACE
             </h2>
          </div>

          {/* ZARA */}
          <div className="flex justify-center">
            <h2 className="text-white text-s md:text-3xl lg:text-[44px] font-sans font-bold tracking-tighter">
              ZARA
            </h2>
          </div>

          {/* GUCCI */}
          <div className="flex justify-center">
            <h2 className="text-white text-s md:text-3xl lg:text-[44px] font-serif font-semibold">
              GUCCI
            </h2>
          </div>

          {/* PRADA */}
          <div className="flex justify-center">
            <h2 className="text-white text-s md:text-3xl lg:text-[44px] font-serif font-black">
              PRADA
            </h2>
          </div>

          {/* Calvin Klein - Col-span-2 on mobile centers it alone on the 3rd row */}
          {/* <div className="col-span-2 md:col-span-2 flex justify-center">
            <h2 className="text-white text-2xl md:text-3xl lg:text-[44px] font-sans font-light">
              Calvin Klein
            </h2>
          </div>} */}

        </div>
      </div>
    </div>
  );
};

export default Brands;