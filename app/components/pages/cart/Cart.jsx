"use client";
import React, { useState } from "react";
import { Trash2, Plus, Minus, ArrowRight, Tag } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import DeliveryForm from "@/app/components/common/DeliveryForm";
import styles from "./cart.module.css"; // Import the styles

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const discountPercent = 0.2;
  const deliveryFee = 15;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * discountPercent;
  const total = subtotal - discountAmount + deliveryFee;

  return (
    <div className={styles.cartWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>YOUR CART</h1>

        <div className={styles.mainLayout}>
          {/* LEFT: ITEMS LIST */}
          <div className={styles.itemsList}>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div
                  key={item.cartItemId}
                  className={`${styles.cartItem} ${
                    index !== cart.length - 1 ? styles.itemBorder : ""
                  }`}
                >
                  <div className={styles.imageContainer}>
                    <img src={item.image} alt={item.title} className={styles.itemImage} />
                  </div>

                  <div className={styles.itemDetails}>
                    <div className={styles.itemHeader}>
                      <div>
                        <h3 className={styles.itemTitle}>{item.title}</h3>
                        <p className={styles.itemMeta}>
                          Size: <span className={styles.itemMetaValue}>{item.size}</span>
                        </p>
                        <p className={styles.itemMeta}>
                          Color: <span className={styles.itemMetaValue}>{item.color}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className={styles.removeBtn}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className={styles.itemFooter}>
                      <span className={styles.price}>${item.price}</span>
                      <div className={styles.quantitySelector}>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} 
                          className={styles.qtyBtn}
                        >
                          <Minus size={18} />
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} 
                          className={styles.qtyBtn}
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.emptyMsg}>Your cart is empty.</p>
            )}
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className={`${styles.orderSummary} ${cart.length === 0 ? styles.summaryDisabled : ''}`}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            
            <div className="space-y-4">
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span className={styles.summaryLabel}>${subtotal}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Discount (-20%)</span>
                <span className={styles.discountText}>-${Math.round(discountAmount)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Delivery Fee</span>
                <span className={styles.summaryLabel}>${deliveryFee}</span>
              </div>
              <hr className={styles.divider} />
              <div className={styles.totalRow}>
                <span>Total</span>
                <span>${Math.round(total)}</span>
              </div>
            </div>

            <div className={styles.promoContainer}>
              <div className={styles.promoInputWrapper}>
                <Tag className="text-black/40" size={20} />
                <input 
                  type="text" 
                  placeholder="Add promo code" 
                  className={styles.promoInput}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
              </div>
              <button className={styles.applyBtn}>Apply</button>
            </div>

            {showDeliveryForm && (
              <DeliveryForm
                total={Math.round(total)}
                onClose={() => setShowDeliveryForm(false)}
              />
            )}

            <button 
              onClick={() => setShowDeliveryForm(true)} 
              className={styles.checkoutBtn}
            >
              Go to Checkout <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;