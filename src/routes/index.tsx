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
  // People search the name several ways ("happy living pg for ladies", "happy
  // living girls pg", "happy living girls hostel") and by area ("pg in roop
  // nagar"). Search Console had the site at 6-10 for its own name, so the title
  // carries the name, both audiences and the area.
  title: "Happy Living PG | Girls & Ladies PG in Roop Nagar, Delhi",
  description:
    "Happy Living is a girls PG and ladies hostel at H. No. 1/20, Roop Nagar, Delhi 110007. AC rooms, homely food, 24×7 security, laundry and medical support, near the metro. Chat on WhatsApp to book a visit.",
  ogImage: "/og-home.jpg",
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: pageMeta.title },
      { name: "description", content: pageMeta.description },
      { name: "keywords", content: "Happy Living PG, Happy Living girls PG, Happy Living girls hostel, PG for ladies Roop Nagar, PG in Roop Nagar, girls PG Delhi, girls hostel Delhi, premium PG for girls, ladies PG North Delhi, PG near metro Delhi" },
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
          // Hostel is a LodgingBusiness, which is a LocalBusiness; both are
          // listed so parsers that only look for LocalBusiness still match.
          "@type": ["Hostel", "LocalBusiness"],
          "@id": `${siteUrl("/")}#business`,
          name: siteConfig.name,
          alternateName: [
            "Happy Living PG",
            "Happy Living Girls PG",
            "Happy Living Girls Hostel",
            "Happy Living PG for Ladies",
            "Happy Living Women's PG",
          ],
          description: siteConfig.description,
          url: siteUrl("/"),
          image: siteUrl(pageMeta.ogImage),
          telephone: siteConfig.whatsappNumber,
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address.line1,
            addressLocality: "Delhi",
            addressRegion: "Delhi",
            postalCode: "110007",
            addressCountry: "IN",
          },
          areaServed: "Roop Nagar, Delhi",
          audience: { "@type": "PeopleAudience", suggestedGender: "female" },
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
