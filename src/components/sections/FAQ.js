"use client";

import { useEffect, useRef, useState } from "react";

function useRevealOnScroll() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({ children, delayMs = 0, className = "" }) {
  const { ref, visible } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`${visible ? "hhv-reveal is-visible" : "hhv-reveal"} ${className}`}
    >
      {children}
    </div>
  );
}

function ThemeToggle() {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("hhv-theme");
      if (stored === "dark" || stored === "light") {
        setMode(stored);
        document.documentElement.classList.toggle("dark", stored === "dark");
        return;
      }
    } catch {
      // ignore
    }

    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial = prefersDark ? "dark" : "light";
    setMode(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const isDark = mode === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    setMode(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      window.localStorage.setItem("hhv-theme", next);
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      className="hhv-toggle hhv-font-mono"
      aria-label="Toggle theme"
      onClick={toggle}
    >
      <span className="hhv-toggle__dot" aria-hidden="true" />
      <span className="hhv-toggle__text">MODE: {isDark ? "DARK" : "LIGHT"}</span>
    </button>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What is HackHive?",
      a: "HackHive is a college hackathon reimagined as a high-stakes operation. Teams of 2–4 build and pitch prototypes under pressure, mentored by experts and judged for impact."
    },
    {
      q: "Who can participate?",
      a: "Any enrolled student can join. Whether you’re a coder, designer, or problem-solver—if you want to build, you’re in."
    },
    {
      q: "What is the team size?",
      a: "Teams of 2–4. No solo operators. Collaboration is part of the mission."
    },
    {
      q: "Is prior experience required?",
      a: "No. We welcome all skill levels. Mentors will be on-site to guide you from idea to prototype."
    },
    {
      q: "What tools can we use?",
      a: "Anything you want. Languages, frameworks, hardware—your choice. Just build something that works."
    },
    {
      q: "How are projects judged?",
      a: "Judges look for problem clarity, execution, polish, and impact. A clean demo and confident pitch matter."
    }
  ];

  const toggleFAQ = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="hhv-about relative w-full overflow-hidden"
      aria-label="FAQ HackHive"
    >
      <div className="hhv-about__bg absolute inset-0" aria-hidden="true" />
      <div className="hhv-bgcode absolute inset-0" aria-hidden="true">
        <div className="hhv-bgcode__scroll">
          {Array.from({ length: 34 }).map((_, i) => (
            <div key={i} className="hhv-bgcode__line">
              {i % 4 === 0
                ? "ssh://hive-node  | auth=ok | route=shadow"
                : i % 4 === 1
                  ? "[OP] sync --team=4 --mode=stealth"
                  : i % 4 === 2
                    ? "commit: clean  // build: armed  // exit: planned"
                    : "01001000 01100001 01100011 01101000"}
            </div>
          ))}
        </div>
      </div>
      <div className="hhv-about__grain absolute inset-0" aria-hidden="true" />
      <div className="hhv-about__laserline hhv-about__laserline--a" aria-hidden="true" />
      <div className="hhv-about__laserline hhv-about__laserline--b" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 sm:py-20">
        <div className="hhv-topbar">
          <span className="hhv-micro">TOP SECRET</span>
          <ThemeToggle />
        </div>

        <Reveal>
          <div className="hhv-sectionHead">
            <div className="hhv-kicker hhv-font-mono">INTEL</div>
            <h2 className="hhv-font-title hhv-sectionHead__title">FAQ – FREQUENTLY ASKED QUESTIONS</h2>
            <div className="hhv-divider" aria-hidden="true" />
          </div>
        </Reveal>

        <Reveal delayMs={120}>
          <div className="hhv-panel mt-6">
            <div className="hhv-label hhv-font-mono">MISSION BRIEFING</div>
            <p className="hhv-font-body mt-3 leading-7">
              Below are answers to common questions about the HackHive operation. Review them carefully before you begin your mission.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="hhv-stat">
                <div className="hhv-font-mono hhv-stat__k">STATUS</div>
                <div className="hhv-font-title hhv-stat__v">ACTIVE</div>
              </div>
              <div className="hhv-stat">
                <div className="hhv-font-mono hhv-stat__k">CLEARANCE</div>
                <div className="hhv-font-title hhv-stat__v">LEVEL 3</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="hhv-faq mt-6 space-y-3">
          {faqs.map((item, idx) => (
            <Reveal key={idx} delayMs={idx * 60 + 240}>
              <div
                className={`hhv-faqItem ${openIndex === idx ? "is-open" : ""}`}
                onClick={() => toggleFAQ(idx)}
              >
                <button
                  type="button"
                  className="hhv-faqQuestion hhv-font-title"
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span>{item.q}</span>
                  <span className="hhv-faqIcon" aria-hidden="true">
                    <span className="hhv-faqIcon__line" />
                    <span className="hhv-faqIcon__line" />
                  </span>
                </button>
                <div
                  id={`faq-answer-${idx}`}
                  className="hhv-faqAnswer"
                  hidden={openIndex !== idx}
                >
                  <p className="hhv-font-body">{item.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex justify-end">
          <span className="hhv-micro">CLASSIFIED</span>
        </div>
      </div>
    </section>
  );
}