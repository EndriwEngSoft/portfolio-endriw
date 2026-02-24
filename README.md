# Portfólio — Endriw Bento

Portfólio profissional desenvolvido com React + Vite.

## 🚀 Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em modo desenvolvimento
npm run dev

# 3. Acesse: http://localhost:5173
```

## 📦 Como fazer build para produção

```bash
npm run build
```

## ☁️ Deploy no Vercel

1. Suba o projeto no GitHub
2. Acesse [vercel.com](https://vercel.com) e faça login
3. Clique em **"Add New Project"**
4. Importe o repositório do GitHub
5. Configurações (Vercel detecta automaticamente):
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Clique em **Deploy** ✅

## 📁 Estrutura do projeto

```
portfolio-endriw/
├── public/
│   └── Curriculo_EndriwBento.pdf   ← Currículo para download
├── src/
│   ├── App.jsx                      ← Componente principal
│   └── main.jsx                     ← Entry point
├── index.html                       ← HTML com SEO
├── vite.config.js
└── package.json
```

## 🛠️ Tecnologias

- React 18
- Vite 5
- CSS-in-JS (inline styles)
