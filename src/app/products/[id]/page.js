//server component

import {getProductById} from "@/lib/api"; 
import {notFound} from "next/navigation";
import Image from "next/image";
import AddToCartBtn from "@/components/AddToCartBtn";

export default async function ProductDetailPage({params}) {
    const {id} = await params;
    let product;
    try {
        product = await getProductById(id);
    } catch (error) {
        notFound();
    }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="relative w-full h-96 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>

      <div>
        <p className="text-xs uppercase text-gray-500 mb-2">{product.category}</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-semibold text-gray-900">
            ${product.price}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-green-600 font-medium">
              {Math.round(product.discountPercentage)}% off
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-1">
          Rating: {product.rating} / 5
        </p>
        <p className={`text-sm mb-6 ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
          {product.stock > 0 ? `In stock (${product.stock} left)` : "Out of stock"}
        </p>

        <AddToCartBtn product={product} />
      </div>
    </main>
  );    
}