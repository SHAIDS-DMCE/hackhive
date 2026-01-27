"use client";

import Link from "next/link";

// Quick Links
const QUICK_LINKS_1 = [
  { href: "#about", label: "About" },
  { href: "#timeline", label: "Timeline" },
  { href: "#faq", label: "FAQs" },
];

const QUICK_LINKS_2 = [
  { href: "#problem-statements", label: "Problem Statements" },
  { href: "#contact", label: "Contact" },
  { href: "https://unstop.com", label: "Register", external: true },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background text-foreground pt-16 pb-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <HiveIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="text-xl font-bold text-foreground">HackHive</h2>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed mb-6">
              Official Hackathon conducted under SHAIDS. Build, learn and
              showcase – join us for an unforgettable experience.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mb-4">
              <a
                href="https://instagram.com/shaidsdmce"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/shaids-dmce/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a
                href="https://shaidsdmce.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="website"
              >
                <WebIcon className="w-5 h-5" />
              </a>
            </div>
            <p className="text-foreground/50 text-sm">Follow us for updates</p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              <div className="flex flex-col gap-3">
                {QUICK_LINKS_1.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {QUICK_LINKS_2.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-foreground/70 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Reach Out */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Reach Out
            </h3>
            <p className="text-foreground/70 text-sm leading-relaxed mb-6">
              Feel free to reach out for queries related to registration,
              participation or event rules.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contact@hackhive.com"
                className="text-foreground/70 hover:text-primary transition-colors text-sm"
              >
                Email: contact@hackhive.com
              </a>
              <a
                href="tel:+919876543210"
                className="text-foreground/70 hover:text-primary transition-colors text-sm"
              >
                Divesh: +91 98765 43210
                <br />
                Phone: +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Icons
function HiveIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L4 6v12l8 4 8-4V6l-8-4zm0 2.18l5.5 2.75v7.64L12 17.32l-5.5-2.75V7.93L12 4.18z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
function WebIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm7.93 9h-3.06a15.5 15.5 0 00-1.2-5.05A8.02 8.02 0 0119.93 11zM12 4.07c.97 1.33 1.7 3.2 2.05 5.93H9.95c.35-2.73 1.08-4.6 2.05-5.93zM4.07 11a8.02 8.02 0 014.26-5.05A15.5 15.5 0 007.13 11H4.07zm0 2h3.06c.28 1.9.77 3.6 1.46 5.05A8.02 8.02 0 014.07 13zm7.93 6.93c-.97-1.33-1.7-3.2-2.05-5.93h4.1c-.35 2.73-1.08 4.6-2.05 5.93zM15.67 18.05c.69-1.45 1.18-3.15 1.46-5.05h3.06a8.02 8.02 0 01-4.52 5.05z" />
    </svg>
  );
}


function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}
