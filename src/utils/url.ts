// Centraliza a construção de URLs internas e absolutas, respeitando `base` e `site`
// definidos em astro.config.mjs (BASE_PATH / SITE_URL). Nenhum outro arquivo deve
// concatenar caminhos manualmente — assim o mesmo build funciona tanto na raiz de
// um domínio (Vercel/Netlify) quanto em um subdiretório (GitHub Pages).

const BASE = import.meta.env.BASE_URL; // sempre termina com "/"
const SITE = import.meta.env.SITE ?? "";

function normalizeSegment(path: string): string {
  return path.replace(/^\/+/, "").replace(/\/+$/, "");
}

/** Caminho interno relativo ao base path configurado. Ex.: withBase("saude") -> "/base/saude/" */
export function withBase(path = ""): string {
  const segment = normalizeSegment(path);
  return segment ? `${BASE}${segment}/` : BASE;
}

/** URL absoluta (para canonical, Open Graph, Twitter Card e sitemap). */
export function absoluteUrl(path = ""): string {
  return `${SITE.replace(/\/+$/, "")}${withBase(path)}`;
}

/** Caminho de um arquivo estático em public/ (sem barra final — não é uma rota). */
export function asset(path: string): string {
  return `${BASE}${normalizeSegment(path)}`;
}

/** URL absoluta de um arquivo (sitemap.xml, robots.txt, imagens) — sem barra final. */
export function absoluteAsset(path: string): string {
  return `${SITE.replace(/\/+$/, "")}${asset(path)}`;
}
