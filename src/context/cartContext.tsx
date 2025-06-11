import { createContext, useState, type ReactNode, useContext } from 'react';
import type { Game } from '../types/index';

type CartContextType = {
  carrito: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (game: Game) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<Game[]>([]);

  const addToCart = (game: Game) => {
    setCarrito((prevCarrito) => [...prevCarrito, game]);
  };

  const removeFromCart = (game: Game) => {
    setCarrito((prevCarrito) => prevCarrito.filter(item => item.titulo !== game.titulo));
  };

  return (
    <CartContext.Provider value={{ carrito, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
