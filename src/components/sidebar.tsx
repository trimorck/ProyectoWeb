import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';

const Sidebar = () => {
  // Leemos el estado del sidebar desde localStorage
  const savedSidebarState = localStorage.getItem('sidebarState');
  const [isSidebarOpen, setIsSidebarOpen] = useState(savedSidebarState === 'open'); // Si no hay valor, por defecto estará cerrado

  const { carrito } = useCart();

  // Guardamos el estado del sidebar en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('sidebarState', isSidebarOpen ? 'open' : 'closed');
  }, [isSidebarOpen]);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`d-flex flex-column bg-dark text-white shadow-sm p-3 ${isSidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'
          }`}
        style={{
          width: isSidebarOpen ? '240px' : '80px',
          minHeight: '100vh',
          position: 'fixed', // Hacer el menú lateral fijo
          top: 0,
          left: 0,
          transition: 'width 0.3s',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          zIndex: 1000, // Asegurarse de que esté por encima de otros elementos
          overflowY: 'auto', // Hace que el contenido sea desplazable si se excede
          overflowX: 'hidden', // Evita el desbordamiento horizontal
        }}
      >
        {/* Marca */}
        <div className="mb-4 d-flex align-items-center ps-2">
          <img
            src="/images/b5e0bd77-6c65-4dad-8ad1-ed02b07ff296.png" // ← aquí puedes poner tu ruta personalizada después
            alt="Logo de ManaShop"
            style={{
              width: isSidebarOpen ? '36px' : '280x',
              height: isSidebarOpen ? '36px' : '28px',
              objectFit: 'contain',
              transition: 'all 0.3s'
            }}
            className="me-2"
          />
          {isSidebarOpen && <span className="fs-5 fw-semibold">ManaShop</span>}
        </div>


        {/* Menú */}
        <ul className="nav flex-column mb-auto">
          <li className="nav-item mb-2">
            <Link
              to="/"
              className="nav-link text-white d-flex align-items-center px-2 py-2 rounded hover-bg"
            >
              <i className="bi bi-house-door fs-5 me-2"></i>
              {isSidebarOpen && <span>Inicio</span>}
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              to="/carrito"
              className="nav-link text-white d-flex align-items-center px-2 py-2 rounded position-relative hover-bg"
            >
              <div className="position-relative">
                <i className="bi bi-cart-fill fs-5 me-2"></i>
                {carrito.length > 0 && (
                  <span
                    className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: '0.75rem' }}
                  >
                    {carrito.length}
                  </span>
                )}
              </div>
              {isSidebarOpen && <span>Carrito</span>}
            </Link>
          </li>

          {/* Favoritos */}
          <li className="nav-item mb-2">
            <Link
              to="/favoritos"
              className="nav-link text-white d-flex align-items-center px-2 py-2 rounded hover-bg"
            >
              <i className="bi bi-heart-fill fs-5 me-2 text-danger"></i>
              {isSidebarOpen && <span>Favoritos</span>}
            </Link>
          </li>

          {/* Perfil */}
          <li className="nav-item mb-2">
            <Link
              to="/perfil"
              className="nav-link text-white d-flex align-items-center px-2 py-2 rounded hover-bg"
            >
              <i className="bi bi-person fs-5 me-2"></i>
              {isSidebarOpen && <span>Perfil</span>}
            </Link>
          </li>
        </ul>

        {/* Botón de colapsar */}
        <div className="mt-auto pt-3 border-top border-secondary">
          <button
            className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <i className={`bi ${isSidebarOpen ? 'bi-arrow-left' : 'bi-arrow-right'}`}></i>
          </button>
        </div>
      </div>

      {/* Contenido principal que se mueve según la apertura del sidebar */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: isSidebarOpen ? '240px' : '80px', // Ajusta el margin según si el sidebar está abierto o cerrado
          transition: 'margin-left 0.3s', // Transición suave para el contenido
        }}
      >
      </div>
    </div>
  );
};

export default Sidebar;
