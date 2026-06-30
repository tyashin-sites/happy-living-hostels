import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Facilities } from "@/components/sections/Facilities";
import { About } from "@/components/sections/About";
import { Gallery } from "@/components/sections/Gallery";
import { Location } from "@/components/sections/Location";
import { CTA } from "@/components/sections/CTA";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { siteConfig, siteUrl } from "@/config/site";

export const pageMeta = {
  title: "Happy Living — Premium Girls PG in Roop Nagar, Delhi",
  description:
    "Happy Living is a premium girls PG in Roop Nagar, Delhi offering AC rooms, homely food, 24×7 security, laundry, medical support and great connectivity. Chat on WhatsApp to book a visit.",
  ogImage: "/og-home.jpg",
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: pageMeta.title },
      { name: "description", content: pageMeta.description },
      { name: "keywords", content: "girls PG Delhi, PG Roop Nagar, girls hostel Delhi, premium PG for girls, ladies PG North Delhi, PG near metro Delhi" },
      { property: "og:title", content: pageMeta.title },
      { property: "og:description", content: pageMeta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl("/") },
      { property: "og:site_name", content: siteConfig.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageMeta.title },
      { name: "twitter:description", content: pageMeta.description },
    ],
    links: [{ rel: "canonical", href: siteUrl("/") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: siteConfig.name,
          description: siteConfig.description,
          telephone: siteConfig.whatsappNumber,
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address.line1,
            addressLocality: "Delhi",
            postalCode: "110007",
            addressCountry: "IN",
          },
          hasMap: siteConfig.mapsUrl,
          amenityFeature: [
            "AC Rooms", "Fully Ventilated Rooms", "Park Facing Rooms",
            "WiFi", "24x7 Security", "Laundry", "Indoor Games",
            "Delicious Food", "Medical Facilities",
          ].map((n) => ({ "@type": "LocationFeatureSpecification", name: n })),
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Facilities />
        <Gallery />
        <About />
        <Location />
        <CTA />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
