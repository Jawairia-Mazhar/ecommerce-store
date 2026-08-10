"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, Sparkles } from "lucide-react";

export default function Hero({ heroProducts = [] }) {
  // Animation variants for container & children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Predefined positioning & subtle floating animations for collage cards
  const cardsConfig = [
    {
      posClass: "top-0 left-6 w-40 h-40 md:w-44 md:h-44 z-30",
      floatAnimation: { y: [0, -8, 0], rotate: [0, -2, 0] },
      duration: 4,
    },
    {
      posClass: "top-12 left-44 w-48 h-48 md:w-52 md:h-52 z-20",
      floatAnimation: { y: [0, 10, 0], rotate: [0, 2, 0] },
      duration: 5,
    },
    {
      posClass: "top-44 left-2 w-36 h-36 md:w-40 md:h-40 z-10",
      floatAnimation: { y: [0, -10, 0], rotate: [0, -3, 0] },
      duration: 4.5,
    },
    {
      posClass: "top-8 right-2 w-44 h-44 md:w-48 md:h-48 z-40",
      floatAnimation: { y: [0, 8, 0], rotate: [0, 3, 0] },
      duration: 5.5,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50/50 via-white to-white">
      {/* Background Decor Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-foreground-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: TEXT & CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          {/* Tag / Pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent font-medium text-xs tracking-wider uppercase mb-4 border border-accent/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Shoply Marketplace</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.08]"
          >
            Everything you need. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-black to-accent">
              One aisle at a time.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-base sm:text-lg mb-8 max-w-lg leading-relaxed"
          >
            Beauty, tech, home, and fashion — browse thousands of verified products curated for your daily lifestyle.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10"
          >
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2 bg-accent text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto text-center"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop All Products</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors w-full sm:w-auto text-center"
            >
              Explore Categories
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={itemVariants}
            className="pt-6 border-t border-gray-100 w-full grid grid-cols-2 gap-4 text-xs sm:text-sm text-gray-500 font-medium"
          >
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-accent" />
              <span>Free Express Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>100% Buyer Protection</span>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: ANIMATED PRODUCT COLLAGE */}
        <div className="relative w-full h-[400px] md:h-[460px] flex items-center justify-center">
          
          {/* Subtle Glow Ring behind images */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-black/10 rounded-full blur-3xl" />

          {/* Floating Badge overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-2 left-4 md:left-8 z-50 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3"
          >
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-xs">
              <p className="font-bold text-gray-900">10,000+ Items</p>
              <p className="text-gray-500">In stock & ready to ship</p>
            </div>
          </motion.div>

          {/* Product Cards Grid/Collage (Desktop + Tablet) */}
          <div className="relative w-full h-full hidden sm:block">
            {heroProducts.slice(0, 4).map((product, index) => {
              const config = cardsConfig[index] || cardsConfig[0];

              return (
                <motion.div
                  key={product.id || index}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: config.floatAnimation.y,
                    rotate: config.floatAnimation.rotate,
                  }}
                  transition={{
                    opacity: { duration: 0.6, delay: index * 0.15 },
                    scale: { duration: 0.6, delay: index * 0.15 },
                    y: {
                      duration: config.duration,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: config.duration + 1,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                  }}
                  whileHover={{
                    scale: 1.08,
                    zIndex: 50,
                    transition: { duration: 0.2 },
                  }}
                  className={`absolute ${config.posClass} group cursor-pointer bg-white rounded-2xl p-3 shadow-lg hover:shadow-2xl border border-gray-100 transition-shadow duration-300`}
                >
                  <div className="relative w-full h-full bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
                    <Image
                      src={product.thumbnail}
                      alt={product.title || "Product image"}
                      fill
                      sizes="(max-width: 768px) 100vw, 250px"
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                      priority={index < 2}
                    />
                  </div>
                  {/* Tooltip title on hover */}
                  <div className="absolute inset-x-2 bottom-2 bg-gray-900/80 backdrop-blur-xs text-white text-[10px] font-medium py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 truncate text-center">
                    {product.title}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Fallback: Horizontal Scroll Preview */}
          <div className="sm:hidden flex gap-3 overflow-x-auto w-full py-4 px-2 snap-x snap-mandatory scrollbar-none">
            {heroProducts.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id || index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="snap-center shrink-0 w-36 h-48 bg-white rounded-2xl p-2.5 shadow-md border border-gray-100 flex flex-col justify-between"
              >
                <div className="relative w-full h-32 bg-gray-50 rounded-xl overflow-hidden">
                  <Image
                    src={product.thumbnail}
                    alt={product.title || "Product"}
                    fill
                    sizes="150px"
                    className="object-contain p-2"
                  />
                </div>
                <p className="text-[11px] font-semibold text-gray-800 truncate mt-1">
                  {product.title}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}