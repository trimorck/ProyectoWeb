import { useState } from 'react';
import { games } from '../data/games';
import GameCard from '../components/GameCard';
// import '../styles/Home.module.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar los juegos según el término de búsqueda
  const filteredGames = games.filter((game) =>
    game.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Suponemos que "juegos populares" son los primeros 4 juegos de la lista
  const popularGames = games.slice(0, 4);

  return (
    <div className="container mt-4">
      {/* Barra de búsqueda */}
      <div className="input-group mb-4">
        <span className="input-group-text">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar juegos..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <span className="input-group-text" onClick={clearSearch}>
          <i className="bi bi-x-circle"></i>
        </span>
      </div>

      {/* Sección de Juegos Populares */}
      <h2 className="mb-4">Juegos Populares</h2>
      <div id="popularGamesCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          {popularGames.map((game, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
              <div className="d-flex justify-content-center">
                <div className="card-wrapper">
                  <GameCard game={game} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#popularGamesCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#popularGamesCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Sección de Todos los Juegos */}
      <h2 className="mb-4">Todos los Juegos</h2>
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
