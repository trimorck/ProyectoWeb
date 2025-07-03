import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/registro.css';
import '../styles/modal.css'; // aquí pones el CSS del modal
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Usuario {
    id: number;
    email: string;
    tipo_usuario: string;
}

interface TipoUsuario {
    tipo_usuario: string;
}

const Modal = ({
    show,
    onClose,
    children,
}: {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) => {
    if (!show) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};

const CrearUsuario = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [tiposUsuario, setTiposUsuario] = useState<TipoUsuario[]>([]);

    const [editandoUsuario, setEditandoUsuario] = useState<Usuario | null>(null);
    const [emailEdit, setEmailEdit] = useState('');
    const [tipoUsuarioEdit, setTipoUsuarioEdit] = useState('');
    const [passwordEdit, setPasswordEdit] = useState(''); // nueva contraseña

    const fetchUsuarios = async () => {
        try {
            const res = await axios.get<Usuario[]>('http://localhost:3001/usuarios');
            setUsuarios(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTiposUsuario = async () => {
        try {
            const res = await axios.get<TipoUsuario[]>('http://localhost:3001/usuarios/tipos');
            setTiposUsuario(res.data);
            if (res.data.length > 0) setTipoUsuario(res.data[0].tipo_usuario);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/usuarios', {
                email,
                password,
                tipo_usuario: tipoUsuario,
            });
            setEmail('');
            setPassword('');
            if (tiposUsuario.length > 0) setTipoUsuario(tiposUsuario[0].tipo_usuario);
            fetchUsuarios();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditarClick = (usuario: Usuario) => {
        setEditandoUsuario(usuario);
        setEmailEdit(usuario.email);
        setTipoUsuarioEdit(usuario.tipo_usuario);
        setPasswordEdit(''); // limpiar contraseña
    };

    const handleSubmitEdicion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editandoUsuario) return;

        try {
            const body: any = {
                email: emailEdit,
                tipo_usuario: tipoUsuarioEdit,
            };
            if (passwordEdit.trim() !== '') {
                body.password = passwordEdit; // sólo si se escribió una contraseña
            }

            await axios.patch(`http://localhost:3001/usuarios/${editandoUsuario.id}`, body);
            setEditandoUsuario(null);
            fetchUsuarios();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEliminarUsuario = async (id: number) => {
        const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
        if (!confirmar) return;

        try {
            await axios.delete(`http://localhost:3001/usuarios/${id}`);
            fetchUsuarios(); // recargar la lista
        } catch (error) {
            console.error('Error eliminando usuario:', error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
        fetchTiposUsuario();
    }, []);

    return (
        <div className="registro-container">
            <div className="registro-box shadow">
                <h2 className="text-center mb-4">Crear nuevo usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label>Tipo de usuario</label>
                        <select
                            className="form-control"
                            value={tipoUsuario}
                            onChange={e => setTipoUsuario(e.target.value)}
                            required
                        >
                            {tiposUsuario.map(tipo => (
                                <option key={tipo.tipo_usuario} value={tipo.tipo_usuario}>
                                    {tipo.tipo_usuario}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Crear usuario
                    </button>
                </form>
            </div>

            <div className="mt-5">
                <h4>Usuarios registrados</h4>
                <table className="table table-bordered mt-3">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Tipo de usuario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.tipo_usuario}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"  // me-2 = margin-end para separar un poco
                                        onClick={() => handleEditarClick(usuario)}
                                        title="Editar usuario"
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleEliminarUsuario(usuario.id)}
                                        title="Eliminar usuario"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={!!editandoUsuario} onClose={() => setEditandoUsuario(null)}>
                {editandoUsuario && (
                    <div>
                        <h3>Editar usuario ID: {editandoUsuario.id}</h3>
                        <form onSubmit={handleSubmitEdicion}>
                            <div className="form-group mb-3">
                                <label>Correo electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={emailEdit}
                                    onChange={e => setEmailEdit(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Contraseña nueva (dejar vacío para no cambiar)</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={passwordEdit}
                                    onChange={e => setPasswordEdit(e.target.value)}
                                    placeholder="Nueva contraseña"
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Tipo de usuario</label>
                                <select
                                    className="form-control"
                                    value={tipoUsuarioEdit}
                                    onChange={e => setTipoUsuarioEdit(e.target.value)}
                                    required
                                >
                                    {tiposUsuario.map(tipo => (
                                        <option key={tipo.tipo_usuario} value={tipo.tipo_usuario}>
                                            {tipo.tipo_usuario}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="btn btn-success">
                                Guardar cambios
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary ms-2"
                                onClick={() => setEditandoUsuario(null)}
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default CrearUsuario;
