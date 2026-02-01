"use client";

import { useEffect, useRef } from "react";

// Note: global-error.js must define its own html/body tags
// as it replaces the root layout when an error occurs

export default function GlobalError({ error, reset }) {
  const containerRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    // Log the global error
    console.error("Global Error:", error);

    // Simple fade in animation (no GSAP since we're outside the normal layout)
    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
      containerRef.current.style.transition = "opacity 0.5s ease-out";
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.opacity = "1";
        }
      }, 50);
    }

    // Animate quote characters manually
    if (quoteRef.current) {
      const text = "When everything falls apart, we start from scratch. That's what professionals do.";
      const chars = text.split("");
      quoteRef.current.innerHTML = chars
        .map((char, i) =>
          `<span class="quote-char" style="opacity: 0; display: inline-block; animation: charReveal 0.3s ease-out ${i * 0.02 + 0.5}s forwards;">${char === " " ? "&nbsp;" : char}</span>`
        )
        .join("");
    }
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Critical Error | HackHive</title>
        <style>{`
          :root {
            --background: #FCEDED;
            --foreground: #586068;
            --primary: #DA2F35;
            --primary-foreground: #FCEDED;
            --card: #FFFFFF;
            --border: rgba(88, 96, 104, 0.2);
          }
          
          @media (prefers-color-scheme: dark) {
            :root {
              --background: #1B1718;
              --foreground: #F2F3F4;
              --primary: #C4161C;
              --primary-foreground: #F2F3F4;
              --card: #252020;
              --border: rgba(242, 243, 244, 0.1);
            }
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            background: var(--background);
            color: var(--foreground);
            font-family: system-ui, -apple-system, sans-serif;
            min-height: 100vh;
          }
          
          @keyframes charReveal {
            from {
              opacity: 0;
              transform: translateY(10px) rotateX(-45deg);
            }
            to {
              opacity: 1;
              transform: translateY(0) rotateX(0);
            }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.05); }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
        `}</style>
      </head>
      <body>
        <div
          ref={containerRef}
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 24px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "32px",
              maxWidth: "560px",
              textAlign: "center",
            }}
          >
            {/* Critical Error Icon */}
            <div
              style={{
                position: "relative",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "rgba(218, 47, 53, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animation: "shake 0.6s ease-in-out" }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: "700",
                color: "var(--foreground)",
                lineHeight: "1.2",
              }}
            >
              Critical System Failure
            </h1>

            {/* Money Heist Quote */}
            <p
              ref={quoteRef}
              style={{
                fontSize: "1.125rem",
                color: "var(--foreground)",
                opacity: "0.7",
                lineHeight: "1.6",
                fontStyle: "italic",
                perspective: "1000px",
              }}
            >
              When everything falls apart, we start from scratch. That's what professionals do.
            </p>

            {/* Error Details */}
            {error?.digest && (
              <div
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "8px",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.875rem",
                    fontFamily: "monospace",
                    color: "var(--primary)",
                    opacity: "0.8",
                    wordBreak: "break-all",
                  }}
                >
                  Error ID: {error.digest}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginTop: "16px",
                width: "100%",
                maxWidth: "320px",
              }}
            >
              <button
                onClick={() => reset()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "14px 32px",
                  borderRadius: "8px",
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                  fontWeight: "600",
                  fontSize: "1rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(218, 47, 53, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Restart the Heist
              </button>
              <a
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "14px 32px",
                  borderRadius: "8px",
                  border: "2px solid var(--primary)",
                  color: "var(--primary)",
                  fontWeight: "600",
                  fontSize: "1rem",
                  textDecoration: "none",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(218, 47, 53, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Return to Base
              </a>
            </div>
          </div>

          {/* Decorative background blobs */}
          <div
            style={{
              position: "fixed",
              inset: "0",
              pointerEvents: "none",
              overflow: "hidden",
              zIndex: "-1",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "20%",
                left: "20%",
                width: "300px",
                height: "300px",
                background: "rgba(218, 47, 53, 0.05)",
                borderRadius: "50%",
                filter: "blur(60px)",
                animation: "pulse 4s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "20%",
                right: "20%",
                width: "250px",
                height: "250px",
                background: "rgba(218, 47, 53, 0.05)",
                borderRadius: "50%",
                filter: "blur(60px)",
                animation: "pulse 4s ease-in-out infinite 2s",
              }}
            />
          </div>
        </div>
      </body>
    </html>
  );
}
