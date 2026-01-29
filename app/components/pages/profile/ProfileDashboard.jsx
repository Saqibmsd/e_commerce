"use client";
import { motion } from "motion/react";

import React, { useState } from "react";
import {
  LogOut,
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  ShoppingBag,
  Heart,
  Settings,
  Clock,
} from "lucide-react";
import { useCart } from "@/app/context/CartContext";

const ProfileDashboard = () => {
  const { orders } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [profileData, setProfileData] = useState({
    name: "Muhammad Saqib",
    email: "saqibmsd143@gmail.com",
    phone: "+923265026950",
    address: "Taqbeer City, Draban Choungi, DIK",
    city: "Dera Isimail Khan",
    zipCode: "29111",
    country: "Islamic Republic of Pakistan",
  });

  const [formData, setFormData] = useState(profileData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12 overflow-hidden">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white border-b border-gray-200 shadow-sm px-4 lg:px-10 py-8 md:py-10"
      >
        <div className="mx-auto container flex flex-col md:flex-row justify-between items-center gap-6 px-4 lg:px-10">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-black text-white rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg shrink-0">
              {profileData.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-black">
                {profileData.name}
              </h1>
              <p className="text-gray-500 font-medium text-sm md:text-base">
                {profileData.email}
              </p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-6 py-3 border-2 border-black rounded-full font-bold hover:bg-black hover:text-white transition-all active:scale-95 text-sm md:text-base"
            onClick={() => console.log("Logging out...")}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </motion.header>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto container px-4 lg:px-10 mt-8"
      >
        <nav className="flex items-center overflow-x-auto gap-1 md:gap-2 bg-gray-100 p-1.5 rounded-2xl md:rounded-full no-scrollbar">
          {[
            { id: "profile", icon: <User size={18} />, label: "Profile" },
            {
              id: "orders",
              icon: <ShoppingBag size={18} />,
              label: `Orders (${orders?.length || 0})`,
            },
            { id: "wishlist", icon: <Heart size={18} />, label: "Wishlist" },
            { id: "settings", icon: <Settings size={18} />, label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-black text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </motion.div>

      <motion.main
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto container px-4 lg:px-10 mt-8"
      >
        {activeTab === "profile" && (
          <motion.section
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-[24px] md:rounded-[32px] border border-gray-200 px-6 py-8 shadow-sm"
          >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
              <h2 className="text-xl font-bold uppercase tracking-tight">
                Personal Information
              </h2>
              <button
                className="flex items-center gap-2 text-sm font-bold bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
                onClick={() =>
                  isEditing ? handleCancel() : setIsEditing(true)
                }
              >
                <Edit2 size={18} /> {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <InfoCard
                  icon={<User size={20} />}
                  label="Full Name"
                  value={profileData.name}
                />
                <InfoCard
                  icon={<Mail size={20} />}
                  label="Email"
                  value={profileData.email}
                />
                <InfoCard
                  icon={<Phone size={20} />}
                  label="Phone"
                  value={profileData.phone}
                />
                <InfoCard
                  icon={<MapPin size={20} />}
                  label="Address"
                  value={profileData.address}
                />
                <InfoCard
                  icon={<MapPin size={20} />}
                  label="City"
                  value={profileData.city}
                />
                <InfoCard
                  icon={<MapPin size={20} />}
                  label="ZIP Code"
                  value={profileData.zipCode}
                />
              </div>
            ) : (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {Object.keys(formData).map((key) => (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase text-gray-500 px-1">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      name={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
                    />
                  </div>
                ))}
                <div className="md:col-span-2 flex flex-col md:flex-row gap-3 md:gap-4 mt-6">
                  <button
                    type="button"
                    className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="w-full md:w-auto bg-gray-100 text-gray-600 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </motion.section>
        )}

        {activeTab === "orders" && (
          <motion.section
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-[24px] md:rounded-[32px] border border-gray-200 px-6 py-8 shadow-sm"
          >
            <h2 className="text-xl font-bold uppercase mb-6">Your Orders</h2>
            <div className="space-y-6">
              {orders && orders.length > 0 ? (
                [...orders].reverse().map((order) => (
                  <div
                    key={order.id}
                    className="py-6 px-2 border border-gray-100 rounded-[24px] bg-gray-50 hover:border-black/10 transition-all shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-black text-lg">Order #{order.id}</p>
                        <p className="flex items-center gap-1 text-xs text-gray-400 font-bold">
                          <Clock size={12} />{" "}
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className=" p-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 md:p-2 tracking-wide">
                        {order.status || "Pending"}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <p className="font-bold text-sm mb-3 text-gray-500 uppercase tracking-tight">
                        Items
                      </p>
                      <div className="space-y-3">
                        {order.items?.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100"
                          >
                            <div className="flex items-center gap-3">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt=""
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                              )}
                              <div>
                                <p className="font-bold text-sm">
                                  {item.title}
                                </p>
                                <p className="text-[10px] text-gray-500 uppercase">
                                  {item.size} | {item.color}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-black">
                                ${item.price}
                              </p>
                              <p className="text-[10px] font-bold text-gray-400">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-200 pt-4 mt-4">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                          Address
                        </p>
                        <p className="text-xs font-bold text-black truncate">
                          {order.address}
                        </p>
                      </div>
                      <div className="sm:text-center">
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                          Method
                        </p>
                        <p className="text-xs font-bold text-black uppercase">
                          {order.paymentMethod}
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                          Grand Total
                        </p>
                        <p className="font-black text-black text-lg">
                          ${order.total}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <ShoppingBag
                    size={48}
                    className="mx-auto text-gray-200 mb-4"
                  />
                  <p className="font-bold text-gray-400">
                    No orders found in your history.
                  </p>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* Wishlist & Settings */}
        {activeTab === "wishlist" && (
          <motion.section
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-[24px] md:rounded-[32px] border border-gray-200 py-12 shadow-sm text-center"
          >
            <Heart size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="font-bold text-gray-400">Your wishlist is empty</p>
          </motion.section>
        )}

        {activeTab === "settings" && (
          <motion.section
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-[24px] md:rounded-[32px] border border-gray-200 px-6 py-8 shadow-sm"
          >
            <h2 className="text-xl font-bold uppercase mb-6">Settings</h2>
            <div className="space-y-4">
              <SettingItem
                title="Password"
                desc="Change your account password"
                btnText="Change"
              />
              <SettingItem
                title="Notifications"
                desc="Manage email preferences"
                btnText="Manage"
              />
              <SettingItem
                title="Danger Zone"
                desc="Permanently delete account"
                btnText="Delete"
                danger
              />
            </div>
          </motion.section>
        )}
      </motion.main>
    </div>
  );
};

// Internal Sub-components
const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 md:gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-black transition-all">
    <div className="p-3 bg-white rounded-xl shadow-sm text-gray-400 shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
        {label}
      </p>
      <p className="font-bold text-black truncate">{value}</p>
    </div>
  </div>
);

const SettingItem = ({ title, desc, btnText, danger }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 md:p-6 bg-gray-50 border border-gray-100 rounded-[24px] gap-4">
    <div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
    <button
      className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
        danger
          ? "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
          : "bg-white border border-gray-200 hover:bg-black hover:text-white"
      }`}
    >
      {btnText}
    </button>
  </div>
);

export default ProfileDashboard;
