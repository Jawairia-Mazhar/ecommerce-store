"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartDrawer = () => {
  const { isDrawerOpen, closeDrawer, cart, cartCount, updateQuantity, removeFromCart } = useCart();

  if (isDrawerOpen === false) {
    return null;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div
        onClick={closeDrawer}
        className="fixed inset-0 bg-black/40 z-40"
      ></div>

      <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 flex flex-col shadow-lg">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-lg">Your Cart ({cartCount})</h2>
          <button onClick={closeDrawer}>
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 mb-4">
                <div className="relative w-14 h-14 bg-gray-50 rounded-md overflow-hidden shrink-0">
                  <Image src={item.thumbnail} alt={item.title} fill className="object-contain" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>

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
                  <button onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={18} className="text-gray-400 hover:text-red-500" />
            </button>
               </div>
                <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-200 px-4 py-4">
          <div className="flex justify-between font-semibold mb-3">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link
            href="/cart"
            onClick={closeDrawer}
            className="block text-center bg-black text-white py-3 rounded-md hover:bg-gray-800"
          >
            View Bag
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;