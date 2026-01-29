"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "@/context/LoadingContext";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Utility functions
function pad2(n) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function getTimeParts(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
}

// Animated Section component with GSAP
function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Glitch Text component
function GlitchText({ text, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    tl.to(el, { skewX: 2, duration: 0.1 })
      .to(el, { skewX: -2, duration: 0.1 })
      .to(el, { skewX: 0, duration: 0.1 })
      .to(el, { x: 2, duration: 0.05 })
      .to(el, { x: -2, duration: 0.05 })
      .to(el, { x: 0, duration: 0.05 });

    return () => tl.kill();
  }, []);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {text}
    </span>
  );
}

// Step Card with hover animation
function StepCard({ num, title, description, delay }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      },
    );

    // Hover effect
    const handleEnter = () => {
      gsap.to(card, {
        scale: 1.02,
        borderColor: "rgba(218, 47, 53, 0.5)",
        duration: 0.3,
      });
    };
    const handleLeave = () => {
      gsap.to(card, {
        scale: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.3,
      });
    };

    card.addEventListener("mouseenter", handleEnter);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mouseenter", handleEnter);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="flex gap-4 p-5 bg-white/[0.02] dark:bg-white/[0.02] border border-foreground/10 rounded-lg transition-colors"
    >
      <div className="text-2xl font-bold text-primary font-mono">{num}</div>
      <div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-foreground/70 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

// Feature Card with GSAP
function FeatureCard({ icon, title, description, delay }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      },
    );
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="p-5 bg-white/[0.02] dark:bg-white/[0.02] border border-foreground/10 rounded-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-6 h-6 border-2 border-primary rounded" />
        <span className="text-xs font-mono tracking-wider opacity-60">
          {title}
        </span>
      </div>
      <p className="text-foreground/70 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// Countdown Timer with GSAP pulse
function CountdownTimer({ targetDate }) {
  const [now, setNow] = useState(() => Date.now());
  const timerRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!timerRef.current) return;

    gsap.fromTo(
      timerRef.current,
      { scale: 1 },
      {
        scale: 1.02,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      },
    );
  }, [now]);

  const remainingMs = Math.max(0, targetDate.getTime() - now);
  const t = getTimeParts(remainingMs);

  return (
    <div
      ref={timerRef}
      className="font-mono text-4xl font-bold tracking-wide flex items-center gap-1"
    >
      <span>{pad2(t.hours)}</span>
      <span className="animate-pulse">:</span>
      <span>{pad2(t.minutes)}</span>
      <span className="animate-pulse">:</span>
      <span>{pad2(t.seconds)}</span>
    </div>
  );
}

// Risk Bar component
function RiskBars({ level = 4, max = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`w-5 h-1.5 rounded-sm ${i < level ? "bg-primary" : "bg-foreground/10"}`}
        />
      ))}
    </div>
  );
}

