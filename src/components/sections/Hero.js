'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedLetters from '@/components/animations/AnimatedLetters';
import FallingArtifacts from '@/components/effects/FallingArtifacts';
import { useLoading } from '@/context/LoadingContext';

export default function Hero() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [startAnimations, setStartAnimations] = useState(false);
  const [breakpoint, setBreakpoint] = useState('desktop');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Loading context integration
  const { registerComponent, markComponentReady, isLoading } = useLoading();

  // Animation timing
  const letterCount = 13;
  const perLetterDelay = 0.05;
  const delayStart = 0.3;
  const letterAnimationDuration = 0.5;

  const textRevealComplete = delayStart + (letterCount * perLetterDelay) + letterAnimationDuration;
  const translateDuration = 1.0;
  const translateComplete = textRevealComplete + translateDuration;
  const fadeInDelay = translateComplete + 0.2;

  // Responsive breakpoint detection
  const getBreakpoint = (width) => {
    if (width < 640) return 'mobile';
    if (width < 768) return 'mobileLg';
    if (width < 1024) return 'tablet';
    if (width < 1280) return 'laptop';
    return 'desktop';
  };

  // Register component on mount
  useEffect(() => {
    registerComponent('hero');
  }, [registerComponent]);

  useEffect(() => {
    setMounted(true);
    const checkBreakpoint = () => setBreakpoint(getBreakpoint(window.innerWidth));
    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);

    // Mark hero as ready and start animations when loading is done
    markComponentReady('hero');

    return () => {
      window.removeEventListener('resize', checkBreakpoint);
    };
  }, [markComponentReady]);

  // Start animations when loading screen is gone
  useEffect(() => {
    if (!isLoading && mounted) {
      setTimeout(() => setStartAnimations(true), 100);
    }
  }, [isLoading, mounted]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.5)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Responsive text translation values
  const getTranslation = () => {
    switch (breakpoint) {
      case 'mobile':
        return { x: 0, y: '22vh' };
      case 'mobileLg':
        return { x: 0, y: '22vh' };
      case 'tablet':
        return { x: '-15vw', y: '20vh' };
      case 'laptop':
        return { x: '-18vw', y: '18vh' };
      default:
        return { x: '-20vw', y: '16vh' };
    }
  };

  const isMobileOrTablet = ['mobile', 'mobileLg', 'tablet'].includes(breakpoint);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* Falling Artifacts Background */}
      <FallingArtifacts />

      {/* Text Content */}
      {startAnimations && (
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center"
          initial={{ x: 0, y: 0 }}
          animate={getTranslation()}
          transition={{
            delay: textRevealComplete,
            duration: translateDuration,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className={`px-6 sm:px-8 lg:px-12 xl:px-16 ${isMobileOrTablet ? 'text-center' : 'text-left'}`}>
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight leading-none">
              <AnimatedLetters
                segments={[
                  { text: 'HACK', className: 'text-foreground' },
                  { text: 'HIVE', className: 'text-primary' },
                  { text: ' ', className: '' },
                  { text: '2026', className: 'text-foreground' },
                ]}
                perLetterDelay={perLetterDelay}
                delayStart={delayStart}
                duration={letterAnimationDuration}
              />
            </h1>

            {/* Tagline */}
            <motion.p
              className={`mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-foreground/70 ${isMobileOrTablet ? 'mx-auto max-w-xs sm:max-w-sm' : 'max-w-md'}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: fadeInDelay,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Join the resistance, the ultimate heist
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className={`mt-6 sm:mt-8 ${isMobileOrTablet ? 'flex justify-center' : ''}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: fadeInDelay + 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                href="#problem-statements"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-lg text-white text-xs sm:text-sm lg:text-base font-semibold transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: '#DA2F35',
                  boxShadow: '0 4px 15px rgba(218, 47, 53, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(218, 47, 53, 0.5), 0 0 20px rgba(218, 47, 53, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(218, 47, 53, 0.4)';
                }}
              >
                View Problem Statements
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M5 12h14m-7-7l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
