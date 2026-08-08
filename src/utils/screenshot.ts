import { existsSync } from "node:fs";
import { join } from "node:path";
import { asset } from "./url";

// Convenção de nome: public/images/projects/{slug}-preview.webp. A checagem
// roda em build time (Node, lado do build do Astro) — não inventa screenshot:
// só usa a imagem real se o arquivo existir no repositório.
function relativePath(slug: string): string {
  return `images/projects/${slug}-preview.webp`;
}

// process.cwd() (não import.meta.url) porque o Vite/Astro empacota este
// módulo em dist/.prerender/chunks/ durante o build — um caminho relativo
// baseado em import.meta.url resolveria para dentro de dist/, não para a
// raiz real do projeto. `astro dev`/`build`/`check` sempre rodam com cwd
// na raiz do repositório (via npm scripts), então isso é estável nos três.
export function hasProjectScreenshot(slug: string): boolean {
  const absolutePath = join(process.cwd(), "public", relativePath(slug));
  return existsSync(absolutePath);
}

export function projectScreenshotUrl(slug: string): string {
  return asset(relativePath(slug));
}
