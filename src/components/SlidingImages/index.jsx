'use client';
import styles from './page.module.scss'
import { slidingImagesProjects } from '../../data';
import Card from '../Card';
import { useScroll } from 'framer-motion';
import { useRef } from 'react';

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  const count = slidingImagesProjects.length;

  return (
    <section ref={container} className={styles.main} aria-label="Featured projects">
      {
        slidingImagesProjects.map( (project, i) => {
          const targetScale = 1 - ( (count - i) * 0.05);
          // Spread scroll progress across cards: card i starts at i/n (n=4 → same as legacy 0.25 steps)
          const rangeStart = count > 0 ? i / count : 0;
          return (
            <Card
              key={project.slug}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[rangeStart, 1]}
              targetScale={targetScale}
            />
          );
        })
      }
      <div className={styles.spacer} aria-hidden />
    </section>
  )
}
