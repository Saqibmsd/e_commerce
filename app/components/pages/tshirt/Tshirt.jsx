"use client";
import React, { useState } from 'react';
import { Star, StarHalf, Plus, Minus, Check, Settings2, ChevronDown } from 'lucide-react';

// 1. CHANGED: Catch 'product' (singular) to match your page.jsx
const Tshirt = ({ product }) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Large');
  const [selectedColor, setSelectedColor] = useState('olive');
  const [quantity, setQuantity] = useState(1);

  // 2. SAFETY CHECK: If product data hasn't arrived, show a message
  if (!product) return <div className="p-20 text-center">Loading Product...</div>;

  // 3. DYNAMIC IMAGES: Use the image from your data file
  // We repeat it 3 times to fill your gallery since your data usually has 1 image
  const displayImages = [product.image, product.image, product.image];

  const colors = [
    { id: 'olive', class: 'bg-[#4F4631]' },
    { id: 'green', class: 'bg-[#314F4A]' },
    { id: 'navy', class: 'bg-[#31344F]' }
  ];

  const reviews = [
    { id: 1, name: "Samantha D.", date: "August 14, 2023", rating: 4.5, text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable." },
    { id: 2, name: "Alex M.", date: "August 15, 2023", rating: 4, text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch." }
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-0 py-6 font-sans">
      {/* 1. BREADCRUMB */}
      <nav className="text-black/60 text-sm mb-6 flex gap-2">
        Home <span className="text-black/20">/</span> Shop <span className="text-black/20">/</span> {product.category || 'Men'} <span className="text-black/20">/</span> <span className="text-black font-medium">{product.title}</span>
      </nav>

      {/* 2. PRODUCT MAIN SECTION */}
      <div className="flex flex-col lg:flex-row gap-10 mb-16">
        {/* LEFT: Image Gallery */}
        <div className="flex flex-col-reverse lg:flex-row gap-4 lg:w-1/2">
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {displayImages.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedImg(idx)}
                className={`min-w-[110px] h-[110px] lg:w-[152px] lg:h-[167px] bg-[#F0EEED] rounded-[20px] overflow-hidden cursor-pointer border-2 transition-all ${selectedImg === idx ? 'border-black' : 'border-transparent'}`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
          <div className="flex-1 bg-[#F0EEED] rounded-[20px] overflow-hidden aspect-square lg:aspect-auto">
            <img src={displayImages[selectedImg]} alt={product.title} className="w-full h-full object-contain" />
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="lg:w-1/2 flex flex-col">
          {/* 4. DYNAMIC TITLE */}
          <h1 className="text-3xl lg:text-[40px] font-black leading-tight mb-3 uppercase italic">
            {product.title}
          </h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(Math.floor(product.rating || 4))].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              {product.rating % 1 !== 0 && <StarHalf size={18} fill="currentColor" />}
            </div>
            <span className="text-sm">{product.rating || 4.5}/<span className="text-black/60">5</span></span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            {/* 5. DYNAMIC PRICES */}
            <span className="text-2xl lg:text-3xl font-bold">${product.price}</span>
            {product.oldPrice && (
              <span className="text-2xl lg:text-3xl font-bold text-black/30 line-through">${product.oldPrice}</span>
            )}
            {product.discount && (
              <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm font-medium">{product.discount}</span>
            )}
          </div>

          <p className="text-black/60 text-sm lg:text-base mb-6 border-b border-black/10 pb-6">
            {product.description || "This premium garment is crafted from soft, breathable fabric, offering superior comfort and a modern fit for any casual occasion."}
          </p>

          {/* ... Selection Buttons (Keep your existing color/size logic) ... */}
          <div className="mb-6 border-b border-black/10 pb-6">
            <h3 className="text-black/60 text-sm mb-4">Select Colors</h3>
            <div className="flex gap-4">
              {colors.map((c) => (
                <div 
                  key={c.id}
                  onClick={() => setSelectedColor(c.id)}
                  className={`w-9 h-9 rounded-full ${c.class} cursor-pointer flex items-center justify-center transition-all hover:scale-110`}
                >
                  {selectedColor === c.id && <Check size={16} className="text-white" />}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 border-b border-black/10 pb-6">
            <h3 className="text-black/60 text-sm mb-4">Choose Size</h3>
            <div className="flex flex-wrap gap-3">
              {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 rounded-full text-sm transition-all ${
                    selectedSize === size ? 'bg-black text-white' : 'bg-[#F0F0F0] text-black/60 hover:bg-black/10'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-6 bg-[#F0F0F0] px-6 py-4 rounded-full">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={20} /></button>
              <span className="font-bold text-lg">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}><Plus size={20} /></button>
            </div>
            <button className="flex-1 bg-black text-white py-4 rounded-full font-medium hover:bg-black/80 transition-all">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {/* ... (Rest of your tabs and reviews section) ... */}
    </div>
  );
};

export default Tshirt;