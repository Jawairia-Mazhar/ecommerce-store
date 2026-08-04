import { getProducts, getCategories } from "@/lib/api";
import Hero from "@/components/Hero";
import CategoryNav from "@/components/CategoryNav";
import AisleRow from "@/components/AisleRow";
import ProductGrid from "@/components/ProductGrid";


export default async function HomePage() {
  const products = await getProducts();
  const categories = await getCategories();

  const featuredCategories = categories.slice(0, 3);

  const trending = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <main>
      <Hero heroProducts={products.slice(0, 4)} />
      <CategoryNav categories={categories} />

      {featuredCategories.map((category, index) => {
        const categoryProducts = products
          .filter((p) => p.category === category.slug)
          .slice(0, 8);

        if (categoryProducts.length === 0) return null;

        return (
          <AisleRow
            key={category.slug}
            index={index}
            category={category}
            products={categoryProducts}
          />
        );
      })}

      <section className="max-w-7xl mx-auto px-4 py-10 border-t border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">Trending Now</h2>
        <ProductGrid products={trending} />
      </section>
    </main>
  );
}