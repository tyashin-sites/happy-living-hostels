import { Leaf, MapPin, Phone, BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { siteConfig, whatsappLink } from "@/config/site";
import { useBlogHasPosts } from "@/lib/blog";

export function SiteFooter() {
  const blogHasPosts = useBlogHasPosts();
  return (
    <footer className="border-t border-forest/15 bg-forest text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10">
              <Leaf className="h-4 w-4 text-gold" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-lg font-bold">{siteConfig.name}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-cream/70">
                {siteConfig.tagline}
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-cream/70">
            A homely premium girls PG offering comfort, safety and care in Roop Nagar, Delhi.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Visit</h3>
          <p className="mt-4 flex items-start gap-2 text-sm text-cream/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
            </span>
          </p>
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-gold hover:underline"
          >
            Open in Google Maps →
          </a>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Connect</h3>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-2 text-sm text-cream/80 hover:text-cream"
          >
            <Phone className="h-4 w-4" />
            WhatsApp · {siteConfig.whatsappDisplay}
          </a>
          <a
            href={`tel:${siteConfig.whatsappNumber}`}
            className="mt-2 flex items-center gap-2 text-sm text-cream/80 hover:text-cream"
          >
            <Phone className="h-4 w-4" />
            Call · {siteConfig.whatsappDisplay}
          </a>
          {blogHasPosts && (
            <Link
              to="/blog"
              reloadDocument
              className="mt-2 flex items-center gap-2 text-sm text-cream/80 hover:text-cream"
            >
              <BookOpen className="h-4 w-4" />
              Read our Blog
            </Link>
          )}
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-cream/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            {siteConfig.meta.audience} · {siteConfig.promise}
          </p>
        </div>
      </div>
    </footer>
  );
}
