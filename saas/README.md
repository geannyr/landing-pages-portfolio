# Fluxa

Landing page fictícia para um CRM leve de vendas voltado a pequenos negócios,
com pipeline, cadastro de clientes e tarefas de acompanhamento.

## Objetivo

Converter visitantes para o início de um teste gratuito. A conversão
secundária ("Ver como funciona") leva à seção do pipeline, sem competir com o
CTA principal.

## Público

Pequenos empreendedores e equipes enxutas que vendem diretamente e hoje
organizam clientes e oportunidades em planilhas, papel ou WhatsApp.

## Identidade visual

Direção "produto digital premium + editorial tech": deliberadamente distinta
tanto da Clínica Plena (`saude/`, acolhedora/orgânica/serifada) quanto de um
dashboard corporativo genérico (grades administrativas, tudo em caixas com
borda). Sem serif, sem formas orgânicas, sem paleta de wellness.

- Índigo (marca/CTA): `#4C5FD7`
- Índigo escuro (hover/texto de destaque): `#333F9E`
- Índigo suave (badges, fundos de destaque): `#E4E7FB`
- Grafite (títulos): `#14172B`
- Navy profundo (hero e rodapé — as duas únicas seções escuras, criam uma
  moldura para o conteúdo claro entre elas): `#10132A`
- Texto: `#262A42`
- Fundo principal: `#F7F7FB`
- Fundo alternativo (superfície índigo muito clara): `#EEF0FB`
- Superfície (cards): `#FFFFFF` — tint de destaque: `#F2F3FC`
- Teal — só como cor funcional de status "ganho" no pipeline, não como
  identidade de marca: `#007656`
- Tipografia 100% `system-ui`, pesos reduzidos (h1/h2 em 700, não 800; h3 em
  650; números-fantasma do "Como funciona" em 300) — hierarquia por peso e
  tamanho, não por "tudo em negrito".
- Ritmo variável: seções de mensagem (hero, "Como funciona", "Teste grátis")
  têm mais respiro; seções de produto (pipeline, clientes) são mais densas.
- Cards só para entidades reais do produto (oportunidade, cliente, tarefa,
  plano); conteúdo conceitual (problema, como funciona) não fica em caixa.
- Profundidade por camada e sombra suave (painel do hero sobreposto,
  cartões de cliente/tarefa levemente deslocados), não por excesso de bordas.

## Interface fictícia (pipeline)

A assinatura visual do produto é um pipeline de vendas em 4 etapas (Novo
contato, Em conversa, Proposta enviada, Fechado), com clientes, avatares de
iniciais coloridas e valores fictícios — sem gráficos decorativos, sem
widgets sem função, sem barra de ferramentas com aparência de CRUD. Aparece
em duas versões:

- **Hero**: painel que "invade" a seção seguinte — sobreposto à faixa escura
  do hero via margem negativa, com sombra de profundidade, colunas com
  número variável de cards (não uma tabela rígida de 4 colunas iguais).
- **Seção "O pipeline"**: versão completa, cards com sombra suave e avatar,
  clicável (o cabeçalho de cada coluna alterna um estado de realce via
  `aria-pressed`).

No mobile, o pipeline não é espremido horizontalmente: as colunas empilham em
uma lista vertical por etapa.

## Seções

1. Cabeçalho
2. Hero escuro (headline assimétrica) + painel do pipeline sobreposto
3. Problema — três dores em sequência, cada uma ligada a um fragmento da
   interface (não uma tabela comparativa)
4. Como funciona (sequência numerada com números-fantasma, sem bordas)
5. Pipeline (produto, cards com avatar e sombra suave)
6. Clientes e tarefas (dois cartões de produto levemente sobrepostos)
7. Planos (dois cartões reais, profundidade por sombra/tint, não por borda)
8. Dúvidas (objeções de adoção em lista editorial com linhas finas)
9. Teste grátis (formulário, painel assimétrico)
10. Rodapé escuro (mesmo tom do hero — fecha a moldura da página)

## Funcionalidades

- Menu mobile acessível.
- Navegação por âncoras.
- Bloco de objeções em acordeão.
- Realce interativo de etapa no pipeline (clique no cabeçalho da coluna).
- Validação de formulário de teste grátis no cliente (nome, e-mail, nome do
  negócio).
- Ano do rodapé atualizado por JavaScript.
- Entrada suave dos blocos ao rolar a página (`IntersectionObserver`), visível
  por padrão sem JavaScript e desativada com `prefers-reduced-motion`.

## Acessibilidade

Link de pular conteúdo, labels associados, mensagens de erro acessíveis, foco
visível, estados `aria-expanded`/`aria-pressed`, região `aria-live` e suporte
a `prefers-reduced-motion`. Os previews decorativos do pipeline (hero e painel
de cliente) usam `aria-hidden`, pois o conteúdo equivalente já está descrito
em texto nas proximidades.

## SEO

Inclui `lang="pt-BR"`, título, meta description, viewport, Open Graph básico,
headings organizados e favicon demonstrativo.

## Performance

Não usa fontes externas, bibliotecas, imagens pesadas ou build. O JavaScript é
carregado com `defer`. A interface do pipeline é inteiramente HTML/CSS.

## Formulário de teste grátis

O formulário valida os campos no navegador e não envia dados a nenhum
servidor — ao ser enviado com sucesso, exibe uma mensagem demonstrativa
("Conta demonstrativa criada.") e limpa os campos. Não há backend real neste
projeto.

## Aviso

Projeto fictício desenvolvido para fins de portfólio. A Fluxa, seus clientes,
valores e planos são demonstrativos.
