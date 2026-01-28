"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const DomainCard = ({ domain, onClick, layoutId, index }) => {
  const { colors } = useTheme();

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
        delay: index * 0.15,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.02,
      y: -4,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8,
      },
    },
  };

  return (
    <motion.div
      layout
      layoutId={layoutId}
      variants={cardVariants}
      whileHover="hover"
      transition={{
        layout: { type: "spring", stiffness: 110, damping: 24, mass: 1 },
      }}
      className="relative group h-full min-h-[320px] md:min-h-[360px]"
    >
      {/* Main Domain Card */}
      <div
        className="rounded-xl border-2 overflow-hidden transition-all duration-300 h-full flex flex-col"
        style={{
          backgroundColor: colors.primary,
          borderColor: colors.accent,
          boxShadow: `0 10px 30px -5px ${colors.accent}20`,
        }}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick();
        }}
      >
        {/* Header Section */}
        <div
          className="p-4 border-b"
          style={{ borderColor: `${colors.accent}30` }}
        >
          {/* Icon and Title */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className="text-2xl p-2 rounded-lg"
                style={{
                  backgroundColor: `${colors.accent}20`,
                  color: colors.accent,
                }}
              >
                {domain.icon}
              </div>
              <div>
                <h3
                  className="text-lg font-bold"
                  style={{
                    color: colors.accent,
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {domain.title}
                </h3>
                <p
                  className="text-xs opacity-80"
                  style={{
                    color: colors.text,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {domain.description}
                </p>
              </div>
            </div>

            {/* Mission Status Indicator */}
            <div
              className="px-2 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: colors.accent,
                color: colors.primary,
              }}
            >
              ACTIVE
            </div>
          </div>

          {/* Vault-style decorative line */}
          <div
            className="h-0.5 w-full mb-3"
            style={{ backgroundColor: colors.accent }}
          />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div
                className="text-base font-bold"
                style={{ color: colors.accent }}
              >
                {domain.problems.length}
              </div>
              <div className="text-xs" style={{ color: colors.text }}>
                MISSIONS
              </div>
            </div>
            <div>
              <div
                className="text-base font-bold"
                style={{ color: colors.accent }}
              >
                {domain.problems.reduce(
                  (sum, p) => sum + parseInt(p.timeEstimate),
                  0,
                )}
                h
              </div>
              <div className="text-xs" style={{ color: colors.text }}>
                TOTAL TIME
              </div>
            </div>
            <div>
              <div
                className="text-base font-bold"
                style={{ color: colors.accent }}
              >
                $
                {domain.problems
                  .reduce(
                    (sum, p) =>
                      sum +
                      parseInt(p.prizes[0].split("$")[1].replace(",", "")),
                    0,
                  )
                  .toLocaleString()}
              </div>
              <div className="text-xs" style={{ color: colors.text }}>
                TOP PRIZE
              </div>
            </div>
          </div>
        </div>

        {/* Problem Statement Cards */}
        <div className="flex-grow p-3">
          <div className="text-center">
            <p
              className="text-xs opacity-70 mb-2"
              style={{
                color: colors.text,
                fontFamily: "var(--font-mono)",
              }}
            >
              Click to explore {domain.problems.length} missions
            </p>
            <div
              className="inline-block px-2 py-1 rounded-lg text-xs"
              style={{
                backgroundColor: `${colors.accent}15`,
                color: colors.accent,
                fontFamily: "var(--font-mono)",
              }}
            >
              EXPLORE MISSIONS →
            </div>
          </div>
        </div>

        {/* Money Heist-inspired mask pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, ${colors.accent} 0%, transparent 50%), 
                             radial-gradient(circle at 80% 20%, ${colors.accent} 0%, transparent 50%)`,
            }}
          />
        </div>
      </div>

      {/* Hover effect glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${colors.accent} 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
    </motion.div>
  );
};

export default DomainCard;
