"use client";

import React, { useState, useContext } from "react";
import {
  LogOut, User, Mail, Phone, MapPin, Edit2, 
  ShoppingBag, Heart, Settings, Clock
} from "lucide-react";
import styles from "./profile.module.css";
import { useCart } from '../../../context/CartContext';

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

  const recentOrders = [
    { id: "ORD-001", date: "2026-01-15", total: "$89.99", status: "Delivered", items: 2 },
    { id: "ORD-002", date: "2025-01-10", total: "$125.50", status: "Delivered", items: 3 },
    { id: "ORD-003", date: "2025-01-05", total: "$45.99", status: "Transit", items: 1 },
  ];

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
    <div className={styles.profileContainer}>
      <header className={styles.profileHeader}>
        <div className={styles.headerContent}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>{profileData.name.charAt(0)}</div>
            <div className={styles.headerInfo}>
              <h1 className={styles.userName}>{profileData.name}</h1>
              <p className={styles.userEmail}>{profileData.email}</p>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={() => console.log("Logging out...")}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <nav className={styles.tabsContainer}>
        {[
          { id: "profile", icon: <User size={18} />, label: "Profile" },
          { id: "orders", icon: <ShoppingBag size={18} />, label: "Orders" },
          { id: "wishlist", icon: <Heart size={18} />, label: "Wishlist" },
          { id: "settings", icon: <Settings size={18} />, label: "Settings" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className={styles.content}>
        {activeTab === "profile" && (
          <section className={styles.profileSection}>
            <div className={styles.sectionHeader}>
              <h2>Personal Information</h2>
              <button className={styles.editBtn} onClick={() => setIsEditing(!isEditing)}>
                <Edit2 size={18} /> {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            {!isEditing ? (
              <div className={styles.profileGrid}>
                <InfoCard icon={<User size={20}/>} label="Full Name" value={profileData.name} />
                <InfoCard icon={<Mail size={20}/>} label="Email" value={profileData.email} />
                <InfoCard icon={<Phone size={20}/>} label="Phone" value={profileData.phone} />
                <InfoCard icon={<MapPin size={20}/>} label="Address" value={profileData.address} />
                <InfoCard icon={<MapPin size={20}/>} label="City" value={profileData.city} />
                <InfoCard icon={<MapPin size={20}/>} label="ZIP Code" value={profileData.zipCode} />
              </div>
            ) : (
              <form className={styles.formGrid}>
                {Object.keys(formData).map((key) => (
                  <div key={key} className={styles.formGroup}>
                    <label className={styles.formLabel}>{key.replace(/([A-Z])/g, ' $1')}</label>
                    <input
                      name={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>
                ))}
                <div className={styles.formActions}>
                  <button type="button" className={styles.saveBtn} onClick={handleSave}>Save Changes</button>
                  <button type="button" className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            )}
          </section>
        )}

        {activeTab === "orders" && (
          <section className={styles.ordersSection}>
            <h2>Your Orders</h2>
            <div className="space-y-4 mt-6">
              {orders && orders.length > 0 ? (
                orders.map((order, index) => (
                  <div key={index} className={styles.orderCard}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-black text-lg">Order #{order.id}</p>
                        <p className="flex items-center gap-1 text-xs text-gray-400 font-bold">
                          <Clock size={12} /> {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`${styles.status} ${styles.pending}`}>
                        Pending
                      </span>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <p className="font-bold text-sm mb-3">Products Ordered:</p>
                      <div className="space-y-2">
                        {order.items && order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <div>
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-xs text-gray-500">Size: {item.size} | Color: {item.color}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold">${item.price}</p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4 mt-4">
                      <div>
                        <p className={styles.label}>Total Items</p>
                        <p className={styles.value}>{order.items ? order.items.length : 0}</p>
                      </div>
                      <div>
                        <p className={styles.label}>Total Price</p>
                        <p className={styles.value}>${order.total}</p>
                      </div>
                      <div>
                        <p className={styles.label}>Status</p>
                        <p className={styles.value}>Pending</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="font-bold text-gray-400">No orders yet</p>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "wishlist" && (
          <section className={styles.wishlistSection}>
            <div className="text-center py-12">
              <Heart size={48} className="mx-auto text-gray-200 mb-4" />
              <p className="font-bold text-gray-400">Your wishlist is empty</p>
            </div>
          </section>
        )}

        {activeTab === "settings" && (
          <section className={styles.settingsSection}>
            <h2>Settings</h2>
            <div className="space-y-4 mt-6">
              <SettingItem title="Password" desc="Change your account password" btnText="Change" />
              <SettingItem title="Notifications" desc="Manage email preferences" btnText="Manage" />
              <SettingItem title="Danger Zone" desc="Permanently delete account" btnText="Delete" danger />
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

// Helper Components for cleaner JSX
const InfoCard = ({ icon, label, value }) => (
  <div className={styles.infoCard}>
    <div className={styles.infoIcon}>{icon}</div>
    <div className={styles.infoContent}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
    </div>
  </div>
);

const SettingItem = ({ title, desc, btnText, danger }) => (
  <div className={styles.settingCard}>
    <div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
    <button className={danger ? styles.settingBtnDanger : styles.settingBtn}>{btnText}</button>
  </div>
);

export default ProfileDashboard;