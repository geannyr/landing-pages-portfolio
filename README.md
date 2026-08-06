# Landing Lab

Coleção de projetos front-end criada por **Geanny Rodrigues** — Desenvolvedora
Full Stack Java, com landing pages fictícias criadas para demonstrar organização,
HTML semântico, CSS responsivo e atenção a acessibilidade e performance.

A **página principal** (`/`) é um catálogo construído com **Astro**, gerado 100%
estático — sem framework de UI, sem Tailwind, sem CMS, sem banco de dados. Cada
**landing page de projeto** (ex.: `saude/`) é HTML, CSS e JavaScript puro,
independente, sem build.

As empresas apresentadas nos projetos (Clínica Plena, etc.) são fictícias — nenhuma
marca real é representada. A implementação de cada projeto concluído, porém, é
real: código completo, testado e funcional.

## Landing pages previstas

- Saúde: Clínica Plena, clínica multidisciplinar. Status: concluída.
- Vendas: plataforma SaaS para pequenos negócios. Status: planejada.
- Jurídico/corporativo: consultoria empresarial. Status: planejada.
- Educação: plataforma preparatória. Status: planejada.

## Tecnologias

- Homepage: Astro, TypeScript (onde faz sentido), CSS moderno (`color-mix()`,
  custom properties), JavaScript mínimo, zero dependências de build além do
  próprio Astro.
- Landing pages de projeto: HTML5, CSS3, JavaScript puro, sem frameworks, sem
  build.

## Estrutura

```text
landing-pages-portfolio/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── netlify.toml
├── scripts/
│   ├── copy-static-projects.mjs      copia saude/ (e futuros projetos) para dist/
│   ├── dev-static-projects-plugin.mjs serve saude/ durante `astro dev`
│   └── static-projects.config.mjs    lista central de projetos estáticos
├── src/
│   ├── components/
│   ├── data/            projects.ts, projectDetails.ts, profile.ts
│   ├── layouts/
│   ├── pages/            index.astro, projetos/[slug].astro, sitemap.xml.ts, robots.txt.ts
│   ├── scripts/           mobile-menu.ts, contact-links.ts
│   ├── styles/
│   └── utils/url.ts       centraliza toda URL interna/absoluta
├── public/
├── docs/
├── saude/                 landing page da Clínica Plena (vanilla, independente)
├── saas/  consultoria/  educacao/   pastas reservadas (.gitkeep)
└── README.md
```

## Como executar localmente

Homepage (Astro):

```bash
npm install
npm run dev       # http://localhost:4321 — inclui /saude/ servido a partir da raiz
npm run build     # gera dist/ (inclui dist/saude/)
npm run preview   # serve dist/ localmente para conferir o build de produção
npm run check     # typecheck dos arquivos .astro/.ts
```

Landing page da Clínica Plena isoladamente: abra `saude/index.html` diretamente no
navegador — não depende do Astro nem de instalação de pacotes.

## Publicação

Veja [docs/deploy.md](docs/deploy.md) para instruções detalhadas de Vercel,
Netlify e GitHub Pages (incluindo o `BASE_PATH` necessário para subdiretório).

## Adicionando um projeto

Veja [docs/adicionando-projetos.md](docs/adicionando-projetos.md).

## Perfil e dados públicos

Nome, título profissional e links de contato ficam centralizados em
[src/data/profile.ts](src/data/profile.ts). Campos públicos hoje: nome, título
profissional, GitHub, LinkedIn e e-mail. `website` (portfólio pessoal) e
`repositoryUrl` (repositório deste projeto) são opcionais — enquanto vazios, o
link correspondente simplesmente não aparece na página (não é renderizado como
"desabilitado"). Telefone e localização detalhada não são publicados.

## Status dos projetos

| Projeto | Status |
| --- | --- |
| Página principal (catálogo, Astro) | Primeira versão funcional |
| Saúde (Clínica Plena) | Concluída |
| SaaS | Apenas pasta reservada |
| Consultoria | Apenas pasta reservada |
| Educação | Apenas pasta reservada |

As empresas e projetos apresentados são fictícios e foram criados para fins de
portfólio. A autoria (Geanny Rodrigues) e os links de contato são reais.
