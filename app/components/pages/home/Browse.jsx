import React from "react";

const styles = [
  { title: "Casual", image: "/images/hero/browse/casual.png", gridClass: "md:col-span-1" },
  { title: "Formal", image: "/images/hero/browse/formal.png", gridClass: "md:col-span-2" },
  { title: "Party", image: "/images/hero/browse/party.png", gridClass: "md:col-span-2" },
  { title: "Gym", image: "/images/hero/browse/gym.png", gridClass: "md:col-span-1" },
];

const Browse = () => {
  return (
    <section className="px-4 md:px-10 mb-20">
      {/* Light grey rounded background container */}
      <div className="bg-[#F0F0F0] rounded-[20px] md:rounded-[40px] pt-10 pb-8 md:pt-16 md:pb-20 px-6 md:px-16">
        
        <h2 className="text-3xl md:text-5xl font-black text-center mb-8 md:mb-16 uppercase tracking-tighter">
          BROWSE BY DRESS STYLE
        </h2>

        {/* Grid Logic:
           - Mobile: 1 column (stacking vertically)
           - Desktop: 3 columns with custom spans
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {styles.map((style, index) => (
            <div
              key={index}
              className={`relative h-[190px] md:h-[289px] bg-white rounded-[20px] overflow-hidden group cursor-pointer ${style.gridClass}`}
            >
              {/* Category Label */}
              <span className="absolute top-4 left-6 md:top-6 md:left-8 text-xl md:text-3xl font-bold z-20">
                {style.title}
              </span>

              {/* Background Image */}
              <img
                src={style.image}
                alt={style.title}
                className="absolute right-0 top-0 h-full w-full object-cover md:object-right-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Browse;