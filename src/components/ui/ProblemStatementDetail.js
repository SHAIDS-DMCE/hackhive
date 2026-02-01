"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { X, Trophy, Users, Target, Code } from "lucide-react";

/**
 * Helper functions for downloading files (used by DomainModal and ProblemStatementDetail)
 */

/**
 * Safely produce a filename from a title and extension.
 */
const makeFileName = (title, ext) => {
  const safe = (title || "item").replace(/[^\w\d-_\.]/g, "_");
  return `${safe}_Problem_Statements.${ext}`;
};

/**
 * Try to extract a filename from a URL; otherwise return the fallback.
 */
const getFileNameFromUrl = (url, fallback) => {
  try {
    const u = new URL(url);
    const pathname = u.pathname;
    const last = pathname.split("/").filter(Boolean).pop();
    if (last) return decodeURIComponent(last.split("?")[0]);
  } catch (e) {
    // ignore and use fallback
  }
  return fallback;
};

/**
 * Download a Blob by creating an object URL and clicking an anchor.
 */
const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

/**
 * Convenience: download text content as a file.
 */
const downloadText = (text, filename) => {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  downloadBlob(blob, filename);
};

/**
 * Try to fetch a remote resource (PDF/etc.) and download it as a blob.
 * - Returns true if download/open succeeded, false otherwise.
 * - On CORS/fetch failure attempts to open the url in a new tab as a fallback.
 */
const fetchAndDownload = async (url, fallbackName) => {
  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) throw new Error("fetch failed");
    const blob = await response.blob();

    // determine extension from mime type
    const extFromMime = (() => {
      const t = blob.type || "";
      if (t.includes("pdf")) return "pdf";
      if (t.includes("text")) return "txt";
      return null;
    })();

    const filename = getFileNameFromUrl(
      url,
      makeFileName(fallbackName, extFromMime || "pdf"),
    );
    downloadBlob(blob, filename);
    return true;
  } catch (err) {
    // fetch failed (likely CORS) -> try opening the URL in a new tab for manual download
    try {
      window.open(url, "_blank", "noopener,noreferrer");
      return true;
    } catch (openErr) {
      return false;
    }
  }
};

/**
 * ProblemStatementDetail
 * - Traditional (non-animated) modal implementation
 * - Locks background scroll while open and restores scroll on close
 * - Content and layout mirror previous modal output but without framer-motion
 */

/**
 * generateDomainText
 * - Builds a plain-text representation of a domain and its problems (used as fallback download)
 */
const generateDomainText = (domain) => {
  let content = `Domain: ${domain.title || "Untitled"}\n`;
  content += `Description: ${domain.description || ""}\n\n`;
  content += `Problems (${(domain.problems && domain.problems.length) || 0}):\n\n`;
  if (Array.isArray(domain.problems)) {
    domain.problems.forEach((problem, idx) => {
      content += `${idx + 1}. ${problem.title || "Untitled Problem"}\n\n`;
      content += `${problem.fullDescription || problem.description || ""}\n\n`;
    });
  }
  return content;
};

