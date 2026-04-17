import Link from 'next/link';
import styles from '../claudeMarketing.module.scss';
import { SITE } from '@/config/site';

export const metadata = {
  title: 'Careers',
  description: `Work with ${SITE.author} — freelance, contract, and collaboration opportunities for web projects.`,
  openGraph: {
    title: `Careers · ${SITE.author}`,
    description: `Open to new projects and long-term partnerships. How to get in touch.`,
    url: `${SITE.url}/careers`,
  },
};

export default function CareersPage() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <p className={styles.overline}>Careers</p>
        <h1 className={styles.title}>Let&apos;s build something worth shipping</h1>
        <p className={styles.lead}>
          This is a solo practice, not a big hiring portal—but {SITE.author} is always interested in
          meaningful work: full-site builds, product UI phases, performance rescue, and ongoing
          partnerships with teams who care about craft.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="ways-heading">
        <h2 id="ways-heading" className={styles.h2}>
          Ways we can work
        </h2>
        <div className={styles.cardGrid}>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>Freelance &amp; contract</h3>
            <p className={styles.cardBody}>
              Scoped milestones or time-and-materials engagements. Clear SOWs, weekly demos, and
              direct access—no layers of account management.
            </p>
          </article>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>Embedded with your team</h3>
            <p className={styles.cardBody}>
              Act as a senior front-end IC inside your Slack and repo: PRs, reviews, and shared
              ownership of the UI layer.
            </p>
          </article>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>Advisory &amp; audits</h3>
            <p className={styles.cardBody}>
              Short engagements: architecture review, performance and a11y passes, or a roadmap
              before you staff up internally.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.darkBand} aria-labelledby="apply-heading">
        <h2 id="apply-heading" className={styles.h2}>
          Get in touch
        </h2>
        <p className={styles.body}>
          Send a short note about your product, timeline, and what “done” looks like. You will get a
          human response—usually within a few business days.
        </p>
        <Link href="/#contact" className={styles.ctaLink}>
          Open contact
        </Link>
      </section>

      <footer className={styles.footer}>
        <Link href="/" className={styles.backLink}>
          ← Back to portfolio
        </Link>
      </footer>
    </main>
  );
}
