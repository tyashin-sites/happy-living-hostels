import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { listPosts, formatBlogDate } from "@/lib/blog";
import { siteConfig, siteUrl } from "@/config/site";

type BlogSearch = { page?: number };

export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>): BlogSearch => {
    const raw = Number(search.page);
    return Number.isFinite(raw) && raw > 1 ? { page: Math.floor(raw) } : {};
  },
  loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
  loader: async ({ deps }) => {
    const data = await listPosts({ data: { page: deps.page } });
    if (!data.active || data.posts.length === 0) {
      throw notFound();
    }
    return data;
  },
  head: () => ({
    meta: [
      { title: "Blog — Happy Living" },
      {
        name: "description",
        content:
          "Stories, tips and updates from Happy Living — life at our premium girls PG in Roop Nagar, Delhi.",
      },
      { property: "og:title", content: "Blog — Happy Living" },
      {
        property: "og:description",
        content:
          "Stories, tips and updates from Happy Living — life at our premium girls PG in Roop Nagar, Delhi.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/blog") },
      { property: "og:site_name", content: siteConfig.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blog — Happy Living" },
      {
        name: "twitter:description",
        content:
          "Stories, tips and updates from Happy Living — life at our premium girls PG in Roop Nagar, Delhi.",
      },
    ],
    links: [{ rel: "canonical", href: siteUrl("/blog") }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const page = search.page ?? 1;
  const { posts, totalPages } = data;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main>
        {/* Lede */}
        <section className="mx-auto max-w-6xl px-5 pb-4 pt-16 md:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-leaf">
            From the Happy Living family
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-forest md:text-5xl">
            Happy Living Blog
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Stories, tips and little moments from life at our premium girls PG in Roop Nagar, Delhi.
          </p>
          <div className="leaf-divider mt-8 h-4 w-32 opacity-70" aria-hidden />
        </section>

        {/* Card grid */}
        <section className="mx-auto max-w-6xl px-5 pb-20 pt-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                reloadDocument
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  {post.featuredImage ? (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-cream text-forest/40">
                      <span className="font-display text-2xl">Happy Living</span>
                    </div>
                  )}
                  {post.pinned && (
                    <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-forest shadow-soft">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-xl font-bold leading-snug text-forest transition group-hover:text-leaf">
                    {post.title}
                  </h2>
                  <p
                    className="mt-3 text-sm leading-relaxed text-muted-foreground"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <p className="mt-5 text-xs font-medium uppercase tracking-[0.12em] text-foreground/55">
                    {formatBlogDate(post.publishedAt)}
                    {post.authorName ? ` · ${post.authorName}` : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-14 flex items-center justify-between gap-4">
              {page > 1 ? (
                <Link
                  to="/blog"
                  search={{ page: page - 1 }}
                  reloadDocument
                  className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-card px-5 py-2.5 text-sm font-semibold text-forest transition hover:bg-secondary"
                >
                  ← Newer
                </Link>
              ) : (
                <span />
              )}

              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>

              {page < totalPages ? (
                <Link
                  to="/blog"
                  search={{ page: page + 1 }}
                  reloadDocument
                  className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-card px-5 py-2.5 text-sm font-semibold text-forest transition hover:bg-secondary"
                >
                  Older →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
