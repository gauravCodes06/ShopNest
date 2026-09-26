import { LanguageCode } from '../context/LanguageContext';

// Cache for original English text of DOM text nodes
const originalTextMap = new WeakMap<Node, string>();
let isTranslating = false;

// Google Translate synchronizer
export function syncGoogleTranslate(code: LanguageCode) {
  if (typeof window === 'undefined') return;
  const lower = code.toLowerCase();
  const host = window.location.hostname;
  const cookieVal = lower === 'en' ? '' : `/en/${lower}`;
  const expire = lower === 'en' ? 'expires=Thu, 01 Jan 1970 00:00:00 UTC; ' : '';

  // 1. Set / clear googtrans cookies across paths & domains
  document.cookie = `googtrans=${cookieVal}; ${expire}path=/;`;
  document.cookie = `googtrans=${cookieVal}; ${expire}path=/; domain=${host};`;
  if (host.includes('.')) {
    document.cookie = `googtrans=${cookieVal}; ${expire}path=/; domain=.${host};`;
  }

  // 2. Trigger Google Translate combobox if present
  const triggerCombo = () => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      if (select.value !== lower) {
        select.value = lower;
        select.dispatchEvent(new Event('change'));
      }
      return true;
    }
    return false;
  };

  if (!triggerCombo()) {
    let retries = 0;
    const interval = setInterval(() => {
      retries++;
      if (triggerCombo() || retries > 30) {
        clearInterval(interval);
      }
    }, 150);
  }
}

