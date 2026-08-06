# Arquitetura

O repositório foi organizado por landing page, mantendo cada projeto isolado em sua própria pasta. Nesta primeira etapa, apenas `saude/` possui implementação completa.

## Decisões

- HTML, CSS e JavaScript ficam separados para facilitar leitura e manutenção.
- `reset.css` concentra normalizações básicas.
- `variables.css` concentra tokens visuais como cores, fontes, espaçamentos, sombras e raios.
- `style.css` concentra layout, componentes, responsividade, estados e animações.
- `main.js` usa funções pequenas para menu, FAQ, formulário, WhatsApp e ano do rodapé.
- As pastas `saas/`, `consultoria/` e `educacao/` permanecem reservadas com `.gitkeep`.

## Escopo atual

- Implementada: landing page fictícia da Clínica Plena.
- Não implementadas: landing pages de SaaS, consultoria e educação.
