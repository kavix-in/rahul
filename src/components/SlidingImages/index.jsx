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

  return (
    <section ref={container} className={styles.main} aria-label="Featured projects">
      {
        slidingImagesProjects.map( (project, i) => {
          const targetScale = 1 - ( (slidingImagesProjects.length - i) * 0.05);
          return (
            <Card
              key={project.slug}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * .25, 1]}
              targetScale={targetScale}
            />
          );
        })
      }
      <div className={styles.spacer} aria-hidden />
    </section>
  )
}
