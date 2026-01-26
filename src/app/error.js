"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Error({ error, reset }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    // Log the error for debugging
    console.error("Application Error:", error);

    // Animate container fade in
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }

    // Animate the error icon with shake
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.5, rotate: -10 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        }
      );
    }

    // Animate the quote
    if (quoteRef.current) {
      const text = "Every plan has a flaw. This is ours. But we adapt.";
      const chars = text.split("");
      quoteRef.current.innerHTML = chars
        .map((char) => `<span class="quote-char">${char === " " ? "&nbsp;" : char}</span>`)
        .join("");

      const charElements = quoteRef.current.querySelectorAll(".quote-char");
      gsap.fromTo(
        charElements,
        { opacity: 0, y: 15, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.04,
          stagger: 0.025,
          delay: 0.4,
          ease: "power2.out",
        }
      );
    }
  }, [error]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-background px-6 py-12"
    >
      <div className="flex flex-col items-center gap-8 max-w-xl text-center">
        {/* Error Icon */}
        <div
          ref={titleRef}
          className="relative w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <svg
            className="w-14 h-14 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Something Went Wrong
        </h1>

        {/* Money Heist Quote */}
        <p
          ref={quoteRef}
          className="text-lg text-foreground/70 leading-relaxed italic"
          style={{ perspective: "1000px" }}
        >
          Every plan has a flaw. This is ours. But we adapt.
        </p>

        {/* Error Details (development only) */}
        {process.env.NODE_ENV === "development" && error?.message && (
          <div className="w-full p-4 rounded-lg bg-card border border-border">
            <p className="text-sm font-mono text-destructive/80 break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border-2 border-primary text-primary font-medium text-lg transition-all duration-300 hover:bg-primary/10"
          >
            Back to Safety
          </a>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
