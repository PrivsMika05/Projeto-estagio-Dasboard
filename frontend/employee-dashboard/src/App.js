import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MetricsChart from "./componentes/MetricsChart";
import MetricsTable from "./componentes/MetricsTable";
import { getMetrics } from "./api";
import Navbar from './componentes/Navbar';
import ExportButtons from './componentes/ExportButtons';
import AddMetricPage from './pages/AddMetricPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminUserManagementPage from './pages/AdminUserManagementPage'; // ✅ Importação adicionada
import PrivateRoute from './componentes/PrivateRoute';
import './styles/global.css';

function DashboardPage({ metrics }) {
  return (
    <div style={{ textAlign: "center" }}>
      <ExportButtons metrics={metrics} />
      <h1>Dashboard de Métricas</h1>
      <MetricsChart metrics={metrics} />
      <MetricsTable metrics={metrics} />
    </div>
  );
}

function App() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    getMetrics().then((data) => setMetrics(data));
  }, []);

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Páginas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Páginas protegidas */}
        <Route path="/" element={
          <PrivateRoute>
            <DashboardPage metrics={metrics} />
          </PrivateRoute>
        } />
        <Route path="/add-metric" element={
          <PrivateRoute>
            <AddMetricPage />
          </PrivateRoute>
        } />
        <Route path="/admin/users" element={  // ✅ Nova rota para admin
          <PrivateRoute>
            <AdminUserManagementPage />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
