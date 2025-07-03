import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';

const Navbar = () => {
  const { carrito } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fs-3" to="/">🎮 GameStore</Link>

        <ul className="navbar-nav d-flex flex-row gap-4 align-items-center">
          <li className="nav-item">
            <Link className="nav-link fs-5" to="/">Inicio</Link>
          </li>
          <li className="nav-item position-relative">
            <Link className="nav-link p-0" to="/carrito">
              <i className="bi bi-cart-fill text-white" style={{ fontSize: '1.8rem' }}></i>
              {carrito.length > 0 && (
                <span
                  className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.75rem', padding: '0.3em 0.5em', borderRadius: '50%' }}
                >
                  {carrito.length}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
