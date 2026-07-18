"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
    const { addToCart, toggleWishlist, wishlist } = useCart();
    const inWishlist = wishlist.some(item => item.id === product.id);

    return (
        <div className = "flex flex-col mt-2">
            <Link href={`/products/${product.id}`}>
        <div className="relative w-58 h-58 m-auto bg-gray-50 rounded-md overflow-hidden border-gray-300 border">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
      </Link>

      <div className="flex justify-between items-start mt-2">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-sm text-gray-900 line-clamp-2">
            {product.title}
          </h3>
        </Link>
            <button onClick={() => toggleWishlist(product)}>
                <Heart
                    size={18}
                    className={inWishlist ? "fill-red-500 text-red-500" : "text-gray-400"}
                />
            </button>
        </div>

      <p className="text-xs text-gray-500 capitalize">{product.category}</p>

      <div className="flex items-center justify-between mt-2">
        <span className="font-semibold text-gray-900">${product.price}</span>
        <button
          onClick={() => addToCart(product)}
          className="bg-black text-white text-xs px-3 py-1.5 rounded-md hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}