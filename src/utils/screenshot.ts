import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { asset } from "./url";

// Convenção de nome: public/images/projects/{slug}-preview.webp. A checagem
// roda em build time (Node, lado do build do Astro) — não inventa screenshot:
// só usa a imagem real se o arquivo existir no repositório.
function relativePath(slug: string): string {
  return `images/projects/${slug}-preview.webp`;
}

export function hasProjectScreenshot(slug: string): boolean {
  const absolutePath = fileURLToPath(new URL(`../../public/${relativePath(slug)}`, import.meta.url));
  return existsSync(absolutePath);
}

export function projectScreenshotUrl(slug: string): string {
  return asset(relativePath(slug));
}
