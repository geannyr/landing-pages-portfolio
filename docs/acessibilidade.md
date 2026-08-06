# Acessibilidade

A landing page de saúde foi construída com foco em navegação por teclado, semântica e mensagens compreensíveis por tecnologias assistivas.

## Decisões aplicadas

- Documento em `pt-BR`.
- Link de pular para o conteúdo no início da página.
- Apenas um `h1`.
- Cabeçalho, navegação, conteúdo principal, seções e rodapé com elementos semânticos.
- Menu mobile com `aria-expanded`, `aria-controls`, fechamento por link e tecla Escape.
- FAQ em acordeão com botões nativos e `aria-expanded`.
- Labels associados a todos os campos do formulário.
- Mensagens de erro associadas via `aria-describedby`.
- Região `aria-live` para retorno do formulário e ações demonstrativas do WhatsApp.
- Foco visível para links, botões e campos.
- Respeito a `prefers-reduced-motion`.
- Ícones decorativos marcados com `aria-hidden="true"`.

## Observações

Os nomes, profissionais, endereço e dados institucionais são demonstrativos. Nenhuma informação deve ser interpretada como dado de uma clínica real.
