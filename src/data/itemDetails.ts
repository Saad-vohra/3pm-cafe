import type { FullMenuItem } from "./menu";
import type { Lang } from "@/lib/i18n";

export interface ItemDetailData {
  ingredients: Record<Lang, string[]>;
  nutrition: {
    calories: string;
    servingSize: string;
    protein: string;
    carbs: string;
    fat: string;
    fiber?: string;
  };
  dietary: Record<Lang, string[]>;
  highlights: Record<Lang, string[]>;
}

const DETAILS_MAP: Record<string, ItemDetailData> = {
  "Sufi's Special Coffee (House Blend)": {
    ingredients: {
      en: ["Single-origin Arabica beans", "Secret roast spices", "Steamed full cream milk", "Velvet cocoa dust"],
      hi: ["सिंगल ओरिजिन अरेबिका बीन्स", "सीक्रेट मसाले", "गाढ़ा गर्म दूध", "कोको डस्ट"],
    },
    nutrition: {
      calories: "190 kcal",
      servingSize: "240 ml",
      protein: "7 g",
      carbs: "18 g",
      fat: "9 g",
    },
    dietary: {
      en: ["House Specialty", "Contains Dairy", "Vegetarian"],
      hi: ["हाउस स्पेशलिटी", "डेयरी", "शाकाहारी"],
    },
    highlights: {
      en: ["Our head barista's private reserve roasted to perfection with aromatic warm spices."],
      hi: ["सूफ़ी कैफ़े का खास सीक्रेट रोस्ट, सुगंधित मसालों और मखमली झाग के साथ।"],
    },
  },

  "Spanish Latte (Condensed Milk)": {
    ingredients: {
      en: ["Specialty Arabica espresso", "Sweet condensed milk", "Steamed whole milk", "Microfoam"],
      hi: ["अरेबिका एस्प्रेसो", "कंडेंस्ड मिल्क", "गाढ़ा गर्म दूध", "माइक्रोफ़ोम"],
    },
    nutrition: {
      calories: "230 kcal",
      servingSize: "240 ml",
      protein: "8 g",
      carbs: "28 g",
      fat: "9 g",
    },
    dietary: {
      en: ["Contains Dairy", "Vegetarian", "Sweet & Rich"],
      hi: ["डेयरी", "शाकाहारी", "मीठा और मखमली"],
    },
    highlights: {
      en: ["Delightful layered contrast of bold espresso and velvety sweet condensed milk."],
      hi: ["बोल्ड एस्प्रेसो और मीठे कंडेंस्ड मिल्क का शानदार संगम।"],
    },
  },

  "Turkish Coffee": {
    ingredients: {
      en: ["Extra-fine ground Arabica beans", "Green cardamom pod", "Pure cane sugar", "Filtered spring water"],
      hi: ["महीन पिसी अरेबिका कॉफ़ी", "हरी इलायची", "शुद्ध शक्कर", "फ़िल्टर्ड पानी"],
    },
    nutrition: {
      calories: "45 kcal",
      servingSize: "90 ml",
      protein: "1 g",
      carbs: "9 g",
      fat: "0.5 g",
    },
    dietary: {
      en: ["Vegan", "Dairy-Free", "Traditional Heritage"],
      hi: ["शाकाहारी", "डेयरी-मुक्त", "पारंपरिक हेरिटेज"],
    },
    highlights: {
      en: ["Slow simmered in an authentic copper cezve for a thick, velvety foam and deep aroma."],
      hi: ["तांबे के पारंपरिक बर्तन (सेज़वे) में धीमी आंच पर पकी गाढ़ी और खुशबूदार कॉफ़ी।"],
    },
  },

  "Sufi's Special Platter": {
    ingredients: {
      en: ["Mini grilled wraps", "Crispy loaded fries", "Cheese nachos with salsa", "Chipotle aioli", "Mint garlic dip"],
      hi: ["मिनी वेज रैप", "क्रिस्पी लोडेड फ्राइज़", "चीज़ नाचोज़", "साल्सा", "स्पेशल डिप्स"],
    },
    nutrition: {
      calories: "820 kcal",
      servingSize: "550 g",
      protein: "24 g",
      carbs: "88 g",
      fat: "42 g",
    },
    dietary: {
      en: ["Vegetarian", "Contains Dairy", "Chef's Signature Sharing Platter"],
      hi: ["शाकाहारी", "डेयरी", "शेफ़ का खास शेयरिंग प्लेटर"],
    },
    highlights: {
      en: ["The ultimate cafe sharing board featuring all of our most-loved savory creations."],
      hi: ["हमारे सबसे पसंदीदा स्नैक्स और स्पेशल सॉस का शानदार शेयरिंग प्लेटर।"],
    },
  },

  "Lotus Biscoff Cheesecake": {
    ingredients: {
      en: ["Philadelphia cream cheese", "Lotus Biscoff spread", "Speculoos biscuit crumb", "Heavy cream", "Butter"],
      hi: ["क्रीम चीज़", "लोटस बिस्कॉफ स्प्रेड", "बिस्कुट क्रस्ट", "हैवी क्रीम", "मक्खन"],
    },
    nutrition: {
      calories: "520 kcal",
      servingSize: "180 g",
      protein: "8 g",
      carbs: "52 g",
      fat: "32 g",
    },
    dietary: {
      en: ["Vegetarian", "Contains Dairy", "Contains Gluten"],
      hi: ["शाकाहारी", "डेयरी", "ग्लूटन"],
    },
    highlights: {
      en: ["Silky smooth baked cheesecake crowned with warm spiced caramelized speculoos."],
      hi: ["कैरेमलाइज्ड लोटस बिस्कॉफ स्प्रेड से सजी बेहद मखमली और स्वादिष्ट चीज़केक।"],
    },
  },
  "Soft eggs on sourdough": {
    ingredients: {
      en: ["Sourdough bread", "fresh avocado", "eggs", "lemon oil", "salt", "pepper"],
      hi: ["सॉरडो ब्रेड", "ताज़ा एवोकाडो", "अंडे", "लेमन ऑयल", "नमक", "काली मिर्च"],
    },
    nutrition: {
      calories: "480 kcal",
      servingSize: "260 g",
      protein: "18 g",
      carbs: "38 g",
      fat: "28 g",
      fiber: "7 g",
    },
    dietary: {
      en: ["Vegetarian", "Contains Egg", "Healthy Fats", "Rich in Omega-3"],
      hi: ["शाकाहारी", "अंडा शामिल", "हेल्दी फैट्स", "ओमेगा-3 युक्त"],
    },
    highlights: {
      en: ["Made fresh to order with organic free-range eggs and naturally fermented bread."],
      hi: ["ऑर्गेनिक अंडे और प्राकृतिक रूप से फर्मेन्टेड ब्रेड से ताज़ा तैयार।"],
    },
  },

  "Masala scramble": {
    ingredients: {
      en: ["Free-range farm eggs", "Vine-ripened tomatoes", "Fresh green chillies", "Red onion & ginger", "Fresh garden coriander", "Pure dairy butter", "Toasted artisanal sourdough"],
      hi: ["ताज़ा अंडे", "टमाटर", "हरी मिर्च", "लाल प्याज़ और अदरक", "ताज़ा धनिया", "मक्खन", "टोस्टेड सॉरडो ब्रेड"],
    },
    nutrition: {
      calories: "520 kcal",
      servingSize: "250 g",
      protein: "22 g",
      carbs: "32 g",
      fat: "34 g",
      fiber: "4 g",
    },
    dietary: {
      en: ["High Protein", "Vegetarian", "Contains Egg", "Contains Dairy"],
      hi: ["हाई प्रोटीन", "शाकाहारी", "अंडा", "डेयरी"],
    },
    highlights: {
      en: ["Cooked low and slow with fresh aromatic Indian spices and golden buttered toast."],
      hi: ["धीमी आंच पर पके ताज़ा मसालेदार अंडे और क्रिस्पी बटर टोस्ट।"],
    },
  },

  "Yogurt & granola bowl": {
    ingredients: {
      en: ["Creamy Greek yogurt", "House-toasted rolled oats", "Roasted California almonds", "Organic chia seeds", "Fresh blueberries & strawberries", "Raw wildflower honey"],
      hi: ["ग्रीक योगर्ट", "भुने हुए ओट्स", "कैलिफोर्निया बादाम", "चिया सीड्स", "ताज़ी ब्लूबेरी और स्ट्रॉबेरी", "प्राकृतिक शहद"],
    },
    nutrition: {
      calories: "380 kcal",
      servingSize: "300 g",
      protein: "15 g",
      carbs: "52 g",
      fat: "14 g",
      fiber: "6 g",
    },
    dietary: {
      en: ["Vegetarian", "Probiotic Rich", "Contains Nuts", "Antioxidant Rich"],
      hi: ["शाकाहारी", "प्रोबायोटिक युक्त", "मेवे शामिल", "एंटीऑक्सीडेंट युक्त"],
    },
    highlights: {
      en: ["Fresh probiotic house yogurt paired with golden crunchy granola baked daily."],
      hi: ["रोज़ाना बेक किए गए क्रंची ग्रेनोला और ताज़े ग्रीक योगर्ट का उत्तम संगम।"],
    },
  },

  "Banana oat pancakes": {
    ingredients: {
      en: ["Rolled whole oat flour", "Ripe bananas", "Creamy almond milk", "Pure organic maple syrup", "Ceylon cinnamon", "Toasted pumpkin & flax seeds"],
      hi: ["ओट आटा", "पके केले", "बादाम का दूध", "ऑर्गेनिक मेपल सिरप", "दालचीनी", "कद्दू और अलसी के बीज"],
    },
    nutrition: {
      calories: "610 kcal",
      servingSize: "280 g",
      protein: "14 g",
      carbs: "96 g",
      fat: "18 g",
      fiber: "10 g",
    },
    dietary: {
      en: ["Vegetarian", "High Fiber", "Nutrient Dense", "Naturally Sweetened"],
      hi: ["शाकाहारी", "हाई फाइबर", "पोषक तत्वों से भरपूर", "प्राकृतिक मिठास"],
    },
    highlights: {
      en: ["Stack of three fluffy oat pancakes sweetened naturally and topped with warm seeds."],
      hi: ["बिना मैदे के तैयार सॉफ्ट और हेल्दी तीन पैनकेक, भुने बीजों के साथ।"],
    },
  },

  "Warm porridge": {
    ingredients: {
      en: ["Organic steel-cut oats", "Warm whole milk or oat milk", "Freshly crushed green cardamom", "Wild honey poached pear", "Crushed roasted pistachios"],
      hi: ["ऑर्गेनिक ओट्स", "गर्म दूध या ओट मिल्क", "हरी इलायची", "शहद में पकी नाशपाती", "भुने पिस्ते"],
    },
    nutrition: {
      calories: "340 kcal",
      servingSize: "280 g",
      protein: "11 g",
      carbs: "56 g",
      fat: "9 g",
      fiber: "8 g",
    },
    dietary: {
      en: ["Vegetarian", "Heart Healthy", "Warm & Comforting", "Contains Nuts"],
      hi: ["शाकाहारी", "हार्ट हेल्दी", "पौष्टिक और गरम", "मेवे शामिल"],
    },
    highlights: {
      en: ["Slowly simmered with fragrant cardamom and topped with soft spiced fruit."],
      hi: ["इलायची की खुशबू और ताज़ा पके फलों के साथ धीमी आंच पर तैयार दलिया।"],
    },
  },

  "Grilled cheese": {
    ingredients: {
      en: ["Crusty artisan sourdough", "Aged English cheddar", "Swiss gruyère", "Fresh mozzarella", "Slow-simmered spiced tomato jam", "Cultured French butter"],
      hi: ["सॉरडो ब्रेड", "एज्ड चेद्दार चीज़", "ग्रुयेर", "मोज़ेरेला", "मसालेदार टमाटर जैम", "मक्खन"],
    },
    nutrition: {
      calories: "640 kcal",
      servingSize: "220 g",
      protein: "26 g",
      carbs: "48 g",
      fat: "38 g",
      fiber: "3 g",
    },
    dietary: {
      en: ["Vegetarian", "Contains Gluten", "Contains Dairy", "Comfort Classic"],
      hi: ["शाकाहारी", "ग्लूटन", "डेयरी", "क्लासिक चीज़"],
    },
    highlights: {
      en: ["Triple cheese blend melted to perfection with sweet & tangy tomato jam."],
      hi: ["तीन प्रकार के प्रीमियम चीज़ का परफेक्ट मेल्ट और घर का बना स्पेशल टोमैटो जैम।"],
    },
  },

  "Paneer tikka toast": {
    ingredients: {
      en: ["Charcoal-charred malai paneer cubes", "Artisanal sourdough bread", "Fresh mint & coriander hung-curd chutney", "Spiced pickled red onion", "Chaat masala seasoning"],
      hi: ["भुना मलाई पनीर", "सॉरडो ब्रेड", "पुदीना-धनिया दही चटनी", "मसालेदार सिरका प्याज़", "चाट मसाला"],
    },
    nutrition: {
      calories: "520 kcal",
      servingSize: "240 g",
      protein: "24 g",
      carbs: "44 g",
      fat: "28 g",
      fiber: "4 g",
    },
    dietary: {
      en: ["Vegetarian", "High Protein", "Contains Dairy", "Contains Gluten"],
      hi: ["शाकाहारी", "हाई प्रोटीन", "डेयरी", "ग्लूटन"],
    },
    highlights: {
      en: ["Fresh local paneer marinated in home ground spices and toasted golden."],
      hi: ["घर के मसालों में मैरिनेट किया हुआ पनीर और कुरकुरी टोस्टेड ब्रेड।"],
    },
  },

  "Mushroom melt": {
    ingredients: {
      en: ["Sautéed wild thyme and cremini mushrooms", "Melted Swiss gruyère", "Roasted garlic herb butter", "Toasted rustic country loaf", "Cracked black pepper"],
      hi: ["थाइम व मशरूम", "ग्रुयेर चीज़", "गार्लिक हर्ब बटर", "टोस्टेड ब्रेड", "काली मिर्च"],
    },
    nutrition: {
      calories: "590 kcal",
      servingSize: "230 g",
      protein: "20 g",
      carbs: "42 g",
      fat: "36 g",
      fiber: "5 g",
    },
    dietary: {
      en: ["Vegetarian", "Rich Umami", "Contains Dairy", "Contains Gluten"],
      hi: ["शाकाहारी", "उमामी स्वाद", "डेयरी", "ग्लूटन"],
    },
    highlights: {
      en: ["Pan-seared thyme mushrooms under a layer of melted nutty gruyère."],
      hi: ["मक्खन और थाइम में भुने ताज़ा मशरूम और मेल्टेड ग्रुयेर चीज़।"],
    },
  },

  "Cucumber & herb": {
    ingredients: {
      en: ["Crisp English cucumbers", "Whipped lemon-herb cream cheese", "Fresh baby dill & chives", "Cracked Tellicherry pepper", "German dark rye bread"],
      hi: ["कुरकुरा खीरा", "लेमन-हर्ब क्रीम चीज़", "ताज़ा डिल", "काली मिर्च", "डार्क राई ब्रेड"],
    },
    nutrition: {
      calories: "300 kcal",
      servingSize: "200 g",
      protein: "9 g",
      carbs: "36 g",
      fat: "14 g",
      fiber: "5 g",
    },
    dietary: {
      en: ["Vegetarian", "Refreshing", "Light & Crisp", "Contains Dairy"],
      hi: ["शाकाहारी", "ताज़ा और हल्का", "डेयरी"],
    },
    highlights: {
      en: ["Cool and crisp tea-time toast with light whipped cream cheese."],
      hi: ["हल्का और ताज़गी भरा टोस्ट, क्रीम चीज़ और फ्रेश डिल के साथ।"],
    },
  },

  "Green grain bowl": {
    ingredients: {
      en: ["Pearl barley grains", "Tender baby spinach", "Roasted broccoli florets", "Pickled Meyer lemon", "Toasted sesame tahini dressing", "Fresh avocado", "Sunflower seeds"],
      hi: ["जौ के दाने", "पालक", "भुनी ब्रोकली", "नींबू अचार", "तिल ताहिनी ड्रेसिंग", "एवोकाडो", "सूरजमुखी के बीज"],
    },
    nutrition: {
      calories: "460 kcal",
      servingSize: "340 g",
      protein: "16 g",
      carbs: "64 g",
      fat: "18 g",
      fiber: "12 g",
    },
    dietary: {
      en: ["100% Plant Based (Vegan)", "High Fiber", "Nutrient Packed", "Clean Eating"],
      hi: ["वीगन (प्लांट बेस्ड)", "हाई फाइबर", "पोषक तत्वों से भरपूर"],
    },
    highlights: {
      en: ["wholesome grains tossed with zesty greens and creamy sesame tahini."],
      hi: ["स्वादिष्ट अनाजों, हरी सब्ज़ियों और क्रीमी ताहिनी ड्रेसिंग का संपूर्ण बाउल।"],
    },
  },

  "Roast beet & feta": {
    ingredients: {
      en: ["Slow-roasted organic red beetroot", "Crumbled Greek feta cheese", "Toasted California walnuts", "Fresh sweet orange segments", "Aged balsamic glaze", "Baby arugula leaves"],
      hi: ["भुना चुकंदर", "ग्रीक फेटा चीज़", "कैलिफोर्निया अखरोट", "ताज़ा संतरा", "बाल्समिक ग्लेज़", "अरुगुला"],
    },
    nutrition: {
      calories: "400 kcal",
      servingSize: "280 g",
      protein: "12 g",
      carbs: "32 g",
      fat: "26 g",
      fiber: "6 g",
    },
    dietary: {
      en: ["Vegetarian", "Gluten Free", "Contains Nuts", "Contains Dairy"],
      hi: ["शाकाहारी", "ग्लूटन मुक्त", "मेवे", "डेयरी"],
    },
    highlights: {
      en: ["Earthy sweet beets paired with tangy feta and citrus crunch."],
      hi: ["मीठे भुने चुकंदर, नमकीन फेटा और अखरोट का लाजवाब संयोजन।"],
    },
  },

  "Chickpea & herb salad": {
    ingredients: {
      en: ["Slow-steamed tender chickpeas", "Diced Persian cucumber", "Fresh garden mint leaves", "Italian flat parsley", "Cold-pressed lemon juice", "Garlicky Greek yogurt dressing", "Wild sumac"],
      hi: ["उबले चने", "बारीक खीरा", "ताज़ा पुदीना", "इटैलियन पार्सले", "नींबू का रस", "गार्लिक योगर्ट", "सुमाक"],
    },
    nutrition: {
      calories: "380 kcal",
      servingSize: "290 g",
      protein: "14 g",
      carbs: "48 g",
      fat: "14 g",
      fiber: "11 g",
    },
    dietary: {
      en: ["Vegetarian", "High Fiber", "Plant Protein", "Contains Dairy"],
      hi: ["शाकाहारी", "हाई फाइबर", "प्लांट प्रोटीन", "डेयरी"],
    },
    highlights: {
      en: ["Protein-packed Mediterranean salad with cooling herbs and tangy dressing."],
      hi: ["प्रोटीन से भरपूर मेडिटेरेनियन सलाद और ताज़ा पुदीने का स्वाद।"],
    },
  },

  "Soup of the day": {
    ingredients: {
      en: ["Seasonal farm-fresh vegetables", "Slow-simmered vegetable broth", "Fresh aromatic herbs", "Extra virgin olive oil", "Sourdough garlic croutons"],
      hi: ["ताज़ी मौसमी सब्ज़ियाँ", "सब्ज़ियों का सूप ब्रॉथ", "ताज़ा हर्ब्स", "ऑलिव ऑयल", "सॉरडो क्राउटॉन्स"],
    },
    nutrition: {
      calories: "210 kcal",
      servingSize: "300 ml",
      protein: "6 g",
      carbs: "28 g",
      fat: "8 g",
      fiber: "6 g",
    },
    dietary: {
      en: ["Vegetarian", "Low Calorie", "Comfort Food", "Warming"],
      hi: ["शाकाहारी", "कम कैलोरी", "स्वादिष्ट और सुपाच्य"],
    },
    highlights: {
      en: ["Freshly prepared daily with the best seasonal produce available at the market."],
      hi: ["बाज़ार की सबसे ताज़ा मौसमी सब्ज़ियों से रोज़ाना बनाया गया स्पेशल सूप।"],
    },
  },

  "Truffle mushroom pasta": {
    ingredients: {
      en: ["Bronze-die tagliatelle pasta", "Black truffle essence", "Sautéed cremini & button mushrooms", "Heavy dairy cream", "24-month aged Parmigiano Reggiano", "Fresh cracked pepper"],
      hi: ["टैग्लियाटेले पास्ता", "ब्लैक ट्रफल", "मशरूम", "ताज़ा क्रीम", "परमेज़ान चीज़", "काली मिर्च"],
    },
    nutrition: {
      calories: "780 kcal",
      servingSize: "340 g",
      protein: "22 g",
      carbs: "82 g",
      fat: "42 g",
      fiber: "5 g",
    },
    dietary: {
      en: ["Vegetarian", "Contains Gluten", "Contains Dairy", "Gourmet Italian"],
      hi: ["शाकाहारी", "ग्लूटन", "डेयरी", "गॉरमे इटैलियन"],
    },
    highlights: {
      en: ["Silky hand-finished tagliatelle infused with real black truffle and rich parmesan."],
      hi: ["असली ब्लैक ट्रफल और परमेज़ान चीज़ से बना रिच इटैलियन पास्ता।"],
    },
  },

  "Tomato basil rigatoni": {
    ingredients: {
      en: ["Artisan rigatoni pasta", "San Marzano plum tomatoes", "Fresh sweet Genovese basil", "Cold-pressed extra virgin olive oil", "Mild chilli flakes", "Aged parmesan cheese"],
      hi: ["रिगाटोनी पास्ता", "सैन मार्ज़ानो टमाटर", "ताज़ा तुलसी (बेसिल)", "एक्स्ट्रा वर्जिन ऑलिव ऑयल", "चिली फ्लेक्स", "परमेज़ान"],
    },
    nutrition: {
      calories: "690 kcal",
      servingSize: "320 g",
      protein: "18 g",
      carbs: "88 g",
      fat: "30 g",
      fiber: "6 g",
    },
    dietary: {
      en: ["Vegetarian", "Contains Gluten", "Contains Dairy Option", "Classic Recipe"],
      hi: ["शाकाहारी", "ग्लूटन", "क्लासिक रेसिपी"],
    },
    highlights: {
      en: ["Slow-simmered rustic Italian tomato sauce clinging to tube rigatoni with fresh basil."],
      hi: ["धीमी आंच पर पका टमाटर सॉस और ताज़ी तुलसी की खुशबू।"],
    },
  },

  "Shakshuka": {
    ingredients: {
      en: ["Two farm-fresh eggs", "Ripe roasted tomatoes", "Charred sweet bell peppers", "Caraway & cumin spices", "Garlic & onions", "Warm sourdough bread on side"],
      hi: ["दो ताज़ा अंडे", "टमाटर सॉस", "शिमला मिर्च", "ज़ीरा व मसाले", "लहसुन", "गरम सॉरडो ब्रेड"],
    },
    nutrition: {
      calories: "540 kcal",
      servingSize: "380 g",
      protein: "24 g",
      carbs: "46 g",
      fat: "28 g",
      fiber: "7 g",
    },
    dietary: {
      en: ["Vegetarian", "Contains Egg", "Contains Gluten (bread)", "Mediterranean"],
      hi: ["शाकाहारी", "अंडा", "ग्लूटन (ब्रेड)", "मेडिटेरेनियन"],
    },
    highlights: {
      en: ["Bubbling spiced tomato stew with softly poached eggs, best scooped with warm bread."],
      hi: ["मसालेदार टमाटर सॉस में पके अंडे और साथ में कुरकुरी ब्रेड।"],
    },
  },

  "Butter croissant": {
    ingredients: {
      en: ["French wheat flour", "82% Normandy cultured butter", "Filtered spring water", "Yeast & sea salt", "48-hour slow lamination"],
      hi: ["फ्रेंच आटा", "नॉर्मंडी मक्खन", "पानी", "यीस्ट और समुद्री नमक", "48 घंटे लेमिनेटेड"],
    },
    nutrition: {
      calories: "320 kcal",
      servingSize: "90 g",
      protein: "6 g",
      carbs: "34 g",
      fat: "18 g",
      fiber: "2 g",
    },
    dietary: {
      en: ["Vegetarian", "Contains Gluten", "Contains Dairy", "Artisan Viennoiserie"],
      hi: ["शाकाहारी", "ग्लूटन", "डेयरी", "आर्टिसन बेकरी"],
    },
    highlights: {
      en: ["Golden flaky outer shell with honeycomb interior, baked fresh every single morning."],
      hi: ["सुबह-सुबह ताज़ा बेक किया गया कुरकुरा और मक्खन से भरपूर फ्रेंच क्रोसां।"],
    },
  },

  "Pistachio roll": {
    ingredients: {
      en: ["Laminated brioche dough", "Roasted Sicilian pistachio praline cream", "Pure Madagascar vanilla bean", "Crushed green pistachios", "Maldon sea salt flakes"],
      hi: ["ब्रियोश डो", "सिसिलियन पिस्ता प्रैलीन क्रीम", "वनीला बीन", "पिस्ता के टुकड़े", "समुद्री नमक"],
    },
    nutrition: {
      calories: "430 kcal",
      servingSize: "130 g",
      protein: "8 g",
      carbs: "46 g",
      fat: "24 g",
      fiber: "3 g",
    },
    dietary: {
      en: ["Vegetarian", "Contains Nuts", "Contains Gluten", "Contains Dairy"],
      hi: ["शाकाहारी", "मेवे", "ग्लूटन", "डेयरी"],
    },
    highlights: {
      en: ["Swirled with rich 100% natural pistachio cream and finished with roasted nuts."],
      hi: ["शुद्ध पिस्ता क्रीम और भुने पिस्तों से सजा हमारा सिग्नेचर रोल।"],
    },
  },

  "Basque cheesecake": {
    ingredients: {
      en: ["Philadelphia style cream cheese", "Fresh heavy whipping cream", "Pasture egg yolks", "Pure cane sugar", "Bourbon vanilla extract"],
      hi: ["क्रीम चीज़", "हैवी व्हिपिंग क्रीम", "अंडे", "शक्कर", "वनीला एक्सट्रैक्ट"],
    },
    nutrition: {
      calories: "480 kcal",
      servingSize: "160 g",
      protein: "9 g",
      carbs: "36 g",
      fat: "34 g",
      fiber: "1 g",
    },
    dietary: {
      en: ["Vegetarian", "Contains Dairy", "Contains Egg", "Naturally Flourless"],
      hi: ["शाकाहारी", "डेयरी", "अंडा", "बिना मैदा"],
    },
    highlights: {
      en: ["High-heat caramelized burnt top with a decadent molten custardy center."],
      hi: ["ऊपर से कैरामेलाइज़्ड और अंदर से बेहद मखमली व क्रीमी बास्क चीज़केक।"],
    },
  },

  "Strawberry cupcake": {
    ingredients: {
      en: ["Fluffy vanilla sponge cake", "House fresh strawberry compote center", "Whipped Swiss meringue buttercream", "Fresh farm strawberry on top"],
      hi: ["वनीला स्पॉन्ज", "ताज़ा स्ट्रॉबेरी कॉम्पोट", "स्विस मेरेंग बटरक्रीम", "ताज़ी स्ट्रॉबेरी"],
    },
    nutrition: {
      calories: "410 kcal",
      servingSize: "110 g",
      protein: "5 g",
      carbs: "52 g",
      fat: "22 g",
      fiber: "2 g",
    },
    dietary: {
      en: ["Vegetarian", "Contains Gluten", "Contains Dairy", "Contains Egg"],
      hi: ["शाकाहारी", "ग्लूटन", "डेयरी", "अंडा"],
    },
    highlights: {
      en: ["Tender sponge filled with homemade berry compote and silky vanilla buttercream."],
      hi: ["अंदर से स्ट्रॉबेरी जैम और ऊपर से लाइट बटरक्रीम से सजा कपकेक।"],
    },
  },

  "Cardamom bun": {
    ingredients: {
      en: ["Cardamom-infused sweet yeast dough", "Cultured French butter", "Freshly hand-ground cardamom spice", "Raw pearl sugar crust"],
      hi: ["इलायची युक्त डो", "मक्खन", "हाथ से कुटी हरी इलायची", "पर्ल शुगर"],
    },
    nutrition: {
      calories: "350 kcal",
      servingSize: "110 g",
      protein: "6 g",
      carbs: "48 g",
      fat: "16 g",
      fiber: "3 g",
    },
    dietary: {
      en: ["Vegetarian", "Contains Gluten", "Contains Dairy", "Traditional Scandinavian"],
      hi: ["शाकाहारी", "ग्लूटन", "डेयरी", "स्कैंडिनेवियन रेसिपी"],
    },
    highlights: {
      en: ["Classic Swedish kanelbulle sibling bursting with intense crushed cardamom."],
      hi: ["इलायची की भीनी-भीनी महक और मक्खन से तैयार क्लासिक बन।"],
    },
  },

  "Espresso": {
    ingredients: {
      en: ["100% Specialty Arabica beans", "Filtered reverse-osmosis spring water", "Extracted at 9 bars pressure"],
      hi: ["100% अरेबिका कॉफ़ी बीन्स", "फ़िल्टर्ड पानी", "9-बार प्रेशर एक्सट्रैक्शन"],
    },
    nutrition: {
      calories: "5 kcal",
      servingSize: "30 ml",
      protein: "0.3 g",
      carbs: "0.8 g",
      fat: "0.1 g",
      fiber: "0 g",
    },
    dietary: {
      en: ["Vegan", "Zero Added Sugar", "Gluten Free", "High Caffeine"],
      hi: ["वीगन", "बिना चीनी", "ग्लूटन मुक्त", "कैफीन"],
    },
    highlights: {
      en: ["Single-origin espresso with complex notes of dark chocolate and stone fruit."],
      hi: ["डार्क चॉकलेट और फलों के फ्लेवर वाला गहरा, गाढ़ा एस्प्रेसो शॉट।"],
    },
  },

  "Cappuccino": {
    ingredients: {
      en: ["Double shot specialty Arabica espresso", "Steamed velvety whole milk", "Dense microfoam crown"],
      hi: ["डबल शॉट अरेबिका एस्प्रेसो", "स्टीम्ड गाढ़ा दूध", "क्रीमी माइक्रोफोम"],
    },
    nutrition: {
      calories: "120 kcal",
      servingSize: "180 ml",
      protein: "7 g",
      carbs: "10 g",
      fat: "6 g",
      fiber: "0 g",
    },
    dietary: {
      en: ["Vegetarian", "Contains Dairy (Oat milk alternative available)", "Gluten Free"],
      hi: ["शाकाहारी", "डेयरी (ओट मिल्क विकल्प उपलब्ध)", "ग्लूटन मुक्त"],
    },
    highlights: {
      en: ["Balanced 1:1:1 ratio of intense espresso, rich steamed milk, and airy foam."],
      hi: ["एस्प्रेसो, गर्म दूध और झाग का क्लासिक इटैलियन संतुलन।"],
    },
  },

  "Flat white": {
    ingredients: {
      en: ["Double ristretto espresso extraction", "Silky textured micro-foamed milk"],
      hi: ["डबल रिस्ट्रेटो एस्प्रेसो", "सिल्क माइक्रोफोम्ड दूध"],
    },
    nutrition: {
      calories: "130 kcal",
      servingSize: "160 ml",
      protein: "7 g",
      carbs: "9 g",
      fat: "7 g",
      fiber: "0 g",
    },
    dietary: {
      en: ["Vegetarian", "Contains Dairy (Oat option available)", "Gluten Free"],
      hi: ["शाकाहारी", "डेयरी", "ग्लूटन मुक्त"],
    },
    highlights: {
      en: ["Stronger coffee punch than a latte, with ultra-velvety microfoam."],
      hi: ["लाते से अधिक कॉफ़ी फ्लेवर और मखमली माइक्रोफोम।"],
    },
  },

  "Filter — V60": {
    ingredients: {
      en: ["Single origin high-altitude Arabica beans", "Pure 93°C water", "Slow spiral hand pour over paper filter"],
      hi: ["सिंगल ओरिजिन अरेबिका कॉफ़ी", "93°C शुद्ध पानी", "हस्तनिर्मित पोर-ओवर"],
    },
    nutrition: {
      calories: "5 kcal",
      servingSize: "250 ml",
      protein: "0.4 g",
      carbs: "1.0 g",
      fat: "0 g",
      fiber: "0 g",
    },
    dietary: {
      en: ["Vegan", "Zero Sugar", "Pure Specialty Coffee", "Floral & Bright"],
      hi: ["वीगन", "बिना चीनी", "प्योर कॉफ़ी"],
    },
    highlights: {
      en: ["Highlights the delicate floral, tea-like, and fruity nuances of the origin."],
      hi: ["कॉफ़ी बीन्स के असली खुशबूदार और फ्रूटी फ्लेवर्स को निखारता है।"],
    },
  },

  "Cold brew": {
    ingredients: {
      en: ["Coarse ground specialty Arabica beans", "Triple-filtered cold water", "18-hour continuous cold steep", "Serve over ice"],
      hi: ["अरेबिका कॉफ़ी पाउडर", "फ़िल्टर्ड ठंडा पानी", "18 घंटे कोल्ड स्टीप", "बर्फ"],
    },
    nutrition: {
      calories: "10 kcal",
      servingSize: "300 ml",
      protein: "0.5 g",
      carbs: "1.5 g",
      fat: "0 g",
      fiber: "0 g",
    },
    dietary: {
      en: ["Vegan", "Zero Sugar", "Low Acidity", "Refreshing Caffeine"],
      hi: ["वीगन", "कम एसिडिक", "ताज़गी भरा कैफीन"],
    },
    highlights: {
      en: ["Gentle 18-hour cold brew extraction creates a naturally sweet, low-acid, velvety cup."],
      hi: ["18 घंटे ठंडे पानी में भीगकर बना बेहद स्मूथ और कम एसिडिटी वाला कोल्ड ब्रू।"],
    },
  },

  "Filter batch": {
    ingredients: {
      en: ["Freshly ground morning roast Arabica beans", "Precision temperature drip extraction"],
      hi: ["सुबह का ताज़ा अरेबिका रोस्ट", "ड्रिप फ़िल्टर पानी"],
    },
    nutrition: {
      calories: "5 kcal",
      servingSize: "220 ml",
      protein: "0.3 g",
      carbs: "1.0 g",
      fat: "0 g",
      fiber: "0 g",
    },
    dietary: {
      en: ["Vegan", "Classic Filter", "Quick & Fresh"],
      hi: ["वीगन", "क्लासिक फ़िल्टर", "ताज़ा कॉफ़ी"],
    },
    highlights: {
      en: ["Our reliable daily drip coffee, consistently brewed and ready to enjoy immediately."],
      hi: ["हर दिन की ताज़ा ब्रू की हुई क्लासिक ब्लैक कॉफ़ी।"],
    },
  },

  "Iced matcha latte": {
    ingredients: {
      en: ["First-harvest Uji ceremonial matcha", "Chilled oat milk or dairy milk", "Light organic agave nectar", "Ice cubes"],
      hi: ["उजी सेरेमोनियल माचा", "ठंडा ओट या डेयरी दूध", "ऑर्गेनिक अगावे सिरप", "बर्फ"],
    },
    nutrition: {
      calories: "180 kcal",
      servingSize: "320 ml",
      protein: "5 g",
      carbs: "22 g",
      fat: "8 g",
      fiber: "2 g",
    },
    dietary: {
      en: ["Vegetarian", "L-Theanine Rich", "Antioxidant Powerhouse", "Sustained Focus"],
      hi: ["शाकाहारी", "एंटीऑक्सीडेंट युक्त", "एनर्जी बूस्टर"],
    },
    highlights: {
      en: ["Stone-ground shade-grown green tea whisked fresh and poured over creamy cold milk."],
      hi: ["जापान से मंगाया गया शुद्ध सेरेमोनियल माचा और ठंडा मखमली दूध।"],
    },
  },

  "Hot matcha": {
    ingredients: {
      en: ["100% Ceremonial grade Uji matcha", "80°C hot spring water", "Whisked with bamboo chasen"],
      hi: ["100% सेरेमोनियल उजी माचा", "80°C गर्म पानी", "बांस के व्हिस्क से तैयार"],
    },
    nutrition: {
      calories: "15 kcal",
      servingSize: "150 ml",
      protein: "1.5 g",
      carbs: "2.0 g",
      fat: "0.3 g",
      fiber: "1 g",
    },
    dietary: {
      en: ["Vegan", "Zero Added Sugar", "Pure Tradition", "Rich Umami"],
      hi: ["वीगन", "बिना चीनी", "पारंपरिक माचा"],
    },
    highlights: {
      en: ["Authentic Japanese tea ceremony preparation with jade-green foam and deep umami."],
      hi: ["पारंपरिक जापानी तरीके से बनाया गया शुद्ध, बिना चीनी का सेरेमोनियल माचा।"],
    },
  },

  "Strawberry matcha": {
    ingredients: {
      en: ["House-made fresh strawberry compote", "Cold dairy or oat milk", "Ceremonial matcha float", "Ice"],
      hi: ["घर पर बना स्ट्रॉबेरी कॉम्पोट", "ठंडा दूध", "सेरेमोनियल माचा फ्लोट", "बर्फ"],
    },
    nutrition: {
      calories: "240 kcal",
      servingSize: "350 ml",
      protein: "6 g",
      carbs: "38 g",
      fat: "7 g",
      fiber: "3 g",
    },
    dietary: {
      en: ["Vegetarian", "Fruity & Vibrant", "Antioxidant Rich"],
      hi: ["शाकाहारी", "फ्रूटी व ताज़गी भरा", "एंटीऑक्सीडेंट युक्त"],
    },
    highlights: {
      en: ["Gorgeous layered drink of sweet fruit compote, creamy milk, and earthy green matcha."],
      hi: ["स्ट्रॉबेरी के मीठे स्वाद और सेरेमोनियल माचा का आकर्षक लेयर्ड पेय।"],
    },
  },

  "Yuzu matcha soda": {
    ingredients: {
      en: ["Japanese yuzu citrus fruit juice", "Effervescent sparkling soda", "Ceremonial matcha shot", "Fresh mint sprig", "Ice"],
      hi: ["जापानी युज़ु साइट्रस रस", "स्पार्कलिंग सोडा", "सेरेमोनियल माचा", "पुदीना", "बर्फ"],
    },
    nutrition: {
      calories: "70 kcal",
      servingSize: "320 ml",
      protein: "1 g",
      carbs: "16 g",
      fat: "0 g",
      fiber: "1 g",
    },
    dietary: {
      en: ["Vegan", "Low Calorie", "Dairy Free", "Refreshing Sparkler"],
      hi: ["वीगन", "कम कैलोरी", "डेयरी मुक्त", "ताज़गी भरा सोडा"],
    },
    highlights: {
      en: ["Tart citrus meets brisk green tea fizz for the ultimate afternoon refresher."],
      hi: ["नींबू जैसे युज़ु फल और माचा का बुलबुलेदार अनोखा रिफ्रेशिंग सोडा।"],
    },
  },

  "Masala chai": {
    ingredients: {
      en: ["Assam CTC premium black tea", "Whole fresh milk", "Green cardamom", "Cinnamon", "Cloves & black pepper", "Crushed fresh ginger"],
      hi: ["असम ब्लैक टी", "ताज़ा दूध", "हरी इलायची", "दालचीनी", "लौंग व काली मिर्च", "अदरक"],
    },
    nutrition: {
      calories: "140 kcal",
      servingSize: "200 ml",
      protein: "4 g",
      carbs: "18 g",
      fat: "5 g",
      fiber: "0 g",
    },
    dietary: {
      en: ["Vegetarian", "Aromatic Spices", "Contains Dairy", "Comfort Drink"],
      hi: ["शाकाहारी", "मसालेदार", "डेयरी", "पारंपरिक चाय"],
    },
    highlights: {
      en: ["Boiled slow in the authentic roadside style with hand-pounded whole spices."],
      hi: ["हाथ से कूटे ताज़ा मसालों और दूध के साथ धीमी आंच पर पकाई गई स्पेशल चाय।"],
    },
  },

  "Earl grey": {
    ingredients: {
      en: ["Single-estate Ceylon black tea leaves", "Cold-pressed pure oil of bergamot citrus", "Cornflower petals"],
      hi: ["सीलोन ब्लैक टी पत्तियां", "बर्गमोट सिट्रस ऑयल", "फूलों की पंखुड़ियाँ"],
    },
    nutrition: {
      calories: "2 kcal",
      servingSize: "250 ml",
      protein: "0 g",
      carbs: "0.5 g",
      fat: "0 g",
      fiber: "0 g",
    },
    dietary: {
      en: ["Vegan", "Zero Sugar", "Floral & Citrus"],
      hi: ["वीगन", "बिना चीनी", "सिट्रस और खुशबूदार"],
    },
    highlights: {
      en: ["Classic British afternoon tea with intoxicating fragrant citrus bergamot notes."],
      hi: ["बर्गमोट सिट्रस की खुशबू वाली प्रीमियम अर्ल ग्रे चाय।"],
    },
  },

  "Peppermint": {
    ingredients: {
      en: ["100% Whole dried peppermint leaves", "Hot spring water"],
      hi: ["100% पुदीने की सूखी पत्तियां", "गर्म पानी"],
    },
    nutrition: {
      calories: "2 kcal",
      servingSize: "250 ml",
      protein: "0 g",
      carbs: "0.4 g",
      fat: "0 g",
      fiber: "0 g",
    },
    dietary: {
      en: ["Vegan", "Caffeine Free", "Digestive Aid", "Zero Sugar"],
      hi: ["वीगन", "कैफीन मुक्त", "पाचन के लिए उत्तम", "बिना चीनी"],
    },
    highlights: {
      en: ["Cooling, refreshing herbal tea naturally devoid of caffeine."],
      hi: ["बिना कैफीन वाली ताज़ा पुदीने की हर्बल चाय।"],
    },
  },

  "Jasmine green": {
    ingredients: {
      en: ["Tender spring green tea buds", "Naturally scented with fresh night-blooming jasmine blossoms"],
      hi: ["हरी चाय की पत्तियां", "ताज़े चमेली (जैस्मिन) के फूल"],
    },
    nutrition: {
      calories: "2 kcal",
      servingSize: "250 ml",
      protein: "0 g",
      carbs: "0.5 g",
      fat: "0 g",
      fiber: "0 g",
    },
    dietary: {
      en: ["Vegan", "Antioxidant Rich", "Delicate & Floral"],
      hi: ["वीगन", "एंटीऑक्सीडेंट से भरपूर", "फूलों की खुशबू"],
    },
    highlights: {
      en: ["Slowly infused three times to release soft floral jasmine notes."],
      hi: ["तीन बार इन्फ्यूज की जाने वाली सुगंधित जैस्मिन ग्रीन टी।"],
    },
  },

  "Classic lemonade": {
    ingredients: {
      en: ["Freshly squeezed lemon juice", "Crushed garden mint", "Pure cane sugar syrup", "Chilled sparkling soda", "Ice"],
      hi: ["ताज़ा नींबू का रस", "पुदीना", "शक्कर की चाशनी", "स्पार्कलिंग सोडा", "बर्फ"],
    },
    nutrition: {
      calories: "120 kcal",
      servingSize: "400 ml",
      protein: "0.5 g",
      carbs: "30 g",
      fat: "0 g",
      fiber: "1 g",
    },
    dietary: {
      en: ["Vegan", "Vitamin C Rich", "Hydrating", "Sparkling"],
      hi: ["वीगन", "विटामिन सी युक्त", "ताज़गी भरा"],
    },
    highlights: {
      en: ["Crisp, tart, and sweet with plenty of mint and effervescent bubbles."],
      hi: ["पुदीने और नींबू का ताज़ा खट्टा-मीठा कार्बोनेटेड शिकंजी सोडा।"],
    },
  },

  "Passionfruit cooler": {
    ingredients: {
      en: ["Natural passionfruit pulp and seeds", "Key lime juice", "Botanical tonic water", "Touch of agave", "Crushed ice"],
      hi: ["पैशनफ्रूट पल्प", "नींबू का रस", "टॉनिक वॉटर", "हल्का अगावे", "बर्फ"],
    },
    nutrition: {
      calories: "135 kcal",
      servingSize: "350 ml",
      protein: "1 g",
      carbs: "32 g",
      fat: "0.2 g",
      fiber: "2 g",
    },
    dietary: {
      en: ["Vegan", "Tropical", "Exotic Refreshment"],
      hi: ["वीगन", "ट्रॉपिकल फ्रूट", "ताज़गी"],
    },
    highlights: {
      en: ["Vibrant tropical passionfruit with a sharp citrus and tonic bite."],
      hi: ["ट्रॉपिकल पैशनफ्रूट और टॉनिक वॉटर का अनोखा कुलर।"],
    },
  },

  "Orange, cold pressed": {
    ingredients: {
      en: ["100% Pure whole oranges", "Cold-pressed on hydraulic press on order", "Zero added sugar or water"],
      hi: ["100% ताज़े संतरे", "ऑर्डर पर तुरंत कोल्ड-प्रेस्ड निकाला गया", "बिना चीनी या पानी"],
    },
    nutrition: {
      calories: "140 kcal",
      servingSize: "300 ml",
      protein: "2 g",
      carbs: "32 g",
      fat: "0.5 g",
      fiber: "3 g",
    },
    dietary: {
      en: ["Vegan", "100% Pure Fruit Juice", "Zero Additives", "Immunity Boost"],
      hi: ["वीगन", "100% शुद्ध जूस", "इम्यूनिटी बूस्टर"],
    },
    highlights: {
      en: ["Pure unpasteurized juice retaining all natural vitamins, enzymes, and sunshine sweetness."],
      hi: ["बिना किसी मिलावट का बिल्कुल ताज़ा 100% शुद्ध संतरे का जूस।"],
    },
  },

  "Ginger sparkle": {
    ingredients: {
      en: ["Cold-pressed fresh ginger root juice", "Raw organic wildflower honey", "Fresh lime juice", "Effervescent mineral sparkling water"],
      hi: ["ताज़ा अदरक का रस", "प्राकृतिक शहद", "नींबू का रस", "स्पार्कलिंग वॉटर"],
    },
    nutrition: {
      calories: "95 kcal",
      servingSize: "320 ml",
      protein: "0.5 g",
      carbs: "24 g",
      fat: "0 g",
      fiber: "0.5 g",
    },
    dietary: {
      en: ["Vegetarian", "Digestive Tonic", "Immunity Booster"],
      hi: ["शाकाहारी", "पाचन के लिए गुणकारी", "इम्यूनिटी बूस्ट"],
    },
    highlights: {
      en: ["Fiery kick of fresh ginger mellowed by raw honey and crisp effervescence."],
      hi: ["अदरक का तीखापन और शहद की मिठास के साथ स्पार्कलिंग ड्रिंक।"],
    },
  },

  "Small pancakes": {
    ingredients: {
      en: ["Fluffy buttermilk pancake batter", "Organic wildflower honey", "Creamy butter dollop"],
      hi: ["सॉफ्ट बटरमिल्क पैनकेक", "ऑर्गेनिक शहद", "मक्खन"],
    },
    nutrition: {
      calories: "280 kcal",
      servingSize: "160 g",
      protein: "6 g",
      carbs: "44 g",
      fat: "9 g",
      fiber: "2 g",
    },
    dietary: {
      en: ["Vegetarian", "Kids Favorite", "Contains Dairy", "Contains Gluten"],
      hi: ["शाकाहारी", "बच्चों का पसंदीदा", "डेयरी", "ग्लूटन"],
    },
    highlights: {
      en: ["Kid-sized portion of two warm, fluffy pancakes served with pure honey."],
      hi: ["बच्चों के लिए दो छोटे और सॉफ्ट पैनकेक, शहद और मक्खन के साथ।"],
    },
  },

  "Warm milk & cocoa": {
    ingredients: {
      en: ["Fresh steamed whole dairy milk", "Dutch dark cocoa powder", "Touch of unrefined raw cane sugar"],
      hi: ["गर्म दूध", "डच डार्क कोको पाउडर", "हल्की देशी खांड/शक्कर"],
    },
    nutrition: {
      calories: "170 kcal",
      servingSize: "220 ml",
      protein: "8 g",
      carbs: "20 g",
      fat: "7 g",
      fiber: "1 g",
    },
    dietary: {
      en: ["Vegetarian", "Low Sugar", "Kid Friendly", "Contains Dairy"],
      hi: ["शाकाहारी", "कम चीनी", "बच्चों के लिए उपयुक्त", "डेयरी"],
    },
    highlights: {
      en: ["Gently sweetened comforting warm cocoa made with premium real milk and chocolate."],
      hi: ["कम चीनी वाला पौष्टिक और स्वादिष्ट गर्म चॉकलेट दूध।"],
    },
  },

  "Extra shot": {
    ingredients: {
      en: ["Additional shot of freshly extracted specialty Arabica espresso"],
      hi: ["ताज़ा निकाला गया अतिरिक्त एस्प्रेसो शॉट"],
    },
    nutrition: {
      calories: "3 kcal",
      servingSize: "30 ml",
      protein: "0.2 g",
      carbs: "0.5 g",
      fat: "0 g",
    },
    dietary: {
      en: ["Vegan", "Coffee Booster"],
      hi: ["वीगन", "एक्स्ट्रा कैफीन"],
    },
    highlights: {
      en: ["Adds an extra boost of rich espresso to any hot or cold drink."],
      hi: ["अपनी ड्रिंक में एक्स्ट्रा स्ट्रॉन्ग कॉफ़ी फ्लेवर जोड़ें।"],
    },
  },

  "Oat milk": {
    ingredients: {
      en: ["Gluten-free oats", "Water", "Rapeseed oil", "Sea salt"],
      hi: ["ग्लूटन फ्री ओट्स", "पानी", "समुद्री नमक"],
    },
    nutrition: {
      calories: "60 kcal",
      servingSize: "100 ml",
      protein: "1 g",
      carbs: "7 g",
      fat: "3 g",
    },
    dietary: {
      en: ["100% Plant Based (Vegan)", "Dairy Free", "Nut Free"],
      hi: ["वीगन (प्लांट बेस्ड)", "डेयरी मुक्त", "मेवे मुक्त"],
    },
    highlights: {
      en: ["Barista grade oat milk that steams to a velvety microfoam."],
      hi: ["मखमली झाग देने वाला प्लांट बेस्ड ओट मिल्क।"],
    },
  },

  "Side avocado": {
    ingredients: {
      en: ["Half fresh ripe Hass avocado", "Sea salt", "Cold-pressed lemon oil mist"],
      hi: ["आधा ताज़ा हास एवोकाडो", "समुद्री नमक", "नींबू का रस"],
    },
    nutrition: {
      calories: "160 kcal",
      servingSize: "100 g",
      protein: "2 g",
      carbs: "8 g",
      fat: "15 g",
      fiber: "7 g",
    },
    dietary: {
      en: ["Vegan", "Superfood", "Healthy Monounsaturated Fats"],
      hi: ["वीगन", "सुपरफूड", "हेल्दी फैट्स"],
    },
    highlights: {
      en: ["Perfect healthy accompaniment to any breakfast or toast."],
      hi: ["नाश्ते या टोस्ट के साथ परोसा जाने वाला ताज़ा एवोकाडो।"],
    },
  },

  "Two eggs": {
    ingredients: {
      en: ["Two pasture-raised organic farm eggs", "Prepared scrambled, fried, or poached to liking", "Butter or olive oil"],
      hi: ["दो ताज़ा अंडे (पोच्ड, फ्राइड या स्क्रैम्बल्ड)", "मक्खन या ऑलिव ऑयल", "काली मिर्च"],
    },
    nutrition: {
      calories: "180 kcal",
      servingSize: "120 g",
      protein: "14 g",
      carbs: "1 g",
      fat: "13 g",
    },
    dietary: {
      en: ["Contains Egg", "High Protein", "Keto Friendly"],
      hi: ["अंडा शामिल", "हाई प्रोटीन", "कीटो अनुकूल"],
    },
    highlights: {
      en: ["Farm fresh eggs prepared exactly how you like them."],
      hi: ["अपनी पसंद के अनुसार बनवाएं: पोच्ड, हाफ फ्राई या स्क्रैम्बल।"],
    },
  },
};

