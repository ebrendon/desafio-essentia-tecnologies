# Desafio Essentia Group
O teste simula uma contratação por uma empresa fictícia chamada "TechX" para desenvolver uma aplicação web de gerenciamento de tarefas (to-do list). A empresa precisa de uma solução simples e eficiente para que seus funcionários possam organizar suas tarefas diárias.

## Pré-requisitos

Para rodar este projeto, você precisará ter instalado em sua máquina:
- [Docker](https://docs.docker.com/get-docker/) (No Windows e macOS, recomenda-se a instalação do **Docker Desktop**)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Como começar (Setup Inicial)

Siga os passos abaixo para configurar o ambiente de desenvolvimento localmente.

1. **Clone do repositório**
   ```bash
   git clone <url-do-repositorio>
   cd desafio-essentia-tecnologies
   ```

2. **Configuração das Variáveis de Ambiente**
   Crie uma cópia do arquivo de exemplo `.env-example` nomeando-o como `.env`:

   - **Linux/macOS**:
     ```bash
     cp .env-example .env
     ```
   - **Windows (PowerShell)**:
     ```powershell
     Copy-Item .env-example -Destination .env
     ```
   _Caso necessário, você pode alterar as credenciais no arquivo `.env` gerado._

3. **Subindo a Infraestrutura com Docker Compose**
   Inicie os containers utilizando o docker compose (em modo desanexado com `-d`):
   ```bash
   docker-compose up -d
   ```
   
   Isso irá baixar as imagens como a do MySQL e iniciar o banco de dados.

## Estrutura do Projeto

- `/backend`: Diretório destinado ao código do backend.
- `/frontend`: Diretório destinado ao código do frontend.
- `docker-compose.yml`: Arquivo responsável pela orquestração dos containers (ex: banco de dados).
