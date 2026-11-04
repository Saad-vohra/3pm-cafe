import type { Lang } from "@/lib/i18n";

export interface FullMenuItem {
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
  price: number;
  kcal: number | null;
  weight: number | null;
  allergens: Record<Lang, string[]>;
  img: string | null;
}

export interface FullMenuCategory {
  id: string;
  label: Record<Lang, string>;
  subtitle?: Record<Lang, string>;
  items: FullMenuItem[];
}

const IMG = {
  // Mocktails & Ice Tea
  lycheelove: "/images/lychee-love.jpg",
  greenapple: "/images/green-apple-mojito.jpg",
  blueocean: "/images/blue-ocean.jpg",
  yuzusoda: "/images/yuzu-matcha-soda.jpg",
  guavapunch: "/images/guava-punch.jpg",
  pinacolada: "/images/pina-colada.jpg",
  orange: "/images/orange-juice.jpg",
  berrybliss: "/images/berry-bliss.jpg",
  watermelon: "/images/watermelon-cooler.jpg",
  passion: "/images/passionfruit.jpg",
  ginger: "/images/ginger-sparkle.jpg",
  lemonade: "/images/lemonade.jpg",
  peppermint: "/images/peppermint-tea.jpg",

  // Shakes, Frappés & Smoothies
  nutellashake: "/images/nutella-shake.jpg",
  oreoshake: "/images/oreo-shake.jpg",
  kitkatshake: "/images/kitkat-shake.jpg",
  ferreroshake: "/images/ferrero-shake.jpg",
  brownieshake: "/images/brownie-shake.jpg",
  mangoshake: "/images/mango-shake.jpg",
  butterscotchshake: "/images/butterscotch-shake.jpg",
  biscoffshake: "/images/biscoff-shake.jpg",
  blueberryshake: "/images/blueberry-shake.jpg",
  pistachioshake: "/images/pistachio-shake.jpg",
  whippedcream: "/images/whipped-cream.jpg",

  // Hot Coffee & Espresso Drinks
  espresso: "/images/espresso-shot.jpg",
  americano: "/images/americano.jpg",
  cappuccino: "/images/cappuccino.jpg",
  latte: "/images/latte.jpg",
  mocha: "/images/mocha.jpg",
  hazelnutlatte: "/images/hazelnut-latte.jpg",
  affogato: "/images/affogato.jpg",
  hotmatcha: "/images/hot-matcha.jpg",
  tiramisulatte: "/images/tiramisu-latte.jpg",
  icedlatte: "/images/iced-latte.jpg",
  syrup: "/images/flavour-syrup.jpg",
  icedamericano: "/images/iced-americano.jpg",

  // Hot Chocolate & Matcha
  cocoa: "/images/cocoa.jpg",
  whitecocoa: "/images/white-hot-chocolate.jpg",
  cinnamonlatte: "/images/cinnamon-latte.jpg",
  strawmatcha: "/images/strawberry-matcha.jpg",

  // Cold Coffee & Cold Brew
  iced: "/images/iced-coffee.jpg",
  icecream: "/images/ice-cream-scoop.jpg",
  hazelnutcoldbrew: "/images/hazelnut-cold-brew.jpg",
  coconutlatte: "/images/coconut-latte.jpg",
  carameliced: "/images/caramel-iced-latte.jpg",
  caramellatte: "/images/caramel-latte.jpg",
  spanishlatte: "/images/spanish-latte.jpg",
  coldbrew: "/images/cold-brew-glass.jpg",
  vanillacoldbrew: "/images/vanilla-cold-brew.jpg",

  // Manual Brew
  pourover: "/images/pourover.jpg",
  aeropress: "/images/aeropress.jpg",
  frenchpress: "/images/french-press.jpg",

  // Food
  vegburger: "/images/veg-burger.jpg",
  periperiburger: "/images/peri-peri-burger.jpg",
  grilledsandwich: "/images/grilled-sandwich.jpg",
  cheese: "/images/grilled-cheese.jpg",
  mushroommelt: "/images/mushroom-melt.jpg",
  paneer: "/images/paneer-toast.jpg",
  cucumber: "/images/cucumber-toast.jpg",
  periperiwrap: "/images/peri-peri-wrap.jpg",
  paneerwrap: "/images/paneer-tikka-wrap.jpg",
  nachos: "/images/cheese-nachos.jpg",
  periperifries: "/images/peri-peri-fries.jpg",
  loadedfries: "/images/loaded-fries.jpg",

  // Updated photos
  coloradobulldog: "/images/colorado-bulldog.jpg",
  vegcheeseburger: "/images/veg-cheese-burger.jpg",
  peripericheeseburger: "/images/peri-peri-cheese-burger.jpg",
  tandooriburger: "/images/tandoori-burger.jpg",
  cheesechilicorn: "/images/cheese-chili-corn-sandwich.jpg",
  kababfrankie: "/images/kabab-frankie.jpg",
  paneerschezwanfrankie: "/images/paneer-schezwan-frankie.jpg",
  wefarfrankie: "/images/wefar-frankie.jpg",
  vegcheesefrankie: "/images/veg-cheese-frankie.jpg",
  periperifriesspicy: "/images/peri-peri-fries-spicy.jpg",
  corntoast: "/images/corn-toast.jpg",

  // Garlic Bread
  garlicbread: "/images/garlic-bread.jpg",
  cheesechiligarlic: "/images/cheese-chili-garlic-bread.jpg",
  cheesecorngarlic: "/images/cheese-corn-garlic-bread.jpg",
  cheesepaneergarlic: "/images/cheese-paneer-garlic-bread.jpg",

  // Pizza
  margarita: "/images/pizza-margarita.jpg",
  suprimo: "/images/pizza-suprimo.jpg",
  italiano: "/images/pizza-italiano.jpg",
  americangarden: "/images/pizza-american-garden.jpg",
  chilimanchurian: "/images/pizza-chili-manchurian.jpg",
  mexicanpizza: "/images/pizza-mexican.jpg",
  tandooripaneer: "/images/pizza-tandoori-paneer.jpg",
};

