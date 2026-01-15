"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Plus, Minus, ArrowRight, Tag } from "lucide-react";

// Mock Data representing items added to cart
const initialCartItems = [
  {
    id: 1,
    title: "Gradient Graphic T-shirt",
    size: "Large",
    color: "White",
    price: 145,
    image: "images/casual/GGtshirt.png",
    quantity: 1,
  },
  {
    id: 2,
    title: "Checkered Shirt",
    size: "Medium",
    color: "Red",
    price: 180,
    image: "/images/casual/CheckShirt.png",
    quantity: 1,
  },
  {
    id: 3,
    title: "Skinny Fit Jeans",
    size: "Large",
    color: "Blue",
    price: 240,
    image: "/images/casual/SGJens.png",
    quantity: 1,
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0.2); // 20% discount
  const deliveryFee = 15;

  // --- LOGIC ---

  const updateQuantity = (id, delta) => {
  setCartItems((items) =>
    items.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    )
  );
};

const removeItem = (id) => {
  setCartItems((items) => items.filter((item) => item.id !== id));
};


  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * discountPercent;
  const total = subtotal - discountAmount + deliveryFee;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-4 lg:px-10 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-black/60 mb-6">
          Home &gt; <span className="text-black">Cart</span>
        </nav>

        <h1 className="text-3xl lg:text-4xl font-black mb-8">YOUR CART</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- LEFT: ITEMS LIST --- */}
          <div className="flex-1 border border-black/10 rounded-[20px] p-4 lg:p-6 space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex gap-4 pb-6 ${
                    index !== cartItems.length - 1 ? "border-b border-black/10" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="w-24 h-24 lg:w-32 lg:h-32 bg-[#F0EEED] rounded-[10px] overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-base lg:text-xl uppercase">{item.title}</h3>
                        <p className="text-sm text-black/60">Size: <span className="text-black/80">{item.size}</span></p>
                        <p className="text-sm text-black/60">Color: <span className="text-black/80">{item.color}</span></p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:scale-110 transition-transform"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-2">
                      <span className="text-xl lg:text-2xl font-bold">${item.price}</span>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-4 bg-[#F0F0F0] px-4 py-2 rounded-full">
                        <button onClick={() => updateQuantity(item.id, -1)} className="hover:opacity-50">
                          <Minus size={18} />
                        </button>
                        <span className="font-medium text-sm lg:text-base">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="hover:opacity-50">
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-10 text-black/60">Your cart is empty.</p>
            )}
          </div>

          {/* --- RIGHT: ORDER SUMMARY --- */}
          <div className="lg:w-[400px] border border-black/10 rounded-[20px] p-6 h-fit space-y-6">
            <h2 className="text-xl lg:text-2xl font-bold">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-black/60 lg:text-lg">
                <span>Subtotal</span>
                <span className="text-black font-bold">${subtotal}</span>
              </div>
              <div className="flex justify-between text-black/60 lg:text-lg">
                <span>Discount (-20%)</span>
                <span className="text-red-500 font-bold">-${Math.round(discountAmount)}</span>
              </div>
              <div className="flex justify-between text-black/60 lg:text-lg">
                <span>Delivery Fee</span>
                <span className="text-black font-bold">${deliveryFee}</span>
              </div>
              <hr className="border-black/10" />
              <div className="flex justify-between text-black text-lg lg:text-xl font-bold">
                <span>Total</span>
                <span>${Math.round(total)}</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="flex gap-3">
              <div className="flex-1 flex items-center gap-2 bg-[#F0F0F0] px-4 py-3 rounded-full">
                <Tag className="text-black/40" size={20} />
                <input 
                  type="text" 
                  placeholder="Add promo code" 
                  className="bg-transparent outline-none w-full text-sm"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
              </div>
              <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-black/80 transition-all">
                Apply
              </button>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-black text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-black/80 transition-all">
              Go to Checkout <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;