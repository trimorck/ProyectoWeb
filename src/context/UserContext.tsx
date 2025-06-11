// context/userContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';

type User = {
  nombre: string;
  email: string;
  foto?: string;
};

type UserContextType = {
  usuario: User | null;
  setUsuario: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<User | null>({
    nombre: 'Zumito',
    email: 'tomastapia956@gmail.com',
    foto: 'https://i.pravatar.cc/100' // Simulación de avatar
  });

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
