# Arquitetura

O repositório foi organizado por landing page, mantendo cada projeto isolado em sua própria pasta. Além das landings, a raiz do repositório contém a página principal (`index.html`), que funciona como catálogo dos projetos do portfólio.

## Decisões

- HTML, CSS e JavaScript ficam separados para facilitar leitura e manutenção, tanto na raiz quanto em cada landing.
- `reset.css` concentra normalizações básicas.
- `variables.css` concentra tokens visuais como cores, fontes, espaçamentos, sombras e raios.
- `style.css` concentra layout, componentes, responsividade e estados.
- `main.js` usa funções pequenas e isoladas por responsabilidade.
- As pastas `saas/`, `consultoria/` e `educacao/` permanecem reservadas com `.gitkeep`.

## Página principal (`index.html`)

- Funciona como catálogo navegável dos quatro projetos do portfólio, com identidade visual própria e neutra (não reaproveita a paleta verde da Clínica Plena).
- Cada projeto recebe uma cor de acento (saúde, SaaS, consultoria, educação), usada apenas em detalhes pontuais dos cards — a identidade principal da página permanece neutra.
- O card da Clínica Plena contém um link explícito e descritivo (`./saude/`); os demais cards representam projetos planejados, sem links falsos (`href="#"`) e sem depender apenas de opacidade para indicar o status — a diferenciação usa fundo, borda tracejada e badge de texto.
- Os links de contato (GitHub, LinkedIn, e-mail) usam destinos configuráveis em `js/main.js` (`CONTACT_LINKS`). Enquanto não preenchidos, os links permanecem visíveis, mas inativos, sem apontar para URLs inventadas.
- JavaScript é usado apenas para o menu mobile, os links de contato configuráveis e a atualização do ano no rodapé.

## Escopo atual

- Implementada: página principal (catálogo) e landing page fictícia da Clínica Plena.
- Não implementadas: landing pages de SaaS, consultoria e educação.
