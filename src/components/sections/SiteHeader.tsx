import { Leaf } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { siteConfig, whatsappLink } from "@/config/site";
import { useBlogHasPosts } from "@/lib/blog";

export function SiteHeader() {
  const blogHasPosts = useBlogHasPosts();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-forest text-cream">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold tracking-tight text-forest">
              {siteConfig.name}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {siteConfig.tagline}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
          <a href="#facilities" className="hover:text-forest">
            Facilities
          </a>
          <a href="#gallery" className="hover:text-forest">
            Gallery
          </a>
          <a href="#about" className="hover:text-forest">
            About
          </a>
          <a href="#location" className="hover:text-forest">
            Location
          </a>
          <a href="#contact" className="hover:text-forest">
            Contact
          </a>
          {blogHasPosts && (
            <Link to="/blog" className="hover:text-forest">
              Blog
            </Link>
          )}
        </nav>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-forest px-4 py-2 text-sm font-semibold text-cream shadow-soft transition hover:opacity-95"
        >
          <span className="hidden sm:inline">Chat on WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
