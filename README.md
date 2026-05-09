# 🐾 PetLove Admin Dashboard

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

> Sistema administrativo para a gestão de pets e controle de solicitações de adoção, desenvolvido como desafio prático de Desenvolvimento Web FullStack.

## 💻 Sobre o Projeto

O **PetLove Admin** é um portal exclusivo para funcionários, focado na gestão eficiente de animais disponíveis para adoção. O sistema consome uma API RESTful para listar os pets cadastrados, gerenciar os interessados na adoção e registrar novos animais no banco de dados.

O projeto foi construído utilizando as melhores práticas do ecossistema React, incluindo proteção de rotas, manipulação de estado, hooks customizados e design responsivo.

## ✨ Funcionalidades Implementadas

- **🔐 Autenticação e Segurança:**
  - Tela de login com validação de credenciais via API.
  - Middlewares de rotas protegidas (Protected Routes).
  - Sistema de Auto-Logout de segurança após 15 minutos de inatividade.
  - Ocultar/Mostrar senha no formulário.

- **📋 Listagem e Gestão de Pets:**
  - Consumo inteligente de API com cruzamento de dados (Pets e Solicitações de Adoção).
  - Cards expansíveis para visualização detalhada.
  - Barra de pesquisa em tempo real pelo nome do pet.
  - Filtros dinâmicos por espécie (Todos, Cachorros, Gatos).
  - Tabela responsiva de adotantes com atalho de contato (WhatsApp).

- **📝 Cadastro de Novos Animais:**
  - Formulário completo com validação de campos.
  - Preview dinâmico de imagem em tempo real baseado na URL inserida.
  - Feedback visual interativo (Loading states e modais de sucesso/erro com SweetAlert2).
  - Envio padronizado do payload (JSON) para a API.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React.js com TypeScript
- **Roteamento:** React Router DOM v6
- **Estilização:** CSS3 (Grid, Flexbox e Variáveis)
- **Feedbacks Visuais:** SweetAlert2
- **Integração:** Fetch API nativa (Async/Await)

## 🚀 Como Executar o Projeto

Pré-requisitos: Você precisa ter o [Node.js](https://nodejs.org/) e o [Git](https://git-scm.com/) instalados na sua máquina. Certifique-se também de que a API Backend do projeto esteja rodando localmente na porta configurada (ex: `http://localhost:3000`).

1. **Clone o repositório:**
```bash
   git clone [git remote add origin https://github.com/MateusLinhares-Dev/site-pets-refactoring.gitt](https://github.com/MateusLinhares-Dev/site-pets-refactoring.git)
```

2. **Acesse a pasta do projeto:**
```bash
cd site-pets-refactoring
```

3. **Instale as dependências:**
```bash
npm install
# ou usando yarn: yarn install
```
4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
# ou usando yarn: yarn dev
```

5. *O aplicativo estará disponível no seu navegador em http://localhost:5173 (ou a porta padrão informada pelo Vite/Create React App).*

# 👨‍💻 Autor
`Desenvolvido com dedicação por Mateus Linhares para a consolidação de conhecimentos em desenvolvimento frontend moderno.`
