import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMetric } from '../api';

function AddMetricPage() {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [enps, setEnps] = useState('');
  const [satisfactionScore, setSatisfactionScore] = useState('');
  const [retentionRate, setRetentionRate] = useState('');
  const [turnoverRate, setTurnoverRate] = useState('');
  const [onboardingTime, setOnboardingTime] = useState('');
  const [absenteeismRate, setAbsenteeismRate] = useState('');
  const [engagementScore, setEngagementScore] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMetric = {
      name,
      department,
      enps: Number(enps),
      satisfactionScore: Number(satisfactionScore),
      retentionRate: Number(retentionRate),
      turnoverRate: Number(turnoverRate),
      onboardingTime: Number(onboardingTime),
      absenteeismRate: Number(absenteeismRate),
      engagementScore: Number(engagementScore),
    };

    try {
      await addMetric(newMetric);
      setSuccessMessage("✅ Métrica adicionada com sucesso!");
      setErrorMessage('');

      // Limpa os campos
      setName('');
      setDepartment('');
      setEnps('');
      setSatisfactionScore('');
      setRetentionRate('');
      setTurnoverRate('');
      setOnboardingTime('');
      setAbsenteeismRate('');
      setEngagementScore('');

      setTimeout(() => {
        navigate('/', { state: { reload: true } }); // envia sinal para dashboard recarregar
      }, 1500);
    } catch (error) {
      setErrorMessage("❌ Erro ao adicionar métrica. Tente novamente.");
      setSuccessMessage('');
    }
  };

  return (
    <div className="add-metric-container">
      <h1>Adicionar Nova Métrica</h1>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form className="metric-form" onSubmit={handleSubmit}>
        <label>Nome:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label>Departamento:
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        </label>

        <label>eNPS:
          <input type="number" value={enps} onChange={(e) => setEnps(e.target.value)} required />
        </label>

        <label>Satisfação:
          <input type="number" value={satisfactionScore} onChange={(e) => setSatisfactionScore(e.target.value)} required />
        </label>

        <label>Taxa de Retenção:
          <input type="number" value={retentionRate} onChange={(e) => setRetentionRate(e.target.value)} required />
        </label>

        <label>Taxa de Rotatividade:
          <input type="number" value={turnoverRate} onChange={(e) => setTurnoverRate(e.target.value)} required />
        </label>

        <label>Tempo de Integração:
          <input type="number" value={onboardingTime} onChange={(e) => setOnboardingTime(e.target.value)} required />
        </label>

        <label>Taxa de Absenteísmo:
          <input type="number" value={absenteeismRate} onChange={(e) => setAbsenteeismRate(e.target.value)} required />
        </label>

        <label>Engajamento:
          <input type="number" value={engagementScore} onChange={(e) => setEngagementScore(e.target.value)} required />
        </label>

        <button type="submit">Adicionar Métrica</button>
      </form>
    </div>
  );
}

export default AddMetricPage;
