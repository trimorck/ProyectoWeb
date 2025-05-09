import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { CartProvider } from './context/cartContext'; // Importa el CartProvider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider> {/* Envuelve el App con CartProvider */}
      <App />
    </CartProvider>
  </React.StrictMode>
);
