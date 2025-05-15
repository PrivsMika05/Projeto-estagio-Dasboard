import { useEffect, useState } from "react";
import { getAllUsers, deleteUser, updateUserRole, getMetrics, deleteMetric } from "../api";
import { useNavigate } from "react-router-dom";

function AdminUserManagementPage() {
  const [users, setUsers] = useState([]);
  const [metrics, setMetrics] = useState([]); // <--- novo estado para métricas
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingRoles, setEditingRoles] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") {
      navigate("/");
      return;
    }

    fetchUsers();
    fetchMetrics(); // <--- buscar métricas ao carregar
  }, [navigate]);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
    setFilteredUsers(data);
  };

  const fetchMetrics = async () => {
    try {
      const data = await getMetrics();
      setMetrics(data);
    } catch (error) {
      console.error("Erro ao buscar métricas:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tens a certeza que queres apagar este utilizador?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  const handleDeleteMetric = async (id) => {
    if (window.confirm("Tens a certeza que queres apagar esta métrica?")) {
      await deleteMetric(id);
      fetchMetrics(); // refrescar após apagar
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // voltar à primeira página após pesquisa
  };

  const handleRoleChange = (userId, newRole) => {
    setEditingRoles(prev => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  const handleSaveRole = async (userId) => {
    const newRole = editingRoles[userId];
    if (!newRole) return;

    try {
      await updateUserRole(userId, newRole);
      fetchUsers(); // refresca a lista
    } catch (error) {
      alert("Erro ao atualizar função.");
    }
  };

  // Paginação
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Gestão de Utilizadores</h2>

      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Pesquisar por nome ou email"
        style={{ padding: "0.5rem", marginBottom: "1rem", width: "300px" }}
      />

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
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={editingRoles[user.id] || user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="USER">USER</option>
                  <option value="TECNICO">TECNICO</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                <button onClick={() => handleSaveRole(user.id)}>Guardar</button>
              </td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de Paginação */}
      <div style={{ marginTop: "1rem" }}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span style={{ margin: "0 1rem" }}>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>

      {/* NOVA SECÇÃO DE MÉTRICAS */}
      <div style={{ marginTop: "3rem" }}>
        <h2>Métricas Atuais</h2>
        <table style={{ margin: "0 auto", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Departamento</th>
              <th>eNPS</th>
              <th>Satisfação</th>
              <th>Retenção</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric.id}>
                <td>{metric.name}</td>
                <td>{metric.department}</td>
                <td>{metric.enps}</td>
                <td>{metric.satisfactionScore}</td>
                <td>{metric.retentionRate}</td>
                <td>
                  <button onClick={() => handleDeleteMetric(metric.id)}>Apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUserManagementPage;
