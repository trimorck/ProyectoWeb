import { useCart } from '../context/cartContext';
import '../styles/cart.css'

const Cart = () => {
  const { carrito, addToCart, removeFromCart } = useCart();

  const total = carrito.reduce((sum, game) => sum + game.precio * game.quantity, 0);

  return (
    <div className="container">
      <h2 className="mb-4">Carrito de compras</h2>
      {carrito.length === 0 ? (
        <p>No hay juegos en el carrito.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Juego</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((game, i) => (
                <tr key={i}>
                  <td><img src={game.image} alt={game.titulo} className="cart-game-image" /></td>
                  <td>{game.titulo}</td>
                  <td>${game.precio.toFixed(3)}</td>
                  <td>{game.quantity}</td>
                  <td>${(game.precio * game.quantity).toFixed(3)}</td>
                  <td>
                    <button className="btn btn-sm btn-success me-2" onClick={() => addToCart(game)}>
                      +
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(game)}>
                      –
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-end mt-3">
            <h4>Total: ${total.toFixed(3)}</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
