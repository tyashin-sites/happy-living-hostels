import { MessageCircle, Phone } from "lucide-react";
import { siteConfig, whatsappLink } from "@/config/site";

export function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-cream py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 leaf-divider opacity-30"
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-leaf">
          Book a visit
        </span>
        <h2 className="mt-3 font-display text-4xl font-bold text-forest md:text-5xl">
          Ready to call Happy Living home?
        </h2>
        <p className="mt-5 text-muted-foreground">
          Message us on WhatsApp for room availability, pricing and to schedule
          a visit. We usually reply within minutes.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-forest px-7 py-3.5 text-sm font-semibold text-cream shadow-elevated transition hover:translate-y-[-1px]"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
          <a
            href={`tel:${siteConfig.whatsappNumber}`}
            className="inline-flex items-center gap-2 rounded-full border border-forest/25 bg-cream px-7 py-3.5 text-sm font-semibold text-forest hover:bg-forest/5"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.whatsappDisplay}
          </a>
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {siteConfig.meta.audience} · {siteConfig.address.full}
        </p>
      </div>
    </section>
  );
}
