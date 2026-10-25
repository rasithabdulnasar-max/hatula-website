/* ─────────────────────────────────────────────────
   HATALULA — Site Configuration
   Heshham Abdul Malik Al Tuwalah Trading Est.
   ───────────────────────────────────────────────── */

export const site = {
  companyName:      'HESHHAM ABDUL MALIK AL TUWALAH TRADING EST.',
  companyNameAr:    'مؤسسة هشام عبد الملك الطوالة للتجارة',
  brand:            'Hatalula',
  brandAr:          'هتالولا',
  founder:          'Hassan Ibrahim',
  founderAr:        'حسن إبراهيم',
  contactPerson:    'Hassan Ibrahim',
  phoneDisplay:     '0500 810 730',
  phoneTel:         'tel:+966500810730',
  email:            'hassaan@mamcoair.com',
  whatsappNumber:   '',
  domain:           'https://hatalula.com',
  location:         'Saudi Arabia',
  locationAr:       'المملكة العربية السعودية',
  currency:         'SAR',
  currencySymbol:   'ر.س',
};

/* ─────────────────────────────────────────────────
   PRODUCT CATEGORIES
   [slug, name_en, name_ar, description_en, description_ar, icon, image]
   ───────────────────────────────────────────────── */
export const categories = [
  [
    'bms-hvac-controls',
    'BMS & Building Automation',
    'أنظمة إدارة المباني',
    'Building management system controllers, sensors and automation hardware for commercial and industrial facilities.',
    'وحدات تحكم وأجهزة استشعار للأنظمة الأوتوماتيكية في المنشآت التجارية والصناعية.',
    'bms',
    ''
  ],
  [
    'hvac-controls',
    'HVAC Control & Valves',
    'تحكم التكييف والصمامات',
    'Control valves, actuators, damper drives and HVAC instrumentation for mechanical systems.',
    'صمامات تحكم ومشغلات وأدوات قياس لأنظمة التكييف الميكانيكية.',
    'hvac',
    ''
  ],
  [
    'sensors',
    'Sensors & Transmitters',
    'أجهزة الاستشعار والإرسال',
    'Temperature, humidity, pressure and flow sensors for building automation and process control.',
    'حساسات الحرارة والرطوبة والضغط والتدفق للتحكم في المباني والعمليات.',
    'sensor',
    ''
  ],
  [
    'air-conditioning',
    'Air Conditioning Systems',
    'أنظمة تكييف الهواء',
    'Split, cassette, ducted and window air conditioning equipment for commercial and residential applications.',
    'وحدات تكييف سبليت وكاسيت ودكت وشباك للتطبيقات التجارية والسكنية.',
    'ac',
    ''
  ],
  [
    'ac-spare-parts',
    'AC Spare Parts',
    'قطع غيار المكيفات',
    'Replacement components for air conditioning units — motors, capacitors, control boards, thermistors and more.',
    'قطع غيار لوحدات التكييف — موتورات ومكثفات ولوحات تحكم وثرمستورات وغيرها.',
    'spare',
    ''
  ],
  [
    'fire-alarm',
    'Fire Alarm & Safety',
    'إنذار الحريق والسلامة',
    'Smoke detectors, call points, sounders and accessories for fire detection and alarm systems.',
    'كاشفات دخان ونقاط نداء وصفارات وملحقات لأنظمة كشف الحريق والإنذار.',
    'fire',
    ''
  ],
  [
    'electrical-mechanical',
    'Electrical & Mechanical',
    'الكهربائية والميكانيكية',
    'Contactors, terminal blocks, cable glands and general electrical components for industrial applications.',
    'كونتاكتورات وبلوكات توصيل وجلاندات كابلات ومكونات كهربائية للتطبيقات الصناعية.',
    'electrical',
    ''
  ],
  [
    'refrigerator-spare-parts',
    'Refrigeration Parts',
    'قطع غيار التبريد',
    'Compressors, fans, thermostats and defrost components for commercial and domestic refrigeration.',
    'ضواغط ومراوح وثرموستات ومكونات إزالة الجليد للتبريد التجاري والمنزلي.',
    'fridge',
    ''
  ],
].map(([slug, name_en, name_ar, description_en, description_ar, icon, image]) => ({
  slug, name_en, name_ar, description_en, description_ar, icon, image
}));

