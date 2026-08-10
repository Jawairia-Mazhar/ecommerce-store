import { getProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductGallery from "@/components/ProductGallery";
import ProductActions from "@/components/ProductActions";
import { 
  Star, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronRight,
  Sparkles
} from "lucide-react";

// Dynamic Next.js SEO Metadata
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const product = await getProductById(id);
    return {
      title: `${product.title} | Shoply Marketplace`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [{ url: product.thumbnail }],
      },
    };
  } catch (e) {
    return { title: "Product Not Found | Shoply" };
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  let product;

  try {
    product = await getProductById(id);
  } catch (error) {
    notFound();
  }

  // Calculate original price before discount
  const originalPrice = product.discountPercentage > 0
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  // Prepare images array (fallbacks to thumbnail if images array missing)
  const imagesList = product.images && product.images.length > 0
    ? product.images
    : [product.thumbnail];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* BREADCRUMB NAVIGATION */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-8 capitalize">
        <Link href="/" className="hover:text-gray-900 transition-colors">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link href="/products" className="hover:text-gray-900 transition-colors">
          Products
        </Link>
        <ChevronRight size={14} />
        <Link
          href={`/products?category=${product.category}`}
          className="hover:text-gray-900 transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium truncate max-w-[200px]">
          {product.title}
        </span>
      </nav>

      {/* MAIN PRODUCT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: INTERACTIVE GALLERY */}
        <ProductGallery images={imagesList} title={product.title} />

        {/* RIGHT COLUMN: PRODUCT DETAILS */}
        <div className="flex flex-col">
          
          {/* Brand/Category Tag */}
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider">
              {product.brand || product.category}
            </span>
            {product.stock > 0 && product.stock <= 5 && (
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                Only {product.stock} left in stock!
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            {product.title}
          </h1>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Math.floor(product.rating || 0)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-200"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-800">
              {product.rating ? product.rating.toFixed(1) : "4.5"}
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-500 underline cursor-pointer hover:text-gray-800">
              128 customer reviews
            </span>
          </div>

          {/* Pricing Section */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100 mb-6">
            <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              ${product.price}
            </span>
            {originalPrice && (
              <span className="text-lg text-gray-400 line-through font-medium">
                ${originalPrice}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                Save {Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Stock Availability */}
          <div className="flex items-center gap-2 mb-6 text-sm font-medium">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                product.stock > 0 ? "bg-emerald-500 animate-pulse" : "bg-red-500"
              }`}
            />
            <span className={product.stock > 0 ? "text-emerald-700" : "text-red-600"}>
              {product.stock > 0
                ? `In Stock (${product.stock} available)`
                : "Currently Out of Stock"}
            </span>
          </div>

          {/* ADD TO CART & WISHLIST ACTIONS (Client Component) */}
          <ProductActions product={product} />

          {/* TRUST BADGES & GUARANTEES */}
          <div className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Free Express Delivery</p>
                <p className="text-[11px] text-gray-500">Orders over $50</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
                <RotateCcw size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">30-Day Returns</p>
                <p className="text-[11px] text-gray-500">Hassle-free guarantee</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">100% Authentic</p>
                <p className="text-[11px] text-gray-500">Verified Marketplace</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}