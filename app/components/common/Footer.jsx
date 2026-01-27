import React from "react";
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Github 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] text-gray-600 pt-12 overflow-hidden">
      {/* Top section */}
      <div className="container mx-auto px-4 lg:px-10 py-22">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Logo & description - Larger span on desktop */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-3xl font-black text-black tracking-tighter mb-4">
              SHOP.CO
            </h2>
            <p className="text-sm leading-6 mb-6">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 lg:w-9 lg:h-7 flex items-center justify-center rounded-full bg-white border border-gray-200 text-black hover:bg-black hover:text-white transition-all">
                <Twitter size={18} fill="currentColor" />
              </a>
              <a href="#" className="w-9 h-9 lg:w-9 lg:h-7 flex items-center justify-center rounded-full bg-black text-white transition-all">
                <Facebook size={18} fill="currentColor" />
              </a>
              <a href="#" className="w-9 h-9 lg:w-9 lg:h-7 flex items-center justify-center rounded-full bg-white border border-gray-200 text-black hover:bg-black hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 lg:w-9 lg:h-7 flex items-center justify-center rounded-full bg-white border border-gray-200 text-black hover:bg-black hover:text-white transition-all">
                <Github size={18} fill="currentColor" />
              </a>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-bold text-black tracking-widest text-sm mb-4 uppercase">Company</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-black cursor-pointer">About</li>
              <li className="hover:text-black cursor-pointer">Features</li>
              <li className="hover:text-black cursor-pointer">Works</li>
              <li className="hover:text-black cursor-pointer">Career</li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h3 className="font-bold text-black tracking-widest text-sm mb-4 uppercase">Help</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-black cursor-pointer">Customer Support</li>
              <li className="hover:text-black cursor-pointer">Delivery Details</li>
              <li className="hover:text-black cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-black cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="font-bold text-black tracking-widest text-sm mb-4 uppercase">FAQ</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-black cursor-pointer">Account</li>
              <li className="hover:text-black cursor-pointer">Manage Deliveries</li>
              <li className="hover:text-black cursor-pointer">Orders</li>
              <li className="hover:text-black cursor-pointer">Payments</li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="font-bold text-black tracking-widest text-sm mb-4 uppercase">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-black cursor-pointer">Free Books</li>
              <li className="hover:text-black cursor-pointer">Development Tutorial</li>
              <li className="hover:text-black cursor-pointer">How to - Blog</li>
              <li className="hover:text-black cursor-pointer">Youtube Playlist</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">Shop.co © 2026, All Rights Reserved</p>

          {/* Payment icons using stylized badges */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-12 bg-white rounded border border-gray-100 flex items-center justify-center shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" alt="Visa" className="h-3" />
            </div>
            <div className="h-8 w-12 bg-white rounded border border-gray-100 flex items-center justify-center shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
            </div>
            <div className="h-8 w-12 bg-white rounded border border-gray-100 flex items-center justify-center shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" />
            </div>
            <div className="h-8 w-12 bg-white rounded border border-gray-100 flex items-center justify-center shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" className="h-4" />
            </div>
            <div className="h-8 w-12 bg-white rounded border border-gray-100 flex items-center justify-center shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo_%282020%29.svg" alt="GPay" className="h-4" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}