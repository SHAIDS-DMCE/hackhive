'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedLetters({
  letters, // For backwards compatibility
  segments, // Array of { text, className }
  perLetterDelay = 0.08,
  delayStart = 0.2,
  duration = 0.9,
}) {
  const [swapEquals, setSwapEquals] = useState(false);

  // Normalize input to segments
  const activeSegments = segments || [
    { text: Array.isArray(letters) ? letters.join("") : letters, className: "" }
  ];

  const totalLetters = activeSegments.reduce((acc, seg) => acc + seg.text.length, 0);

  useEffect(() => {
    const totalDelay =
      delayStart * 1000 +
      totalLetters * perLetterDelay * 1000 +
      120;

    const t = setTimeout(() => setSwapEquals(true), totalDelay);
    return () => clearTimeout(t);
  }, [totalLetters, perLetterDelay, delayStart]);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: perLetterDelay,
        delayChildren: delayStart,
      },
    },
  };

  const letterVariant = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: 'inline-block' }}
    >
      {activeSegments.map((seg, sIdx) => (
        <span key={sIdx} className={seg.className} style={{ display: 'inline-block' }}>
          {seg.text.split("").map((char, i) => {
            const isEquals = char === '=';

            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  marginInline: '0.02em',
                }}
              >
                {isEquals ? (
                  <AnimatePresence mode="wait">
                    {!swapEquals ? (
                      <motion.span
                        key="equals"
                        variants={letterVariant}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, rotate: -90 }}
                        style={{ display: 'inline-block' }}
                      >
                        =
                      </motion.span>
                    ) : (
                      <motion.span
                        key="x"
                        initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 0.7 }}
                        transition={{
                          duration: 0.18,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ display: 'inline-block' }}
                      >
                        X
                      </motion.span>
                    )}
                  </AnimatePresence>
                ) : (
                  <motion.span
                    variants={letterVariant}
                    style={{ display: 'inline-block', whiteSpace: 'pre' }}
                  >
                    {char}
                  </motion.span>
                )}
              </span>
            );
          })}
        </span>
      ))}
    </motion.span>
  );
}
