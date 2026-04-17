'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.scss';
import { aboutResume as R } from '@/data/aboutResume';
import { WorkExperienceSection } from './WorkExperienceSection';
import { SITE } from '@/config/site';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <div className={styles.heroTop}>
          <div className={styles.imageContainer}>
            <Image
              fill
              src="/image.png"
              alt={`${SITE.author} — site logo: silhouette on a swing`}
              sizes="(max-width: 380px) 72px, 88px"
              priority
            />
          </div>
          <div className={styles.heroIntro}>
            <p className={styles.overline}>About</p>
            <h1 className={styles.name}>{R.name}</h1>
          </div>
        </div>
        <p className={styles.meta}>
          <span>{R.location}</span>
          <span className={styles.metaSep} aria-hidden>
            ·
          </span>
          <a href={`tel:${R.phoneE164}`} className={styles.metaLink}>
            {R.phone}
          </a>
          <span className={styles.metaSep} aria-hidden>
            ·
          </span>
          <a href={`mailto:${R.email}`} className={styles.metaLink}>
            {R.email}
          </a>
        </p>
        <div className={styles.focusRow} role="list">
          {R.focusAreas.map((f) => (
            <span key={f.label} className={styles.focusPill} role="listitem">
              <strong>{f.label}</strong>
              <span className={styles.focusDetail}>{f.detail}</span>
            </span>
          ))}
        </div>
      </header>

      <section className={styles.section} aria-labelledby="summary-heading">
        <h2 id="summary-heading" className={styles.h2}>
          Summary
        </h2>
        <p className={styles.lead}>{R.summary}</p>
      </section>

      <WorkExperienceSection jobs={R.experience} />

      <section className={styles.section} aria-labelledby="edu-heading">
        <h2 id="edu-heading" className={styles.h2}>
          Education
        </h2>
        <ul className={styles.eduList}>
          {R.education.map((ed) => (
            <li key={ed.school} className={styles.eduCard}>
              <h3 className={styles.eduSchool}>{ed.school}</h3>
              <p className={styles.eduCred}>{ed.credential}</p>
              <p className={styles.eduMeta}>
                {ed.period}
                {ed.note ? (
                  <>
                    <span className={styles.jobSep}> · </span>
                    {ed.note}
                  </>
                ) : null}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="skills-heading">
        <h2 id="skills-heading" className={styles.h2}>
          Skills
        </h2>
        <div className={styles.skillsGrid}>
          <div className={styles.skillBlock}>
            <h3 className={styles.h3}>Primary</h3>
            <p className={styles.skillText}>{R.skills.primary}</p>
          </div>
          <div className={styles.skillBlock}>
            <h3 className={styles.h3}>Programming</h3>
            <p className={styles.skillText}>{R.skills.programming}</p>
          </div>
          <div className={styles.skillBlock}>
            <h3 className={styles.h3}>Databases</h3>
            <p className={styles.skillText}>{R.skills.databases}</p>
          </div>
          <div className={styles.skillBlock}>
            <h3 className={styles.h3}>Tools</h3>
            <p className={styles.skillText}>{R.skills.tools}</p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="projects-heading">
        <h2 id="projects-heading" className={styles.h2}>
          Academic projects
        </h2>
        {R.projects.map((proj) => (
          <article key={proj.title} className={styles.projectCard}>
            <div className={styles.projectHead}>
              <h3 className={styles.projectTitle}>{proj.title}</h3>
              <p className={styles.projectStack}>{proj.stack}</p>
              <p className={styles.projectPeriod}>{proj.period}</p>
            </div>
            <ul className={styles.bullets}>
              {proj.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <footer className={styles.footer}>
        <Link href="/" className={styles.backLink}>
          ← Back to portfolio
        </Link>
      </footer>
    </main>
  );
}
