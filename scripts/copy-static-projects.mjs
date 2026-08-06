#!/usr/bin/env node
// Copia projetos estáticos (vanilla) para dist/ depois do `astro build`.
// saude/ (e futuros projetos vanilla) ficam fora de public/ de propósito:
// existe uma única fonte de verdade no repositório, sem duplicação.
// Para adicionar um novo projeto estático, inclua o nome da pasta na lista abaixo.
import { existsSync, rmSync, cpSync } from "node:fs";
import { join, dirname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { STATIC_PROJECTS } from "./static-projects.config.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const distDir = join(repoRoot, "dist");

// Arquivos que existem no projeto fonte mas não devem ir para o deploy.
const EXCLUDED_NAMES = new Set(["README.md", ".DS_Store", "Thumbs.db"]);

function basename(path) {
  return path.split(sep).join("/").split("/").pop();
}

function copyProject(name) {
  const source = join(repoRoot, name);
  const entryPoint = join(source, "index.html");
  const destination = join(distDir, name);

  if (!existsSync(entryPoint)) {
    throw new Error(
      `"${name}/index.html" não encontrado em ${source}. ` +
        `Verifique se o projeto existe e possui um index.html antes de rodar o build.`
    );
  }

  if (existsSync(destination)) {
    rmSync(destination, { recursive: true, force: true });
  }

  cpSync(source, destination, {
    recursive: true,
    filter(src) {
      return !EXCLUDED_NAMES.has(basename(src));
    }
  });

  console.log(`[copy-static-projects] ${name}/ -> dist/${name}/`);
}

if (!existsSync(distDir)) {
  console.error('[copy-static-projects] Pasta "dist/" não encontrada. Rode "astro build" antes deste script.');
  process.exit(1);
}

let hasError = false;

for (const name of STATIC_PROJECTS) {
  try {
    copyProject(name);
  } catch (error) {
    hasError = true;
    console.error(`[copy-static-projects] Falha ao copiar "${name}": ${error.message}`);
  }
}

if (hasError) {
  process.exit(1);
}
