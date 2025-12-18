import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { Coffee } from '../components/CoffeeCard';

export type CartItem = {
  product: Coffee;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Coffee, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  setQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Coffee, qty: number = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.product.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const setQuantity = (productId: string, qty: number) => {
    setItems(prev => {
      if (qty <= 0) return prev.filter(i => i.product.id !== productId);
      return prev.map(i => (i.product.id === productId ? { ...i, quantity: qty } : i));
    });
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.product.price * it.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, setQuantity, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};