// Comprehensive phrase dictionaries for all Indian languages
export const PHRASES: Record<LanguageCode, Record<string, string>> = {
  EN: {},
  HI: {
    // Navigation & Global
    'All': 'सभी',
    "Today's Deals": 'आज के डील्स',
    'ShopNest Pay': 'शॉपनेस्ट पे',
    'Prime': 'प्राइम',
    'Electronics': 'इलेक्ट्रॉनिक्स',
    'Fashion': 'फैशन',
    'Home & Kitchen': 'होम और किचन',
    'Home & Living': 'होम और लिविंग',
    'Beauty': 'ब्यूटी',
    'Sports': 'स्पोर्ट्स',
    'Computers': 'कंप्यूटर्स',
    'Mobiles': 'मोबाइल',
    'miniTV': 'मिनी टीवी',
    'Sell': 'बेचें',
    'Customer Service': 'ग्राहक सेवा',
    'Deliver to': 'डिलीवरी पता',
    'Hello, sign in': 'नमस्ते, साइन इन करें',
    'Account & Lists': 'खाता और सूचियां',
    'Returns & Orders': 'रिटर्न और ऑर्डर',
    'Cart': 'कार्ट',
    'Wishlist': 'विशलिस्ट',
    'Search for products, brands and more...': 'उत्पाद, ब्रांड और बहुत कुछ खोजें...',
    'SELECT LANGUAGE': 'भाषा चुनें',
    'You are shopping on ShopNest India': 'आप शॉपनेस्ट इंडिया पर खरीदारी कर रहे हैं',

    // Great Indian Festival & Recommendations (New Sections)
    'Great Indian Festival': 'ग्रेट इंडियन फेस्टिवल',
    'Customers who viewed items in your browsing history also viewed': 'जिन ग्राहकों ने आपके ब्राउज़िंग इतिहास की वस्तुएं देखीं, उन्होंने इन्हें भी देखा',
    'See personalized recommendations': 'व्यक्तिगत अनुशंसाएं देखें',
    'Sign in': 'साइन इन करें',
    'New customer?': 'नए ग्राहक हैं?',
    'Start here.': 'यहां शुरू करें।',
    'Earn up to ₹150 cashback*': '₹150 तक का कैशबैक पाएं*',
    'Under ₹499': '₹499 के तहत',
    'Under ₹399': '₹399 के तहत',
    'Starting ₹199': '₹199 से शुरू',
    'Starting ₹299': '₹299 से शुरू',
    'Starting ₹149': '₹149 से शुरू',
    'Starting ₹165': '₹165 से शुरू',
    'Minimum 60% off': 'न्यूनतम 60% छूट',
    'Up to 80% off': '80% तक छूट',
    'Up to 75% off': '75% तक छूट',
    'Up to 70% off': '70% तक छूट',
    'Up to 60% off': '60% तक छूट',
    'Daily needs': 'दैनिक आवश्यकताएं',
    'Home essentials': 'घरेलू आवश्यक वस्तुएं',
    'Dry fruits & seeds': 'सूखे मेवे और बीज',
    'Storage & SSDs': 'स्टोरेज और एसएसडी',
    'Bestselling kurtas': 'बेस्टसेलिंग कुर्ते',
    'Designer Sarees': 'डिजाइनर साड़ियां',
    'Shop Early Deals Now': 'जल्दी डील्स अभी खरीदें',
    'Free delivery on first order': 'पहले ऑर्डर पर मुफ्त डिलीवरी',

    // Hero & Banners
    "India's #1 Smart Shopping Platform": 'भारत का #1 स्मार्ट शॉपिंग प्लेटफॉर्म',
    'Upgrade Your': 'बेहतर बनाएं अपना',
    'Everyday Life': 'दैनिक जीवन',
    'Discover top-quality products, unbeatable prices and a smoother shopping experience.': 'शीर्ष गुणवत्ता वाले उत्पाद, बेजोड़ कीमतें और आसान खरीदारी का अनुभव पाएं।',
    'Shop Now': 'अभी खरीदें',
    'Try Prime': 'प्राइम आज़माएं',
    'Free Delivery': 'मुफ्त डिलीवरी',
    'On orders ₹499+': '₹499+ के ऑर्डर पर',
    'On orders above Rs.499': '₹499 से अधिक के ऑर्डर पर',
    '10-Day Returns': '10 दिनों में वापसी',
    'Hassle free': 'पूरी तरह आसान',
    '2.5 Cr+ Products': '2.5 करोड़+ उत्पाद',
    'Huge selection': 'विशाल संग्रह',
    'Better Choices, Brighter Days': 'बेहतर विकल्प, उज्जवल दिन',
    'Flash Deal Live!': 'फ्लैश डील जारी है!',
    'Trending Now': 'अभी ट्रेंडिंग',
    'Recommended for You': 'आपके लिए अनुशंसित',
    'Based on your browsing history': 'आपके देखने के इतिहास पर आधारित',
    'More to Explore': 'और भी खोजें',
    'Browse All': 'सभी देखें',
    'Best Deals': 'सर्वश्रेष्ठ डील्स',
    'Ends in': 'समाप्त होने में समय',
    'New deals every hour': 'हर घंटे नए सौदे',
    'View All Deals': 'सभी डील्स देखें',
    'Home Essentials for a Better Tomorrow': 'बेहतर भविष्य के लिए घरेलू आवश्यकताएं',
    'Stylish. Functional. Made for You.': 'स्टाइलिश। कार्यात्मक। आपके लिए निर्मित।',
    'Shop Home': 'होम शॉपिंग करें',
    'Prime benefits': 'प्राइम लाभ',
    'New Arrivals': 'नए आगमन',

    // Category Grid Cards
    'Revamp your home in style': 'अपने घर को स्टाइल से सजाएं',
    'Explore all home items': 'सभी घरेलू वस्तुएं देखें',
    'Bedsheets & Linen': 'बेडशीट और लिनन',
    'Curtains & Cushions': 'पर्दे और कुशन',
    'Home Storage': 'होम स्टोरेज',
    'Wall Decor & Clocks': 'दीवार की सजावट और घड़ियां',
    'Appliances — Up to 55% off': 'उपकरण — 55% तक की छूट',
    'See more appliances': 'और उपकरण देखें',
    'Air Conditioners': 'एयर कंडीशनर',
    'Refrigerators': 'रेफ्रिजरेटर',
    'Microwaves': 'माइक्रोवेव',
    'Washing Machines': 'वाशिंग मशीन',
    'Fashion Sale — Up to 60% off': 'फैशन सेल — 60% तक छूट',
    'Shop the fashion sale': 'फैशन सेल में खरीदें',
    "Men's Casual Wear": 'पुरुषों के कैज़ुअल कपड़े',
    "Women's Ethnic & Western": 'महिलाओं के एथनिक और वेस्टर्न',
    'Footwear & Sneakers': 'जूते और स्नीकर्स',
    'Watches & Wearables': 'घड़ियां और वियरेबल्स',
    'Tech Essentials — From ₹99': 'टेक आवश्यक वस्तुएं — ₹99 से',
    'Explore budget tech': 'बजट टेक देखें',
    'Fast Charging Cables': 'फास्ट चार्जिंग केबल',
    'Wireless Earbuds': 'वायरलेस ईयरबड्स',
    'Power Banks 20,000mAh': 'पावर बैंक 20,000mAh',
    'Phone Cases & Guards': 'फोन केस और स्क्रीन गार्ड',

    // Product Card & Actions
    'Add to Cart': 'कार्ट में जोड़ें',
    'Added!': 'जोड़ दिया गया!',
    'Quick Add': 'त्वरित जोड़ें',
    'Buy Now': 'अभी खरीदें',
    'Top Rated': 'टॉप रेटेड',
    '★ Top Rated': '★ टॉप रेटेड',
    'Best Seller': 'बेस्ट सेलर',
    'In Stock': 'स्टॉक में उपलब्ध',
    'Out of Stock': 'स्टॉक खत्म',
    'FREE Delivery by': 'मुफ्त डिलीवरी द्वारा',
    'FREE Delivery': 'मुफ्त डिलीवरी',
    'Save': 'बचत',
    'off': 'छूट',
    'From': 'शुरुआती',
    'Only': 'केवल',
    'left in stock': 'स्टॉक में बचे हैं',

    // Cart & Checkout
    'Shopping Cart': 'शॉपिंग कार्ट',
    'Your Cart is Empty': 'आपकी कार्ट खाली है',
    "Looks like you haven't added anything yet.": 'लगता है आपने अभी तक कुछ नहीं जोड़ा है।',
    'Explore Products': 'उत्पाद देखें',
    'Clear Cart': 'कार्ट खाली करें',
    'Order Summary': 'ऑर्डर सारांश',
    'Subtotal': 'उप-योग',
    'Delivery': 'डिलीवरी',
    'FREE': 'मुफ़्त',
    'Total Amount': 'कुल राशि',
    'Proceed to Checkout': 'चेकआउट के लिए आगे बढ़ें',
    'Safe & Secure 256-bit encrypted checkout': 'सुरक्षित 256-बिट एन्क्रिप्टेड चेकआउट',
    'Checkout': 'चेकआउट',
    'Place Order': 'ऑर्डर दें',
    'Order Confirmed!': 'ऑर्डर की पुष्टि हो गई!',
    'Continue Shopping': 'खरीदारी जारी रखें',

    // Search & Filters
    'Search Results': 'खोज परिणाम',
    'results for': 'के लिए परिणाम',
    'No Results Found': 'कोई परिणाम नहीं मिला',
    'Filters': 'फ़िल्टर',
    'Sort by': 'इसके अनुसार क्रमबद्ध करें',
    'Price: Low to High': 'कीमत: कम से ज्यादा',
    'Price: High to Low': 'कीमत: ज्यादा से कम',
    'Min Rating': 'न्यूनतम रेटिंग',
    'In Stock Only': 'केवल स्टॉक में उपलब्ध',
    'Max Price': 'अधिकतम कीमत',
    'Clear Filters': 'फ़िल्टर हटाएं',
    'products found': 'उत्पाद मिले',

    // Wishlist & Orders
    'My Wishlist': 'मेरी विशलिस्ट',
    'Your Wishlist is Empty': 'आपकी विशलिस्ट खाली है',
    'Save items you love by tapping the heart icon on any product.': 'पसंदीदा वस्तुओं को सेव करने के लिए दिल के आइकन पर टैप करें।',
    'Start Shopping': 'खरीदारी शुरू करें',
    'Remove': 'हटाएं',
    'No Orders Yet': 'अभी तक कोई ऑर्डर नहीं',
    'Your completed orders will appear here. Start shopping!': 'आपके पूरे किए गए ऑर्डर यहां दिखेंगे। खरीदारी शुरू करें!',
    'Delivered': 'डिलीवर किया गया',
    'Processing': 'प्रक्रिया में',
    'Track Package': 'पैकेज ट्रैक करें',
    'Invoice': 'चालान',

    // Footer & Trust
    'Back to top': 'वापस ऊपर जाएं',
    'Help Center': 'सहायता केंद्र',
    'How can we help you?': 'हम आपकी कैसे मदद कर सकते हैं?',
    'Follow Us': 'हमें फॉलो करें',
    'We Accept': 'हम स्वीकार करते हैं',
    'Privacy Policy': 'गोपनीयता नीति',
    'Terms of Service': 'सेवा की शर्तें',
    'All rights reserved': 'सर्वाधिकार सुरक्षित',
    'Get to Know Us': 'हमारे बारे में जानें',
    'Connect with Us': 'हमसे जुड़ें',
    'Make Money with Us': 'हमारे साथ कमाएं',
    'Let Us Help You': 'हमसे सहायता लें',
    'About ShopNest': 'शॉपनेस्ट के बारे में',
    'Careers': 'करियर',
    'Press Releases': 'प्रेस विज्ञप्तियां',
    'ShopNest Science': 'शॉपनेस्ट साइंस',
    'Facebook': 'फेसबुक',
    'Twitter': 'ट्विटर',
    'Instagram': 'इंस्टाग्राम',
    'Sell on ShopNest': 'शॉपनेस्ट पर बेचें',
    'Sell under ShopNest Accelerator': 'एक्सेलेरेटर के तहत बेचें',
    'Protect and Build Your Brand': 'अपने ब्रांड का निर्माण करें',
    'ShopNest Global Selling': 'वैश्विक बिक्री',
    'Become an Affiliate': 'सहयोगी बनें',
    'Fulfilment by ShopNest': 'शॉपनेस्ट पूर्ति सेवा',
    'Advertise Your Products': 'अपने उत्पादों का विज्ञापन करें',
    'Your Account': 'आपका खाता',
    'Returns Centre': 'वापसी केंद्र',
    '100% Purchase Protection': '100% खरीद सुरक्षा',
    'ShopNest App Download': 'शॉपनेस्ट ऐप डाउनलोड',
    'Help': 'सहायता',
  },
  MR: {
    'All': 'सर्व',
    "Today's Deals": 'आजचे डील्स',
    'ShopNest Pay': 'शॉपनेस्ट पे',
    'Prime': 'प्राईम',
    'Electronics': 'इलेक्ट्रॉनिक्स',
    'Fashion': 'फॅशन',
    'Home & Kitchen': 'होम आणि किचन',
    'Home & Living': 'होम आणि लिव्हिंग',
    'Beauty': 'ब्युटी',
    'Sports': 'स्पोर्ट्स',
    'Computers': 'कॉम्प्युटर्स',
    'Mobiles': 'मोबाईल्स',
    'miniTV': 'मिनी टीव्ही',
    'Sell': 'विक्री करा',
    'Customer Service': 'ग्राहक सेवा',
    'Deliver to': 'डिलिव्हरी पत्ता',
    'Hello, sign in': 'नमस्कार, साइन इन करा',
    'Account & Lists': 'खाते आणि यादी',
    'Returns & Orders': 'परतावा आणि ऑर्डर्स',
    'Cart': 'कार्ट',
    'Wishlist': 'विशलिस्ट',
    'Search for products, brands and more...': 'उत्पादने, ब्रँड आणि अधिक शोधा...',
    'SELECT LANGUAGE': 'भाषा निवडा',
    'You are shopping on ShopNest India': 'तुम्ही शॉपनेस्ट इंडियावर खरेदी करत आहात',

    'Upgrade Your': 'सुधारा तुमचे',
    'Everyday Life': 'दैनंदिन जीवन',
    'Discover top-quality products, unbeatable prices and a smoother shopping experience.': 'उत्कृष्ट दर्जाची उत्पादने, सर्वोत्तम किमती आणि सहज खरेदीचा अनुभव मिळवा.',
    'Shop Now': 'आता खरेदी करा',
    'Try Prime': 'प्राईम वापरून पहा',
    'Free Delivery': 'मोफत डिलिव्हरी',
    '10-Day Returns': '१० दिवसांत परतावा',
    '2.5 Cr+ Products': '२.५ कोटी+ उत्पादने',
    'Better Choices, Brighter Days': 'उत्तम पर्याय, सुंदर दिवस',
    'Flash Deal Live!': 'फ्लॅश डील सुरू आहे!',
    'Trending Now': 'सध्या ट्रेंडिंग',
    'Best Deals': 'सर्वोत्तम डील्स',
    'Ends in': 'समाप्त होण्यास वेळ',

    'Revamp your home in style': 'तुमचे घर स्टाईलने सजवा',
    'Explore all home items': 'घरातील सर्व वस्तू पहा',
    'Bedsheets & Linen': 'बेडशीट्स आणि लिनन',
    'Curtains & Cushions': 'पडदे आणि कुशन',
    'Appliances — Up to 55% off': 'घरगुती उपकरणे — ५५% पर्यंत सूट',
    'See more appliances': 'अधिक उपकरणे पहा',
    'Air Conditioners': 'एअर कंडिशनर्स',
    'Refrigerators': 'रेफ्रिजरेटर्स',
    'Fashion Sale — Up to 60% off': 'फॅशन सेल — ६०% पर्यंत सूट',
    'Shop the fashion sale': 'फॅशन सेलमध्ये खरेदी करा',
    'Tech Essentials — From ₹99': 'टेक उत्पादने — ₹९९ पासून',
    'Fast Charging Cables': 'फास्ट चार्जिंग केबल्स',
    'Wireless Earbuds': 'वायरलेस इअरबड्स',

    'Add to Cart': 'कार्टमध्ये जोडा',
    'Added!': 'जोडले!',
    'Quick Add': 'त्वरित जोडा',
    'Buy Now': 'आता खरेदी करा',
    'Top Rated': 'टॉप रेटेड',
    '★ Top Rated': '★ टॉप रेटेड',
    'Best Seller': 'बेस्ट सेलर',
    'In Stock': 'स्टॉकमध्ये उपलब्ध',
    'Out of Stock': 'स्टॉक संपला',
    'FREE Delivery': 'मोफत डिलिव्हरी',

    'Shopping Cart': 'शॉपिंग कार्ट',
    'Your Cart is Empty': 'तुमची कार्ट रिकामी आहे',
    'Order Summary': 'ऑर्डर सारांश',
    'Subtotal': 'उप-एकूण',
    'Total Amount': 'एकूण रक्कम',
    'Proceed to Checkout': 'चेकआउटसाठी पुढे जा',
    'Search Results': 'शोध परिणाम',
    'Filters': 'फिल्टर्स',
    'Sort by': 'यानुसार क्रमवारी लावा',
    'Price: Low to High': 'किंमत: कमी ते जास्त',
    'Price: High to Low': 'किंमत: जास्त ते कमी',
    'My Wishlist': 'माझी विशलिस्ट',
    'Your Wishlist is Empty': 'तुमची विशलिस्ट रिकामी आहे',
    'Start Shopping': 'खरेदी सुरू करा',
    'Remove': 'काढून टाका',
    'No Orders Yet': 'अद्याप ऑर्डर्स नाहीत',
    'Back to top': 'वर जा',
    'Help Center': 'मदत केंद्र',
    'All rights reserved': 'सर्व हक्क राखीव',
  },
  TA: {
    'All': 'எல்லாம்',
    "Today's Deals": 'இன்றைய சலுகைகள்',
    'ShopNest Pay': 'ஷாப்நெஸ்ட் பே',
    'Prime': 'பிரைம்',
    'Electronics': 'எலக்ட்ரானிக்ஸ்',
    'Fashion': 'ஃபேஷன்',
    'Home & Kitchen': 'வீடு மற்றும் சமையலறை',
    'Home & Living': 'வீட்டு உபயோகம்',
    'Beauty': 'அழகு',
    'Sports': 'விளையாட்டு',
    'Computers': 'கணினிகள்',
    'Mobiles': 'மொபைல்கள்',
    'miniTV': 'மினி டிவி',
    'Sell': 'விற்க',
    'Customer Service': 'வாடிக்கையாளர் சேவை',
    'Deliver to': 'டெலிவரி முகவரி',
    'Hello, sign in': 'வணக்கம், உள்நுழைக',
    'Account & Lists': 'கணக்கு மற்றும் பட்டியல்கள்',
    'Returns & Orders': 'ரிட்டர்ன்ஸ் & ஆர்டர்கள்',
    'Cart': 'கார்ட்',
    'Wishlist': 'விருப்பப்பட்டியல்',
    'Search for products, brands and more...': 'தயாரிப்புகள், பிராண்டுகள் தேடுங்கள்...',
    'SELECT LANGUAGE': 'மொழியைத் தேர்ந்தெடுக்கவும்',
    'You are shopping on ShopNest India': 'நீங்கள் ஷாப்நெஸ்ட் இந்தியாவில் ஷாப்பிங் செய்கிறீர்கள்',

    'Upgrade Your': 'மேம்படுத்துங்கள் உங்கள்',
    'Everyday Life': 'அன்றாட வாழ்க்கை',
    'Shop Now': 'இப்போது வாங்கவும்',
    'Try Prime': 'பிரைமை முயற்சிக்கவும்',
    'Free Delivery': 'இலவச டெலிவரி',
    '10-Day Returns': '10 நாள் ரிட்டர்ன்ஸ்',
    '2.5 Cr+ Products': '2.5 கோடி+ தயாரிப்புகள்',
    'Better Choices, Brighter Days': 'சிறந்த தேர்வுகள், பிரகாசமான நாட்கள்',
    'Flash Deal Live!': 'ஃபிளாஷ் டீல் நேரலை!',
    'Trending Now': 'இப்போது பிரபலமானது',

    'Revamp your home in style': 'உங்கள் வீட்டை ஸ்டைலாக மாற்றுங்கள்',
    'Explore all home items': 'வீட்டுப் பொருட்களைக் காண்க',
    'Appliances — Up to 55% off': 'மின்சாதனங்கள் — 55% வரை தள்ளுபடி',
    'Fashion Sale — Up to 60% off': 'ஃபேஷன் விற்பனை — 60% வரை தள்ளுபடி',
    'Tech Essentials — From ₹99': 'தொழில்நுட்ப பொருட்கள் — ₹99 முதல்',

    'Add to Cart': 'கார்ட்டில் சேர்',
    'Added!': 'சேர்க்கப்பட்டது!',
    'Quick Add': 'விரைவாக சேர்',
    'Buy Now': 'இப்போது வாங்கவும்',
    'Top Rated': 'சிறந்த மதிப்பீடு',
    '★ Top Rated': '★ சிறந்த மதிப்பீடு',
    'Best Seller': 'அதிக விற்பனையானது',
    'In Stock': 'இருப்பில் உள்ளது',
    'Out of Stock': 'இருப்பு இல்லை',
    'FREE Delivery': 'இலவச டெலிவரி',

    'Shopping Cart': 'ஷாப்பிங் கார்ட்',
    'Your Cart is Empty': 'உங்கள் கார்ட் காலியாக உள்ளது',
    'Order Summary': 'ஆர்டர் சுருக்கம்',
    'Subtotal': 'கூடுதல் மொத்தம்',
    'Total Amount': 'மொத்தத் தொகை',
    'Proceed to Checkout': 'செக்அவுட்டுக்கு தொடரவும்',
    'Search Results': 'தேடல் முடிவுகள்',
    'Filters': 'வடிகட்டிகள்',
    'Sort by': 'வரிசைப்படுத்து',
    'My Wishlist': 'என் விருப்பப்பட்டியல்',
    'Start Shopping': 'ஷாப்பிங்கைத் தொடங்குங்கள்',
    'Remove': 'நீக்கு',
    'Back to top': 'மேலே செல்லவும்',
    'All rights reserved': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை',
  },
  TE: {
    'All': 'అన్ని',
    "Today's Deals": 'నేటి డీల్స్',
    'ShopNest Pay': 'షాప్‌నెస్ట్ పే',
    'Prime': 'ప్రైమ్',
    'Electronics': 'ఎలక్ట్రానిక్స్',
    'Fashion': 'ఫ్యాషన్',
    'Home & Kitchen': 'హోమ్ & కిచెన్',
    'Home & Living': 'గృహోపకరణాలు',
    'Beauty': 'బ్యూటీ',
    'Sports': 'క్రీడలు',
    'Computers': 'కంప్యూటర్లు',
    'Mobiles': 'మొబైల్స్',
    'miniTV': 'మినీ టీవీ',
    'Sell': 'అమ్మండి',
    'Customer Service': 'కస్టమర్ సేవ',
    'Deliver to': 'డెలివరీ చిరునామా',
    'Hello, sign in': 'నమస్కారం, సైన్ ఇన్ చేయండి',
    'Account & Lists': 'ఖాతా & జాబితాలు',
    'Returns & Orders': 'రిటర్న్స్ & ఆర్డర్లు',
    'Cart': 'కార్ట్',
    'Wishlist': 'విష్‌లిస్ట్',
    'Search for products, brands and more...': 'ఉత్పత్తులు, బ్రాండ్‌ల కోసం శోధించండి...',
    'SELECT LANGUAGE': 'భాషను ఎంచుకోండి',
    'You are shopping on ShopNest India': 'మీరు షాప్‌నెస్ట్ ఇండియాలో షాపింగ్ చేస్తున్నారు',

    'Upgrade Your': 'మెరుగుపరచుకోండి మీ',
    'Everyday Life': 'రోజువారీ జీవితం',
    'Shop Now': 'ఇప్పుడే కొనండి',
    'Try Prime': 'ప్రైమ్ ప్రయత్నించండి',
    'Free Delivery': 'ఉచిత డెలివరీ',
    '10-Day Returns': '10 రోజుల రిటర్న్స్',
    '2.5 Cr+ Products': '2.5 కోట్లకు పైగా ఉత్పత్తులు',
    'Flash Deal Live!': 'ఫ్లాష్ డీల్ లైవ్!',
    'Trending Now': 'ట్రెండింగ్‌లో ఉన్నవి',

    'Revamp your home in style': 'మీ ఇంటిని స్టైలిష్‌గా మార్చుకోండి',
    'Explore all home items': 'అన్ని గృహ వస్తువులను చూడండి',
    'Appliances — Up to 55% off': 'గృహోపకరణాలు — 55% వరకు తగ్గింపు',
    'Fashion Sale — Up to 60% off': 'ఫ్యాషన్ సేల్ — 60% వరకు తగ్గింపు',
    'Tech Essentials — From ₹99': 'టెక్ అవసరాలు — ₹99 నుండి',

    'Add to Cart': 'కార్ట్‌కు జోడించు',
    'Added!': 'జోడించబడింది!',
    'Quick Add': 'త్వరగా జోడించు',
    'Buy Now': 'ఇప్పుడే కొనండి',
    'Top Rated': 'టాప్ రేటెడ్',
    '★ Top Rated': '★ టాప్ రేటెడ్',
    'Best Seller': 'బెస్ట్ సెల్లర్',
    'In Stock': 'స్టాక్‌లో ఉంది',
    'Out of Stock': 'స్టాక్ అయిపోయింది',
    'FREE Delivery': 'ఉచిత డెలివరీ',

    'Shopping Cart': 'షాపింగ్ కార్ట్',
    'Your Cart is Empty': 'మీ కార్ట్ ఖాళీగా ఉంది',
    'Order Summary': 'ఆర్డర్ సారాంశం',
    'Subtotal': 'ఉపమొత్తం',
    'Total Amount': 'మొత్తం మొత్తం',
    'Proceed to Checkout': 'చెక్‌అవుట్‌కు వెళ్లండి',
    'Search Results': 'శోధన ఫలితాలు',
    'Filters': 'ఫిల్టర్లు',
    'Sort by': 'ద్వారా క్రమబద్ధీకరించు',
    'My Wishlist': 'నా విష్‌లిస్ట్',
    'Start Shopping': 'షాపింగ్ ప్రారంభించండి',
    'Remove': 'తొలగించు',
    'Back to top': 'పైకి వెళ్లు',
    'All rights reserved': 'అన్ని హక్కులూ ప్రత్యేకించబడ్డాయి',
  },
  BN: {
    'All': 'সব',
    "Today's Deals": 'আজকের ডিল',
    'ShopNest Pay': 'শপনেস্ট পে',
    'Prime': 'প্রাইম',
    'Electronics': 'ইলেকট্রনিক্স',
    'Fashion': 'ফ্যাশন',
    'Home & Kitchen': 'হোম ও কিচেন',
    'Home & Living': 'হোম ও লিভিং',
    'Beauty': 'সৌন্দর্য',
    'Sports': 'খেলাধুলা',
    'Computers': 'কম্পিউটার',
    'Mobiles': 'মোবাইল',
    'miniTV': 'মিনি টিভি',
    'Sell': 'বিক্রি করুন',
    'Customer Service': 'গ্রাহক সেবা',
    'Deliver to': 'ডেলিভারি ঠিকানা',
    'Hello, sign in': 'নমস্কার, সাইন ইন করুন',
    'Account & Lists': 'অ্যাকাউন্ট ও তালিকা',
    'Returns & Orders': 'রিটার্ন ও অর্ডার',
    'Cart': 'কার্ট',
    'Wishlist': 'উইশলিস্ট',
    'Search for products, brands and more...': 'পণ্য, ব্র্যান্ড এবং আরও খুঁজুন...',
    'SELECT LANGUAGE': 'ভাষা নির্বাচন করুন',
    'You are shopping on ShopNest India': 'আপনি শপনেস্ট ইন্ডিয়ায় কেনাকাটা করছেন',

    'Upgrade Your': 'উন্নত করুন আপনার',
    'Everyday Life': 'দৈনন্দিন জীবন',
    'Shop Now': 'এখনই কিনুন',
    'Try Prime': 'প্রাইম ব্যবহার করুন',
    'Free Delivery': 'বিনামূল্যে ডেলিভারি',
    '10-Day Returns': '১০ দিনের মধ্যে ফেরত',
    '2.5 Cr+ Products': '২.৫ কোটি+ পণ্য',
    'Flash Deal Live!': 'ফ্ল্যাশ ডিল চলছে!',
    'Trending Now': 'এখন ট্রেন্ডিং',

    'Revamp your home in style': 'আপনার ঘর সাজান স্টাইলে',
    'Explore all home items': 'বাড়ির সব পণ্য দেখুন',
    'Appliances — Up to 55% off': 'যন্ত্রপাতি — ৫৫% পর্যন্ত ছাড়',
    'Fashion Sale — Up to 60% off': 'ফ্যাশন সেল — ৬০% পর্যন্ত ছাড়',
    'Tech Essentials — From ₹99': 'টেক প্রয়োজনীয় সামগ্রী — ₹৯৯ থেকে',

    'Add to Cart': 'কার্টে যোগ করুন',
    'Added!': 'যোগ করা হয়েছে!',
    'Quick Add': 'দ্রুত যোগ করুন',
    'Buy Now': 'এখনই কিনুন',
    'Top Rated': 'টপ রেটেড',
    '★ Top Rated': '★ টপ রেটেড',
    'Best Seller': 'সেরা বিক্রেতা',
    'In Stock': 'স্টকে আছে',
    'Out of Stock': 'স্টক শেষ',
    'FREE Delivery': 'বিনামূল্যে ডেলিভারি',

    'Shopping Cart': 'শপিং কার্ট',
    'Your Cart is Empty': 'আপনার কার্ট খালি',
    'Order Summary': 'অর্ডার সারাংশ',
    'Subtotal': 'উপমোট',
    'Total Amount': 'মোট পরিমাণ',
    'Proceed to Checkout': 'চেকআউটে এগিয়ে যান',
    'Search Results': 'অনুসন্ধান ফলাফল',
    'Filters': 'ফিল্টার',
    'Sort by': 'অনুসারে সাজান',
    'My Wishlist': 'আমার উইশলিস্ট',
    'Start Shopping': 'কেনাকাটা শুরু করুন',
    'Remove': 'মুছে ফেলুন',
    'Back to top': 'উপরে ফিরে যান',
    'All rights reserved': 'সর্বস্বত্ব সংরক্ষিত',
  },
  KN: {
    'All': 'ಎಲ್ಲಾ',
    "Today's Deals": 'ಇಂದಿನ ಡೀಲ್‌ಗಳು',
    'ShopNest Pay': 'ಶಾಪ್‌ನೆಸ್ಟ್ ಪೇ',
    'Prime': 'ಪ್ರೈಮ್',
    'Electronics': 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್',
    'Fashion': 'ಫ್ಯಾಷನ್',
    'Home & Kitchen': 'ಮನೆ ಮತ್ತು ಅಡುಗೆಮನೆ',
    'Home & Living': 'ಮನೆ ಮತ್ತು ಜೀವನಶೈಲಿ',
    'Beauty': 'ಸೌಂದರ್ಯ',
    'Sports': 'ಕ್ರೀಡೆಗಳು',
    'Computers': 'ಕಂಪ್ಯೂಟರ್‌ಗಳು',
    'Mobiles': 'ಮೊಬೈಲ್‌ಗಳು',
    'miniTV': 'ಮಿನಿ ಟಿವಿ',
    'Sell': 'ಮಾರಾಟ ಮಾಡಿ',
    'Customer Service': 'ಗ್ರಾಹಕ ಸೇವೆ',
    'Deliver to': 'ಡೆಲಿವರಿ ವಿಳಾಸ',
    'Hello, sign in': 'ನಮಸ್ಕಾರ, ಸೈನ್ ಇನ್ ಮಾಡಿ',
    'Account & Lists': 'ಖಾತೆ ಮತ್ತು ಪಟ್ಟಿಗಳು',
    'Returns & Orders': 'ರಿಟರ್ನ್ಸ್ ಮತ್ತು ಆರ್ಡರ್‌ಗಳು',
    'Cart': 'ಕಾರ್ಟ್',
    'Wishlist': 'ವಿಶ್‌ಲಿಸ್ಟ್',
    'Search for products, brands and more...': 'ಉತ್ಪನ್ನಗಳು, ಬ್ರ್ಯಾಂಡ್‌ಗಳು ಹುಡುಕಿ...',
    'SELECT LANGUAGE': 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    'You are shopping on ShopNest India': 'ನೀವು ಶಾಪ್‌ನೆಸ್ಟ್ ಇಂಡಿಯಾದಲ್ಲಿ ಶಾಪಿಂಗ್ ಮಾಡುತ್ತಿದ್ದೀರಿ',

    'Upgrade Your': 'ಉನ್ನತೀಕರಿಸಿ ನಿಮ್ಮ',
    'Everyday Life': 'ದೈನಂದಿನ ಜೀವನ',
    'Shop Now': 'ಈಗಲೇ ಖರೀದಿಸಿ',
    'Try Prime': 'ಪ್ರೈಮ್ ಪ್ರಯತ್ನಿಸಿ',
    'Free Delivery': 'ಉಚಿತ ಡೆಲಿವರಿ',
    '10-Day Returns': '10 ದಿನಗಳ ಮರುಪಾವತಿ',
    '2.5 Cr+ Products': '2.5 ಕೋಟಿ+ ಉತ್ಪನ್ನಗಳು',
    'Flash Deal Live!': 'ಫ್ಲ್ಯಾಶ್ ಡೀಲ್ ಲೈವ್!',
    'Trending Now': 'ಟ್ರೆಂಡಿಂಗ್‌ನಲ್ಲಿರುವುದು',

    'Revamp your home in style': 'ನಿಮ್ಮ ಮನೆಯನ್ನು ಸ್ಟೈಲ್‌ನಲ್ಲಿ ನವೀಕರಿಸಿ',
    'Explore all home items': 'ಎಲ್ಲಾ ಗೃಹೋಪಯೋಗಿ ವಸ್ತುಗಳನ್ನು ನೋಡಿ',
    'Appliances — Up to 55% off': 'ಉಪಕರಣಗಳು — 55% ವರೆಗೆ ರಿಯಾಯಿತಿ',
    'Fashion Sale — Up to 60% off': 'ಫ್ಯಾಷನ್ ಸೇಲ್ — 60% ವರೆಗೆ ರಿಯಾಯಿತಿ',
    'Tech Essentials — From ₹99': 'ಟೆಕ್ ಅಗತ್ಯತೆಗಳು — ₹99 ರಿಂದ',

    'Add to Cart': 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
    'Added!': 'ಸೇರಿಸಲಾಗಿದೆ!',
    'Quick Add': 'ತ್ವರಿತವಾಗಿ ಸೇರಿಸಿ',
    'Buy Now': 'ಈಗಲೇ ಖರೀದಿಸಿ',
    'Top Rated': 'ಉನ್ನತ ರೇಟಿಂಗ್',
    '★ Top Rated': '★ ಉನ್ನತ ರೇಟಿಂಗ್',
    'Best Seller': 'ಅತ್ಯುತ್ತಮ ಮಾರಾಟಗಾರ',
    'In Stock': 'ಸ್ಟಾಕ್‌ನಲ್ಲಿದೆ',
    'Out of Stock': 'ಸ್ಟಾಕ್ ಮುಗಿದಿದೆ',
    'FREE Delivery': 'ಉಚಿತ ಡೆಲಿವರಿ',

    'Shopping Cart': 'ಶಾಪಿಂಗ್ ಕಾರ್ಟ್',
    'Your Cart is Empty': 'ನಿಮ್ಮ ಕಾರ್ಟ್ ಖಾಲಿಯಾಗಿದೆ',
    'Order Summary': 'ಆರ್ಡರ್ ಸಾರಾಂಶ',
    'Subtotal': 'ಉಪಮೊತ್ತ',
    'Total Amount': 'ಒಟ್ಟು ಮೊತ್ತ',
    'Proceed to Checkout': 'ಚೆಕ್‌ಔಟ್‌ಗೆ ಮುಂದುವರಿಯಿರಿ',
    'Search Results': 'ಹುಡುಕಾಟ ಫಲಿತಾಂಶಗಳು',
    'Filters': 'ಫಿಲ್ಟರ್‌ಗಳು',
    'Sort by': 'ವಿಂಗಡಿಸಿ',
    'My Wishlist': 'ನನ್ನ ವಿಶ್‌ಲಿಸ್ಟ್',
    'Start Shopping': 'ಶಾಪಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ',
    'Remove': 'ತೆಗೆದುಹಾಕಿ',
    'Back to top': 'ಮೇಲಕ್ಕೆ ಹೋಗಿ',
    'All rights reserved': 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ',
  },
  ML: {
    'All': 'എല്ലാം',
    "Today's Deals": 'ഇന്നത്തെ ഡീലുകൾ',
    'ShopNest Pay': 'ഷോപ്പ്നെസ്റ്റ് പേ',
    'Prime': 'പ്രൈം',
    'Electronics': 'ഇലക്ട്രോണിക്സ്',
    'Fashion': 'ഫാഷൻ',
    'Home & Kitchen': 'വീട് & അടുക്കള',
    'Home & Living': 'ഭവന ഉപകരണങ്ങൾ',
    'Beauty': 'സൗന്ദര്യം',
    'Sports': 'കായികം',
    'Computers': 'കമ്പ്യൂട്ടറുകൾ',
    'Mobiles': 'മൊബൈലുകൾ',
    'miniTV': 'മിനി ടിവി',
    'Sell': 'വിൽക്കുക',
    'Customer Service': 'ഉപഭോക്തൃ സേവനം',
    'Deliver to': 'ഡെലിവറി വിലാസം',
    'Hello, sign in': 'ഹലോ, സൈൻ ഇൻ ചെയ്യുക',
    'Account & Lists': 'അക്കൗണ്ടും ലിസ്റ്റുകളും',
    'Returns & Orders': 'റിട്ടേൺസും ഓർഡറുകളും',
    'Cart': 'കാർട്ട്',
    'Wishlist': 'വിഷ്‌ലിസ്റ്റ്',
    'Search for products, brands and more...': 'ഉൽപ്പന്നങ്ങൾ, ബ്രാൻഡുകൾ തിരയുക...',
    'SELECT LANGUAGE': 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    'You are shopping on ShopNest India': 'നിങ്ങൾ ഷോപ്പ്നെസ്റ്റ് ഇന്ത്യയിൽ ഷോപ്പിംഗ് നടത്തുന്നു',

    'Upgrade Your': 'മെച്ചപ്പെടുത്തുക നിങ്ങളുടെ',
    'Everyday Life': 'ദൈനംദിന ജീവിതം',
    'Shop Now': 'ഇപ്പോൾ വാങ്ങുക',
    'Try Prime': 'പ്രൈം പരീക്ഷിക്കുക',
    'Free Delivery': 'സൗജന്യ ഡെലിവറി',
    '10-Day Returns': '10 ദിവസത്തെ റിട്ടേൺസ്',
    '2.5 Cr+ Products': '2.5 കോടി+ ഉൽപ്പന്നങ്ങൾ',
    'Flash Deal Live!': 'ഫ്ലാഷ് ഡീൽ ലൈവ്!',
    'Trending Now': 'ട്രെൻഡിംഗ്',

    'Revamp your home in style': 'നിങ്ങളുടെ വീട് സ്റ്റൈലിൽ അലങ്കരിക്കുക',
    'Explore all home items': 'എല്ലാ ഭവന ഉൽപ്പന്നങ്ങളും കാണുക',
    'Appliances — Up to 55% off': 'ഉപകരണങ്ങൾ — 55% വരെ കിഴിവ്',
    'Fashion Sale — Up to 60% off': 'ഫാഷൻ വിൽപന — 60% വരെ കിഴിവ്',
    'Tech Essentials — From ₹99': 'ടെക് അവശ്യവസ്തുക്കൾ — ₹99 മുതൽ',

    'Add to Cart': 'കാർട്ടിൽ ചേർക്കുക',
    'Added!': 'ചേർത്തു!',
    'Quick Add': 'വേഗത്തിൽ ചേർക്കുക',
    'Buy Now': 'ഇപ്പോൾ വാങ്ങുക',
    'Top Rated': 'ടോപ്പ് റേറ്റഡ്',
    '★ Top Rated': '★ ടോപ്പ് റേറ്റഡ്',
    'Best Seller': 'ബെസ്റ്റ് സെല്ലർ',
    'In Stock': 'സ്റ്റോക്കുണ്ട്',
    'Out of Stock': 'സ്റ്റോക്ക് തീർന്നു',
    'FREE Delivery': 'സൗജന്യ ഡെലിവറി',

    'Shopping Cart': 'ഷോപ്പിംഗ് കാർട്ട്',
    'Your Cart is Empty': 'നിങ്ങളുടെ കാർട്ട് ശൂന്യമാണ്',
    'Order Summary': 'ഓർഡർ സംഗ്രഹം',
    'Subtotal': 'ഉപആകെ',
    'Total Amount': 'ആകെ തുക',
    'Proceed to Checkout': 'ചെക്ക്ഔട്ടിലേക്ക് പോകുക',
    'Search Results': 'തിരയൽ ഫലങ്ങൾ',
    'Filters': 'ഫിൽട്ടറുകൾ',
    'Sort by': 'തരംതിരിക്കുക',
    'My Wishlist': 'എന്റെ വിഷ്‌ലിസ്റ്റ്',
    'Start Shopping': 'ഷോപ്പിംഗ് ആരംഭിക്കുക',
    'Remove': 'നീക്കം ചെയ്യുക',
    'Back to top': 'മുകളിലേക്ക് പോകുക',
    'All rights reserved': 'എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം',
  },
};

