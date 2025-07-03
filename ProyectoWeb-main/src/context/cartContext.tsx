import { createContext, useState, type ReactNode, useContext } from 'react';
import type { Game, GameInCart } from '../types/index';

type CartContextType = {
  carrito: GameInCart[];
  addToCart: (game: Game) => void;
  removeFromCart: (game: Game) => void;
  clearCart: () => void;
  updateStockAfterPurchase: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<GameInCart[]>([]);
  const [inventario, setInventario] = useState<Game[]>([]); // inventario simulado

  const addToCart = (game: Game) => {
    setCarrito(prev => {
      const index = prev.findIndex(item => item.titulo === game.titulo);
      if (index !== -1) {
        const updated = [...prev];
        if (updated[index].quantity < game.stock) {
          updated[index].quantity += 1;
        }
        return updated;
      } else {
        return [...prev, { ...game, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (game: Game) => {
    setCarrito(prev => prev.filter(item => item.titulo !== game.titulo));
  };

  const clearCart = () => {
    setCarrito([]);
  };

  const updateStockAfterPurchase = () => {
    setInventario(prev =>
      prev.map(item => {
        const itemInCart = carrito.find(cartItem => cartItem.titulo === item.titulo);
        if (itemInCart) {
          return {
            ...item,
            stock: Math.max(item.stock - itemInCart.quantity, 0),
          };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider value={{ carrito, addToCart, removeFromCart, clearCart, updateStockAfterPurchase }}>
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
