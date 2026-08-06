# Deploy

A homepage (`src/`) é construída com Astro em modo estático (`output: "static"`, o
padrão). `npm run build` gera `dist/` com HTML/CSS/JS já prontos — nenhum servidor
Node é necessário para servir o resultado, em nenhum dos três provedores abaixo.

O build também copia `saude/` para `dist/saude/` automaticamente (veja
[arquitetura.md](./arquitetura.md#saude-e-outros-projetos-estáticos)). Rodar
`npm run build` sempre publica a Clínica Plena junto com a homepage — não é preciso
nenhum passo manual extra para isso.

## Variáveis de ambiente do build

Duas variáveis controlam onde o site vai funcionar. Nenhuma delas tem valor sensível
— são só strings de configuração:

| Variável | Para quê | Padrão |
| --- | --- | --- |
| `BASE_PATH` | Prefixo de todas as rotas internas (`/`, `/projetos/...`, `/saude/...`) | `/` |
| `SITE_URL` | Domínio usado em canonical, Open Graph, sitemap.xml e robots.txt | `https://seu-usuario.github.io` |

Domínio próprio na raiz (Vercel, Netlify) → não defina nada, os padrões já servem.
Subdiretório (GitHub Pages) → defina `BASE_PATH=/landing-pages-portfolio/` antes do
build. Todo o código lê essas variáveis através de `src/utils/url.ts` — nenhuma URL é
escrita à mão em componentes, dados ou no sitemap.

## Vercel

Zero configuração adicional: a Vercel detecta Astro automaticamente.

- Build command: `npm run build`
- Output directory: `dist`
- Não defina `BASE_PATH` (domínio da Vercel fica na raiz).
- Previews de PR funcionam nativamente, sem passo extra.

## Netlify

Já existe um `netlify.toml` na raiz do repositório com:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

Não defina `BASE_PATH` pelo mesmo motivo da Vercel (domínio/subdomínio Netlify na
raiz). Se um dia o site for publicado num subcaminho do Netlify, defina `BASE_PATH`
nas variáveis de ambiente do painel do Netlify antes do build.

## GitHub Pages (publicação automática via GitHub Actions)

O repositório já inclui `.github/workflows/deploy-pages.yml`, usando o fluxo
oficial recomendado atualmente para sites estáticos no GitHub Pages
(`actions/configure-pages` + `actions/upload-pages-artifact` +
`actions/deploy-pages` — sem branch `gh-pages`, sem `peaceiris/actions-gh-pages`).

**O workflow não publica nada sozinho até você habilitar o Pages no repositório.**
Passo a passo:

1. No GitHub, abra **Settings → Pages** do repositório
   [landing-pages-portfolio](https://github.com/geannyr/landing-pages-portfolio).
2. Em **Build and deployment → Source**, selecione **GitHub Actions** (não
   "Deploy from a branch").
3. Dê `git push` para a branch `main` (ou rode o workflow manualmente em
   **Actions → Deploy to GitHub Pages → Run workflow**, via `workflow_dispatch`).
4. Acompanhe a execução na aba **Actions** — o job `build` roda `npm ci`,
   `npm run check`, `npm run build` (já com `BASE_PATH` e `SITE_URL` corretos) e
   envia `dist/` como artefato; o job `deploy` publica esse artefato no Pages.
5. Ao concluir, o site fica em
   **https://geannyr.github.io/landing-pages-portfolio/**.

O workflow roda em push para `main` e também aceita disparo manual
(`workflow_dispatch`). Permissões ficam restritas ao mínimo necessário
(`contents: read`, `pages: write`, `id-token: write`) e uma `concurrency` garante
que dois deploys não rodem ao mesmo tempo.

Se preferir publicar manualmente em vez de usar o workflow, o processo é:

```bash
BASE_PATH=/landing-pages-portfolio/ SITE_URL=https://geannyr.github.io npm run build
```

e então publicar o conteúdo de `dist/` por conta própria — mas com o workflow já
configurado, isso normalmente não é necessário.

## Windows / Git Bash: cuidado com `BASE_PATH`

No Git Bash do Windows (MSYS), variáveis de ambiente com valor começando em `/` são
convertidas automaticamente para um caminho de arquivo do Windows (ex.:
`/landing-pages-portfolio/` vira `/C:/Program Files/Git/landing-pages-portfolio/`).
Se isso acontecer, prefixe o comando com `MSYS_NO_PATHCONV=1`:

```bash
MSYS_NO_PATHCONV=1 BASE_PATH=/landing-pages-portfolio/ npm run build
```

No PowerShell isso não acontece — `$env:BASE_PATH = "/landing-pages-portfolio/"`
funciona diretamente.

## Verificação pós-build

Depois de qualquer build, confira:

```bash
grep -o 'href="[^"]*"' dist/index.html | sort -u   # links devem começar com o BASE_PATH esperado
cat dist/robots.txt                                 # deve apontar para o sitemap com o domínio certo
cat dist/sitemap.xml                                 # URLs devem usar SITE_URL + BASE_PATH
ls dist/saude/index.html                             # a Clínica Plena precisa estar presente
```
