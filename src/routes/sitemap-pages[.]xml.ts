import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { siteUrl } from "@/config/site";
import { SITEMAP_PAGES } from "@/config/sitemap-pages";
import { getBlogMeta } from "@/lib/blog";

// `/sitemap-pages.xml` — the site's own list of STATIC (code-defined) routes.
//
// The Tyashin platform serves `/sitemap.xml` as a sitemap-INDEX the moment a
// site publishes this child. `/sitemap-pages.xml` is NOT a platform-registry
// path, so it dispatches to this site worker. Every <loc> is absolute and uses
// `siteUrl()` — the SAME canonical host as each page's <link rel="canonical">.
//
// Dynamic content (blog posts) is deliberately excluded: the platform emits it
// via `/sitemap-content.xml`. The single source list lives in
// `src/config/sitemap-pages.ts`.
export const Route = createFileRoute("/sitemap-pages.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Gate blog-dependent routes on whether the blog is active with posts.
        // getBlogMeta() is a server fn that safely hits the platform blog API
        // (never a self-origin fetch) and degrades to inactive on any error, so
        // the sitemap always renders at least "/".
        let blogActive = false;
        try {
          const meta = await getBlogMeta();
          blogActive = Boolean(meta.active && meta.hasPosts);
        } catch {
          blogActive = false;
        }

        const urls = SITEMAP_PAGES.filter(
          (p) => !p.requiresBlog || blogActive,
        ).map(
          (p) =>
            `  <url>\n    <loc>${siteUrl(p.path)}</loc>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`,
        );

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
