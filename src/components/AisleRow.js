import Link from "next/link";
import ProductCard from "./ProductCard";

export default function AisleRow({ category, products }) {

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 border-t border-gray-200">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-baseline gap-3">
          <h2 className="text-xl font-semibold text-gray-900 capitalize">{category.name}</h2>
        </div>
        <Link
          href={`/products?category=${category.slug}`}
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          See all →
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {products.map((product) => (
          <div key={product.id} className="w-56 shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}