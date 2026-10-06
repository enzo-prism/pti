/**
 * Registers the `@/` -> `src/` resolve hook for node scripts that use
 * `--experimental-strip-types` (which does not read tsconfig paths).
 *
 * Usage: node --experimental-strip-types --import ./scripts/register-alias.mjs <script>
 */
import { register } from "node:module";

register("./alias-hooks.mjs", import.meta.url);
