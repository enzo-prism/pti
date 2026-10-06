/**
 * ESM resolve hook that maps the repo's `@/` import alias to `src/`.
 *
 * Node's `--experimental-strip-types` runner does not read tsconfig paths,
 * so the `prebuild` search-index script registers this hook via
 * `scripts/register-alias.mjs`.
 */
import { pathToFileURL } from "node:url";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(scriptsDir, "..", "src");

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    let mapped = path.join(srcDir, specifier.slice(2));
    // Source imports omit the extension; strip-types needs it explicit.
    if (!path.extname(mapped) && existsSync(`${mapped}.ts`)) {
      mapped = `${mapped}.ts`;
    }
    return nextResolve(pathToFileURL(mapped).href, context);
  }
  if (
    (specifier.startsWith("./") || specifier.startsWith("../")) &&
    !path.extname(specifier)
  ) {
    const parentPath = fileURLToPath(context.parentURL);
    const candidate = path.resolve(path.dirname(parentPath), `${specifier}.ts`);
    if (existsSync(candidate)) {
      return nextResolve(pathToFileURL(candidate).href, context);
    }
  }
  return nextResolve(specifier, context);
}
