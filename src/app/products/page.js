import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Products</h1>
      <ProductGrid products={products} />
    </main>
  );
}