import type { APIRoute } from "astro";
import { projects } from "../data/projects";
import { absoluteUrl } from "../utils/url";

// URLs geradas a partir dos mesmos dados/rotas do site — nenhuma URL é escrita à mão
// aqui ou em outro arquivo. absoluteUrl() já respeita SITE_URL e BASE_PATH.
export const GET: APIRoute = () => {
  const routes = ["", ...projects.filter((project) => project.hasDetailPage).map((project) => `projetos/${project.slug}`)];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${absoluteUrl(route)}</loc></url>`).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
