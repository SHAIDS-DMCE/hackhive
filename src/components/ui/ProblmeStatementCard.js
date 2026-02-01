"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { ChevronRight } from "lucide-react";

const ProblemStatementCard = ({ problem, onClick, index, layoutId }) => {
  const { colors } = useTheme();

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        mass: 1,
        delay: index * 0.1,
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.02,
      x: 4,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.6,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 30,
        mass: 0.5,
      },
    },
  };

  return (
    <motion.div
      layout
      layoutId={layoutId}
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      transition={{
        layout: { type: "spring", stiffness: 100, damping: 20, mass: 1 },
      }}
      className="cursor-pointer relative group h-full"
    >
      <div
        className="rounded-2xl border p-8 transition-all duration-300 flex flex-col"
        style={{
          backgroundColor: `${colors.accent}10`,
          borderColor: `${colors.accent}40`,
        }}
      >
        {/* Header */}
        <div className="mb-6">
          <h4
            className="font-bold text-3xl mb-3"
            style={{
              color: colors.text,
              fontFamily: "var(--font-heading)",
            }}
          >
            {problem.title}
          </h4>
          <p
            className="text-lg opacity-80"
            style={{
              color: colors.text,
              fontFamily: "var(--font-body)",
              whiteSpace: "pre-wrap",
            }}
          >
            {problem.fullDescription || problem.description}
          </p>
        </div>

        {/* Footer Action */}
        <div className="flex items-center justify-between mt-auto">
          <div /> {/* spacer to keep VIEW aligned right */}
          <div
            className="flex items-center space-x-2 text-base opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ color: colors.accent }}
          >
            <span style={{ fontFamily: "var(--font-mono)" }}>VIEW</span>
            <ChevronRight
              size={22}
              className="group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>

        {/* Money Heist-inspired hover overlay */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${colors.accent} 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Subtle glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${colors.accent} 0%, transparent 70%)`,
          filter: "blur(8px)",
        }}
      />
    </motion.div>
  );
};

export default ProblemStatementCard;
