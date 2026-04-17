import styles from './style.module.scss';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import { socialLinks } from '@/config/social';
import { SocialIcon } from '../Header/Nav/socialIcons';
import { SITE } from '@/config/site';

export default function Contact() {
    const container = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    })
    
    // Adjust parallax values for mobile
    const y = useTransform(scrollYProgress, [0, 1], [isMobile ? 0 : -500, 0])
    const rotate = useTransform(scrollYProgress, [0, 1], [isMobile ? 90 : 120, 90])
    return (
        <motion.div id="contact" style={{y}} ref={container} className={styles.contact}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>
                        <div className={styles.imageContainer}>
                            <Image
                                fill
                                src="/image.png"
                                alt={`${SITE.author} — site logo: silhouette on a swing`}
                                sizes="(max-width: 767px) 60px, (max-width: 1024px) 80px, 100px"
                            />
                        </div>
                        <h2>Let&apos;s work</h2>
                    </span>
                    <h2>together</h2>
                    <motion.svg style={{rotate, scale: 2}} width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="#EA580C"/>
                    </motion.svg>
                </div>
                <ul className={styles.social}>
                    {socialLinks.map((link) => {
                        const openInNewTab = /^https?:\/\//.test(link.href);
                        return (
                            <li key={link.id}>
                                <a
                                    href={link.href}
                                    className={styles.socialLink}
                                    aria-label={link.title}
                                    {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                >
                                    <SocialIcon id={link.id} className={styles.socialIcon} />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </motion.div>
    )
}
