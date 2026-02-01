"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import sponsorsData from "@/assets/sponsors.json";

// Animation config
const spring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const placeholderLogo = "https://via.placeholder.com/320x120?text=Sponsor+Logo";

const Sponsors = () => {
  const [expanded, setExpanded] = useState(null);
  const { theme } = useTheme();

  // 10-column grid on large screens so we can allocate 6/4 (60% / 40%)
  const getColSpan = (sponsor) =>
    sponsor && sponsor.role && sponsor.role.toLowerCase().includes("title")
      ? "lg:col-span-6"
      : "lg:col-span-4";

  return (
    <div
      className={`bg-background text-foreground min-h-screen relative overflow-hidden font-sans transition-colors duration-500 ease-in-out ${theme === "dark" ? "dark" : ""
        }`}
    >
      <div className="hhv-about__grain absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-heading font-black tracking-tighter text-primary">
            Our Sponsors
          </h2>

          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto h-px mt-3 sm:mt-4 bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-80 mb-4 sm:mb-6" />

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl font-heading italic mb-2 font-medium tracking-wide text-primary px-2"
          >
            When the odds are against us, that&apos;s when we shine the
            brightest.
          </motion.blockquote>
        </motion.div>

        <LayoutGroup>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto items-stretch"
          >
            {Array.isArray(sponsorsData) &&
              sponsorsData.map((sponsor) => (
                <motion.button
                  key={sponsor.id}
                  type="button"
                  layoutId={`card-${sponsor.id}`}
                  variants={cardVariants}
                  transition={spring}
                  onClick={() => setExpanded(sponsor)}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className={`text-left border border-border rounded-xl sm:rounded-2xl bg-card/70 backdrop-blur-md p-3 sm:p-4 shadow-2xl relative group cursor-pointer flex items-center gap-3 sm:gap-4 hover:border-primary/50 hover:shadow-primary/20 ${getColSpan(
                    sponsor,
                  )} h-24 sm:h-28 md:h-32 lg:h-40`}
                >
                  <div className="relative z-10 w-full flex items-center gap-3 sm:gap-4">
                    {/* Always show logo. Use placeholder if missing. */}
                    <div className="flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 lg:w-32 lg:h-20 flex items-center justify-center overflow-hidden rounded">
                      <img
                        src={sponsor.logo || placeholderLogo}
                        alt={`${sponsor.title} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <motion.h3
                        layoutId={`title-${sponsor.id}`}
                        className="text-sm sm:text-base md:text-lg lg:text-xl font-heading font-black uppercase tracking-wide mb-0 text-primary truncate"
                      >
                        {sponsor.title}
                      </motion.h3>

                      <motion.p
                        layoutId={`role-${sponsor.id}`}
                        className="text-[10px] sm:text-xs md:text-sm font-body uppercase tracking-widest opacity-80 text-primary"
                      >
                        {sponsor.role}
                      </motion.p>
                    </div>
                  </div>
                </motion.button>
              ))}
          </motion.div>

          <AnimatePresence>
            {expanded && (
              <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setExpanded(null)}
                  className="absolute inset-0 backdrop-blur-md bg-muted/30"
                />

                <motion.div
                  layoutId={`card-${expanded.id}`}
                  transition={spring}
                  className="border border-border rounded-xl sm:rounded-2xl bg-card backdrop-blur-md p-4 sm:p-6 md:p-8 shadow-2xl w-full max-w-3xl relative z-10 max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <img
                        src={expanded.logo || placeholderLogo}
                        alt={`${expanded.title} logo`}
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-3 sm:gap-4">
                        <div>
                          <motion.h2
                            layoutId={`title-${expanded.id}`}
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-black uppercase mb-1 tracking-wide text-primary"
                          >
                            {expanded.title}
                          </motion.h2>

                          <motion.p
                            layoutId={`role-${expanded.id}`}
                            className="text-sm sm:text-base md:text-lg font-heading font-semibold tracking-wide text-primary"
                          >
                            {expanded.role}
                          </motion.p>
                        </div>

                        <div>
                          <button
                            onClick={() => setExpanded(null)}
                            className="text-[10px] sm:text-xs tracking-wider uppercase px-2 sm:px-3 py-0.5 sm:py-1 rounded border border-border bg-muted/50 font-body hover:bg-red-500/20 transition-colors"
                          >
                            Close
                          </button>
                        </div>
                      </div>

                      <div className="h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-80 my-4 sm:my-6" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {/* <div>
                          <h4 className="font-heading text-lg mb-3 uppercase tracking-wider text-primary">
                            Perks &amp; Branding
                          </h4>
                          <div className="flex flex-wrap gap-2.5">
                            {(expanded.rewards || []).length > 0 ? (
                              (expanded.rewards || []).map((reward, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs tracking-wider uppercase px-2 py-1 rounded border border-border bg-muted/50 font-body"
                                >
                                  {reward}
                                </span>
                              ))
                            ) : (
                              <p className="text-sm opacity-80">
                                No perks listed.
                              </p>
                            )}
                          </div>
                        </div>*/}

                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl">
                          {/* <h4 className="font-heading text-lg mb-3 uppercase tracking-wider text-foreground">
                            Company Profile
                          </h4>*/}
                          <p className="font-body text-sm sm:text-base leading-relaxed opacity-80 text-foreground">
                            {expanded.description ||
                              expanded.about ||
                              "No description available."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </div>
  );
};

export default Sponsors;
