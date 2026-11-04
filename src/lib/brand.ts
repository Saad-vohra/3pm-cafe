// Brand data — single source of truth for every brand string on the site.

export const BRAND = {
  mark: "3PM",
  name: "3PM Cafe",
  city: "Anand, India",
    tagline: {
    en: "Good Food · Good Mood · Good Vibes",
    hi: "अच्छा खाना · अच्छा मूड · अच्छी वाइब्स",
  },
  phone: "+91 83208 12121",
  tel: "tel:+918320812121",
  whatsapp: "+91 83208 12121",
  whatsappClean: "918320812121",
  whatsappUrl: "https://wa.me/918320812121?text=Hello%203PM%20Cafe!%20I%20would%20like%20to%20connect.",
  hours: "08:00 – 21:00",
  instagram: "@__.sufiscafe",
  instagramUrl: "https://www.instagram.com/__.sufiscafe?cplk=MW9saTB4NXppZnQzOA==",
  currency: "₹",
  rating: null as number | null,
  reviews: null as number | null,
  locations: [
    {
      name: "Vallabh Vidyanagar",
      address: "3PM Cafe, krishna empire, 201-202, Road, Vallabh Vidyanagar, Anand, Gujarat 388120",
      tag: { en: "Main Cafe · Dine-in & Takeaway", hi: "मुख्य कैफ़े · डाइन-इन और टेकअवे" },
      maps: "https://www.google.com/maps/search/?api=1&query=3PM+Cafe,+krishna+empire,+201-202,+Road,+Vallabh+Vidyanagar,+Anand,+Gujarat+388120",
      img: "/images/venue.jpg",
    },
  ],
  isDemo: false,
} as const;

export const money = (n: number) => `${BRAND.currency}${n}`;
