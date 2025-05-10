// // src/context/favoritesContext.tsx

// import { createContext, useContext, useState, ReactNode } from 'react';
// import type { Game } from '../types/index';

// interface FavoritesContextType {
//   favoritos: Game[];
//   addToFavorites: (game: Game) => void;
//   removeFromFavorites: (titulo: string) => void;
// }

// const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// export const useFavorites = () => {
//   const context = useContext(FavoritesContext);
//   if (!context) {
//     throw new Error('useFavorites must be used within a FavoritesProvider');
//   }
//   return context;
// };

// interface FavoritesProviderProps {
//   children: ReactNode;
// }

// export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
//   const [favoritos, setFavoritos] = useState<Game[]>([]);

//   const addToFavorites = (game: Game) => {
//     setFavoritos((prev) => [...prev, game]);
//   };

//   const removeFromFavorites = (titulo: string) => {
//     setFavoritos((prev) => prev.filter((game) => game.titulo !== titulo));
//   };

//   return (
//     <FavoritesContext.Provider value={{ favoritos, addToFavorites, removeFromFavorites }}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// };
