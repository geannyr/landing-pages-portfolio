// Conteúdo estendido das páginas /projetos/{slug}/. Só existe entrada aqui para
// projetos com hasDetailPage: true em projects.ts — nenhuma métrica ou resultado
// de conversão é inventado, só o que é verificável a partir do próprio código do projeto.
export interface ProjectDetail {
  slug: string;
  overview: string;
  problem: string;
  objective: string;
  audience: string;
  visualDecisions: string[];
  accessibility: string[];
  performance: string[];
  features: string[];
}

export const projectDetails: Record<string, ProjectDetail> = {
  "clinica-plena": {
    slug: "clinica-plena",
    overview:
      "Landing page fictícia de uma clínica multidisciplinar, com especialidades em psicologia, nutrição e fisioterapia. Construída em HTML, CSS e JavaScript puro, sem build e sem dependências externas.",
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
    features: [
      "Botões de agendamento por WhatsApp com mensagem pré-preenchida",
      "Formulário de contato com validação no navegador",
      "FAQ em acordeão",
      "Menu mobile acessível"
    ]
  }
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return projectDetails[slug];
}
