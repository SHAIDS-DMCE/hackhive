'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedLetters from '@/components/animations/AnimatedLetters';
import FallingArtifacts from '@/components/effects/FallingArtifacts';
import { useLoading } from '@/context/LoadingContext';

const TARGET_DATE = new Date('2026-02-23T11:00:00');

export default function Hero() {
  const containerRef = useRef(null);
  const taglineRef = useRef(null);
  const timerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [startAnimations, setStartAnimations] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Loading context integration
  const { registerComponent, markComponentReady, isLoading } = useLoading();

  // Animation timing
  const letterCount = 13; // HACKHIVE 2026
  const perLetterDelay = 0.075;
  const delayStart = 0.2;
  const letterAnimationDuration = 1;

  const textRevealComplete = delayStart + (letterCount * perLetterDelay) + letterAnimationDuration;
  const taglineDelay = textRevealComplete + 0.3;
  const timerDelay = taglineDelay + 0.8;
  const buttonsDelay = timerDelay + 0.5;

  // Register component on mount
  useEffect(() => {
    registerComponent('hero');
  }, [registerComponent]);

  useEffect(() => {
    setMounted(true);
    markComponentReady('hero');
  }, [markComponentReady]);

  // Start animations when loading screen is gone
  useEffect(() => {
    if (!isLoading && mounted) {
      setTimeout(() => setStartAnimations(true), 100);
    }
  }, [isLoading, mounted]);

  // GSAP Scramble text effect for tagline - waits for heading to complete
  useEffect(() => {
    if (!startAnimations || !taglineRef.current) return;

    const tagline = taglineRef.current;
    const targetText = 'Join the resistance, the ultimate heist...';
    const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    let scrambleInterval;

    // Wait for heading animation to complete before starting tagline
    const startDelay = setTimeout(() => {
      tagline.textContent = '';
      tagline.style.opacity = '1';

      let currentIndex = 0;
      const revealSpeed = 40; // ms per character

      scrambleInterval = setInterval(() => {
        let displayText = '';

        for (let i = 0; i < targetText.length; i++) {
          if (i < currentIndex) {
            displayText += targetText[i];
          } else if (i === currentIndex) {
            displayText += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          } else {
            displayText += ' ';
          }
        }

        tagline.textContent = displayText;

        if (Math.random() > 0.4) {
          currentIndex++;
        }

        if (currentIndex >= targetText.length) {
          clearInterval(scrambleInterval);
          tagline.textContent = targetText;
        }
      }, revealSpeed);
    }, taglineDelay * 1000);

    return () => {
      clearTimeout(startDelay);
      if (scrambleInterval) clearInterval(scrambleInterval);
    };
  }, [startAnimations, taglineDelay]);

  // Countdown timer with scramble effect
  useEffect(() => {
    if (!startAnimations) return;

    const scrambleChars = '0123456789';
    let isFirstLoad = true;

    const runScrambleAnimation = (el, targetValue, iterations = 8) => {
      if (!el) return;
      let currentIteration = 0;
      const interval = setInterval(() => {
        el.textContent = targetValue.split('').map((char, i) => {
          if (currentIteration >= iterations * (i + 1) / targetValue.length) {
            return char;
          }
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }).join('');

        currentIteration++;
        if (currentIteration >= iterations) {
          clearInterval(interval);
          el.textContent = targetValue;
        }
      }, 30);
    };

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = TARGET_DATE.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const newTimeLeft = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };

      if (timerRef.current) {
        const timerElements = timerRef.current.querySelectorAll('.timer-value');
        timerElements.forEach((el, index) => {
          const keys = ['days', 'hours', 'minutes', 'seconds'];
          const value = String(newTimeLeft[keys[index]]).padStart(2, '0');
          const currentValue = el.textContent;

          if (isFirstLoad) {
            runScrambleAnimation(el, value, 20);
          } else if (currentValue !== value) {
            runScrambleAnimation(el, value, 8);
          }
        });
      }

      if (isFirstLoad) {
        isFirstLoad = false;
      }

      setTimeLeft(newTimeLeft);
    };

    const initialTimeout = setTimeout(updateCountdown, 100);
    const interval = setInterval(updateCountdown, 1000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [startAnimations]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* Falling Artifacts Background */}
      <FallingArtifacts />

      {/* Centered Content */}
      {startAnimations && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">

          {/* Title - HACKHIVE 2026 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-tight leading-none text-center">
            <AnimatedLetters
              segments={[
                { text: 'HACK', className: 'text-foreground glow-white' },
                { text: 'HIVE', className: 'text-primary glow-red' },
                { text: ' ', className: '' },
                { text: '2026', className: 'text-foreground glow-white' },
              ]}
              perLetterDelay={perLetterDelay}
              delayStart={delayStart}
              duration={letterAnimationDuration}
            />
          </h1>

          {/* Tagline - Scramble Text Effect */}
          <p
            ref={taglineRef}
            className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-foreground/70 text-center sm:max-w-sm md:max-w-md lg:max-w-lg font-body opacity-0"
            style={{ minHeight: '1.5em' }}
          >
            Join the resistance, the ultimate heist...
          </p>

          {/* Huge Glowing Timer */}
          <motion.div
            ref={timerRef}
            className="mt-8 sm:mt-10 md:mt-12 px-6 sm:px-10 md:px-14 lg:px-20 py-6 sm:py-8 md:py-10 rounded-2xl sm:rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(218, 47, 53, 0.1), rgba(218, 47, 53, 0.02))',
              boxShadow: `
                0 0 60px rgba(218, 47, 53, 0.3),
                0 0 120px rgba(218, 47, 53, 0.15),
                0 25px 50px rgba(0, 0, 0, 0.3),
                inset 0 0 60px rgba(218, 47, 53, 0.05)
              `,
              border: '1px solid rgba(218, 47, 53, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: timerDelay,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 lg:gap-10">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Mins' },
                { value: timeLeft.seconds, label: 'Secs' },
              ].map((item, index) => (
                <div key={item.label} className="flex flex-col items-center">
                  <div
                    className="font-code text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold"
                    style={{
                      textShadow: '0 0 30px rgba(218, 47, 53, 0.6), 0 0 60px rgba(218, 47, 53, 0.3)',
                    }}
                  >
                    <span className="timer-value text-primary">
                      {String(item.value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="mt-2 text-[10px] sm:text-xs md:text-sm text-foreground/50 uppercase tracking-widest font-semibold">
                    {item.label}
                  </span>
                  {/* Separator */}
                  {index < 3 && (
                    <span
                      className="absolute top-1/3 -right-2 sm:-right-4 md:-right-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary/40"
                      style={{ transform: 'translateY(-50%)' }}
                    >
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Buttons - Side by Side */}
          <motion.div
            className="mt-12 sm:mt-10 md:mt-12 flex flex-row items-center justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: buttonsDelay,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Problem Statements Button */}
            <a
              href="#problem-statements"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg text-white text-xs sm:text-sm lg:text-base font-semibold transition-all duration-300"
              style={{
                boxShadow: '0 2px 12px rgba(218, 47, 53, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(218, 47, 53, 0.5), 0 0 20px rgba(218, 47, 53, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(218, 47, 53, 0.4)';
              }}
            >
              Problem Statements
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Unstop Button */}
            <a
              href="https://unstop.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="unstop-btn inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg text-white text-xs sm:text-sm lg:text-base font-semibold transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: '#3769bf',
              }}
            >
              Register with Unstop
            </a>
          </motion.div>

        </div>
      )}
    </section>
  );
}
