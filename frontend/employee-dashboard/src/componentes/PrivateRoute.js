// src/componentes/PrivateRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../api";

function PrivateRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null); // null = estado de “a verificar…”
  
  useEffect(() => {
    const verify = async () => {
      const result = await checkAuth();
      if (result.authenticated) {
        // se autenticado, guarda o role para uso noutras partes (Navbar, AdminPage…)
        localStorage.setItem("role", result.role);
        setIsAuth(true);
      } else {
        localStorage.removeItem("role");
        setIsAuth(false);
      }
    };
    verify();
  }, []);

  // Enquanto estamos a “verificar” não renderiza nada (poderias pôr um spinner)
  if (isAuth === null) {
    return <div>Verificando autenticação…</div>;
  }

  // Se não autenticado, vai para /login, senão renderiza os filhos
  return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
