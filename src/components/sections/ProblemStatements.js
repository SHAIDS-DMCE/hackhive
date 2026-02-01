"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useSimpleScrollLock } from "@/hooks/useSimpleScrollLock";
import DomainCard from "@/components/ui/DomainCard";
import ProblemStatementCard from "@/components/ui/ProblmeStatementCard";
import ProblemStatementDetail, {
  DomainModal,
} from "@/components/ui/ProblemStatementDetail";
import problemsData from "@/assets/Domains.json";

const ProblemStatements = () => {
  const { colors } = useTheme();
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [expandedDomainId, setExpandedDomainId] = useState(null);
  const sectionRef = useRef(null);

  // Disable main page scroll when interacting with any PS elements
  // Enable scroll only when back at domain cards (both states are null)
  const shouldLockScroll =
    selectedProblem !== null || expandedDomainId !== null;
  useSimpleScrollLock(shouldLockScroll);

  // Domain icons, descriptions and CDN PDF placeholders mapping
  // NOTE: Add your ImageKit CDN URL strings to `pdfUrl` later (e.g. https://ik.imagekit.io/your_path/yourfile.pdf)
  const domainMetadata = {
    Healthcare: {
      icon: "🏥",
      shortDescription: "Transforming medical technology",
      description:
        "Improving healthcare access through offline-first tools, digital records, and efficient grassroots health systems.",
      pdfUrl:
        "https://ik.imagekit.io/igsnxowfs/HackHive%202026/Healthcare%20PS.pdf",
    },
    Cybersecurity: {
      icon: "🔐",
      shortDescription: "Securing digital systems",
      description:
        "Protecting users from digital threats using phishing detection, privacy tools, and deepfake awareness systems.",
      pdfUrl:
        "https://ik.imagekit.io/igsnxowfs/HackHive%202026/Cybersecurity%20PS.pdf",
    },
    "Smart Living & Consumer Tech": {
      icon: "💡",
      shortDescription: "Empowering everyday innovation",
      description:
        "Simplifying daily life with smart tools for warranties, government schemes, and NGO coordination platforms.",
      pdfUrl:
        "https://ik.imagekit.io/igsnxowfs/HackHive%202026/Smart%20Living%20&%20Consumer%20tech%20PS.pdf",
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
          // shortDescription: single-line, hardcoded in domainMetadata
          shortDescription:
            domainMetadata[domainName]?.shortDescription ||
            "Problem statements",
          // description: longer (10-15 words) place to store more detail
          description: domainMetadata[domainName]?.description || "",
          // Domain-level CDN PDF (ImageKit) placeholder — fill with actual CDN link later
          pdfUrl: domainMetadata[domainName]?.pdfUrl || null,
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
        // technologies: ["React", "Node.js", "MongoDB", "TypeScript"],
        requirements: [
          "Build a scalable web application",
          "Implement real-time features",
          "Ensure responsive design",
          "Write comprehensive tests",
        ],
        prizes: ["₹6000", "₹3000"],
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
              className="relative text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight mb-4 leading-tight break-words whitespace-normal"
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
                shortDescription={domain.shortDescription}
                des={domain.description}
                onClick={() => setExpandedDomainId(domain.id)}
                layoutId={`domain-${domain.id}`}
                index={index}
              />
            ))}
          </motion.div>

          {expandedDomain && (
            <DomainModal
              domain={expandedDomain}
              cdnUrl={expandedDomain.pdfUrl}
              onClose={() => setExpandedDomainId(null)}
            />
          )}

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
