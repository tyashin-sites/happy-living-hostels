// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // `src/lib/blog.ts` reads the project's TYASHIN_API_KEY from the Cloudflare
  // Workers runtime via `await import("cloudflare:workers")`. That specifier is
  // a runtime-only virtual module provided by workerd/@cloudflare/vite-plugin —
  // it has no on-disk source, so Rollup must treat it as external. The TanStack
  // Start server-fn split (`?tss-serverfn-split`) builds its own sub-graph that
  // doesn't inherit the plugin's defaults, so mark it external at the raw Rollup
  // level. (Do NOT use `ssr.external`/`resolve.external` here — @cloudflare/vite-
  // plugin rejects those in a Worker environment.) Keeping it external leaves the
  // import in the server bundle for the runtime to resolve, and keeps the key
  // server-only — it never enters the client graph.
  vite: {
    build: {
      rollupOptions: {
        external: ["cloudflare:workers"],
      },
    },
  },
});
