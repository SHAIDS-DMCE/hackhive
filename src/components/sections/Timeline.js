"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import timelineData from "@/assets/TimelinePhases.json";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);
}

// SVG paths for each phase
const SVG_PATHS = {
  register: "M50,10 L90,30 L90,70 L50,90 L10,70 L10,30 Z",
  heist: "M25,15 L75,15 L85,50 L75,85 L25,85 L15,50 Z",
  reporting: "M50,5 L95,50 L50,95 L5,50 Z",
  coding: "M20,20 L80,20 L80,80 L20,80 Z",
  mentor: "M50,5 A45,45 0 1,1 50,95 A45,45 0 1,1 50,5",
  break: "M30,10 L70,10 L75,30 L65,30 L65,90 L35,90 L35,30 L25,30 Z",
  coding2: "M15,25 L35,5 L65,5 L85,25 L85,75 L65,95 L35,95 L15,75 Z",
  presentation: "M10,20 L90,20 L90,70 L55,70 L50,85 L45,70 L10,70 Z",
  victory: "M50,5 L61,35 L95,35 L68,55 L79,90 L50,70 L21,90 L32,55 L5,35 L39,35 Z",
};

export default function Timeline() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const phases = timelineData.phases;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const phaseElements = track.querySelectorAll(".timeline-phase");
      const svgElements = track.querySelectorAll(".phase-svg-container");
      const totalPhases = phaseElements.length;

      // Calculate scroll distance (horizontal track width minus container)
      const getScrollWidth = () => {
        return track.scrollWidth - window.innerWidth;
      };

      // Main horizontal scroll animation
      const scrollTween = gsap.to(track, {
        x: () => -getScrollWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollWidth()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Individual phase animations triggered by scroll position
      phaseElements.forEach((phase, index) => {
        const content = phase.querySelector(".phase-content");
        const svg = svgElements[index];
        const svgPath = svg?.querySelector(".morph-path");

        // Content fade in from bottom
        gsap.fromTo(
          content,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: phase,
              containerAnimation: scrollTween,
              start: "left 80%",
              end: "left 50%",
              scrub: 1,
            },
          }
        );

        // Content fade out to left
        gsap.fromTo(
          content,
          {
            opacity: 1,
            x: 0,
          },
          {
            opacity: 0,
            x: -50,
            ease: "power2.in",
            scrollTrigger: {
              trigger: phase,
              containerAnimation: scrollTween,
              start: "left 10%",
              end: "left -20%",
              scrub: 1,
            },
          }
        );

        // SVG fade in from bottom
        if (svg) {
          gsap.fromTo(
            svg,
            {
              opacity: 0,
              y: 60,
              scale: 0.8,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: phase,
                containerAnimation: scrollTween,
                start: "left 85%",
                end: "left 55%",
                scrub: 1,
              },
            }
          );

          // SVG fade out to left
          gsap.fromTo(
            svg,
            {
              opacity: 1,
              x: 0,
              scale: 1,
            },
            {
              opacity: 0,
              x: -50,
              scale: 0.8,
              ease: "power2.in",
              scrollTrigger: {
                trigger: phase,
                containerAnimation: scrollTween,
                start: "left 5%",
                end: "left -25%",
                scrub: 1,
              },
            }
          );
        }

        // SVG Path morphing
        if (svgPath && index > 0) {
          const currentIcon = phases[index]?.icon || "register";
          const targetPath = SVG_PATHS[currentIcon] || SVG_PATHS.register;

          gsap.to(svgPath, {
            morphSVG: targetPath,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: phase,
              containerAnimation: scrollTween,
              start: "left 90%",
              end: "left 60%",
              scrub: 1,
            },
          });
        }
      });

      // Header animation
      gsap.fromTo(
        ".timeline-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [phases]);

  return (
    <section
      ref={sectionRef}
      className="timeline-section relative min-h-screen bg-background overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.01] pointer-events-none" />

      {/* Header */}
      <div className="timeline-header fixed top-6 md:top-8 left-0 right-0 z-30 px-6 md:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.2em] text-primary/70 mb-1 block">
            THE OPERATION
          </span>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide">
            EVENT TIMELINE
          </h2>
        </div>
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className="timeline-track flex items-center h-screen will-change-transform"
      >
        {phases.map((phase, index) => (
          <div
            key={phase.id}
            className="timeline-phase flex-shrink-0 w-screen h-screen flex items-center"
          >
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left - SVG */}
                <div className="phase-svg-container relative h-[30vh] md:h-[40vh] lg:h-[50vh] flex items-center justify-center order-2 lg:order-1">
                  <div className="relative w-[60%] md:w-[50%] aspect-square">
                    {/* Glow */}
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl" />

                    {/* Rotating ring */}
                    <svg
                      viewBox="0 0 100 100"
                      className="absolute inset-0 w-full h-full animate-spin"
                      style={{ animationDuration: "30s" }}
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.3"
                        strokeDasharray="3 8"
                        className="text-primary/30"
                      />
                    </svg>

                    {/* Main SVG */}
                    <svg viewBox="0 0 100 100" className="relative w-full h-full z-10">
                      <defs>
                        <filter id={`glow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="2" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <path
                        className="morph-path"
                        d={SVG_PATHS[phase.icon] || SVG_PATHS.register}
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="1.5"
                        filter={`url(#glow-${index})`}
                      />
                      <circle cx="50" cy="50" r="4" fill="var(--primary)">
                        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                      </circle>
                    </svg>

                    {/* Phase label under SVG */}
                    <div className="absolute -bottom-8 left-0 right-0 text-center">
                      <span className="text-[10px] font-mono tracking-[0.2em] text-primary/60">
                        {phase.phaseName?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right - Content */}
                <div className="phase-content order-1 lg:order-2 will-change-transform">
                  {/* Phase Label */}
                  <div className="mb-3">
                    <span className="text-xs font-mono tracking-[0.2em] text-primary">
                      {phase.phaseName?.toUpperCase()}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 tracking-wide">
                    {phase.title}
                  </h3>

                  {/* Time/Duration */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {phase.time && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg">
                        <span className="text-sm font-mono font-bold text-primary">
                          ⏱ {phase.time}
                        </span>
                      </div>
                    )}
                    {phase.duration && (
                      <>
                        <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg">
                          <span className="text-sm font-mono font-bold text-primary">
                            📅 {phase.duration.startDate}
                            {phase.duration.endDate !== phase.duration.startDate && (
                              <> — {phase.duration.endDate}</>
                            )}
                          </span>
                        </div>
                        {phase.resultDate && (
                          <div className="px-3 py-2 bg-foreground/5 border border-foreground/10 rounded-lg">
                            <span className="text-xs font-mono">
                              🎯 Results: {phase.resultDate}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-foreground/70 leading-relaxed mb-5 max-w-lg text-sm md:text-base">
                    {phase.description}
                  </p>

                  {/* Activities */}
                  {phase.activities && (
                    <div>
                      <div className="text-xs font-mono tracking-[0.15em] text-foreground/50 mb-2">
                        ACTIVITIES
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {phase.activities.map((activity, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 text-xs font-mono bg-foreground/5 border border-foreground/10 rounded-full"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
        {phases.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-foreground/20 transition-colors duration-300"
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="fixed bottom-6 right-12 flex items-center gap-2 text-foreground/40 z-30">
        <span className="text-[10px] font-mono tracking-wider hidden md:inline">SCROLL</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </section>
  );
}