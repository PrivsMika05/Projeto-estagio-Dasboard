// src/componentes/MetricsChart.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MetricsChart = ({ metrics }) => {
  // Primeiro: verifica se metrics é um array válido
  if (!Array.isArray(metrics)) {
    return <p>Erro ao carregar métricas.</p>;
  }

  // Depois: verifica se o array está vazio
  if (metrics.length === 0) {
    return <p>Não há dados para exibir no gráfico.</p>;
  }

  // Filtra apenas métricas com departamento válido
  const filteredMetrics = metrics.filter(
    (metric) => metric.department && metric.department !== null
  );

  // Verifica se há dados filtrados
  if (filteredMetrics.length === 0) {
    return <p>Não há dados válidos para exibir no gráfico.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={filteredMetrics}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="enps" fill="#8884d8" name="eNPS" />
        <Bar dataKey="satisfactionScore" fill="#82ca9d" name="Satisfação" />
        <Bar dataKey="engagementScore" fill="#ffc658" name="Engajamento" />
        <Bar dataKey="retentionRate" fill="#ff7300" name="Retenção" />
        <Bar dataKey="turnoverRate" fill="#d0ed57" name="Rotatividade" />
        <Bar dataKey="onboardingTime" fill="#a4de6c" name="Integração" />
        <Bar dataKey="absenteeismRate" fill="#f56991" name="Absenteísmo" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MetricsChart;
