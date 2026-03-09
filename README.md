## Pré-requisitos

Antes de começar, certifique-se de ter instalado na sua máquina:

- [Node.js](https://nodejs.org) versão **18.17 ou superior**
- **npm** (já vem junto com o Node.js)

Para verificar se já tem o Node instalado, rode no terminal:

```bash
node --version
npm --version
```

---

## Como rodar localmente

**1. Acesse a pasta do projeto**

```bash
cd prefeitura-teste
```

**2. Instale as dependências**

```bash
npm install
```

**3. Rode o servidor de desenvolvimento**

```bash
npm run dev
```

**4. Acesse no navegador**

```
http://localhost:3000
```

A página vai redirecionar automaticamente para `/login`.

---

## Credenciais de acesso

| Campo  | Valor                        |
|--------|------------------------------|
| E-mail | qualquer e-mail válido       |
| Senha  | `123456`                     |

Exemplo: `qualquer@gmail.com` + `123456`

---

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor em modo produção (requer build antes) |
| `npm run lint` | Verifica erros de lint no código |