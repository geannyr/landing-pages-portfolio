import { profile } from "../data/profile";

// Ativa qualquer link marcado com [data-contact="github|linkedin|email|website|repositoryUrl"].
// Enquanto o destino não estiver preenchido em src/data/profile.ts, o link fica
// sem href (não navega, não é uma ação falsa) e um clique anuncia o estado via
// a região aria-live global. Para campos genuinamente opcionais (website,
// repositoryUrl), prefira nem renderizar o elemento no template — este estado
// "desabilitado" é o fallback para quando o elemento existe mesmo assim.
export function setupContactLinks(root: ParentNode = document): void {
  root.querySelectorAll<HTMLAnchorElement>("[data-contact]").forEach((link) => {
    const key = link.dataset.contact as keyof typeof profile | undefined;
    const url = key ? profile[key] : "";

    if (url) {
      // profile.email já inclui o esquema mailto: — nenhum outro campo precisa de prefixo.
      link.href = url;
      link.removeAttribute("aria-disabled");

      if (key !== "email") {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }

      return;
    }

    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const status = document.querySelector(".global-status");

      if (status) {
        status.textContent = "Link de contato ainda não configurado.";
      }
    });
  });
}
