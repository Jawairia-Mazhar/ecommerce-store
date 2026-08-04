import Link from "next/link";
import Image from "next/image";

export default function Hero({ heroProducts }) {
  return (
    <section className = "max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div>
        <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">
          Shoply Marketplace
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.05]">
          Everything you need.
          <br />
          One aisle at a time.
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Beauty, tech, home, and more — browse it all in one place, curated for you.
        </p>
        <Link
          href="/products"
          className="inline-block bg-accent text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition"
        >
          Shop All →
        </Link>
      </div>

      <div className="relative h-80 md:h-96 hidden md:block">
        {heroProducts.slice(0, 4).map((product, index) => {
          const positions = [
            "top-0 left-8 w-40 h-40 z-30",
            "top-16 left-40 w-48 h-48 z-20",
            "top-40 left-0 w-36 h-36 z-10",
            "top-4 right-0 w-44 h-44 z-40",
          ];
          return (
            <div
              key={product.id}
              className={`absolute ${positions[index]} bg-card rounded-2xl overflow-hidden shadow-md border border-gray-200`}
            >
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-contain p-4"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}