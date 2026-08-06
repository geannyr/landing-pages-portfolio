import { defineConfig } from "astro/config";
import { devStaticProjectsPlugin } from "./scripts/dev-static-projects-plugin.mjs";

// BASE_PATH e SITE_URL controlam onde o build final vai ser publicado.
// - Vercel / Netlify (domínio próprio na raiz): não defina nada, os padrões abaixo servem.
// - GitHub Pages (subdiretório): defina BASE_PATH=/landing-pages-portfolio/ antes do build.
// Veja docs/deploy.md para o comando completo de cada provedor.
const base = process.env.BASE_PATH || "/";
const site = process.env.SITE_URL || "https://seu-usuario.github.io";

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  vite: {
    plugins: [devStaticProjectsPlugin()]
  }
});
