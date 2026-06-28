// Ambient declaration for the Cloudflare Workers runtime virtual module exposed
// by @cloudflare/vite-plugin. `import { env } from "cloudflare:workers"` is
// resolved by the plugin at dev/build time and by workerd in production; this
// declaration only satisfies `tsc` (which doesn't know about the virtual
// module). We type `env` as the project's per-deployment secrets/vars.
declare module "cloudflare:workers" {
  export const env: {
    TYASHIN_API_KEY?: string;
    TYASHIN_API_BASE?: string;
    API_BASE_URL?: string;
    [key: string]: unknown;
  };
}
