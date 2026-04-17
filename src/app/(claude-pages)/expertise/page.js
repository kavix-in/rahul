import Link from 'next/link';
import styles from '../claudeMarketing.module.scss';
import { SITE } from '@/config/site';

export const metadata = {
  title: 'Expertise',
  description: `${SITE.author} — front-end, full-stack, and interactive web capabilities: Next.js, React, APIs, WebGL, and performance.`,
  openGraph: {
    title: `Expertise · ${SITE.author}`,
    description: `Capabilities across modern web stacks, immersive UI, and scalable delivery.`,
    url: `${SITE.url}/expertise`,
  },
};

const CAPABILITIES = [
  {
    title: 'Front-end & UI engineering',
    body: 'Component systems, design-to-code fidelity, accessibility, and responsive layouts—React and Next.js first.',
  },
  {
    title: 'Full-stack & APIs',
    body: 'REST and GraphQL integrations, server components, auth flows, and pragmatic backend work in Node and Python ecosystems.',
  },
  {
    title: 'Performance & quality',
    body: 'Core Web Vitals, lazy loading, image and font strategy, and profiling so pages feel fast in production.',
  },
  {
    title: 'Interactive & immersive',
    body: 'WebGL, Three.js, and motion when the story needs it—balanced against bundle size and device support.',
  },
  {
    title: 'Systems & maintainability',
    body: 'Linting, testing hooks, CI-friendly structure, and documentation so teams can evolve the product safely.',
  },
  {
    title: 'Collaboration',
    body: 'Clear specs, async updates, and shared tools (Figma, Git, your stack)—built for distributed teams.',
  },
];

export default function ExpertisePage() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <p className={styles.overline}>Expertise</p>
        <h1 className={styles.title}>Depth across the modern web stack</h1>
        <p className={styles.lead}>
          From marketing sites to complex apps, {SITE.author} brings full-stack fluency with a
          front-end specialty: shipping interfaces that are fast, accessible, and pleasant to
          maintain.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="capabilities-heading">
        <h2 id="capabilities-heading" className={styles.h2}>
          Capabilities
        </h2>
        <div className={styles.cardGrid}>
          {CAPABILITIES.map((item) => (
            <article key={item.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="stack-heading">
        <h2 id="stack-heading" className={styles.h2}>
          Stacks &amp; tools
        </h2>
        <p className={styles.body}>
          Day-to-day: JavaScript and TypeScript, React, Next.js, CSS (including modular and
          component-scoped styles), Node.js, and data layers from Postgres to headless CMS. Open to
          your existing conventions—consistency beats novelty.
        </p>
      </section>

      <footer className={styles.footer}>
        <Link href="/" className={styles.backLink}>
          ← Back to portfolio
        </Link>
      </footer>
    </main>
  );
}