// Background Code Effect
function BackgroundCode() {
  const codeLines = [
    "ssh://hive-node  | auth=ok | route=shadow",
    "[OP] sync --team=4 --mode=stealth",
    "commit: clean  // build: armed  // exit: planned",
    "01001000 01100001 01100011 01101011",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none font-mono text-[10px]">
      <div className="animate-scroll-code">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap py-0.5">
            {codeLines[i % codeLines.length]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const { registerComponent, markComponentReady } = useLoading();

  const missionTarget = useMemo(() => new Date("2026-03-06T00:00:00Z"), []);

  // Register with loading context
  useEffect(() => {
    registerComponent("about");
    markComponentReady("about");
  }, [registerComponent, markComponentReady]);

  // GSAP Hero animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero elements
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 },
      );

      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 },
      );

      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.8 },
      );

      gsap.fromTo(
        ".hero-card",
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.6 },
      );

      // Laser line animation
      gsap.to(".laser-line", {
        opacity: 0.4,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        stagger: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen overflow-hidden bg-background text-foreground py-16 sm:py-24"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      <BackgroundCode />

      {/* Laser lines */}
      <div className="laser-line absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-10" />
      <div className="laser-line absolute top-[70%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-10" />

      {/* Main content */}
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-12">
          <span className="text-[10px] font-mono tracking-[0.2em] text-primary/70">
            TOP SECRET
          </span>
        </div>

        {/* Hero Section */}
        <div
          ref={heroRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
        >
          <div>
            <div className="text-xs font-mono tracking-[0.2em] text-primary mb-3">
              MISSION BRIEF // ABOUT
            </div>

            <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              <GlitchText text="WELCOME TO THE HEIST OF INNOVATION" />
            </h1>

            <p className="hero-subtitle text-lg text-foreground/70 mb-8 max-w-xl leading-relaxed">
              HackHive is a 12-hour hackathon organized by the{" "}
              <a
                href="https://shaidsdmce.app/"
                className=" text-red-500 font-bold underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                SHAIDS
              </a>{" "}
              (Students’ Hive Of Artificial Intelligence And Data Science )
              Committee of Datta Meghe College of Engineering (DMCE), Airoli,
              aimed at providing undergraduate students with a platform to
              innovate, collaborate, and build impactful technology-driven
              solutions.
            </p>

            <div className="hero-cta space-y-4">
              <div className="flex flex-wrap gap-4">
                <a
                  href="#brief"
                  className="inline-flex items-center px-6 py-3 bg-primary text-white font-mono text-sm font-semibold rounded hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                >
                  OPEN MISSION FILE
                </a>
                <a
                  href="#plan"
                  className="inline-flex items-center px-6 py-3 border border-foreground/20 text-foreground font-mono text-sm font-semibold rounded hover:border-primary hover:text-primary transition-all duration-300"
                >
                  VIEW HEIST PLAN
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded text-xs font-mono">
                  👥 TEAM MODE: 3–4 OPERATORS
                </span>
                <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded text-xs font-mono">
                  ⏳ 12 HR
                </span>
              </div>
            </div>
          </div>

          {/* Hero Card */}
          <div className="hero-card flex justify-center lg:justify-end">
            <div className="bg-white/[0.02] dark:bg-white/[0.03] border border-foreground/10 rounded-xl p-6 min-w-[300px]">
              <div className="text-[10px] font-mono tracking-wider opacity-60 mb-2">
                ⏱ MISSION COUNTDOWN
              </div>

              <CountdownTimer targetDate={missionTarget} />

              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-5" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] font-mono tracking-wider opacity-60">
                    DIFFICULTY
                  </div>
                  <div className="text-2xl font-bold mt-1">HIGH</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-wider opacity-60 mb-2">
                    RISK LEVEL
                  </div>
                  <RiskBars level={4} max={5} />
                  <div className="text-xs font-mono text-primary font-semibold mt-1">
                    EXTREME
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Brief Section */}
        <div id="brief" className="mb-20">
          <AnimatedSection>
            <div className="mb-8">
              <div className="text-xs font-mono tracking-[0.2em] text-primary mb-2">
                THE FILE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                ABOUT HACKHIVE
              </h2>
              <div className="h-0.5 w-16 bg-primary" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AnimatedSection className="lg:col-span-2" delay={0.1}>
              <div className="bg-white/[0.02] border border-foreground/10 rounded-lg p-6 h-full">
                <div className="text-[10px] font-mono tracking-wider opacity-60 mb-3">
                  OVERVIEW
                </div>
                <p className="text-foreground/80 leading-7 mb-6">
                  The event is structured to simulate real-world problem-solving
                  environments where participants ideate, design, and develop
                  solutions under time constraints while being evaluated by
                  industry experts and experienced professionals. HackHive
                  encourages students to explore emerging technologies, enhance
                  practical skills, and gain exposure to project-based
                  development and competitive innovation.
                </p>

                <div className="text-[10px] font-mono tracking-wider opacity-60 mb-3">
                  RULES // PROTOCOL
                </div>
                <ul className="space-y-2 text-foreground/70 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">▸</span>
                    Teams of 3–4. Solo is not this mission.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">▸</span>
                    Build a working prototype by extraction time.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">▸</span>
                    Original work only. No plagiarism.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">▸</span>
                    Pitch with clarity: problem, approach, impact.
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white/[0.02] border border-foreground/10 rounded-lg p-6 h-full">
                <div className="text-[10px] font-mono tracking-wider opacity-60 mb-4">
                  MISSION STATUS
                </div>
                <div className="space-y-4">
                  {[
                    { label: "CREW", value: "3–4" },
                    { label: "TOOLS", value: "ANY" },
                    { label: "TARGET", value: "IMPACT" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex justify-between items-center py-2 border-b border-foreground/5"
                    >
                      <span className="text-xs font-mono opacity-60">
                        {stat.label}
                      </span>
                      <span className="text-lg font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mb-20">
          <AnimatedSection>
            <div className="mb-8">
              <div className="text-xs font-mono tracking-[0.2em] text-primary mb-2">
                THE PLAN
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                MISSION & VISION
              </h2>
              <div className="h-0.5 w-16 bg-primary" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection delay={0.1}>
              <div className="bg-white/[0.02] border border-foreground/10 rounded-lg p-6 h-full">
                <div className="text-[10px] font-mono tracking-wider opacity-60 mb-3">
                  MISSION
                </div>
                <p className="text-foreground/80 leading-7">
                  To simulate real-world problem-solving by having participants
                  innovate, collaborate, and build impactful technology-driven
                  solutions in a time-constrained environment.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-white/[0.02] border border-foreground/10 rounded-lg p-6 h-full">
                <div className="text-[10px] font-mono tracking-wider opacity-60 mb-3">
                  VISION
                </div>
                <p className="text-foreground/80 leading-7">
                  To foster creativity, technical excellence, and teamwork,
                  offering a competitive platform to showcase skills and connect
                  with industry professionals.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Heist Plan Steps */}
        <div id="plan" className="mb-20">
          <AnimatedSection>
            <div className="mb-8">
              <div className="text-xs font-mono tracking-[0.2em] text-primary mb-2">
                THE ROUTE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                HEIST PLAN
              </h2>
              <div className="h-0.5 w-16 bg-primary" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StepCard
              num="01"
              title="Recruit"
              description="Form your crew (3-4 members) and gather the vital intelligence (Problem Statements & Domains)."
              delay={0.1}
            />
            <StepCard
              num="02"
              title="Blueprint"
              description="Submit the detailed project proposal (PPT) to gain access for the main operation."
              delay={0.15}
            />
            <StepCard
              num="03"
              title="Infiltrate"
              description='Execute the 12-hour operation inside the "vault" (DMCE) to develop the functional solution.'
              delay={0.2}
            />
            <StepCard
              num="04"
              title="Loot"
              description='Face the "experts" for evaluation and claim the total prize pool of ₹30,000.'
              delay={0.25}
            />
          </div>
        </div>

        {/* Why Participate */}
        <div id="why" className="mb-12">
          <AnimatedSection>
            <div className="mb-8">
              <div className="text-xs font-mono tracking-[0.2em] text-primary mb-2">
                WHY JOIN
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                WHY PARTICIPATE
              </h2>
              <div className="h-0.5 w-16 bg-primary" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureCard
              title="BUILD"
              description="Enhance your practical skills and explore emerging tech by developing a functional solution in 12 hours."
              delay={0.1}
            />
            <FeatureCard
              title="CONNECT"
              description="Gain mentorship and exposure by having your project evaluated by top industry experts and professionals."
              delay={0.15}
            />
            <FeatureCard
              title="WIN"
              description="	Compete for a share of the ₹30,000 prize pool and earn domain-wise recognition for your technical excellence."
              delay={0.2}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <span className="text-[10px] font-mono tracking-[0.2em] text-primary/70">
            CLASSIFIED
          </span>
        </div>
      </div>
    </section>
  );
}
