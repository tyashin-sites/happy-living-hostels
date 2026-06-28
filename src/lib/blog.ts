// Blog data helpers.
//
// The Tyashin platform serves blog JSON on THIS site's own origin under
// `/_tyashin/blog/...`. During SSR a bare relative URL can't be fetched (the
// server `fetch` needs an absolute URL), so we derive the origin from the
// incoming request via TanStack Start's request context. On the client an
// in-app navigation can use a relative URL directly.
//
// `getRequest()` (this version of @tanstack/react-start has no `getWebRequest`)
// returns the current Request during server execution; we read its origin.

export type BlogListItem = {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  authorName?: string;
  tags: string[];
  pinned: boolean;
  readTime?: number;
  publishedAt: string;
};

export type BlogListResponse = {
  active: boolean;
  posts: BlogListItem[];
  total: number;
  page: number;
  totalPages: number;
};

export type BlogPostFull = {
  slug: string;
  title: string;
  excerpt?: string;
  featuredImage?: string;
  authorName?: string;
  tags: string[];
  pinned: boolean;
  readTime?: number;
  publishedAt: string;
  updatedAt?: string;
  content: string; // HTML
  contentFormat?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
};

export type BlogMeta = {
  active: boolean;
  hasPosts: boolean;
};

import { getRouteApi } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

const rootRouteApi = getRouteApi("__root__");

/**
 * SSR-safe hook reading the root loader's `blogHasPosts` flag. Used by
 * SiteHeader/SiteFooter to render the "Blog" nav link only when posts exist.
 */
export function useBlogHasPosts(): boolean {
  const data = rootRouteApi.useLoaderData();
  return Boolean(data?.blogHasPosts);
}

/**
 * Build a fetchable URL for a `/_tyashin/...` path that works in both
 * environments. On the client an in-app navigation can fetch a relative URL;
 * on the server `fetch` needs an absolute URL, so we derive the origin from the
 * incoming request. `createIsomorphicFn` keeps the server-only import
 * (`@tanstack/react-start/server`) out of the client bundle entirely — without
 * it the import-protection plugin rejects the build.
 */
const blogUrl = createIsomorphicFn()
  .client((path: string) => path)
  .server((path: string) => {
    const origin = new URL(getRequest().url).origin;
    return `${origin}${path}`;
  });

async function fetchJson<T>(path: string): Promise<T> {
  const url = blogUrl(path);
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Blog fetch failed (${res.status}) for ${path}`);
  }
  return (await res.json()) as T;
}

export async function fetchBlogList(opts?: { page?: number }): Promise<BlogListResponse> {
  const page = opts?.page && opts.page > 0 ? opts.page : 1;
  const limit = 9;
  return fetchJson<BlogListResponse>(`/_tyashin/blog/posts?page=${page}&limit=${limit}`);
}

export async function fetchBlogPost(slug: string): Promise<BlogPostFull | null> {
  const data = await fetchJson<{ active: boolean; post: BlogPostFull | null }>(
    `/_tyashin/blog/posts/${encodeURIComponent(slug)}`,
  );
  if (!data.active) return null;
  return data.post;
}

export async function fetchBlogMeta(): Promise<BlogMeta> {
  try {
    return await fetchJson<BlogMeta>(`/_tyashin/blog/meta`);
  } catch {
    // Never let a meta-fetch failure break header/footer rendering.
    return { active: false, hasPosts: false };
  }
}

/** Format an ISO date as e.g. "12 March 2026" for display. */
export function formatBlogDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
