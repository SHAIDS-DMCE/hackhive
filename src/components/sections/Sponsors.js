"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import sponsorsData from "@/assets/sponsors.json";

// --- ANIMATION CONFIGURATION ---
const spring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

// --- MAIN COMPONENT ---
const Sponsors = () => {
  const [expandedTier, setExpandedTier] = useState(null);
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div
      className={`bg-background text-foreground min-h-screen relative overflow-hidden font-sans transition-colors duration-500 ease-in-out ${theme === "dark" ? "dark" : ""}`}
    >
      {/* Background Effects */}
      <div className="hhv-about__grain absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-20">
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* --- TITLE LAYOUT --- */}
          <div className="flex flex-col items-center justify-center gap-2 mb-6">

            {/* --- MAIN PAGE TITLE --- */}
            <h2
              className="text-7xl md:text-9xl font-heading font-black tracking-tighter text-primary"
            >
              Our Sponsors
            </h2>
          </div>

          <div className="w-full max-w-md mx-auto h-px mt-3.5 bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-80 mb-8"></div>

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl font-heading italic mb-4 font-medium tracking-wide text-primary"
          >
            "When the odds are against us, that's when we shine the brightest."
          </motion.blockquote>
        </motion.div>

        {/* --- SPONSOR CARDS GRID --- */}
        <LayoutGroup>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            {sponsorsData.map((sponsor) => (
              <motion.div
                key={sponsor.id}
                layoutId={`card-${sponsor.id}`}
                variants={cardVariants}
                onClick={() => setExpandedTier(sponsor)}
                transition={spring}

                // HOVER EFFECT
                whileHover={{
                  scale: 1.02,
                  y: -5,
                }}

                className={`border border-border rounded-2xl bg-card/70 backdrop-blur-md p-4 shadow-2xl relative group cursor-pointer flex flex-col justify-center items-center text-center hover:border-primary/50 hover:shadow-primary/20
                  ${sponsor.size === "large" ? "lg:col-span-2 h-48 lg:h-64" : "lg:col-span-1 h-40 lg:h-48"}
                `}
              >
                {/* Content */}
                <div className="relative z-10">

                  {/* --- CARD TITLE --- */}
                  <motion.h3
                    layoutId={`title-${sponsor.id}`}
                    className="text-2xl md:text-4xl font-heading font-black uppercase tracking-wide mb-2 text-primary"
                  >
                    {sponsor.title}
                  </motion.h3>

                  {/* Subtle Role Text */}
                  <motion.p
                    layoutId={`role-${sponsor.id}`}
                    className="text-xs md:text-sm font-body uppercase tracking-widest opacity-80 text-primary"
                  >
                    {sponsor.role}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* --- EXPANDED MODAL --- */}
          <AnimatePresence>
            {expandedTier && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setExpandedTier(null)}
                  className="absolute inset-0 backdrop-blur-md bg-muted/10 dark:bg-background/80"
                />

                <motion.div
                  layoutId={`card-${expandedTier.id}`}
                  transition={spring}
                  className="border border-border rounded-2xl bg-card backdrop-blur-md p-4 shadow-2xl w-full max-w-3xl relative z-10 border-primary/50"
                >
                  <div className="p-8 md:p-12">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex gap-6 items-center">
                        <div className="text-4xl">{expandedTier.icon}</div>
                        <div>
                          {/* Modal Title */}
                          <motion.h2
                            layoutId={`title-${expandedTier.id}`}
                            className="text-4xl md:text-6xl font-heading font-black uppercase mb-2 tracking-wide text-primary"
                          >
                            {expandedTier.title}
                          </motion.h2>
                          <motion.p
                            layoutId={`role-${expandedTier.id}`}
                            className="text-xl font-heading font-bold tracking-wide text-primary"
                          >
                            {expandedTier.role}
                          </motion.p>
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedTier(null)}
                        className="text-xs tracking-wider uppercase px-2 py-1 rounded border border-border bg-muted/50 font-body hover:bg-red-500/20 transition-colors"
                      >
                        CLOSE
                      </button>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-80 mb-8"></div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4
                          className="font-heading text-xl mb-4 uppercase tracking-wider text-primary"
                        >
                          Perks &amp; Branding
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                          {expandedTier.rewards.map((reward, i) => (
                            <span key={i} className="text-xs tracking-wider uppercase px-2 py-1 rounded border border-border bg-muted/50 font-body">
                              {reward}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 rounded-xl border border-border bg-muted/50">
                        <h4
                          className="font-heading text-xl mb-4 uppercase tracking-wider text-foreground"
                        >
                          Company Profile
                        </h4>
                        <p
                          className="font-body leading-relaxed opacity-80 text-foreground"
                        >
                          {expandedTier.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </div>
  );
};

export default Sponsors;