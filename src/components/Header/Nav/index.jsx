'use client';
import Link from 'next/link';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { links } from './data';
import { socialLinks } from '@/config/social';
import { perspective, slideIn } from "./anim";
import { SocialIcon } from './socialIcons';

const HOME_SECTION_IDS = new Set(['projects']);

function isHomeHashHref(href) {
  return /^\/#[\w-]+$/.test(href);
}

function onHomeHashClick(e, href, pathname, onClose) {
  const m = href.match(/^\/#([\w-]+)$/);
  if (!m || !HOME_SECTION_IDS.has(m[1])) {
    onClose?.();
    return;
  }
  const sectionId = m[1];
  e.preventDefault();
  onClose?.();
  if (pathname === '/') {
    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `/#${sectionId}`);
    });
  } else {
    window.location.href = href;
  }
}

export default function Nav({ onClose }) {
  const pathname = usePathname();

  return (
    <div className={styles.nav}>
       <div className={styles.body}>
        {
            links.map( (link, i) => {
                const { title, href } = link;
                return (
                    <div key={`b_${i}`} className={styles.linkContainer}>
                        <motion.div
                          custom={i}
                          variants={perspective}
                          initial="initial"
                          animate="enter"
                          exit="exit"
                        >
                            {isHomeHashHref(href) ? (
                              <a
                                href={href}
                                onClick={(e) => onHomeHashClick(e, href, pathname, onClose)}
                              >
                                {title}
                              </a>
                            ) : (
                              <Link href={href} onClick={() => onClose?.()}>
                                {title}
                              </Link>
                            )}
                        </motion.div>
                    </div>
                )
            })
        }
       </div>
       <motion.div className={styles.footer}>
            {
                socialLinks.map( (link, i) => {
                    const { title, href, id } = link;
                    const openInNewTab = /^https?:\/\//.test(href);
                    return (
                        <motion.a 
                            href={href}
                            variants={slideIn}
                            custom={i} 
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            key={id}
                            className={styles.socialLink}
                            aria-label={title}
                            {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                            <SocialIcon id={id} className={styles.socialIcon} />
                        </motion.a>
                    )
                })
            }
       </motion.div>
    </div>
  )
}
