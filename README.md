# Storefront

Next.js App Router storefront com TypeScript, Tailwind e uma vitrine inicial com produtos mockados.

## Stack
- Next.js 16 (App Router) + React 19
- Tailwind CSS 4
- TypeScript
- ESLint + Prettier
- Jest + Testing Library
- Husky + lint-staged

## Como rodar
1) Instale as dependências:

```bash
npm install
```

2) Ambiente de desenvolvimento:

```bash
npm run dev
```

3) Qualidade e build:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Estrutura
- src/app/page.tsx – landing e grade de produtos
- src/components/product-card.tsx – card reutilizável
- src/data/products.ts – catálogo mockado e utilitário de preço
- jest.config.js / jest.setup.ts – testes com Testing Library

## Husky / lint-staged
Pré-commit executa lint-staged para formatar e rodar lint nos arquivos alterados. Rode `npm run prepare` após instalar as dependências se os hooks não estiverem ativos.
