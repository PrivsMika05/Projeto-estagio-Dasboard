import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    authenticated: false,
    username: null,
    role: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/check", {
          method: "GET",
          credentials: "include", // ESSENCIAL para enviar cookies!
        });

        if (response.ok) {
          const data = await response.json(); // { authenticated: true, username, role }
          setAuth({
            authenticated: true,
            username: data.username,
            role: data.role,
          });
        } else {
          setAuth({ authenticated: false, username: null, role: null });
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setAuth({ authenticated: false, username: null, role: null });
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
