// Perfil.tsx
import { useUser } from '../context/UserContext'; // Importa el hook useUser

const Perfil = () => {
  const { usuario } = useUser(); // Obtiene los datos del usuario desde el contexto

  if (!usuario) {
    return (
      <div className="container py-5">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4">
        <div className="text-center mb-4">
          {/* Muestra la foto de perfil */}
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

        {/* Futuras funciones */}
        <div className="mt-4 text-center">
          <button className="btn btn-outline-primary me-2" disabled>
            Editar perfil (Próximamente)
          </button>
          <button className="btn btn-outline-danger" disabled>
            Cerrar sesión (Próximamente)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
