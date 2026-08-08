// Fonte única de dados do catálogo. Para adicionar um projeto novo, inclua um
// objeto aqui — nenhum componente precisa ser alterado. Consulte
// docs/adicionando-projetos.md para o passo a passo completo.

export type ProjectStatus = "completed" | "planned";

// Estilo da composição abstrata usada no preview do card enquanto não houver
// screenshot real. "screenshot" indica que o projeto tem (ou deveria ter) captura real.
export type PreviewStyle = "screenshot" | "dashboard" | "editorial" | "course";

// Stacks previstas no roadmap do portfólio (docs/arquitetura.md). Novas categorias
// entram aqui conforme forem implementadas — a homepage já sabe agrupar por categoria.
export type ProjectCategory = "vanilla";

export interface Project {
  id: string;
  /** Usado na URL: /projetos/{slug}/ e como chave de busca do projeto. */
  slug: string;
  name: string;
  category: ProjectCategory;
  segment: string;
  status: ProjectStatus;
  stack: string[];
  goal: string;
  description: string;
  /** Pontos de destaque exibidos como tags no card. */
  highlights: string[];
  /** Cor de identificação do projeto, usada só como acento pontual (nunca como identidade da home). */
  accent: string;
  previewStyle: PreviewStyle;
  /** Caminho relativo (sem barra inicial) para a demonstração. Ausente = projeto ainda não existe. */
  demoPath?: string;
  /** URL externa do repositório de código. Ausente = não configurado ainda. */
  codeUrl?: string;
  year: number;
  /** Controla se /projetos/{slug}/ é gerada. Só deve ser true quando o conteúdo é real e verificável. */
  hasDetailPage: boolean;
}

export const projects: Project[] = [
  {
    id: "clinica-plena",
    slug: "clinica-plena",
    name: "Clínica Plena",
    category: "vanilla",
    segment: "Saúde",
    status: "completed",
    stack: ["HTML", "CSS", "JavaScript"],
    goal: "Captação de agendamentos pelo WhatsApp",
    description:
      "Landing page de uma clínica multidisciplinar fictícia, com especialidades, profissionais, FAQ e formulário de agendamento.",
    highlights: ["Formulário validado", "FAQ em acordeão", "Menu mobile acessível"],
    accent: "#55786A",
    previewStyle: "screenshot",
    demoPath: "saude",
    codeUrl: "https://github.com/geannyr/landing-pages-portfolio/tree/main/saude",
    year: 2026,
    hasDetailPage: true
  },
  {
    id: "fluxa",
    slug: "fluxa",
    name: "Fluxa",
    category: "vanilla",
    segment: "Vendas e tecnologia",
    status: "completed",
    stack: ["HTML", "CSS", "JavaScript"],
    goal: "Organizar oportunidades comerciais e converter visitantes para um teste gratuito",
    description:
      "Landing page de um CRM fictício e enxuto para pequenos negócios, com pipeline de vendas, organização de clientes e foco em teste gratuito.",
    highlights: ["Pipeline de vendas", "Clientes e tarefas", "Teste grátis"],
    accent: "#4C5FD7",
    previewStyle: "dashboard",
    demoPath: "saas",
    codeUrl: "https://github.com/geannyr/landing-pages-portfolio/tree/main/saas",
    year: 2026,
    hasDetailPage: true
  },
  {
    id: "consultoria-empresarial",
    slug: "consultoria-empresarial",
    name: "Consultoria empresarial",
    category: "vanilla",
    segment: "Jurídico e corporativo",
    status: "planned",
    stack: ["HTML", "CSS", "JavaScript"],
    goal: "Geração de contato qualificado para consultoria",
    description: "Landing page fictícia para um escritório de consultoria jurídica e corporativa.",
    highlights: ["Áreas de atuação", "Autoridade institucional", "Formulário de contato"],
    accent: "#1F2A44",
    previewStyle: "editorial",
    year: 2026,
    hasDetailPage: false
  },
  {
    id: "plataforma-preparatoria",
    slug: "plataforma-preparatoria",
    name: "Plataforma preparatória",
    category: "vanilla",
    segment: "Educação",
    status: "planned",
    stack: ["HTML", "CSS", "JavaScript"],
    goal: "Inscrição em turmas preparatórias",
    description: "Landing page fictícia para um curso preparatório voltado a estudantes.",
    highlights: ["Cursos e turmas", "Depoimentos de alunos", "Inscrição"],
    accent: "#D98A2B",
    previewStyle: "course",
    year: 2026,
    hasDetailPage: false
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((project) => project.category === category);
}
