"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { Button, ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Navigation links
const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#timeline", label: "Timeline" },
  { href: "#problem-statements", label: "Problem Statements" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact Us" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme, colors } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Always show the resolved theme icon (light or dark), never system icon
  const getResolvedThemeIcon = () => {
    if (!mounted) return <LightModeIcon />;
    return isDark ? <DarkModeIcon /> : <LightModeIcon />;
  };

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          "backdrop-blur-sm border-b border-border",
          isScrolled || isMobileMenuOpen
            ? "bg-background/80 shadow-sm"
            : "bg-background/60",
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold text-primary hover:opacity-80 transition-opacity font-heading"
            >
              HACKHIVE
            </Link>

            {/* Right Section - All items grouped together */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-1 mr-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 xl:px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Register Button - Using primary color (30% accent) */}
              <ButtonLink
                href="https://unstop.com/p/hackhive-20-shaids-student-hive-of-artificial-intelligence-data-science-students-1630401"
                target="_blank"
                rel="noopener noreferrer"
                variant="default"
                size="default"
                className="hidden sm:inline-flex px-5 text-white"
                style={{
                  backgroundColor: "#3769bf",
                }}
              >
                Unstop
              </ButtonLink>

              {/* Mobile Register Button (icon only) */}
              <ButtonLink
                href="https://unstop.com/p/hackhive-20-shaids-student-hive-of-artificial-intelligence-data-science-students-1630401"
                target="_blank"
                rel="noopener noreferrer"
                variant="default"
                size="icon"
                style={{
                  backgroundColor: "#3769bf",
                }}
                className="sm:hidden rounded-full"
              >
                <OpenInNewIcon />
              </ButtonLink>

              {/* Theme Toggle Button */}
              {/* <Button
                onClick={toggleTheme}
                variant="outline"
                size="icon"
                aria-label="Toggle theme"
              >
                {getResolvedThemeIcon()}
              </Button> */}

              {/* Mobile Menu Button */}
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                variant="outline"
                size="icon"
                className="lg:hidden rounded-full"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="px-4 pb-4 pt-2 border-t border-border">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-base font-medium text-foreground/80 hover:text-primary hover:bg-accent transition-colors rounded-xl"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// MUI Rounded Icons (SVG implementations)
function LightModeIcon() {
  return (
    <svg className="size-[1.2rem]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
    </svg>
  );
}

function DarkModeIcon() {
  return (
    <svg className="size-[1.2rem]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.01 3.05C6.51 3.54 3 7.36 3 12c0 4.97 4.03 9 9 9 4.63 0 8.45-3.5 8.95-8 .09-.79-.78-1.42-1.54-.95-.84.54-1.84.95-2.91.95-2.76 0-5-2.24-5-5 0-1.08.35-2.07.95-2.91.47-.76-.16-1.63-.94-1.54z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="size-[1.2rem]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="size-[1.2rem]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
    </svg>
  );
}

function OpenInNewIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13a.996.996 0 101.41 1.41L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z" />
    </svg>
  );
}
