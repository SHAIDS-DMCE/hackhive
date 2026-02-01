"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function Contact() {
  const { colors } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const socials = [
    {
      icon: <InstagramIcon className="w-5 h-5" />,
      href: "https://instagram.com/shaidsdmce",
      label: "Instagram",
    },
    {
      icon: <LinkedInIcon className="w-5 h-5" />,
      href: "https://www.linkedin.com/company/shaids-dmce/",
      label: "LinkedIn",
    },
    {
      icon: <WebIcon className="w-5 h-5" />,
      href: "https://shaidsdmce.app/",
      label: "Website",
    },
  ];

  const contactInfo = [
    {
      title: "Email ID",
      content: (
        <a
          href="mailto:shaids_dmce@dmce.ac.in"
          className="block hover:text-primary transition-colors"
        >
          shaids_dmce@dmce.ac.in
        </a>
      ),
      delay: 0,
    },
    {
      title: "Phone Numbers",
      content: (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span className="text-muted-foreground text-base">
              Divesh Dalvi:
            </span>
            <a
              href="tel:+917057720106"
              className="hover:text-primary transition-colors font-mono"
            >
              +91 70577 20106
            </a>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span className="text-muted-foreground text-base">
              Ajay Jadhav:
            </span>
            <a
              href="tel:+919326141910"
              className="hover:text-primary transition-colors font-mono text-primary"
            >
              +91 93261 41910
            </a>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span className="text-muted-foreground text-base">
              Aayush Thoke:
            </span>
            <a
              href="tel:+917666812655"
              className="hover:text-primary transition-colors font-mono"
            >
              {" "}
              +91 76668 12655
            </a>
          </div>
        </div>
      ),
      delay: 0.1,
    },
    {
      title: "Address",
      content: (
        <div className="text-foreground">
          <div>Sector 3, Airoli,</div>
          <div>Navi Mumbai, Maharashtra 400708</div>
        </div>
      ),
      delay: 0.2,
    },
    {
      title: "Other Links",
      content: (
        <div className="flex items-center gap-3">
          {socials.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-200"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      ),
      delay: 0.3,
    },
  ];

  return (
    <section className="relative min-h-screen py-20 px-6 sm:px-8 lg:px-12 bg-background text-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24"
        >
          {/* Left Column - Header & Context */}
          <div className="flex flex-col justify-center h-full space-y-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-heading font-black tracking-tight text-primary">
                Contact us
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground font-body max-w-md leading-relaxed">
                Join the resistance. Get in touch with us for any inquiries,
                questions, or alliance proposals.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="hidden lg:block">
              <div className="h-px w-24 bg-border" />
            </motion.div>
          </div>

          {/* Right Column - Grid Info & Map */}
          <div className="space-y-16">
            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="space-y-3"
                >
                  <h3 className="text-sm font-mono tracking-widest uppercase text-muted-foreground/80">
                    {info.title}
                  </h3>
                  <div className="font-body text-lg font-medium">
                    {info.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Google Map Iframe */}
            <motion.div
              variants={itemVariants}
              className="w-full aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-muted/50 relative group"
            >
              <div className="absolute inset-0 pointer-events-none z-10 group-hover:bg-transparent transition-colors duration-500" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.799726524518!2d72.99319562601649!3d19.16024194932097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bf4b7a73c0ab%3A0xcfeb8b94503749f3!2sDatta%20Meghe%20College%20Of%20Engineering%2C%20Sector%203%2C%20Airoli%2C%20Navi%20Mumbai%2C%20Maharashtra%20400708!5e0!3m2!1sen!2sin!4v1769862756970!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "contrast(1.2)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="group-hover:filter-none transition-all duration-700"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Icons copied from Footer.js
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
