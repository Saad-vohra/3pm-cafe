"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coffee,
  Compass,
  Heart,
  Layers,
  MapPin,
  Maximize2,
  Phone,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { BRAND } from "@/lib/brand";
import { useLang } from "@/lib/i18n";
import { STILL, useLenis } from "@/lib/scroll";

type CategoryKey = "all" | "coffee" | "desserts" | "food" | "shakes" | "ambiance";

interface GalleryItem {
  id: string;
  src: string;
  category: "coffee" | "desserts" | "food" | "shakes" | "ambiance";
  title: { en: string; hi: string };
  badge?: { en: string; hi: string };
  desc: { en: string; hi: string };
  details?: { en: string; hi: string };
  highlight?: boolean;
}

const GALLERY_ITEMS: GalleryItem[] = [
  // COFFEE & SPECIALTY BREWS
  {
    id: "caramel-iced-latte",
    src: "/images/caramel-iced-latte.jpg",
    category: "coffee",
    title: { en: "Caramel Iced Latte", hi: "कारमेल आइस्ड लाते" },
    badge: { en: "Signature", hi: "सिग्नेचर" },
    desc: {
      en: "Rich espresso layered over cold milk and house-made golden buttery caramel ribbons with ice.",
      hi: "ताज़ा एस्प्रेसो, ठंडा दूध और हमारे इन-हाउस बने बटर कारमेल का लाजवाब संगम।",
    },
    details: {
      en: "Single-origin Arabica beans extracted fresh and blended with chilled whole milk.",
      hi: "सिंगल-ओरिजिन अरेबिका बीन्स से ताज़ा तैयार, ठंडे दूध के साथ बेहतरीन स्वाद।",
    },
    highlight: true,
  },
  {
    id: "turkish-coffee",
    src: "/images/turkish-coffee.jpg",
    category: "coffee",
    title: { en: "Traditional Turkish Coffee", hi: "पारंपरिक तुर्की कॉफ़ी" },
    badge: { en: "Artisan Brew", hi: "आर्टिसन ब्रू" },
    desc: {
      en: "Slow-simmered in a copper cezve with fragrant green cardamom pods and thick golden crema.",
      hi: "तांबे के बर्तन में धीमी आंच पर पकी हुई गाढ़ी कॉफ़ी, जिसमें ताज़ा इलायची की खुशबू है।",
    },
    details: {
      en: "Served unfiltered in traditional cups with a Turkish sweet delight on the side.",
      hi: "पारंपरिक कप में परोसी जाने वाली प्रामाणिक बिना छनी तुर्की कॉफ़ी।",
    },
    highlight: true,
  },
  {
    id: "spanish-latte",
    src: "/images/spanish-latte.jpg",
    category: "coffee",
    title: { en: "Velvet Spanish Latte", hi: "स्पैनिश लाते" },
    badge: { en: "Bestseller", hi: "बेस्टसेलर" },
    desc: {
      en: "Sweetened condensed milk base balanced by two bold shots of specialty espresso and steamed microfoam.",
      hi: "कंडेंस्ड मिल्क की मिठास और दो बोल्ड एस्प्रेसो शॉट्स का मखमली संतुलित मेल।",
    },
    details: {
      en: "A creamy favorite with the perfect balance of sweetness and roast depth.",
      hi: "हल्की मिठास और गाढ़ी क्रीमीनेस के साथ कॉफ़ी प्रेमियों की पसंदीदा पसंद।",
    },
  },
  {
    id: "latte-art",
    src: "/images/latte.jpg",
    category: "coffee",
    title: { en: "Handcrafted Latte Art", hi: "हस्तनिर्मित लाते आर्ट" },
    badge: { en: "Fresh Pour", hi: "ताज़ा ब्रू" },
    desc: {
      en: "Silky textured microfoam poured with precision rosetta and swan art over balanced espresso.",
      hi: "बारीक और मखमली दूध से तैयार की गई सुंदर लाते आर्ट जो हर कप को खास बनाती है।",
    },
  },
  {
    id: "pourover",
    src: "/images/pourover.jpg",
    category: "coffee",
    title: { en: "V60 Single-Origin Pour Over", hi: "वी60 पोर ओवर कॉफ़ी" },
    badge: { en: "Manual Brew", hi: "मैनुअल ब्रू" },
    desc: {
      en: "Poured by hand in slow concentric spirals to highlight bright floral notes and stone fruit sweetness.",
      hi: "हाथ से धीमी गति से तैयार, जिसमें कॉफ़ी बीन्स के प्राकृतिक फूलों और फलों के स्वाद खिलते हैं।",
    },
  },
  {
    id: "siphon-brew",
    src: "/images/siphon.jpg",
    category: "coffee",
    title: { en: "Vacuum Siphon Brew", hi: "साइफन वैक्यूम ब्रू" },
    badge: { en: "Theatrical", hi: "थिएट्रिकल" },
    desc: {
      en: "Vapour pressure extraction delivering an exceptionally tea-like clean cup with nuanced aroma.",
      hi: "वैज्ञानिक वैक्यूम विधि से तैयार सबसे साफ और खुशबूदार कॉफ़ी अनुभव।",
    },
  },
  {
    id: "cold-brew",
    src: "/images/cold-brew-glass.jpg",
    category: "coffee",
    title: { en: "18-Hour Slow Cold Brew", hi: "18-घंटे स्लो कोल्ड ब्रू" },
    badge: { en: "Smooth & Low Acid", hi: "स्मूथ और रिफ्रेशिंग" },
    desc: {
      en: "Steeped slowly in ice-cold mountain water for 18 hours for natural sweetness with zero bitterness.",
      hi: "18 घंटों तक ठंडे पानी में धीमे अर्क से तैयार, जिसमें बिल्कुल कड़वाहट नहीं होती।",
    },
  },
  {
    id: "double-espresso",
    src: "/images/double-espresso.jpg",
    category: "coffee",
    title: { en: "Double Ristretto Espresso", hi: "डबल रिस्ट्रेटो एस्प्रेसो" },
    desc: {
      en: "A concentrated double extraction crowned with rich hazelnut-toned crema and intense body.",
      hi: "गाढ़ी हेज़लनट क्रेमा से भरपूर तीव्र और ताज़गी भरा दो गुना एस्प्रेसो शॉट।",
    },
  },

  // DESSERTS & ARTISAN BAKES
  {
    id: "tiramisu-dessert",
    src: "/images/tiramisu-dessert.jpg",
    category: "desserts",
    title: { en: "Classic Italian Tiramisu", hi: "क्लासिक इटैलियन तिरामिसु" },
    badge: { en: "House Classic", hi: "हाउस क्लासिक" },
    desc: {
      en: "House ladyfingers soaked in 3PM Cafe fresh espresso, layered with whipped mascarpone and dark Dutch cocoa.",
      hi: "सूफ़ी के ताज़ा एस्प्रेसो में डूबी लेडीफिंगर्स, मस्कार्पोने क्रीम और डार्क डच कोको की परतें।",
    },
    details: {
      en: "Made fresh in small batches daily using authentic Italian mascarpone cheese.",
      hi: "असली इटैलियन मस्कार्पोने चीज़ से रोज़ाना ताज़ा तैयार किया जाने वाला पसंदीदा डेज़र्ट।",
    },
    highlight: true,
  },
  {
    id: "biscoff-cheesecake",
    src: "/images/biscoff-cheesecake.jpg",
    category: "desserts",
    title: { en: "Lotus Biscoff Baked Cheesecake", hi: "लोटस बिस्कॉफ चीज़केक" },
    badge: { en: "Chef Special", hi: "शेफ़ स्पेशल" },
    desc: {
      en: "Velvety baked cream cheese over a caramelized spiced biscuit crust topped with warm Biscoff drizzle.",
      hi: "मखमली चीज़केक और बिस्कॉफ क्रम्ब्स के साथ ऊपर से हल्की गर्म बिस्कॉफ स्प्रेड की टॉपिंग।",
    },
    highlight: true,
  },
  {
    id: "kulfi-falooda",
    src: "/images/kulfi-falooda.jpg",
    category: "desserts",
    title: { en: "Royal Kulfi Falooda", hi: "शाही कुल्फ़ी फ़ालूदा" },
    badge: { en: "Heritage", hi: "शाही विरासत" },
    desc: {
      en: "Slow-reduced rabdi kulfi served with soft cornstarch falooda sev, sweet basil sabja, and rose drizzle.",
      hi: "गाढ़ी रबड़ी कुल्फ़ी, नरम फ़ालूदा सेव, सब्ज़ा के बीज और ताज़ा गुलाब के अर्क का शाही संगम।",
    },
  },
  {
    id: "sufi-special-dessert",
    src: "/images/sufi-special-dessert.jpg",
    category: "desserts",
    title: { en: "3PM Cafe Signature Sweet Creation", hi: "सूफ़ी स्पेशल डेज़र्ट" },
    badge: { en: "Exclusive", hi: "खास पेशकश" },
    desc: {
      en: "An artisanal fusion dessert crafted with dry fruit crumbs, delicate saffron glaze, and fresh cream.",
      hi: "ड्राई फ्रूट्स, केसर और फ्रेश क्रीम से सजाया गया सूफ़ी कैफ़े का एक्सक्लूसिव डेज़र्ट।",
    },
  },
  {
    id: "chocolate-lava-cake",
    src: "/images/chocolate-lava-cake.jpg",
    category: "desserts",
    title: { en: "Warm Chocolate Molten Lava", hi: "वॉर्म चॉकलेट लावा केक" },
    desc: {
      en: "Decadent dark chocolate sponge filled with an oozing warm Belgian truffle ganache center.",
      hi: "गर्म बेल्जियन चॉकलेट से भरा स्पंज केक जो काटते ही पिघली हुई चॉकलेट बहा देता है।",
    },
  },
  {
    id: "pistachio-roll",
    src: "/images/pistachio-roll.jpg",
    category: "desserts",
    title: { en: "Flaky Pistachio Cardamom Swirl", hi: "पिस्ता कार्डमम स्विरल रोल" },
    desc: {
      en: "Golden laminated French pastry rolled with roasted Iranian pistachios and crushed green cardamom.",
      hi: "हल्की और कुरकुरी फ्रेंच पेस्ट्री में भुने हुए पिस्ते और हरी इलायची का बेमिसाल स्वाद।",
    },
  },
  {
    id: "croissant",
    src: "/images/croissant.jpg",
    category: "desserts",
    title: { en: "Artisan Butter Croissant", hi: "आर्टिसन बटर क्रोइसैंट" },
    desc: {
      en: "Baked to golden perfection with 27 honeycomb layers of pure French churned butter.",
      hi: "27 परतों वाला क्रिस्पी, हल्का और असली मक्खन से बेक किया हुआ क्लासिक क्रोइसैंट।",
    },
  },
  {
    id: "pancakes",
    src: "/images/pancakes.jpg",
    category: "desserts",
    title: { en: "Fluffy Buttermilk Pancake Stack", hi: "फ्लफ़ी बटरमिल्क पैनकेक्स" },
    desc: {
      en: "Three airy buttermilk pancakes stacked tall with whipped honey butter and maple drizzle.",
      hi: "मुलायम और स्पंजी पैनकेक्स, ऊपर से मक्खन और मीठे मेपल सिरप की खुशबूदार परत।",
    },
  },

  // GOURMET SAVOURY & BRUNCH
  {
    id: "shakshuka",
    src: "/images/shakshuka.jpg",
    category: "food",
    title: { en: "Sizzling Cast-Iron Shakshuka", hi: "सिज़लिंग शकशूका" },
    badge: { en: "Brunch Star", hi: "ब्रंच स्टार" },
    desc: {
      en: "Poached eggs nestled in a simmered spiced tomato, bell pepper, and cumin sauce with crumbled feta.",
      hi: "टमाटर, शिमला मिर्च और ज़ीरे की मसालेदार ग्रेवी में पके हुए अंडे, फ़ेटा चीज़ और ताज़ी ब्रेड।",
    },
    details: {
      en: "Served sizzling hot straight from the skillet with warm crusty sourdough slices.",
      hi: "सिज़लिंग गर्म कास्ट-आयरन पैन में गरमागरम सौर्डो ब्रेड के साथ परोसा जाता है।",
    },
    highlight: true,
  },
  {
    id: "avocado-toast",
    src: "/images/avocado.jpg",
    category: "food",
    title: { en: "Artisanal Smashed Avocado Toast", hi: "आर्टिसन एवोकैडो टोस्ट" },
    badge: { en: "Healthy Bite", hi: "हेल्दी बाइट" },
    desc: {
      en: "Hass avocado coarsely crushed with lime juice, chili flakes, sea salt, and microgreens on sourdough.",
      hi: "नींबू, चिली फ्लेक्स और ताज़ी माइक्रोग्रीन्स के साथ सौर्डो ब्रेड पर मैश किया हुआ एवोकैडो।",
    },
  },
  {
    id: "paneer-tikka-wrap",
    src: "/images/paneer-tikka-wrap.jpg",
    category: "food",
    title: { en: "Tandoori Paneer Tikka Wrap", hi: "तंदूरी पनीर टिक्का रैप" },
    badge: { en: "Local Love", hi: "पसंदीदा स्नैक" },
    desc: {
      en: "Marinated cottage cheese char-grilled with capsicum and wrapped in a soft flatbread with mint chutney.",
      hi: "तंदूरी मसालों में भुना पनीर, शिमला मिर्च और पुदीने की ताज़ा चटनी से भरा स्वादिष्ट रोल।",
    },
  },
  {
    id: "veg-burger",
    src: "/images/veg-burger.jpg",
    category: "food",
    title: { en: "Gourmet Brioche Veggie Burger", hi: "गॉरमे ब्रियोश वेज बर्गर" },
    desc: {
      en: "Crisp seasoned vegetable patty tucked into a toasted butter brioche bun with pickled gherkins and cheddar.",
      hi: "कुरकुरी वेज पैटी, टोस्टेड ब्रियोश बन, मेल्टेड चेडर चीज़ और हमारे स्पेशल सॉस का अनोखा स्वाद।",
    },
  },
  {
    id: "cheese-nachos",
    src: "/images/cheese-nachos.jpg",
    category: "food",
    title: { en: "Loaded Queso Crisp Nachos", hi: "लोडेड चीज़ नाचोज़" },
    desc: {
      en: "Golden stone-ground corn chips smothered in warm cheddar queso, jalapeños, and fresh salsa fresca.",
      hi: "क्रिस्पी कॉर्न चिप्स, गर्म क्रीमी चीज़ सॉस, जलापेनो और ताज़ा साल्सा का चटपटा मेल।",
    },
  },
  {
    id: "rigatoni",
    src: "/images/rigatoni.jpg",
    category: "food",
    title: { en: "Creamy Sun-Dried Tomato Rigatoni", hi: "क्रीमी सन-ड्राइड टोमैटो रिगाटोनी" },
    desc: {
      en: "Al dente tube pasta tossed in roasted garlic cream, sun-dried tomatoes, and fresh basil ribbons.",
      hi: "रोस्टेड गार्लिक क्रीम और सन-ड्राइड टोमैटो में पकाया गया स्वादिष्ट इटैलियन रिगाटोनी पास्ता।",
    },
  },

  // SHAKES, COOLERS & SPECIALTY DRINKS
  {
    id: "hot-matcha",
    src: "/images/hot-matcha.jpg",
    category: "shakes",
    title: { en: "Ceremonial Uji Hot Matcha", hi: "उजी सेरेमोनियल हॉट माचा" },
    badge: { en: "Japanese Grade", hi: "जापानी ग्रेड" },
    desc: {
      en: "Stone-ground green tea whisked with bamboo chasen, finished with smooth oat milk froth.",
      hi: "जापान की पारंपरिक विधि से बांस के विस्क से फेंटा हुआ शुद्ध माचा ग्रीन टी लाते।",
    },
    highlight: true,
  },
  {
    id: "strawberry-matcha",
    src: "/images/strawberry-matcha.jpg",
    category: "shakes",
    title: { en: "Layered Strawberry Matcha Iced", hi: "स्ट्रॉबेरी माचा आइस्ड लाते" },
    badge: { en: "Viral Favorite", hi: "ट्रेंडिंग ड्रिंक" },
    desc: {
      en: "Crushed mountain strawberry compote topped with cold milk and vibrant jade green ceremonial matcha.",
      hi: "ताज़ी स्ट्रॉबेरी प्यूरी, ठंडा दूध और खूबसूरत हरी माचा की मनमोहक रंगीन परतें।",
    },
  },
  {
    id: "ferrero-shake",
    src: "/images/ferrero-shake.jpg",
    category: "shakes",
    title: { en: "Ferrero Rocher Nutella Thickshake", hi: "फ़रेरो रोशेर थिकशेक" },
    badge: { en: "Indulgent", hi: "रिच और थिक" },
    desc: {
      en: "Whole Ferrero Rocher pralines blended with creamy vanilla gelato, Nutella swirls, and crushed hazelnuts.",
      hi: "पूरे फ़रेरो रोशेर चॉकलेट्स, न्यूटेला और वैनिला आइसक्रीम से बना गाढ़ा और स्वादिष्ट शेक।",
    },
  },
  {
    id: "blue-ocean",
    src: "/images/blue-ocean.jpg",
    category: "shakes",
    title: { en: "Blue Ocean Sparkle Mocktail", hi: "ब्लू ओशन स्पार्कल मॉकटेल" },
    desc: {
      en: "Blue curaçao syrup stirred with fresh lime juice, mint leaves, and bubbly sparkling soda.",
      hi: "नीले साइट्रस सिरप, नींबू का रस और पुदीने की ताजगी से भरपूर चमकती हुई स्पार्कलिंग ड्रिंक।",
    },
  },
  {
    id: "kashmiri-chai",
    src: "/images/kashmiri-chai.jpg",
    category: "shakes",
    title: { en: "Pink Kashmiri Noon Chai", hi: "गुलाबी कश्मीरी नून चाय" },
    badge: { en: "Traditional", hi: "पारंपरिक" },
    desc: {
      en: "Slow-brewed green tea leaves aerated to a blush rose pink with milk, crushed pistachios, and almonds.",
      hi: "गुलाबी रंग की पारंपरिक चाय, जिसमें पिस्ता, बादाम और ताज़ा मसालों का भरपूर पोषण है।",
    },
  },
  {
    id: "berry-bliss",
    src: "/images/berry-bliss.jpg",
    category: "shakes",
    title: { en: "Wild Summer Berry Bliss", hi: "वाइल्ड समर बेरी ब्लिस" },
    desc: {
      en: "Raspberries, blackberries, and strawberries crushed over crushed ice with fresh mint sprigs.",
      hi: "रसबरी, ब्लैकबेरी और स्ट्रॉबेरी की ताजगी से भरपूर गर्मियों की सबसे ठंडी राहत।",
    },
  },

  // AMBIANCE & MOMENTS
  {
    id: "venue-terrace",
    src: "/images/events-private.jpg",
    category: "ambiance",
    title: { en: "Serene Open Cafe Space", hi: "सुकूनदेह ओपन सूफ़ी कैफ़े" },
    badge: { en: "Open Cafe Vibe", hi: "ओपन सूफ़ी कैफ़े" },
    desc: {
      en: "Breathe under open skies amidst lush greenery, fairy lights, and natural wooden tables.",
      hi: "खुले आसमान के नीचे हरियाली, रोशनी और सुकून भरे माहौल में कॉफ़ी का मज़ा लें।",
    },
    details: {
      en: "Our outdoor terrace is pet-friendly and provides a tranquil breeze during mornings and evenings.",
      hi: "सुबह और शाम की ठंडी हवा के बीच सुकून से बैठने और काम करने के लिए बेहतरीन जगह।",
    },
    highlight: true,
  },
  {
    id: "about-cafe-interior",
    src: "/images/about-cafe.jpg",
    category: "ambiance",
    title: { en: "Warm Heritage Wooden Hall", hi: "वुडन हेरिटेज हॉल" },
    badge: { en: "Cozy Corner", hi: "कोज़ी कॉर्नर" },
    desc: {
      en: "Natural timber finishes, comfortable upholstery, and acoustic balance designed for lingering chats.",
      hi: "लकड़ी की खूबसूरती और सुकूनदेह रोशनी से सजा इंटीरियर जहाँ वक्त बिताना दिल को भाता है।",
    },
  },
  {
    id: "events-private",
    src: "/images/events-private.jpg",
    category: "ambiance",
    title: { en: "Celebrations & Private Gatherings", hi: "प्राइवेट इवेंट्स और सेलिब्रेशन्स" },
    desc: {
      en: "Dedicated quiet spaces tailored for birthday moments, book clubs, and intimate family reunions.",
      hi: "जन्मदिन, दोस्तों की महफ़िल और पारिवारिक मुलाकातों के लिए आरक्षित खूबसूरत कोना।",
    },
  },
  {
    id: "venue-evening",
    src: "/images/venue.jpg",
    category: "ambiance",
    title: { en: "Golden Hour Glow & Main Courtyard", hi: "शाम का नज़ारा और मुख्य आंगन" },
    desc: {
      en: "As dusk falls over Vallabh Vidyanagar, 3PM Cafe lights up with warm amber glow and the smell of freshly roasted beans.",
      hi: "काजीपुरा में शाम की ढलती धूप और सूफ़ी की सुनहरी रोशनी के बीच ताज़ा भुनी कॉफ़ी की महक।",
    },
  },
];

