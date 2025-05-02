# Dashboard Interativo de Métricas

## Descrição
Este é um projeto de dashboard interativo desenvolvido para exibir métricas de funcionários. Ele consiste em um frontend em React.js e um backend em Spring Boot com PostgreSQL.

## Tecnologias Utilizadas

### Backend:
- Java (Spring Boot)
- PostgreSQL
- JPA/Hibernate
- Spring Web

### Frontend:
- React.js
- Styled Components
- Axios
- Recharts (para gráficos)

## Estrutura do Projeto

### Backend (`src/main/java/com/dashboard`)

- `EmployeeMetric.java`: Classe modelo representando uma métrica de funcionário.
- `EmployeeMetricRepository.java`: Interface do repositório para acessar o banco de dados.
- `EmployeeMetricController.java`: Controlador REST para gerenciar requisições HTTP.
- `EmployeeMetricApiApplication.java`: Classe principal para rodar a aplicação.

### Frontend (`src/`)

- `components/`
  - `Navbar.js`: Barra de navegação.
  - `MetricsChart.js`: Componente de gráficos.
  - `Filters.js`: Filtros de métricas.
  - `MetricsTable.js`: Tabela de métricas dos funcionários.
- `pages/`
  - `Dashboard.js`: Página principal do dashboard.
- `api.js`: Configuração do Axios para chamadas ao backend.
- `App.js`: Arquivo principal que gerencia a renderização dos componentes.
- `index.js`: Ponto de entrada do React.

## Funcionalidades Implementadas

✅ Exibição de métricas de funcionários em gráficos e tabela.
✅ Comunicação entre frontend e backend via API REST.
✅ Filtros básicos por nome.
✅ Integração com banco de dados PostgreSQL.
✅ Estilização inicial da interface com Styled Components.

## Como Rodar o Projeto

### Backend
1. Certifique-se de ter o Java e o PostgreSQL instalados.
2. Crie um banco de dados chamado `dashboard_db`.
3. Configure o `application.properties` em `src/main/resources` com as credenciais do banco.
4. No terminal, dentro do diretório do backend, execute:
   ```sh
   mvn spring-boot:run
   ```

### Frontend
1. Instale as dependências com:
   ```sh
   npm install
   ```
2. Inicie o frontend com:
   ```sh
   npm start
   ```
3. Acesse `http://localhost:3000` no navegador.

## Próximos Passos
- Melhorar os filtros para permitir buscas por departamento e outros critérios.
- Implementar exportação de dados (CSV e PDF).
- Atualização automática dos dados em tempo real.
- Implementação de autenticação com login.

---

Esse README serve como referência até onde chegamos no projeto. Agora podemos avançar para os próximos passos com segurança! 🚀

