// Configuração central de identidade e contato. Preencha website/repositoryUrl
// quando tiver os destinos reais — enquanto vazios, a UI não renderiza o link
// (não mostra um botão "não configurado" para algo que é opcional por natureza).
// Não publique telefone nem localização detalhada aqui.
export const profile = {
  name: "Geanny Maria Alves Rodrigues",
  professionalTitle: "Desenvolvedora Full Stack Java",
  github: "https://github.com/geannyr",
  linkedin: "https://www.linkedin.com/in/geanny-arodrigues/",
  /** Já inclui o esquema mailto: — usado como href direto, sem prefixação adicional. */
  email: "mailto:geanny.mrodrigues@gmail.com",
  /** Portfólio pessoal — opcional. Vazio = link não é renderizado. */
  website: "",
  /** Repositório do próprio landing-pages-portfolio — distinto de `github` (perfil pessoal). */
  repositoryUrl: "https://github.com/geannyr/landing-pages-portfolio"
};

export type ProfileLinkKey = keyof typeof profile;
