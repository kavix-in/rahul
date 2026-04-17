'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import styles from './style.module.scss';

const useMousePosition = (enabled) => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    if (!enabled) return;
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [enabled]);

  return mousePosition;
};

/** True when the device has a real mouse and hover (excludes phones / most tablets). */
function useFinePointerHover() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (hover: hover)');
    const apply = () => setOk(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);
  return ok;
}

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const useCustomCursor = useFinePointerHover();
  const { x, y } = useMousePosition(useCustomCursor);
  const pathname = usePathname();
  const isAboutPage = pathname === '/about';
  
  // Only expand on about page, otherwise keep it at base size
  const size = (isHovered && isAboutPage) ? 400 : 40;

  useEffect(() => {
    if (!useCustomCursor) {
      setIsHovered(false);
      return;
    }
    // Only add hover listeners on the about page
    if (!isAboutPage) {
      setIsHovered(false);
      return;
    }

    const isInteractiveElement = (target) => {
      // Ensure target is an Element node (not a text node)
      if (!target || typeof target.closest !== 'function') {
        // If target is not an Element, try to find the parent Element
        let element = target;
        while (element && element.nodeType !== 1) {
          element = element.parentElement;
        }
        if (!element) return false;
        target = element;
      }

      // Check if it's an interactive element
      return (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        target.closest('[data-cursor-hover]') !== null ||
        (target.hasAttribute && target.hasAttribute('href')) ||
        target.onclick !== null ||
        window.getComputedStyle(target).cursor === 'pointer'
      );
    };

    const handleMouseEnter = (e) => {
      if (isInteractiveElement(e.target)) {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (isInteractiveElement(e.target)) {
        setIsHovered(false);
      }
    };

    // Use mouseover/mouseout for better compatibility
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [isAboutPage, useCustomCursor]);

  if (!useCustomCursor) return null;
  if (x === null || y === null) return null;

  return (
    <motion.div 
      className={styles.cursor}
      animate={{
        WebkitMaskPosition: `${x - (size/2)}px ${y - (size/2)}px`,
        WebkitMaskSize: `${size}px`,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
    />
  );
}

