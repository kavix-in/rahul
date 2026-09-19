/**
 * Self-contained résumé chatbot — no API, no network, no keys.
 * Answers are generated locally from the same résumé data the site renders,
 * using lightweight keyword/intent matching. Everything runs in the browser.
 */

const norm = (s) =>
  (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Count keyword hits in the normalized question.
 * Multi-word keywords match as substrings; single words match on token
 * boundaries so short keys like "hi" / "ai" don't match inside "his" / "email".
 */
function score(q, keywords) {
  const tokens = new Set(q.split(' '));
  let n = 0;
  for (const k of keywords) {
    if (k.includes(' ')) {
      if (q.includes(k)) n += 1;
    } else if (tokens.has(k)) {
      n += 1;
    }
  }
  return n;
}

export function createResumeBot({ resume, projects, caseStudies }) {
  const R = resume;
  const current = R.experience.find((j) => j.ongoing) || R.experience[0];
  const companies = R.experience.map((j) => j.company);
  const clientNames = (R.enterpriseClients || []).map((c) => c.name);

  // Technologies Rahul works with, each with question aliases + an answer.
  const TECH = [
    {
      keys: ['react native', 'react-native', 'mobile', 'ios', 'android', 'cross platform', 'cross-platform', 'expo'],
      answer: () =>
        `Yes — React Native is a core strength. He currently leads cross-platform mobile development with React Native at ${current.company}, shipping production apps for both iOS and Android.`,
    },
    {
      keys: ['python', 'django', 'flask', 'fastapi'],
      answer: () =>
        `Yes. Rahul works with Python (Django, Flask, FastAPI) for backend systems and AI-driven features — it's one of his primary stacks.`,
    },
    {
      keys: ['mern', 'node', 'nodejs', 'node.js', 'express', 'mongo', 'mongodb'],
      answer: () =>
        `Yes — the MERN stack (MongoDB, Express, React, Node.js) is a primary stack. He builds scalable REST APIs and full-stack web apps with it.`,
    },
    {
      keys: ['react', 'next', 'nextjs', 'next.js', 'frontend', 'front end', 'front-end'],
      answer: () =>
        `Yes. Rahul builds modern frontends with React and Next.js (this portfolio is built with Next.js).`,
    },
    {
      keys: ['payload', 'cms', 'headless', 'content management', 'editable'],
      answer: () => {
        const cmsProjects = projects.filter(
          (p) => caseStudies[p.slug] && caseStudies[p.slug].stack.some((t) => /payload/i.test(t))
        );
        const names = cmsProjects.slice(0, 4).map((p) => p.title).join(', ');
        return `Yes — he builds fully editable, headless-CMS-backed sites with Payload CMS so non-technical users can update content, images and media. Examples: ${names}.`;
      },
    },
    {
      keys: ['three', 'three.js', 'threejs', '3d'],
      answer: () => `Yes, Rahul has experience with Three.js for 3D/interactive web work.`,
    },
    {
      keys: ['test', 'testing', 'jest', 'coverage', 'react testing library', 'unit test'],
      answer: () =>
        `Yes — he writes tests with Jest and React Testing Library, achieving 100% React test coverage.`,
    },
    {
      keys: ['database', 'databases', 'postgres', 'postgresql', 'mysql', 'redis', 'sql'],
      answer: () => `Databases: ${R.skills.databases}`,
    },
    {
      keys: ['docker', 'ci/cd', 'cicd', 'jenkins', 'kafka', 'devops', 'deploy', 'deployment', 'pipeline'],
      answer: () =>
        `On the DevOps side he works with Docker, CI/CD, Jenkins, and Kafka (event-driven services), and owns deployment pipelines.`,
    },
    {
      keys: ['figma', 'google flow', 'design'],
      answer: () => `He has basic experience with Figma and Google Flow for design work.`,
    },
    {
      keys: ['ai', 'claude', 'prompt', 'prompting', 'llm', 'chatbot'],
      answer: () =>
        `Yes — Rahul is skilled at Claude / AI prompting and integrating AI-driven features into products.`,
    },
    {
      keys: ['java', 'c++', 'cpp'],
      answer: () => `His programming languages include ${R.skills.programming}`,
    },
  ];

  // Intents, checked by keyword score. Higher score wins.
  const intents = [
    {
      keys: ['hi', 'hello', 'hey', 'yo', 'greetings'],
      short: true,
      answer: () =>
        `Hi! I can tell you about ${R.name}'s experience, skills, projects, and how to get in touch. What would you like to know?`,
    },
    {
      keys: ['current role', 'current job', 'right now', 'currently', 'present role', 'what does he do', 'title', 'position', 'where does he work', 'work now'],
      answer: () =>
        `${R.name} is currently ${current.title} at ${current.company} (${current.period}). He leads React Native (iOS & Android) development and manages the internship program, having grown from a MERN / full-stack developer role.`,
    },
    {
      keys: ['experience', 'years', 'how long', 'seniority', 'career', 'background'],
      answer: () =>
        `${R.name} has ${R.yearsExperience} years of experience across ${companies.length} companies: ${companies.join(', ')}. ${R.summary}`,
    },
    {
      keys: ['skill', 'skills', 'tech', 'technologies', 'stack', 'expertise', 'good at', 'know'],
      answer: () =>
        `His core skills: ${R.skills.primary}\n\n• Programming: ${R.skills.programming}\n• Databases: ${R.skills.databases}\n• Tools & DevOps: ${R.skills.tools}\n• CMS: ${R.skills.cms}`,
    },
    {
      keys: ['project', 'projects', 'work', 'portfolio', 'built', 'websites', 'apps', 'case study', 'case studies'],
      answer: () => {
        const featured = projects.slice(0, 6).map((p) => `• ${p.title}`).join('\n');
        return `${R.name} has shipped ${projects.length}+ projects. A few highlights:\n${featured}\n\nBrowse them all in the "Selected Work" section — projects with a case study open a detailed write-up.`;
      },
    },
    {
      keys: ['client', 'clients', 'walmart', 'apple', 'oracle', 'samsung', 'knox', 'timespro', 'enterprise', 'companies worked'],
      answer: () =>
        `He has provided engineering work support for enterprise clients including ${clientNames.join(', ')}.`,
    },
    {
      keys: ['education', 'degree', 'college', 'university', 'study', 'studied', 'graduate', 'b.tech', 'btech', 'academic'],
      answer: () =>
        R.education
          .map((e) => `${e.credential} — ${e.school} (${e.period}${e.note ? `, ${e.note}` : ''})`)
          .join('\n'),
    },
    {
      keys: ['contact', 'email', 'phone', 'reach', 'hire', 'get in touch', 'call', 'connect', 'available', 'availability'],
      answer: () =>
        `You can reach ${R.name} at ${R.email}${R.phone ? ` or ${R.phone}` : ''}. ${R.available ? "He's open to new opportunities" : "He's currently engaged, but happy to talk"} — see the Contact section, or use the "Résumé" button to download his CV.`,
    },
    {
      keys: ['location', 'based', 'where is he', 'where does he live', 'city', 'country', 'relocate', 'remote'],
      answer: () => `${R.name} is based in ${R.location}.`,
    },
    {
      keys: ['resume', 'cv', 'download', 'pdf'],
      answer: () =>
        `You can download ${R.name}'s résumé as a PDF using the "Résumé" button on the site — it's generated live from this same information, so it's always up to date.`,
    },
    {
      keys: ['internship', 'intern', 'manager', 'mentor', 'mentoring', 'lead', 'leadership', 'team'],
      answer: () =>
        `As Internship Manager at ${current.company}, ${R.name} onboards, guides, and reviews the work of intern developers alongside leading mobile development.`,
    },
  ];

  function answer(question) {
    const q = norm(question);
    if (!q) return `Ask me about ${R.name}'s experience, skills, projects, or contact details.`;

    // 1) Specific project lookup by title/slug.
    for (const p of projects) {
      const title = norm(p.title);
      if (title.length > 2 && q.includes(title)) {
        const cs = caseStudies[p.slug];
        if (cs) {
          return `${p.title} — ${cs.summary}\nRole: ${cs.role} (${cs.year}). Stack: ${cs.stack.join(', ')}.\nHighlights:\n${cs.highlights.map((h) => `• ${h}`).join('\n')}`;
        }
        return `${p.title} is one of Rahul's shipped projects — you can visit it at ${p.link}.`;
      }
    }

    // 2) "Does he know X" tech questions.
    let bestTech = null;
    let bestTechScore = 0;
    for (const t of TECH) {
      const s = score(q, t.keys);
      if (s > bestTechScore) {
        bestTechScore = s;
        bestTech = t;
      }
    }

    // 3) General intents.
    let bestIntent = null;
    let bestIntentScore = 0;
    for (const it of intents) {
      const s = score(q, it.keys);
      if (s > bestIntentScore) {
        bestIntentScore = s;
        bestIntent = it;
      }
    }

    // Prefer whichever matched more strongly; tech wins ties (more specific).
    if (bestTechScore > 0 && bestTechScore >= bestIntentScore) return bestTech.answer();
    if (bestIntentScore > 0) return bestIntent.answer();

    // 4) Fallback.
    return `I'm not sure about that one — I can only answer from ${R.name}'s résumé. Try asking about his experience, skills, a specific technology (e.g. React Native, Python, Payload CMS), his projects, or how to contact him. For anything else, email ${R.email}.`;
  }

  return { answer };
}
