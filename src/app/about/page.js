'use client'
import styles from './page.module.scss'
import { useState } from 'react';
import { motion } from 'framer-motion';
import useMousePosition from './utils/useMousePosition';

const ABOUT_SPOTLIGHT =
  'A full-stack developer specializing in Next.js, React.js, Three.js, and WebGL - building immersive web experiences powered by AI and modern CMS solutions.';

function BioParagraph({ className }) {
  return (
    <p className={className}>
      I&apos;m a <span className={styles.highlight}>full-stack developer</span> with expertise in Next.js, React.js, Three.js, WebGL, AI integration, and headless CMS - crafting high-performance, interactive web applications.
    </p>
  );
}

export default function Home() {

  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

  return (
    <main className={styles.main}>
      <section className={styles.stacked} aria-label="About">
        <p className={styles.lead}>{ABOUT_SPOTLIGHT}</p>
        <BioParagraph className={styles.bio} />
      </section>

      <div className={styles.desktop} aria-hidden="true">
        <motion.div 
          className={styles.mask}
          animate={{
            WebkitMaskPosition: `${x - (size/2)}px ${y - (size/2)}px`,
            maskPosition: `${x - (size/2)}px ${y - (size/2)}px`,
            WebkitMaskSize: `${size}px`,
            maskSize: `${size}px`,
          }}
          transition={{ type: "tween", ease: "backOut", duration:0.5}}
        >
            <p onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
              {ABOUT_SPOTLIGHT}
            </p>
        </motion.div>

        <div className={styles.body}>
          <BioParagraph className={styles.bio} />
        </div>
      </div>

    </main>
  )
}