// Word & keyword replacements for partial matching
const WORD_MAP: Record<LanguageCode, Record<string, string>> = {
  EN: {},
  HI: {
    'Electronics': 'इलेक्ट्रॉनिक्स',
    'Fashion': 'फैशन',
    'Beauty': 'ब्यूटी',
    'Sports': 'स्पोर्ट्स',
    'Computers': 'कंप्यूटर्स',
    'Mobiles': 'मोबाइल',
    'Books': 'किताबें',
    'Kitchen': 'किचन',
    'Cameras': 'कैमरे',
    'Audio': 'ऑडियो',
    'Baby': 'बेबी',
    'Accessories': 'एक्सेसरीज',
    'Sale': 'सेल',
    'Deals': 'डील्स',
    'Deal': 'सौदा',
    'Reviews': 'समीक्षाएं',
    'Rating': 'रेटिंग',
    'Save': 'बचत',
    'Free Delivery': 'मुफ्त डिलीवरी',
    'Top Rated': 'टॉप रेटेड',
    'Best Seller': 'बेस्ट सेलर',
    'In Stock': 'स्टॉक में उपलब्ध',
    'Out of Stock': 'स्टॉक समाप्त',
    'Add to Cart': 'कार्ट में जोड़ें',
    'Buy Now': 'अभी खरीदें',
    'Shop Now': 'अभी खरीदें',
    'View All': 'सभी देखें',
    'ratings': 'रेटिंग',
    'reviews': 'समीक्षाएं',
  },
  MR: {
    'Electronics': 'इलेक्ट्रॉनिक्स',
    'Fashion': 'फॅशन',
    'Beauty': 'ब्युटी',
    'Sports': 'स्पोर्ट्स',
    'Computers': 'कॉम्प्युटर्स',
    'Mobiles': 'मोबाईल्स',
    'Books': 'पुस्तके',
    'Kitchen': 'किचन',
    'Cameras': 'कॅमेरे',
    'Sale': 'सेल',
    'Deals': 'डील्स',
    'Reviews': 'पुनरावलोकने',
    'Rating': 'रेटिंग',
    'Free Delivery': 'मोफत डिलिव्हरी',
    'Top Rated': 'टॉप रेटेड',
    'Best Seller': 'बेस्ट सेलर',
    'In Stock': 'स्टॉकमध्ये उपलब्ध',
    'Add to Cart': 'कार्टमध्ये जोडा',
    'Buy Now': 'आता खरेदी करा',
  },
  TA: {
    'Electronics': 'எலக்ட்ரானிக்ஸ்',
    'Fashion': 'ஃபேஷன்',
    'Beauty': 'அழகு',
    'Sports': 'விளையாட்டு',
    'Computers': 'கணினிகள்',
    'Mobiles': 'மொபைல்கள்',
    'Books': 'புத்தகங்கள்',
    'Sale': 'விற்பனை',
    'Deals': 'சலுகைகள்',
    'Free Delivery': 'இலவச டெலிவரி',
    'Add to Cart': 'கார்ட்டில் சேர்',
    'Buy Now': 'இப்போது வாங்கவும்',
  },
  TE: {
    'Electronics': 'ఎలక్ట్రానిక్స్',
    'Fashion': 'ఫ్యాషన్',
    'Beauty': 'బ్యూటీ',
    'Sports': 'క్రీడలు',
    'Computers': 'కంప్యూటర్లు',
    'Mobiles': 'మొబైల్స్',
    'Books': 'పుస్తకాలు',
    'Sale': 'సేల్',
    'Deals': 'డీల్స్',
    'Free Delivery': 'ఉచిత డెలివరీ',
    'Add to Cart': 'కార్ట్‌కు జోడించు',
    'Buy Now': 'ఇప్పుడే కొనండి',
  },
  BN: {
    'Electronics': 'ইলেকট্রনিক্স',
    'Fashion': 'ফ্যাশন',
    'Beauty': 'সৌন্দর্য',
    'Sports': 'খেলাধুলা',
    'Computers': 'কম্পিউটার',
    'Mobiles': 'মোবাইল',
    'Books': 'বই',
    'Sale': 'সেল',
    'Deals': 'ডিল',
    'Free Delivery': 'বিনামূল্যে ডেলিভারি',
    'Add to Cart': 'কার্টে যোগ করুন',
    'Buy Now': 'এখনই কিনুন',
  },
  KN: {
    'Electronics': 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್',
    'Fashion': 'ಫ್ಯಾಷನ್',
    'Beauty': 'ಸೌಂದರ್ಯ',
    'Sports': 'ಕ್ರೀಡೆಗಳು',
    'Computers': 'ಕಂಪ್ಯೂಟರ್‌ಗಳು',
    'Mobiles': 'ಮೊಬೈಲ್‌ಗಳು',
    'Books': 'ಪುಸ್ತಕಗಳು',
    'Sale': 'ಸೇಲ್',
    'Deals': 'ಡೀಲ್‌ಗಳು',
    'Free Delivery': 'ಉಚಿತ ಡೆಲಿವರಿ',
    'Add to Cart': 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
    'Buy Now': 'ಈಗಲೇ ಖರೀದಿಸಿ',
  },
  ML: {
    'Electronics': 'ഇലക്ട്രോണിക്സ്',
    'Fashion': 'ഫാഷൻ',
    'Beauty': 'സൗന്ദര്യം',
    'Sports': 'കായിക',
    'Computers': 'കമ്പ്യൂട്ടറുകൾ',
    'Mobiles': 'മൊബൈലുകൾ',
    'Books': 'പുസ്തകങ്ങൾ',
    'Sale': 'വിൽപന',
    'Deals': 'ഡീലുകൾ',
    'Free Delivery': 'സൗജന്യ ഡെലിവറി',
    'Add to Cart': 'കാർട്ടിൽ ചേർക്കുക',
    'Buy Now': 'ഇപ്പോൾ വാങ്ങുക',
  },
};

