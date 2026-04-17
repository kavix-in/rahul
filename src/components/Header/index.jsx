'use client';
import { useState, useEffect, useRef, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button';
import styles from './style.module.scss';
import Nav from './Nav';

const MOBILE_MAX = 768;
const transition = { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] };
const transitionClosed = { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] };

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const q = () => setIsMobile(window.innerWidth <= MOBILE_MAX);
        q();
        window.addEventListener('resize', q);
        return () => window.removeEventListener('resize', q);
    }, []);
    return isMobile;
}

export default function Index() {
    const [isActive, setIsActive] = useState(false);
    const menuRef = useRef(null);
    const isMobile = useIsMobile();

    const menu = useMemo(() => ({
        open: isMobile
            ? {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: 0,
                transition,
            }
            : {
                position: 'relative',
                width: '480px',
                height: '650px',
                top: '-25px',
                right: '-25px',
                left: 'auto',
                borderRadius: '6px',
                transition,
            },
        closed: {
            position: 'relative',
            width: '100px',
            height: '40px',
            top: '0px',
            right: '0px',
            left: 'auto',
            borderRadius: '9999px',
            transition: transitionClosed,
        },
    }), [isMobile]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isActive && menuRef.current && !menuRef.current.contains(event.target)) {
                setIsActive(false);
            }
        };

        if (isActive) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isActive]);

    useEffect(() => {
        if (!isActive || !isMobile) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [isActive, isMobile]);

    const handleMenuClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={`${styles.header} ${isActive ? styles.active : ''} ${isMobile ? styles.mobile : ''}`} ref={menuRef}>
            <motion.div 
                className={styles.menu}
                variants={menu}
                animate={isActive ? "open" : "closed"}
                initial="closed"
                onClick={handleMenuClick}
            >
                <AnimatePresence>
                    {isActive && <Nav />}
                </AnimatePresence>
            </motion.div>
            <Button
                isActive={isActive}
                toggleMenu={() => { setIsActive(!isActive) }}
                matchMenuInset={isActive && isMobile}
            />
        </div>
    )
}
