# Frontend (Gerenciador de Tarefas)

Este é o módulo de Interface de Usuário do Desafio Essentia Tecnologies, desenvolvido para interagir de forma robusta e dinâmica com as APIs do backend.

## 🛠️ Tecnologias Utilizadas
- **Angular 18+** (Framework SPA Componentizado e Tipado).
- **Tailwind CSS** (Utility-First CSS para construção ágil de layouts responsivos e bonitos).
- **RxJs** (Programação reativa com Observables).

## 🚀 Como Executar Localmente

### Pré-requisitos
Certifique-se de que a **API (Backend) esteja executando** (porta 3000) e possua um banco de dados ativo.
O Angular está predefinido (via `proxy.conf.json`) para automaticamente despachar requests iniciados por `/api` para a url `http://localhost:3000`.

### Execução

No seu terminal, já dentro da pasta `frontend`:

1. Instale todas as dependências requeridas utilizando NPM:
   ```sh
   npm install
   ```
2. Inicialize o servidor de desenvolvimento da aplicação Angular:
   ```sh
   npm start
   ```

A página recarregará automaticamente ao detectar se o servidor realizou um build bem-sucedido. Acesse-a utilizando a URL principal: **[http://localhost:4200/](http://localhost:4200/)**.

## 🎨 Funcionalidades

- **Rota Pública** para visualização da lista de tarefas, sem necessitar login;
- Integração de **Formulários Reativos** para Cadastro e Login de usuário (proteção Guards);
- Interface Polida (Minimalista) englobando UI Modal Interativa para edição e criação de tasks;
- **Componente Customizado Exclusivo** usando Tailwind CSS para modal de alerta focado em **Exclusão de Tarefas**, mitigando o uso nativo intrusivo do browser.