// Function to translate a single text string
function translateText(text: string, lang: LanguageCode): string {
  if (lang === 'EN' || !text) return text;
  const trimmed = text.trim();
  if (!trimmed) return text;

  // 1. Direct full phrase match
  const dict = PHRASES[lang];
  if (dict && dict[trimmed]) {
    return text.replace(trimmed, dict[trimmed]);
  }

  // 2. Partial word/category replacement
  const wordDict = WORD_MAP[lang];
  if (wordDict) {
    let replaced = text;
    let modified = false;
    for (const [enWord, localWord] of Object.entries(wordDict)) {
      if (replaced.includes(enWord)) {
        replaced = replaced.split(enWord).join(localWord);
        modified = true;
      }
    }
    if (modified) return replaced;
  }

  return text;
}

// Tree walker to translate all text nodes in the DOM
export function runDomTranslation(lang: LanguageCode) {
  if (typeof document === 'undefined') return;
  if (isTranslating) return;
  isTranslating = true;

  try {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName;
          if (
            tag === 'SCRIPT' ||
            tag === 'STYLE' ||
            tag === 'CODE' ||
            tag === 'PRE' ||
            tag === 'INPUT' ||
            tag === 'TEXTAREA' ||
            parent.classList.contains('notranslate') ||
            parent.closest('.notranslate')
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          const val = node.nodeValue?.trim();
          if (!val || /^\d+$/.test(val) || /^₹[\d,]+$/.test(val)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    let currentNode = walker.nextNode();
    while (currentNode) {
      const currentVal = currentNode.nodeValue;
      if (currentVal) {
        // Cache original English text
        let orig = originalTextMap.get(currentNode);
        if (!orig) {
          orig = currentVal;
          originalTextMap.set(currentNode, orig);
        }

        if (lang === 'EN') {
          if (currentVal !== orig) {
            currentNode.nodeValue = orig;
          }
        } else {
          const translated = translateText(orig, lang);
          if (translated !== currentVal) {
            currentNode.nodeValue = translated;
          }
        }
      }
      currentNode = walker.nextNode();
    }
  } finally {
    isTranslating = false;
  }
}
