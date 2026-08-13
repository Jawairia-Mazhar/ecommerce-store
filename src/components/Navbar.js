"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShoppingBag, 
  Heart, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import SearchBar from "./SearchBar";
import { Suspense } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop All", href: "/products" },
];

export default function Navbar() {
  const { wishlist = [], cartCount = 0, openDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Add subtle shadow when page scrolls
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 bg-white/90 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "shadow-md border-b border-gray-100 py-1" : "border-b border-gray-200 py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-4 h-14">
          
          {/* BRAND LOGO & MOBILE MENU TOGGLE */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-gray-900 group"
            >
              <div className="w-9 h-9 rounded-xl bg-accent text-white flex items-center justify-center shadow-md shadow-accent/25 group-hover:scale-105 transition-transform">
                <ShoppingBag size={20} />
              </div>
              <span className="hidden sm:inline-block">Shoply</span>
            </Link>
          </div>

          {/* DESKTOP NAV LINKS */}
          <ul className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative py-1 transition-colors flex items-center gap-1.5 ${
                      isActive ? "text-accent font-semibold" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.name}
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 rounded-full leading-none">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* SEARCH BAR */}
          <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-2">
            <Suspense fallback={<div className="h-10 bg-gray-100 rounded-md animate-pulse"></div>}>
              <SearchBar />
            </Suspense>
          </div>

          {/* ACTION BUTTONS (WISHLIST, CART, ACCOUNT) */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Account / Profile Link */}
            <Link 
              href="/account"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              title="My Account"
            >
              <User size={20} />
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative flex items-center justify-center w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 hover:text-red-500 transition-colors"
              title="Wishlist"
            >
              <Heart size={20} />
              <AnimatePresence>
                {wishlist.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center border-2 border-white"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Cart Trigger Button */}
            <button
              onClick={() => openDrawer()}
              className="relative flex items-center justify-center w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 hover:text-accent transition-colors cursor-pointer"
              title="Open Shopping Cart"
            >
              <ShoppingCart size={20} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    key={cartCount} // Re-triggers bounce on count update
                    className="absolute top-1 right-1 bg-black text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center border-2 border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

        </nav>
      </div>

      {/* MOBILE DRAWER NAVIGATION */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />

            {/* Slide-out Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white z-50 p-6 shadow-2xl flex flex-col justify-between lg:hidden"
            >
              <div>
                {/* Mobile Drawer Header */}
                <div className="flex items-center justify-between pb-6  border-b border-gray-100">
                  <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                    <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center">
                      <ShoppingBag size={18} />
                    </div>
                    <span>Shoply</span>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Nav Links List */}
                <ul className="mt-6 space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                          pathname === link.href
                            ? "bg-accent/10 text-accent font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {link.name}
                          {link.badge && (
                            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 rounded-full">
                              {link.badge}
                            </span>
                          )}
                        </span>
                        <ChevronRight size={16} className="text-gray-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="pt-6 border-t border-gray-100 space-y-3">
                <Link
                  href="/account"
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-800 font-medium hover:bg-gray-100 transition-colors"
                >
                  <User size={18} className="text-gray-500" />
                  <span>Account Settings</span>
                </Link>
                <div className="p-3 rounded-xl bg-accent/5 border border-accent/10 flex items-center gap-2 text-xs text-accent font-medium">
                  <Sparkles size={16} />
                  <span>Free shipping on orders over $50</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}