"use client";
import { useEffect, useRef } from 'react';

/**
 * Simple scroll lock hook for Problem Statement section
 * Disables main page scrolling when isLocked is true
 */
export const useSimpleScrollLock = (isLocked) => {
  const scrollY = useRef(0);

  useEffect(() => {
    if (isLocked) {
      // Save current scroll position
      scrollY.current = window.scrollY;
      
      // Lock scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
    } else {
      // Restore scroll position
      const scrollYValue = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      
      // Restore scroll position
      if (scrollYValue) {
        window.scrollTo(0, parseInt(scrollYValue || '0') * -1);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isLocked]);

  return scrollY.current;
};
