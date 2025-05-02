import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>

        {(role === 'ADMIN' || role === 'TECNICO') && (
          <li><Link to="/add-metric">Adicionar Métrica</Link></li>
        )}

        {role === 'ADMIN' && (
          <li><Link to="/admin/users">Administração</Link></li>
        )}

        {isLoggedIn ? (
          <>
            <li><button onClick={handleLogout}>Logout</button></li>
            {/* <li><span style={{ fontWeight: 'bold' }}>{role}</span></li> opcional */}
          </>
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
