# Arquitetura

O repositório tem duas partes com ciclos de vida independentes:

- **Homepage** (`src/`, raiz do repositório): catálogo do portfólio, construído com
  **Astro**, gerado 100% estático (`output: "static"`), sem framework de UI
  (React/Vue/Svelte), sem Tailwind, sem CMS, sem banco de dados e sem autenticação.
- **Landing pages de projeto** (`saude/`, e futuramente `saas/`, `consultoria/`,
  `educacao/`): HTML, CSS e JavaScript puro, sem build, cada uma isolada em sua
  própria pasta. `saude/` (Clínica Plena) é a única implementada até agora.

A homepage **apresenta e navega** para os projetos — ela nunca importa, reescreve
ou reconstrói o conteúdo de uma landing page. `saude/` continua funcionando
exatamente como antes: abre com duplo clique no `index.html`, sem depender do
Astro para nada.

## Por que Astro

- Gera HTML/CSS estático com JavaScript mínimo (só o necessário para o menu mobile
  e os links de contato configuráveis) — sem o custo de um framework de UI no
  cliente.
- Componentes `.astro` isolam cada seção da homepage sem precisar de React/Vue.
- `output: "static"` é compatível com qualquer hospedagem de arquivos estáticos
  (Vercel, Netlify, GitHub Pages) — veja [deploy.md](./deploy.md).

## Estrutura da homepage

```
src/
├── components/     Header, Hero, ProjectCard, ProjectGrid, CategorySection,
│                   ProcessSection, QualitySection, ContactSection, Footer,
│                   ProjectPreview (composições abstratas dos cards)
├── data/
│   ├── projects.ts        fonte única dos projetos do catálogo
│   ├── projectDetails.ts  conteúdo estendido das páginas /projetos/{slug}/
│   └── profile.ts         links de contato (GitHub, LinkedIn, e-mail, site)
├── layouts/
│   └── BaseLayout.astro   <head> (SEO, Open Graph, Twitter Card, favicon),
│                          skip-link, Header, Footer
├── pages/
│   ├── index.astro
│   ├── sitemap.xml.ts     gerado a partir de projects.ts, sem @astrojs/sitemap
│   ├── robots.txt.ts      aponta para o sitemap.xml
│   └── projetos/[slug].astro   só gera rota para projetos com hasDetailPage: true
├── scripts/         mobile-menu.ts, contact-links.ts (JavaScript mínimo, sem ilha
│                     de framework)
├── styles/           reset.css, tokens.css (paleta escura + acentos por projeto),
│                     global.css
└── utils/
    └── url.ts        withBase(), asset(), absoluteUrl(), absoluteAsset() —
                       toda URL interna/absoluta passa por aqui, nenhuma é escrita
                       à mão em outro arquivo
```

Ver [adicionando-projetos.md](./adicionando-projetos.md) para o passo a passo de
incluir um projeto novo, planejado ou concluído.

## `saude/` e outros projetos estáticos

`saude/` fica fora de `public/` de propósito: existe uma única fonte de verdade no
repositório (a própria pasta `saude/`), sem cópia duplicada versionada no Git.

- **Produção**: `npm run build` roda `astro build` e, em seguida,
  `scripts/copy-static-projects.mjs`, que copia `saude/` para `dist/saude/`
  (excluindo `README.md` e outros arquivos que não servem para o deploy). O script
  valida que `saude/index.html` existe antes de copiar, remove qualquer cópia
  anterior em `dist/saude/` e usa só APIs nativas do Node (`fs.cp`), funcionando
  igual em Windows e Linux.
- **Desenvolvimento** (`astro dev`): um plugin Vite pequeno
  (`scripts/dev-static-projects-plugin.mjs`) serve `<BASE_PATH>saude/*`
  diretamente da pasta `saude/` da raiz, para os links do catálogo funcionarem sem
  precisar rodar `astro build` a cada alteração. O plugin resolve o caminho
  solicitado contra a pasta do projeto e rejeita (`403`) qualquer tentativa de
  escapar dela (ex.: `../../package.json`); ele nunca serve nada fora da lista de
  projetos estáticos.
- **Lista central**: `scripts/static-projects.config.mjs` exporta
  `STATIC_PROJECTS`, hoje só `["saude"]`. Tanto o script de cópia quanto o plugin
  de dev leem essa mesma lista — adicionar um projeto estático novo é uma linha
  nesse arquivo (ver adicionando-projetos.md).

> **Nota sobre `astro dev`**: o servidor de desenvolvimento do Vite expõe
> qualquer arquivo da raiz do projeto por caminho direto (ex.: `/package.json`) —
> um comportamento padrão do Vite em modo dev, não introduzido por este plugin, e
> que não existe no build de produção (`dist/` só contém o que é explicitamente
> gerado ou copiado). Não há segredos na raiz do repositório (`.env` já é
> protegido pelo próprio Vite).

## Rotas e base path

Todas as URLs internas passam por `src/utils/url.ts`, que lê `BASE_URL`/`SITE` do
Astro (configurados via `BASE_PATH`/`SITE_URL` em `astro.config.mjs`). Isso permite
que o mesmo build funcione tanto na raiz de um domínio quanto em um subdiretório
(GitHub Pages) sem tocar em nenhum dado ou componente — só a variável de ambiente
do build muda. Detalhes em [deploy.md](./deploy.md).

## Escopo atual

- Implementada: homepage em Astro (catálogo, processo, critérios de qualidade,
  contato) e a landing page fictícia da Clínica Plena (`saude/`), com página de
  detalhes em `/projetos/clinica-plena/`.
- Não implementadas: landing pages de SaaS, consultoria e educação (aparecem no
  catálogo como "Planejado", sem link).
