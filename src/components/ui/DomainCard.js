"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const DomainCard = ({ domain, onClick, layoutId, index }) => {
  const { colors } = useTheme();

  const handleDownloadPDF = (domain) => {
    // Create PDF content for the domain's problem statements
    const pdfContent = generatePDFContent(domain);
    
    // Create a blob and download
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${domain.title.replace(/\s+/g, '_')}_Problem_Statements.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const generatePDFContent = (domain) => {
    let content = `${domain.title.toUpperCase()} - PROBLEM STATEMENTS\n`;
    content += `${domain.description}\n`;
    content += `${'='.repeat(80)}\n\n`;
    
    domain.problems.forEach((problem, index) => {
      content += `PROBLEM ${index + 1}: ${problem.title}\n`;
      content += `${'-'.repeat(40)}\n`;
      content += `Description: ${problem.description}\n\n`;
      content += `Expected Solution: ${problem.fullDescription}\n\n`;
      content += `Difficulty: ${problem.difficulty}\n`;
      content += `Time Estimate: ${problem.timeEstimate}\n`;
      content += `Technologies: ${problem.technologies.join(', ')}\n`;
      content += `Prizes: ${problem.prizes.join(', ')}\n\n`;
      
      if (problem.requirements && problem.requirements.length > 0) {
        content += `Requirements:\n`;
        problem.requirements.forEach((req, reqIndex) => {
          content += `${reqIndex + 1}. ${req}\n`;
        });
        content += '\n';
      }
      content += `${'='.repeat(80)}\n\n`;
    });
    
    return content;
  };

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
      id = "domain_card"
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
                12
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

        {/* Download PDF Button */}
        <div className="p-3 border-t" style={{ borderColor: `${colors.accent}30` }}>
          <button
            className="w-full py-2 px-3 rounded-lg text-xs font-medium transition-all hover:scale-105 flex items-center justify-center space-x-2"
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
              border: `2px solid ${colors.accent}`,
              fontFamily: "var(--font-mono)",
              fontWeight: "bold",
              boxShadow: `0 4px 12px ${colors.accent}40`,
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              // Download PDF functionality
              handleDownloadPDF(domain);
            }}
            title={`Download PDF for ${domain.title} problem statements`}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>DOWNLOAD PDF</span>
          </button>
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
