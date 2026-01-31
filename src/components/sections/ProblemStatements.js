"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useSimpleScrollLock } from "@/hooks/useSimpleScrollLock";
import DomainCard from "@/components/ui/DomainCard";
import ProblemStatementCard from "@/components/ui/ProblmeStatementCard";
import ProblemStatementDetail from "@/components/ui/ProblemStatementDetail";
import problemsData from "@/assets/Domains.json";

const ProblemStatements = () => {
  const { colors } = useTheme();
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [expandedDomainId, setExpandedDomainId] = useState(null);
  const sectionRef = useRef(null);

  // Disable main page scroll when interacting with any PS elements
  // Enable scroll only when back at domain cards (both states are null)
  const shouldLockScroll = selectedProblem !== null || expandedDomainId !== null;
  useSimpleScrollLock(shouldLockScroll);

  // Domain icons and descriptions mapping
  const domainMetadata = {
    Healthcare: {
      icon: "🏥",
      description: "Transforming medical technology",
    },
    Cybersecurity: {
      icon: "🔐",
      description: "Securing digital systems",
    },
    "Smart Living & Consumer Tech": {
      icon: "💡",
      description: "Empowering everyday innovation",
    },
  };

  // Transform flat problems array into grouped domains
  const domains = useMemo(() => {
    const grouped = {};

    problemsData.forEach((problem) => {
      const domainName = problem.domain;
      if (!grouped[domainName]) {
        grouped[domainName] = {
          id: domainName
            .toLowerCase()
            .replace(/\s+&\s+/g, "-")
            .replace(/\s+/g, "-"),
          title: domainName,
          icon: domainMetadata[domainName]?.icon || "🎯",
          description:
            domainMetadata[domainName]?.description || "Problem statements",
          problems: [],
        };
      }

      grouped[domainName].problems.push({
        id: problem.id,
        title: problem.name,
        description: problem.description,
        fullDescription: problem.expectedSolution,
        difficulty: "Medium",
        timeEstimate: "24-48h",
        technologies: ["React", "Node.js", "MongoDB", "TypeScript"],
        requirements: [
          "Build a scalable web application",
          "Implement real-time features",
          "Ensure responsive design",
          "Write comprehensive tests"
        ],
        prizes: ["$5,000", "$2,500", "$1,250"],
      });
    });

    return Object.values(grouped);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        mass: 1,
        duration: 0.8,
      },
    },
  };

  const expandedDomain = expandedDomainId
    ? domains.find((d) => d.id === expandedDomainId)
    : null;

  return (
    <div
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: colors.primary }}
    >
      {/* Money Heist-inspired background pattern */}
      <div className="absolute inset-0 opacity-0">
        <div className="h-full w-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Bold Title Section */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h1
              className="relative text-6xl md:text-8xl font-black tracking-tight mb-4"
              style={{
                color: colors.accent,
                fontFamily: "var(--font-heading)",
                textShadow: "2px 2px 0px rgba(0,0,0,0.3)",
              }}
            >
              Problem Statements
            </h1>
          </div>

          {/* Vault-style divider */}
          <div className="flex items-center justify-center mb-6">
            <div
              className="h-1 w-20"
              style={{ backgroundColor: colors.accent }}
            />
            <div className="mx-4 text-2xl" style={{ color: colors.text }}>
              ◈
            </div>
            <div
              className="h-1 w-20"
              style={{ backgroundColor: colors.accent }}
            />
          </div>

          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            style={{
              color: colors.text,
              fontFamily: "var(--font-body)",
            }}
          >
            Choose Your Mission. Crack the Code. Win the Prize.
          </p>
        </motion.div>

        {/* Domain Cards Grid */}
        <LayoutGroup>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {domains.map((domain, index) => (
              <DomainCard
                key={domain.id}
                domain={domain}
                onClick={() => setExpandedDomainId(domain.id)}
                layoutId={`domain-${domain.id}`}
                index={index}
              />
            ))}
          </motion.div>

          <AnimatePresence>
            {expandedDomain && (
              <motion.div
                className="fixed inset-0 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
                  onClick={() => setExpandedDomainId(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />

                <motion.div
                  layout
                  layoutId={`domain-${expandedDomain.id}`}
                  className="relative h-full w-full overflow-y-auto"
                  style={{ backgroundColor: colors.primary }}
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 110,
                      damping: 24,
                      mass: 1,
                    },
                  }}
                >
                  <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-10">
                    <div className="flex items-start justify-between gap-4 mb-8">
                      <div>
                        <h2
                          className="text-4xl md:text-6xl font-black"
                          style={{
                            color: colors.accent,
                            fontFamily: "var(--font-heading)",
                          }}
                        >
                          {expandedDomain.title}
                        </h2>
                        <p
                          className="text-base md:text-lg mt-2"
                          style={{
                            color: colors.text,
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {expandedDomain.description}
                        </p>
                      </div>

                      <button
                        className="px-4 py-2 rounded-lg border"
                        style={{
                          borderColor: colors.accent,
                          color: colors.text,
                          backgroundColor: `${colors.accent}15`,
                          fontFamily: "var(--font-mono)",
                        }}
                        onClick={() => setExpandedDomainId("#problem-statements")}
                      >
                        CLOSE
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {expandedDomain.problems.map((problem, idx) => (
                        <ProblemStatementCard
                          key={problem.id}
                          problem={problem}
                          index={idx}
                          layoutId={`problem-${problem.id}`}
                          onClick={() => setSelectedProblem(problem)}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedProblem && (
              <ProblemStatementDetail
                problem={selectedProblem}
                layoutId={`problem-${selectedProblem.id}`}
                onClose={() => setSelectedProblem(null)}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </div>
  );
};

export default ProblemStatements;
