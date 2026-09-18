/**
 * Resume content — Python backend + MERN full stack + mobile (React Native).
 *
 * Experience durations are computed live from `start` / `end` dates:
 *  - `end: null`  → ongoing ("Present"); the duration auto-increases over time.
 *  - `end: 'YYYY-MM'` → locked to that month once you set it.
 * Total years of experience is derived from the earliest start date to today.
 * Call `getResume()` at render time so the numbers stay current (see page.js
 * `revalidate`, which regenerates the static page periodically in production).
 */

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** 'YYYY-MM' → 'Mon YYYY' */
function formatMonth(ym) {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** Whole months elapsed from a 'YYYY-MM' start up to (and including) an end date. */
function monthsBetween(startYM, endDate) {
  const [sy, sm] = startYM.split('-').map(Number);
  const months =
    (endDate.getFullYear() - sy) * 12 + (endDate.getMonth() + 1 - sm) + 1;
  return Math.max(months, 1);
}

/** e.g. 14 → "1 yr 2 mos", 5 → "5 mos", 24 → "2 yrs" */
function durationLabel(totalMonths) {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ') || '1 mo';
}

export const aboutResume = {
  name: 'Rahul Raj',
  role: 'Sr. Full-Stack Developer & Internship Manager',
  tagline: 'React Native (iOS & Android) · MERN · Python',
  available: true,
  location: 'Bangalore, India',
  phone: '8271308890',
  phoneE164: '+918271308890',
  email: 'raj3090500@gmail.com',
  resumePdf: '/resume',
  photo: '/images/rahul.jpeg',

  summary:
    'Sr. full-stack developer and internship manager with 4+ years of experience building scalable backend systems, web applications, and cross-platform mobile apps. Currently leading React Native (iOS & Android) development and mentoring interns, having grown from a MERN / full-stack developer role. Strong in the MERN stack, React Native, and Python (Django, Flask, FastAPI) — focused on performance, reliability, and clean architecture.',

  focusAreas: [
    { label: 'Python', detail: 'Django · Flask · FastAPI' },
    { label: 'MERN', detail: 'MongoDB · Express · React · Node.js' },
    { label: 'Mobile', detail: 'React Native · iOS & Android' },
  ],

  // Enterprise clients supported through engineering work support.
  // `url` = official site (chip links here); `domain` = source for the logo icon.
  enterpriseClients: [
    { name: 'Walmart', url: 'https://www.walmart.com', domain: 'walmart.com' },
    { name: 'Apple', url: 'https://www.apple.com', domain: 'apple.com' },
    { name: 'Oracle', url: 'https://www.oracle.com', domain: 'oracle.com' },
    { name: 'Samsung Knox', url: 'https://www.samsungknox.com', domain: 'samsung.com' },
    { name: 'TimesPro', url: 'https://timespro.com', domain: 'timespro.com' },
  ],

  // start / end use 'YYYY-MM'. end: null means "Present" (auto-increasing).
  experience: [
    {
      title: 'Sr. Full-Stack Developer & Internship Manager',
      company: 'Larklabs.ai',
      location: 'Hybrid',
      start: '2025-10',
      end: null,
      bullets: [
        'Leading cross-platform mobile development with React Native, shipping production apps for both iOS and Android.',
        'Managing and mentoring the internship program — onboarding, guiding, and reviewing the work of intern developers.',
        'Architecting scalable REST APIs and microservices with Python and the MERN stack for real-time analytics dashboards.',
        'Spearheading Python-based backends for AI-driven features, improving response times by ~25%.',
        'Owning CI/CD pipelines and Kafka-based event-driven communication across core backend services.',
        'Providing engineering work support for enterprise clients including Walmart, Apple, Oracle, and Samsung Knox.',
        'Achieving 100% React test coverage using Jest and React Testing Library.',
        'Progressed here from a MERN / full-stack developer role into senior mobile development and internship management.',
      ],
    },
    {
      title: 'Software Developer (Python & MERN Stack)',
      company: 'Pioneersoft',
      location: 'Riyadh, Saudi Arabia',
      start: '2024-08',
      end: '2025-09',
      bullets: [
        'Engineered backend logic with Python and Node.js for international enterprise applications.',
        'Integrated Python data pipelines with React frontends for dynamic real-time reporting.',
        'Optimized MongoDB queries and schemas (~30% responsiveness gain under high concurrency).',
        'Implemented event-driven patterns with Kafka between microservices.',
        'Secured services with Flask, JWT, and Passport for authentication and authorization.',
      ],
    },
    {
      title: 'Full-Stack Developer',
      company: 'Kurage',
      location: 'Bangalore, India',
      start: '2021-06',
      end: '2024-07',
      bullets: [
        'Designed and maintained complex backends with Python (Django / Flask) over three years.',
        'Built cross-platform mobile features with React Native alongside the web product.',
        'Delivered a high-performance microservices architecture (~25% faster site loads).',
        'Automated internal workflows with Python, reducing operational overhead.',
        'Maintained unit and integration tests targeting 99.9% production reliability.',
        'Resolved 3+ critical production tickets daily with focus on backend stability.',
      ],
    },
  ],

  education: [
    {
      school: 'RKDF College, Bhopal, MP',
      credential: 'B.Tech in Computer Science',
      period: 'Aug 2022 – June 2026',
      note: 'GPA 8.2',
    },
    {
      school: "St. Karen's Secondary School, Patna, Bihar",
      credential: '12th Grade (Higher Secondary)',
      period: 'Completed 2018',
      note: 'CGPA 8.1',
    },
  ],

  skills: {
    primary:
      'Python (Django, Flask, FastAPI), MERN stack (MongoDB, Express, React, Node.js), React Native for cross-platform mobile.',
    programming:
      'Python, JavaScript (ES6+), Next.js, React, React Native, Three.js, Java, C++, SQL, HTML5, CSS3 / SCSS.',
    databases: 'PostgreSQL, MongoDB, MySQL, Redis.',
    tools:
      'Git, Docker, Jenkins, CI/CD, Expo, Kafka, Agile/Scrum, PyTest, Jest & React Testing Library (100% coverage), Claude / AI prompting, Presentation slides, Figma & Google Flow (basics).',
    cms:
      'Payload CMS — building fully editable, headless-CMS-backed sites so non-technical users can update content, images, and media without touching code.',
  },

  projects: [
    {
      title: 'AI-Driven Inventory Management System',
      stack: 'Python & React',
      period: 'Aug 2025 – Dec 2025',
      bullets: [
        'Built a predictive inventory engine with Python and ML to automate stock prioritization.',
        'Delivered a full-stack dashboard with React and Python APIs for supply-chain analytics.',
        'Implemented NoSQL structures for dynamic stock levels and automated reporting.',
      ],
    },
  ],
};

/**
 * Returns the resume with live-computed experience durations and total years.
 * Call this at render time (not module load) so values reflect the current date.
 */
export function getResume(now = new Date()) {
  const experience = aboutResume.experience.map((job) => {
    const ongoing = !job.end;
    const endDate = ongoing
      ? now
      : new Date(Number(job.end.split('-')[0]), Number(job.end.split('-')[1]) - 1, 1);
    const months = monthsBetween(job.start, endDate);
    return {
      ...job,
      period: `${formatMonth(job.start)} – ${ongoing ? 'Present' : formatMonth(job.end)}`,
      duration: durationLabel(months),
      ongoing,
    };
  });

  // Total experience = span from the earliest start date to today.
  const earliestStart = aboutResume.experience
    .map((j) => j.start)
    .sort()[0];
  const totalYears = Math.floor(monthsBetween(earliestStart, now) / 12);

  return {
    ...aboutResume,
    experience,
    yearsExperience: `${totalYears}+`,
  };
}
