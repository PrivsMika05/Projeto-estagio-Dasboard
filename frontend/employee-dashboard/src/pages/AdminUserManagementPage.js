import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../api";
import { useNavigate } from "react-router-dom";

function AdminUserManagementPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") {
      navigate("/"); // Redireciona se não for admin
      return;
    }
  
    fetchUsers();
  }, [navigate]); // <-- adiciona navigate aqui
  

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tens a certeza que queres apagar este utilizador?")) {
      await deleteUser(id);
      fetchUsers(); // Atualiza a lista
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Gestão de Utilizadores</h2>
      <table style={{ margin: "0 auto", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Utilizador</th>
            <th>Email</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>
                  Apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUserManagementPage;
