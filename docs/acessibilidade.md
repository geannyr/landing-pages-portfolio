# Acessibilidade

## Homepage (Astro, raiz do repositório)

- Documento em `pt-BR`, um único `h1` por página (hero na home, título do projeto
  na página de detalhes).
- Link de pular para o conteúdo antes do cabeçalho.
- Cabeçalho, navegação, conteúdo principal e rodapé em elementos semânticos
  (`header`, `nav`, `main`, `footer`).
- Menu mobile com `aria-expanded`, `aria-controls`, fechamento por Escape,
  fechamento ao selecionar um link e restauração do estado ao redimensionar para
  desktop (`src/scripts/mobile-menu.ts`).
- Foco visível (`:focus-visible`) em todos os elementos interativos.
- Status dos projetos nunca depende só de cor: o badge "Concluído"/"Planejado"
  sempre vem acompanhado de texto.
- Cards planejados não têm nenhum elemento clicável (sem `href="#"`, sem link
  fingindo uma ação que não existe) — a diferenciação usa borda tracejada, fundo e
  o texto "Em breve".
- Links de contato (GitHub, LinkedIn, e-mail, portfólio pessoal) só recebem `href`
  quando configurados em `src/data/profile.ts`; enquanto vazios, ficam sem `href`
  (não navegam) e um clique aciona uma região `aria-live` avisando que o link
  ainda não foi configurado (`src/scripts/contact-links.ts`).
- Textos de link descritivos ("Ver projeto", "Ver detalhes", "Voltar ao
  catálogo"), nunca "clique aqui".
- Elementos puramente decorativos (composições abstratas dos previews, ícones dos
  chips do hero) marcados com `aria-hidden="true"`.
- Suporte a `prefers-reduced-motion` herdado do reset global.

## Clínica Plena (`saude/`, vanilla)

A landing page de saúde foi construída com foco em navegação por teclado,
semântica e mensagens compreensíveis por tecnologias assistivas. Não foi alterada
pela migração da homepage para Astro.

- Documento em `pt-BR`.
- Link de pular para o conteúdo no início da página.
- Apenas um `h1`.
- Cabeçalho, navegação, conteúdo principal, seções e rodapé com elementos
  semânticos.
- Menu mobile com `aria-expanded`, `aria-controls`, fechamento por link e tecla
  Escape.
- FAQ em acordeão com botões nativos e `aria-expanded`.
- Labels associados a todos os campos do formulário.
- Mensagens de erro associadas via `aria-describedby`.
- Região `aria-live` para retorno do formulário e ações demonstrativas do
  WhatsApp.
- Foco visível para links, botões e campos.
- Respeito a `prefers-reduced-motion`.
- Ícones decorativos marcados com `aria-hidden="true"`.

## Observações

Os nomes, profissionais, endereço e dados institucionais são demonstrativos.
Nenhuma informação deve ser interpretada como dado de uma clínica real. O mesmo
vale para os projetos "Planejado" do catálogo — nenhum deles existe de fato ainda.
