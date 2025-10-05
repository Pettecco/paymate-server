# Postman Collection - Paymate API

## Como usar:

### 1️⃣ **Importar no Postman:**

1. Abra o Postman
2. Clique em **"Import"**
3. Selecione os arquivos:
   - `Paymate-API.postman_collection.json` (Collection)
   - `Paymate-Environment.postman_environment.json` (Environment)

### 2️⃣ **Configurar Environment:**

1. Selecione o environment **"Paymate Environment"**
2. Verifique se `baseUrl` está como `http://localhost:3000`
3. A variável `userId` será preenchida durante os testes

### 3️⃣ **Executar os testes na ordem:**

#### 📝 **1. Create User** (POST /users)

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "myPassword123"
}
```

**Importante:** Copie o `id` da resposta e cole na variável `userId` do environment!

#### 📋 **2. Get All Users** (GET /users)

- Lista todos os usuários

#### 🔍 **3. Get User by ID** (GET /users/:id)

- Usa a variável `{{userId}}` automaticamente

#### ✏️ **4. Update User** (PATCH /users/:id)

```json
{
  "name": "João Silva Updated",
  "email": "joao.updated@example.com"
}
```

#### 🗑️ **5. Delete User** (DELETE /users/:id)

- Remove o usuário

## **Variáveis disponíveis:**

- `{{baseUrl}}` = `http://localhost:3000`
- `{{userId}}` = ID do usuário (preencher manualmente após criar)
