import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { usuario as usuariosBD } from '../data/usuarios'; // Simulada "base de datos"
import '../styles/login.css';

const Login = () => {
  const { setUsuario } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Buscar usuario en la "base de datos"
    const userFound = usuariosBD.find(
      (u) => u.email === email && u.password === password
    );

    if (userFound) {
      setUsuario(userFound);      // Guardar en el contexto
      navigate('/');              // Redirigir a la página principal
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box shadow">
        <h2 className="text-center mb-4">Bienvenido a <span className="brand">ManaShop</span></h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <div className="input-group">
              <span className="input-group-text bg-dark text-white"><i className="bi bi-envelope-fill"></i></span>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text bg-dark text-white"><i className="bi bi-lock-fill"></i></span>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
        </form>

        <div className="text-center mt-3">
          <small>¿No tienes cuenta? <a href="/registro">Regístrate</a></small>
        </div>
      </div>
    </div>
  );
};

export default Login;
