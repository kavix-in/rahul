'use client';

import { useEffect, useState } from 'react';
import { aboutResume as R } from '@/data/aboutResume';
import styles from './style.module.scss';

const NAV = [
  { label: 'Summary', href: '#summary' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} no-print`}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.brandName}>{R.name}</span>
          <span className={styles.brandRole}>{R.role}</span>
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a
            className={styles.resumeBtn}
            href={R.resumePdf}
            download
          >
            Download CV
          </a>
          <button
            className={styles.menuToggle}
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={open ? styles.barOpen1 : ''} />
            <span className={open ? styles.barOpen2 : ''} />
          </button>
        </div>
      </div>

      {open && (
        <div className={styles.mobileMenu}>
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a className={styles.mobileResume} href={R.resumePdf} download>
            Download CV
          </a>
        </div>
      )}
    </header>
  );
}
