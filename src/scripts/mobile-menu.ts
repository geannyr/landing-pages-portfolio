// Menu mobile acessível: aria-expanded, fecha com Escape, fecha ao selecionar
// link e restaura o estado ao redimensionar para desktop.
export function setupMobileMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
  const nav = document.querySelector<HTMLElement>("#site-nav");

  if (!toggle || !nav) {
    return;
  }

  function setMenuState(isOpen: boolean): void {
    const accessibleText = toggle!.querySelector(".sr-only");

    toggle!.setAttribute("aria-expanded", String(isOpen));
    nav!.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);

    if (accessibleText) {
      accessibleText.textContent = isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação";
    }
  }

  toggle.addEventListener("click", () => {
    setMenuState(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target.matches("a") && !target.hasAttribute("aria-disabled")) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenuState(false);
      toggle.focus();
    }
  });

  const desktopViewport = window.matchMedia("(min-width: 1024px)");

  desktopViewport.addEventListener("change", (event) => {
    if (event.matches) {
      setMenuState(false);
    }
  });
}
