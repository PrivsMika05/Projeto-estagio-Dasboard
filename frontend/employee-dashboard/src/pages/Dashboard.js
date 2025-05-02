import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getMetrics } from "../api";

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    getMetrics()
      .then((data) => {
        console.log("Dados recebidos:", data);
        setMetrics(data);
      })
      .catch((error) => console.error("Erro ao carregar métricas:", error));
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard de Métricas</h1>

      {metrics.length === 0 ? (
        <p>Não há dados para exibir no gráfico.</p>
      ) : (
        <ResponsiveContainer width="80%" height={300}>
          <BarChart data={metrics}>
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="eNPS" fill="#E30613" name="eNPS" />
            <Bar dataKey="satisfacao" fill="#999999" name="Satisfação" />
            <Bar dataKey="engajamento" fill="#000000" name="Engajamento" />
          </BarChart>
        </ResponsiveContainer>
      )}

      <h2>Métricas dos Funcionários</h2>
      <table className="metrics-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Departamento</th>
            <th>eNPS</th>
            <th>Satisfação</th>
            <th>Retenção (%)</th>
          </tr>
        </thead>
        <tbody>
          {metrics.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Nenhum dado disponível
              </td>
            </tr>
          ) : (
            metrics.map((metric, index) => (
              <tr key={index}>
                <td>{metric.nome}</td>
                <td>{metric.departamento}</td>
                <td>{metric.eNPS}</td>
                <td>{metric.satisfacao}</td>
                <td>{metric.retencao}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="export-button-container">
        <button className="export-button">Exportar Dados</button>
      </div>
    </div>
  );
};

export default Dashboard;
