import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const { usuario, setUsuario } = useUser(); // Accedemos a setUsuario
  const navigate = useNavigate(); // Para redirigir

  useEffect(()=>{
    if(!usuario){
      navigate('/login');
    }
  },[usuario, navigate]);

  if(!usuario) return null;

  const cerrarSesion = () => {
    setUsuario(null);        // Limpiar usuario del contexto
    navigate('/login');      // Redirigir al login
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4">
        <div className="text-center mb-4">
          <img
            src={usuario.foto || 'https://i.pravatar.cc/100'}
            alt="Foto de perfil"
            className="rounded-circle"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
          <h4 className="mt-3">{usuario.nombre}</h4>
          <p className="text-muted mb-1">{usuario.email}</p>
        </div>

        <hr />

        <div className="row mt-4">
          <div className="col-md-6">
            <h6 className="text-muted">Nombre completo</h6>
            <p>{usuario.nombre}</p>
          </div>
          <div className="col-md-6">
            <h6 className="text-muted">Correo electrónico</h6>
            <p>{usuario.email}</p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button className="btn btn-outline-primary me-2" disabled>
            Editar perfil (Próximamente)
          </button>
          <button className="btn btn-outline-danger" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
