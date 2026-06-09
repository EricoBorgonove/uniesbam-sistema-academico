# Sistema UNIESBAM

Aplicacao full stack para controle academico de usuarios, alunos, professores, turmas, matriculas e notas.

## Tecnologias

- Frontend: React + Vite
- Backend: Node.js + Express
- Banco de dados: PostgreSQL
- Infra: Docker + Docker Compose
- Autenticacao: JWT

## Arquitetura

### Backend em Camadas

```txt
server/src/
  routes/          # declara endpoints e middlewares
  controllers/     # recebe req/res, valida entrada e chama services
  services/        # regras de negocio e orquestracao
  repositories/    # SQL e acesso aos dados
  database/        # conexao com PostgreSQL e seed inicial
  validations/     # schemas Zod
  middleware/      # autenticacao, autorizacao e tratamento de erros
  config/          # variaveis de ambiente
```

Fluxo de uma requisicao:

```txt
React
  -> frontendApi.js
  -> Express route
  -> Controller
  -> Service
  -> Repository
  -> connection.js
  -> PostgreSQL
```

Exemplo com alunos:

```txt
GET /api/students
  -> routes/students.js
  -> controllers/studentsController.js
  -> services/studentsService.js
  -> repositories/studentsRepository.js
  -> database/connection.js
```

### Frontend Organizado por Responsabilidade

```txt
client/src/
  api/             # conexao HTTP com backend
  components/      # componentes reutilizaveis
    forms/
    layout/
    ui/
  config/          # menu e configuracao de entidades
  features/        # componentes especificos de funcionalidades
  pages/           # paginas/telas
```

## Onde Cada Conexao Acontece

### 1. Frontend -> Backend

Arquivo principal:

```txt
client/src/api/frontendApi.js
```

Esse arquivo tem a URL da API:

```js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333/api';
```

Quando uma tela React precisa buscar alunos, professores, turmas ou notas, ela chama:

```js
api('/students')
api('/teachers')
api('/classes')
api('/grades')
```

### 2. Backend -> Banco

Arquivo principal:

```txt
server/src/database/connection.js
```

Esse arquivo cria o pool de conexoes com o PostgreSQL:

```js
export const pool = new Pool({
  connectionString: env.databaseUrl
});
```

As rotas do backend usam:

```js
query('SELECT * FROM students')
```

### 3. Variaveis de Ambiente do Backend

Arquivo principal:

```txt
server/src/config/env.js
```

Ali ficam centralizados:

```txt
PORT
DATABASE_URL
JWT_SECRET
ADMIN_EMAIL
ADMIN_PASSWORD
```

## Estrutura Geral do Projeto

```txt
sistema-uniesbam/
  client/
    src/
      api/
        frontendApi.js       # conexao do React com o backend
      components/            # layout, tabela, painel, campos
      config/                # menu e configs de CRUD
      features/              # componentes por funcionalidade
      pages/                 # telas do sistema
      App.jsx                # menu e navegacao principal
      styles.css             # visual verde escuro da UNIESBAM

  server/
    src/
      config/
        env.js               # variaveis de ambiente
      database/
        connection.js        # conexao do backend com PostgreSQL
        seedAdmin.js         # cria usuario admin inicial
      controllers/           # camada HTTP
      services/              # camada de negocio
      repositories/          # camada de acesso ao banco
      validations/           # validacoes Zod
      middleware/            # autenticacao e erros
      routes/                # endpoints da API Express
      app.js                 # registra todas as rotas
      index.js               # inicia o servidor

  db/
    init.sql                 # tabelas do PostgreSQL

  docker-compose.yml         # sobe frontend, backend e banco
```

## Login Inicial

- Email: `admin@uniesbam.edu.br`
- Senha: `admin123`

## Seed de Dados

Ao iniciar o backend, o arquivo abaixo popula dados demonstrativos de forma idempotente:

```txt
server/src/database/seedDemoData.js
```

Ele cadastra usuarios, professores, alunos, turmas, matriculas e notas. Pode rodar varias vezes sem duplicar os dados principais.

Contas de teste:

```txt
Administrador
Email: admin@uniesbam.edu.br
Senha: admin123

Secretaria
Email: secretaria@uniesbam.edu.br
Senha: 123456

Professor
Email: maria.oliveira@uniesbam.edu.br
Senha: 123456
```

Dados demonstrativos criados:

```txt
42 usuarios, incluindo admin, secretaria e professores
40 professores demonstrativos
500 alunos com nomes unicos
30 turmas
680 matriculas
1360 notas
```

## Rodar com Docker

Abra o Docker Desktop e rode:

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- API: http://localhost:3333/api
- Postgres: localhost:5432

## Rodar em Desenvolvimento Local

```bash
npm install
npm run dev
```

Para usar o backend fora do Docker, crie `server/.env` com:

```env
PORT=3333
DATABASE_URL=postgres://uniesbam:uniesbam123@localhost:5432/uniesbam
JWT_SECRET=troque-este-segredo-em-producao
ADMIN_EMAIL=admin@uniesbam.edu.br
ADMIN_PASSWORD=admin123
```

## Principais Endpoints

```txt
POST   /api/auth/login
GET    /api/dashboard
GET    /api/students
POST   /api/students
PUT    /api/students/:id
DELETE /api/students/:id
GET    /api/teachers
GET    /api/classes
GET    /api/enrollments
GET    /api/grades
GET    /api/users
```
