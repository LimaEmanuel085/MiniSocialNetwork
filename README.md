# MiniSocialNetwork

MiniSocialNetwork é uma API backend simples para uma rede social, desenvolvida em Node.js.
Ela fornece endpoints para gerenciamento de usuários, autenticação, perfis e administração.
O projeto ainda está em desenvolvimento e pretendo adicionar novas freatures nele.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB (via Mongoose)
- JWT para autenticação
- Bcrypt para hash de senhas

## 📁 Estrutura do Projeto

```
MiniSocialNetwork/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   └── routes/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## ⚙️ Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/LimaEmanuel085/MiniSocialNetwork.git
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd MiniSocialNetwork
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Inicie o servidor:
   ```bash
   npm start
   ```

## 📌 Endpoints da API

### 📂 Pública
- `GET /` – Lista todos os usuários (visão pública)

### 🛡️ Rotas de Usuário (Públicas)
- `POST /user/register` – Registro de novo usuário
- `POST /user/login` – Login e geração de token JWT

### 🔐 Rotas de Usuário (Privadas - requer JWT)
- `GET /user/profile/:id` – Visualiza perfil do usuário
- `PUT /user/profile/:id` – Atualiza perfil do usuário
- `DELETE /user/profile/:id` – Exclui perfil do usuário

### 🧑‍💼 Rotas de Administrador (requer senha de admin + middleware)
- `GET /admin/users/:pass` – Lista todos os usuários
- `GET /admin/user/:pass` – Visualiza dados de um usuário
- `POST /admin/user/:pass` – Cria um novo usuário
- `DELETE /admin/user/:pass` – Deleta um usuário
- `PUT /admin/user/:pass` – Atualiza dados de um usuário

## ✅ Funcionalidades

- Cadastro e autenticação de usuários
- Visualização, atualização e exclusão de perfis
- Rotas protegidas por JWT
- Área administrativa com autenticação por senha
- Hash de senhas com Bcrypt

## 📌 To-Do

- [ ] Implementar sistema de comentários ou postagens
- [ ] Melhorar tratamento de erros
- [ ] Implementar testes automatizados
- [ ] Criar documentação com Swagger ou Postman

## Volto atualizando o projeto em datas futuras!