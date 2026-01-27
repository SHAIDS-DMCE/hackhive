"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

// --- SPONSORS SPECIFIC THEME CONFIG ---
const SPONSOR_THEMES = {
  dark: {
    bg: "#050505",
    cardBg: "#c51b20", // Solid Red Background for cards (from reference)
    cardBorder: "#c51b20",
    accent: "#ffffff", // White text on red cards
    text: "#ffffff",
    textSecondary: "#ffcccc", // Light red for secondary text
    shadow: "0 4px 20px rgba(197, 27, 32, 0.4)", // Red glow
  },
  light: {
    bg: "#f4f4f5",
    cardBg: "#d91c21", // Slightly brighter red for light mode
    cardBorder: "#d91c21",
    accent: "#ffffff",
    text: "#111827",
    textSecondary: "#4b5563",
    shadow: "0 4px 20px rgba(217, 28, 33, 0.3)",
  },
};

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
  const { mode, theme } = useTheme();
  const activeTheme = SPONSOR_THEMES[theme] || SPONSOR_THEMES.dark;

  // Updated Data: Direct Company Names instead of "Gold/Silver"
  const sponsorTiers = [
    {
      id: "techcorp",
      title: "TECHCORP GLOBAL",
      icon: "💎",
      role: "Title Sponsor",
      size: "large", // Controls grid span
      description:
        "Leading the way in global tech innovation and software solutions.",
      rewards: ["Keynote Session", "Exclusive Booth", "Merch Branding"],
    },
    {
      id: "innovation",
      title: "INNOVATION LABS",
      icon: "🚀",
      role: "Title Sponsor",
      size: "large",
      description:
        "Pioneering research and development for the next generation of startups.",
      rewards: ["Workshop Host", "Premium Stall", "Database Access"],
    },
    {
      id: "digital",
      title: "DIGITAL SOLUTIONS",
      icon: "☁️",
      role: "Associate Sponsor",
      size: "small",
      description:
        "Providing cloud infrastructure and digital transformation services.",
      rewards: ["Tech Talk", "Standard Booth"],
    },
    {
      id: "cloud",
      title: "CLOUD SYSTEMS",
      icon: "🌐",
      role: "Associate Sponsor",
      size: "small",
      description: "Scalable cloud architecture for modern applications.",
      rewards: ["Mentorship", "Logo on Website"],
    },
    {
      id: "data",
      title: "DATA DYNAMICS",
      icon: "📊",
      role: "Partner",
      size: "small",
      description: "Big data analytics and AI-driven insights.",
      rewards: ["Networking Access", "Swag Distribution"],
    },
    {
      id: "web",
      title: "WEB INNOVATIONS",
      icon: "💻",
      role: "Partner",
      size: "small",
      description: "Building the future of the web, one pixel at a time.",
      rewards: ["Recruiting Access", "Social Media Shoutout"],
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
      className="min-h-screen relative overflow-hidden font-sans transition-colors duration-500 ease-in-out"
      style={{ backgroundColor: activeTheme.bg }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600&display=swap");
        .font-heading {
          font-family: "Anton", sans-serif;
          letter-spacing: 0.5px;
        }
        .font-body {
          font-family: "Inter", sans-serif;
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* MONEY HEIST STYLE TITLE */}
          <div className="flex flex-row flex-wrap items-center justify-center gap-3 mb-6">
            <span
              className={`text-7xl md:text-9xl font-heading uppercase tracking-tighter ${theme === "dark" ? "text-white" : "text-black"}`}
              style={{
                textShadow:
                  theme === "dark" ? "0 0 30px rgba(0,0,0,0.5)" : "none",
              }}
            >
              THE
            </span>

            <div
              className="px-4 pb-2 pt-3 rounded-sm transform -skew-x-6"
              style={{ backgroundColor: "#e62429" }} // Always Red for the block
            >
              <span className="text-7xl md:text-9xl font-heading uppercase tracking-tighter text-black leading-none block transform skew-x-6">
                SPONSORS
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8 opacity-80">
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-red-600"></div>
            <div
              className="rotate-45 w-3 h-3 border border-red-600 transition-colors duration-500"
              style={{ backgroundColor: activeTheme.bg }}
            ></div>
            <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-red-600"></div>
          </div>

          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-serif italic mb-4 font-medium"
            style={{ color: "#e62429" }}
          >
            "Fueling the revolution, one block at a time."
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
            {sponsorTiers.map((sponsor) => (
              <motion.div
                key={sponsor.id}
                layoutId={`card-${sponsor.id}`}
                variants={cardVariants}
                onClick={() => setExpandedTier(sponsor)}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={spring}
                // Grid Logic: Large sponsors span 2 cols, Small span 1
                className={`relative group cursor-pointer rounded-xl overflow-hidden flex flex-col justify-center items-center text-center p-8
                  ${sponsor.size === "large" ? "lg:col-span-2 h-48 lg:h-64" : "lg:col-span-1 h-40 lg:h-48"}
                `}
                style={{
                  backgroundColor: activeTheme.cardBg, // RED Background
                  boxShadow: activeTheme.shadow,
                  border: `1px solid ${activeTheme.cardBorder}`,
                }}
              >
                {/* Content */}
                <div className="relative z-10">
                  <motion.h3
                    layoutId={`title-${sponsor.id}`}
                    className="text-2xl md:text-4xl font-heading uppercase tracking-wide mb-2"
                    style={{ color: "#ffffff" }} // Always white on red card
                  >
                    {sponsor.title}
                  </motion.h3>

                  {/* Subtle Role Text */}
                  <motion.p
                    layoutId={`role-${sponsor.id}`}
                    className="text-xs md:text-sm font-body uppercase tracking-widest opacity-80"
                    style={{ color: "#ffffff" }}
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
                  className="absolute inset-0 backdrop-blur-md transition-colors duration-500"
                  style={{
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(0,0,0,0.9)"
                        : "rgba(255,255,255,0.8)",
                  }}
                />

                <motion.div
                  layoutId={`card-${expandedTier.id}`}
                  transition={spring}
                  className="w-full max-w-3xl border rounded-2xl overflow-hidden relative z-10 shadow-2xl transition-colors duration-500"
                  style={{
                    backgroundColor: theme === "dark" ? "#0a0a0a" : "#ffffff",
                    borderColor: "#e62429",
                  }}
                >
                  <div className="p-8 md:p-12">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex gap-6 items-center">
                        <div className="text-4xl">{expandedTier.icon}</div>
                        <div>
                          <motion.h2
                            layoutId={`title-${expandedTier.id}`}
                            className="text-4xl md:text-6xl font-heading uppercase mb-2"
                            style={{
                              color: theme === "dark" ? "#fff" : "#000",
                            }}
                          >
                            {expandedTier.title}
                          </motion.h2>
                          <motion.p
                            layoutId={`role-${expandedTier.id}`}
                            className="text-xl font-body font-bold"
                            style={{ color: "#e62429" }}
                          >
                            {expandedTier.role}
                          </motion.p>
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedTier(null)}
                        className={`p-2 rounded-full transition-colors duration-300 hover:bg-red-500 hover:text-white`}
                        style={{ color: "#9ca3af" }}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>

                    <div
                      className="h-[2px] w-full mb-8"
                      style={{ background: "#e62429", opacity: 0.3 }}
                    ></div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4
                          className="font-heading text-xl mb-4 uppercase tracking-wider"
                          style={{ color: "#e62429" }}
                        >
                          Perks & Branding
                        </h4>
                        <ul className="space-y-3">
                          {expandedTier.rewards.map((reward, i) => (
                            <li
                              key={i}
                              className={`flex items-center font-body transition-colors duration-500 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                            >
                              <span className="w-2 h-2 bg-red-600 rotate-45 mr-3"></span>
                              {reward}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div
                        className="p-6 rounded-xl border transition-colors duration-500"
                        style={{
                          backgroundColor:
                            theme === "dark" ? "#111" : "#f9f9f9",
                          borderColor: theme === "dark" ? "#333" : "#eee",
                        }}
                      >
                        <h4
                          className="font-heading text-xl mb-4 uppercase tracking-wider"
                          style={{ color: theme === "dark" ? "#fff" : "#000" }}
                        >
                          Company Profile
                        </h4>
                        <p
                          className={`font-body leading-relaxed transition-colors duration-500`}
                          style={{ color: "#9ca3af" }}
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
