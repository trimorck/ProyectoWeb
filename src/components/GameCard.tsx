import type { Game } from '../types/index';
import { useCart } from '../context/cartContext';

type Props = {
  game: Game;
};

const GameCard = ({ game }: Props) => {
  const { addToCart } = useCart(); // Usa el hook del contexto

  const handleAddToCart = () => {
    addToCart(game); // Añade el juego al carrito
  };

  return (
    <div className="card m-2" style={{ width: '18rem' }}>
      <img src={game.image} className="card-img-top" alt={game.titulo} />
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
