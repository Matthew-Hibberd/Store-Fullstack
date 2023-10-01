import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from './components/ProductDetail'

// Define the CartContextType as before
interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
}

const defaultCartContext: CartContextType = {
  cart: [],
  addToCart: (product: Product) => {},
  clearCart: () => {}
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Define a type for the children prop
type CartProviderProps = {
  children: ReactNode;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
