import { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import MetricsChart from "./componentes/MetricsChart";
import MetricsTable from "./componentes/MetricsTable";
import { getMetrics } from "./api";
import Navbar from './componentes/Navbar';
import ExportButtons from './componentes/ExportButtons';
import AddMetricPage from './pages/AddMetricPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminUserManagementPage from './pages/AdminUserManagementPage';
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

function AppContent() {
  const [metrics, setMetrics] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    getMetrics().then((data) => setMetrics(data));
  }, []);

  return (
    <>
      <Navbar auth={auth} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<PrivateRoute><DashboardPage metrics={metrics} /></PrivateRoute>} />
        <Route path="/add-metric" element={<PrivateRoute><AddMetricPage /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute><AdminUserManagementPage /></PrivateRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
