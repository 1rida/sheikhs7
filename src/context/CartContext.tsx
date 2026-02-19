'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the Product interface
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  rating?: number;
}

// Define the CartItem interface
export interface CartItem extends Product {
  quantity: number;
}

// Define the shape of the CartContext
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => Promise<void> | void;
  removeFromCart: (productId: string) => Promise<void> | void;
  clearCart: () => void;
  getCartItemCount: () => number;
}

// Create the CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the CartProvider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = async (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

    // Record the "Add to Cart" event in the backend
    try {
      await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: quantity,
          userId: 'anonymous', // You can replace this with actual user ID if available
        }),
      });
    } catch (error) {
      console.error('Failed to record cart event:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item.id !== productId);
      }
    });

    // Record the "Remove from Cart" event in the backend
    try {
      await fetch('/api/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
          quantity: 1, // Assuming we remove 1 at a time
          userId: 'anonymous',
        }),
      });
    } catch (error) {
      console.error('Failed to record cart event:', error);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