/* ─────────────────────────────────────────────────
   BRANDS BY CATEGORY (FOR INFINITE MARQUEE & FILTERS)
   ───────────────────────────────────────────────── */
export const partnerBrandsList = [
  'Honeywell',
  'Siemens',
  'Schneider Electric',
  'Johnson Controls',
  'Belimo',
  'Danfoss',
  'ABB',
  'Gree',
  'Midea',
  'Carrier',
  'Zamil Air Conditioners',
  'Daikin',
  'York',
  'Mitsubishi Electric',
  'NOTIFIER',
  'Hochiki',
  'Apollo Fire',
  'Bosch Security',
  'Vaisala',
  'Dwyer Instruments',
  'Embraco',
  'Legrand',
  'Eaton'
];

export const brands = {
  'bms-hvac-controls': ['Honeywell', 'Siemens', 'Schneider Electric', 'Johnson Controls', 'Belimo', 'Danfoss', 'ABB', 'Distech Controls'],
  'hvac-controls':     ['Belimo', 'Danfoss', 'Siemens', 'Johnson Controls', 'Schneider Electric'],
  'sensors':           ['Siemens', 'Honeywell', 'Vaisala', 'Dwyer', 'Schneider Electric', 'ABB'],
  'air-conditioning':  ['Gree', 'Midea', 'Carrier', 'Zamil Air Conditioners', 'LG', 'Samsung', 'Daikin', 'Mitsubishi Electric', 'O General', 'York'],
  'fire-alarm':        ['Honeywell / NOTIFIER', 'Siemens', 'Bosch', 'Hochiki', 'Apollo', 'Edwards', 'GST'],
  'electrical-mechanical': ['ABB', 'Schneider Electric', 'Siemens', 'Legrand', 'Eaton'],
};

/* ─────────────────────────────────────────────────
   GALLERY IMAGES (CORRECTED FOUNDER NAME: HASSAN IBRAHIM)
   ───────────────────────────────────────────────── */
export const galleryImages = [
  {
    id: 'founder',
    src: 'gallery/founder.jpg',
    caption_en: 'Hassan Ibrahim — Founder, Hatalula Trading Est.',
    caption_ar: 'حسن إبراهيم — مؤسس مؤسسة هتالولا للتجارة',
    category: 'company',
    alt_en: 'Founder of Hatalula, Hassan Ibrahim, in formal attire',
    alt_ar: 'مؤسس هتالولا، حسن إبراهيم، بالزي الرسمي',
  },
  {
    id: 'shop-opening',
    src: 'gallery/shop-opening.jpg',
    caption_en: 'Official opening of Hatalula Trading Est. — مؤسسة هشام عبدالملك الطوالة للتجارة',
    caption_ar: 'الافتتاح الرسمي لمؤسسة هشام عبد الملك الطوالة للتجارة (هتالولا)',
    category: 'company',
    alt_en: 'Official opening of Hatalula Trading establishment with staff and balloons',
    alt_ar: 'الافتتاح الرسمي لمؤسسة هتالولا مع الموظفين والبالونات',
  },
];

/* ─────────────────────────────────────────────────
   DELIVERY INFORMATION & PACKAGING OPTIONS
   ───────────────────────────────────────────────── */
