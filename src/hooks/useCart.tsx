import { useState, useCallback, useEffect } from 'react';
import type { CartItem } from './interface';

export default function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // Solo accede al localStorage si está disponible
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  useEffect(() => {
    // Guarda en localStorage cada vez que el carrito cambia
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.productId === item.productId);
      if (existingItem) {
        return prevCart.map(i => 
          i.productId === item.productId 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prevCart, item];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  }, []);

  const updateCartItem = useCallback((productId: number, quantity: number) => {
    setCart(prevCart => prevCart.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    ));
  }, []);

  const isInCart = useCallback((productId: number) => {
    return cart.some(item => item.productId === productId);
  }, [cart]);

  const cartItemsCount = cart.reduce((total) => total, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateCartItem,
    isInCart,
    cartItemsCount
  };
}