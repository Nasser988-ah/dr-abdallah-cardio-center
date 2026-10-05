# SEO foundation — Specialized Heart Center

This file is the operating manual for search, language, and entity identity on [https://www.dr-abdallah-cardio-center.com/](https://www.dr-abdallah-cardio-center.com/).

Do not treat sitemap submission or this document as a ranking guarantee. Google decides indexing and ranking.

## Canonical origin

Use **https://www.dr-abdallah-cardio-center.com** as the only public origin.

The live host (Vercel) already sends the apex host `dr-abdallah-cardio-center.com` to `www`. HTML canonicals, Open Graph URLs, JSON-LD `@id` values, and the XML sitemap all use `www` with a trailing slash.

Do not publish a second canonical host. If DNS is later changed to apex-only, update `src/site.config.js` (`origin`) and regenerate.

Trailing slashes are required (`vercel.json` → `"trailingSlash": true`). Example: `/doctor/`, not `/doctor`.

## How pages are built

Content is prerendered into real HTML files. Crawlers do not need JavaScript to see titles, H1s, body copy, internal links, or JSON-LD.

| Piece | Path |
| --- | --- |
| NAP and entity facts | `src/site.config.js` |
| URL registry | `src/routes.js` |
| Titles / descriptions | `src/content/meta.js` |
| Arabic copy | `src/content/ar.js` |
| English copy | `src/content/en.js` |
| HTML templates | `src/templates.js` |
| JSON-LD | `src/schema.js` |
| Generator | `src/generate.js` |
| Vite plugin | `plugins/seo-prerender.js` |

Commands:

```bash
npm run generate
npm run dev
npm run build
```

`vite build` regenerates HTML, `public/sitemap.xml`, and `public/robots.txt` before bundling.

## Route inventory

Arabic is the default language (`hreflang="x-default"` points to Arabic). English lives under `/en/`.

### Core

- `/` ↔ `/en/`
- `/doctor/` ↔ `/en/doctor/`
- `/services/` ↔ `/en/services/`
- `/location/` ↔ `/en/location/`
- `/contact/` ↔ `/en/contact/`
- `/faq/` ↔ `/en/faq/`
- `/privacy/` ↔ `/en/privacy/`
- `/medical-disclaimer/` ↔ `/en/medical-disclaimer/`
- `/sitemap/` ↔ `/en/sitemap/`

### Services (existing slugs kept)

- `/services/cardiovascular-examination/`
- `/services/heart-tests/`
- `/services/pediatric-echocardiography/`
- `/services/stress-test-holter/`
- `/services/athlete-evaluation/`
- `/services/preoperative-evaluation/`

English: prefix `/en` on the same paths.

Echo, ECG, and respiratory assessment stay on `heart-tests`. Stress ECG and Holter stay on `stress-test-holter`. Do not add `/ecg/` or `/holter-monitor/` while these URLs exist.

### Medical guides

- `/medical-guides/`
- `/medical-guides/heart-tests/`
- `/medical-guides/palpitations-and-fast-heartbeat/`
- `/medical-guides/high-blood-pressure-and-heart/`
- `/medical-guides/enlarged-heart/`
- `/medical-guides/coronary-artery-disease/`

`404.html` is **noindex** and is not in the sitemap.

No city doorway pages (Cairo, Obour, Shorouk, Belbeis, Zagazig). There is one physical clinic.

## hreflang rules

Every indexable page includes:

- `hreflang="ar"` → Arabic URL
- `hreflang="en"` → English URL
- `hreflang="x-default"` → Arabic URL

Pairs are reciprocal. Each language has its own canonical, title, description, visible copy, Open Graph text, and `lang` / `dir`.

## NAP source of truth

Edit only `src/site.config.js`, then regenerate.

- **Arabic name:** مركز القلب التخصصي
- **English name:** Specialized Heart Center
- **Site name / alternateName:** CARDIO CARE CENTER (one site name for both languages)
- **Doctor (AR):** د. عبدالله أحمد عبدالله
- **Doctor (EN):** Dr. Abdallah Ahmed Abdallah
- **Role:** استشاري أمراض القلب وقسطرة الشرايين التاجية / Consultant of Cardiology and Coronary Catheterization
- **Address:** 10th of Ramadan City, Al-Ordonia, Al-Kamal Center, next to Techno Scan Radiology, behind Cinco Mall and the Alexandria Library, above Dr. Nadia Pharmacy
- **Phones:** 01099559224 (primary), 01220664555, 055 / 4466667
- **Hours:** 16:00–20:00, Saturday–Thursday (closed Friday)
- **Maps:** https://goo.gl/maps/vZXV1viX5n1Thp3P6
- **Facebook:** https://www.facebook.com/dr.abdallah.elmesalamy

Directory listings (Google Business Profile, Facebook, medical directories) must match this block. Do not add keywords to the legal business name.

## Keyword-to-page map

| Intent | Page |
| --- | --- |
| مركز القلب التخصصي، branded clinic name | `/` |
| Specialized Heart Center, CARDIO CARE CENTER | `/` and `/en/` |
| د. عبدالله أحمد عبدالله، Dr. Abdallah Ahmed Abdallah | `/doctor/` |
| دكتور قلب / استشاري قلب في العاشر من رمضان | `/` and `/doctor/` (home for local commercial, doctor for the person) |
| مركز قلب في العاشر من رمضان | `/` and `/location/` |
| كشف قلب / كشف أمراض القلب | `/services/cardiovascular-examination/` |
| إيكو القلب، رسم القلب، فحوصات القلب | `/services/heart-tests/` |
| إيكو أطفال | `/services/pediatric-echocardiography/` |
| رسم قلب بالمجهود، هولتر القلب | `/services/stress-test-holter/` |
| تقييم القلب للرياضيين | `/services/athlete-evaluation/` |
| تقييم القلب قبل العمليات / الولادة | `/services/preoperative-evaluation/` |
| عنوان، سنتر الكمال، الأردنية | `/location/` |
| حجز، أرقام، واتساب | `/contact/` |
| Informational: heart tests explained | `/medical-guides/heart-tests/` |
| خفقان / palpitations | `/medical-guides/palpitations-and-fast-heartbeat/` |
| ضغط الدم والقلب | `/medical-guides/high-blood-pressure-and-heart/` |
| تضخم القلب | `/medical-guides/enlarged-heart/` |
| مرض الشرايين التاجية | `/medical-guides/coronary-artery-disease/` |

Do not assign every keyword to the homepage.

## Entity map and structured data

Connected `@id` values:

- `https://www.dr-abdallah-cardio-center.com/#website`
- `https://www.dr-abdallah-cardio-center.com/#clinic`
- `https://www.dr-abdallah-cardio-center.com/#doctor`

| Page type | JSON-LD |
| --- | --- |
| Home | WebSite, MedicalClinic/LocalBusiness, Physician, WebPage |
| Doctor | ProfilePage, Physician, MedicalClinic, BreadcrumbList |
| Service | WebPage, Service, MedicalClinic, BreadcrumbList |
| Location / contact | MedicalClinic, WebPage, BreadcrumbList |
| FAQ | FAQPage (visible questions only), BreadcrumbList |
| Guides | Article (editorial Organization author), MedicalClinic, WebPage, BreadcrumbList |

No Review, AggregateRating, or invented credentials.

## Internal linking

Real `<a href>` links only for SEO navigation.

- Home → doctor, services, location, contact, guides
- Doctor → all six services, contact
- Each service → related services, doctor, location, contact
- Guides → relevant services, doctor, contact, disclaimer
- Location → contact and Maps
- Footer: doctor, services, location, guides, contact, FAQ, privacy, disclaimer, sitemap, phones, Maps, Facebook
- Language switcher on every page

## robots.txt and sitemap

- Robots: `https://www.dr-abdallah-cardio-center.com/robots.txt`
- XML sitemap: `https://www.dr-abdallah-cardio-center.com/sitemap.xml`
- HTML sitemap: `/sitemap/` and `/en/sitemap/`

`robots.txt` allows public crawl and points to the XML sitemap. It does not block CSS, JS, images, or fonts.

The XML sitemap lists only indexable canonical HTTPS URLs. `lastmod` is omitted on purpose.

## Redirects

Handled by Vercel HTTPS plus `trailingSlash: true`. Apex → www is already configured at the host. After deploy, confirm there is no www/apex or slash redirect chain.

## Content and medical review rules

- Do not invent degrees, hospitals, awards, prices, extra doctors, extra branches, extra phones, Instagram, YouTube, or email.
- Do not claim “أفضل دكتور”, “رقم 1”, or similar.
- Do not claim “medically reviewed by Dr. Abdallah” unless he reviewed that exact page.
- Guide author is the **Specialized Heart Center editorial team** / فريق محتوى مركز القلب التخصصي.
- Guides are education, not diagnosis. Emergency advice points to ambulance **123** in Egypt.
- The image `public/images/doctor-poster.jpg` is a **promotional poster**, not a clinical headshot. Alt text says so.

## Pages that need doctor approval before you treat them as clinically signed-off

All six service pages and all five medical guides. Until he reviews a specific URL, keep the editorial attribution.

## Unresolved business facts (do not publish as fact)

- Instagram / YouTube / extra `sameAs` profiles
- Email address
- Extra mobile number seen on third-party directories (`01009552018`)
- Hours listed elsewhere as 4–9 PM (site source of truth is 4–8 PM)
- Geo coordinates
- Additional qualifications or hospital affiliations
- Authentic clinic interior/exterior photos and a true portrait
- GA4 / Search Console measurement IDs

Correct third-party listings if they disagree with this NAP (especially hours and extra phone), after the clinic confirms.

## Google Business Profile (manual, off-site)

- Verify ownership if not already verified
- Name: مركز القلب التخصصي (do not keyword-stuff)
- Primary category: the most specific cardiology/clinic category available
- Address, phones, hours, and website matching this file
- Website URL: `https://www.dr-abdallah-cardio-center.com/`
- Real photos; genuine review responses only
- Services matching the six service pages

## Search Console launch checklist

1. Add a **Domain** property for `dr-abdallah-cardio-center.com` (covers www and apex).
2. Confirm the live canonical is `https://www.dr-abdallah-cardio-center.com/`.
3. Submit `https://www.dr-abdallah-cardio-center.com/sitemap.xml`.
4. URL Inspection for the URLs listed below.
5. Watch Page Indexing, Enhancements (structured data), Core Web Vitals, and hreflang/canonical issues.
6. Request indexing on important URLs after they return 200 with the new HTML. Sitemap submission is not an indexing guarantee.

### URLs to inspect manually

Arabic:

- `https://www.dr-abdallah-cardio-center.com/`
- `https://www.dr-abdallah-cardio-center.com/doctor/`
- `https://www.dr-abdallah-cardio-center.com/services/`
- `https://www.dr-abdallah-cardio-center.com/services/cardiovascular-examination/`
- `https://www.dr-abdallah-cardio-center.com/services/heart-tests/`
- `https://www.dr-abdallah-cardio-center.com/services/pediatric-echocardiography/`
- `https://www.dr-abdallah-cardio-center.com/services/stress-test-holter/`
- `https://www.dr-abdallah-cardio-center.com/location/`
- `https://www.dr-abdallah-cardio-center.com/contact/`
- `https://www.dr-abdallah-cardio-center.com/medical-guides/`
- `https://www.dr-abdallah-cardio-center.com/robots.txt`
- `https://www.dr-abdallah-cardio-center.com/sitemap.xml`

English:

- `https://www.dr-abdallah-cardio-center.com/en/`
- `https://www.dr-abdallah-cardio-center.com/en/doctor/`
- `https://www.dr-abdallah-cardio-center.com/en/services/`
- `https://www.dr-abdallah-cardio-center.com/en/location/`
- `https://www.dr-abdallah-cardio-center.com/en/contact/`
