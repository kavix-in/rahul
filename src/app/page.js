import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';
import { getResume } from '@/data/aboutResume';
import { projects } from '@/data';
import { caseStudies } from '@/data/caseStudies';
import { socialLinks } from '@/config/social';

// Regenerate the static page periodically so live-computed experience
// durations (and the years-of-experience stat) stay up to date in production.
export const revalidate = 3600;

export default function Home() {
  const R = getResume();
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
              Résumé
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
                <p className={styles.jobDuration}>
                  {job.duration}
                  {job.ongoing ? ' · ongoing' : ''}
                </p>
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
            { label: 'CMS', value: R.skills.cms },
          ].map((s) => (
            <div key={s.label} className={styles.skillCard}>
              <h3>{s.label}</h3>
              <p>{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- ENTERPRISE CLIENTS ---------------- */}
      <section className={styles.section} id="clients">
        <SectionHead
          index="04"
          title="Enterprise Clients"
          note="Engineering work support"
        />
        <div className={styles.clientGrid}>
          {R.enterpriseClients.map((client) => (
            <a
              key={client.name}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.clientChip}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://www.google.com/s2/favicons?sz=128&domain=${client.domain}`}
                alt={`${client.name} logo`}
                width={22}
                height={22}
                className={styles.clientLogo}
                loading="lazy"
              />
              <span>{client.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ---------------- WORK / PROJECTS ---------------- */}
      <section className={styles.section} id="work">
        <SectionHead
          index="05"
          title="Selected Work"
          note="Live client & product sites"
        />
        <p className={styles.swipeHint}>Swipe to explore →</p>
        <div className={styles.projectGrid}>
          {projects.map((p) => {
            const cs = caseStudies[p.slug];
            const hasCase = Boolean(cs);
            const cardInner = (
              <>
                <div className={styles.projectThumb}>
                  <Image
                    src={p.src}
                    alt={p.title}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px"
                    className={styles.projectImg}
                  />
                </div>
                <div className={styles.projectBody}>
                  <h3 className={styles.projectTitle}>{p.title}</h3>
                  <p className={styles.projectDesc}>
                    {hasCase ? cs.summary : p.description}
                  </p>
                  {hasCase && (
                    <div className={styles.projectStack}>
                      {cs.stack.slice(0, 3).map((t) => (
                        <span key={t} className={styles.stackTag}>{t}</span>
                      ))}
                      {cs.stack.length > 3 && (
                        <span className={styles.stackMore}>
                          +{cs.stack.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  <div className={styles.projectFooter}>
                    <span className={styles.projectAction}>
                      {hasCase ? 'View case study' : 'Visit site'}
                    </span>
                    <span className={styles.projectArrow} aria-hidden>
                      {hasCase ? '→' : '↗'}
                    </span>
                  </div>
                </div>
              </>
            );

            return hasCase ? (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className={styles.projectCard}
              >
                {cardInner}
              </Link>
            ) : (
              <a
                key={p.slug}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectCard}
              >
                {cardInner}
              </a>
            );
          })}
        </div>
      </section>

      {/* ---------------- EDUCATION + ACADEMIC ---------------- */}
      <section className={styles.section} id="education">
        <SectionHead index="06" title="Education" />
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
            Résumé
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
