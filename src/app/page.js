import Image from 'next/image';
import styles from './page.module.scss';
import { aboutResume as R } from '@/data/aboutResume';
import { projects } from '@/data';
import { socialLinks } from '@/config/social';

export default function Home() {
  const socials = socialLinks.filter((s) =>
    ['github', 'linkedin', 'email', 'whatsapp'].includes(s.id)
  );

  return (
    <main className={styles.main} id="top">
      {/* ---------------- HERO ---------------- */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.status}>
            <span className={styles.statusDot} aria-hidden />
            {R.available ? 'Open to opportunities' : 'Currently engaged'}
          </p>
          <h1 className={styles.name}>{R.name}</h1>
          <p className={styles.role}>{R.role}</p>
          <p className={styles.tagline}>{R.tagline}</p>
          <p className={styles.heroSummary}>{R.summary}</p>

          <div className={styles.ctaRow}>
            <a className={styles.primaryBtn} href={R.resumePdf} download>
              Download Résumé (PDF)
            </a>
            <a className={styles.secondaryBtn} href="#work">
              View Work
            </a>
          </div>

          <ul className={styles.metaList}>
            <li>{R.location}</li>
            <li>
              <a href={`mailto:${R.email}`}>{R.email}</a>
            </li>
            <li>
              <a href={`tel:${R.phoneE164}`}>{R.phone}</a>
            </li>
          </ul>

          <div className={styles.socialRow}>
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target={s.id === 'email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.heroPhoto}>
          <div className={styles.photoFrame}>
            <Image
              src={R.photo}
              alt={`${R.name} — ${R.role}`}
              fill
              sizes="(max-width: 900px) 220px, 320px"
              priority
              className={styles.photoImg}
            />
          </div>
          <dl className={styles.statBox}>
            <div>
              <dt>{R.yearsExperience}</dt>
              <dd>Years experience</dd>
            </div>
            <div>
              <dt>{projects.length}+</dt>
              <dd>Shipped projects</dd>
            </div>
            <div>
              <dt>{R.experience.length}</dt>
              <dd>Companies</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ---------------- SUMMARY / FOCUS ---------------- */}
      <section className={styles.section} id="summary">
        <SectionHead index="01" title="Summary" />
        <div className={styles.summaryGrid}>
          <p className={styles.lead}>{R.summary}</p>
          <div className={styles.focusList}>
            {R.focusAreas.map((f) => (
              <div key={f.label} className={styles.focusItem}>
                <strong>{f.label}</strong>
                <span>{f.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- EXPERIENCE ---------------- */}
      <section className={styles.section} id="experience">
        <SectionHead index="02" title="Experience" />
        <div className={styles.timeline}>
          {R.experience.map((job) => (
            <article key={`${job.company}-${job.period}`} className={styles.job}>
              <div className={styles.jobMeta}>
                <p className={styles.jobPeriod}>{job.period}</p>
                <p className={styles.jobLocation}>{job.location}</p>
              </div>
              <div className={styles.jobBody}>
                <h3 className={styles.jobTitle}>{job.title}</h3>
                <p className={styles.jobCompany}>{job.company}</p>
                <ul className={styles.bullets}>
                  {job.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- SKILLS ---------------- */}
      <section className={styles.section} id="skills">
        <SectionHead index="03" title="Skills" />
        <div className={styles.skillsGrid}>
          {[
            { label: 'Primary Stack', value: R.skills.primary },
            { label: 'Programming', value: R.skills.programming },
            { label: 'Databases', value: R.skills.databases },
            { label: 'Tools & DevOps', value: R.skills.tools },
          ].map((s) => (
            <div key={s.label} className={styles.skillCard}>
              <h3>{s.label}</h3>
              <p>{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- WORK / PROJECTS ---------------- */}
      <section className={styles.section} id="work">
        <SectionHead
          index="04"
          title="Selected Work"
          note="Live client & product sites"
        />
        <div className={styles.projectGrid}>
          {projects.map((p) => (
            <a
              key={p.slug}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectCard}
            >
              <div className={styles.projectThumb}>
                <Image
                  src={p.src}
                  alt={p.title}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px"
                  className={styles.projectImg}
                />
              </div>
              <div className={styles.projectInfo}>
                <h3>{p.title}</h3>
                <span className={styles.projectArrow} aria-hidden>
                  ↗
                </span>
              </div>
              <p className={styles.projectDesc}>{p.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ---------------- EDUCATION + ACADEMIC ---------------- */}
      <section className={styles.section} id="education">
        <SectionHead index="05" title="Education" />
        <div className={styles.eduGrid}>
          {R.education.map((ed) => (
            <div key={ed.school} className={styles.eduCard}>
              <h3>{ed.school}</h3>
              <p className={styles.eduCred}>{ed.credential}</p>
              <p className={styles.eduMeta}>
                {ed.period}
                {ed.note ? ` · ${ed.note}` : ''}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CONTACT ---------------- */}
      <section className={styles.contact} id="contact">
        <p className="eyebrow">Let&apos;s work together</p>
        <h2 className={styles.contactTitle}>
          Have a role or project in mind?
        </h2>
        <p className={styles.contactSub}>
          I&apos;m {R.available ? 'open to full-time roles, contract, and freelance work.' : 'currently engaged, but happy to talk.'}
        </p>
        <div className={styles.ctaRow}>
          <a className={styles.primaryBtn} href={`mailto:${R.email}`}>
            {R.email}
          </a>
          <a className={styles.secondaryBtn} href={R.resumePdf} download>
            Download Résumé
          </a>
        </div>
        <div className={styles.socialRow}>
          {socialLinks.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target={s.id === 'email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              {s.title}
            </a>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} {R.name}</span>
        <span>Built with Next.js</span>
      </footer>
    </main>
  );
}

function SectionHead({ index, title, note }) {
  return (
    <div className={styles.sectionHead}>
      <span className={styles.sectionIndex}>{index}</span>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {note ? <span className={styles.sectionNote}>{note}</span> : null}
    </div>
  );
}
