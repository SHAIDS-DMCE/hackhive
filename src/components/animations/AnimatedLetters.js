'use client';

import { motion } from 'framer-motion';

/**
 * AnimatedLetters - Reveals text letter by letter with staggered animation
 * 
 * @param {Array} segments - Array of { text: string, className: string }
 * @param {number} perLetterDelay - Delay between each letter (default: 0.05)
 * @param {number} delayStart - Initial delay before animation starts (default: 0.2)
 * @param {number} duration - Duration of each letter animation (default: 0.5)
 */
export default function AnimatedLetters({
  segments = [],
  perLetterDelay = 0.05,
  delayStart = 0.2,
  duration = 0.5,
}) {
  // Container animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: perLetterDelay,
        delayChildren: delayStart,
      },
    },
  };

  // Letter animation variants
  const letterVariants = {
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="inline-block"
    >
      {segments.map((segment, segmentIndex) => (
        <span
          key={segmentIndex}
          className={`inline-block ${segment.className}`}
        >
          {segment.text.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={letterVariants}
              className="inline-block"
              style={{ whiteSpace: 'pre' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
