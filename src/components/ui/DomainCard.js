
"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

/**
 * DomainCard
 *
 * - Cleans up duplicate/unfinished code from previous version.
 * - Implements downloading a PDF from a CDN URL if available.
 *   - Tries to fetch the remote file as a blob and download it with a filename.
 *   - If fetching fails (likely due to CORS), falls back to opening the URL in a new tab.
 * - Falls back to generating a plain-text file with problem statements when no CDN/pdf URL is present.
 */

const DomainCard = ({
  domain,
  onClick,
  layoutId,
  index,
  des,
  shortDescription,
}) => {
  const { colors } = useTheme();

  // Helper: safely create a filename from domain title and an extension
  const makeFileName = (title, ext) => {
    const safe = (title || "domain").replace(/[^\w\d-_\.]/g, "_");
    return `${safe}_Problem_Statements.${ext}`;
  };

  // Helper: try to derive a filename from a URL (falls back to provided fallback)
  const getFileNameFromUrl = (url, fallback) => {
    try {
      const u = new URL(url);
      const pathname = u.pathname;
      const last = pathname.split("/").filter(Boolean).pop();
      if (last) return decodeURIComponent(last.split("?")[0]);
    } catch (e) {
      // ignore
    }
    return fallback;
  };

  // Fallback generator for textual representation of problems (used when no PDF available)
  const generateTextContent = (domain) => {
    let content = `Domain: ${domain.title || "Untitled"}\n`;
    content += `Description: ${domain.description || ""}\n\n`;
    content += `Problems (${(domain.problems && domain.problems.length) || 0}):\n\n`;

    if (Array.isArray(domain.problems)) {
      domain.problems.forEach((problem, idx) => {
        content += `${idx + 1}. ${problem.title || "Untitled Problem"}\n\n`;
        if (problem.fullDescription) {
          content += `${problem.fullDescription}\n\n`;
        } else if (problem.description) {
          content += `${problem.description}\n\n`;
        }
        if (problem.difficulty) content += `Difficulty: ${problem.difficulty}\n`;
        if (problem.timeEstimate) content += `Time Estimate: ${problem.timeEstimate}\n`;
        if (problem.technologies && problem.technologies.length)
          content += `Technologies: ${problem.technologies.join(", ")}\n`;
        if (problem.prizes && problem.prizes.length)
          content += `Prizes: ${problem.prizes.join(", ")}\n`;
        if (problem.requirements && problem.requirements.length) {
          content += `Requirements:\n`;
          problem.requirements.forEach((req, rIdx) => {
            content += `  ${rIdx + 1}. ${req}\n`;
          });
        }
        content += `${"=".repeat(80)}\n\n`;
      });
    }

    return content;
  };

  // Download handler: prefer CDN/pdf URL when available
  const handleDownloadPDF = async (domain, e) => {
    if (e && e.stopPropagation) e.stopPropagation();

    const cdnUrl = domain?.pdfUrl || domain?.cdnUrl || domain?.pdf || null;

    if (cdnUrl) {
      // Try to fetch the remote resource as a blob to force a download and provide a filename.
      // If fetch fails due to CORS, fallback to opening the URL in a new tab/window.
      try {
        const response = await fetch(cdnUrl, { mode: "cors" });
        if (!response.ok) {
          throw new Error(`Failed to fetch resource: ${response.status}`);
        }
        const blob = await response.blob();

        // Determine filename and extension
        const extFromMime = (() => {
          const t = blob.type || "";
          if (t.includes("pdf")) return "pdf";
          if (t.includes("text")) return "txt";
          return null;
        })();

        const fallbackName = makeFileName(domain?.title, extFromMime || "pdf");
        const filename = getFileNameFromUrl(cdnUrl, fallbackName);

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        // In some cases browser will ignore download attribute for cross-origin; still try
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        return;
      } catch (err) {
        // Fetch failed (likely CORS) -> fallback to opening in new tab for user to download manually
        try {
          window.open(cdnUrl, "_blank", "noopener,noreferrer");
          return;
        } catch (openErr) {
          // If even that fails, continue to fallback generation
          // (We intentionally don't rethrow; we'll fallback to generated text)
        }
      }
    }

    // No CDN/pdf available or all attempts failed -> generate text fallback and download
    try {
      const text = generateTextContent(domain || {});
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = makeFileName(domain?.title, "txt");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (finalErr) {
      // If everything fails, as a last resort open a new tab with the CDN link if present
      if (cdnUrl) {
        try {
          window.open(cdnUrl, "_blank", "noopener,noreferrer");
        } catch (e) {
          // nothing further we can do here
          /* intentionally empty */
        }
      }
    }
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
      id="domain_card"
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
                  {shortDescription ||
                    domain.shortDescription ||
                    domain.description}
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

          {/* Brief description (uses prop `des`). Render only when provided to avoid empty space. */}
          {des ? (
            <div className="mb-3">
              <p
                className="text-sm"
                style={{
                  color: colors.text,
                  fontFamily: "var(--font-body)",
                }}
              >
                {des}
              </p>
            </div>
          ) : null}
        </div>

        {/* Problem Statement Cards */}
        <div className="flex-grow p-3 flex items-center justify-center">
          <div className="text-center w-full">
            <p
              className="text-xs opacity-70 mb-2"
              style={{
                color: colors.text,
                fontFamily: "var(--font-mono)",
              }}
            >
              Click to explore {Array.isArray(domain.problems) ? domain.problems.length : 0} missions
            </p>
            <div
              className="inline-block px-2 py-1 rounded-lg text-xs cursor-pointer"
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
        <div
          className="p-3 border-t"
          style={{ borderColor: `${colors.accent}30` }}
        >
          <button
            className="w-full py-2 px-3 rounded-lg text-xs cursor-pointer font-medium transition-all hover:scale-105 flex items-center justify-center space-x-2"
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
              border: `2px solid ${colors.accent}`,
              fontFamily: "var(--font-mono)",
              fontWeight: "bold",
              boxShadow: `0 4px 12px ${colors.accent}40`,
            }}
            onClick={(e) => handleDownloadPDF(domain, e)}
            title={`Download PDF for ${domain.title} problem statements`}
            aria-label={`Download PDF for ${domain.title} problem statements`}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
