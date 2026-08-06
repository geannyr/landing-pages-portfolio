# Performance

## Homepage (Astro, raiz do repositório)

- Geração 100% estática (`output: "static"`): `npm run build` produz HTML/CSS e um
  JavaScript mínimo, sem hidratação de framework nenhuma (não há React/Vue/Svelte
  no bundle).
- O único JavaScript enviado ao navegador é o menu mobile e a ativação dos links
  de contato (`src/scripts/`), como `<script>` de módulo nativo — não são "ilhas"
  de framework, só DOM puro.
- Sem fontes externas (pilha `system-ui`), sem bibliotecas de UI, sem CSS
  framework.
- Previews dos cards são composições CSS (gradientes, `color-mix()`, blocos) com
  `aspect-ratio` fixo — sem imagem nenhuma nesta primeira versão, então não há
  layout shift nem peso de imagem a carregar.
- Quando um screenshot real for adicionado (ver
  [adicionando-projetos.md](./adicionando-projetos.md)), o padrão é WebP/AVIF, com
  `width`/`height` explícitos e `loading="lazy"` para imagens abaixo da dobra.
- `sitemap.xml` e `robots.txt` são gerados como rotas Astro
  (`src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`) a partir dos mesmos
  dados do catálogo — nenhuma dependência extra (`@astrojs/sitemap` não foi
  adicionada).
- A homepage nunca carrega as landing pages completas: os cards do catálogo
  linkam para `saude/` como navegação normal do navegador (troca de página), não
  como iframe, import ou fetch de conteúdo.

## Clínica Plena (`saude/`, vanilla)

Não alterada pela migração da homepage. A primeira etapa evita dependências e
prioriza carregamento simples.

- Sem frameworks, fontes externas ou bibliotecas.
- JavaScript carregado com `defer`.
- CSS separado por responsabilidade.
- Avatares, ícones e mapa são criados com CSS/SVG inline simples, evitando
  imagens pesadas.
- Elementos visuais possuem dimensões estáveis para reduzir mudanças de layout.
- Animações leves e desativáveis via `prefers-reduced-motion`.
- Interações essenciais usam JavaScript mínimo.

## Build para produção

`npm run build` roda `astro build` e depois `scripts/copy-static-projects.mjs`
(copia `saude/` para `dist/saude/`, excluindo documentação e arquivos que não
servem para o deploy). O resultado em `dist/` é só arquivos estáticos — qualquer
host de arquivos estáticos serve o site sem servidor Node em produção.

## Próximos cuidados

Ao adicionar o primeiro screenshot real (Clínica Plena) ou compor os previews de
SaaS/Consultoria/Educação com imagens, manter formato moderno, dimensões
explícitas, texto alternativo adequado e compressão antes de publicação — o
mesmo cuidado que já vale para `saude/`.