const item = (
  en: string,
  hi: string,
  den: string,
  dhi: string,
  price: number,
  extra: Partial<FullMenuItem> = {},
): FullMenuItem => ({
  title: { en, hi },
  desc: { en: den, hi: dhi },
  price,
  kcal: null,
  weight: null,
  allergens: { en: [], hi: [] },
  img: null,
  ...extra,
});

export const MENU: FullMenuCategory[] = [
  {
    id: "espresso-drinks",
    label: { en: "Espresso Drinks", hi: "एस्प्रेसो ड्रिंक्स" },
    items: [
      item("Iced Latte", "आइस्ड लाते", "Double espresso, chilled milk, ice", "डबल एस्प्रेसो, ठंडा दूध, बर्फ", 240, { img: IMG.icedlatte }),
      item("Tiramisu Dalgona", "तिरामिसु डालगोना", "Whipped coffee foam, tiramisu cream, chilled milk", "व्हिप्ड कॉफ़ी फ़ोम, तिरामिसु क्रीम, ठंडा दूध", 260, { img: IMG.syrup }),
      item("Espresso Tonic", "एस्प्रेसो टॉनिक", "Espresso shot, tonic water, ice, citrus peel", "एस्प्रेसो शॉट, टॉनिक वॉटर, बर्फ, सिट्रस", 260, { img: IMG.vanillacoldbrew }),
      item("Orange & Mint Espresso", "ऑरेंज एंड मिंट एस्प्रेसो", "Espresso, fresh orange juice, mint, ice", "एस्प्रेसो, संतरे का रस, पुदीना, बर्फ", 220, { img: IMG.icedamericano }),
    ],
  },
  {
    id: "hot-coffee-manual",
    label: { en: "Hot Coffee & Manual Brews", hi: "हॉट कॉफ़ी और मैनुअल ब्रू" },
    items: [
      item("Espresso", "एस्प्रेसो", "Rich, concentrated shot of 100% Arabica espresso", "100% अरेबिका बीन्स से बना गाढ़ा एस्प्रेसो शॉट", 130, { img: IMG.espresso }),
      item("Americano (Hot / Cold)", "अमेरिकानो (हॉट / कोल्ड)", "Double espresso, hot water or ice", "डबल एस्प्रेसो, गर्म पानी या बर्फ", 160, { img: IMG.americano }),
      item("Cappuccino", "कैपुचीनो", "Espresso, steamed milk, velvety microfoam", "एस्प्रेसो, गर्म दूध, रेशमी झाग", 220, { img: IMG.cappuccino }),
      item("Latte", "लाते", "Espresso, silky steamed milk, light foam", "एस्प्रेसो, सिल्की गर्म दूध, हल्का झाग", 240, { img: IMG.latte }),
      item("Cafe Mocha", "कैफ़े मोका", "Espresso, dark chocolate, steamed milk", "एस्प्रेसो, डार्क चॉकलेट, गर्म दूध", 240, { img: IMG.mocha }),
      item("Nutella Latte", "नूटेला लाते", "Espresso, Nutella hazelnut spread, steamed milk", "एस्प्रेसो, नूटेला, गर्म दूध", 260, { img: IMG.hazelnutlatte }),
      item("Affogato", "अफ़ोगाटो", "Vanilla ice cream scoop, hot espresso shot", "वैनिला आइसक्रीम, गरमा-गरम एस्प्रेसो", 220, { img: IMG.affogato }),
      item("Hot Matcha Latte", "हॉट माचा लाते", "Japanese matcha, warm steamed milk", "जापानी माचा, गर्म दूध", 260, { img: IMG.hotmatcha }),
      item("Flavour Latte (Caramel / Irish / Tiramisu / Hazelnut)", "फ्लेवर लाते (कारमेल / आयरिश / तिरामिसु / हेज़लनट)", "Espresso, steamed milk, your choice of flavour syrup", "एस्प्रेसो, गर्म दूध, अपनी पसंद का फ्लेवर सिरप", 240, { img: IMG.tiramisulatte }),
      item("Pour Over", "पोर ओवर", "Hand-poured single origin coffee, paper filter, clean bright cup", "हाथ से तैयार सिंगल ओरिजिन फ़िल्टर कॉफ़ी", 320, { img: IMG.pourover }),
      item("AeroPress", "एयरोप्रेस", "Air-pressure extraction, full body, low acidity", "एयर-प्रेशर से निकली भरपूर बॉडी वाली कॉफ़ी", 320, { img: IMG.aeropress }),
      item("French Press", "फ़्रेंच प्रेस", "Full immersion brew, heavy mouthfeel, natural coffee oils", "फुल इमर्शन ब्रू, गाढ़ा स्वाद, प्राकृतिक ऑयल्स", 320, { img: IMG.frenchpress }),
    ],
  },
  {
    id: "hot-chocolate-matcha",
    label: { en: "Hot Chocolate & Matcha Specials", hi: "हॉट चॉकलेट और माचा स्पेशल" },
    items: [
      item("Classic Hot Chocolate", "क्लासिक हॉट चॉकलेट", "Rich dark cocoa, warm velvety milk", "डार्क कोको, गर्म मखमली दूध", 220, { img: IMG.cocoa }),
      item("White Hot Chocolate", "व्हाइट हॉट चॉकलेट", "White chocolate, warm milk, vanilla", "व्हाइट चॉकलेट, गर्म दूध, वैनिला", 220, { img: IMG.whitecocoa }),
      item("Flavour Hot Chocolate (Caramel / Irish / Tiramisu / Hazelnut)", "फ्लेवर हॉट चॉकलेट (कारमेल / आयरिश / तिरामिसु / हेज़लनट)", "Rich cocoa, warm milk, your choice of flavour syrup", "कोको, गर्म दूध, अपनी पसंद का फ्लेवर सिरप", 240, { img: IMG.cinnamonlatte }),
      item("Classic Matcha Latte", "क्लासिक माचा लाते", "Ceremonial Japanese matcha, steamed milk", "सेरेमोनियल जापानी माचा, गर्म दूध", 280, { img: IMG.hotmatcha }),
      item("The Berry Matcha", "द बेरी माचा", "Japanese matcha, mixed berry compote, chilled milk, ice", "जापानी माचा, बेरी कॉम्पोट, ठंडा दूध, बर्फ", 320, { img: IMG.strawmatcha }),
      item("Matcha Honey Lemon Tonic", "माचा हनी लेमन टॉनिक", "Japanese matcha, honey, fresh lemon, tonic water", "जापानी माचा, शहद, ताज़ा नींबू, टॉनिक वॉटर", 320, { img: IMG.yuzusoda }),
      item("Strawberry Matcha Latte", "स्ट्रॉबेरी माचा लाते", "Japanese matcha, fresh strawberry purée, chilled milk, ice", "जापानी माचा, स्ट्रॉबेरी प्यूरी, ठंडा दूध, बर्फ", 320, { img: IMG.strawmatcha }),
    ],
  },
  {
    id: "cold-coffee-brews",
    label: { en: "Cold Coffee & Cold Brews", hi: "कोल्ड कॉफ़ी और कोल्ड ब्रू" },
    items: [
      item("Cold Coffee", "कोल्ड कॉफ़ी", "Espresso, chilled milk, sugar, ice, blended frothy", "एस्प्रेसो, ठंडा दूध, चीनी, बर्फ", 220, { img: IMG.iced }),
      item("Cold Coffee with Ice Cream", "कोल्ड कॉफ़ी विद आइसक्रीम", "Classic cold coffee, vanilla ice cream scoop", "क्लासिक कोल्ड कॉफ़ी, वैनिला आइसक्रीम स्कूप", 240, { img: IMG.icecream }),
      item("Hazelnut Cold Coffee", "हेज़लनट कोल्ड कॉफ़ी", "Espresso, chilled milk, roasted hazelnut syrup, ice", "एस्प्रेसो, ठंडा दूध, हेज़लनट सिरप, बर्फ", 240, { img: IMG.hazelnutcoldbrew }),
      item("Brownie Cold Coffee", "ब्राउनी कोल्ड कॉफ़ी", "Espresso, chilled milk, fudgy brownie, chocolate sauce", "एस्प्रेसो, ठंडा दूध, फजी ब्राउनी, चॉकलेट सॉस", 260, { img: IMG.coconutlatte }),
      item("Caramel Cold Coffee", "कारमेल कोल्ड कॉफ़ी", "Espresso, chilled milk, buttery caramel, ice", "एस्प्रेसो, ठंडा दूध, कारमेल, बर्फ", 240, { img: IMG.carameliced }),
      item("Tiramisu Cold Coffee", "तिरामिसु कोल्ड कॉफ़ी", "Espresso, chilled milk, tiramisu syrup, cocoa dust", "एस्प्रेसो, ठंडा दूध, तिरामिसु सिरप, कोको डस्ट", 240, { img: IMG.tiramisulatte }),
      item("Cold Brew", "कोल्ड ब्रू", "Coffee slow steeped in cold water, served over ice", "ठंडे पानी में धीमी गति से तैयार कॉफ़ी, बर्फ के साथ", 240, { img: IMG.coldbrew }),
      item("Cold Brew with Red Bull / Tonic", "कोल्ड ब्रू विद रेड बुल / टॉनिक", "House cold brew, Red Bull or tonic water, ice", "हाउस कोल्ड ब्रू, रेड बुल या टॉनिक वॉटर, बर्फ", 310, { img: IMG.vanillacoldbrew }),
      item("Cold Brew with Juice", "कोल्ड ब्रू विद जूस", "House cold brew, fresh fruit juice, ice", "हाउस कोल्ड ब्रू, ताज़ा फलों का रस, बर्फ", 260, { img: IMG.icedamericano }),
      item("Italian Stallion", "इटैलियन स्टैलियन", "House cold brew, sweet cream, hazelnut, ice", "हाउस कोल्ड ब्रू, स्वीट क्रीम, हेज़लनट, बर्फ", 280, { img: IMG.hazelnutcoldbrew }),
    ],
  },
  {
    id: "frappes-milkshakes",
    label: { en: "Frappés & Milkshakes", hi: "फ्रापे और मिल्कशेक" },
    items: [
      item("Oreo Frappé", "ओरियो फ्रापे", "Blended coffee, Oreo cookies, ice, whipped cream", "ब्लेंडेड कॉफ़ी, ओरियो, बर्फ, ह्विप्ड क्रीम", 280, { img: IMG.oreoshake }),
      item("Biscoff Frappé", "बिस्कॉफ फ्रापे", "Blended coffee, Lotus Biscoff spread, biscuit crumble, ice", "ब्लेंडेड कॉफ़ी, लोटस बिस्कॉफ, बिस्कुट क्रम्बल, बर्फ", 320, { img: IMG.biscoffshake }),
      item("Brownie Blast Frappé", "ब्राउनी ब्लास्ट फ्रापे", "Blended coffee, fudgy brownie, chocolate sauce, ice", "ब्लेंडेड कॉफ़ी, फजी ब्राउनी, चॉकलेट सॉस, बर्फ", 320, { img: IMG.brownieshake }),
      item("Hazelnut Mud Frappé", "हेज़लनट मड फ्रापे", "Blended coffee, hazelnut syrup, chocolate, whipped cream", "ब्लेंडेड कॉफ़ी, हेज़लनट सिरप, चॉकलेट, ह्विप्ड क्रीम", 260, { img: IMG.whippedcream }),
      item("KitKat Frappé", "किटकैट फ्रापे", "Blended coffee, KitKat wafers, chocolate sauce, ice", "ब्लेंडेड कॉफ़ी, किटकैट, चॉकलेट सॉस, बर्फ", 300, { img: IMG.kitkatshake }),
      item("Double Chocolate Frappé", "डबल चॉकलेट फ्रापे", "Blended coffee, dark and milk chocolate, chocolate chips, ice", "ब्लेंडेड कॉफ़ी, डार्क और मिल्क चॉकलेट, चॉको चिप्स, बर्फ", 320, { img: IMG.nutellashake }),
      item("Vanilla / Chocolate Shake", "वैनिला / चॉकलेट शेक", "Chilled milk, vanilla or chocolate ice cream, chocolate drizzle", "ठंडा दूध, वैनिला या चॉकलेट आइसक्रीम, चॉकलेट सिरप", 240, { img: IMG.nutellashake }),
      item("Oreo Bar", "ओरियो बार", "Crunchy Oreo cookies, vanilla ice cream, chilled milk", "क्रंची ओरियो, वैनिला आइसक्रीम, ठंडा दूध", 260, { img: IMG.oreoshake }),
      item("KitKat Blast", "किटकैट ब्लास्ट", "Crispy KitKat wafers, chocolate ice cream, chilled milk", "क्रिस्पी किटकैट, चॉकलेट आइसक्रीम, ठंडा दूध", 280, { img: IMG.kitkatshake }),
      item("Snickers Shake", "स्निकर्स शेक", "Snickers bar, caramel, peanuts, chocolate ice cream", "स्निकर्स बार, कारमेल, मूंगफली, चॉकलेट आइसक्रीम", 280, { img: IMG.ferreroshake }),
      item("Brownie with Nutella", "ब्राउनी विद नूटेला", "Fudgy brownie, Nutella, chocolate ice cream, chilled milk", "फजी ब्राउनी, नूटेला, चॉकलेट आइसक्रीम, ठंडा दूध", 320, { img: IMG.brownieshake }),
      item("Mango / Strawberry Shake", "मैंगो / स्ट्रॉबेरी शेक", "Fresh mango or strawberry, vanilla ice cream, chilled milk", "ताज़ा आम या स्ट्रॉबेरी, वैनिला आइसक्रीम, ठंडा दूध", 280, { img: IMG.mangoshake }),
      item("Honey Banana Shake", "हनी बनाना शेक", "Ripe banana, natural honey, chilled milk", "पका केला, शहद, ठंडा दूध", 300, { img: IMG.butterscotchshake }),
    ],
  },
  {
    id: "smoothies",
    label: { en: "Smoothies & Fruit Shakes", hi: "स्मूदी और फ्रूट शेक" },
    items: [
      item("Strawberry & Mint Smoothie", "स्ट्रॉबेरी एंड मिंट स्मूदी", "Fresh strawberries, mint, yogurt, honey", "ताज़ी स्ट्रॉबेरी, पुदीना, दही, शहद", 240, { img: IMG.blueberryshake }),
      item("Mix Fruit Smoothie", "मिक्स फ्रूट स्मूदी", "Seasonal fruits, yogurt, honey", "मौसमी फल, दही, शहद", 240, { img: IMG.mangoshake }),
      item("Kiwi Fantasy", "कीवी फैंटेसी", "Fresh kiwi, green apple, yogurt, honey", "ताज़ा कीवी, ग्रीन एप्पल, दही, शहद", 230, { img: IMG.yuzusoda }),
      item("Kaju Banana Smoothie", "काजू बनाना स्मूदी", "Cashews, ripe banana, chilled milk, honey", "काजू, पका केला, ठंडा दूध, शहद", 260, { img: IMG.pistachioshake }),
    ],
  },
  {
    id: "mocktails",
    label: { en: "Signature Mocktails", hi: "सिग्नेचर मॉकटेल्स" },
    items: [
      item("Classic Mojito", "क्लासिक मोहीतो", "Fresh mint, lime wedges, cane sugar, sparkling soda", "ताज़ा पुदीना, नींबू, चीनी, सोडा", 220, { img: IMG.lycheelove }),
      item("Flavoured Mojito (Green Apple / Strawberry / Blueberry / Orange)", "फ्लेवर्ड मोहीतो (ग्रीन एप्पल / स्ट्रॉबेरी / ब्लूबेरी / ऑरेंज)", "Your choice of fruit, fresh mint, lime, sparkling soda", "अपनी पसंद का फ्लेवर, पुदीना, नींबू, सोडा", 240, { img: IMG.greenapple }),
      item("Blue Lagoon", "ब्लू लगून", "Blue curacao, lemon, mint, chilled soda", "ब्लू कुराकाओ, नींबू, पुदीना, ठंडा सोडा", 220, { img: IMG.blueocean }),
      item("Tropical Mojito", "ट्रॉपिकल मोहीतो", "Tropical fruit syrup, fresh mint, lime, sparkling soda", "ट्रॉपिकल फ्रूट सिरप, पुदीना, नींबू, सोडा", 240, { img: IMG.yuzusoda }),
      item("Colorado Bulldog", "कोलोराडो बुलडॉग", "Coffee syrup, fresh cream, chilled cola, ice", "कॉफ़ी सिरप, फ्रेश क्रीम, ठंडा कोला, बर्फ", 280, { img: IMG.coloradobulldog }),
      item("Spicy Guava", "स्पाइसी ग्वावा", "Pink guava juice, chilli-salt rim, lemon splash", "अमरूद का रस, मिर्च-नमक रिम, नींबू", 240, { img: IMG.guavapunch }),
      item("Pina Colada", "पिना कोलाडा", "Coconut cream, pineapple, crushed ice", "नारियल क्रीम, अनानास, क्रश्ड बर्फ", 260, { img: IMG.pinacolada }),
      item("Maldivian Beauty", "मालदीवियन ब्यूटी", "Orange juice, tropical fruit, citrus fizz", "संतरे का रस, ट्रॉपिकल फ्रूट, सिट्रस सोडा", 280, { img: IMG.orange }),
      item("Strawberry Heaven", "स्ट्रॉबेरी हेवन", "Crushed strawberries, lime, mint, sparkling soda", "क्रश्ड स्ट्रॉबेरी, नींबू, पुदीना, सोडा", 240, { img: IMG.berrybliss }),
      item("Fruit Punch", "फ्रूट पंच", "Mixed fruit juices, lime, mint, ice", "मिक्स फ्रूट जूस, नींबू, पुदीना, बर्फ", 230, { img: IMG.watermelon }),
      item("Bartender Special", "बारटेंडर स्पेशल", "Our bartender's secret house blend, fresh fruit, sparkling fizz", "बारटेंडर का सीक्रेट ब्लेंड, ताज़ा फल, सोडा", 380, { img: IMG.passion }),
    ],
  },
  {
    id: "ice-tea",
    label: { en: "Iced Teas & Lemonades", hi: "आइस्ड टी और लेमनेड" },
    items: [
      item("Lemon & Mint Ice Tea", "लेमन एंड मिंट आइस टी", "Brewed black tea, fresh lemon, mint, ice", "ब्लैक टी, ताज़ा नींबू, पुदीना, बर्फ", 240, { img: IMG.lemonade }),
      item("Peach Ice Tea", "पीच आइस टी", "Brewed black tea, peach syrup, lemon, ice", "ब्लैक टी, पीच सिरप, नींबू, बर्फ", 240, { img: IMG.ginger }),
      item("Long Island Tea (LIT)", "लॉन्ग आइलैंड टी (LIT)", "Brewed tea, cola, lemon, ice (non-alcoholic)", "ब्रू की हुई चाय, कोला, नींबू, बर्फ (नॉन-अल्कोहलिक)", 260, { img: IMG.peppermint }),
    ],
  },
  {
    id: "sandwich",
    label: { en: "Grilled Sandwiches", hi: "ग्रिल्ड सैंडविच" },
    items: [
      item("Dhamal Sandwich", "धमाल सैंडविच", "Loaded veggies, spicy masala, cheese, green chutney, grilled", "भरपूर सब्ज़ियाँ, मसाला, चीज़, हरी चटनी, ग्रिल्ड", 260, { img: IMG.grilledsandwich }),
      item("Veg Cheese Grill", "वेज चीज़ ग्रिल", "Fresh veggies, melted cheese, butter, golden grilled bread", "ताज़ी सब्ज़ियाँ, पिघला चीज़, मक्खन, ग्रिल्ड ब्रेड", 300, { img: IMG.cheese }),
      item("Cheese Chili Corn Sandwich", "चीज़ चिली कॉर्न सैंडविच", "Sweet corn, green chilli, melted cheese, grilled bread", "स्वीट कॉर्न, हरी मिर्च, पिघला चीज़, ग्रिल्ड ब्रेड", 280, { img: IMG.cheesechilicorn }),
      item("Smokey Paneer Sandwich", "स्मोकी पनीर सैंडविच", "Smoky tandoori paneer, onions, mint mayo, grilled bread", "स्मोकी तंदूरी पनीर, प्याज़, मिंट मेयो, ग्रिल्ड ब्रेड", 320, { img: IMG.paneer }),
    ],
  },
  {
    id: "frankie",
    label: { en: "Classic Frankies & Wraps", hi: "क्लासिक फ्रैंकी और रैप्स" },
    items: [
      item("Veg Frankie", "वेज फ्रैंकी", "Spiced veg filling, onions, chutney, soft roti wrap", "मसालेदार सब्ज़ी, प्याज़, चटनी, नरम रोटी रैप", 140, { img: IMG.periperiwrap }),
      item("Veg Cheese Frankie", "वेज चीज़ फ्रैंकी", "Spiced veg filling, melted cheese, onions, soft roti wrap", "मसालेदार सब्ज़ी, चीज़, प्याज़, नरम रोटी रैप", 180, { img: IMG.vegcheesefrankie }),
      item("Kabab Frankie", "कबाब फ्रैंकी", "Veg kababs, onions, mint chutney, soft roti wrap", "वेज कबाब, प्याज़, पुदीना चटनी, नरम रोटी रैप", 170, { img: IMG.kababfrankie }),
      item("Paneer Schezwan Frankie", "पनीर शेज़वान फ्रैंकी", "Paneer cubes, spicy schezwan sauce, onions, soft roti wrap", "पनीर, तीखी शेज़वान सॉस, प्याज़, नरम रोटी रैप", 220, { img: IMG.paneerschezwanfrankie }),
      item("Wefar Frankie", "वेफ़र फ्रैंकी", "Crunchy potato wafers, spiced veg filling, sauces, soft roti wrap", "क्रंची वेफ़र्स, मसालेदार सब्ज़ी, सॉस, नरम रोटी रैप", 180, { img: IMG.wefarfrankie }),
      item("Chinese Punch Frankie", "चाइनीज़ पंच फ्रैंकी", "Indo-Chinese noodles, veggies, schezwan sauce, soft roti wrap", "इंडो-चाइनीज़ नूडल्स, सब्ज़ियाँ, शेज़वान सॉस, रोटी रैप", 190, { img: IMG.paneerwrap }),
    ],
  },
  {
    id: "burger",
    label: { en: "Burgers", hi: "बर्गर" },
    items: [
      item("Veg Burger", "वेज बर्गर", "Crispy veg patty, lettuce, tomato, house mayo", "क्रिस्पी वेज पैटी, लेट्यूस, टमाटर, मेयोनेज़", 160, { img: IMG.vegburger }),
      item("Veg Cheese Burger", "वेज चीज़ बर्गर", "Crispy veg patty, cheese slice, lettuce, house mayo", "क्रिस्पी वेज पैटी, चीज़ स्लाइस, लेट्यूस, मेयोनेज़", 210, { img: IMG.vegcheeseburger }),
      item("Schezwan Burger", "शेज़वान बर्गर", "Crispy veg patty, spicy schezwan sauce, onions, lettuce", "क्रिस्पी वेज पैटी, तीखी शेज़वान सॉस, प्याज़, लेट्यूस", 180, { img: IMG.periperiburger }),
      item("Peri Peri Cheese Burger", "पेरी पेरी चीज़ बर्गर", "Crispy patty, peri-peri spice, melted cheese, jalapeños", "क्रिस्पी पैटी, पेरी पेरी मसाला, चीज़, जलापेनो", 180, { img: IMG.peripericheeseburger }),
      item("Tandoori Burger", "तंदूरी बर्गर", "Crispy veg patty, smoky tandoori mayo, onions, lettuce", "क्रिस्पी वेज पैटी, तंदूरी मेयो, प्याज़, लेट्यूस", 210, { img: IMG.tandooriburger }),
    ],
  },
  {
    id: "fries",
    label: { en: "Fries & Sides", hi: "फ्राइज़ और साइड्स" },
    items: [
      item("French Fries (Regular / Salt)", "फ्रेंच फ्राइज़ (रेगुलर / सॉल्ट)", "Golden crispy potato fries, sea salt", "गोल्डन क्रिस्पी फ्राइज़, नमक", 170, { img: IMG.periperifries }),
      item("Peri Peri Fries", "पेरी पेरी फ्राइज़", "Crispy fries, tangy peri-peri seasoning", "क्रिस्पी फ्राइज़, चटपटा पेरी पेरी मसाला", 190, { img: IMG.periperifriesspicy }),
      item("Cheese Fries", "चीज़ फ्राइज़", "Crispy fries, warm cheese sauce, herbs", "क्रिस्पी फ्राइज़, गर्म चीज़ सॉस, हर्ब्स", 210, { img: IMG.loadedfries }),
    ],
  },
  {
    id: "pizza",
    label: { en: "Artisan Pizzas", hi: "आर्टिज़न पिज़्ज़ा" },
    items: [
      item("Margarita Pizza", "मार्गरीटा पिज़्ज़ा", "Tomato sauce, mozzarella cheese, oregano", "टोमैटो सॉस, मोज़ेरेला चीज़, ओरेगैनो", 250, { img: IMG.margarita }),
      item("Suprimo Pizza", "सुप्रीमो पिज़्ज़ा", "Onion, capsicum, tomato, sweet corn, mozzarella", "प्याज़, शिमला मिर्च, टमाटर, स्वीट कॉर्न, मोज़ेरेला", 270, { img: IMG.suprimo }),
      item("Italiano Pizza", "इटालियानो पिज़्ज़ा", "Olives, jalapeños, bell peppers, Italian herbs, mozzarella", "ऑलिव्स, जलापेनो, शिमला मिर्च, इटैलियन हर्ब्स, चीज़", 290, { img: IMG.italiano }),
      item("American Garden Pizza", "अमेरिकन गार्डन पिज़्ज़ा", "Garden fresh veggies, mushrooms, sweet corn, extra cheese", "ताज़ी सब्ज़ियाँ, मशरूम, स्वीट कॉर्न, एक्स्ट्रा चीज़", 340, { img: IMG.americangarden }),
      item("Chili Manchurian Pizza", "चिली मंचूरियन पिज़्ज़ा", "Veg manchurian, chilli sauce, spring onion, mozzarella", "वेज मंचूरियन, चिली सॉस, हरा प्याज़, मोज़ेरेला", 290, { img: IMG.chilimanchurian }),
      item("Mexican Pizza", "मैक्सिकन पिज़्ज़ा", "Salsa, jalapeños, beans, sweet corn, mozzarella", "साल्सा, जलापेनो, बीन्स, स्वीट कॉर्न, मोज़ेरेला", 320, { img: IMG.mexicanpizza }),
      item("Tandoori Paneer Pizza", "तंदूरी पनीर पिज़्ज़ा", "Tandoori paneer, onion, capsicum, mozzarella", "तंदूरी पनीर, प्याज़, शिमला मिर्च, मोज़ेरेला", 350, { img: IMG.tandooripaneer }),
    ],
  },
  {
    id: "garlic-breads",
    label: { en: "Garlic Breads & Toasts", hi: "गार्लिक ब्रेड और टोस्ट" },
    items: [
      item("Garlic Bread", "गार्लिक ब्रेड", "Toasted bread, garlic butter, herbs", "टोस्टेड ब्रेड, गार्लिक बटर, हर्ब्स", 180, { img: IMG.garlicbread }),
      item("Cheese Chili Garlic Bread", "चीज़ चिली गार्लिक ब्रेड", "Garlic butter bread, melted cheese, green chilli", "गार्लिक बटर ब्रेड, पिघला चीज़, हरी मिर्च", 250, { img: IMG.cheesechiligarlic }),
      item("Cheese Corn Garlic Bread", "चीज़ कॉर्न गार्लिक ब्रेड", "Garlic butter bread, sweet corn, melted cheese", "गार्लिक बटर ब्रेड, स्वीट कॉर्न, पिघला चीज़", 280, { img: IMG.cheesecorngarlic }),
      item("Cheese Paneer Garlic Bread", "चीज़ पनीर गार्लिक ब्रेड", "Garlic butter bread, spiced paneer, melted cheese", "गार्लिक बटर ब्रेड, मसालेदार पनीर, पिघला चीज़", 310, { img: IMG.cheesepaneergarlic }),
      item("Paneer Chilli Toast", "पनीर चिली टोस्ट", "Spiced paneer, green chilli, cheese, toasted bread", "मसालेदार पनीर, हरी मिर्च, चीज़, टोस्टेड ब्रेड", 250, { img: IMG.paneer }),
      item("Italian Toast", "इटैलियन टोस्ट", "Italian herbs, tomato, olives, melted cheese, toasted bread", "इटैलियन हर्ब्स, टमाटर, ऑलिव्स, चीज़, टोस्टेड ब्रेड", 230, { img: IMG.mushroommelt }),
      item("Corn Toast", "कॉर्न टोस्ट", "Sweet corn, creamy white sauce, cheese, toasted bread", "स्वीट कॉर्न, क्रीमी व्हाइट सॉस, चीज़, टोस्टेड ब्रेड", 240, { img: IMG.corntoast }),
    ],
  },
];

