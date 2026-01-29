"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  X,
  Clock,
  Trophy,
  Code,
  Target,
  Users,
  Calendar,
} from "lucide-react";

const ProblemStatementDetail = ({ problem, onClose, layoutId }) => {
  const { colors } = useTheme();

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.96,
      y: 12,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 22,
        mass: 1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 12,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.22, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          layout
          layoutId={layoutId}
          transition={{
            layout: { type: "spring", stiffness: 110, damping: 24, mass: 1 },
          }}
          className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border-2"
          style={{
            backgroundColor: colors.primary,
            borderColor: colors.accent,
          }}
        >
          {/* Header */}
          <div
            className="sticky top-0 p-6 border-b backdrop-blur-sm z-10"
            style={{ borderColor: `${colors.accent}30` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div
                    className="px-3 py-1 rounded text-sm font-bold"
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.primary,
                    }}
                  >
                    MISSION BRIEF
                  </div>
                </div>

                <h2
                  className="text-3xl font-black mb-2"
                  style={{
                    color: colors.accent,
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {problem.title}
                </h2>

                <p
                  className="text-lg opacity-90"
                  style={{
                    color: colors.text,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {problem.description}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors ml-4"
                style={{
                  backgroundColor: `${colors.accent}20`,
                  color: colors.text,
                }}
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: `${colors.accent}10`,
                  borderColor: `${colors.accent}30`,
                }}
              >
                <div className="flex items-center space-x-3">
                  <Clock style={{ color: colors.accent }} />
                  <div>
                    <div
                      className="text-sm opacity-70"
                      style={{ color: colors.text }}
                    >
                      Time Estimate
                    </div>
                    <div
                      className="text-xl font-bold"
                      style={{
                        color: colors.accent,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      12 h
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: `${colors.accent}10`,
                  borderColor: `${colors.accent}30`,
                }}
              >
                <div className="flex items-center space-x-3">
                  <Trophy style={{ color: colors.accent }} />
                  <div>
                    <div
                      className="text-sm opacity-70"
                      style={{ color: colors.text }}
                    >
                      Top Prize
                    </div>
                    <div
                      className="text-xl font-bold"
                      style={{
                        color: colors.accent,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {problem.prizes[0]}
                    </div>
                  </div>
                </div>
              </div>

             
            </div>

            {/* Full Description */}
            <div>
              <h3
                className="text-xl font-bold mb-4 flex items-center space-x-2"
                style={{
                  color: colors.accent,
                  fontFamily: "var(--font-heading)",
                }}
              >
                <Target size={24} />
                <span>Expected Solution</span>
              </h3>
              <p
                className="leading-relaxed"
                style={{
                  color: colors.text,
                  fontFamily: "var(--font-body)",
                  fontSize: "1.1rem",
                }}
              >
                {problem.fullDescription}
              </p>
            </div>

            {/* Technologies */}
            

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                className="flex-1 py-4 px-6 rounded-lg font-bold text-lg transition-all hover:scale-105"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  fontFamily: "var(--font-heading)",
                }}
              >
                ACCEPT MISSION
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-4 px-6 rounded-lg font-bold text-lg transition-all hover:scale-105 border-2"
                style={{
                  backgroundColor: "transparent",
                  color: colors.accent,
                  borderColor: colors.accent,
                  fontFamily: "var(--font-heading)",
                }}
              >
                REVIEW LATER
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProblemStatementDetail;
