import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../api";

function Navbar() {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      setAuth({ authenticated: false, role: null });
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <nav className="navbar">
      <ul>
        {auth.authenticated && <li><Link to="/">Dashboard</Link></li>}

        {(auth.role === 'ADMIN' || auth.role === 'TECNICO') && (
          <li><Link to="/add-metric">Adicionar Métrica</Link></li>
        )}

        {auth.role === 'ADMIN' && (
          <li><Link to="/admin/users">Administração</Link></li>
        )}

        {auth.authenticated ? (
          <li><button onClick={handleLogout}>Logout</button></li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registar</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
