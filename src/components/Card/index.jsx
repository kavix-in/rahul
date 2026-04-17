'use client'
import Image from 'next/image';
import styles from './style.module.scss';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef, useSyncExternalStore } from 'react';
import { signatureFontClasses } from '../../lib/handwritingFonts';

const MOBILE_MQ = '(max-width: 767px)';

function subscribeMobileCard(onStoreChange) {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia(MOBILE_MQ);
  mq.addEventListener('change', onStoreChange);
  return () => mq.removeEventListener('change', onStoreChange);
}

function useIsMobileCard() {
  return useSyncExternalStore(
    subscribeMobileCard,
    () => window.matchMedia(MOBILE_MQ).matches,
    () => false
  );
}

/* Matches SlidingImages order: speakers-solutions, sunnystate, ekaa, spadtek */
const SIGNATURE_VARIANTS = ['sig0', 'sig1', 'sig2', 'sig3'];

const Card = ({ i, title, src, color, link, progress, range, targetScale }) => {
  const container = useRef(null);
  const isMobile = useIsMobileCard();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  const topValue = `calc(-5vh + ${i * 25}px)`;
  const cardMotionStyle = isMobile
    ? { backgroundColor: color, scale, top: 0 }
    : { backgroundColor: color, scale, top: topValue };

  return (
    <div ref={container} className={styles.cardContainer}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cardLink}
        aria-label={`${title} (opens in a new tab)`}
      >
      <motion.div style={cardMotionStyle} className={styles.card}>
        <div className={styles.media}>
          <div className={styles.imageShell}>
            <motion.div className={styles.inner} style={{ scale: imageScale }}>
              <Image
                fill
                src={src}
                alt={title}
                className={styles.coverImage}
                sizes="(max-width: 767px) 100vw, (max-width: 1024px) 90vw, 920px"
              />
            </motion.div>
            <div className={styles.imageGradient} aria-hidden />
            <p
              className={`${styles.signatureTitle} ${styles[SIGNATURE_VARIANTS[i % SIGNATURE_VARIANTS.length]]} ${signatureFontClasses[i % signatureFontClasses.length]}`}
            >
              {title}
            </p>
          </div>
        </div>
      </motion.div>
      </a>
    </div>
  );
};

export default Card;
