"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartBtn({ product }) {
  const { cart, addToCart, updateQuantity } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);

  if (cartItem) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
          className="w-9 h-9 border rounded flex items-center justify-center"
        >
          -
        </button>
        <span className="w-8 text-center font-medium">{cartItem.quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
          className="w-9 h-9 border rounded flex items-center justify-center"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => addToCart(product)}
      className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
    >
      Add to Cart
    </button>
  );
}