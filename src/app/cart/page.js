"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products" className="text-blue-600 hover:underline">
          Browse products →
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border-b border-gray-200 pb-4"
          >
            <div className="relative w-20 h-20 bg-gray-50 rounded-md overflow-hidden shrink-0">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-medium text-sm">{item.title}</h3>
              <p className="text-gray-500 text-sm">${item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-7 h-7 border rounded flex items-center justify-center"
              >
                -
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-7 h-7 border rounded flex items-center justify-center"
              >
                +
              </button>
            </div>

            <p className="w-16 text-right font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button onClick={() => removeFromCart(item.id)}>
              <Trash2 size={18} className="text-gray-400 hover:text-red-500" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-lg font-semibold mb-4">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="block text-center bg-black text-white py-3 rounded-md hover:bg-gray-800"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}