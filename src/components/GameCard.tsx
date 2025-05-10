import type { Game } from '../types/index';
import { useCart } from '../context/cartContext';
import { Link } from 'react-router-dom';

type Props = {
  game: Game;
};

const GameCard = ({ game }: Props) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(game);
  };

  return (
    <div className="card m-2" style={{ width: '18rem' }}>
      <Link to={`/juego/${encodeURIComponent(game.titulo)}`}>
        <img src={game.image} className="card-img-top" alt={game.titulo} />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{game.titulo}</h5>
        <p className="card-text">${game.precio.toFixed(2)}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default GameCard;
