import { MapPin, Train, ShieldCheck, ArrowRight } from "lucide-react";
import { siteConfig, whatsappLink } from "@/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-cream">
      {/* Decorative botanical accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-16 h-72 w-72 rounded-full bg-leaf/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-gold/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
            {siteConfig.meta.audience}
          </span>

          <h1 className="mt-6 font-display text-5xl font-black leading-[0.95] text-forest sm:text-6xl md:text-7xl">
            Happy
            <br />
            Living.
          </h1>

          <p className="mt-5 max-w-xl font-display text-xl italic text-forest/80">
            {siteConfig.promise}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            A premium girls PG in the heart of Roop Nagar, Delhi — designed for
            students and working women who want a safe, warm and well-equipped
            second home.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-forest px-6 py-3 text-sm font-semibold text-cream shadow-elevated transition hover:translate-y-[-1px]"
            >
              Connect on WhatsApp
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#facilities"
              className="inline-flex items-center gap-2 rounded-full border border-forest/25 px-6 py-3 text-sm font-semibold text-forest hover:bg-forest/5"
            >
              Explore facilities
            </a>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-forest/10 pt-6 text-sm">
            <div>
              <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                <Train className="h-3.5 w-3.5" /> Metro
              </dt>
              <dd className="mt-1 font-semibold text-forest">{siteConfig.meta.nearMetro}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" /> Safety
              </dt>
              <dd className="mt-1 font-semibold text-forest">24×7 Secured</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> Area
              </dt>
              <dd className="mt-1 font-semibold text-forest">Roop Nagar</dd>
            </div>
          </dl>
        </div>

        {/* Vintage seal / brand card */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-forest/15 bg-cream shadow-elevated">
            <div className="absolute inset-0 bg-gradient-forest" />
            <div className="absolute inset-3 rounded-[1.4rem] border border-gold/40" />

            {/* Leaves */}
            <svg
              aria-hidden
              viewBox="0 0 200 200"
              className="absolute -left-6 -top-6 h-40 w-40 text-leaf/70"
              fill="currentColor"
            >
              <path d="M30 10c40 0 80 30 90 80-50-5-90-35-90-80z" />
              <path d="M10 60c30-5 70 15 90 60-40 0-80-20-90-60z" opacity=".7" />
            </svg>
            <svg
              aria-hidden
              viewBox="0 0 200 200"
              className="absolute -bottom-6 -right-6 h-44 w-44 rotate-180 text-leaf/70"
              fill="currentColor"
            >
              <path d="M30 10c40 0 80 30 90 80-50-5-90-35-90-80z" />
              <path d="M10 60c30-5 70 15 90 60-40 0-80-20-90-60z" opacity=".7" />
            </svg>

            <div className="relative flex h-full flex-col items-center justify-center px-8 text-center text-cream">
              <div className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-gold/70 bg-forest/40 p-4 shadow-elevated">
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-gold/50 text-center">
                  <span className="font-display text-xs uppercase tracking-[0.25em] text-gold">
                    Comfort
                  </span>
                  <span className="font-display text-xs uppercase tracking-[0.25em] text-gold">
                    Care
                  </span>
                  <span className="font-display text-xs uppercase tracking-[0.25em] text-gold">
                    Convenience
                  </span>
                </div>
              </div>
              <p className="mt-8 font-display text-2xl italic">Homely Stay,</p>
              <p className="font-display text-2xl italic">for every girl.</p>
              <div className="mt-6 h-px w-24 bg-gold/60" />
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-cream/80">
                Est. Roop Nagar · Delhi
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
