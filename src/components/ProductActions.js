"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductActions({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, wishlist = [], toggleWishlist } = useCart();

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="p-2.5 text-gray-600 hover:text-black disabled:opacity-30 rounded-lg hover:bg-white transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 text-center font-bold text-gray-900 text-sm">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
            disabled={quantity >= product.stock}
            className="p-2.5 text-gray-600 hover:text-black disabled:opacity-30 rounded-lg hover:bg-white transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Add To Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 disabled:bg-gray-300 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-accent/20 transition-all active:scale-98 disabled:cursor-not-allowed cursor-pointer"
        >
          <ShoppingCart size={20} />
          <span>{product.stock > 0 ? "Add To Shopping Cart" : "Out of Stock"}</span>
        </button>

        {/* Wishlist Toggle Button */}
        <button
          onClick={() => toggleWishlist?.(product)}
          className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
            isWishlisted
              ? "bg-red-50 border-red-200 text-red-500"
              : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-red-500"
          }`}
          title="Toggle Wishlist"
        >
          <Heart size={20} className={isWishlisted ? "fill-red-500" : ""} />
        </button>
      </div>
    </div>
  );
}