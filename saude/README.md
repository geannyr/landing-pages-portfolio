# Clínica Plena

Landing page fictícia para uma clínica multidisciplinar demonstrativa, com serviços de psicologia, nutrição e fisioterapia.

## Objetivo

Gerar solicitações de agendamento pelo WhatsApp a partir de CTAs, cards de especialidade, botão flutuante e formulário.

## Público

Adultos entre 25 e 55 anos que procuram atendimento particular, acolhedor e profissional.

## Identidade visual

Paleta acolhedora e autoral, validada em contraste AA (WCAG). O terracota tem
duas variantes: `--color-terracotta` é só decorativo (superfícies, ícones,
bordas — contraste ~3.3:1, insuficiente para texto pequeno) e
`--color-terracotta-deep` é a versão validada para texto (eyebrow, links,
labels — ~5.4:1 sobre o fundo principal).

- Verde sálvia profundo: `#4A6558`
- Verde escuro: `#2C4038`
- Verde acinzentado (acento secundário): `#7C8C82`
- Terracota decorativa: `#C98168`
- Terracota para texto: `#94553C`
- Fundo principal: `#FBF7F0`
- Fundo alternativo: `#F3EDE2`
- Superfície (cards): `#FFFDF9`
- Texto grafite: `#2B2A26`
- Títulos em Georgia (serif), textos e interface em fontes do sistema (sans-serif)

Ícones de especialidade e avatares dos profissionais são SVGs inline
desenhados especificamente para o projeto (sem ícones de banco genérico,
sem cruzes/corações/estetoscópios). Os avatares dos profissionais reaproveitam
o mesmo motivo gráfico da especialidade correspondente, em escala maior —
diferenciação por composição, não só por cor.

## Seções

1. Cabeçalho
2. Hero
3. Especialidades
4. Diferenciais
5. Profissionais
6. Como funciona o atendimento
7. Experiência de atendimento
8. Localização
9. FAQ
10. Formulário de contato
11. CTA final
12. Rodapé

## Funcionalidades

- Menu mobile acessível.
- Navegação por âncoras.
- FAQ em acordeão.
- Validação de formulário no cliente.
- Montagem de mensagem de WhatsApp.
- Ano do rodapé atualizado por JavaScript.
- Entrada suave dos blocos ao rolar a página (`IntersectionObserver`), visível
  por padrão sem JavaScript e desativada com `prefers-reduced-motion`.

## Acessibilidade

A página inclui link de pular conteúdo, labels, mensagens de erro acessíveis, foco visível, estados `aria-expanded`, região `aria-live` e suporte a `prefers-reduced-motion`.

## SEO

Inclui `lang="pt-BR"`, título, meta description, viewport, Open Graph básico, headings organizados e favicon demonstrativo.

## Performance

Não usa fontes externas, bibliotecas, imagens pesadas ou build. O JavaScript é carregado com `defer`.

## Configurar WhatsApp

No arquivo `js/main.js`, substitua a constante `WHATSAPP_NUMBER` por um número real no formato internacional, somente quando este projeto deixar de ser demonstrativo.

```js
const WHATSAPP_NUMBER = "5581999999999";
```

Enquanto a constante estiver vazia, a página exibe uma mensagem demonstrativa em vez de abrir uma URL inválida.

## Aviso

Projeto fictício desenvolvido para fins de portfólio. A Clínica Plena, seus profissionais, endereços e informações são demonstrativos.
