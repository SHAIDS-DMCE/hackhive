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
    reduceMotion ? [0, 0] : [-160, 160],
  );
  const col2Y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-240, 240],
  );
  const col3Y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-160, 160],
  );

  const images = galleryData;

  const columns = [images.slice(0, 3), images.slice(3, 6), images.slice(6, 9)];

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="min-h-[175vh]">
        <div className="sticky top-0 h-screen">
          <div className="container mx-auto h-full px-4 py-10">
            <div className="grid h-full grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="flex flex-col justify-center">
                <div className="max-w-xl">
                  <h1
                    className="text-7xl md:text-8xl lg:text-9xl font-black tracking-wide"
                    style={{
                      color: colors.accent,
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    HACKHIVE
                  </h1>
                  <p
                    className="mt-6 text-xl md:text-2xl leading-relaxed"
                    style={{
                      color: colors.text,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Build fast. Break limits. Ship something real. Every
                    hackathon is a deadline with a dream.
                  </p>
                </div>
              </div>

              <div className="flex h-full items-center justify-center">
                <div className="grid w-full max-w-2xl grid-cols-3 gap-5">
                  <motion.div
                    style={{ y: col1Y }}
                    className="flex flex-col gap-5 pt-8"
                  >
                    {columns[0].map((img) => (
                      <div
                        key={img.id}
                        className="relative h-[170px] md:h-[190px] rounded-2xl overflow-hidden border-2"
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
                      </div>
                    ))}
                  </motion.div>

                  <motion.div
                    style={{ y: col2Y }}
                    className="flex flex-col gap-5 pt-14"
                  >
                    {columns[1].map((img) => (
                      <div
                        key={img.id}
                        className="relative h-[170px] md:h-[190px] rounded-2xl overflow-hidden border-2"
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
                      </div>
                    ))}
                  </motion.div>

                  <motion.div
                    style={{ y: col3Y }}
                    className="flex flex-col gap-5 pt-8"
                  >
                    {columns[2].map((img) => (
                      <div
                        key={img.id}
                        className="relative h-[170px] md:h-[190px] rounded-2xl overflow-hidden border-2"
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
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
