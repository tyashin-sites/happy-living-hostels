import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { siteConfig } from "@/config/site";
import { getPost, formatBlogDate } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPost({ data: { slug: params.slug } });
    if (!post) {
      throw notFound();
    }
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const post = loaderData;
    const title = `${post.seo?.metaTitle || post.title} — Happy Living`;
    const description = post.seo?.metaDescription || post.excerpt || "";
    const image = post.seo?.ogImage || post.featuredImage;
    const url = `/blog/${post.slug}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(image ? [{ property: "og:image", content: image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(image ? [{ name: "twitter:image", content: image }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            ...(image ? { image: [image] } : {}),
            author: {
              "@type": post.authorName ? "Person" : "Organization",
              name: post.authorName || siteConfig.name,
            },
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": url,
            },
          }),
        },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const post = Route.useLoaderData();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-3xl px-5 pb-20 pt-12 md:pt-16">
          <Link
            to="/blog"
            reloadDocument
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-leaf transition hover:text-forest"
          >
            ← All articles
          </Link>

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-forest"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-forest md:text-[2.75rem]">
            {post.title}
          </h1>

          <p className="mt-5 text-sm font-medium uppercase tracking-[0.12em] text-foreground/55">
            {formatBlogDate(post.publishedAt)}
            {post.authorName ? ` · ${post.authorName}` : ""}
            {post.readTime ? ` · ${post.readTime} min read` : ""}
          </p>

          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover shadow-elevated"
            />
          )}

          <div
            className="blog-prose mt-10"
            // Content is platform-authored trusted HTML served same-origin.
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="leaf-divider mt-14 h-4 w-32 opacity-70" aria-hidden />

          <Link
            to="/blog"
            reloadDocument
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf transition hover:text-forest"
          >
            ← Back to all articles
          </Link>
        </article>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
