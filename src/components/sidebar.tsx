import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import '../styles/slider.css';  // Importar el CSS

const Sidebar = () => {
  const savedSidebarState = localStorage.getItem('sidebarState');
  const [isSidebarOpen, setIsSidebarOpen] = useState(savedSidebarState === 'open');

  const { carrito } = useCart();

  useEffect(() => {
    localStorage.setItem('sidebarState', isSidebarOpen ? 'open' : 'closed');
  }, [isSidebarOpen]);

  return (
    <div className="d-flex">
      <div
        className={`sidebar ${isSidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}
      >
        {/* Marca */}
        <div className="mb-4 d-flex align-items-center ps-2">
          <img
            src="/images/b5e0bd77-6c65-4dad-8ad1-ed02b07ff296.png"
            alt="Logo de ManaShop"
            className={`logo-img ${isSidebarOpen ? '' : 'collapsed'}`}
          />
          {isSidebarOpen && <span className="fs-5 fw-semibold">ManaShop</span>}
        </div>

        {/* Menú */}
        <ul className="nav flex-column mb-auto">
          <li className="nav-item mb-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <i className="bi bi-house-door fs-5 me-2"></i>
              {isSidebarOpen && <span>Inicio</span>}
            </NavLink>
          </li>

          <li className="nav-item mb-2 position-relative">
            <NavLink
              to="/carrito"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <i className="bi bi-cart-fill fs-5 me-2"></i>
              {carrito.length > 0 && (
                <span className="badge-cart">{carrito.length}</span>
              )}
              {isSidebarOpen && <span>Carrito</span>}
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <i className="bi bi-heart-fill fs-5 me-2 text-danger"></i>
              {isSidebarOpen && <span>Favoritos</span>}
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="/perfil"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <i className="bi bi-person fs-5 me-2"></i>
              {isSidebarOpen && <span>Perfil</span>}
            </NavLink>
          </li>
        </ul>

        {/* Botón de colapsar */}
        <button
          className="collapse-button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <i className={`bi ${isSidebarOpen ? 'bi-arrow-left' : 'bi-arrow-right'}`}></i>
        </button>
      </div>

      <div
        className="content-wrapper"
        style={{
          marginLeft: isSidebarOpen ? '240px' : '80px',
        }}
      >
        {/* Aquí va el contenido principal */}
      </div>
    </div>
  );
};

export default Sidebar;
