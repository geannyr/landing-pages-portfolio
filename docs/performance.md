# Performance

A primeira etapa evita dependências e prioriza carregamento simples.

## Decisões aplicadas

- Sem frameworks, fontes externas ou bibliotecas.
- JavaScript carregado com `defer`.
- CSS separado por responsabilidade.
- Avatares, ícones e mapa são criados com CSS/SVG inline simples, evitando imagens pesadas.
- Elementos visuais possuem dimensões estáveis para reduzir mudanças de layout.
- Animações leves e desativáveis via `prefers-reduced-motion`.
- Interações essenciais usam JavaScript mínimo.

## Próximos cuidados

Caso imagens reais sejam adicionadas no futuro, usar formatos modernos, dimensões explícitas, texto alternativo adequado e compressão antes de publicação.
