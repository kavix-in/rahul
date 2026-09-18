import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/data/caseStudies';
import { projects } from '@/data';
import { aboutResume as R } from '@/data/aboutResume';
import styles from './page.module.scss';

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const cs = caseStudies[params.slug];
  const project = projects.find((p) => p.slug === params.slug);
  if (!cs || !project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: cs.summary,
  };
}

export default function CaseStudyPage({ params }) {
  const cs = caseStudies[params.slug];
  const project = projects.find((p) => p.slug === params.slug);
  if (!cs || !project) notFound();

  const host = project.link.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <main className={styles.main}>
      <div className={styles.wrap}>
        <Link href="/#work" className={styles.back}>
          ← Back to work
        </Link>

        <header className={styles.header}>
          <p className={styles.eyebrow}>
            Case Study · {cs.year} · {cs.role}
          </p>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.summary}>{cs.summary}</p>
          <a
            className={styles.visit}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit live site ↗ <span className={styles.host}>{host}</span>
          </a>
        </header>

        <div className={styles.shot}>
          <Image
            src={project.src}
            alt={`${project.title} — screenshot`}
            fill
            sizes="(max-width: 900px) 100vw, 900px"
            className={styles.shotImg}
          />
        </div>

        <section className={styles.section}>
          <h2 className={styles.h2}>Overview</h2>
          <p className={styles.body}>{cs.context}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Tech stack</h2>
          <div className={styles.chips}>
            {cs.stack.map((t) => (
              <span key={t} className={styles.chip}>{t}</span>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>What I built</h2>
          <ul className={styles.list}>
            {cs.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </section>

        <footer className={styles.footer}>
          <a
            className={styles.primaryBtn}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit live site ↗
          </a>
          <a className={styles.secondaryBtn} href={`mailto:${R.email}`}>
            Discuss a similar project
          </a>
        </footer>
      </div>
    </main>
  );
}
