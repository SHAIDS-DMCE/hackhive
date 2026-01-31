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
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
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
      className="bg-background text-foreground relative w-full overflow-hidden"
      aria-label="FAQ HackHive"
    >
      {/* Background effects - keeping grain for visual effect */}
      <div className="hhv-about__grain absolute inset-0" aria-hidden="true" />

      {/* Laser lines */}
      <div
        className="absolute left-0 right-0 top-[28%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-60"
        aria-hidden="true"
      />
      <div
        className="absolute left-0 right-0 top-[72%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-40"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 sm:py-20">

        <Reveal>
          <div className="mb-6">
            <div className="inline-flex items-center text-xs tracking-[0.22em] uppercase text-primary/75 font-mono">INTEL</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-[0.14em] uppercase mt-2.5">
              FAQ – FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="h-px mt-3.5 bg-gradient-to-r from-transparent via-primary/80 to-transparent max-w-md opacity-80" aria-hidden="true" />
          </div>
        </Reveal>

        <div className="mt-6 space-y-3">
          {faqData.map((item, idx) => (
            <Reveal key={idx} delayMs={idx * 60 + 240}>
              <div
                className={`border border-border rounded-2xl bg-card/70 backdrop-blur-md overflow-hidden transition-all duration-300 ${openIndex === idx ? "border-primary/50 shadow-lg shadow-primary/10" : "hover:border-primary/30"}`}
                onClick={() => toggleFAQ(idx)}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-heading font-bold tracking-wide text-foreground"
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span>{item.q}</span>
                  <span className="relative w-5 h-5 ml-4 flex-shrink-0" aria-hidden="true">
                    <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-primary rounded transition-transform duration-300 ${openIndex === idx ? "rotate-0" : ""}`} style={{ transform: 'translateY(-50%)' }} />
                    <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-primary rounded transition-transform duration-300 ${openIndex === idx ? "rotate-0 opacity-0" : "rotate-90"}`} style={{ transform: 'translateY(-50%)' }} />
                  </span>
                </button>
                <div
                  id={`faq-answer-${idx}`}
                  className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="px-4 sm:px-5 pb-4 sm:pb-5 font-body text-foreground/80 leading-relaxed">{item.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex justify-end">
          <span className="text-xs tracking-wider uppercase px-2 py-1 rounded border border-border bg-muted/50 font-mono">CLASSIFIED</span>
        </div>
      </div>
    </section>
  );
}
