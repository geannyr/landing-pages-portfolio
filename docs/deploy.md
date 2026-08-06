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

## GitHub Pages (publicação manual)

Nenhum workflow de GitHub Actions foi criado nesta etapa — a publicação abaixo é
manual, para você decidir depois se quer automatizar.

1. Build com o base path do repositório:
   ```bash
   BASE_PATH=/landing-pages-portfolio/ SITE_URL=https://SEU-USUARIO.github.io npm run build
   ```
   (troque `SEU-USUARIO` pelo seu usuário do GitHub e `landing-pages-portfolio` pelo
   nome real do repositório, se for diferente)
2. O resultado publicável é a pasta `dist/` inteira (já contém `dist/saude/`).
3. Publique `dist/` como conteúdo do GitHub Pages, por uma das duas formas:
   - **Branch `gh-pages`**: crie/atualize esse branch só com o conteúdo de `dist/`
     (por exemplo com uma ferramenta como `gh-pages` ou publicando manualmente) e
     configure o Pages do repositório para servir a partir dele.
   - **Settings → Pages → "Deploy from a branch"**: aponte para o branch e pasta
     onde `dist/` foi publicado.
4. Confirme em Settings → Pages que a URL final é
   `https://SEU-USUARIO.github.io/landing-pages-portfolio/` e que ela bate com o
   `BASE_PATH`/`SITE_URL` usados no build do passo 1 — um valor errado quebra todos
   os links internos.

Se no futuro você quiser automatizar esse processo, o próximo passo natural é um
workflow do GitHub Actions (`npm ci && npm run build` com `BASE_PATH` fixo, seguido
de `actions/deploy-pages`) — deliberadamente não criado agora, a seu pedido.

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
