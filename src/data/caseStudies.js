/**
 * Per-project case studies. Keyed by the project `slug` (see src/data.js).
 * Content is derived from the actual project source (stack from each repo's
 * dependencies, features from the integrations actually used) — no invented
 * metrics. Projects without a case study here simply link to their live site.
 *
 * Shape:
 *   year       — build year (string)
 *   role       — my role on the project
 *   summary    — one-line positioning
 *   context    — 1–2 sentences on what it is / the problem it solves
 *   stack      — real technologies used (array)
 *   highlights — what I built / notable engineering (array)
 */
export const caseStudies = {
  'liza-pavlakos': {
    year: '2024',
    role: 'Full-Stack Developer',
    summary: 'Personal-brand & booking site for an international keynote speaker.',
    context:
      'A polished, high-motion website for a professional keynote speaker to showcase talks, books, media and testimonials, and to convert visitors into speaking enquiries.',
    stack: ['Next.js', 'React', 'SCSS', 'GSAP', 'react-slick', 'react-datepicker', 'react-phone-input-2', 'EmailJS', 'react-pdf'],
    highlights: [
      'Built an availability / enquiry flow with a date picker and international phone input, delivering leads instantly via EmailJS.',
      'Crafted an animated landing experience with GSAP, marquees and carousels for talks, media features and testimonials.',
      'Generated downloadable PDF media kits with react-pdf and handled SEO with a dynamic sitemap.',
    ],
  },

  'small-screen': {
    year: '2025',
    role: 'Frontend Developer',
    summary: 'Rich-media marketing site for a creative agency.',
    context:
      'A marketing website for a video-first agency, designed to show off work with immersive media and drive new-business enquiries.',
    stack: ['Next.js', 'React', 'SCSS', 'GSAP', 'react-hover-video-player', 'react-slick', 'react-social-media-embed', 'Resend', 'Axios'],
    highlights: [
      'Built interactive hero and case-study sections with hover-to-play video and GSAP-driven motion.',
      'Embedded live social feeds and testimonial carousels for social proof.',
      'Wired contact / lead forms to the Resend email API.',
    ],
  },

  coastland: {
    year: '2025',
    role: 'Full-Stack Developer',
    summary: 'CMS-driven marketing site with a full editorial admin.',
    context:
      'A content-managed marketing site where the client’s team edits every page themselves through a headless CMS — no developer needed for copy or media changes.',
    stack: ['Next.js', 'Payload CMS', 'PostgreSQL', 'Radix UI', 'Framer Motion', 'Lenis', 'react-hook-form', 'Vercel Blob', 'Tailwind CSS'],
    highlights: [
      'Modelled fully editable pages in Payload CMS with Lexical rich text, so content updates ship without code.',
      'Managed media through Vercel Blob storage; built validated forms with react-hook-form.',
      'Added smooth-scroll (Lenis), Framer Motion transitions and light/dark theming with next-themes.',
    ],
  },

  ncg: {
    year: '2026',
    role: 'Full-Stack Developer',
    summary: 'Corporate group website backed by a headless CMS.',
    context:
      'A multi-section corporate site for a group of companies, fully editable by the client and integrated with scheduling and lead capture.',
    stack: ['Next.js', 'Payload CMS', 'PostgreSQL (Neon)', 'AWS S3', 'Supabase', 'GSAP', 'Framer Motion', 'Lottie', 'Swiper', 'Calendly', 'Resend'],
    highlights: [
      'Built editable corporate pages in Payload CMS with S3-backed media storage.',
      'Integrated Calendly scheduling and Resend-powered contact forms.',
      'Polished the experience with GSAP, Framer Motion, Lottie and Swiper, and tracked Core Web Vitals.',
    ],
  },

  spadtek: {
    year: '2026',
    role: 'Full-Stack Developer',
    summary: 'Product & corporate site on a headless CMS.',
    context:
      'A corporate/product marketing site with editable content and rich motion, built for a team that manages their own copy and imagery.',
    stack: ['Next.js', 'Payload CMS', 'PostgreSQL (Neon)', 'AWS S3', 'Framer Motion', 'GSAP', 'Lottie', 'Swiper', 'Calendly', 'Resend'],
    highlights: [
      'Delivered a Payload-CMS-backed site with S3 media and structured, reusable content blocks.',
      'Integrated Calendly booking and Resend transactional email.',
      'Layered GSAP / Framer Motion animation and Lottie / Swiper for an engaging feel.',
    ],
  },

  zunevo: {
    year: '2025',
    role: 'Full-Stack Developer',
    summary: 'Multilingual storefront for a handcrafted candles & décor brand.',
    context:
      'A brand storefront for handcrafted candles, décor and gifts, with a self-service admin for catalog and content plus a multilingual, animated shopping experience.',
    stack: ['Next.js', 'Payload CMS', 'PostgreSQL', 'i18next', 'Framer Motion', 'GSAP', 'Lenis', 'Lottie', 'react-slick', '@react-pdf/renderer', 'Resend'],
    highlights: [
      'Managed catalog and content in Payload CMS with an animated, smooth-scroll storefront.',
      'Built a multilingual UI with i18next / react-i18next.',
      'Generated PDFs (receipts / documents) with @react-pdf/renderer and sent transactional email via Resend.',
    ],
  },

  sunnystate: {
    year: '2025',
    role: 'Frontend Developer',
    summary: 'Animation-led marketing site for a creative agency.',
    context:
      'A scroll-driven agency website built around storytelling and motion to make the brand feel premium and memorable.',
    stack: ['Next.js', 'React', 'SCSS', 'GSAP + ScrollTrigger', 'Smooth Scrollbar', 'Lottie', 'react-countup', 'react-hook-form', 'EmailJS'],
    highlights: [
      'Built scroll-driven storytelling with GSAP ScrollTrigger and custom smooth scrolling.',
      'Added animated stat counters and Lottie illustrations for a lively feel.',
      'Delivered validated contact forms via EmailJS.',
    ],
  },

  ekaa: {
    year: '2026',
    role: 'Frontend Developer',
    summary: 'Marketing site with integrated scheduling.',
    context:
      'A smooth, animated marketing site with built-in booking so prospects can move from browsing to scheduling a call in one flow.',
    stack: ['Next.js', 'React', 'SCSS', 'Framer Motion', 'GSAP', 'Lenis', 'Lottie', 'Calendly', 'react-slick', 'EmailJS'],
    highlights: [
      'Built smooth-scroll (Lenis) animated pages with Lottie and carousels.',
      'Integrated Calendly booking and EmailJS enquiry forms.',
      'Handled SEO with next-sitemap.',
    ],
  },

  'join-with-me': {
    year: '2026',
    role: 'Full-Stack Developer',
    summary: 'Booking platform with authentication and a full admin.',
    context:
      'A booking platform with user accounts and a complete content/admin backend, built on the Payload website template and extended with auth and data-fetching.',
    stack: ['Next.js', 'Payload CMS', 'PostgreSQL (Vercel)', 'Google OAuth', 'JWT', 'TanStack Query', 'Radix UI', 'Vercel Blob'],
    highlights: [
      'Configured a full Payload backend with form-builder, search, SEO, redirects and nested-docs plugins plus live preview.',
      'Implemented Google OAuth sign-in and JWT-based auth for the booking flow.',
      'Handled data fetching / caching with TanStack Query and media via Vercel Blob.',
    ],
  },

  'mind-step': {
    year: '2026',
    role: 'Full-Stack Developer',
    summary: 'Leadership brand site with a custom API and headless CMS.',
    context:
      'A leadership-coaching brand site architected as three services — a Next.js frontend, a custom Express API, and a Strapi CMS — for editable content and secure user features.',
    stack: ['Next.js', 'HeroUI', 'Radix UI', 'Express', 'JWT + bcrypt', 'AWS S3 (multer-s3)', 'Strapi CMS', 'PostgreSQL'],
    highlights: [
      'Built the frontend with HeroUI / Radix components and Lottie motion.',
      'Developed a custom Express API with JWT auth, bcrypt password hashing, rate limiting and S3 file uploads.',
      'Managed editorial content in a Strapi CMS backed by PostgreSQL.',
    ],
  },

  'speakers-solutions': {
    year: '2025',
    role: 'Full-Stack Developer',
    summary: 'Speaker-bureau website backed by a headless CMS.',
    context:
      'A website for a professional speakers bureau, presenting a roster of speakers and capturing booking enquiries, with all content editable through Strapi.',
    stack: ['Next.js', 'HeroUI', 'Radix UI', 'react-hook-form', 'Strapi CMS'],
    highlights: [
      'Built the frontend in Next.js with HeroUI / Radix primitives.',
      'Managed speakers, topics and pages in a Strapi headless CMS.',
      'Implemented validated enquiry forms for booking requests.',
    ],
  },

  cybrainer: {
    year: '2026',
    role: 'Full-Stack Developer',
    summary: 'Cybersecurity & IT-skills learning platform (LMS).',
    context:
      'An education platform offering expert-led cybersecurity and IT courses — a full LMS with authenticated learners, video lessons and a referral program.',
    stack: ['Next.js', 'Clerk (auth)', 'Radix UI', 'Framer Motion', 'Lenis', 'Vimeo Player', 'Strapi (GraphQL)', 'PostgreSQL', 'AWS S3', 'Nodemailer'],
    highlights: [
      'Built the course catalog and lesson experience with Vimeo-powered video playback.',
      'Handled authentication and learner accounts with Clerk; country/state/city selectors and validated forms on the frontend.',
      'Backed by a Strapi API (GraphQL, users-permissions, S3 uploads, email) powering courses, reviews and a referral program.',
    ],
  },
};
