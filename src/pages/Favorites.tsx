import { Link } from 'react-router-dom';
import { useFavorites } from '../context/favoritesContext';

const Favorites = () => {
  const { favoritos, eliminarFavorito } = useFavorites();

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tus Juegos Favoritos</h2>

      {favoritos.length === 0 ? (
        <p>No tienes juegos favoritos. Agrega algunos a tu lista.</p>
      ) : (
        <div className="row">
          {favoritos.map((game) => (
            <div key={game.titulo} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={game.image}
                  alt={game.titulo}
                  className="card-img-top"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{game.titulo}</h5>
                  <p className="card-text">${game.precio.toFixed(2)}</p>
                  <div className="mt-auto">
                    <Link
                      to={`/juego/${encodeURIComponent(game.titulo)}`}
                      className="btn btn-primary w-100 mb-2"
                    >
                      Ver detalles
                    </Link>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => eliminarFavorito(game.titulo)}
                    >
                      Eliminar de favoritos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
