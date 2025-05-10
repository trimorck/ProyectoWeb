import { useParams, Link } from 'react-router-dom';
import { games } from '../data/games';
import { useCart } from '../context/cartContext';
import { useState, useEffect } from 'react';
import type { Game } from '../types/index';

const GameDetail = () => {
  const { titulo } = useParams();
  const game = games.find((g) => g.titulo === decodeURIComponent(titulo || ''));
  const { addToCart } = useCart();

  const [favoritos, setFavoritos] = useState<Game[]>([]);

  // Cargar favoritos desde localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem('favoritos');
    setFavoritos(stored ? JSON.parse(stored) : []);
  }, []);

  const isFavorito = favoritos.some((g) => g.titulo === game?.titulo);

  const agregarAFavoritos = (game: Game) => {
    const nuevos = [...favoritos, game];
    setFavoritos(nuevos);
    localStorage.setItem('favoritos', JSON.stringify(nuevos));
  };

  const eliminarDeFavoritos = (titulo: string) => {
    const nuevos = favoritos.filter((g) => g.titulo !== titulo);
    setFavoritos(nuevos);
    localStorage.setItem('favoritos', JSON.stringify(nuevos));
  };

  if (!game) return <div className="container mt-5">Juego no encontrado</div>;

  return (
    <div className="container mt-5">
      <div className="row bg-dark text-white p-4 rounded shadow">
        {/* Imagen del juego */}
        <div className="col-md-5">
          <img
            src={game.image}
            alt={game.titulo}
            className="img-fluid rounded mb-3 border border-secondary"
          />
        </div>

        {/* Detalles */}
        <div className="col-md-7 d-flex flex-column justify-content-between">
          <div>
            <h2 className="fw-bold">{game.titulo}</h2>
            <p className="text-success fs-4 mt-3 mb-2">Precio: ${game.precio.toFixed(2)}</p>
            <p className="text-light">
              Aquí podrías agregar una descripción real del juego, requisitos mínimos, plataformas, etc.
            </p>
          </div>

          {/* Botones */}
          <div className="mt-4 d-flex flex-column gap-2">
            <button className="btn btn-success btn-lg w-100" onClick={() => addToCart(game)}>
              <i className="bi bi-cart-plus me-2"></i>Añadir al carrito
            </button>

            {!isFavorito ? (
              <button className="btn btn-outline-light w-100" onClick={() => agregarAFavoritos(game)}>
                <i className="bi bi-heart me-2"></i>Añadir a favoritos
              </button>
            ) : (
              <button className="btn btn-danger w-100" onClick={() => eliminarDeFavoritos(game.titulo)}>
                <i className="bi bi-heart-fill me-2"></i>Eliminar de favoritos
              </button>
            )}

            {isFavorito && (
              <Link to="/favoritos" className="btn btn-secondary w-100">
                <i className="bi bi-bookmark-heart me-2"></i>Ver favoritos
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