export const delivery = {
  regions_en: 'We currently deliver across all provinces and cities of Saudi Arabia.',
  regions_ar: 'نقوم بالتوصيل والتوريد لكافة مدن ومحافظات المملكة العربية السعودية.',
  lead_time_en: 'Standard orders dispatch within 24–48 hours from our central logistics hubs.',
  lead_time_ar: 'يتم شحن وتجهيز الطلبات خلال 24–48 ساعة من مراكز التوزيع الرئيسية.',
  packaging_options: [
    {
      id: 'reinforced-carton',
      icon: '📦',
      name_en: 'Heavy-Duty Reinforced Box',
      name_ar: 'صندوق كرتوني مقوى عالي التحمل',
      desc_en: 'Multi-layer corrugated cardboard box with corner protection and shock-absorbing bubble wrap. Perfect for fragile electrical spares, thermostats, and sensors.',
      desc_ar: 'كرتون مضلع متعدد الطبقات مع واقيات زوايا وتغليف فقاعي ماص للصدمات. مثالي لقطع الغيار الحساسة، الثرموستات والحساسات.'
    },
    {
      id: 'wooden-crate',
      icon: '🪵',
      name_en: 'Treated Wooden Crate / Pallet',
      name_ar: 'صندوق خشبي معالج / منصة نقالة (طبلية)',
      desc_en: 'ISPM-15 heat-treated timber crating strapped securely. Ideal for heavy valves, large compressors, industrial fan motors, and bulk site deliveries.',
      desc_ar: 'تغليف خشبي معالج بالحرارة ومثبت بأحزمة أمان قوية. ممتاز للصمامات الثقيلة، الضواغط الكبيرة، وموتورات التكييف وشحنات المشاريع.'
    },
    {
      id: 'weatherproof-pallet',
      icon: '🛡',
      name_en: 'Moisture-Sealed Shrink Wrapping',
      name_ar: 'تغليف نايلون حراري عازل للرطوبة والغبار',
      desc_en: 'Industrial-grade UV and moisture barrier film with anti-tamper security bands. Designed for outdoor staging and direct jobsite drops across the Kingdom.',
      desc_ar: 'تغليف محكم مقاوم للغبار والأمطار مع أشرطة أمان واضحة للعبث. مصمم لتسليم مواقع العمل والمشاريع الخارجية في المملكة.'
    }
  ]
};

/* ─────────────────────────────────────────────────
   FAQ DATA
   ───────────────────────────────────────────────── */
