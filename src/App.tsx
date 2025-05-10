import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Sidebar from './components/sidebar'; // Componente que contiene el menú de navegación
import Home from './pages/home'; // Página principal de la app
import Carrito from './pages/cart'; // Página del carrito de compras
import GameDetail from './pages/GameDetail'; // Página para mostrar los detalles del juego
import Favoritos from './pages/Favorites'; // Página para mostrar los juegos favoritos
import './index.css'; // Archivo de estilos globales

const App = () => {
  return (
    <Router> {/* Aquí estamos usando el Router para manejar la navegación */}
      <div className="d-flex">
        <Sidebar /> {/* Sidebar con las opciones de navegación */}
        
        <div className="flex-grow-1 p-4"> {/* Este contenedor muestra el contenido de la página */}
          <Routes>
            {/* Aquí se definen todas las rutas de la app */}
            <Route path="/" element={<Home />} /> {/* Ruta principal */}
            <Route path="/carrito" element={<Carrito />} /> {/* Ruta del carrito */}
            <Route path="/juego/:titulo" element={<GameDetail />} /> {/* Ruta de detalles del juego */}
            <Route path="/favoritos" element={<Favoritos />} /> {/* Ruta para la página de favoritos */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
