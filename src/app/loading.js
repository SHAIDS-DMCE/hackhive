"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { useLoading } from "@/context/LoadingContext";

const MONEY_HEIST_QUOTES = [
  "The plan is designed to survive any setbacks.",
  "We are the resistance.",
  "Time is greater than money.",
  "First time is always the hardest.",
  "In this world, everything is governed by balance.",
  "Let the chaos begin.",
  "O Bella ciao, bella ciao, bella ciao ciao ciao!",
  "The moment you start thinking, you forget about your life.",
  "When someone is in love, they look for ways to find themselves.",
  "Hope is the only thing stronger than fear.",
  "In the end, we are all stories.",
  "Every story has a beginning, a middle, and an end.",
  "The heist is not about the money. It's about sending a message.",
  "We don't choose our family. We don't choose our name.",
  "Sometimes you have to fight for what you love.",
];

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Loading() {
  // Get progress from context
  const { progress: contextProgress } = useLoading();

  // Randomize quotes on mount
  const randomizedQuotes = useMemo(() => shuffleArray(MONEY_HEIST_QUOTES), []);

  const [displayProgress, setDisplayProgress] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const quoteRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);

  // Set mounted state to avoid hydration mismatch with randomized quotes
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Smoothly animate progress display
  useEffect(() => {
    gsap.to({ val: displayProgress }, {
      val: contextProgress,
      duration: 0.3,
      ease: "power1.out",
      onUpdate: function () {
        setDisplayProgress(this.targets()[0].val);
      }
    });
  }, [contextProgress]);

  // Animate progress number with GSAP pulse
  useEffect(() => {
    if (!progressRef.current) return;

    gsap.to(progressRef.current, {
      scale: 1.03,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
  }, [Math.floor(displayProgress / 10)]); // Pulse every 10%

  // Change quote at progress milestones
  useEffect(() => {
    const milestones = [0, 15, 30, 45, 60, 75, 90];
    const currentMilestone = milestones.filter(m => displayProgress >= m).length - 1;

    if (currentMilestone !== currentQuoteIndex && currentMilestone < randomizedQuotes.length) {
      if (quoteRef.current) {
        gsap.to(quoteRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          onComplete: () => {
            setCurrentQuoteIndex(currentMilestone);
            gsap.set(quoteRef.current, { y: 10 });
            gsap.to(quoteRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.3,
            });
          },
        });
      }
    }
  }, [displayProgress, currentQuoteIndex, randomizedQuotes.length]);

  // Animate quote text reveal on index change
  useEffect(() => {
    if (!quoteRef.current) return;

    const text = randomizedQuotes[currentQuoteIndex] || "";
    const chars = text.split("");
    quoteRef.current.innerHTML = chars
      .map((char) => `<span class="quote-char">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    const charElements = quoteRef.current.querySelectorAll(".quote-char");

    gsap.fromTo(
      charElements,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.03, stagger: 0.02, ease: "power2.out" }
    );
  }, [currentQuoteIndex, randomizedQuotes]);

  // Animate loader dots
  useEffect(() => {
    const dots = containerRef.current?.querySelectorAll(".loader-dot");
    if (dots) {
      gsap.to(dots, {
        scale: 1.3,
        duration: 0.3,
        stagger: { each: 0.1, repeat: -1, yoyo: true },
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-colors duration-300"
    >
      {/* Main content wrapper */}
      <div className="flex flex-col items-center gap-10 px-6">
        {/* Progress number display */}
        <div className="relative">
          <div
            ref={progressRef}
            className="text-7xl sm:text-8xl md:text-9xl font-bold text-primary font-mono tracking-tight"
          >
            {Math.floor(displayProgress)}
            <span className="text-4xl sm:text-5xl md:text-6xl">%</span>
          </div>

          {/* Progress bar */}
          <div className="mt-4 w-full h-1 bg-foreground/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-200 ease-out"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
        </div>

        {/* Loader dots */}
        <div className="flex items-center gap-2">
          <div className="loader-dot w-2.5 h-2.5 rounded-full bg-primary" />
          <div className="loader-dot w-2.5 h-2.5 rounded-full bg-primary" />
          <div className="loader-dot w-2.5 h-2.5 rounded-full bg-primary" />
        </div>

        {/* Quote display */}
        <div className="max-w-md text-center min-h-[80px] flex items-center">
          <p ref={quoteRef} className={"text-base md:text-lg font-medium text-foreground/80 leading-relaxed tracking-wide italic"}>
            {isMounted ? randomizedQuotes[currentQuoteIndex] : ""}
          </p>
        </div>

        {/* Loading status text */}
        <p className="text-xs text-foreground/50 uppercase tracking-[0.3em] font-mono">
          Initializing Heist Protocol
        </p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
