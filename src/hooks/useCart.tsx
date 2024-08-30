import { useState, useCallback } from 'react';
import type { CartItem } from './interface';

export default function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.productId === item.productId);
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + item.quantity,
          timestamp: Date.now()
        };
        return updatedCart;
      }
      return [...prevCart, { ...item, timestamp: Date.now() }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prevCart) => prevCart.filter(item => item.productId !== productId));
  }, []);

  const updateCartItem = useCallback((productId: number, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item.productId === productId ? { ...item, quantity, timestamp: Date.now() } : item
      );
      return updatedCart;
    });
  }, []);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateCartItem
  };
}