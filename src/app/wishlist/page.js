"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProductGrid from "@/components/ProductGrid";

export default function WishlistPage() {
  const { wishlist } = useCart();

  if (wishlist.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
        <Link href="/products" className="text-blue-600 hover:underline">
          Browse products →
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      <ProductGrid products={wishlist} />
    </main>
  );
}