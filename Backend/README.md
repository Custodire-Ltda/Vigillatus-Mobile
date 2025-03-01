# Vigillatus API

## Descrição
API backend do sistema Vigillatus, desenvolvida com Node.js, Express e MongoDB.

## Configuração do Ambiente

### Pré-requisitos
- Node.js
- MongoDB
- npm ou yarn

### Instalação
1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Inicie o servidor:
```bash
npm start
```

O servidor estará rodando em `http://localhost:5000`

## Endpoints Detalhados

### Gestores (`/Gestor`)
- `POST /Gestor`
  - Cadastra um novo gestor
  - Requer upload de foto (multipart/form-data)
  - Body:
    ```json
    {
      "nome": "Nome do Gestor",
      "email": "gestor@email.com",
      "senha": "senha123",
      "setor": "ID_DO_SETOR",
      "cargo": "ID_DO_CARGO",
      "foto": [arquivo binário]
    }
    ```

- `POST /Gestor/Login`
  - Realiza login do gestor
  - Body:
    ```json
    {
      "email": "gestor@email.com",
      "senha": "senha123"
    }
    ```

- `GET /Gestor/Dados`
  - Retorna dados do gestor autenticado
  - Requer autenticação

### Colaboradores (`/Colaborador`)
- `POST /Colaborador`
  - Cadastra um novo colaborador
  - Requer autenticação do gestor
  - Requer upload de foto (multipart/form-data)
  - Body:
    ```json
    {
      "nome": "Nome do Colaborador",
      "email": "colaborador@email.com",
      "telefone": "11999999999",
      "registro": "123456",
      "setor": "ID_DO_SETOR",
      "cargo": "ID_DO_CARGO",
      "foto": [arquivo binário]
    }
    ```

- `GET /Colaborador/:id`
  - Retorna dados de um colaborador específico
  - Requer autenticação

- `POST /Colaborador/Login`
  - Realiza login do colaborador
  - Body:
    ```json
    {
      "nome": "Nome do Colaborador",
      "email": "colaborador@email.com"
    }
    ```

- `GET /Colaborador`
  - Lista todos os colaboradores do gestor
  - Requer autenticação
  - Query params opcionais:
    - `ordenar`: "asc" ou "desc" (ordena por nome)

### Ocorrências (`/Ocorrencia`)
- `POST /Ocorrencia/registrar`
  - Registra uma nova ocorrência
  - Requer autenticação
  - Suporta upload de imagem (multipart/form-data)
  - Body:
    ```json
    {
      "className": "TIPO_OCORRENCIA",
      "probability": 0.95,
      "nomeColaborador": "Nome do Colaborador",
      "setor": "ID_DO_SETOR",
      "motivo": "Descrição do motivo",
      "gestorId": "ID_DO_GESTOR",
      "image": [arquivo binário]
    }
    ```

### Setores (`/Setor`)
- Gerenciamento de setores da empresa

### Cargos (`/Cargo`)
- Gerenciamento de cargos disponíveis

## Autenticação
A API utiliza autenticação via token JWT (JSON Web Token). Para endpoints protegidos, é necessário incluir o token no header da requisição:

```
Authorization: Bearer <token>
```

## Estrutura do Projeto
```
├── controllers/     # Controladores da aplicação
├── models/         # Modelos do MongoDB
├── routes/         # Rotas da API
├── Middleware/     # Middlewares da aplicação
└── index.js        # Arquivo principal
```

## Tecnologias Utilizadas
- Express.js - Framework web
- MongoDB - Banco de dados
- Mongoose - ODM para MongoDB
- CORS - Middleware para Cross-Origin Resource Sharing
- Cookie Parser - Middleware para processamento de cookies
- Multer - Middleware para upload de arquivos

## Conexão com o Banco de Dados
A API se conecta a um banco de dados MongoDB local na URL: `mongodb://127.0.0.1:27017/Vigillatus`

## Segurança
- Implementação de CORS para controle de acesso
- Processamento de cookies para autenticação
- Middlewares de autenticação e autorização
- Upload seguro de arquivos com Multer

## Portas
- A API roda por padrão na porta 5000 