export interface MenuGroup {
  id: string;
  label: Record<Lang, string>;
  categoryIds: string[];
}

export const MENU_GROUPS: MenuGroup[] = [
  {
    id: "hot-beverages",
    label: { en: "Hot Beverages", hi: "हॉट बेवरेजेस" },
    categoryIds: ["espresso-drinks", "hot-coffee-manual", "hot-chocolate-matcha"],
  },
  {
    id: "cold-beverages",
    label: { en: "Cold Beverages", hi: "कोल्ड बेवरेजेस" },
    categoryIds: ["cold-coffee-brews", "frappes-milkshakes", "smoothies"],
  },
  {
    id: "refreshers-mocktails",
    label: { en: "Refreshers & Mocktails", hi: "रिफ्रेशर्स और मॉकटेल्स" },
    categoryIds: ["mocktails", "ice-tea"],
  },
  {
    id: "sandwiches-frankies",
    label: { en: "Sandwiches & Frankies", hi: "सैंडविच और फ्रैंकी" },
    categoryIds: ["sandwich", "frankie"],
  },
  {
    id: "burgers-sliders",
    label: { en: "Burgers & Sliders", hi: "बर्गर और स्लाइडर्स" },
    categoryIds: ["burger", "fries"],
  },
  {
    id: "pizzas-breads",
    label: { en: "Pizzas & Breads", hi: "पिज़्ज़ा और ब्रेड" },
    categoryIds: ["pizza", "garlic-breads"],
  },
];

export const categoryMin = (id: string) => {
  const cat = MENU.find((c) => c.id === id);
  if (!cat || cat.items.length === 0) return null;
  return Math.min(...cat.items.map((i) => i.price));
};
