import { createContext, ReactNode, useState } from "react";
import { UsuarioLogin } from "../models/models";
import { login } from "../services/services";

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    tipo: "",
    token: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  async function handleLogin(user: UsuarioLogin) {
    setIsLoading(true);
    try {
      await login(`/usuarios/logar`, user, setUsuario);
      setisAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  function handleLogout() {
    setisAuthenticated(false);
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      tipo: "",
      token: "",
    });
  }

  return (
    <AuthContext.Provider
      value={{ usuario, handleLogin, handleLogout, isLoading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}
