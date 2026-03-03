# Desafio Essentia Group
O teste simula uma contratação por uma empresa fictícia chamada "TechX" para desenvolver uma aplicação web de gerenciamento de tarefas (to-do list). A empresa precisa de uma solução simples e eficiente para que seus funcionários possam organizar suas tarefas diárias.

## Pré-requisitos

Para rodar este projeto, você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (Versão 20+ recomendada)
- [Docker](https://docs.docker.com/get-docker/) e Docker Compose

## Como iniciar o projeto

### 1. Subindo a Infraestrutura com Docker (Banco de dados)
O arquivo `docker-compose.yml` que providencia o MySQL está localizado dentro da pasta `backend`.

```bash
# Acesse a pasta do backend
cd backend

# Copie o arquivo de variáveis de ambiente
cp .env-example .env

# Suba o banco de dados em plano de fundo:
docker-compose up -d
```

### 2. Configurando e Rodando a API NestJS
Ainda dentro da pasta `backend`, configure a aplicação e conecte ao banco:

```bash
# Instale todas as dependências do projeto
npm install

# Sincronize o banco de dados via Prisma (cria as tabelas do projeto)
npx prisma db push

# (Opcional) Faça upload do Prisma Client mais recente
npx prisma generate

# Inicie o servidor em modo de desenvolvimento
npm run start:dev
```

### 3. Acessando e testando a API

A API estará disponível por padrão na porta **3000**.
Este projeto utiliza o **Swagger** para documentar todas as rotas e facilitar a interação (via navegador) sem necessidade de um Postman.

- **Documentação da API Swagger:**
  Para criar usuários, listar atividades, ver detalhes e testar o login, basta acessar:
  [http://localhost:3000/api](http://localhost:3000/api)

## Regras de Negócio e Funcionalidades

- **CRUD de Tarefas:** Criação, Edição, Deleção, Visualização.
- **Isolamento e Segurança (Data Leakage Fix):** 
  Um usuário comum (`USER`) só pode editar ou deletar as atividades **que foram criadas por ele mesmo**.
  O `ADMIN` possui acesso irrestrito para alterar e deletar a atividade de qualquer pessoa.
- **Autenticação com JWT:**
  O sistema é munido de proteção em todos os endpoints sensíveis via Auth Guard. Senhas são "cacheadas" fortemente via `Bcrypt`.
  *(Dica: Rotas como `POST /users` (SignUp), `POST /auth/login` e `GET /tasks` são abertas para facilitar o uso)*

## Estrutura do Projeto

- `/backend`: Diretório destinado ao código do backend (NestJS + Prisma + MySQL).
  - `docker-compose.yml`: Arquivo responsável pela orquestração do banco de dados MySQL para persistência de dados localmente.
- `/frontend`: *Em Construção*.
