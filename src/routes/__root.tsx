import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { getBlogMeta } from "@/lib/blog";

// PERF: self-hosted fonts via @fontsource (bundled woff2, font-display:swap)
// replace the render-blocking Google Fonts <link> that used to sit in this
// route's `head`. Same families/weights as before:
//   Playfair Display 400/600/700/800/900 (+ italic 400/600) -> --font-display
//   Inter 400/500/600/700                                    -> --font-sans
// Only the `latin` subset is imported to keep the bundle lean.
import "@fontsource/playfair-display/latin-400.css";
import "@fontsource/playfair-display/latin-600.css";
import "@fontsource/playfair-display/latin-700.css";
import "@fontsource/playfair-display/latin-800.css";
import "@fontsource/playfair-display/latin-900.css";
import "@fontsource/playfair-display/latin-400-italic.css";
import "@fontsource/playfair-display/latin-600-italic.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // SSR-fetch blog availability once at the root so SiteHeader/SiteFooter can
  // gate the "Blog" nav link on whether any posts exist. Exposed via loader
  // data and read with `useRouteContext`-style access below.
  loader: async () => {
    const meta = await getBlogMeta();
    return { blogHasPosts: meta.active && meta.hasPosts };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    // Fonts are self-hosted via @fontsource (imported at the top of this file),
    // so there is NO render-blocking Google Fonts <link> here anymore.
    // Only the app stylesheet is linked.
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  // PERF: inline the base theme background on <html>/<body> so the cream paints
  // on the very first frame (no white-flash filmstrip frames that inflate the
  // mobile Speed Index). #F8F4E1 is the resolved sRGB value of the design
  // token --background = oklch(0.965 0.025 95). overflow-x-clip on <body>
  // prevents the decorative blur blobs from causing horizontal scroll.
  // NOTE: no <link href="/brand-kit.css"> here — the Tyashin dispatch layer
  // inlines the brand kit as a <style> when the link is absent.
  return (
    <html lang="en" style={{ backgroundColor: "#F8F4E1" }}>
      <head>
        <HeadContent />
      </head>
      <body className="overflow-x-clip" style={{ backgroundColor: "#F8F4E1" }}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
