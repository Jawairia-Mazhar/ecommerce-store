"use client";

import Link from "next/link";
import { ShoppingBag, Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cartContext";

const Navbar = () => {
  const { wishlist, cartCount } = useCart();

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <ShoppingBag size={24} />
          Shoply
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <Link href="/products" className="hover:text-gray-900">Products</Link>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/wishlist" className="relative">
            <Heart size={22} className="text-gray-700 hover:text-red-500"/>
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative">
            <ShoppingCart size={22} className="text-gray-700 hover:text-black"/>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar