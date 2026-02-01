"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

// --- ANIMATION CONFIGURATION ---
const spring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

// --- MAIN COMPONENT ---
const PrizePool = () => {
  const [expandedTier, setExpandedTier] = useState(null);
  const { theme } = useTheme();

  // --- DATA ---
  const prizeTiers = [
    {
      id: "winner",
      title: "GRAND PRIZE",
      icon: "🏆",
      amount: "₹6000",
      subtitle: "The Ultimate Loot",
      stats: [
        { label: "POSITIONS", value: "1 Winner" },
        { label: "PERKS", value: "Certificate" },
        { label: "CASH PRIZE", value: "₹6,000" },
      ],
      description:
        "The ultimate reward for the team that cracks the toughest code.",
      rewards: ["Certificate"],
    },
    {
      id: "runnerup",
      title: "RUNNER UP",
      icon: "🥈",
      amount: "₹3,000",
      subtitle: "Second Command",
      stats: [
        { label: "POSITIONS", value: "1 Runner Up" },
        { label: "PERKS", value: "Certificate" },
        { label: "CASH PRIZE", value: "₹3,000" },
      ],
      description: "For the team that was just one step away from the vault.",
      rewards: ["Certificate"],
    },
    {
      id: "participation",
      title: "PARTICIPANTS",
      icon: "📜",
      amount: "Certificate",
      subtitle: "For Every Hacker",
      stats: [
        { label: "ELIGIBILITY", value: "All Teams" },
        { label: "REQUIREMENT", value: "Submission" },
        { label: "REWARD", value: "Certificate" },
      ],
      description:
        "Every participant who submits a valid project will be recognized. Your effort counts.",
      rewards: [],
    },
  ];

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

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14 md:mb-20"
        >
          <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            <div className="inline-flex items-center text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.22em] uppercase text-primary/75 font-body">
              <span></span>
            </div>

            {/* --- TITLE --- */}
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-heading font-black tracking-tighter text-primary">
              The Vault
            </h2>
          </div>

          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-80 mb-4 sm:mb-6 md:mb-8"></div>

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm sm:text-base md:text-xl lg:text-2xl font-heading italic mb-3 sm:mb-4 font-medium tracking-wide text-primary px-2"
          >
            "The perfect heist isn't about the money—it's about making history."
          </motion.blockquote>

          <p className="text-[10px] sm:text-xs md:text-sm lg:text-lg font-body max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto uppercase tracking-widest opacity-80 px-2">
            Choose Your Target. Crack the Code. Win the Prize.
          </p>
        </motion.div>

        {/* --- CARDS GRID --- */}
        <LayoutGroup>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto"
          >
            {prizeTiers.map((tier) => (
              <motion.div
                key={tier.id}
                layoutId={`card-${tier.id}`}
                variants={cardVariants}
                onClick={() => setExpandedTier(tier)}
                whileHover={{
                  y: -5,
                }}
                transition={spring}
                className={`border border-border rounded-xl sm:rounded-2xl bg-card/70 backdrop-blur-md p-3 sm:p-4 shadow-2xl cursor-pointer flex flex-col justify-between hover:border-primary/50 ${tier.id === "participation" ? "lg:col-span-2" : ""}`}
              >
                <div className="relative z-10 flex flex-col h-full">
                  {/* --- CARD HEADER --- */}
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="flex gap-2.5 sm:gap-4">
                      <motion.div
                        layoutId={`icon-${tier.id}`}
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 min-w-[2.5rem] sm:min-w-[3rem] md:min-w-[4rem] rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl md:text-3xl border border-border bg-muted/20"
                      >
                        {tier.icon}
                      </motion.div>

                      <div>
                        <motion.h3
                          layoutId={`title-${tier.id}`}
                          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading font-black uppercase leading-none mb-0.5 sm:mb-1 tracking-wide text-primary"
                        >
                          {tier.title}
                        </motion.h3>
                        <motion.p
                          layoutId={`subtitle-${tier.id}`}
                          className="text-[10px] sm:text-xs md:text-sm font-body opacity-80"
                        >
                          {tier.subtitle}
                        </motion.p>
                      </div>
                    </div>

                    <div className="text-[8px] sm:text-[10px] md:text-xs tracking-wider uppercase px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-primary/50 text-primary font-body">
                      Active
                    </div>
                  </div>

                  <p className="font-body text-[11px] sm:text-xs md:text-sm mb-4 sm:mb-6 md:mb-8 line-clamp-2 h-8 sm:h-10 opacity-70">
                    {tier.description}
                  </p>

                  <div className="h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-80 mb-3 sm:mb-4 md:mb-6"></div>

                  <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center">
                    {tier.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center justify-center"
                      >
                        <span className="text-[8px] sm:text-[10px] md:text-[11px] tracking-widest uppercase opacity-80 font-body">
                          {stat.label}
                        </span>
                        <span className="mt-1 sm:mt-1.5 tracking-[0.1em] sm:tracking-[0.14em] font-extrabold text-xs sm:text-sm md:text-lg font-heading">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* --- EXPANDED MODAL --- */}
          <AnimatePresence>
            {expandedTier && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
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
                  className="border border-primary rounded-xl sm:rounded-2xl bg-card backdrop-blur-md p-3 sm:p-4 shadow-2xl w-full max-w-3xl relative z-10 max-h-[90vh] overflow-y-auto"
                >
                  <div className="p-2 sm:p-4 md:p-8">
                    <div className="flex justify-between items-start mb-4 sm:mb-6 md:mb-8">
                      <div className="flex gap-3 sm:gap-4 md:gap-6 items-center">
                        <motion.div
                          layoutId={`icon-${expandedTier.id}`}
                          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg sm:rounded-xl flex items-center justify-center text-2xl sm:text-3xl md:text-4xl border border-border bg-muted/20"
                        >
                          {expandedTier.icon}
                        </motion.div>

                        <div>
                          <motion.h2
                            layoutId={`title-${expandedTier.id}`}
                            className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-heading uppercase mb-1 sm:mb-2 tracking-wide text-foreground"
                          >
                            {expandedTier.title}
                          </motion.h2>
                          <motion.p
                            layoutId={`subtitle-${expandedTier.id}`}
                            className="text-sm sm:text-base md:text-xl font-heading font-bold tracking-wide text-primary"
                          >
                            Amount: {expandedTier.amount}
                          </motion.p>
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedTier(null)}
                        className="text-[10px] sm:text-xs tracking-wider uppercase px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-border bg-muted/50 font-body hover:bg-red-500/20 transition-colors"
                      >
                        CLOSE
                      </button>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-80 mb-4 sm:mb-6 md:mb-8"></div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
                    >
                      <div>
                        <h4 className="font-heading text-base sm:text-lg md:text-xl mb-2 sm:mb-3 md:mb-4 uppercase tracking-wider text-primary">
                          Rewards Breakdown
                        </h4>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5">
                          {expandedTier.rewards.map((reward, i) => (
                            <span
                              key={i}
                              className="text-[10px] sm:text-xs tracking-wider uppercase px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-border bg-muted/50 font-body"
                            >
                              {reward}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-border bg-muted/50">
                        <h4 className="font-heading text-base sm:text-lg md:text-xl mb-2 sm:mb-3 md:mb-4 uppercase tracking-wider text-foreground">
                          Mission Brief
                        </h4>
                        <p className="font-body text-xs sm:text-sm md:text-base leading-relaxed opacity-80">
                          {expandedTier.description} This tier represents the
                          pinnacle of achievement. Only the boldest innovators
                          will unlock this vault.
                        </p>
                      </div>
                    </motion.div>
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

export default PrizePool;
