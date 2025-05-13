import { useState } from 'react';
import { games } from '../data/games';
import GameCard from '../components/GameCard';
import { useUser } from '../context/UserContext'; // ⬅️ Importa tu contexto
import { Link } from 'react-router-dom'; // Importa Link para la navegación

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { usuario } = useUser(); // ⬅️ Accede al usuario

  const filteredGames = games.filter((game) =>
    game.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const popularGames = games.slice(0, 4);

  return (
    <div className="container mt-5">
      {/* Mensaje de bienvenida */}
      <div className="mb-5 text-center">
        <h4 className="fw-bold text-primary">
          Bienvenido, <span className="text-secondary">{usuario?.nombre ?? 'Usuario'}</span> 👋
        </h4>
        <p className="text-muted fs-5">Explora nuestros juegos recomendados y más</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="input-group mb-5">
        <span className="input-group-text bg-primary text-white">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control shadow-sm rounded"
          placeholder="Buscar juegos..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ borderRadius: '0.375rem' }}
        />
        <span
          className="input-group-text bg-danger text-white"
          onClick={clearSearch}
          style={{ cursor: 'pointer', borderRadius: '0.375rem' }}
        >
          <i className="bi bi-x-circle"></i>
        </span>
      </div>

      {/* Sección de Juegos Populares */}
      <h2 className="mb-4 text-center fw-bold">Juegos Populares</h2>
      <div
        id="popularGamesCarousel"
        className="carousel slide mb-5 shadow-lg rounded"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {popularGames.map((game, i) => (
            <div
              key={i}
              className={`carousel-item ${i === 0 ? 'active' : ''} w-100`}
            >
              <div className="d-flex justify-content-center w-100">
                <div className="row w-100">
                  {/* Columna para la imagen */}
                  <div className="col-12 col-md-6 mb-4">
                    <Link to={`/juego/${game.titulo}`}> {/* Link para redirigir al detalle */}
                      <img
                        src={game.image} // Ajusta según el campo de imagen en tus datos
                        alt={game.titulo}
                        className="img-fluid rounded" // Ajusta la imagen a su contenedor
                        style={{
                          objectFit: 'cover', // Asegura que la imagen no se distorsione
                          height: '100%', // Asegura que la imagen cubra todo el espacio disponible
                          marginTop: '10px',
                        }}
                      />
                    </Link>
                  </div>

                  {/* Columna para los detalles del juego */}
                  <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
                    <h4 className="text-center">
                      <Link to={`/juego/${game.titulo}`}>{game.titulo}</Link> {/* Link al título del juego */}
                    </h4>
                    <p className='text-center text-dark'>{game.descrip}</p>
                    <h5 className="text-center text-dark">${game.precio}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#popularGamesCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#popularGamesCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Sección de Todos los Juegos */}
      <h2 className="mb-4 text-center fw-bold">Todos los Juegos</h2>
      <div className="row">
        {filteredGames.map((game, i) => (
          <div className="col-md-3 mb-4" key={i}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
