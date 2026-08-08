// Conteúdo estendido das páginas /projetos/{slug}/. Só existe entrada aqui para
// projetos com hasDetailPage: true em projects.ts — nenhuma métrica ou resultado
// de conversão é inventado, só o que é verificável a partir do próprio código do projeto.
export interface ProjectDetail {
  slug: string;
  overview: string;
  /** Esclarece a distinção entre a empresa fictícia e a implementação real do projeto. */
  disclaimer: string;
  problem: string;
  objective: string;
  audience: string;
  visualDecisions: string[];
  accessibility: string[];
  performance: string[];
  /** Fatos de validação confirmados (testes reais) — nunca métricas comerciais inventadas. */
  validation: string[];
  features: string[];
  /** Texto alternativo do screenshot real, quando public/images/projects/{slug}-preview.webp existir. */
  screenshotAlt: string;
}

export const projectDetails: Record<string, ProjectDetail> = {
  "clinica-plena": {
    slug: "clinica-plena",
    overview:
      "Landing page fictícia de uma clínica multidisciplinar, com especialidades em psicologia, nutrição e fisioterapia. Construída em HTML, CSS e JavaScript puro, sem build e sem dependências externas.",
    disclaimer:
      "A Clínica Plena é uma empresa fictícia — nenhuma clínica real é representada. A implementação da landing page, porém, é real: código completo, testado e funcional, desenvolvido para portfólio.",
    problem:
      "Uma clínica com múltiplas especialidades precisa apresentar sua oferta com clareza e reduzir a fricção entre o interesse do visitante e o primeiro contato.",
    objective: "Captação de agendamentos pelo WhatsApp, com um formulário de contato como alternativa.",
    audience: "Pessoas buscando atendimento particular em psicologia, nutrição ou fisioterapia.",
    visualDecisions: [
      "Paleta verde e terracota, tipografia serifada nos títulos e sans-serif no corpo.",
      "Ícones e avatares desenhados em CSS/SVG inline, sem imagens externas.",
      "Cards de especialidade e perfil com hierarquia visual consistente."
    ],
    accessibility: [
      "Documento em pt-BR, com link de pular para o conteúdo e um único h1.",
      "Menu mobile com aria-expanded, aria-controls e fechamento por Escape.",
      "FAQ em acordeão com botões nativos e aria-expanded.",
      "Formulário com labels associados e mensagens de erro via aria-describedby.",
      "Região aria-live para retorno do formulário e das ações de WhatsApp.",
      "Foco visível em todos os elementos interativos e suporte a prefers-reduced-motion."
    ],
    performance: [
      "Sem frameworks, fontes externas ou bibliotecas.",
      "JavaScript carregado com defer.",
      "Ícones, avatares e mapa construídos em CSS/SVG, evitando imagens pesadas.",
      "Elementos visuais com dimensões estáveis para reduzir mudanças de layout."
    ],
    validation: [
      "HTML, CSS e JavaScript puro",
      "Layout mobile-first",
      "Menu mobile acessível",
      "FAQ em acordeão",
      "Formulário com validação",
      "Mensagens contextuais de WhatsApp",
      "Suporte a prefers-reduced-motion",
      "Seis viewports validados",
      "Ausência de overflow horizontal",
      "12 cenários de formulário testados",
      "Zero erros relevantes no console",
      "Zero recursos ausentes"
    ],
    features: [
      "Botões de agendamento por WhatsApp com mensagem pré-preenchida",
      "Formulário de contato com validação no navegador",
      "FAQ em acordeão",
      "Menu mobile acessível"
    ],
    screenshotAlt: "Prévia da landing page Clínica Plena, projeto fictício de clínica multidisciplinar."
  },
  fluxa: {
    slug: "fluxa",
    overview:
      "Landing page fictícia de um CRM leve de vendas para pequenos negócios, com pipeline, organização de clientes e tarefas de acompanhamento. Construída em HTML, CSS e JavaScript puro, sem build e sem dependências externas.",
    disclaimer:
      "A Fluxa é um produto fictício — nenhum SaaS real é representado. A implementação da landing page, porém, é real: código completo, testado e funcional, desenvolvido para portfólio.",
    problem:
      "Pequenos negócios que vendem diretamente costumam acompanhar oportunidades em planilhas, papel ou WhatsApp, o que facilita esquecer follow-ups e perder a visão geral do funil de vendas.",
    objective: "Converter visitantes para o início de um teste gratuito, com o pipeline de vendas como prova de produto.",
    audience: "Pequenos empreendedores e equipes enxutas que vendem diretamente e ainda não usam um CRM.",
    visualDecisions: [
      "Identidade de produto digital, deliberadamente distinta da Clínica Plena: paleta índigo/grafite/off-white, sem serif e sem formas orgânicas.",
      "Pipeline de vendas como assinatura visual única — sem gráficos ou widgets decorativos sem função.",
      "Ritmo mais compacto que uma landing institucional, com 8 seções, cada uma com um papel claro na conversão."
    ],
    accessibility: [
      "Documento em pt-BR, com link de pular para o conteúdo e um único h1.",
      "Menu mobile com aria-expanded, aria-controls e fechamento por Escape.",
      "Bloco de objeções em acordeão com botões nativos e aria-expanded.",
      "Realce de etapa do pipeline operável por mouse e teclado, com aria-pressed.",
      "Formulário com labels associados, mensagens de erro via aria-describedby e foco movido ao primeiro campo inválido.",
      "Elementos decorativos (preview do pipeline no hero, painel de cliente ilustrativo) marcados com aria-hidden.",
      "Foco visível em todos os elementos interativos e suporte a prefers-reduced-motion."
    ],
    performance: [
      "Sem frameworks, fontes externas ou bibliotecas.",
      "JavaScript carregado com defer.",
      "Interface do pipeline construída inteiramente em HTML/CSS, sem imagens.",
      "Zero dependências externas."
    ],
    validation: [
      "HTML, CSS e JavaScript puro",
      "Pipeline responsivo: 4 colunas no desktop, 2x2 no tablet, lista vertical no mobile",
      "Realce de etapa do pipeline testado por mouse e teclado (Enter/Space)",
      "12 cenários de formulário de teste grátis validados (campo vazio, e-mail inválido, espaços, envio por Enter, sucesso demonstrativo)",
      "Contraste de texto revisado e ajustado para AA (status \"ganho\" do pipeline)",
      "Seis viewports validados (320 a 1920px)",
      "Ausência de overflow horizontal",
      "Zero erros de console",
      "Zero recursos ausentes"
    ],
    features: [
      "Pipeline de vendas com realce de etapa (clique ou teclado)",
      "Bloco de objeções em acordeão",
      "Formulário de teste grátis com validação no navegador",
      "Menu mobile acessível"
    ],
    screenshotAlt: "Prévia da landing page Fluxa, projeto fictício de CRM leve para pequenos negócios."
  }
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return projectDetails[slug];
}