export const faqData = {
  en: [
    {
      category: '📦 Products',
      items: [
        {
          q: 'What types of BMS products does Hatalula supply?',
          a: 'Hatalula supplies BMS and building automation products including DDC controllers, room thermostats, temperature and humidity sensors, and building management accessories. Contact us to enquire about specific models and availability.',
        },
        {
          q: 'What HVAC equipment does Hatalula offer?',
          a: 'Our catalogue includes split, cassette, ducted and window air conditioning systems, alongside HVAC control valves, actuators, sensors, damper drives and related instrumentation from leading brands.',
        },
        {
          q: 'Where can I find product specifications?',
          a: 'Product specifications are listed on each individual product page. For detailed technical datasheets, please contact our team and we will provide the relevant documentation.',
        },
        {
          q: 'Can I download technical datasheets?',
          a: 'Technical datasheets are available for many products. Where a direct download link is not shown, contact us and our team will supply the relevant manufacturer documentation.',
        },
      ],
    },
    {
      category: '📊 Stock & Availability',
      items: [
        {
          q: 'How can I check product availability?',
          a: 'Product availability is shown directly on each product card and detail page in clear numbers. If an item is in stock, the available quantity is highlighted in green. If out of stock, it is highlighted in red with estimated restock days.',
        },
        {
          q: 'What happens when a product is out of stock?',
          a: 'If a product is out of stock, we display the exact days remaining in red until the next shipment arrives. You can also submit an RFQ to reserve stock ahead of time.',
        },
        {
          q: 'Can I find out when a product will be restocked?',
          a: 'Yes, our platform displays the confirmed restock schedule directly on the product badge in red.',
        },
      ],
    },
    {
      category: '🛒 Orders',
      items: [
        {
          q: 'How do I place an order?',
          a: 'Browse the catalogue, select the products you need, and use the quotation cart or direct enquiry options. Our engineering sales team will verify availability, pricing and dispatch schedule.',
        },
        {
          q: 'Can I purchase multiple products together?',
          a: 'Yes. You can add multiple products to your Quotation Cart and submit them together with custom packaging instructions.',
        },
        {
          q: 'Can I order products in bulk?',
          a: 'Bulk and project orders are welcome. Use the Request a Quote form to submit quantities and project details. Our team will provide appropriate pricing and lead times.',
        },
      ],
    },
    {
      category: '📋 Quotations',
      items: [
        {
          q: 'How do I request a quotation?',
          a: 'Use the "Request a Quote" button on any product page, or visit the dedicated Request a Quote page. Provide your product list, quantities and any project details.',
        },
        {
          q: 'Can I request project-based pricing?',
          a: 'Yes. Hatalula supports project and B2B procurement enquiries. Submit your requirements through the Request a Quote form, including project scope, quantities and timeline.',
        },
        {
          q: 'Can I upload a Bill of Quantities (BOQ)?',
          a: 'Yes. The quotation request form allows you to include project details and special requirements. Contact us directly to share a BOQ document by email or WhatsApp.',
        },
      ],
    },
    {
      category: '🚚 Delivery & Packaging',
      items: [
        {
          q: 'Can I choose how my items are packaged?',
          a: 'Yes! Visit our Delivery page from the navigation dropdown menu to select your packaging preference: Heavy-Duty Reinforced Boxes, Treated Wooden Crates, or Weatherproof Pallet wrapping.',
        },
        {
          q: 'Which areas of Saudi Arabia do you deliver to?',
          a: 'We deliver across all provinces and cities in Saudi Arabia, from major metropolitan hubs like Riyadh, Jeddah, Dammam to regional project sites.',
        },
        {
          q: 'How can I track my order?',
          a: 'Contact our team with your order reference and we will provide an immediate status update on courier tracking.',
        },
      ],
    },
    {
      category: '💬 Support',
      items: [
        {
          q: 'How can I contact Hatalula?',
          a: 'You can reach us by phone at 0500 810 730, by email at hassaan@mamcoair.com, or through our website contact form.',
        },
        {
          q: 'Can I receive technical assistance?',
          a: 'Our engineering specialists assist in verifying electrical ratings, dimensions, and protocol compatibility before order finalization.',
        },
      ],
    },
  ],
  ar: [
    {
      category: '📦 المنتجات',
      items: [
        {
          q: 'ما أنواع منتجات BMS التي تقدمها هتالولا؟',
          a: 'توفر هتالولا منتجات أنظمة إدارة المباني والأتمتة، بما في ذلك وحدات تحكم DDC وثرموستات الغرف وحساسات الحرارة والرطوبة وملحقات إدارة المباني. تواصل معنا للاستفسار عن موديلات محددة والتوفر.',
        },
        {
          q: 'ما معدات التكييف التي تقدمها هتالولا؟',
          a: 'يشمل كتالوجنا أنظمة تكييف سبليت وكاسيت ودكت وشباك، بالإضافة إلى صمامات تحكم ومشغلات وحساسات وسواقات مجاري الهواء وأدوات القياس ذات الصلة من علامات تجارية رائدة.',
        },
        {
          q: 'أين يمكنني العثور على مواصفات المنتجات؟',
          a: 'تُدرج مواصفات المنتجات في صفحة كل منتج على حدة. للحصول على كتالوجات تقنية مفصلة، تواصل مع فريقنا وسنوفر الوثائق المناسبة.',
        },
        {
          q: 'هل يمكنني تحميل الكتالوجات الفنية؟',
          a: 'تتوفر الكتالوجات الفنية للعديد من المنتجات. عند عدم وجود رابط تحميل مباشر، تواصل معنا وسيوفر فريقنا وثائق الشركة المصنعة المناسبة.',
        },
      ],
    },
    {
      category: '📊 المخزون والتوفر',
      items: [
        {
          q: 'كيف يمكنني التحقق من توفر المنتج ومواعيد الشحن؟',
          a: 'يظهر المخزون المتوفر باللون الأخضر مع العدد الدقيق. وإذا كان المنتج غير متوفر يظهر باللون الأحمر مع عدد الأيام المتبقية للشحنة القادمة.',
        },
        {
          q: 'ماذا يحدث عند نفاد المنتج؟',
          a: 'نعرض مباشرة باللون الأحمر عدد الأيام المتبقية حتى وصول الشحنة القادمة، ويمكنك حجز الكمية مقدماً عبر طلب عرض السعر.',
        },
        {
          q: 'هل يمكنني معرفة موعد إعادة توفر المنتج؟',
          a: 'نعم، يوضح الموقع مؤشر موعد إعادة التوفر الفعلي لجميع المكونات باللون الأحمر مع عدد الأيام.',
        },
      ],
    },
    {
      category: '🛒 الطلبات',
      items: [
        {
          q: 'كيف أقدم طلباً؟',
          a: 'تصفح الكتالوج، واختر المنتجات التي تحتاجها، واستخدم خيار الاستفسار أو طلب عرض سعر. سيقوم فريقنا بتأكيد التوفر والأسعار والخطوات التالية.',
        },
        {
          q: 'هل يمكنني شراء منتجات متعددة معاً واختيار نوع التغليف؟',
          a: 'نعم. يمكنك إضافة منتجات متعددة إلى سلة عروض الأسعار وتحديد تفضيلات التغليف (صناديق مقواة، صناديق خشبية، أو تغليف حراري).',
        },
        {
          q: 'هل يمكنني الطلب بكميات كبيرة؟',
          a: 'بالتأكيد. طلبات الجملة والمشاريع مرحب بها. استخدم نموذج طلب عرض السعر لإدخال الكميات وتفاصيل المشروع، وسيقدم فريقنا أسعاراً مناسبة ومدد التسليم.',
        },
      ],
    },
    {
      category: '📋 عروض الأسعار',
      items: [
        {
          q: 'كيف أطلب عرض سعر؟',
          a: 'استخدم زر "طلب عرض سعر" في أي صفحة منتج، أو زر صفحة طلب عرض السعر المخصصة. أدخل قائمة منتجاتك والكميات وأي تفاصيل للمشروع.',
        },
        {
          q: 'هل يمكنني طلب أسعار خاصة بالمشاريع؟',
          a: 'نعم. تدعم هتالولا استفسارات المشاريع والمشتريات من الشركات. أرسل متطلباتك من خلال نموذج طلب عرض السعر، بما في ذلك نطاق المشروع والكميات والجدول الزمني.',
        },
        {
          q: 'هل يمكنني إرفاق جداول الكميات (BOQ)؟',
          a: 'نعم. يتيح نموذج طلب عرض السعر إضافة تفاصيل المشروع والمتطلبات الخاصة. تواصل معنا مباشرةً لمشاركة مستند جدول الكميات عبر البريد الإلكتروني أو واتساب.',
        },
      ],
    },
    {
      category: '🚚 التوصيل والتغليف',
      items: [
        {
          q: 'هل يمكنني تحديد طريقة تغليف الشحنة؟',
          a: 'نعم! يمكنك زيارة صفحة التوصيل من القائمة المنسدلة واختيار نوع التغليف المناسب لطلبك: كراتين مقواة، صناديق خشبية، أو تغليف عازل للرطوبة والغبار.',
        },
        {
          q: 'ما المناطق التي تغطونها في المملكة العربية السعودية؟',
          a: 'نخدم العملاء في جميع أنحاء المملكة العربية السعودية، في المدن الكبرى (الرياض، جدة، الدمام) ومواقع المشاريع الإقليمية.',
        },
        {
          q: 'كيف يمكنني تتبع طلبي؟',
          a: 'تواصل مع فريقنا برقم مرجع طلبك وسنزودك بتحديث عن حالة طلبك والتوصيل المتوقع.',
        },
      ],
    },
    {
      category: '💬 الدعم',
      items: [
        {
          q: 'كيف يمكنني التواصل مع هتالولا؟',
          a: 'يمكنك التواصل معنا عبر الهاتف على 0500 810 730 أو البريد الإلكتروني hassaan@mamcoair.com أو صفحة الاتصال.',
        },
        {
          q: 'هل يمكنني الحصول على مساعدة تقنية؟',
          a: 'يقدم مهندسونا مساعدة متخصصة للتحقق من المواصفات الكهربائية، الأبعاد والتوافق قبل توريد الطلبيات.',
        },
      ],
    },
  ],
};
