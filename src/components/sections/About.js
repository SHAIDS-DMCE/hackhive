"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

export default function About() {
  const missionTarget = useMemo(() => {
    return new Date("2026-03-01T00:00:00Z");
  }, []);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, []);

  const remainingMs = Math.max(0, missionTarget.getTime() - now);
  const t = getTimeParts(remainingMs);
  const timeText = `${pad2(t.hours)}:${pad2(t.minutes)}:${pad2(t.seconds)}`;

  return (
    <section
      id="about"
      className="hhv-about relative w-full overflow-hidden"
      aria-label="About HackHive"
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
                    : "01001000 01100001 01100011 01101011"}
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
          <div className="hhv-hero">
            <div>
              <div className="hhv-kicker hhv-font-mono">MISSION BRIEF // ABOUT</div>
              <h1 className="hhv-font-title hhv-hero__title">
                <span className="hhv-glitch" data-text="WELCOME TO THE HEIST OF INNOVATION">
                  WELCOME TO THE HEIST OF INNOVATION
                </span>
              </h1>
              <p className="hhv-font-body hhv-hero__sub">
                HackHive is a college hackathon reimagined as a high-stakes operation.
                You’ll assemble a crew, breach real-world problems, and extract a
                prototype—fast, clean, and unforgettable.
              </p>

              <div className="hhv-hero__cta">
                <div className="hhv-ctaRow">
                  <a className="hhv-btn hhv-font-mono" href="#brief">
                    OPEN MISSION FILE
                  </a>
                  <a className="hhv-btn hhv-btn--ghost hhv-font-mono" href="#plan">
                    VIEW HEIST PLAN
                  </a>
                </div>
                <div className="hhv-pillrow">
                  <span className="hhv-tag hhv-font-mono">👥 TEAM MODE: 2–4 OPERATORS</span>
                  <span className="hhv-tag hhv-font-mono">⏳ 24–36 HR WINDOW</span>
                </div>
              </div>
            </div>

            <div className="hhv-hero__right" aria-hidden="true">
              <div className="hhv-heroCard">
                <div className="hhv-label hhv-font-mono">⏱ MISSION COUNTDOWN</div>
                <div className="hhv-timer hhv-font-mono mt-2" role="timer" aria-live="polite">
                  <span>{pad2(t.hours)}</span>
                  <span className="hhv-colon" aria-hidden="true">:</span>
                  <span>{pad2(t.minutes)}</span>
                  <span className="hhv-colon" aria-hidden="true">:</span>
                  <span>{pad2(t.seconds)}</span>
                </div>
                <div className="hhv-sublabel hhv-font-mono mt-2">T-MINUS {timeText}</div>

                <div className="hhv-heroCard__divider" aria-hidden="true" />

                <div className="hhv-heroCard__grid">
                  <div>
                    <div className="hhv-label hhv-font-mono">DIFFICULTY</div>
                    <div className="hhv-font-title hhv-heroCard__value">HIGH</div>
                  </div>
                  <div className="hhv-risk">
                    <div className="hhv-font-mono hhv-risk__label">RISK LEVEL</div>
                    <div className="hhv-risk__bars" aria-label="Risk Level: Extreme">
                      <span className="hhv-risk__bar is-on" />
                      <span className="hhv-risk__bar is-on" />
                      <span className="hhv-risk__bar is-on" />
                      <span className="hhv-risk__bar is-on" />
                      <span className="hhv-risk__bar" />
                    </div>
                    <div className="hhv-font-mono hhv-risk__value">EXTREME</div>
                  </div>
                </div>

                <div className="hhv-heroArt">
                  <div className="hhv-heroArt__hud" />
                  <div className="hhv-heroArt__mask" />
                  <div className="hhv-heroArt__line" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div id="brief" className="hhv-section">
          <Reveal delayMs={120}>
            <div className="hhv-sectionHead">
              <div className="hhv-kicker hhv-font-mono">THE FILE</div>
              <h2 className="hhv-font-title hhv-sectionHead__title">ABOUT HACKHIVE</h2>
              <div className="hhv-divider" aria-hidden="true" />
            </div>
          </Reveal>

          <div className="hhv-briefGrid mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Reveal delayMs={160} className="lg:col-span-2">
              <div className="hhv-panel">
                <div className="hhv-label hhv-font-mono">OVERVIEW</div>
                <p className="hhv-font-body mt-3 leading-7">
                  HackHive brings builders, designers, and problem-solvers together for
                  a cinematic sprint of innovation. You’ll ideate, prototype, and pitch
                  solutions that matter—guided by mentors, judged by experts, and driven
                  by pure execution.
                </p>
                <div className="mt-5">
                  <div className="hhv-label hhv-font-mono">RULES // PROTOCOL</div>
                  <ul className="hhv-font-body mt-3 space-y-2 leading-6">
                    <li className="hhv-li">Teams of 2–4. Solo is not this mission.</li>
                    <li className="hhv-li">Build a working prototype by extraction time.</li>
                    <li className="hhv-li">Original work only. No plagiarism.</li>
                    <li className="hhv-li">Pitch with clarity: problem, approach, impact.</li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={220} className="hhv-aside">
              <div className="hhv-panel">
                <div className="hhv-label hhv-font-mono">MISSION STATUS</div>
                <div className="mt-4 space-y-3">
                  <div className="hhv-stat">
                    <div className="hhv-font-mono hhv-stat__k">CREW</div>
                    <div className="hhv-font-title hhv-stat__v">2–4</div>
                  </div>
                  <div className="hhv-stat">
                    <div className="hhv-font-mono hhv-stat__k">TOOLS</div>
                    <div className="hhv-font-title hhv-stat__v">ANY</div>
                  </div>
                  <div className="hhv-stat">
                    <div className="hhv-font-mono hhv-stat__k">TARGET</div>
                    <div className="hhv-font-title hhv-stat__v">IMPACT</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="hhv-section">
          <Reveal>
            <div className="hhv-sectionHead">
              <div className="hhv-kicker hhv-font-mono">THE PLAN</div>
              <h2 className="hhv-font-title hhv-sectionHead__title">MISSION & VISION</h2>
              <div className="hhv-divider" aria-hidden="true" />
            </div>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Reveal delayMs={120}>
              <div className="hhv-panel">
                <div className="hhv-label hhv-font-mono">MISSION</div>
                <p className="hhv-font-body mt-3 leading-7">
                  Convert ideas into real prototypes under pressure—building skill,
                  confidence, and a portfolio that proves you can execute.
                </p>
              </div>
            </Reveal>
            <Reveal delayMs={180}>
              <div className="hhv-panel">
                <div className="hhv-label hhv-font-mono">VISION</div>
                <p className="hhv-font-body mt-3 leading-7">
                  Create a campus culture where innovation is fearless—where students
                  ship, collaborate, and solve problems with style and substance.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div id="plan" className="hhv-section">
          <Reveal>
            <div className="hhv-sectionHead">
              <div className="hhv-kicker hhv-font-mono">THE ROUTE</div>
              <h2 className="hhv-font-title hhv-sectionHead__title">HEIST PLAN</h2>
              <div className="hhv-divider" aria-hidden="true" />
            </div>
          </Reveal>

          <div className="hhv-steps mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Reveal delayMs={120}>
              <div className="hhv-step">
                <div className="hhv-step__num hhv-font-mono">01</div>
                <div className="hhv-step__body">
                  <div className="hhv-step__title hhv-font-title">RECON</div>
                  <p className="hhv-font-body mt-2 leading-7">
                    Pick a problem, scope a winnable build, and map roles like a real crew.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={160}>
              <div className="hhv-step">
                <div className="hhv-step__num hhv-font-mono">02</div>
                <div className="hhv-step__body">
                  <div className="hhv-step__title hhv-font-title">BREACH</div>
                  <p className="hhv-font-body mt-2 leading-7">
                    Prototype fast. Cut fluff. Build the core loop that proves the idea.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={200}>
              <div className="hhv-step">
                <div className="hhv-step__num hhv-font-mono">03</div>
                <div className="hhv-step__body">
                  <div className="hhv-step__title hhv-font-title">EXTRACT</div>
                  <p className="hhv-font-body mt-2 leading-7">
                    Polish the demo path. Make the first 30 seconds undeniable.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={240}>
              <div className="hhv-step">
                <div className="hhv-step__num hhv-font-mono">04</div>
                <div className="hhv-step__body">
                  <div className="hhv-step__title hhv-font-title">ESCAPE</div>
                  <p className="hhv-font-body mt-2 leading-7">
                    Pitch with clarity, network with intent, and leave with momentum.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div id="why" className="hhv-section">
          <Reveal>
            <div className="hhv-sectionHead">
              <div className="hhv-kicker hhv-font-mono">WHY JOIN</div>
              <h2 className="hhv-font-title hhv-sectionHead__title">WHY PARTICIPATE</h2>
              <div className="hhv-divider" aria-hidden="true" />
            </div>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Reveal delayMs={120}>
              <div className="hhv-card">
                <div className="hhv-card__top">
                  <div className="hhv-card__icon" aria-hidden="true" />
                  <div className="hhv-label hhv-font-mono">INNOVATION</div>
                </div>
                <div className="hhv-font-body mt-3 leading-7">
                  Build something bold—fast. Learn how to scope, ship, and iterate.
                </div>
              </div>
            </Reveal>
            <Reveal delayMs={170}>
              <div className="hhv-card">
                <div className="hhv-card__top">
                  <div className="hhv-card__icon" aria-hidden="true" />
                  <div className="hhv-label hhv-font-mono">TEAMWORK</div>
                </div>
                <div className="hhv-font-body mt-3 leading-7">
                  Operate like a crew—roles, communication, and execution under pressure.
                </div>
              </div>
            </Reveal>
            <Reveal delayMs={220}>
              <div className="hhv-card">
                <div className="hhv-card__top">
                  <div className="hhv-card__icon" aria-hidden="true" />
                  <div className="hhv-label hhv-font-mono">IMPACT</div>
                </div>
                <div className="hhv-font-body mt-3 leading-7">
                  Solve real problems, present confidently, and stand out to judges.
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 flex justify-end">
          <span className="hhv-micro">CLASSIFIED</span>
        </div>
      </div>
    </section>
  );
}