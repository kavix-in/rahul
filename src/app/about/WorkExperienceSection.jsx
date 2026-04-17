'use client';

import { Fragment, useEffect, useRef, useState, useCallback } from 'react';
import pageStyles from './page.module.scss';
import styles from './workExperience.module.scss';

export function WorkExperienceSection({ jobs }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  const setItemRef = useCallback((el, i) => {
    itemRefs.current[i] = el;
  }, []);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, jobs.length);
  }, [jobs.length]);

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean);
    if (!nodes.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting && e.intersectionRatio > 0.04);
        if (!visible.length) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const idx = Number(visible[0].target.getAttribute('data-step-index'));
        if (!Number.isNaN(idx)) setActiveIndex(idx);
      },
      {
        root: null,
        threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.75, 1],
        rootMargin: '-12% 0px -18% 0px',
      }
    );

    nodes.forEach((node) => obs.observe(node));
    return () => obs.disconnect();
  }, [jobs]);

  const goToStep = (i) => {
    itemRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className={styles.workSection} aria-labelledby="work-heading">
      <h2 id="work-heading" className={pageStyles.h2}>
        Work experience
      </h2>

      <div className={styles.stepperDesktop} role="navigation" aria-label="Career steps">
        <div className={styles.stepperRow}>
          {jobs.map((job, i) => (
            <Fragment key={`${job.company}-${job.period}`}>
              {i > 0 && (
                <div
                  className={styles.hLine}
                  data-done={activeIndex >= i ? 'true' : 'false'}
                  aria-hidden
                />
              )}
              <button
                type="button"
                className={styles.stepBtn}
                data-active={i === activeIndex ? 'true' : 'false'}
                onClick={() => goToStep(i)}
                aria-current={i === activeIndex ? 'step' : undefined}
                aria-label={`${job.company}, ${job.period}`}
              >
                <span
                  className={styles.stepCircle}
                  data-state={
                    i < activeIndex ? 'done' : i === activeIndex ? 'current' : 'todo'
                  }
                />
                <span className={styles.stepCompany}>{job.company}</span>
              </button>
            </Fragment>
          ))}
        </div>
      </div>

      <ul className={styles.jobList}>
        {jobs.map((job, i) => (
          <li
            key={`${job.company}-${job.period}`}
            className={styles.workRow}
            ref={(el) => setItemRef(el, i)}
            data-step-index={i}
          >
            <div className={styles.mobileTimeline} aria-hidden="true">
              <span
                className={styles.mDot}
                data-state={
                  i < activeIndex ? 'done' : i === activeIndex ? 'current' : 'todo'
                }
              />
              {i < jobs.length - 1 && (
                <span
                  className={styles.mLine}
                  data-state={activeIndex > i ? 'done' : 'upcoming'}
                />
              )}
            </div>
            <div className={styles.jobCard}>
              <div className={styles.jobHead}>
                <h3 className={styles.jobTitle}>{job.title}</h3>
                <p className={styles.jobMeta}>
                  <span className={styles.jobCompany}>{job.company}</span>
                  <span className={styles.jobSep}>·</span>
                  <span>{job.location}</span>
                </p>
                <p className={styles.jobPeriod}>{job.period}</p>
              </div>
              <ul className={styles.jobBullets}>
                {job.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
