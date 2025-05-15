# Dashboard Interativo de Métricas

## 📌 Descrição

Este projeto é um dashboard interativo para visualização e gestão de métricas de colaboradores. A aplicação possui um frontend desenvolvido em **React.js** e um backend em **Spring Boot** com **PostgreSQL**, com suporte a autenticação via **JWT** e controle de acesso baseado em papéis de utilizador (`admin`, `tecnico`, `user`).

---

## ⚙️ Tecnologias Utilizadas

### Backend:
- Java 17 (Spring Boot)
- Spring Web / Spring Data JPA
- Spring Security + JWT
- PostgreSQL
- Maven

### Frontend:
- React.js
- Axios
- Recharts (gráficos)
- React Router
- Styled Components / CSS Modules

---

## 🗂️ Estrutura do Projeto

### Backend (`src/main/java/com/dashboard/`):

- `model/`:
  - `User.java`, `Role.java`, `EmployeeMetric.java`
- `repository/`:
  - `UserRepository.java`, `EmployeeMetricRepository.java`
- `controller/`:
  - `AuthController.java`, `UserController.java`, `EmployeeMetricController.java`
- `security/`:
  - `JwtUtil.java`, `JwtAuthenticationFilter.java`, `SecurityConfig.java`, `CustomUserDetailsService.java`
- `service/`:
  - `UserService.java`, `EmployeeMetricService.java`
- `DashboardApiApplication.java`: Classe principal da aplicação Spring Boot.

### Frontend (`src/`):

- `components/`
  - `Navbar.js`, `MetricsChart.js`, `Filters.js`, `MetricsTable.js`, `ExportButtons.js`
- `pages/`
  - `Dashboard.js`: Página principal com gráficos e filtros
  - `AddMetricPage.js`: Inserção de novas métricas
  - `LoginPage.js`: Login com JWT
  - `RegisterPage.js`: Registo de novos utilizadores
  - `UserAdminPage.js`: Painel de administração de utilizadores
- `api.js`: Integração com o backend (Axios)
- `App.js`: Roteamento das páginas
- `index.js`: Ponto de entrada React

---

## 🔐 Funcionalidades Implementadas

✅ Login com autenticação JWT  
✅ Registo de utilizadores com papéis (`admin`, `tecnico`, `user`)  
✅ Adição de métricas (restrito a `tecnico` e `admin`)  
✅ Visualização de métricas por gráficos e tabelas  
✅ Filtros por departamento e nome  
✅ Exportação de métricas (CSV/PDF)  
✅ Painel de administração de utilizadores  
✅ Integração com PostgreSQL  
✅ Estilização com base na identidade visual da New Work SE  

---

## ▶️ Como Rodar o Projeto

### 🖥 Backend

1. Certifica-te de ter **Java 17+**, **PostgreSQL** e **Maven** instalados.
2. Cria uma base de dados no PostgreSQL chamada `dashboard_db`.
3. Configura as credenciais no ficheiro `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/dashboard_db
   spring.datasource.username=seu_usuario
   spring.datasource.password=sua_senha
   jwt.secret=sua_chave_secreta

No terminal, executa:
mvn spring-boot:run

🌐 Frontend

Entra na pasta frontend/ e instala as dependências:
npm install

Inicia a aplicação React:
npm start

Acede a: http://localhost:3000

🔒 Padrões de Acesso
Papel	Permissões
admin	Acesso total (visualizar, adicionar, gerir utilizadores)
tecnico	Pode visualizar e adicionar métricas
user	Apenas visualização de métricas

📌 Próximos Passos
⏳ Atualização automática dos dados (WebSockets ou polling)
⏳ Melhorias no design responsivo
⏳ Upload de imagens de perfil dos utilizadores (opcional)


👨‍💻 Desenvolvido por
PrivsMika05