export default function GalleryPage() {
  const { lang, display } = useLang();
  const router = useRouter();
  const still = STILL();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useLenis(!still);

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      all: GALLERY_ITEMS.length,
      coffee: GALLERY_ITEMS.filter((i) => i.category === "coffee").length,
      desserts: GALLERY_ITEMS.filter((i) => i.category === "desserts").length,
      food: GALLERY_ITEMS.filter((i) => i.category === "food").length,
      shakes: GALLERY_ITEMS.filter((i) => i.category === "shakes").length,
      ambiance: GALLERY_ITEMS.filter((i) => i.category === "ambiance").length,
    };
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveItem(null);
      } else if (e.key === "ArrowRight") {
        const currentIndex = filteredItems.findIndex((it) => it.id === activeItem.id);
        const nextIndex = (currentIndex + 1) % filteredItems.length;
        setActiveItem(filteredItems[nextIndex]);
      } else if (e.key === "ArrowLeft") {
        const currentIndex = filteredItems.findIndex((it) => it.id === activeItem.id);
        const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        setActiveItem(filteredItems[prevIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, filteredItems]);

  const categories: { key: CategoryKey; label: { en: string; hi: string }; icon: React.ReactNode }[] = [
    { key: "all", label: { en: "All Showcase", hi: "सभी तस्वीरें" }, icon: <Layers className="size-4" /> },
    { key: "coffee", label: { en: "Artisan Coffee", hi: "कॉफ़ी और ब्रूज़" }, icon: <Coffee className="size-4" /> },
    { key: "desserts", label: { en: "Handmade Desserts", hi: "स्वादिष्ट डेज़र्ट्स" }, icon: <Sparkles className="size-4" /> },
    { key: "food", label: { en: "Gourmet Savouries", hi: "गॉरमे स्नैक्स" }, icon: <Utensils className="size-4" /> },
    { key: "shakes", label: { en: "Shakes & Coolers", hi: "शेक और ड्रिंक्स" }, icon: <Compass className="size-4" /> },
    { key: "ambiance", label: { en: "Cafe Ambiance", hi: "कैफ़े का माहौल" }, icon: <Camera className="size-4" /> },
  ];

  return (
    <div className="relative min-h-screen bg-paper text-ink selection:bg-[#d4e9e2] selection:text-[#1e3932] overflow-x-hidden max-w-full">
      {/* Background ambient lighting */}
      <div
        className="bg-blob left-[-10vw] top-[5vh] h-[45vw] w-[45vw] bg-[radial-gradient(circle,rgba(0,98,65,0.16),transparent_65%)]"
        style={{ animation: "blobdrift 28s ease-in-out infinite" }}
      />
      <div
        className="bg-blob right-[-8vw] top-[30vh] h-[40vw] w-[40vw] bg-[radial-gradient(circle,rgba(30,57,50,0.12),transparent_65%)]"
        style={{ animation: "blobdrift 36s ease-in-out infinite reverse" }}
      />

      {/* Main Navbar */}
      <Navbar sticky showBack />

      <main className="relative z-10 pt-10 pb-20">
        {/* Hero Section */}
        <section className="container-x pt-6 pb-12 text-center lg:pt-12 lg:pb-16">
          <motion.div
            initial={still ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-[#006241]/25 bg-white/90 px-5 py-2 shadow-sm backdrop-blur-sm"
          >
            <Camera className="size-4 text-[#006241]" />
            <span className="eyebrow !text-[#006241] !tracking-[0.22em] font-semibold">
              {BRAND.name} · GALLERY & VISUAL STORIES · {BRAND.city}
            </span>
          </motion.div>

          <motion.h1
            initial={still ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className={`${display} mt-6 leading-[1.05] text-[#1e3932]`}
            style={{ fontSize: "clamp(38px,6vw,80px)" }}
          >
            {lang === "en" ? (
              <>
                Every Sip, Every Dish, <span className="text-[#006241]">Every Corner.</span>
              </>
            ) : (
              <>
                हर घूंट, हर स्वाद, <span className="text-[#006241]">हर खूबसूरत कोना।</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={still ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-5 max-w-3xl text-base sm:text-lg leading-relaxed text-[#2d4a40]"
          >
            {lang === "en"
              ? "Welcome to the visual gallery of 3PM Cafe. Explore our specialty hand-poured coffees, authentic slow-cooked Turkish brews, scratch-made bakes, vibrant brunch bites, and peaceful open cafe corners designed for warm conversations."
              : "सूफ़ी कैफ़े की खूबसूरत गैलरी में आपका स्वागत है। हमारी ताज़ा एस्प्रेसो और पोर-ओवर कॉफ़ी, पारंपरिक तुर्की ब्रूज़, इन-हाउस बेक्ड डेज़र्ट्स, स्वादिष्ट स्नैक्स और सुकून भरे खूबसूरत कोनों की झलक देखें।"}
          </motion.p>

          {/* Quick Highlight Stats */}
          <motion.div
            initial={still ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6"
          >
            <div className="flex items-center gap-2 rounded-full border border-[#006241]/15 bg-white/80 px-4 py-1.5 shadow-sm">
              <span className="size-2 rounded-full bg-[#006241]" />
              <span className="text-xs sm:text-sm font-medium text-[#1e3932]">
                {lang === "en" ? "100% Arabica Specialty Beans" : "100% अरेबिका कॉफ़ी बीन्स"}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#006241]/15 bg-white/80 px-4 py-1.5 shadow-sm">
              <span className="size-2 rounded-full bg-[#006241]" />
              <span className="text-xs sm:text-sm font-medium text-[#1e3932]">
                {lang === "en" ? "Fresh Daily In-House Bakes" : "रोज़ाना ताज़ा बेक्ड डेज़र्ट्स"}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#006241]/15 bg-white/80 px-4 py-1.5 shadow-sm">
              <span className="size-2 rounded-full bg-[#006241]" />
              <span className="text-xs sm:text-sm font-medium text-[#1e3932]">
                {lang === "en" ? "Open Cafe" : "ओपन सूफ़ी कैफ़े"}
              </span>
            </div>
          </motion.div>
        </section>

        {/* Filter Navigation Tabs */}
        <section className="container-x mb-10 sticky top-[72px] z-20 py-2">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-2.5 rounded-full border border-[#006241]/20 bg-white/90 p-1.5 sm:p-2 shadow-lg backdrop-blur-md">
            {categories.map((cat) => {
              const active = activeCategory === cat.key;
              const count = counts[cat.key];
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-[#006241] text-white shadow-md font-semibold scale-[1.02]"
                      : "text-[#1e3932] hover:bg-[#006241]/10 hover:text-[#006241]"
                  }`}
                >
                  <span className={active ? "text-white" : "text-[#006241]"}>{cat.icon}</span>
                  <span>{cat.label[lang]}</span>
                  <span
                    className={`ml-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                      active ? "bg-white/20 text-white" : "bg-[#006241]/10 text-[#006241]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="container-x">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredItems.map((item, idx) => {
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.4) }}
                    onClick={() => setActiveItem(item)}
                    className="group photo-card relative cursor-pointer overflow-hidden border border-[#006241]/15 bg-white shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8e4dc]">
                      <img
                        src={item.src}
                        alt={`${item.title[lang]} at ${BRAND.name}`}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Badge if available */}
                      {item.badge && (
                        <div className="absolute top-3.5 left-3.5 z-10">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1e3932]/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white shadow-md border border-white/20">
                            <Sparkles className="size-3 text-[#d4e9e2]" />
                            {item.badge[lang]}
                          </span>
                        </div>
                      )}

                      {/* Expand Icon Button overlay */}
                      <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="flex size-8 items-center justify-center rounded-full bg-white/90 text-[#1e3932] shadow-md backdrop-blur-sm">
                          <Maximize2 className="size-4" />
                        </span>
                      </div>

                      {/* Gradient for text contrast */}
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1e3932]/85 via-[#1e3932]/40 to-transparent pointer-events-none" />

                      {/* Bottom overlay preview label */}
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <p className="text-xs uppercase tracking-wider font-semibold text-[#d4e9e2]">
                          {categories.find((c) => c.key === item.category)?.label[lang]}
                        </p>
                        <h3 className="text-lg font-bold leading-snug drop-shadow-sm">
                          {item.title[lang]}
                        </h3>
                      </div>
                    </div>

                    {/* Content / Readable Description Box */}
                    <div className="p-4 sm:p-5 flex flex-col justify-between border-t border-[#006241]/10 bg-white">
                      <p className="text-xs sm:text-sm text-[#2d4a40] line-clamp-2 leading-relaxed">
                        {item.desc[lang]}
                      </p>

                      <div className="mt-3.5 pt-3 border-t border-[#006241]/10 flex items-center justify-between text-xs font-semibold text-[#006241] group-hover:text-[#004f36]">
                        <span className="inline-flex items-center gap-1">
                          {lang === "en" ? "View Details" : "विवरण देखें"}
                          <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                        </span>
                        <span className="text-[11px] text-[#4a6058] font-normal uppercase tracking-wider">
                          {BRAND.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Ambient Quotation Banner */}
        <section className="container-x my-20">
          <div className="relative overflow-hidden rounded-[32px] bg-[#1e3932] p-8 sm:p-14 text-center text-paper shadow-2xl border border-white/20">
            <div className="relative z-10 mx-auto max-w-3xl">
              <span className="eyebrow !text-[#d4e9e2] !tracking-[0.25em]">
                {lang === "en" ? "THE 3PM PHILOSOPHY" : "सूफ़ी का फलसफा"}
              </span>

              <p className="font-serif text-2xl sm:text-4xl italic leading-snug mt-4 text-white">
                {lang === "en"
                  ? "“In every cup, an aroma of serenity; in every corner, a seat of comfort.”"
                  : "“हर प्याले में सुकून की महक, हर कोने में इत्मीनान की छांव।”"}
              </p>

              <p className="mt-4 text-xs sm:text-sm uppercase tracking-[0.2em] text-[#d4e9e2]/80">
                {BRAND.name} · Vallabh Vidyanagar, Anand, Gujarat · Fresh Brews & Pure Moments
              </p>
            </div>

            {/* Subtle background glow */}
            <div className="absolute -right-20 -bottom-20 size-72 rounded-full bg-[#006241]/40 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 size-72 rounded-full bg-[#00754a]/30 blur-3xl pointer-events-none" />
          </div>
        </section>

        {/* Call to Action: Visit & Taste */}
        <section className="container-x">
          <div className="rounded-[32px] border border-[#006241]/20 bg-gradient-to-br from-white via-paper to-[#d4e9e2]/40 p-8 sm:p-14 shadow-xl text-center">
            <div className="mx-auto max-w-2xl">
              <span className="eyebrow !text-[#006241] font-bold">
                {lang === "en" ? "EXPERIENCE THE TASTE" : "स्वाद का अनुभव करें"}
              </span>

              <h2
                className={`${display} mt-3 text-[#1e3932] leading-tight`}
                style={{ fontSize: "clamp(32px,4vw,56px)" }}
              >
                {lang === "en"
                  ? "Ready to Taste These Delights in Person?"
                  : "क्या आप इन स्वादों का असली मज़ा लेने के लिए तैयार हैं?"}
              </h2>

              <p className="mt-4 text-base sm:text-lg text-[#2d4a40] leading-relaxed">
                {lang === "en"
                  ? "Step into our serene cafe at Vallabh Vidyanagar, Anand, Gujarat. Enjoy freshly ground specialty brews, mouth-watering desserts, and relaxing terrace views."
                  : "काजीपुरा, गुजरात में हमारे खूबसूरत कैफ़े में पधारें। ताज़ा ग्राइंड की हुई कॉफ़ी, बेहतरीन डेज़र्ट्स और सुकूनदेह माहौल का आनंद लें।"}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => router.push("/menu")}
                  className="btn-ink text-base py-3 px-8 shadow-xl font-semibold"
                >
                  <Utensils className="size-4" />
                  {lang === "en" ? "Explore Full Menu" : "पूरा मेन्यू देखें"}
                </button>

                {BRAND.locations[0]?.maps && (
                  <a
                    href={BRAND.locations[0].maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-line text-base py-3 px-8 font-semibold bg-white/80 hover:bg-white"
                  >
                    <MapPin className="size-4" />
                    {lang === "en" ? "Get Directions" : "रास्ता देखें"}
                  </a>
                )}

                <a
                  href={BRAND.tel}
                  className="btn-line text-base py-3 px-8 font-semibold bg-white/80 hover:bg-white"
                >
                  <Phone className="size-4" />
                  {lang === "en" ? "Reserve a Table" : "टेबल बुक करें"}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-[#0f1f1a]/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col md:flex-row overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                aria-label="Close image modal"
                className="absolute top-4 right-4 z-20 flex size-10 items-center justify-center rounded-full bg-black/60 text-white transition-all hover:bg-black/90 hover:scale-105"
              >
                <X className="size-5" />
              </button>

              {/* Large Image Frame */}
              <div className="relative flex-1 bg-black min-h-[300px] sm:min-h-[380px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
                <img
                  src={activeItem.src}
                  alt={activeItem.title[lang]}
                  className="size-full object-contain md:object-cover max-h-[550px]"
                />

                {/* Left navigation arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = filteredItems.findIndex((it) => it.id === activeItem.id);
                    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
                    setActiveItem(filteredItems[prevIndex]);
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 transition-transform hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-6" />
                </button>

                {/* Right navigation arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = filteredItems.findIndex((it) => it.id === activeItem.id);
                    const nextIndex = (currentIndex + 1) % filteredItems.length;
                    setActiveItem(filteredItems[nextIndex]);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 transition-transform hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="size-6" />
                </button>
              </div>

              {/* Content Details Panel */}
              <div className="w-full md:w-[380px] p-6 sm:p-8 flex flex-col justify-between bg-white overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#006241]/10 px-3 py-1 text-xs font-semibold text-[#006241] uppercase tracking-wider">
                      {categories.find((c) => c.key === activeItem.category)?.label[lang]}
                    </span>
                    {activeItem.badge && (
                      <span className="rounded-full bg-[#1e3932] px-3 py-1 text-xs font-semibold text-[#d4e9e2]">
                        {activeItem.badge[lang]}
                      </span>
                    )}
                  </div>

                  <h3 className={`${display} mt-4 text-2xl sm:text-3xl font-bold text-[#1e3932] leading-tight`}>
                    {activeItem.title[lang]}
                  </h3>

                  <div className="mt-4 border-t border-[#006241]/10 pt-4">
                    <p className="text-sm leading-relaxed text-[#2d4a40]">
                      {activeItem.desc[lang]}
                    </p>
                    {activeItem.details && (
                      <p className="mt-3 text-xs leading-relaxed text-[#4a6058] italic border-l-2 border-[#006241]/30 pl-3">
                        {activeItem.details[lang]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8 border-t border-[#006241]/10 pt-6 space-y-3">
                  <button
                    onClick={() => {
                      setActiveItem(null);
                      router.push("/menu");
                    }}
                    className="btn-ink w-full py-2.5 text-sm font-semibold justify-center"
                  >
                    <Utensils className="size-4" />
                    {lang === "en" ? "View Full Menu" : "मेन्यू में देखें"}
                  </button>

                  {BRAND.locations[0]?.maps && (
                    <a
                      href={BRAND.locations[0].maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-line w-full py-2.5 text-sm font-semibold justify-center"
                    >
                      <MapPin className="size-4" />
                      {lang === "en" ? "Visit Cafe Location" : "कैफ़े की लोकेशन देखें"}
                    </a>
                  )}

                  <p className="text-center text-[11px] text-[#4a6058]">
                    © {BRAND.name} · {BRAND.city}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}

