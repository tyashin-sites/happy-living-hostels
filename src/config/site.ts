export const siteConfig = {
  name: "Happy Living",
  tagline: "Premium Girls PG",
  promise: "Comfort • Safety • Homely Stay",
  description:
    "Happy Living is a premium girls PG in Roop Nagar, Delhi offering AC rooms, homely food, 24x7 security and a warm community near the metro.",
  whatsappNumber: "+919667271661",
  whatsappDisplay: "+91 96672 71661",
  whatsappMessage:
    "Hi! I came across Happy Living PG and would like to know about room availability.",
  address: {
    line1: "H. No. 1/20, Roop Nagar",
    line2: "Delhi - 110007",
    full: "H. No. 1/20, Roop Nagar, Delhi - 110007",
  },
  mapsUrl: "https://maps.app.goo.gl/JrQSvacXM7LhHAUm6?g_st=aw",
  badge: {
    title: "Comfort • Care • Convenience",
  },
  meta: {
    nearMetro: "Near Metro Station",
    connectivity: "Easy Connectivity",
    audience: "For Girls Only",
  },
} as const;

export const whatsappLink = (() => {
  const num = siteConfig.whatsappNumber.replace(/\D/g, "");
  const msg = encodeURIComponent(siteConfig.whatsappMessage);
  return `https://wa.me/${num}?text=${msg}`;
})();