/**
 * Returns enriched details for any menu item, falling back gracefully
 * to realistic data derived from the item's existing attributes.
 */
export function getItemDetails(item: FullMenuItem, lang: Lang): ItemDetailData {
  const match = DETAILS_MAP[item.title.en];
  if (match) return match;

  // Fallback generation based on item props
  const allergenList = item.allergens[lang] || [];
  const kcalStr = item.kcal ? `${item.kcal} kcal` : "Estimated ~220 kcal";
  const weightStr = item.weight ? `${item.weight} g` : "Standard serving";

  return {
    ingredients: {
      en: item.desc.en.split(",").map((s) => s.trim()),
      hi: item.desc.hi.split(",").map((s) => s.trim()),
    },
    nutrition: {
      calories: kcalStr,
      servingSize: weightStr,
      protein: "8–16 g",
      carbs: "25–45 g",
      fat: "8–18 g",
    },
    dietary: {
      en: allergenList.length > 0 ? allergenList.map((a) => `Contains ${a}`) : ["Vegetarian", "Freshly Prepared"],
      hi: allergenList.length > 0 ? allergenList.map((a) => `${a} शामिल`) : ["शाकाहारी", "ताज़ा तैयार"],
    },
    highlights: {
      en: ["Prepared fresh on order using locally sourced specialty ingredients."],
      hi: ["सर्वश्रेष्ठ गुणवत्ता वाले ताज़ा सामग्रियों से विशेष रूप से तैयार।"],
    },
  };
}
