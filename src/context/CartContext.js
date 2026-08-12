"use client"; //a component must be rendered on the client side instead of the server.

import { createContext, useContext, useState } from "react";

const CartContext = createContext(); // an empty box that will hold shared data of cart and wishlist.

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) {removeFromCart(productId); return;}
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  function toggleWishlist(product) {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  }

  function openDrawer(){
    setIsDrawerOpen(true)
  }
  
  function closeDrawer(){
    setIsDrawerOpen(false)
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  
  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        openDrawer,
        closeDrawer,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}