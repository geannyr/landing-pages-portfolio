# Clínica Plena

Landing page fictícia para uma clínica multidisciplinar demonstrativa, com serviços de psicologia, nutrição e fisioterapia.

## Objetivo

Gerar solicitações de agendamento pelo WhatsApp a partir de CTAs, cards de especialidade, botão flutuante e formulário.

## Público

Adultos entre 25 e 55 anos que procuram atendimento particular, acolhedor e profissional.

## Identidade visual

- Verde principal: `#55786A`
- Verde escuro: `#2F5146`
- Terracota: `#C98168`
- Fundo principal: `#FAF8F4`
- Fundo alternativo: `#EEF3EF`
- Títulos em Georgia
- Textos e interface com fontes do sistema

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
