import { MapPin, Train, Navigation } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Location() {
  return (
    <section id="location" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 rounded-3xl border border-forest/10 bg-gradient-forest p-8 text-cream shadow-elevated md:p-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Find us
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Easy connectivity, calm neighbourhood.
            </h2>
            <p className="mt-4 max-w-md text-cream/80">
              Walking distance from the nearest metro station and surrounded by
              colleges, hospitals and daily essentials.
            </p>

            <dl className="mt-8 space-y-5 text-sm">
              <div className="flex gap-3">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-cream/10">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-gold/80">
                    Address
                  </dt>
                  <dd className="mt-0.5 font-medium">
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.line2}
                  </dd>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-cream/10">
                  <Train className="h-4 w-4" />
                </span>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-gold/80">
                    Connectivity
                  </dt>
                  <dd className="mt-0.5 font-medium">
                    {siteConfig.meta.nearMetro} · {siteConfig.meta.connectivity}
                  </dd>
                </div>
              </div>
            </dl>

            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-forest transition hover:opacity-90"
            >
              <Navigation className="h-4 w-4" />
              Open in Google Maps
            </a>
          </div>

          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Happy Living location on Google Maps"
            className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-cream/15 bg-cream/5"
          >
            <div
              aria-hidden
              className="absolute inset-0 leaf-divider opacity-20"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-forest shadow-elevated transition group-hover:scale-110">
                <MapPin className="h-7 w-7" />
              </div>
              <p className="mt-4 font-display text-xl">Roop Nagar, Delhi</p>
              <p className="mt-1 text-sm text-cream/70">Tap to view on Maps</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
