// Blog data helpers.
//
// The Tyashin platform exposes a PUBLIC blog API on its OWN, separate hostname
// (`https://website-api.tyashin.com`). We deliberately do NOT fetch this site's
// own origin (`/_tyashin/blog/...`): in production this is a Cloudflare-
// dispatched site worker, and a worker fetching its own hostname re-enters the
// platform dispatch worker and 500s (CF dispatch self-fetch limitation).
//
// All three fetches (list, single post, hasPosts) run through `createServerFn`
// so they ALWAYS execute server-side — even on a client/SPA navigation. That
// keeps the project's `TYASHIN_API_KEY` secret out of the client bundle: the
// key is read from the Cloudflare Workers runtime env inside the server-fn
// handler only.

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
import { createServerFn } from "@tanstack/react-start";

const rootRouteApi = getRouteApi("__root__");

/**
 * SSR-safe hook reading the root loader's `blogHasPosts` flag. Used by
 * SiteHeader/SiteFooter to render the "Blog" nav link only when posts exist.
 */
export function useBlogHasPosts(): boolean {
  const data = rootRouteApi.useLoaderData();
  return Boolean(data?.blogHasPosts);
}

const DEFAULT_API_BASE = "https://website-api.tyashin.com";
const LIST_LIMIT = 9;

// ---------------------------------------------------------------------------
// Server-only API access. Everything below `resolveEnv` runs exclusively inside
// `createServerFn().handler(...)` bodies, which the TanStack Start vite plugin
// strips from the client bundle. The `cloudflare:workers` import is dynamic and
// only reached on the server, so the worker-runtime virtual module never leaks
// into the client graph.
// ---------------------------------------------------------------------------

type WorkerEnv = {
  TYASHIN_API_KEY?: string;
  TYASHIN_API_BASE?: string;
  API_BASE_URL?: string;
};

/** Read the project's API key + base URL from the Cloudflare Workers runtime env. */
async function resolveEnv(): Promise<{ key: string | undefined; base: string }> {
  let env: WorkerEnv = {};
  try {
    const mod = (await import("cloudflare:workers")) as { env?: WorkerEnv };
    env = mod.env ?? {};
  } catch {
    // Outside the Workers runtime (e.g. a non-CF SSR dev context) fall back to
    // process.env if present. Never throw — fail closed downstream instead.
    env = (typeof process !== "undefined" ? (process.env as WorkerEnv) : {}) ?? {};
  }
  const base = env.TYASHIN_API_BASE || env.API_BASE_URL || DEFAULT_API_BASE;
  return { key: env.TYASHIN_API_KEY, base: base.replace(/\/+$/, "") };
}

type PublicPost = {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  contentFormat?: string;
  featuredImage?: string;
  authorName?: string;
  categoryId?: string;
  tags?: string[];
  pinned?: boolean;
  readTime?: number;
  seo?: BlogPostFull["seo"];
  publishedAt: string;
  updatedAt?: string;
  viewCount?: number;
};

type PublicListEnvelope = {
  success?: boolean;
  data?: PublicPost[];
  meta?: { page?: number; limit?: number; total?: number; totalPages?: number };
};

type PublicPostEnvelope = {
  success?: boolean;
  data?: PublicPost | null;
};

function mapListItem(p: PublicPost): BlogListItem {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    featuredImage: p.featuredImage,
    authorName: p.authorName,
    tags: Array.isArray(p.tags) ? p.tags : [],
    pinned: Boolean(p.pinned),
    readTime: p.readTime,
    publishedAt: p.publishedAt,
  };
}

function mapPostFull(p: PublicPost): BlogPostFull {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    featuredImage: p.featuredImage,
    authorName: p.authorName,
    tags: Array.isArray(p.tags) ? p.tags : [],
    pinned: Boolean(p.pinned),
    readTime: p.readTime,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    content: p.content,
    contentFormat: p.contentFormat,
    seo: p.seo,
  };
}

async function fetchPublicJson<T>(base: string, key: string, path: string): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    headers: { "X-API-Key": key, accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Blog API ${res.status} for ${path}`);
  }
  return (await res.json()) as T;
}

// ---------------------------------------------------------------------------
// Server functions — the public surface called by route loaders.
// ---------------------------------------------------------------------------

/**
 * Fetch a page of blog posts from the platform's public API. Posts come back
 * already pinned/featured-first then newest. Fails closed: any error yields an
 * empty/inactive list so the route renders notFound rather than a 500.
 */
export const listPosts = createServerFn({ method: "GET" })
  .validator((data: { page?: number } | undefined) => ({
    page: data?.page && data.page > 0 ? Math.floor(data.page) : 1,
  }))
  .handler(async ({ data }): Promise<BlogListResponse> => {
    const page = data.page;
    const empty: BlogListResponse = { active: false, posts: [], total: 0, page, totalPages: 0 };
    try {
      const { key, base } = await resolveEnv();
      if (!key) return empty;
      const json = await fetchPublicJson<PublicListEnvelope>(
        base,
        key,
        `/api/v1/public/blog/posts?page=${page}&limit=${LIST_LIMIT}`,
      );
      const posts = Array.isArray(json.data) ? json.data.map(mapListItem) : [];
      const total = json.meta?.total ?? 0;
      const totalPages = json.meta?.totalPages ?? (total > 0 ? 1 : 0);
      return { active: total > 0, posts, total, page: json.meta?.page ?? page, totalPages };
    } catch {
      return empty;
    }
  });

/**
 * Fetch a single post by slug from the platform's public API. Returns `null`
 * (route renders notFound) on miss, empty data, or any fetch/parse error.
 */
export const getPost = createServerFn({ method: "GET" })
  .validator((data: { slug: string }) => ({ slug: String(data.slug) }))
  .handler(async ({ data }): Promise<BlogPostFull | null> => {
    try {
      const { key, base } = await resolveEnv();
      if (!key) return null;
      const json = await fetchPublicJson<PublicPostEnvelope>(
        base,
        key,
        `/api/v1/public/blog/posts/${encodeURIComponent(data.slug)}`,
      );
      if (!json.data) return null;
      return mapPostFull(json.data);
    } catch {
      return null;
    }
  });

/**
 * Derive blog availability for the root loader (header/footer "Blog" nav gate).
 * No dedicated `/meta` endpoint exists — we ask the list endpoint for a single
 * post and read `meta.total`. Fails closed to "no blog".
 */
export const getBlogMeta = createServerFn({ method: "GET" }).handler(
  async (): Promise<BlogMeta> => {
    try {
      const { key, base } = await resolveEnv();
      if (!key) return { active: false, hasPosts: false };
      const json = await fetchPublicJson<PublicListEnvelope>(
        base,
        key,
        `/api/v1/public/blog/posts?page=1&limit=1`,
      );
      const total = json.meta?.total ?? 0;
      return { active: total > 0, hasPosts: total > 0 };
    } catch {
      return { active: false, hasPosts: false };
    }
  },
);

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
