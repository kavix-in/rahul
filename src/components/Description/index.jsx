import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';
import Link from 'next/link';
export default function Description() {

    const phrase = "Building cutting-edge web experiences with Next.js, React.js, Three.js, and WebGL. Integrating AI-powered solutions and headless CMS to create immersive digital products.";
    const description = useRef(null);
    const isInView = useInView(description)
    return (
        <div ref={description} className={styles.description}>
            <div className={styles.body}>
                <p>
                {
                    phrase.split(" ").map( (word, index) => {
                        return <span key={index} className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
                    })
                }
                </p>
                <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>Expert in Next.js, React.js, Three.js, WebGL, AI, and CMS - building modern web experiences.</motion.p>
                <div data-scroll data-scroll-speed={0.1}>
                    <Link href="/about">
                        <Rounded className={styles.button}>
                            <p>About me</p>
                        </Rounded>
                    </Link>
                </div>
            </div>
        </div>
    )
}
