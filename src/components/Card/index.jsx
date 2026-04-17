'use client'
import Image from 'next/image';
import styles from './style.module.scss';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef, useSyncExternalStore } from 'react';

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

const Card = ({i, title, description, src, link, color, progress, range, targetScale}) => {

  const container = useRef(null);
  const isMobile = useIsMobileCard();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale]);
  /* Desktop/tablet only: inline top fights CSS on small screens and shrinks cards into the corner */
  const topValue = `calc(-5vh + ${i * 25}px)`;
  const cardMotionStyle = isMobile
    ? { backgroundColor: color, scale, top: 0 }
    : { backgroundColor: color, scale, top: topValue };
 
  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div 
        style={cardMotionStyle} 
        className={styles.card}
      >
        <h2>{title}</h2>
        <div className={styles.body}>
          <div className={styles.description}>
            <p>{description}</p>
            <span className={styles.linkRow}>
              <a href={link} target="_blank" rel="noopener noreferrer">See more</a>
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" fill="currentColor"/>
              </svg>
            </span>
          </div>

          <div className={styles.imageContainer}>
            <motion.div
              className={styles.inner}
              style={{scale: imageScale}}
            >
              <Image
                fill
                src={`/images/${src}`}
                alt={title}
                sizes="(max-width: 767px) 100vw, (max-width: 1024px) 55vw, 600px"
              />
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default Card