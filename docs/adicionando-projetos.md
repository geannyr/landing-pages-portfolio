# Adicionando um projeto ao catálogo

O catálogo é 100% orientado a dados: nenhum componente precisa ser tocado para
adicionar, editar ou remover um card.

## 1. Projeto planejado (ainda não construído)

Adicione um objeto em `src/data/projects.ts`:

```ts
{
  id: "meu-projeto",
  slug: "meu-projeto",
  name: "Nome do projeto",
  category: "vanilla",
  segment: "Segmento de mercado",
  status: "planned",
  stack: ["HTML", "CSS", "JavaScript"],
  goal: "Objetivo de negócio do projeto",
  description: "Descrição curta de uma ou duas frases.",
  highlights: ["Ponto 1", "Ponto 2", "Ponto 3"],
  accent: "#RRGGBB",
  previewStyle: "dashboard", // "dashboard" | "editorial" | "course" | "screenshot"
  year: 2026,
  hasDetailPage: false
}
```

Isso é suficiente: o card aparece automaticamente no catálogo, com badge
"Planejado", preview conceitual (baseado em `previewStyle`) e sem nenhum link —
não invente `demoPath`/`codeUrl` antes de o projeto existir de verdade.

`previewStyle` controla a composição abstrata do preview (não é um screenshot real):
`dashboard` (métricas/SaaS), `editorial` (blocos institucionais), `course`
(cursos/progresso) ou `screenshot` (janela neutra, para quando um screenshot real
está para ser adicionado).

## 2. Projeto concluído (landing page pronta e publicada)

1. Publique o projeto em sua própria pasta na raiz do repositório (mesmo padrão de
   `saude/`: HTML/CSS/JS independentes, sem depender de nada da homepage).
2. Se o projeto for estático (vanilla), adicione o nome da pasta em
   `scripts/static-projects.config.mjs`:
   ```ts
   export const STATIC_PROJECTS = ["saude", "meu-projeto"];
   ```
   Isso é tudo que os scripts de cópia (`copy-static-projects.mjs`) e o plugin de
   dev (`dev-static-projects-plugin.mjs`) precisam — ambos leem essa lista.
3. Atualize o objeto em `projects.ts`:
   ```ts
   status: "completed",
   demoPath: "meu-projeto", // sem barra inicial
   ```
4. Rode `npm run build` e confirme que `dist/meu-projeto/index.html` existe.

## 3. Screenshot real

Ainda não existe nenhum screenshot no repositório. Quando tiver um:

1. Salve em `public/images/projects/{slug}.webp` (ou `.avif`), com dimensões
   fixas conhecidas (ex.: 1280×800).
2. No card (`src/components/ProjectPreview.astro`) e na página de detalhes
   (`src/pages/projetos/[slug].astro`), troque a composição abstrata por uma tag
   `<img>` apontando para `withBase`/`asset` do arquivo, com `width`, `height` e
   `loading="lazy"` quando a imagem estiver abaixo da dobra.
3. Não referencie caminhos locais do seu computador nem arquivos temporários —
   o arquivo precisa estar dentro de `public/` e commitado.

## 4. Página de detalhes (`/projetos/{slug}/`)

Só crie uma entrada em `src/data/projectDetails.ts` (e marque
`hasDetailPage: true` em `projects.ts`) quando o projeto realmente existir e você
tiver conteúdo verificável para preencher: problema, objetivo, público,
funcionalidades, decisões visuais, acessibilidade e performance. Não descreva
métricas ou resultados de conversão que não foram medidos de verdade.
`getStaticPaths()` em `src/pages/projetos/[slug].astro` só gera a rota para
projetos com `hasDetailPage: true` — um projeto planejado nunca ganha uma página
de detalhes vazia.

## 5. Nova categoria ou stack

`ProjectCategory` (`src/data/projects.ts`) hoje só tem `"vanilla"`. Para adicionar
`"react"`, `"nextjs"` etc.:

1. Adicione o valor ao union type `ProjectCategory`.
2. Adicione os projetos dessa categoria em `projects`.
3. Na homepage (`src/pages/index.astro`), adicione uma nova `<CategorySection>`
   filtrando por `getProjectsByCategory("react")`, com seu próprio título e
   descrição — o componente já foi feito para ser reutilizado por categoria.

Nenhuma dessas mudanças exige alterar `ProjectCard.astro`, `ProjectGrid.astro` ou
qualquer outro componente visual.

## 6. Contato (GitHub, LinkedIn, e-mail, portfólio pessoal)

Preencha os campos em `src/data/profile.ts`. Enquanto vazios, os links de
contato aparecem sem `href` e um clique avisa "Link de contato ainda não
configurado" — nunca aponte para uma URL inventada só para "preencher".
