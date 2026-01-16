"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  const [newItemsCount, setNewItemsCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
        setCart([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("Cart saved to localStorage:", cart);
    }
  }, [cart, isLoaded]);

  const addToCart = (product, quantity, size, color) => {
    const newItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity,
      size,
      color,
      cartItemId: `${product.id}-${size}-${color}-${Date.now()}`, // Unique key for each cart item
    };

    console.log("Adding to cart:", newItem);
    setCart((prevCart) => [...prevCart, newItem]);
    setNewItemsCount((prev) => prev + 1); // Increment notification badge

    // Show success notification
    setNotification(`${product.title} added to cart!`);
    setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
  };

  const removeFromCart = (cartItemId) => {
    console.log("Removing from cart:", cartItemId);
    setCart((prevCart) =>
      prevCart.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const updateQuantity = (cartItemId, quantity) => {
    console.log("Updating quantity:", cartItemId, quantity);
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    console.log("Clearing cart");
    setCart([]);
  };

  const clearNotificationBadge = () => {
    setNewItemsCount(0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        notification,
        newItemsCount,
        clearNotificationBadge,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
