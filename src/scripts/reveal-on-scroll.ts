// Entrada suave dos elementos .reveal ao entrarem na viewport.
// Roda em astro:page-load (dispara na carga inicial E depois de cada navegação do
// ClientRouter) em vez de DOMContentLoaded, que só dispararia uma vez.
//
// O estado oculto só existe quando <html> tem a classe "js-reveal", adicionada por
// um script síncrono no <head> apenas se IntersectionObserver existir — sem JS, sem
// suporte a IO ou com prefers-reduced-motion, o CSS mantém tudo visível por padrão
// (ver src/styles/global.css). Isso evita flash de conteúdo e garante que nada
// fique permanentemente invisível.
let observer: IntersectionObserver | undefined;

function initReveal(): void {
  if (!("IntersectionObserver" in window)) {
    return;
  }

  // Desconecta o observer da navegação anterior antes de criar um novo — evita
  // observers acumulados e callbacks duplicados entre trocas de página do ClientRouter.
  observer?.disconnect();

  const elements = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");

  if (elements.length === 0) {
    observer = undefined;
    return;
  }

  observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((element) => observer!.observe(element));
}

document.addEventListener("astro:page-load", initReveal);
