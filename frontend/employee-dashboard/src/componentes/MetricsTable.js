import { useEffect, useState } from "react";
import { getMetrics } from "../api";

function MetricsTable() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    getMetrics().then(data => {
      // Filtra apenas as métricas dos funcionários, ou seja, aquelas que possuem um department
      const filteredMetrics = data.filter(metric => metric.department && metric.department !== null);
      setMetrics(filteredMetrics);
    });
  }, []);

  // Função para verificar se o valor não é null ou undefined e aplicar trim
  const safeTrim = (str) => (str ? str.trim() : "N/A");

  return (
    <div>
      <h2>Métricas dos Funcionários</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Departamento</th>
            <th>eNPS</th>
            <th>Satisfação</th>
            <th>Retenção (%)</th>
            <th>Turnover</th>
            <th>Onboarding</th>
            <th>Absenteísmo</th>
            <th>Engajamento</th>
            
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, index) => (
            <tr key={metric.id || index}>
              <td>{safeTrim(metric.name)}</td>
              <td>{safeTrim(metric.department)}</td>
              <td>{metric.enps ?? "N/A"}</td>
              <td>{metric.satisfactionScore ?? "N/A"}</td>
              <td>{metric.retentionRate ?? "N/A"}</td>
              <td>{metric.turnoverRate ?? "N/A"}</td>
              <td>{metric.onboardingTime ?? "N/A"}</td>
              <td>{metric.absenteeismRate ?? "N/A"}</td>
              <td>{metric.engagementScore ?? "N/A"}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MetricsTable;
