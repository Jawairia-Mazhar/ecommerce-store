import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar"

export default async function ProductsPage({searchParams}) {
  const products = await getProducts();
  const { q: query } = await searchParams; //pulls out the q property specifically and stores it in a variable named query 
  const filteredProducts = () => {
    if (query == null || query === undefined || query === "") {
      return products;}
    else{
      return products.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <SearchBar />
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Products</h1>
      <ProductGrid products={filteredProducts()} /> 
    </main>
  );
}