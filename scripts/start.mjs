#!/usr/bin/env node
/**
 * Build-aware start.
 *
 *   npm start            reuse a valid build, rebuild only if missing or stale
 *   npm start -- --force wipe .next and rebuild from scratch
 *   npm start -- -p 4000 extra flags are forwarded to `next start`
 *
 * NODE_ENV is pinned to production. `next build` inherits the shell's value,
 * and a non-production value makes it emit a dev-mode error page that imports
 * next/document, which fails prerendering /404 with a confusing <Html> error.
 */

import { spawnSync, spawn } from "node:child_process";
import { existsSync, statSync, rmSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const distDir = process.env.NEXT_DIST_DIR || ".next";
const buildId = join(root, distDir, "BUILD_ID");

const argv = process.argv.slice(2);
const force = argv.includes("--force") || argv.includes("-f");
const passthrough = argv.filter((a) => a !== "--force" && a !== "-f");

const env = { ...process.env, NODE_ENV: "production" };

// Files that invalidate a build when touched.
const WATCH = ["app", "components", "lib", "public", "next.config.mjs", "package.json", "tailwind.config.ts", ".env"];
const SKIP = new Set(["node_modules", ".next", ".git"]);

const newestMtime = (path) => {
  if (!existsSync(path)) return 0;
  const st = statSync(path);
  if (!st.isDirectory()) return st.mtimeMs;
  let newest = 0;
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    newest = Math.max(newest, newestMtime(join(path, entry.name)));
  }
  return newest;
};

const log = (msg) => console.log(`\x1b[36m[start]\x1b[0m ${msg}`);
const warn = (msg) => console.log(`\x1b[33m[start]\x1b[0m ${msg}`);

if (process.env.NODE_ENV && process.env.NODE_ENV !== "production") {
  warn(`shell NODE_ENV is "${process.env.NODE_ENV}"; overriding to "production" for build and serve`);
}

let reason = null;
if (force) {
  reason = "--force requested";
  if (existsSync(join(root, distDir))) rmSync(join(root, distDir), { recursive: true, force: true });
} else if (!existsSync(buildId)) {
  reason = `no build found in ${distDir}/`;
} else {
  const builtAt = statSync(buildId).mtimeMs;
  const changed = WATCH.map((w) => [w, newestMtime(join(root, w))])
    .filter(([, mtime]) => mtime > builtAt)
    .map(([name]) => name);
  if (changed.length) reason = `source newer than build: ${changed.join(", ")}`;
}

if (reason) {
  log(`rebuilding (${reason})`);
  const build = spawnSync("npx", ["next", "build"], { cwd: root, stdio: "inherit", env });
  if (build.status !== 0) {
    warn("build failed; not starting the server");
    process.exit(build.status ?? 1);
  }
  log("build complete");
} else {
  log("build is current, reusing it");
}

log(`starting server${passthrough.length ? ` (${passthrough.join(" ")})` : ""}`);
const server = spawn("npx", ["next", "start", ...passthrough], { cwd: root, stdio: "inherit", env });
server.on("exit", (code) => process.exit(code ?? 0));
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => server.kill(sig));
