import { getProducts, getCategories } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar"
import FilterSidebar from "@/components/FilterSidebar"

export default async function ProductsPage({searchParams}) {
  const products = await getProducts();
  const { product, category } = await searchParams; //pulls out the property specifically from the URL 

  const categories = await getCategories();

  const filteredProducts = () => {
    let result = products;

    if (product) {//Keep this product if — its title contains what the user typed, OR its category contains what the user typed.
      result = result.filter(pro => 
        pro.title.toLowerCase().includes(product.toLowerCase()) 
        || 
        pro.category.toLowerCase().includes(product.toLowerCase()))
    }
    if (category) {
      result = result.filter(pro => pro.category === category) //comparing two plain strings. of category button and URL
    }
    return result;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <SearchBar />
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Products</h1>
      <FilterSidebar categories={categories} />
      <ProductGrid products={filteredProducts()} /> 
    </main>
  );
}