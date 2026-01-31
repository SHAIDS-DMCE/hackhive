"use client";

import { useEffect, useRef, useState } from "react";
import faqData from "@/assets/FAQ.json";

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
      { threshold: 0.18 },
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="hhv-about relative w-full overflow-hidden"
      aria-label="FAQ HackHive"
    >
      {/* <div className="hhv-about__bg absolute inset-0" aria-hidden="true" /> */}
      <div className="hhv-bgcode absolute inset-0" aria-hidden="true">
        {/* <div className="hhv-bgcode__scroll">
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
        </div> */}
      </div>
      <div className="hhv-about__grain absolute inset-0" aria-hidden="true" />
      <div
        className="hhv-about__laserline hhv-about__laserline--a"
        aria-hidden="true"
      />
      <div
        className="hhv-about__laserline hhv-about__laserline--b"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 sm:py-20">

        <Reveal>
          <div className="hhv-sectionHead mb-6">
            <div className="hhv-kicker hhv-font-mono">INTEL</div>
            <h2 className="hhv-font-title hhv-sectionHead__title">
              FAQ – FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="hhv-divider" aria-hidden="true" />
          </div>
        </Reveal>

        {/* <Reveal delayMs={120}>
          <div className="hhv-panel mt-6">
            <div className="hhv-label hhv-font-mono">MISSION BRIEFING</div>
            <p className="hhv-font-body mt-3 leading-7">
              Below are answers to common questions about the HackHive
              operation. Review them carefully before you begin your mission.
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
        </Reveal> */}

        <div className="hhv-faq mt-6 space-y-3">
          {faqData.map((item, idx) => (
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
