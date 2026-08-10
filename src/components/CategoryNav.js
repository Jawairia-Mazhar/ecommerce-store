"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Smile, 
  Tv, 
  Home as HomeIcon, 
  Shirt, 
  ShoppingBag,
  Flame,
  Watch
} from "lucide-react";

// Map category slugs/names to fallback high-res realistic images & icons
const CATEGORY_META = {
  beauty: {
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
    icon: Sparkles,
  },
  fragrances: {
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop",
    icon: Flame,
  },
  electronics: {
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    icon: Tv,
  },
  furniture: {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop",
    icon: HomeIcon,
  },
  fashion: {
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop",
    icon: Shirt,
  },
  watches: {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    icon: Watch,
  },
  default: {
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=600&auto=format&fit=crop",
    icon: ShoppingBag,
  },
};

export default function CategoryNav({ categories = [] }) {
  const scrollContainerRef = useRef(null);

  // Fallback data if categories prop is empty
  const displayCategories = categories.length > 0 ? categories : [
    { name: "Beauty", slug: "beauty" },
    { name: "Fragrances", slug: "fragrances" },
    { name: "Electronics", slug: "electronics" },
    { name: "Furniture", slug: "furniture" },
    { name: "Fashion", slug: "fashion" },
    { name: "Watches", slug: "watches" },
  ];

  // Scroll controls for desktop
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      
      {/* SECTION HEADER */}
      <div className="flex items-end justify-between mb-8">
        <div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Shop by Category
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Scroll Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-2 mr-2">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-sm transition-all hover:scale-105 active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-sm transition-all hover:scale-105 active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <Link
            href="/categories"
            className="group flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* CATEGORY SCROLL LIST */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 sm:gap-8 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {displayCategories.map((category, index) => {
          const meta = CATEGORY_META[category.slug?.toLowerCase()] || CATEGORY_META.default;
          const CategoryIcon = meta.icon;
          const imageSrc = category.image || meta.image;

          return (
            <motion.div
              key={category.slug || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="snap-start shrink-0"
            >
              <Link
                href={`/products?category=${category.slug}`}
                className="flex flex-col items-center gap-3.5 group cursor-pointer"
              >
                {/* Category Avatar Wrapper */}
                <div className="relative">
                  {/* Outer Animated Glow Ring on Hover */}
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-accent to-black opacity-0 group-hover:opacity-100 blur-sm transition duration-300" />

                  {/* Main Circle Image Container */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-100 border-2 border-gray-200/80 overflow-hidden shadow-md group-hover:border-transparent group-hover:shadow-xl transition-all duration-300">
                    <Image
                      src={imageSrc}
                      alt={category.name}
                      fill
                      sizes="120px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient Overlay for subtle depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <CategoryIcon size={16} />
                  </div>
                </div>

                {/* Category Label */}
                <span className="text-sm font-semibold text-gray-800 capitalize tracking-tight group-hover:text-accent transition-colors">
                  {category.name}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}