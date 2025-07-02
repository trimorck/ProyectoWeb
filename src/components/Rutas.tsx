import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Carrito from '../pages/cart';
import GameDetail from '../pages/GameDetail';
import Favoritos from '../pages/Favorites';
import PerfilU from '../pages/PerfilU';
import Login from '../pages/login';
import Registro from '../pages/Registro';

export default function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/juego/:titulo" element={<GameDetail />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/perfil" element={<PerfilU />} />
      <Route path="/login" element={<Login />} />
      <Route path='/registro' element={<Registro/>} />
    </Routes>
  );
}
