import type { APIRoute } from "astro";
import { absoluteAsset } from "../utils/url";

export const GET: APIRoute = () => {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${absoluteAsset("sitemap.xml")}\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
};
