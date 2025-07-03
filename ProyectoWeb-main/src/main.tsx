import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { CartProvider } from './context/cartContext'; // Importa el CartProvider
import { FavoritesProvider } from './context/favoritesContext'; // Importa el FavoritesProvider
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider> {/* ⬅️ Envolver todo con UserProvider */}
      <CartProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);

