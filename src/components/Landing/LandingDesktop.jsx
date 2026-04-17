'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTransform, useScroll, motion } from 'framer-motion';
import styles from './page.module.scss';

const MOBILE_MQ = '(max-width: 767px)';

function Column({ images, y, parallax = true }) {
  return (
    <motion.div className={styles.column} style={parallax ? { y } : undefined}>
      {images.map((src, i) => (
        <div key={i} className={styles.imageContainer}>
          <Image
            src={`/images/${src}`}
            alt=""
            fill
            sizes="(max-width: 767px) 50vw, 25vw"
          />
        </div>
      ))}
    </motion.div>
  );
}

export default function LandingDesktop({ images }) {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [parallaxEnabled, setParallaxEnabled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start'],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', resize);
    resize();
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setParallaxEnabled(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <div ref={gallery} className={styles.gallery}>
      <Column
        images={[images[0], images[1], images[2]]}
        y={y}
        parallax={parallaxEnabled}
      />
      <Column
        images={[images[3], images[4], images[5]]}
        y={y2}
        parallax={parallaxEnabled}
      />
      <Column
        images={[images[6], images[7], images[8]]}
        y={y3}
        parallax={parallaxEnabled}
      />
      <Column
        images={[images[9], images[10], images[11]]}
        y={y4}
        parallax={parallaxEnabled}
      />
    </div>
  );
}
