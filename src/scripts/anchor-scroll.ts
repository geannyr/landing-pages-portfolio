// Garante que a rolagem até uma âncora (#projetos, #processo, #qualidade,
// #contato) pouse com o título totalmente visível abaixo do header sticky.
//
// Usa scrollIntoView() nativo — que já respeita o scroll-margin-top definido em
// global.css — em vez de calcular a posição manualmente. Necessário porque o
// ClientRouter do Astro (astro:transitions) assume o controle da rolagem antes
// que o navegador processe o hash da URL na carga inicial (e ao navegar de volta
// para uma URL com hash), sobrescrevendo o comportamento nativo de "scroll to
// fragment on load". scroll-padding-top/scroll-margin-top (CSS) continuam sendo
// a fonte da posição correta; este script só garante que scrollIntoView() seja
// chamado nos momentos em que o ClientRouter, de outra forma, o impediria.
function scrollToHashTarget(): void {
  const hash = window.location.hash;

  if (!hash) {
    return;
  }

  let target: Element | null;

  try {
    target = document.querySelector(hash);
  } catch {
    return;
  }

  target?.scrollIntoView({ block: "start" });
}

// astro:page-load cobre a carga inicial e as navegações completas do
// ClientRouter (incluindo voltar/avançar do navegador para uma URL com hash).
// setTimeout(0): o próprio ClientRouter mexe em history.scrollRestoration e na
// posição de rolagem de forma síncrona durante o mesmo evento "load" — adiar
// para a próxima tarefa garante que scrollToHashTarget rode depois disso, não
// no meio.
document.addEventListener("astro:page-load", () => setTimeout(scrollToHashTarget, 0));

// hashchange cobre clicar em um link de âncora enquanto já se está na mesma
// página — o ClientRouter não trata isso como uma navegação de página.
window.addEventListener("hashchange", scrollToHashTarget);
