// Plugin Vite usado apenas em `astro dev`.
// Serve os projetos estáticos listados em static-projects.config.mjs (ex.: saude/)
// diretamente da raiz do repositório, para que os links do catálogo funcionem em
// desenvolvimento sem precisar rodar `astro build` a cada alteração.
//
// Em produção esse plugin não é usado: dist/saude/ é gerado por
// scripts/copy-static-projects.mjs depois do build.
import { createReadStream, existsSync, statSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { STATIC_PROJECTS } from "./static-projects.config.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8"
};

export function devStaticProjectsPlugin() {
  return {
    name: "dev-static-projects",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) {
          return next();
        }

        // Astro resolve `base` (astro.config.mjs) para server.config.base em runtime,
        // então o mesmo BASE_PATH usado no build funciona aqui sem valores fixos.
        const base = server.config.base && server.config.base !== "/" ? server.config.base : "/";
        const requestPath = req.url.split("?")[0];

        if (!requestPath.startsWith(base)) {
          return next();
        }

        const pathAfterBase = requestPath.slice(base.length);
        const segments = pathAfterBase.split("/");
        const projectName = segments[0];

        if (!STATIC_PROJECTS.includes(projectName)) {
          return next();
        }

        const projectRoot = resolve(repoRoot, projectName);
        let relativePath = segments.slice(1).join("/");

        if (relativePath === "" || relativePath.endsWith("/")) {
          relativePath += "index.html";
        }

        const filePath = resolve(projectRoot, relativePath);

        // Impede sair da pasta do projeto (ex.: "../../package.json").
        const isInsideProject = filePath === projectRoot || filePath.startsWith(projectRoot + sep);

        if (!isInsideProject) {
          res.statusCode = 403;
          res.end("Forbidden");
          return;
        }

        if (!existsSync(filePath) || !statSync(filePath).isFile()) {
          return next();
        }

        const ext = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
        res.setHeader("Content-Type", MIME_TYPES[ext] ?? "application/octet-stream");
        createReadStream(filePath).pipe(res);
      });
    }
  };
}
