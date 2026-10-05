export const site = {
  origin: 'https://www.dr-abdallah-cardio-center.com',
  trailingSlash: true,
  name: {
    ar: 'مركز القلب التخصصي',
    en: 'Specialized Heart Center'
  },
  alternateName: 'CARDIO CARE CENTER',
  brandShort: 'CARDIO CARE',
  doctor: {
    name: {
      ar: 'د. عبدالله أحمد عبدالله',
      en: 'Dr. Abdallah Ahmed Abdallah'
    },
    role: {
      ar: 'استشاري أمراض القلب وقسطرة الشرايين التاجية',
      en: 'Consultant of Cardiology and Coronary Catheterization'
    }
  },
  specialty: {
    ar: 'أمراض القلب وقسطرة الشرايين التاجية',
    en: 'Cardiology and coronary catheterization'
  },
  address: {
    ar: {
      locality: 'العاشر من رمضان',
      region: 'الشرقية',
      country: 'مصر',
      countryCode: 'EG',
      lines: [
        'العاشر من رمضان',
        'الأردنية',
        'سنتر الكمال',
        'بجوار تكنو سكان للأشعة',
        'خلف مول سينكو ومكتبة الإسكندرية',
        'أعلى صيدلية د/ نادية'
      ],
      street: 'سنتر الكمال، الأردنية، بجوار تكنو سكان للأشعة'
    },
    en: {
      locality: '10th of Ramadan City',
      region: 'Al-Sharqia',
      country: 'Egypt',
      countryCode: 'EG',
      lines: [
        '10th of Ramadan City',
        'Al-Ordonia (Al-Urduniyah)',
        'Al-Kamal Center',
        'Next to Techno Scan Radiology',
        'Behind Cinco Mall and the Alexandria Library',
        'Above Dr. Nadia Pharmacy'
      ],
      street: 'Al-Kamal Center, Al-Ordonia, next to Techno Scan Radiology'
    }
  },
  phones: [
    { display: '01099559224', tel: '+201099559224', label: { ar: 'الحجز الأساسي', en: 'Primary booking' } },
    { display: '01220664555', tel: '+201220664555', label: { ar: 'موبايل', en: 'Mobile' } },
    { display: '055 / 4466667', tel: '+20554466667', label: { ar: 'خط أرضي', en: 'Landline' } }
  ],
  hours: {
    opens: '16:00',
    closes: '20:00',
    display: {
      ar: { start: '04:00', end: '08:00', period: 'مساءً', note: 'يومياً ما عدا الجمعة' },
      en: { start: '4:00', end: '8:00', period: 'PM', note: 'Daily except Friday' }
    },
    days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
  },
  mapsUrl: 'https://goo.gl/maps/vZXV1viX5n1Thp3P6',
  facebookUrl: 'https://www.facebook.com/dr.abdallah.elmesalamy',
  images: {
    logo: '/images/logo.jpg',
    doctorPoster: '/images/doctor-poster.jpg',
    og: '/images/og-image.jpg'
  },
  logoSize: { width: 104, height: 104 },
  posterSize: { width: 819, height: 1024 },
  ogSize: { width: 819, height: 1024 },
  whatsapp: {
    number: '201099559224',
    text: {
      ar: 'مرحباً، أود حجز موعد في مركز القلب التخصصي',
      en: 'Hello, I would like to book an appointment at the Specialized Heart Center'
    }
  },
  sameAs: ['https://www.facebook.com/dr.abdallah.elmesalamy'],
  year: 2026,
  defaultLang: 'ar',
  locales: {
    ar: 'ar_EG',
    en: 'en_US'
  },
  htmlLang: {
    ar: 'ar',
    en: 'en'
  },
  todos: {
    instagram: null,
    youtube: null,
    email: null,
    extraPhone: null,
    geo: null,
    qualifications: null,
    clinicPhotos: null,
    doctorPortrait: null,
    medicalReview: null,
    analytics: null
  }
}

export function absoluteUrl(pathname = '/') {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${site.origin}${path}`
}

export function whatsappUrl(lang = 'ar') {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.text[lang])}`
}

export const clinicId = `${site.origin}/#clinic`
export const doctorId = `${site.origin}/#doctor`
export const websiteId = `${site.origin}/#website`
