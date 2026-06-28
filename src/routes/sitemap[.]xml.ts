import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const entries = [{ path: "/", changefreq: "weekly", priority: "1.0" }];

        // Append blog routes when the blog is active and has posts.
        try {
          const origin = new URL(request.url).origin;
          const metaRes = await fetch(`${origin}/_tyashin/blog/meta`, {
            headers: { accept: "application/json" },
          });
          if (metaRes.ok) {
            const meta = (await metaRes.json()) as {
              active?: boolean;
              hasPosts?: boolean;
            };
            if (meta.active && meta.hasPosts) {
              entries.push({
                path: "/blog",
                changefreq: "daily",
                priority: "0.8",
              });
              // Walk all pages of the blog list to emit each post URL.
              let page = 1;
              let totalPages = 1;
              do {
                const listRes = await fetch(`${origin}/_tyashin/blog/posts?page=${page}&limit=50`, {
                  headers: { accept: "application/json" },
                });
                if (!listRes.ok) break;
                const list = (await listRes.json()) as {
                  posts?: { slug: string }[];
                  totalPages?: number;
                };
                totalPages = list.totalPages || 1;
                for (const p of list.posts || []) {
                  entries.push({
                    path: `/blog/${p.slug}`,
                    changefreq: "weekly",
                    priority: "0.7",
                  });
                }
                page += 1;
              } while (page <= totalPages);
            }
          }
        } catch {
          // Sitemap must never fail because of the blog feed.
        }
        const urls = entries.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
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
