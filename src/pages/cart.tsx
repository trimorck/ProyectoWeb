import { useCart } from '../context/cartContext';

const Cart = () => {
  const { carrito, removeFromCart } = useCart();

  const handleRemoveFromCart = (game: any) => {
    removeFromCart(game); // Elimina el juego del carrito
  };

  const total = carrito.reduce((sum, game) => sum + game.precio, 0);

  return (
    <div className="container">
      <h2 className="mb-4">Carrito de compras</h2>
      {carrito.length === 0 ? (
        <p>No hay juegos en el carrito.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Juego</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((game, i) => (
              <tr key={i}>
                <td>{game.titulo}</td>
                <td>${game.precio.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveFromCart(game)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>${total.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cart;
