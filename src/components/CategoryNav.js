import Link from "next/link";
import Image from "next/image";

export default function CategoryNav({ categories }) {
  const featured = categories.slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
        {featured.map((category) => (
          <Link
            key={category.slug}
            href={`/products?category=${category.slug}`}
            className="flex flex-col items-center gap-3 shrink-0 group"
          >
            <div className="relative w-24 h-24 rounded-full bg-card border border-gray-200 overflow-hidden flex items-center justify-center group-hover:border-accent transition">
              <Image
                src={category.image || "/placeholder.png"}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-700 capitalize group-hover:text-accent transition">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}