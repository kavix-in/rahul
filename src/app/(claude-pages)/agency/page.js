import Link from 'next/link';
import styles from '../claudeMarketing.module.scss';
import { SITE } from '@/config/site';

export const metadata = {
  title: 'Agency',
  description: `How ${SITE.author} works with clients — process, collaboration, and delivery for web products.`,
  openGraph: {
    title: `Agency · ${SITE.author}`,
    description: `Studio approach, discovery to launch, and how we collaborate on product builds.`,
    url: `${SITE.url}/agency`,
  },
};

export default function AgencyPage() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <p className={styles.overline}>Agency</p>
        <h1 className={styles.title}>A small practice built for product teams</h1>
        <p className={styles.lead}>
          {SITE.author} works as an embedded partner: clear communication, fast iteration, and
          craft-led engineering—without agency bloat. Remote-first, timezone-friendly, and focused
          on outcomes you can ship.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="philosophy-heading">
        <h2 id="philosophy-heading" className={styles.h2}>
          Philosophy
        </h2>
        <p className={styles.body}>
          Great interfaces sit on top of reliable systems. We bias toward maintainable stacks
          (React, Next.js, solid APIs) and leave your team with code that is documented, tested where
          it matters, and easy to extend.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="process-heading">
        <h2 id="process-heading" className={styles.h2}>
          How we work together
        </h2>
        <ol className={styles.steps}>
          <li className={styles.step}>
            <span className={styles.stepNum} aria-hidden>
              1
            </span>
            <div className={styles.stepText}>
              <p className={styles.stepLabel}>Discover &amp; align</p>
              <p className={styles.stepDesc}>
                Goals, users, constraints, and success metrics—so scope matches reality before pixels
                or commits pile up.
              </p>
            </div>
          </li>
          <li className={styles.step}>
            <span className={styles.stepNum} aria-hidden>
              2
            </span>
            <div className={styles.stepText}>
              <p className={styles.stepLabel}>Build in the open</p>
              <p className={styles.stepDesc}>
                Short cycles, visible progress, and room for feedback. You always know what shipped
                and what is next.
              </p>
            </div>
          </li>
          <li className={styles.step}>
            <span className={styles.stepNum} aria-hidden>
              3
            </span>
            <div className={styles.stepText}>
              <p className={styles.stepLabel}>Launch &amp; handoff</p>
              <p className={styles.stepDesc}>
                Performance checks, accessibility passes, and a clean handoff—whether we stay on
                for v2 or your team takes the wheel.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="fit-heading">
        <h2 id="fit-heading" className={styles.h2}>
          Good fit
        </h2>
        <ul className={styles.bullets}>
          <li>Product companies and startups shipping web apps or marketing sites with real UX stakes</li>
          <li>Teams that want a senior IC who can own UI architecture and implementation</li>
          <li>Projects where performance, clarity, and long-term maintainability matter</li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <Link href="/" className={styles.backLink}>
          ← Back to portfolio
        </Link>
      </footer>
    </main>
  );
}
