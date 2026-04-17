import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { links, footerLinks } from './data';
import { perspective, slideIn } from "./anim";
import { SocialIcon } from './socialIcons';

export default function index() {
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
                            <a href={href}>
                                {title}
                            </a>
                        </motion.div>
                    </div>
                )
            })
        }
       </div>
       <motion.div className={styles.footer}>
            {
                footerLinks.map( (link, i) => {
                    const { title, href, id } = link;
                    const isExternal = /^https?:\/\//.test(href);
                    return (
                        <motion.a 
                            href={href}
                            variants={slideIn}
                            custom={i} 
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            key={`f_${i}`}
                            className={styles.socialLink}
                            aria-label={title}
                            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
