"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import galleryData from "@/assets/LastYeaHackHive.json";

export default function Gallery() {
  const { colors } = useTheme();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const col1Y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-200, 200],
  );
  const col2Y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-300, 300],
  );
  const col3Y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-200, 200],
  );

  const images = galleryData;
  const columns = [images.slice(0, 3), images.slice(3, 6), images.slice(6, 9)];

  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
        duration: 0.8,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        mass: 1,
        delay: 0.2,
        duration: 0.6,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.6,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-14 items-center lg:min-h-screen">
          <motion.div
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col justify-center"
          >
            <div className="max-w-2xl">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-wide leading-tight"
                style={{
                  color: colors.accent,
                  fontFamily: "var(--font-heading)",
                }}
              >
                HACKHIVE 2025
              </h1>
              <p
                className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed"
                style={{
                  color: colors.text,
                  fontFamily: "var(--font-body)",
                }}
              >
                Build fast. Break limits. Ship something real. Every hackathon is a deadline with a dream.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] mt-4 lg:-mt-16">
            <motion.div
              style={{ y: col1Y }}
              className="flex flex-col gap-2 sm:gap-3 md:gap-4 pt-1 sm:pt-2"
            >
              {columns[0].map((img, index) => (
                <motion.div
                  key={img.id}
                  variants={imageVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                  className="relative h-[75px] sm:h-[90px] md:h-[105px] lg:h-[120px] xl:h-[140px] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border sm:border-2"
                  style={{
                    borderColor: `${colors.accent}70`,
                    backgroundColor: `${colors.accent}12`,
                    boxShadow: `0 18px 45px -30px ${colors.accent}55`,
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, ${colors.primary}00 0%, ${colors.primary}66 70%, ${colors.primary}B3 100%)`,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              style={{ y: col2Y }}
              className="flex flex-col gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4"
            >
              {columns[1].map((img, index) => (
                <motion.div
                  key={img.id}
                  variants={imageVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover="hover"
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="relative h-[75px] sm:h-[90px] md:h-[105px] lg:h-[120px] xl:h-[140px] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border sm:border-2"
                  style={{
                    borderColor: `${colors.accent}70`,
                    backgroundColor: `${colors.accent}12`,
                    boxShadow: `0 18px 45px -30px ${colors.accent}55`,
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, ${colors.primary}00 0%, ${colors.primary}66 70%, ${colors.primary}B3 100%)`,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              style={{ y: col3Y }}
              className="flex flex-col gap-2 sm:gap-3 md:gap-4 pt-1 sm:pt-2"
            >
              {columns[2].map((img, index) => (
                <motion.div
                  key={img.id}
                  variants={imageVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover="hover"
                  transition={{ delay: index * 0.1 + 0.6 }}
                  className="relative h-[75px] sm:h-[90px] md:h-[105px] lg:h-[120px] xl:h-[140px] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border sm:border-2"
                  style={{
                    borderColor: `${colors.accent}70`,
                    backgroundColor: `${colors.accent}12`,
                    boxShadow: `0 18px 45px -30px ${colors.accent}55`,
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, ${colors.primary}00 0%, ${colors.primary}66 70%, ${colors.primary}B3 100%)`,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}