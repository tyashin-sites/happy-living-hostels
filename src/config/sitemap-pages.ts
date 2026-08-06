// Single source of truth for the site's own STATIC ("pages") routes.
//
// The Tyashin platform owns `/sitemap.xml` and turns it into a sitemap-INDEX
// that references this site's `/sitemap-pages.xml` (code/static routes, served
// here) plus the platform's `/sitemap-content.xml` (dynamic blog/product URLs
// the platform can enumerate on its own). The platform cannot see this repo's
// TanStack route tree, so we publish the static routes ourselves.
//
// Keep this list in sync with `src/routes/*`. List only code-defined static
// pages here — dynamic content (individual `/blog/$slug` posts) is intentionally
// NOT included, because the platform's `/sitemap-content.xml` enumerates those.
//
// Origins are made absolute with `siteUrl()` (src/config/site.ts), so every
// <loc> uses the exact same canonical host as the pages' <link rel="canonical">.

export interface SitemapPage {
  /** App path, e.g. "/" or "/blog". */
  path: string;
  changefreq: string;
  priority: string;
  /** Emit only when the blog is active with published posts. */
  requiresBlog?: boolean;
}

export const SITEMAP_PAGES: SitemapPage[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/blog", changefreq: "daily", priority: "0.8", requiresBlog: true },
];
