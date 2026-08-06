// Configuração central dos links de contato/perfil. Preencha os campos abaixo
// quando tiver os destinos reais — enquanto vazios, a UI mostra os links em
// estado "não configurado" em vez de apontar para URLs inventadas.
export const profile = {
  github: "",
  linkedin: "",
  email: "",
  website: ""
};

export type ProfileLinkKey = keyof typeof profile;
