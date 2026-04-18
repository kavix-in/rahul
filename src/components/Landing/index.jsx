'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import styles from './page.module.scss';
import LandingDesktop from './LandingDesktop';

const MOBILE_MQ = '(max-width: 767px)';

const images = [
  '1.jpeg',
  '2.jpeg',
  '3.jpeg',
  '4.jpeg',
  '5.jpeg',
  '6.jpeg',
  '7.jpeg',
  '8.jpeg',
  '9.jpeg',
  '10.jpeg',
  '11.jpeg',
  '12.jpeg',
];

export default function Landing() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia(MOBILE_MQ);
    let lenis = null;
    let rafId = null;

    const runRaf = (time) => {
      if (lenis) lenis.raf(time);
      rafId = requestAnimationFrame(runRaf);
    };

    const apply = () => {
      if (mq.matches) {
        if (lenis) {
          lenis.destroy();
          lenis = null;
        }
        return;
      }
      if (lenis) return;
      lenis = new Lenis({
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 1,
      });
    };

    apply();
    if (!mq.matches) {
      rafId = requestAnimationFrame(runRaf);
    }

    const onMq = () => {
      apply();
      if (mq.matches) {
        if (rafId != null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else if (rafId == null && lenis) {
        rafId = requestAnimationFrame(runRaf);
      }
    };

    mq.addEventListener('change', onMq);

    return () => {
      mq.removeEventListener('change', onMq);
      if (rafId != null) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <main className={styles.main}>
      <LandingDesktop images={images} />
    </main>
  );
}