const ProblemStatementDetail = ({ problem, onClose }) => {
  const { colors } = useTheme();
  const scrollYRef = useRef(0);

  // Download single problem statement (PS). Will try problem PDF/cdn first, then fallback to text.
  const handleDownloadPS = async (ps, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const cdnUrl = ps?.pdfUrl || ps?.cdnUrl || null;
    const fallbackName = makeFileName(ps?.title || "problem_statement", "txt");
    if (cdnUrl) {
      const ok = await fetchAndDownload(cdnUrl, fallbackName);
      if (ok) return;
    }
    // fallback: generate text
    const text = `Title: ${ps?.title || ""}\n\n${ps?.fullDescription || ps?.description || ""}\n\nRequirements:\n${(ps?.requirements || []).map((r, i) => `${i + 1}. ${r}`).join("\n")}`;
    downloadText(text, makeFileName(ps?.title || "problem_statement", "txt"));
  };

  useEffect(() => {
    // Store scroll position and lock body (iOS-friendly)
    const scrollY = window.scrollY || window.pageYOffset || 0;
    scrollYRef.current = scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Restore body and scroll position
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.scrollTo(0, scrollYRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        onClick={onClose}
      />

      {/* Modal container (non-animated) */}
      <div
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border-2 z-50"
        style={{
          backgroundColor: colors.primary,
          borderColor: colors.accent,
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
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
              className="p-2 rounded-lg transition-colors ml-4 cursor-pointer flex items-center justify-center"
              style={{
                backgroundColor: `${colors.accent}20`,
                color: colors.text,
              }}
              aria-label="Close details"
            >
              {/* Show text on md+ screens, and an icon on smaller screens */}
              <span className="hidden md:inline font-medium">CLOSE</span>
              <span className="inline md:hidden">
                <X size={18} />
              </span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Quick Stats: First Prize & Runner Up */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    First Prize
                  </div>
                  <div
                    className="text-xl font-bold"
                    style={{
                      color: colors.accent,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {Array.isArray(problem.prizes) && problem.prizes[0]
                      ? problem.prizes[0]
                      : "TBD"}
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
                <Users style={{ color: colors.accent }} />
                <div>
                  <div
                    className="text-sm opacity-70"
                    style={{ color: colors.text }}
                  >
                    Runner Up
                  </div>
                  <div
                    className="text-xl font-bold"
                    style={{
                      color: colors.accent,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {Array.isArray(problem.prizes) && problem.prizes[1]
                      ? problem.prizes[1]
                      : "TBD"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expected Solution */}
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
          {problem.technologies && problem.technologies.length > 0 && (
            <div>
              <h3
                className="text-xl font-bold mb-4"
                style={{
                  color: colors.accent,
                  fontFamily: "var(--font-heading)",
                }}
              >
                <Code size={20} /> Technologies
              </h3>
              <div
                className="flex flex-wrap gap-2"
                style={{ color: colors.text, fontFamily: "var(--font-mono)" }}
              >
                {problem.technologies.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: `${colors.accent}10`,
                      border: `1px solid ${colors.accent}20`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables */}
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{
                color: colors.accent,
                fontFamily: "var(--font-heading)",
              }}
            >
              Deliverables
            </h3>

            <ul
              className="list-disc pl-5 space-y-2"
              style={{ color: colors.text, fontFamily: "var(--font-body)" }}
            >
              <li>
                <strong>Expected solution:</strong>{" "}
                {problem.fullDescription ? (
                  <span>{problem.fullDescription}</span>
                ) : (
                  <span>{problem.description}</span>
                )}
              </li>

              {problem.requirements && problem.requirements.length > 0 && (
                <li>
                  <strong>Requirements / Acceptance criteria:</strong>
                  <ul className="list-decimal pl-5 mt-2 space-y-1">
                    {problem.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </li>
              )}

              {/* Additional deliverables if provided */}
              {problem.deliverables && problem.deliverables.length > 0 && (
                <li>
                  <strong>Additional deliverables:</strong>
                  <ul className="pl-5 mt-2 space-y-1">
                    {problem.deliverables.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
          </div>
          {/* Download PS Button (same as card) */}
          <div
            className="p-3 border-t"
            style={{ borderColor: `${colors.accent}30` }}
          />

          {/* NOTE: Action buttons removed per request */}
        </div>
      </div>
    </div>
  );
};

/**
 * DomainModal
 * - Traditional (non-animated) modal to show a Domain with its problems.
 * - Designed to replace the previous animated domain expansion.
 * - Exported as a named component so ProblemStatements can import it and use it.
 */
export const DomainModal = ({ domain, onClose }) => {
  const { colors } = useTheme();
  const scrollYRef = useRef(0);

  useEffect(() => {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    scrollYRef.current = scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.scrollTo(0, scrollYRef.current);
    };
  }, []);

  if (!domain) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center p-4 pt-12">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-xl border-2 z-50 bg-white"
        style={{ backgroundColor: colors.primary, borderColor: colors.accent }}
      >
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black break-words leading-tight"
                style={{
                  color: colors.accent,
                  fontFamily: "var(--font-heading)",
                }}
              >
                {domain.title}
              </h2>
              <p
                className="text-base md:text-lg mt-2 break-words whitespace-normal"
                style={{
                  color: colors.text,
                  fontFamily: "var(--font-body)",
                  wordBreak: "break-word",
                }}
              >
                {domain.description}
              </p>
            </div>

            <button
              className="px-4 py-2 rounded-lg border cursor-pointer flex items-center justify-center"
              style={{
                borderColor: colors.accent,
                color: colors.text,
                backgroundColor: `${colors.accent}15`,
                fontFamily: "var(--font-mono)",
              }}
              onClick={onClose}
            >
              {/* Show text on sm+ screens, and an icon on mobile for a compact close button */}
              <span className="hidden sm:inline">CLOSE</span>
              <span className="inline sm:hidden">
                <X size={18} />
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {domain.problems &&
              domain.problems.map((problem) => (
                <div
                  key={problem.id}
                  className="p-4 rounded-lg border cursor-pointer"
                  style={{
                    backgroundColor: `${colors.accent}08`,
                    borderColor: `${colors.accent}20`,
                  }}
                >
                  <h3
                    className="font-heading text-sm sm:text-base md:text-base font-bold mb-2 break-words"
                    style={{ color: colors.accent }}
                  >
                    {problem.title}
                  </h3>
                  <p
                    className="text-xs sm:text-sm md:text-sm break-words whitespace-normal"
                    style={{
                      color: colors.text,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {problem.description}
                  </p>
                </div>
              ))}
          </div>

          {/* Download PDF Button (domain) */}
          <div
            className="p-3 border-t"
            style={{ borderColor: `${colors.accent}30` }}
          >
            {/* <button
              className="w-full py-2 px-3 rounded-lg text-xs cursor-pointer font-medium transition-all hover:scale-105 flex items-center justify-center space-x-2"
              style={{
                backgroundColor: colors.accent,
                color: colors.primary,
                border: `2px solid ${colors.accent}`,
                fontFamily: "var(--font-mono)",
                fontWeight: "bold",
                boxShadow: `0 4px 12px ${colors.accent}40`,
              }}
              onClick={async (e) => {
                e.stopPropagation();
                const cdnUrl = domain?.pdfUrl || domain?.cdnUrl || null;
                const fallbackName = makeFileName(
                  domain?.title || "domain",
                  "pdf",
                );
                if (cdnUrl) {
                  const ok = await fetchAndDownload(cdnUrl, fallbackName);
                  if (ok) return;
                }
                // fallback -> generate text and download
                const txt = generateDomainText(domain || {});
                downloadText(
                  txt,
                  makeFileName(domain?.title || "domain", "txt"),
                );
              }}
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
            </button>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemStatementDetail;
