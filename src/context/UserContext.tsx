// context/userContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';

type User = {
  nombre: string;
  email: string;
  foto?: string;
  password: string;
};

type UserContextType = {
  usuario: User | null;
  setUsuario: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // 🔁 Iniciar sin ningún usuario logueado
  const [usuario, setUsuario] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
