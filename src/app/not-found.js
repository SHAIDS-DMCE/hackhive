"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function NotFound() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    // Animate the 404 text
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }

    // Animate the subtitle
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out" }
      );
    }

    // Animate the quote with character reveal
    if (quoteRef.current) {
      const text = "You're looking for something that doesn't exist. Just like our alibis.";
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
          delay: 0.6,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 py-12">
      <div className="flex flex-col items-center gap-8 max-w-xl text-center">
        {/* 404 Number */}
        <div className="relative">
          <h1
            ref={titleRef}
            className="text-[10rem] md:text-[14rem] font-black text-primary leading-none tracking-tighter"
            style={{ textShadow: "0 4px 30px rgba(218, 47, 53, 0.3)" }}
          >
            404
          </h1>
          {/* Decorative line */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary rounded-full" />
        </div>

        {/* Subtitle */}
        <h2
          ref={subtitleRef}
          className="text-2xl md:text-3xl font-semibold text-foreground"
        >
          Page Not Found
        </h2>

        {/* Money Heist Quote */}
        <p
          ref={quoteRef}
          className="text-lg text-foreground/70 leading-relaxed italic"
          style={{ perspective: "1000px" }}
        >
          You're looking for something that doesn't exist. Just like our alibis.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Return to the Plan
        </Link>
      </div>

      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
