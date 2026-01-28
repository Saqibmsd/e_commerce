"use client";
import { motion } from "motion/react";
import React, { useState } from "react";
import { Star, StarHalf, Plus, Minus, Check } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import styles from "./tshirt.module.css";

const Tshirt = ({ product }) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [selectedColor, setSelectedColor] = useState("olive");
  const [quantity, setQuantity] = useState(1);
  const { addToCart, notification } = useCart();

  if (!product)
    return <div className="p-20 text-center">Loading Product...</div>;

  const displayImages = [product.image, product.image, product.image];

  const colors = [
    { id: "olive", class: "bg-[#4F4631]" },
    { id: "green", class: "bg-[#314F4A]" },
    { id: "navy", class: "bg-[#31344F]" },
  ];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.productWrapper}>
        {/* LEFT: Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          className={styles.galleryLayout}
        >
          <div className={styles.thumbnailList}>
            {displayImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImg(idx)}
                className={`${styles.thumbnailItem} ${selectedImg === idx ? styles.thumbnailActive : styles.thumbnailInactive}`}
              >
                <img
                  src={img}
                  alt="thumbnail"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
          <div className={styles.mainImageDisplay}>
            <img
              src={displayImages[selectedImg]}
              alt={product.title}
              className={styles.fullImg}
            />
          </div>
        </motion.div>

        {/* RIGHT: Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          className={styles.infoSection}
        >
          <h1 className={styles.productTitle}>{product.title}</h1>

          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              {[...Array(Math.floor(product.rating || 4))].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
              {product.rating % 1 !== 0 && (
                <StarHalf size={18} fill="currentColor" />
              )}
            </div>
            <span className="text-sm">
              {product.rating || 4.5}/<span className="text-black/60">5</span>
            </span>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.currentPrice}>${product.price}</span>
            {product.oldPrice && (
              <span className={styles.oldPrice}>${product.oldPrice}</span>
            )}
            {product.discount && (
              <span className={styles.discountBadge}>{product.discount}</span>
            )}
          </div>

          <p className={styles.descriptionText}>
            {product.description ||
              "This premium garment is crafted from soft, breathable fabric, offering superior comfort and a modern fit for any casual occasion."}
          </p>

          {/* Color Selection */}
          <div className={styles.selectionBox}>
            <h3 className={styles.sectionLabel}>Select Colors</h3>
            <div className={styles.colorGrid}>
              {colors.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedColor(c.id)}
                  className={`${styles.colorCircle} ${c.class}`}
                >
                  {selectedColor === c.id && (
                    <Check size={16} className="text-white" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className={styles.selectionBox}>
            <h3 className={styles.sectionLabel}>Choose Size</h3>
            <div className={styles.sizeGrid}>
              {["Small", "Medium", "Large", "X-Large"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeActive : styles.sizeInactive}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actionRow}>
            <div className={styles.quantitySelector}>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <Minus size={20} />
              </button>
              <span className={styles.qtyValue}>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>
                <Plus size={20} />
              </button>
            </div>
            <button
              onClick={() =>
                addToCart(product, quantity, selectedSize, selectedColor)
              }
              className={styles.addToCartBtn}
            >
              Add to Cart
            </button>
          </div>

          {/* Notification */}
          {notification && <div className={styles.toast}>{notification}</div>}
        </motion.div>
      </div>
    </div>
  );
};

export default Tshirt;
