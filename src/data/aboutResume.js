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

  // `{years}` is replaced with the live total from getResume().
  summary:
    'Senior full-stack developer with {years} years of experience building backend systems, web apps, and React Native mobile apps for iOS and Android. Promoted within 12 months at Larklabs.ai to lead mobile development and mentor 20 interns, supporting 5 enterprise clients including Walmart, Apple, and Oracle. Built backends for apps serving 50k+ daily users, cut API response times by ~25%, and reduced data latency by 40%; shipped 19+ production client websites, 8 of them on headless CMS (Payload, Strapi). Core stack: Python (Django, Flask, FastAPI), MERN, and React Native.',

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
        'Lead React Native development of 3 production apps for iOS and Android from 1 shared codebase.',
        'Manage and mentor 20 interns through onboarding, guided project work, and code review, collaborating with senior engineers to turn them into productive contributors.',
        'Architect REST APIs and microservices with Python and the MERN stack, improving real-time analytics dashboard performance by 35%.',
        'Build Python backends for AI-powered features, cutting response times by ~25%.',
        'Own CI/CD pipelines and Kafka messaging across 15+ backend services, reducing deployment time by 20%, and maintain 100% React test coverage with Jest and React Testing Library.',
        'Deliver engineering support for 5 enterprise clients (Walmart, Apple, Oracle, Samsung Knox, and TimesPro) at 99.9% uptime.',
      ],
    },
    {
      title: 'Software Developer (Python & MERN Stack)',
      company: 'Pioneersoft',
      location: 'Riyadh, Saudi Arabia',
      start: '2024-08',
      end: '2025-09',
      bullets: [
        'Built Python and Node.js backends, including Freemarker server-side templates for personalized dashboards, for 5 international enterprise apps serving 50k+ daily users.',
        'Connected Python data pipelines to React frontends for real-time reporting, reducing data latency by 40%.',
        'Optimized MongoDB queries and schemas, improving responsiveness by ~30% under high concurrency.',
        'Implemented Kafka messaging across 10+ microservices, increasing system throughput by 25%.',
        'Secured 100% of services with Flask, JWT, and Passport authentication and authorization.',
        'Migrated on-premise servers to AWS and set up automated health monitoring to catch performance bottlenecks early.',
      ],
    },
    {
      title: 'Full-Stack Developer',
      company: 'Kurage',
      location: 'Bangalore, India',
      start: '2021-06',
      end: '2024-07',
      bullets: [
        'Designed and maintained Python (Django / Flask) backends for 3 years at 99.9% availability, and moved them to microservices for ~25% faster site loads.',
        'Built 15+ React Native features for iOS and Android alongside the web product, increasing mobile engagement by 30%.',
        'Automated 5 internal workflows with Python, saving the team 15 hours per week.',
        'Configured NGINX as a reverse proxy and refactored legacy frontend components to TypeScript, improving load times and type safety.',
        'Resolved 3+ critical production tickets daily, backed by unit and integration tests that kept production reliability at 99.9%.',
      ],
    },
  ],

  education: [
    {
      school: 'RKDF College, Bhopal, MP',
      credential: 'B.Tech in Computer Science',
      period: 'Aug 2022 – Jun 2026',
      note: 'CGPA 8.2 / 10',
    },
    {
      school: "St. Karen's Secondary School, Patna, Bihar",
      credential: '12th Grade (Higher Secondary)',
      period: 'Completed 2018',
      note: 'CGPA 8.1 / 10',
    },
  ],

  skills: {
    primary:
      'Python (Django, Flask, FastAPI), MERN stack (MongoDB, Express, React, Node.js), React Native for cross-platform mobile.',
    programming:
      'Python, JavaScript (ES6+), TypeScript, Rust, Next.js, React, React Native, Three.js, Java, C++, SQL, Freemarker, HTML5, CSS3 / SCSS.',
    databases: 'PostgreSQL, MongoDB, MySQL, Redis.',
    tools:
      'Git, NPM, Docker, AWS (EC2, S3, Amplify), NGINX, Jenkins, CI/CD, Expo, Kafka, Agile/Scrum, PyTest, Jest & React Testing Library (100% coverage), Figma, AI-assisted development (Claude).',
    cms:
      'Payload CMS and Strapi — built 8 headless-CMS sites that let non-technical teams update content, images, and media without code changes.',
  },

  projects: [
    {
      title: 'AI-Powered Inventory Management System',
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
    summary: aboutResume.summary.replace('{years}', `${totalYears}+`),
    experience,
    yearsExperience: `${totalYears}+`,
  };
}
