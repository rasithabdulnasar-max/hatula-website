import { site, categories, brands, partnerBrandsList, galleryImages, faqData, delivery } from './config.js';
import { products } from './data.js';

// --- Routing & State Setup ---
const siteBase = new URL('../', import.meta.url).pathname.replace(/\/+$/, '');
const appPath = (pathname) => {
  const normalized = pathname.replace(/\/+/g, '/');
  return siteBase && normalized.startsWith(`${siteBase}/`)
    ? normalized.slice(siteBase.length) || '/'
    : normalized || '/';
};
let currentPath = appPath(window.location.pathname);

const isAr = currentPath.startsWith('/ar');
const lang = isAr ? 'ar' : 'en';

// Simple Cart & RFQ state persisted in localStorage
let rfqCart = [];
try {
  const saved = localStorage.getItem('hatalula_rfq_cart');
  if (saved) rfqCart = JSON.parse(saved);
} catch (e) {
  rfqCart = [];
}

// User-selected delivery packaging preference
let selectedPackaging = 'reinforced-carton';
try {
  const savedPkg = localStorage.getItem('hatalula_delivery_pkg');
  if (savedPkg) selectedPackaging = savedPkg;
} catch (e) {}

function saveRfqCart() {
  try {
    localStorage.setItem('hatalula_rfq_cart', JSON.stringify(rfqCart));
  } catch (e) {}
  updateCartBadge();
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-count-badge');
  const count = rfqCart.reduce((sum, item) => sum + (item.qty || 1), 0);
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

// Translations Dictionary
const copy = {
  en: {
    home: 'Home',
    products: 'Products',
    bms: 'BMS',
    hvac: 'HVAC',
    categories: 'Categories',
    gallery: 'Gallery',
    delivery: 'Delivery',
    about: 'About Us',
    faq: 'FAQ',
    contact: 'Contact',
    rfq: 'Request Quote',
    cart: 'Quotation Cart',
    search: 'Search product name, brand, part #...',
    allCategories: 'All Categories',
    allBrands: 'All Brands',
    reset: 'Reset Filters',
    inStockPrefix: 'In Stock',
    outOfStock: 'Out of Stock',
    restockPrefix: 'Restocking in',
    days: 'days',
    explore: 'Explore Products',
    requestQuote: 'Request a Quote',
    addToRfq: 'Add to RFQ List',
    addedToRfq: 'Added to Quote ✓',
    removeFromRfq: 'Remove',
    viewDetails: 'Technical Details',
    quickView: 'Quick View',
    whyChoose: 'Why Choose Hatalula?',
    catalogueHeadline: 'Industrial Hardware & Automation Systems',
    heroHeadline: 'Your trusted store for HVAC, appliance spares and MEP supplies.',
    heroSubtitle: 'Leading supplier of Building Management Systems (BMS), industrial HVAC equipment, precision controls, sensors, and commercial spare parts across Saudi Arabia.',
    exploreCatalog: 'Browse Catalogue',
    talkToEngineer: 'Direct Technical Enquiry',
    partnerBrandsHeadline: 'Brands & Companies We Work With',
    ourMethodologyTitle: 'Our Methodology',
    ourMethodologySubtitle: 'How we treat our customers and partner with engineering contractors across Saudi Arabia.',
    methodology1Title: 'Customer-First Technical Advisory',
    methodology1Desc: 'We treat every contractor and engineer as a long-term partner, taking the time to review electrical diagrams, sizing calculations, and system requirements before recommending parts.',
    methodology2Title: 'Absolute Transparency & Truth in Stock',
    methodology2Desc: 'We never fabricate stock counters. Real inventory quantities and exact restock schedules are displayed in red, protecting your jobsite timelines from delays.',
    methodology3Title: 'Custom Tailored Packaging',
    methodology3Desc: 'From heavy wooden crates for industrial valves to moisture-sealed shrink wrapping for site staging, we package every order according to your exact jobsite handling preferences.',
    methodology4Title: 'Rapid Kingdom-Wide Fulfilment',
    methodology4Desc: 'Fast response and dispatch across Riyadh, Jeddah, Dammam and remote construction sites, supported by comprehensive shipment tracking and dedicated support.',
    deliveryTitle: 'Delivery & Packaging Options',
    deliverySubtitle: 'Tell us how you want your package to be delivered — customized for your jobsite safety and material handling standards.',
    selectPackaging: 'Select This Packaging',
    selectedPackaging: 'Selected Packaging ✓',
    applications: 'Applications & Use Cases',
    suitableSystems: 'Suitable Equipment & Systems',
    technicalSpecs: 'Technical Specifications',
    compatibilityNotice: 'Compatibility & Engineering Verification',
    compatibilityWarning: 'Critical: Compatibility and equipment sizing must be confirmed with technical datasheets and certified engineers prior to procurement.',
    relatedProducts: 'Related Products & Accessories',
    rfqTitle: 'B2B Project Quotation & Bulk Orders',
    rfqDesc: 'Submit your Bill of Quantities (BOQ), commercial project requirements, or multiple product requests for prompt engineering pricing.',
    submitRfq: 'Submit Quotation Request',
    companyDetails: 'Company & Contact Details',
    fullName: 'Contact Name',
    companyName: 'Company / Organization Name',
    phone: 'Phone Number (Saudi Arabia)',
    email: 'Work Email Address',
    projectLocation: 'Project City / Location',
    projectNotes: 'Project Details / BOQ Specifications / Special Requirements',
    rfqSuccess: 'Thank you! Your quotation request has been received. Our technical team will review your specifications and contact you shortly.',
    emptyMatch: 'No components match your search filters.',
    contactUs: 'Contact Engineering Support',
    allRightsReserved: 'All rights reserved.',
    saudiMarketNotice: 'Commercial Registration & Distribution in the Kingdom of Saudi Arabia',
    galleryTitle: 'Company & Project Gallery',
    gallerySubtitle: 'Explore our facilities, executive leadership, store openings, and industrial equipment portfolio.',
    allPhotos: 'All Photos',
    companyPhotos: 'Company & Operations',
    productPhotos: 'Products & Hardware',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Find immediate answers regarding products, technical datasheets, quotations, stock verification, and Saudi-wide delivery.',
    aboutUsTitle: 'About Hatalula Trading Est.',
    aboutUsSubtitle: 'Pioneering technical reliability and procurement excellence in Saudi Arabia’s industrial hardware, HVAC, and building automation sectors.',
    close: 'Close',
    viewEnquiry: 'Submit via WhatsApp',
    callNow: 'Direct Phone',
    emailNow: 'Email Sales',
    qty: 'Quantity',
    priceNotice: 'Official B2B quotation provided upon specification review',
    currency: 'SAR',
    backToProducts: '← Back to Products',
    founderQuote: '“Delivering genuine engineering components with absolute transparency and technical integrity to empower the Kingdom’s infrastructure.”'
  },
  ar: {
    home: 'الرئيسية',
    products: 'المنتجات',
    bms: 'أنظمة إدارة المباني (BMS)',
    hvac: 'التكييف (HVAC)',
    categories: 'الفئات',
    gallery: 'معرض الصور',
    delivery: 'التوصيل والتغليف',
    about: 'من نحن',
    faq: 'الأسئلة الشائعة',
    contact: 'اتصل بنا',
    rfq: 'طلب عرض سعر',
    cart: 'سلة عروض الأسعار',
    search: 'ابحث بالاسم، الموديل، الماركة، أو رقم القطعة...',
    allCategories: 'جميع الفئات',
    allBrands: 'جميع الماركات',
    reset: 'إعادة ضبط التصفية',
    inStockPrefix: 'المتوفر بالمخزون',
    outOfStock: 'غير متوفر حالياً',
    restockPrefix: 'إعادة التوفر خلال',
    days: 'أيام',
    explore: 'استكشف المنتجات',
    requestQuote: 'طلب تسعيرة مشروع',
    addToRfq: 'إضافة لقائمة التسعير',
    addedToRfq: 'تمت الإضافة ✓',
    removeFromRfq: 'حذف',
    viewDetails: 'التفاصيل والمواصفات',
    quickView: 'معاينة سريعة',
    whyChoose: 'لماذا تختار مؤسسة هتالولا؟',
    catalogueHeadline: 'العتاد الصناعي وأنظمة الأتمتة والتحكم',
    heroHeadline: 'متجرك الموثوق لحلول التكييف وقطع غيار الأجهزة ومواد MEP.',
    heroSubtitle: 'المورد الموثوق لأنظمة إدارة المباني (BMS)، معدات التكييف والتهوية الصناعية، أجهزة الاستشعار، والصمامات، وقطع الغيار في المملكة العربية السعودية.',
    exploreCatalog: 'تصفح الكتالوج الشامل',
    talkToEngineer: 'استفسار هندسي مباشر',
    partnerBrandsHeadline: 'العلامات التجارية والشركات التي نعمل معها',
    ourMethodologyTitle: 'منهجيتنا في خدمة العملاء',
    ourMethodologySubtitle: 'كيف نتعامل مع عملائنا وشركائنا المقاولين والمهندسين في كافة أرجاء المملكة.',
    methodology1Title: 'استشارة فنية متخصصة تضع العميل أولاً',
    methodology1Desc: 'نتعامل مع كل مقاول ومهندس كشريك نجاح دائم، وندرس المخططات الكهربائية وحسابات الأحمال بعناية قبل التوصية بأي قطعة.',
    methodology2Title: 'شفافية ومصداقية مطلقة في المخزون',
    methodology2Desc: 'لا نستخدم أرقاماً وهمية. يظهر المخزون الفعلي ومواعيد إعادة التوفر باللون الأحمر بدقة لحماية الجداول الزمنية لمشاريعكم.',
    methodology3Title: 'تغليف مخصص حسب طلب العميل وموقع العمل',
    methodology3Desc: 'سواء كنت تفضل كراتين مقواة أو صناديق خشبية معالجة أو تغليفاً عازلاً للرطوبة والغبار، نجهز شحنتك بالطريقة التي تناسب طبيعة موقع مشروعك.',
    methodology4Title: 'سرعة التوريد والشحن لكافة مدن المملكة',
    methodology4Desc: 'استجابة سريعة وشحن مباشر للرياض وجدة والدمام وكافة المواقع النائية مع تتبع دقيق للشحنات ودعم فني مستمر.',
    deliveryTitle: 'خيارات التوصيل ونوع التغليف',
    deliverySubtitle: 'حدد الطريقة التي ترغب في استلام شحنتك بها — بصندوق مقوى أو خشبي أو بالطريقة التي تناسب احتياجات موقعك.',
    selectPackaging: 'اختيار هذا النوع من التغليف',
    selectedPackaging: 'تم اختيار هذا التغليف ✓',
    applications: 'التطبيقات وحالات الاستخدام',
    suitableSystems: 'الأنظمة والمعدات المتوافقة',
    technicalSpecs: 'المواصفات الفنية',
    compatibilityNotice: 'التوافق والتحقق الهندسي',
    compatibilityWarning: 'تنبيه: يجب التحقق من ملاءمة التوافق ومواصفات التحجيم مع الكتالوجات الفنية والمهندسين المختصين قبل الاعتماد والشراء.',
    relatedProducts: 'منتجات وملحقات ذات صلة',
    rfqTitle: 'عروض أسعار المشاريع والطلبات التجارية',
    rfqDesc: 'أرسل جداول الكميات (BOQ) أو قائمة المكونات المطلوبة للحصول على تسعيرة رسمية معتمدة مع الجداول الزمنية للتوريد.',
    submitRfq: 'إرسال طلب التسعيرة',
    companyDetails: 'بيانات الشركة والاتصال',
    fullName: 'اسم المسؤول / المهندس',
    companyName: 'اسم الشركة أو المنشأة',
    phone: 'رقم الجوال (داخل السعودية)',
    email: 'البريد الإلكتروني للعمل',
    projectLocation: 'المدينة / موقع المشروع',
    projectNotes: 'ملاحظات المشروع / تفاصيل جدول الكميات / المواصفات المطلوبة',
    rfqSuccess: 'شكراً لك! تم استلام طلب التسعيرة بنجاح. سيقوم فريقنا الفني بمراجعة المواصفات والتواصل معكم فوراً.',
    emptyMatch: 'لا توجد منتجات تطابق خيارات البحث الحالية.',
    contactUs: 'تواصل مع الدعم الفني والمبيعات',
    allRightsReserved: 'جميع الحقوق محفوظة.',
    saudiMarketNotice: 'سجل تجاري معتمد وتوزيع رسمي في المملكة العربية السعودية',
    galleryTitle: 'معرض الصور والمشاريع',
    gallerySubtitle: 'استكشف مسيرة المؤسسة، الإدارة التنفيذية، افتتاح المعارض، ومخزون المعدات الصناعية.',
    allPhotos: 'جميع الصور',
    companyPhotos: 'المؤسسة والافتتاح',
    productPhotos: 'المنتجات والمعدات',
    faqTitle: 'الأسئلة الأكثر شيوعاً',
    faqSubtitle: 'إجابات فورية وشاملة حول المنتجات، الكتالوجات، طلبات التسعير، توفر المخزون، وخدمات الشحن والتوصيل بالمملكة.',
    aboutUsTitle: 'عن مؤسسة هشام عبد الملك الطوالة للتجارة (هتالولا)',
    aboutUsSubtitle: 'ريادة في توفير الحلول الكهروميكانيكية وأنظمة التكييف والتحكم الآلي وفق أعلى معايير الجودة والشفافية في السوق السعودي.',
    close: 'إغلاق',
    viewEnquiry: 'طلب استفسار عبر واتساب',
    callNow: 'اتصال هاتفي مباشر',
    emailNow: 'مراسلة عبر البريد',
    qty: 'الكمية',
    priceNotice: 'يتم تقديم الأسعار الرسمية عبر عروض الأسعار المعتمدة للمشاريع',
    currency: 'ر.س',
    backToProducts: '← العودة للمنتجات',
    founderQuote: '“نلتزم بتوريد مكونات هندسية أصلية بشفافية مطلقة واحترافية عالية لدعم مشاريع البنية التحتية في مملكتنا الغالية.”'
  }
}[lang];

// Helper Functions
const T = (obj, field = 'name') => obj?.[`${field}_${lang}`] || obj?.[`${field}_en`] || '';
const route = (p = '') => {
  const clean = p.startsWith('/') ? p : `/${p}`;
  return `${siteBase}${isAr ? '/ar' : ''}${clean}`.replace(/\/+/g, '/') || '/';
};
const assetPath = (p = '') => `${siteBase}/assets/${p.replace(/^\/+/, '')}`;
const esc = (s) => String(s || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

function languageTarget() {
  const raw = currentPath;
  if (isAr) {
    const withoutAr = raw.replace(/^\/ar(\/|$)/, '/');
    return withoutAr || '/';
  } else {
    return `/ar${raw.startsWith('/') ? raw : '/' + raw}`;
  }
}

// Navigation Helper
function navigate(url) {
  window.history.pushState({}, '', url);
  currentPath = appPath(window.location.pathname);
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// SVG Icons Dictionary
const icons = {
  bms: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 8h2m2 0h6M7 12h4m2 0h4"/></svg>`,
  hvac: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.2 2.2m8.4 8.4l2.2 2.2M5.6 18.4l2.2-2.2m8.4-8.4l2.2-2.2"/></svg>`,
  sensor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><circle cx="12" cy="17" r="2" fill="currentColor"/></svg>`,
  ac: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 14h12M6 10h12M12 18v2"/></svg>`,
  spare: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>`,
  fire: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5Z"/></svg>`,
  electrical: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  fridge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="8" y1="6" x2="8" y2="8"/><line x1="8" y1="14" x2="8" y2="17"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>`,
  box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`
};

function getCategoryIcon(catSlug) {
  const cat = categories.find(c => c.slug === catSlug);
  return icons[cat?.icon] || icons.box;
}

// ─────────────────────────────────────────────────
// HEADER & NAVIGATION
// ─────────────────────────────────────────────────
function headerComponent() {
  const currentClean = currentPath.replace(/^\/ar/, '') || '/';
  const cartCount = rfqCart.reduce((s, i) => s + (i.qty || 1), 0);

  return `
    <div class="topbar">
      <div class="container">
        <div class="topbar-left">
          <span class="topbar-badge">${isAr ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'}</span>
          <span>${isAr ? site.companyNameAr : site.companyName}</span>
        </div>
        <div class="topbar-right">
          <a href="${site.phoneTel}" dir="ltr">📞 ${site.phoneDisplay}</a>
          <a href="mailto:${site.email}">✉ ${site.email}</a>
        </div>
      </div>
    </div>
    <header class="header">
      <div class="container header-inner">
        <a class="brand" href="${route('/')}">
          <div class="logo-mark">
            <span class="logo-text-mark">HAT</span>
          </div>
          <div class="brand-name">
            <span class="brand-primary">${isAr ? site.brandAr : site.brand}</span>
            <span class="brand-sub">${isAr ? 'أنظمة التكييف والتحكم والعتاد الصناعي' : 'HVAC, BMS & Industrial Hardware'}</span>
          </div>
        </a>

        <button class="menu-btn" aria-label="Toggle Navigation" aria-expanded="false">☰</button>

        <nav class="nav">
          <a class="nav-link ${currentClean === '/' ? 'active' : ''}" href="${route('/')}">${copy.home}</a>
          
          <div class="nav-item">
            <a class="nav-link ${currentClean.startsWith('/products') ? 'active' : ''}" href="${route('/products/')}">
              ${copy.products} ▾
            </a>
            <div class="nav-dropdown">
              <a href="${route('/products/')}"><span class="dd-icon">📦</span> ${copy.allCategories}</a>
              <a href="${route('/hvac/')}"><span class="dd-icon">❄</span> ${copy.hvac}</a>
              <hr style="border:none;border-top:1px solid var(--line-light);margin:.3rem 0;">
              ${categories.map(c => `
                <a href="${route(`/products/${c.slug}/`)}">
                  <span class="dd-icon">${c.icon === 'bms' ? '🎛' : c.icon === 'hvac' ? '❄' : c.icon === 'sensor' ? '🌡' : '⚙'}</span>
                  ${esc(T(c))}
                </a>
              `).join('')}
            </div>
          </div>

          <a class="nav-link ${currentClean.startsWith('/bms') ? 'active' : ''}" href="${route('/bms/')}">${copy.bms}</a>
          <a class="nav-link ${currentClean.startsWith('/hvac') ? 'active' : ''}" href="${route('/hvac/')}">${copy.hvac}</a>
          <a class="nav-link ${currentClean.startsWith('/faq') ? 'active' : ''}" href="${route('/faq/')}">${copy.faq}</a>
          <a class="nav-link ${currentClean.startsWith('/about') ? 'active' : ''}" href="${route('/about/')}">${copy.about}</a>
          <a class="nav-link ${currentClean.startsWith('/contact') ? 'active' : ''}" href="${route('/contact/')}">${copy.contact}</a>

          <!-- Hamburger Dropdown next to Contact containing all pages -->
          <div class="nav-hamburger-wrap">
            <button class="nav-hamburger-btn" id="nav-mega-menu-btn" aria-label="Menu" aria-expanded="false">
              ☰ <span style="font-size:.78rem;font-weight:700;">${isAr ? 'القائمة' : 'Menu'}</span>
            </button>
            <div class="nav-hamburger-dropdown" id="nav-mega-dropdown">
              <a href="${route('/')}">🏠 ${copy.home}</a>
              <a href="${route('/products/')}">📦 ${copy.products}</a>
              <a href="${route('/bms/')}">🎛 ${copy.bms}</a>
              <a href="${route('/hvac/')}">❄ ${copy.hvac}</a>
              <hr>
              <a href="${route('/delivery/')}">🚚 ${copy.delivery}</a>
              <a href="${route('/gallery/')}">🖼 ${copy.gallery}</a>
              <a href="${route('/faq/')}">❓ ${copy.faq}</a>
              <a href="${route('/about/')}">🏛 ${copy.about}</a>
              <a href="${route('/contact/')}">📍 ${copy.contact}</a>
              <a href="${route('/rfq/')}">🛒 ${copy.rfq}</a>
              <a href="${route('/privacy/')}">📄 ${isAr ? 'الخصوصية' : 'Privacy'}</a>
            </div>
          </div>
        </nav>

        <div class="header-right">
          <a class="lang-btn" href="${languageTarget()}" title="Change language">
            🌐 ${isAr ? 'English' : 'العربية'}
          </a>
          <a class="btn btn-outline btn-sm" href="${route('/rfq/')}" style="position:relative;">
            🛒 ${copy.rfq}
            <span class="cart-count-badge" style="display:${cartCount > 0 ? 'inline-flex' : 'none'};background:var(--navy);color:#fff;border-radius:99px;font-size:.7rem;padding:.1rem .45rem;margin-inline-start:.3rem;font-weight:700;">
              ${cartCount}
            </span>
          </a>
          <a class="btn btn-navy btn-sm" href="${site.phoneTel}">
            ${copy.callNow}
          </a>
        </div>
      </div>
    </header>
  `;
}

// ─────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────
function footerComponent() {
  return `
    <footer class="footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <div class="brand" style="margin-bottom:1rem;">
            <div class="logo-mark" style="background:#243555;">
              <span class="logo-text-mark" style="color:var(--gold-light);">HAT</span>
            </div>
            <div class="brand-name">
              <span class="brand-primary" style="color:#fff;">${isAr ? site.companyNameAr : site.companyName}</span>
              <span class="brand-sub" style="color:rgba(255,255,255,.6);">${isAr ? site.brandAr : site.brand} · Saudi Arabia</span>
            </div>
          </div>
          <p>${copy.heroSubtitle}</p>
          <div class="footer-social">
            <a class="footer-social-btn" href="${site.phoneTel}" title="Phone">📞</a>
            <a class="footer-social-btn" href="mailto:${site.email}" title="Email">✉</a>
            <a class="footer-social-btn" href="${route('/contact/')}" title="Contact">📍</a>
          </div>
        </div>

        <div class="footer-col">
          <h4>${copy.products}</h4>
          <a href="${route('/products/')}">${copy.allCategories}</a>
          <a href="${route('/bms/')}">${copy.bms}</a>
          <a href="${route('/hvac/')}">${copy.hvac}</a>
          <a href="${route('/products/sensors/')}">${isAr ? 'أجهزة الاستشعار' : 'Sensors & Transmitters'}</a>
          <a href="${route('/products/fire-alarm/')}">${isAr ? 'إنذار الحريق' : 'Fire Alarm & Safety'}</a>
          <a href="${route('/products/electrical-mechanical/')}">${isAr ? 'المواد الكهروميكانيكية' : 'Electrical & Mechanical'}</a>
        </div>

        <div class="footer-col">
          <h4>${isAr ? 'روابط سريعة' : 'Company & Support'}</h4>
          <a href="${route('/delivery/')}">🚚 ${copy.delivery}</a>
          <a href="${route('/about/')}">${copy.about}</a>
          <a href="${route('/gallery/')}">${copy.gallery}</a>
          <a href="${route('/faq/')}">${copy.faq}</a>
          <a href="${route('/rfq/')}">${copy.rfq}</a>
          <a href="${route('/contact/')}">${copy.contact}</a>
        </div>

        <div class="footer-col">
          <h4>${isAr ? 'التواصل والموقع' : 'Official Contact'}</h4>
          <div class="footer-contact-item">
            ${icons.phone}
            <div>
              <strong style="color:#fff;display:block;font-size:.82rem;">${site.contactPerson}</strong>
              <a href="${site.phoneTel}" dir="ltr">${site.phoneDisplay}</a>
            </div>
          </div>
          <div class="footer-contact-item">
            ${icons.mail}
            <div>
              <a href="mailto:${site.email}">${site.email}</a>
            </div>
          </div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.5);margin-top:.75rem;">
            ${isAr ? delivery.regions_ar : delivery.regions_en}
          </p>
        </div>
      </div>

      <div class="container">
        <hr class="footer-divider">
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${isAr ? site.companyNameAr : site.companyName}. ${copy.allRightsReserved}</span>
          <div class="footer-bottom-links">
            <span style="color:var(--gold-light);">🇸🇦 ${isAr ? site.locationAr : site.location}</span>
            <a href="${route('/privacy/')}">${isAr ? 'إشعار الخصوصية والشروط' : 'Privacy & Terms'}</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// ─────────────────────────────────────────────────
// BREADCRUMB COMPONENT
// ─────────────────────────────────────────────────
function breadcrumb(items) {
  return `
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="${route('/')}">${copy.home}</a>
        ${items.map(item => `
          <span class="breadcrumb-sep">/</span>
          ${item.url ? `<a href="${item.url}">${esc(item.label)}</a>` : `<span>${esc(item.label)}</span>`}
        `).join('')}
      </nav>
    </div>
  `;
}

// ─────────────────────────────────────────────────
// PRODUCT CARD COMPONENT (WITH STOCK DISPLAY & RESTOCK DAYS)
// ─────────────────────────────────────────────────
function productCard(p) {
  const cat = categories.find(c => c.slug === p.category);
  const isInCart = rfqCart.some(item => item.id === p.id);
  const detailUrl = route(`/product/${p.slug}/`);
  const imageSrc = p.image || cat?.image;

  return `
    <article class="product-card" data-slug="${p.slug}">
      <div class="product-card-img">
        ${imageSrc ? `<img src="${assetPath(imageSrc)}" alt="${esc(T(p))}" loading="lazy">` : getCategoryIcon(p.category)}
      </div>
      <span class="product-tag">${esc(T(cat))}</span>
      <h3><a href="${detailUrl}" style="color:inherit;">${esc(T(p))}</a></h3>
      <p style="font-size:.85rem;color:var(--muted);line-height:1.5;margin:0;">${esc(T(p, 'description'))}</p>
      
      <div class="product-card-meta">
        ${p.brand ? `<div class="product-meta-row"><span>${isAr ? 'الماركة' : 'Brand'}:</span> <strong>${esc(p.brand)}</strong></div>` : ''}
        
        <!-- Red Stock Display & Restock Days -->
        <div style="margin-top:.35rem;">
          ${p.in_stock ? `
            <span class="stock-badge-green">
              ● ${copy.inStockPrefix}: ${p.stock_qty} ${isAr ? 'قطعة' : 'units'}
            </span>
          ` : `
            <span class="stock-badge-red">
              ✕ ${copy.outOfStock}
            </span>
            <div class="restock-notice-box">
              ⏱ ${copy.restockPrefix} ${p.restock_days || 5} ${copy.days}
            </div>
          `}
        </div>
      </div>

      <div class="product-card-actions">
        <a class="btn btn-outline btn-sm" href="${detailUrl}">${copy.viewDetails}</a>
        <button class="btn btn-navy btn-sm btn-add-rfq" data-id="${p.id}">
          ${isInCart ? copy.addedToRfq : copy.addToRfq}
        </button>
      </div>
    </article>
  `;
}

// ─────────────────────────────────────────────────
// HOMEPAGE VIEW
// ─────────────────────────────────────────────────
function homePage() {
  return `
    <main id="main">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container hero-inner">
          <div>
            <div class="hero-eyebrow">🇸🇦 ${isAr ? 'توريد هندسي وتجاري معتمد' : 'Industrial Hardware & Automation · Saudi Arabia'}</div>
            <h1>${copy.heroHeadline}</h1>
            <p class="hero-desc">${copy.heroSubtitle}</p>
            <div class="hero-actions">
              <a class="btn btn-gold btn-lg" href="${route('/products/')}">${copy.exploreCatalog}</a>
              <a class="btn btn-outline-white btn-lg" href="${route('/rfq/')}">${copy.requestQuote}</a>
            </div>
            
            <div class="hero-stats">
              <div class="hero-stat">
                <span class="hero-stat-num">8+</span>
                <span class="hero-stat-label">${isAr ? 'فئات هندسية متخصصة' : 'Core Technical Categories'}</span>
              </div>
              <div class="hero-stat">
                <span class="hero-stat-num">100%</span>
                <span class="hero-stat-label">${isAr ? 'مواصفات وتوثيق أصلي' : 'Authentic Engineering Specs'}</span>
              </div>
            </div>
          </div>

          <div class="hero-visual">
            <div class="hero-visual-card">
              <div class="hero-visual-card-icon">🎛</div>
              <div class="hero-visual-card-text">
                <strong>${isAr ? 'أنظمة إدارة المباني (BMS)' : 'Building Management Systems'}</strong>
                <span>${isAr ? 'تحكم DDC، حساسات وصمامات مؤتمتة' : 'DDC Controllers, Sensors & Motorised Valves'}</span>
              </div>
            </div>
            <div class="hero-visual-card">
              <div class="hero-visual-card-icon">❄</div>
              <div class="hero-visual-card-text">
                <strong>${isAr ? 'معدات وتبريد التكييف (HVAC)' : 'HVAC & Mechanical Spares'}</strong>
                <span>${isAr ? 'سبليت، كاسيت، دكت، وضواغط صناعية' : 'Ducted, Split, Cassette & Industrial Spares'}</span>
              </div>
            </div>
            <div class="hero-visual-card">
              <div class="hero-visual-card-icon">⚡</div>
              <div class="hero-visual-card-text">
                <strong>${isAr ? 'المواد الكهروميكانيكية وإنذار الحريق' : 'Electrical & Fire Safety Systems'}</strong>
                <span>${isAr ? 'كونتاكتورات، كواشف دخان ولوحات تحكم' : 'Contactors, Smoke Detectors & Safety Hardware'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Infinite Partner Brands Marquee Section -->
      <section class="section" style="padding-block:3rem;background:var(--surface);border-bottom:1px solid var(--line-light);">
        <div class="container" style="text-align:center;margin-bottom:1.5rem;">
          <span class="eyebrow">${isAr ? 'شركاء الجودة' : 'Authorised & Industry Standards'}</span>
          <h2 style="font-size:1.4rem;font-weight:800;color:var(--navy-deep);margin:0;">${copy.partnerBrandsHeadline}</h2>
        </div>
        <div class="marquee-container">
          <div class="marquee-track">
            ${partnerBrandsList.concat(partnerBrandsList).map(brand => `
              <div class="marquee-item">${esc(brand)}</div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Categories Section with Real Reference Images -->
      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">${isAr ? 'الكتالوج الهندسي' : 'Hardware Catalogue'}</span>
            <h2>${copy.catalogueHeadline}</h2>
            <p>${isAr ? 'استكشف الفئات الفنية المتكاملة لمشاريع البنية التحتية والمنشآت التجارية والمقاولات.' : 'Explore complete engineering and procurement categories designed for commercial and industrial contractors.'}</p>
          </div>
          <div class="category-grid">
            ${categories.map(c => `
              <a class="category-card" href="${route(`/products/${c.slug}/`)}">
                <div class="category-visual" style="${c.image ? `background-image:url('${assetPath(c.image)}');background-size:contain;background-position:center;background-repeat:no-repeat;background-color:#fff;` : ''}">
                  ${!c.image ? `
                    <div class="category-icon-wrap">
                      ${icons[c.icon] || icons.box}
                    </div>
                  ` : ''}
                </div>
                <div class="category-card-body">
                  <h3>${esc(T(c))}</h3>
                  <p>${esc(T(c, 'description'))}</p>
                  <span class="category-card-link">${isAr ? 'تصفح المكونات' : 'View Components'} →</span>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Our Methodology (Customer Commitment & Experience) -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-head center">
            <span class="eyebrow">${isAr ? 'خدمة ورعاية العملاء' : 'Customer Centricity'}</span>
            <h2>${copy.ourMethodologyTitle}</h2>
            <p>${copy.ourMethodologySubtitle}</p>
          </div>
          <div class="methodology-grid">
            <div class="methodology-card">
              <div class="methodology-step">01</div>
              <h3>${copy.methodology1Title}</h3>
              <p>${copy.methodology1Desc}</p>
            </div>
            <div class="methodology-card">
              <div class="methodology-step">02</div>
              <h3>${copy.methodology2Title}</h3>
              <p>${copy.methodology2Desc}</p>
            </div>
            <div class="methodology-card">
              <div class="methodology-step">03</div>
              <h3>${copy.methodology3Title}</h3>
              <p>${copy.methodology3Desc}</p>
            </div>
            <div class="methodology-card">
              <div class="methodology-step">04</div>
              <h3>${copy.methodology4Title}</h3>
              <p>${copy.methodology4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Choose Hatalula -->
      <section class="section">
        <div class="container">
          <div class="section-head center">
            <span class="eyebrow">${isAr ? 'الثقة والاحتراف' : 'Corporate Strengths'}</span>
            <h2>${copy.whyChoose}</h2>
            <p>${isAr ? 'نلتزم بأعلى معايير التوريد الصناعي لتلبية احتياجات المقاولين والمهندسين بالمملكة.' : 'Providing transparent technical specifications, verified product sourcing, and responsive engineering procurement.'}</p>
          </div>
          <div class="info-grid">
            <div class="info-card">
              <div class="info-card-icon">${icons.shield}</div>
              <h3>${isAr ? 'بيانات فنية موثقة' : 'Verified Technical Specifications'}</h3>
              <p>${isAr ? 'نوفر تفاصيل هندسية شفافة للتوافق والتطبيقات دون وعود مضللة أو مواصفات غير مؤكدة.' : 'Clear equipment parameters, electrical ratings, and operational limits directly aligned with manufacturer specifications.'}</p>
            </div>
            <div class="info-card">
              <div class="info-card-icon">${icons.box}</div>
              <h3>${isAr ? 'توريد المشاريع والجملة' : 'B2B & Project Procurement'}</h3>
              <p>${isAr ? 'جاهزية لدراسة جداول الكميات (BOQ) وتوفير تسعيرات رسمية منافسة للمشاريع الكبرى.' : 'Streamlined RFQ processing for commercial contractors, facility management firms, and MEP procurement teams.'}</p>
            </div>
            <div class="info-card">
              <div class="info-card-icon">${icons.phone}</div>
              <h3>${isAr ? 'دعم واستجابة سريعة' : 'Dedicated Technical Support'}</h3>
              <p>${isAr ? 'فريق مبيعات ودعم فني مباشر للإجابة عن استفسارات الموديلات والتوافق في السوق السعودي.' : 'Direct access to experienced technical representatives via phone, email, and localized support.'}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Gallery Preview -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-head" style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;">
            <div>
              <span class="eyebrow">${isAr ? 'معرض الصور' : 'Corporate Gallery'}</span>
              <h2>${copy.galleryTitle}</h2>
              <p>${copy.gallerySubtitle}</p>
            </div>
            <a class="btn btn-outline" href="${route('/gallery/')}">${isAr ? 'عرض كامل المعرض' : 'View Full Gallery'} →</a>
          </div>
          <div class="gallery-grid">
            ${galleryImages.map(img => `
              <div class="gallery-item" data-src="${assetPath(img.src)}" data-caption="${esc(T(img, 'caption'))}">
                <img src="${assetPath(img.src)}" alt="${esc(T(img, 'alt'))}" loading="lazy">
                <div class="gallery-item-overlay">
                  <span>${esc(T(img, 'caption'))}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- CTA / Enquiry Banner -->
      <section class="section" style="padding-top:0;">
        <div class="container">
          <div class="cta-banner">
            <div class="cta-banner-text">
              <h2>${isAr ? 'هل تحتاج إلى تسعيرة مشروع أو توريد مكونات خاصة؟' : 'Need Project Sizing, a Custom BOQ, or Component Sourcing?'}</h2>
              <p>${isAr ? 'تواصل مع مهندسينا مباشرة عبر الهاتف أو أرسل قائمة المواد للحصول على عرض سعر معتمد.' : 'Submit your requirements online or speak directly with our procurement team to verify availability and receive formal pricing.'}</p>
            </div>
            <div class="cta-banner-actions">
              <a class="btn btn-gold btn-lg" href="${route('/rfq/')}">${copy.requestQuote}</a>
              <a class="btn btn-outline-white btn-lg" href="${site.phoneTel}">${copy.callNow}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}

// ─────────────────────────────────────────────────
// PRODUCTS CATALOGUE PAGE (TAGLINE REMOVED PER USER REQUEST)
// ─────────────────────────────────────────────────
function productsPage(categorySlug = null) {
  const activeCat = categories.find(c => c.slug === categorySlug);
  const title = activeCat ? T(activeCat) : copy.products;
  const filtered = activeCat ? products.filter(p => p.category === activeCat.slug) : products;
  const allBrands = [...new Set(products.map(p => p.brand).filter(Boolean))];

  return `
    <main id="main">
      ${breadcrumb([
        { label: copy.products, url: activeCat ? route('/products/') : null },
        ...(activeCat ? [{ label: title, url: null }] : [])
      ])}

      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">${isAr ? 'كتالوج هتالولا' : 'Hatalula Catalogue'}</span>
          <h1>${esc(title)}</h1>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <!-- Filters Bar -->
          <div class="filters-bar">
            <input id="prod-search" type="text" placeholder="${copy.search}" aria-label="Search">
            <select id="prod-cat" aria-label="Filter by Category">
              <option value="">${copy.allCategories}</option>
              ${categories.map(c => `
                <option value="${c.slug}" ${c.slug === categorySlug ? 'selected' : ''}>${esc(T(c))}</option>
              `).join('')}
            </select>
            <select id="prod-brand" aria-label="Filter by Brand">
              <option value="">${copy.allBrands}</option>
              ${allBrands.map(b => `<option value="${b}">${esc(b)}</option>`).join('')}
            </select>
            <button class="filter-reset" id="prod-reset">${copy.reset}</button>
          </div>

          <!-- Product Grid Container -->
          <div id="product-results" class="product-grid">
            ${filtered.map(p => productCard(p)).join('')}
          </div>
        </div>
      </section>
    </main>
  `;
}

// ─────────────────────────────────────────────────
// DEDICATED BMS PAGE
// ─────────────────────────────────────────────────
function bmsPage() {
  const bmsProducts = products.filter(p => p.category === 'bms-hvac-controls' || p.category === 'sensors');

  return `
    <main id="main">
      ${breadcrumb([{ label: copy.bms, url: null }])}

      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">Building Management Systems</span>
          <h1>${isAr ? 'أنظمة إدارة المباني والتحكم الآلي (BMS)' : 'Building Management Systems (BMS)'}</h1>
          <p>${isAr ? 'وحدات تحكم رقمية مباشرة (DDC)، محولات، حساسات بيئية وأجهزة أتمتة للمباني والمستشفيات والمشاريع الكبرى.' : 'Engineered DDC controllers, ambient transmitters, precision room sensors, and automation hardware for Saudi commercial facilities.'}</p>
        </div>
      </section>

      <div class="sub-page-nav">
        <div class="container">
          <a class="sub-nav-link active" href="${route('/bms/')}">${isAr ? 'نظرة عامة والمنتجات' : 'Overview & Hardware'}</a>
          <a class="sub-nav-link" href="${route('/products/sensors/')}">${isAr ? 'الحساسات والمحولات' : 'Sensors & Transmitters'}</a>
          <a class="sub-nav-link" href="${route('/hvac/')}">${isAr ? 'صمامات التكييف' : 'HVAC Actuators & Valves'}</a>
          <a class="sub-nav-link" href="${route('/rfq/')}">${copy.requestQuote}</a>
        </div>
      </div>

      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">${isAr ? 'المكونات المتاحة' : 'Available BMS Hardware'}</span>
            <h2>${isAr ? 'وحدات التحكم وأجهزة الاستشعار' : 'Automation Controllers & Transmitters'}</h2>
            <p>${isAr ? 'مكونات متوافقة مع بروتوكولات BACnet و Modbus الشائعة في المنشآت السعودية.' : 'Standardized components designed for interoperability with leading building management architectures.'}</p>
          </div>

          <div class="product-grid">
            ${bmsProducts.map(p => productCard(p)).join('')}
          </div>
        </div>
      </section>
    </main>
  `;
}

// ─────────────────────────────────────────────────
// DEDICATED HVAC PAGE
// ─────────────────────────────────────────────────
function hvacPage() {
  const hvacProducts = products.filter(p => p.category === 'air-conditioning' || p.category === 'hvac-controls' || p.category === 'ac-spare-parts');

  return `
    <main id="main">
      ${breadcrumb([{ label: copy.hvac, url: null }])}

      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">Heating, Ventilation & Air Conditioning</span>
          <h1>${isAr ? 'معدات التكييف والتحكم الميكانيكي (HVAC)' : 'HVAC Systems & Mechanical Controls'}</h1>
          <p>${isAr ? 'أنظمة تكييف سبليت وكاسيت ودكت، صمامات تحكم مائية، مشغلات كهربائية، ومفاتيح تدفق للمنشآت التجارية والصناعية.' : 'Commercial cooling systems, motorised chilled water valves, flow switches, and technical spare parts for MEP contractors.'}</p>
        </div>
      </section>

      <div class="sub-page-nav">
        <div class="container">
          <a class="sub-nav-link active" href="${route('/hvac/')}">${isAr ? 'نظرة عامة والأنظمة' : 'Overview & Systems'}</a>
          <a class="sub-nav-link" href="${route('/products/air-conditioning/')}">${isAr ? 'أنظمة التكييف' : 'Cooling Units'}</a>
          <a class="sub-nav-link" href="${route('/products/hvac-controls/')}">${isAr ? 'صمامات وتحكم' : 'Valves & Actuators'}</a>
          <a class="sub-nav-link" href="${route('/products/ac-spare-parts/')}">${isAr ? 'قطع الغيار' : 'AC Spare Parts'}</a>
        </div>
      </div>

      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">${isAr ? 'معدات التكييف' : 'HVAC Hardware'}</span>
            <h2>${isAr ? 'حلول التبريد والتحكم الهيدروني' : 'Cooling Systems & Hydronic Control'}</h2>
            <p>${isAr ? 'اختر المكون المناسب لمشروعك مع توفير الدعم الفني للتحقق من الأحجام والتوافق.' : 'Explore equipment engineered to withstand severe ambient operating temperatures with peak efficiency.'}</p>
          </div>

          <div class="product-grid">
            ${hvacProducts.map(p => productCard(p)).join('')}
          </div>
        </div>
      </section>
    </main>
  `;
}

// ─────────────────────────────────────────────────
// DELIVERY & PACKAGING PREFERENCES PAGE
// ─────────────────────────────────────────────────
function deliveryPage() {
  const options = delivery.packaging_options || [];

  return `
    <main id="main">
      ${breadcrumb([{ label: copy.delivery, url: null }])}

      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">Logistics & Handling</span>
          <h1>${copy.deliveryTitle}</h1>
          <p>${copy.deliverySubtitle}</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-head center">
            <span class="eyebrow">${isAr ? 'تفضيلات العميل' : 'Custom Tailored Options'}</span>
            <h2>${isAr ? 'كيف ترغب في استلام وتغليف طلبيتك؟' : 'How Would You Like Your Order Packaged?'}</h2>
            <p>${isAr ? 'اختر طريقة التغليف المفضلة لديك وسنقوم بتجهيز جميع مكونات طلبيتك وفقاً للمعايير المحددة.' : 'Select your preferred packing method below. Your selection is automatically attached to all your quotation inquiries and order dispatches.'}</p>
          </div>

          <div class="packaging-grid">
            ${options.map(opt => `
              <div class="packaging-card ${selectedPackaging === opt.id ? 'selected' : ''}" data-id="${opt.id}">
                <div class="packaging-icon">${opt.icon}</div>
                <h3>${esc(T(opt))}</h3>
                <p>${esc(T(opt, 'desc'))}</p>
                <div class="packaging-select-badge">
                  ${selectedPackaging === opt.id ? copy.selectedPackaging : copy.selectPackaging}
                </div>
              </div>
            `).join('')}
          </div>

          <div style="margin-top:3.5rem;background:var(--surface);padding:2rem;border-radius:var(--radius-lg);border:1.5px solid var(--line-light);">
            <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
              <div style="font-size:2rem;">🚚</div>
              <div style="flex:1;">
                <h3 style="font-size:1.1rem;color:var(--navy-deep);margin:0 0 .3rem;">${isAr ? 'تغطية التوصيل في كافة أنحاء المملكة' : 'Kingdom-Wide Dispatch & Delivery Coverage'}</h3>
                <p style="font-size:.88rem;color:var(--muted);margin:0;">
                  ${isAr ? delivery.regions_ar : delivery.regions_en} — ${isAr ? delivery.lead_time_ar : delivery.lead_time_en}
                </p>
              </div>
              <a class="btn btn-navy" href="${route('/rfq/')}">${copy.requestQuote}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}

// ─────────────────────────────────────────────────
// PRODUCT DETAIL PAGE (Applications, Use Cases, Specs)
// ─────────────────────────────────────────────────
function productDetailPage(slug) {
  const p = products.find(item => item.slug === slug);
  if (!p) return notFoundPage();

  const cat = categories.find(c => c.slug === p.category);
  const isInCart = rfqCart.some(item => item.id === p.id);
  const related = (p.related_slugs || [])
    .map(s => products.find(item => item.slug === s))
    .filter(Boolean);

  const apps = isAr ? (p.applications_ar || []) : (p.applications_en || []);
  const useCases = isAr ? p.use_cases_ar : p.use_cases_en;
  const compNote = isAr ? p.compatibility_note_ar : p.compatibility_note_en;
  const imageSrc = p.image || cat?.image;

  return `
    <main id="main">
      ${breadcrumb([
        { label: copy.products, url: route('/products/') },
        { label: T(cat), url: route(`/products/${cat?.slug}/`) },
        { label: T(p), url: null }
      ])}

      <section class="section" style="padding-top:1.5rem;">
        <div class="container">
          <div class="product-detail">
            <!-- Left: Visual Gallery -->
            <div class="product-detail-gallery">
              <div class="product-main-img">
                ${imageSrc ? `<img src="${assetPath(imageSrc)}" alt="${esc(T(p))}">` : getCategoryIcon(p.category)}
              </div>
              <div class="notice" style="margin-top:1.25rem;">
                <strong>${isAr ? 'ملاحظة التوثيق الفني' : 'Engineering Verification Notice'}</strong>
                <p style="font-size:.82rem;margin:0;">${copy.compatibilityWarning}</p>
              </div>
            </div>

            <!-- Right: Product Information & Discovery -->
            <div class="product-info">
              <div>
                <span class="product-tag" style="margin-bottom:.6rem;">${esc(T(cat))}</span>
                <h1>${esc(T(p))}</h1>
              </div>

              <div class="product-brand-row">
                ${p.brand ? `<span class="brand-badge">${isAr ? 'العلامة' : 'Brand'}: ${esc(p.brand)}</span>` : ''}
                
                <!-- Stock Amount in Red or Restock Days -->
                ${p.in_stock ? `
                  <span class="stock-badge-green">
                    ● ${copy.inStockPrefix}: ${p.stock_qty} ${isAr ? 'قطعة' : 'units'}
                  </span>
                ` : `
                  <span class="stock-badge-red">
                    ✕ ${copy.outOfStock}
                  </span>
                  <div class="restock-notice-box">
                    ⏱ ${copy.restockPrefix} ${p.restock_days || 5} ${copy.days}
                  </div>
                `}
              </div>

              <p style="font-size:1.02rem;color:var(--muted);line-height:1.7;">${esc(T(p, 'description'))}</p>

              <!-- Applications & Use Cases Section -->
              ${apps.length > 0 ? `
                <div>
                  <h3 class="detail-section-title">${copy.applications}</h3>
                  <div class="product-applications">
                    ${apps.map(app => `
                      <div class="application-item">
                        <div class="app-icon">✓</div>
                        <div>
                          <h4>${esc(app.title)}</h4>
                          <p>${esc(app.desc)}</p>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Suitable Systems -->
              ${useCases ? `
                <div>
                  <h3 class="detail-section-title">${copy.suitableSystems}</h3>
                  <div style="background:var(--surface);padding:1rem 1.25rem;border-radius:var(--radius);border:1px solid var(--line-light);">
                    <p style="font-size:.88rem;color:var(--charcoal);margin:0;line-height:1.6;">${esc(useCases)}</p>
                  </div>
                </div>
              ` : ''}

              <!-- Technical Specifications -->
              ${p.specifications && Object.keys(p.specifications).length > 0 ? `
                <div>
                  <h3 class="detail-section-title">${copy.technicalSpecs}</h3>
                  <table class="product-spec-table">
                    <tbody>
                      ${Object.entries(p.specifications).map(([k, v]) => `
                        <tr>
                          <th>${esc(k)}</th>
                          <td><strong>${esc(v)}</strong></td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              ` : ''}

              <!-- Compatibility Guidance -->
              ${compNote ? `
                <div>
                  <h3 class="detail-section-title">${copy.compatibilityNotice}</h3>
                  <p style="font-size:.86rem;color:var(--muted);line-height:1.6;">${esc(compNote)}</p>
                </div>
              ` : ''}

              <!-- Action Bar -->
              <div class="product-actions">
                <button class="btn btn-navy btn-lg btn-add-rfq" data-id="${p.id}">
                  ${isInCart ? copy.addedToRfq : copy.addToRfq}
                </button>
                <a class="btn btn-gold" href="${route('/rfq/')}">
                  ${copy.requestQuote}
                </a>
                <a class="btn btn-outline" href="${site.phoneTel}">
                  ${copy.talkToEngineer}: ${site.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          <!-- Related Products Section -->
          ${related.length > 0 ? `
            <div style="margin-top:5rem;border-top:1px solid var(--line-light);padding-top:3.5rem;">
              <div class="section-head">
                <span class="eyebrow">${isAr ? 'تكامل هندسي' : 'Functional Complement'}</span>
                <h2>${copy.relatedProducts}</h2>
              </div>
              <div class="related-row">
                ${related.map(r => `
                  <a class="related-card" href="${route(`/product/${r.slug}/`)}">
                    <div class="related-card-img">
                      ${r.image ? `<img src="${assetPath(r.image)}" alt="${esc(T(r))}" style="width:100%;height:100%;object-fit:cover;">` : getCategoryIcon(r.category)}
                    </div>
                    <div class="related-card-body">
                      <h4>${esc(T(r))}</h4>
                      <p>${r.brand ? esc(r.brand) : ''}</p>
                    </div>
                  </a>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </section>
    </main>
  `;
}

// ─────────────────────────────────────────────────
// RFQ / BULK QUOTATION PAGE
// ─────────────────────────────────────────────────
function rfqPage() {
  const cartItems = rfqCart.map(item => {
    const prod = products.find(p => p.id === item.id);
    return { ...prod, qty: item.qty || 1 };
  }).filter(Boolean);

  const selectedPkgObj = (delivery.packaging_options || []).find(o => o.id === selectedPackaging);

  return `
    <main id="main">
      ${breadcrumb([{ label: copy.rfq, url: null }])}

      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">B2B Procurement</span>
          <h1>${copy.rfqTitle}</h1>
          <p>${copy.rfqDesc}</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="rfq-layout">
            <!-- Left: Selected Items & Form -->
            <div>
              <div class="rfq-form-panel">
                <h2>${copy.companyDetails}</h2>
                <p>${isAr ? 'يرجى تزويدنا بتفاصيل المشروع والكميات المطلوبة لإعداد تسعيرة رسمية خلال ساعات العمل.' : 'Please provide project specifications, required quantities, and billing details for formal quotation issuance.'}</p>

                <form id="rfq-form">
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">${copy.fullName} *</label>
                      <input class="form-control" type="text" name="name" required placeholder="${isAr ? 'م. محمد أحمد' : 'Eng. Mohammed Ahmed'}">
                    </div>
                    <div class="form-group">
                      <label class="form-label">${copy.companyName} *</label>
                      <input class="form-control" type="text" name="company" required placeholder="${isAr ? 'شركة المقاولات الحديثة' : 'Al-Modern Contracting Co.'}">
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">${copy.phone} *</label>
                      <input class="form-control" type="tel" name="phone" required placeholder="05XXXXXXXX" dir="ltr">
                    </div>
                    <div class="form-group">
                      <label class="form-label">${copy.email} *</label>
                      <input class="form-control" type="email" name="email" required placeholder="procurement@company.com" dir="ltr">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">${copy.projectLocation} *</label>
                    <input class="form-control" type="text" name="location" required placeholder="${isAr ? 'الرياض / جدة / الدمام...' : 'Riyadh / Jeddah / Dammam...'}">
                  </div>

                  <!-- Chosen Packaging Preference attached -->
                  <div class="form-group">
                    <label class="form-label">${isAr ? 'طريقة التغليف المحددة' : 'Packaging Preference'}</label>
                    <div style="display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;background:var(--surface);border-radius:var(--radius-sm);border:1px solid var(--line);">
                      <span style="font-size:1.3rem;">${selectedPkgObj?.icon || '📦'}</span>
                      <strong style="font-size:.88rem;color:var(--navy-deep);">${esc(T(selectedPkgObj))}</strong>
                      <a href="${route('/delivery/')}" style="margin-inline-start:auto;font-size:.78rem;color:var(--navy);text-decoration:underline;">${isAr ? 'تغيير التغليف' : 'Change Packaging'}</a>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">${copy.projectNotes}</label>
                    <textarea class="form-control" name="notes" placeholder="${isAr ? 'حدد أرقام الموديلات الإضافية، متطلبات التوصيل، مواعيد التوريد المطلوبة، أو نسخ جدول الكميات هنا...' : 'Detail part numbers, required delivery timeline, special engineering approvals or paste BOQ items here...'}"></textarea>
                  </div>

                  <div class="form-success" id="rfq-success-msg">
                    ${copy.rfqSuccess}
                  </div>

                  <button class="btn btn-navy btn-lg" type="submit" style="width:100%;margin-top:1rem;">
                    ${copy.submitRfq}
                  </button>
                </form>
              </div>
            </div>

            <!-- Right: RFQ Item List -->
            <div>
              <div class="rfq-cart">
                <h3>${copy.cart} (${cartItems.length})</h3>
                <div id="rfq-items-list">
                  ${cartItems.length === 0 ? `
                    <div class="rfq-empty">
                      <p>${isAr ? 'لم تتم إضافة أي منتجات إلى سلة عرض السعر حتى الآن.' : 'No components added to your quote list yet.'}</p>
                      <a class="btn btn-outline btn-sm" href="${route('/products/')}" style="margin-top:.8rem;">${copy.explore}</a>
                    </div>
                  ` : `
                    ${cartItems.map(item => `
                      <div class="rfq-item" data-id="${item.id}">
                        <div class="rfq-item-name">
                          <strong>${esc(T(item))}</strong>
                          <span style="display:block;font-size:.75rem;color:var(--muted);">${item.brand || ''}</span>
                        </div>
                        <input class="rfq-qty-input" type="number" min="1" value="${item.qty}" data-id="${item.id}" aria-label="Quantity">
                        <button class="rfq-remove" data-id="${item.id}" title="${copy.removeFromRfq}">✕</button>
                      </div>
                    `).join('')}
                    <div style="margin-top:1.25rem;border-top:1px solid var(--line-light);padding-top:1rem;">
                      <a class="btn btn-outline btn-sm" href="${route('/products/')}" style="width:100%;margin-bottom:.5rem;">+ ${isAr ? 'إضافة المزيد من المنتجات' : 'Add More Products'}</a>
                      <p style="font-size:.76rem;color:var(--muted);margin:0;line-height:1.5;">${copy.priceNotice}</p>
                    </div>
                  `}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}

// ─────────────────────────────────────────────────
// GALLERY PAGE (Founder Photo & Shop Opening)
// ─────────────────────────────────────────────────
function galleryPage() {
  return `
    <main id="main">
      ${breadcrumb([{ label: copy.gallery, url: null }])}

      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">${isAr ? 'المعرض والمسيرة' : 'Visual Heritage'}</span>
          <h1>${copy.galleryTitle}</h1>
          <p>${copy.gallerySubtitle}</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="gallery-filters">
            <button class="gallery-filter-btn active" data-filter="all">${copy.allPhotos}</button>
            <button class="gallery-filter-btn" data-filter="company">${copy.companyPhotos}</button>
          </div>

          <div class="gallery-grid" id="gallery-container">
            ${galleryImages.map(img => `
              <div class="gallery-item" data-category="${img.category}" data-src="${assetPath(img.src)}" data-caption="${esc(T(img, 'caption'))}">
                <img src="${assetPath(img.src)}" alt="${esc(T(img, 'alt'))}" loading="lazy">
                <div class="gallery-item-overlay">
                  <span>${esc(T(img, 'caption'))}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Lightbox Modal -->
          <div class="lightbox-overlay hidden" id="lightbox">
            <div class="lightbox-content">
              <button class="lightbox-close" id="lightbox-close" aria-label="Close">✕</button>
              <img id="lightbox-img" src="" alt="">
              <div class="lightbox-caption" id="lightbox-caption"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}

// ─────────────────────────────────────────────────
// FAQ PAGE
// ─────────────────────────────────────────────────
function faqPage() {
  const currentFaq = faqData[lang] || faqData.en;

  return `
    <main id="main">
      ${breadcrumb([{ label: copy.faq, url: null }])}

      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">${isAr ? 'الأسئلة والأجوبة' : 'Help & Knowledge'}</span>
          <h1>${copy.faqTitle}</h1>
          <p>${copy.faqSubtitle}</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="faq-search-wrap">
            <span class="faq-search-icon">🔍</span>
            <input class="faq-search" id="faq-search-input" type="text" placeholder="${isAr ? 'ابحث في الأسئلة الشائعة...' : 'Search questions and answers...'}" aria-label="Search FAQ">
          </div>

          <div class="faq-categories">
            ${currentFaq.map((cat, catIdx) => `
              <div class="faq-category-block" data-category="${esc(cat.category)}">
                <div class="faq-category-title">${esc(cat.category)}</div>
                <div style="display:flex;flex-direction:column;gap:.65rem;">
                  ${cat.items.map((item, itemIdx) => `
                    <div class="faq-item" data-q="${esc(item.q.toLowerCase())}" data-a="${esc(item.a.toLowerCase())}">
                      <button class="faq-question" aria-expanded="false" id="faq-btn-${catIdx}-${itemIdx}">
                        <span>${esc(item.q)}</span>
                        <span class="faq-chevron">▼</span>
                      </button>
                      <div class="faq-answer" id="faq-ans-${catIdx}-${itemIdx}">
                        <p style="margin:0;">${esc(item.a)}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    </main>
  `;
}

// ─────────────────────────────────────────────────
// ABOUT US PAGE (With Founder Photo)
// ─────────────────────────────────────────────────
function aboutPage() {
  return `
    <main id="main">
      ${breadcrumb([{ label: copy.about, url: null }])}

      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">${isAr ? 'الهوية والمؤسسة' : 'Heritage & Mission'}</span>
          <h1>${copy.aboutUsTitle}</h1>
          <p>${copy.aboutUsSubtitle}</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="about-grid">
            <div class="about-img-frame">
              <img src="${assetPath('gallery/founder.jpg')}" alt="${isAr ? 'حسن إبراهيم مؤسس هتالولا' : 'Hassan Ibrahim, Founder'}">
              <div class="about-img-badge">
                <span class="about-img-badge-icon">🏛</span>
                <div>
                  <strong>${isAr ? site.founderAr : site.founder}</strong>
                  <span>${isAr ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'}</span>
                </div>
              </div>
            </div>

            <div class="about-content">
              <div>
                <span class="eyebrow">${isAr ? 'كلمة المؤسس والريادة' : 'Leadership & Vision'}</span>
                <h2>${isAr ? 'التزام بالجودة والشفافية الهندسية' : 'Engineering Excellence & Uncompromising Reliability'}</h2>
              </div>

              <blockquote style="border-inline-start:4px solid var(--gold);padding-inline-start:1.25rem;font-style:italic;color:var(--navy-deep);font-size:1.05rem;line-height:1.7;">
                ${copy.founderQuote}
              </blockquote>

              <p>
                ${isAr ? 
                  'تأسست مؤسسة هشام عبد الملك الطوالة للتجارة (هتالولا) لتكون شريكاً استراتيجياً موثوقاً لقطاعات المقاولات والهندسة الميكانيكية وإدارة المباني في المملكة العربية السعودية. نوفر لعملائنا وصولاً مباشراً إلى معدات التكييف المتطورة، وأنظمة إدارة المباني (BMS)، والصمامات الكهروميكانيكية، وأجهزة الاستشعار فائقة الدقة.' : 
                  'Heshham Abdul Malik Al Tuwalah Trading Est. (Hatalula) was established as a trusted B2B partner for contractors, electro-mechanical engineers, and commercial facility managers across the Kingdom of Saudi Arabia. We provide direct access to verified HVAC systems, Building Management Systems (BMS), hydronic control valves, precision sensors, and essential industrial spare parts.'}
              </p>

              <div class="about-values">
                <div class="about-value-item">
                  <div class="about-value-dot"></div>
                  <p>${isAr ? 'شفافية كاملة في المواصفات والتوافق' : 'Technical Transparency & Genuine Specifications'}</p>
                </div>
                <div class="about-value-item">
                  <div class="about-value-dot"></div>
                  <p>${isAr ? 'دعم مشاريع المقاولات وجداول الكميات' : 'Commercial BOQ Sizing & Project Quotations'}</p>
                </div>
                <div class="about-value-item">
                  <div class="about-value-dot"></div>
                  <p>${isAr ? 'تغطية توريد وتوصيل في كافة المناطق' : 'Kingdom-Wide Distribution & Logistics'}</p>
                </div>
                <div class="about-value-item">
                  <div class="about-value-dot"></div>
                  <p>${isAr ? 'استشارات ومطابقة هندسية متخصصة' : 'Certified Engineering Support & Model Matching'}</p>
                </div>
              </div>

              <div style="margin-top:1rem;">
                <a class="btn btn-navy" href="${route('/contact/')}">${copy.contactUs}</a>
                <a class="btn btn-outline" href="${route('/gallery/')}" style="margin-inline-start:.6rem;">${copy.gallery}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Shop Opening Showcase -->
      <section class="section section-alt">
        <div class="container">
          <div class="about-grid" style="grid-template-columns:1.2fr 1fr;">
            <div>
              <span class="eyebrow">${isAr ? 'التواجد الميداني' : 'Commercial Presence'}</span>
              <h2>${isAr ? 'معارضنا ومستودعات التوزيع' : 'Official Showrooms & Distribution Centers'}</h2>
              <p style="font-size:1rem;color:var(--muted);line-height:1.75;margin-bottom:1.5rem;">
                ${isAr ? 
                  'يأتي افتتاح معارضنا ومراكز التوزيع تأكيداً على التزامنا بتقديم تجربة مباشرة وسريعة لمهندسي الصيانة والمقاولين لمعاينة المكونات والتأكد من مطابقتها قبل التوريد.' : 
                  'Our distribution hubs and commercial showrooms ensure contractors and engineering procurement officers can inspect components and verify technical compatibility with prompt order fulfillment.'}
              </p>
              <a class="btn btn-navy" href="${route('/products/')}">${copy.exploreCatalog}</a>
            </div>
            <div style="border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-md);border:1.5px solid var(--line-light);">
              <img src="${assetPath('gallery/shop-opening.jpg')}" alt="${isAr ? 'افتتاح معرض هتالولا' : 'Hatalula showroom opening'}" style="width:100%;height:100%;object-fit:cover;">
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}

// ─────────────────────────────────────────────────
// CONTACT US PAGE
// ─────────────────────────────────────────────────
function contactPage() {
  return `
    <main id="main">
      ${breadcrumb([{ label: copy.contact, url: null }])}

      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">${isAr ? 'تواصل معنا' : 'Direct Assistance'}</span>
          <h1>${copy.contact}</h1>
          <p>${isAr ? 'فريقنا الهندسي والتجاري جاهز للرد على استفساراتكم وتوفير عروض الأسعار والدعم الفني.' : 'Our sales and engineering team is available to assist with component verification, project pricing, and product availability.'}</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="contact-grid">
            <!-- Left Info -->
            <div class="contact-info">
              <div class="contact-card">
                <div class="contact-card-icon">${icons.phone}</div>
                <div>
                  <h3>${isAr ? 'الهاتف المباشر' : 'Telephone Inquiries'}</h3>
                  <a href="${site.phoneTel}" dir="ltr">${site.phoneDisplay}</a>
                  <span style="font-size:.78rem;color:var(--muted);">${site.contactPerson}</span>
                </div>
              </div>

              <div class="contact-card">
                <div class="contact-card-icon">${icons.mail}</div>
                <div>
                  <h3>${isAr ? 'المراسلات الإلكترونية' : 'Electronic Mail'}</h3>
                  <a href="mailto:${site.email}">${site.email}</a>
                </div>
              </div>

              <div class="contact-card">
                <div class="contact-card-icon">${icons.shield}</div>
                <div>
                  <h3>${isAr ? 'المقر والسجل' : 'Commercial Registration'}</h3>
                  <p style="font-size:.88rem;color:var(--charcoal);margin:0;">${isAr ? site.companyNameAr : site.companyName}</p>
                  <span style="font-size:.78rem;color:var(--muted);">${isAr ? site.locationAr : site.location}</span>
                </div>
              </div>

              <div class="contact-notice">
                <strong>${isAr ? 'خدمات التوصيل والشحن' : 'Logistics & Fulfilment'}</strong>
                <p style="margin:0;font-size:.82rem;">${isAr ? delivery.regions_ar : delivery.regions_en}</p>
              </div>
            </div>

            <!-- Right: Direct Message Form -->
            <div>
              <div class="rfq-form-panel">
                <h2>${isAr ? 'إرسال استفسار فني مباشر' : 'Send an Engineering Enquiry'}</h2>
                <p>${isAr ? 'أدخل اسم الموديل أو رقم القطعة وسنقوم بمراجعة طلبكم والرد خلال أسرع وقت.' : 'Submit component details, model numbers, or attach queries for fast technical response.'}</p>

                <form id="contact-form">
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">${copy.fullName} *</label>
                      <input class="form-control" type="text" name="name" required placeholder="${isAr ? 'الاسم الكامل' : 'Full Name'}">
                    </div>
                    <div class="form-group">
                      <label class="form-label">${copy.phone} *</label>
                      <input class="form-control" type="tel" name="phone" required placeholder="05XXXXXXXX" dir="ltr">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">${copy.email} *</label>
                    <input class="form-control" type="email" name="email" required placeholder="name@email.com" dir="ltr">
                  </div>

                  <div class="form-group">
                    <label class="form-label">${isAr ? 'رسالة الاستفسار أو القطعة المطلوبة' : 'Enquiry Details or Required Part'} *</label>
                    <textarea class="form-control" name="message" required placeholder="${isAr ? 'يرجى كتابة اسم القطعة أو الموديل أو رقم الماركة...' : 'Describe the product, part number, or project requirements...'}"></textarea>
                  </div>

                  <div class="form-success" id="contact-success-msg">
                    ${isAr ? 'تم استلام رسالتكم بنجاح! سيقوم فريقنا بالتواصل معكم قريباً.' : 'Your enquiry has been received! We will respond shortly.'}
                  </div>

                  <button class="btn btn-navy btn-lg" type="submit" style="width:100%;margin-top:1rem;">
                    ${isAr ? 'إرسال الاستفسار الآن' : 'Send Enquiry Now'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}

// ─────────────────────────────────────────────────
// PRIVACY & TERMS PAGE
// ─────────────────────────────────────────────────
function privacyPage() {
  return `
    <main id="main">
      ${breadcrumb([{ label: isAr ? 'إشعار الخصوصية' : 'Privacy Notice', url: null }])}

      <section class="page-hero">
        <div class="container">
          <span class="eyebrow">Legal & Compliance</span>
          <h1>${isAr ? 'إشعار الخصوصية والشروط التجارية' : 'Privacy Notice & Commercial Terms'}</h1>
          <p>${isAr ? 'سياسات التعامل مع البيانات والطلبات التجارية في مؤسسة هتالولا.' : 'Data protection and business terms governing inquiries and procurement at Hatalula.'}</p>
        </div>
      </section>

      <section class="section">
        <div class="container" style="max-width:800px;">
          <div style="background:var(--white);padding:2.5rem;border-radius:var(--radius-lg);border:1.5px solid var(--line-light);line-height:1.8;">
            <h2 style="font-size:1.3rem;color:var(--navy-deep);margin-bottom:.8rem;">${isAr ? 'جمع البيانات والاستفسارات' : 'Information Handling'}</h2>
            <p style="color:var(--muted);font-size:.95rem;margin-bottom:1.5rem;">
              ${isAr ? 
                'نلتزم في مؤسسة هشام عبد الملك الطوالة للتجارة بالحفاظ على سرية معلوماتكم التجارية وبيانات المشاريع. تُستخدم البيانات المقدمة عبر نماذج طلبات الأسعار أو الاتصال حصرياً لإعداد عروض الأسعار والتنسيق الهندسي لطلباتكم.' : 
                'Heshham Abdul Malik Al Tuwalah Trading Est. respects the confidentiality of commercial project information. Details submitted through quotation or enquiry forms are used strictly for technical assessment, price quotation, and direct logistics coordination.'}
            </p>

            <h2 style="font-size:1.3rem;color:var(--navy-deep);margin-bottom:.8rem;">${isAr ? 'المواصفات والتحقق الهندسي' : 'Technical Specifications Disclaimer'}</h2>
            <p style="color:var(--muted);font-size:.95rem;margin-bottom:1.5rem;">
              ${isAr ? 
                'جميع البيانات الفنية وأسماء الماركات المعروضة في الكتالوج هي لغرض التوضيح وتسهيل البحث للمقاولين. يتم تأكيد التوافق النهائي واعتمادات المشاريع ومطابقة الأبعاد بعد دراسة الاستفسار مع الشركات المصنعة.' : 
                'Product specifications and brand listings provided on this platform serve for identification and procurement matching. Final engineering suitability, equipment sizing, and warranty terms are confirmed via formal sales quotes and manufacturer documentation.'}
            </p>
          </div>
        </div>
      </section>
    </main>
  `;
}

// ─────────────────────────────────────────────────
// NOT FOUND (404) PAGE
// ─────────────────────────────────────────────────
function notFoundPage() {
  return `
    <main id="main">
      <section class="section" style="min-height:60vh;display:grid;place-items:center;">
        <div class="container empty-state" style="max-width:540px;">
          <span class="eyebrow" style="font-size:2rem;color:var(--navy);">404</span>
          <h2>${isAr ? 'الصفحة غير موجودة' : 'Page Not Found'}</h2>
          <p>${isAr ? 'عذراً، لم نتمكن من العثور على الصفحة المطلوبة. يرجى التحقق من الرابط أو الانتقال إلى الكتالوج.' : 'The requested page or component could not be found. Please check the URL or browse our hardware catalogue.'}</p>
          <div style="display:flex;gap:.75rem;justify-content:center;">
            <a class="btn btn-navy" href="${route('/')}">${copy.home}</a>
            <a class="btn btn-outline" href="${route('/products/')}">${copy.products}</a>
          </div>
        </div>
      </section>
    </main>
  `;
}

// ─────────────────────────────────────────────────
// ROUTER & VIEW RESOLVER
// ─────────────────────────────────────────────────
function render() {
  document.documentElement.lang = lang;
  document.documentElement.dir = isAr ? 'rtl' : 'ltr';

  const clean = currentPath.replace(/^\/ar/, '') || '/';
  let content = '';

  if (clean === '/') {
    content = homePage();
    document.title = `${isAr ? site.companyNameAr : site.brand} — ${copy.heroHeadline}`;
  } else if (clean === '/bms/' || clean === '/bms') {
    content = bmsPage();
    document.title = `${copy.bms} | ${site.brand}`;
  } else if (clean === '/hvac/' || clean === '/hvac') {
    content = hvacPage();
    document.title = `${copy.hvac} | ${site.brand}`;
  } else if (clean.startsWith('/product/')) {
    const slug = clean.replace(/^\/product\//, '').replace(/\/$/, '');
    content = productDetailPage(slug);
    const prod = products.find(p => p.slug === slug);
    document.title = prod ? `${T(prod)} | ${site.brand}` : `Product | ${site.brand}`;
  } else if (clean.startsWith('/products/')) {
    const catSlug = clean.replace(/^\/products\//, '').replace(/\/$/, '');
    content = productsPage(catSlug || null);
    document.title = `${copy.products} | ${site.brand}`;
  } else if (clean === '/products') {
    content = productsPage(null);
    document.title = `${copy.products} | ${site.brand}`;
  } else if (clean === '/delivery/' || clean === '/delivery') {
    content = deliveryPage();
    document.title = `${copy.delivery} | ${site.brand}`;
  } else if (clean === '/gallery/' || clean === '/gallery') {
    content = galleryPage();
    document.title = `${copy.gallery} | ${site.brand}`;
  } else if (clean === '/faq/' || clean === '/faq') {
    content = faqPage();
    document.title = `${copy.faq} | ${site.brand}`;
  } else if (clean === '/about/' || clean === '/about') {
    content = aboutPage();
    document.title = `${copy.about} | ${site.brand}`;
  } else if (clean === '/contact/' || clean === '/contact') {
    content = contactPage();
    document.title = `${copy.contact} | ${site.brand}`;
  } else if (clean === '/rfq/' || clean === '/rfq') {
    content = rfqPage();
    document.title = `${copy.rfq} | ${site.brand}`;
  } else if (clean === '/privacy/' || clean === '/privacy') {
    content = privacyPage();
    document.title = `${isAr ? 'الخصوصية' : 'Privacy'} | ${site.brand}`;
  } else {
    content = notFoundPage();
    document.title = `404 Not Found | ${site.brand}`;
  }

  const appEl = document.querySelector('#app');
  if (appEl) {
    appEl.innerHTML = headerComponent() + content + footerComponent();
  }

  bindInteractions();
}

// ─────────────────────────────────────────────────
// EVENT BINDINGS & CLIENT INTERACTIONS
// ─────────────────────────────────────────────────
function bindInteractions() {
  // 1. Navbar Hamburger Mega-Menu Toggle (Located next to Contact)
  const navMegaBtn = document.querySelector('#nav-mega-menu-btn');
  const navMegaDropdown = document.querySelector('#nav-mega-dropdown');
  if (navMegaBtn && navMegaDropdown) {
    navMegaBtn.onclick = (e) => {
      e.stopPropagation();
      const isOpen = navMegaDropdown.classList.contains('open');
      navMegaDropdown.classList.toggle('open', !isOpen);
      navMegaBtn.classList.toggle('active', !isOpen);
      navMegaBtn.setAttribute('aria-expanded', !isOpen);
    };
    document.addEventListener('click', (e) => {
      if (!navMegaBtn.contains(e.target) && !navMegaDropdown.contains(e.target)) {
        navMegaDropdown.classList.remove('open');
        navMegaBtn.classList.remove('active');
        navMegaBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.onclick = () => {
      nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
    };
  }

  // Topbar quick toggle
  const topbarBtn = document.querySelector('#topbar-gallery-toggle');
  if (topbarBtn) {
    topbarBtn.onclick = () => {
      navigate(route('/gallery/'));
    };
  }

  // 2. Intercept internal SPA navigation links
  document.querySelectorAll('a').forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (href && (href.startsWith('/') || href.startsWith('./')) && !href.startsWith('//') && !anchor.target) {
      anchor.onclick = (e) => {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        navigate(href);
      };
    }
  });

  // 3. Product Catalogue Filtering
  const searchInput = document.querySelector('#prod-search');
  const catSelect = document.querySelector('#prod-cat');
  const brandSelect = document.querySelector('#prod-brand');
  const resetBtn = document.querySelector('#prod-reset');
  const resultsContainer = document.querySelector('#product-results');

  if (searchInput && resultsContainer) {
    const filterProducts = () => {
      const q = searchInput.value.toLowerCase().trim();
      const catVal = catSelect ? catSelect.value : '';
      const brandVal = brandSelect ? brandSelect.value : '';

      const matched = products.filter(p => {
        const matchesCat = !catVal || p.category === catVal;
        const matchesBrand = !brandVal || p.brand === brandVal;
        const searchPool = `${p.name_en} ${p.name_ar} ${p.description_en} ${p.description_ar} ${p.brand || ''} ${p.keywords_en || ''} ${p.keywords_ar || ''}`.toLowerCase();
        const matchesQuery = !q || searchPool.includes(q);
        return matchesCat && matchesBrand && matchesQuery;
      });

      if (matched.length === 0) {
        resultsContainer.innerHTML = `
          <div class="empty-state" style="grid-column:1/-1;">
            <h3>${copy.emptyMatch}</h3>
            <p>${isAr ? 'جرب البحث بكلمات عامة أو تواصل مع فريقنا للمساعدة الفورية.' : 'Try adjusting your search terms or contact our engineering team directly.'}</p>
            <a class="btn btn-navy" href="${route('/contact/')}">${copy.contactUs}</a>
          </div>
        `;
      } else {
        resultsContainer.innerHTML = matched.map(p => productCard(p)).join('');
        rebindRfqButtons();
      }
    };

    [searchInput, catSelect, brandSelect].filter(Boolean).forEach(el => {
      el.addEventListener('input', filterProducts);
      el.addEventListener('change', filterProducts);
    });

    if (resetBtn) {
      resetBtn.onclick = () => {
        searchInput.value = '';
        if (catSelect) catSelect.value = '';
        if (brandSelect) brandSelect.value = '';
        filterProducts();
      };
    }
  }

  // 4. Packaging Selection Handler on Delivery Page
  document.querySelectorAll('.packaging-card').forEach(card => {
    card.onclick = () => {
      const pkgId = card.getAttribute('data-id');
      selectedPackaging = pkgId;
      try {
        localStorage.setItem('hatalula_delivery_pkg', pkgId);
      } catch (e) {}
      document.querySelectorAll('.packaging-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      render();
    };
  });

  // 5. RFQ Add/Remove Action Handlers
  rebindRfqButtons();

  // 6. RFQ Form Submission Handler
  const rfqForm = document.querySelector('#rfq-form');
  if (rfqForm) {
    rfqForm.onsubmit = (e) => {
      e.preventDefault();
      const successMsg = document.querySelector('#rfq-success-msg');
      if (successMsg) {
        successMsg.style.display = 'block';
        rfqForm.reset();
        rfqCart = [];
        saveRfqCart();
        const listContainer = document.querySelector('#rfq-items-list');
        if (listContainer) {
          listContainer.innerHTML = `<div class="rfq-empty"><p>${copy.rfqSuccess}</p></div>`;
        }
      }
    };
  }

  // 7. Contact Form Submission Handler
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.onsubmit = (e) => {
      e.preventDefault();
      const successMsg = document.querySelector('#contact-success-msg');
      if (successMsg) {
        successMsg.style.display = 'block';
        contactForm.reset();
      }
    };
  }

  // 8. FAQ Accordion & Search
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const ans = item.querySelector('.faq-answer');
    if (btn && ans) {
      btn.onclick = () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !isOpen);
        ans.classList.toggle('open', !isOpen);
      };
    }
  });

  const faqSearch = document.querySelector('#faq-search-input');
  if (faqSearch) {
    faqSearch.oninput = () => {
      const q = faqSearch.value.toLowerCase().trim();
      faqItems.forEach(item => {
        const qText = item.getAttribute('data-q') || '';
        const aText = item.getAttribute('data-a') || '';
        const match = !q || qText.includes(q) || aText.includes(q);
        item.style.display = match ? 'block' : 'none';
      });
    };
  }

  // 9. Gallery Lightbox & Filter
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('#lightbox');
  const lightboxImg = document.querySelector('#lightbox-img');
  const lightboxCaption = document.querySelector('#lightbox-caption');
  const lightboxClose = document.querySelector('#lightbox-close');

  galleryItems.forEach(item => {
    item.onclick = () => {
      if (!lightbox || !lightboxImg) return;
      const src = item.getAttribute('data-src');
      const caption = item.getAttribute('data-caption');
      lightboxImg.src = src;
      lightboxCaption.textContent = caption;
      lightbox.classList.remove('hidden');
    };
  });

  if (lightboxClose && lightbox) {
    lightboxClose.onclick = () => lightbox.classList.add('hidden');
    lightbox.onclick = (e) => {
      if (e.target === lightbox) lightbox.classList.add('hidden');
    };
  }

  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  galleryFilterBtns.forEach(btn => {
    btn.onclick = () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        item.style.display = (filter === 'all' || cat === filter) ? 'block' : 'none';
      });
    };
  });
}

function rebindRfqButtons() {
  document.querySelectorAll('.btn-add-rfq').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute('data-id'), 10);
      const existing = rfqCart.find(i => i.id === id);
      if (existing) {
        rfqCart = rfqCart.filter(i => i.id !== id);
        btn.textContent = copy.addToRfq;
      } else {
        rfqCart.push({ id, qty: 1 });
        btn.textContent = copy.addedToRfq;
      }
      saveRfqCart();
    };
  });

  document.querySelectorAll('.rfq-qty-input').forEach(input => {
    input.onchange = () => {
      const id = parseInt(input.getAttribute('data-id'), 10);
      const val = Math.max(1, parseInt(input.value, 10) || 1);
      const item = rfqCart.find(i => i.id === id);
      if (item) item.qty = val;
      saveRfqCart();
    };
  });

  document.querySelectorAll('.rfq-remove').forEach(btn => {
    btn.onclick = () => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      rfqCart = rfqCart.filter(i => i.id !== id);
      saveRfqCart();
      render();
    };
  });
}

// Window popstate navigation (Back / Forward support)
window.addEventListener('popstate', () => {
  currentPath = window.location.pathname.replace(/\/+/g, '/');
  render();
});

// Initial boot
render();
