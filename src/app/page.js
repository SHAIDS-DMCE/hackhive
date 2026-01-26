import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import ProblemStatements from "@/components/sections/ProblemStatements";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with 3D */}
      <section id="hero">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Timeline Section */}
      <section id="timeline">
        <Timeline />
      </section>

      {/* Problem Statements Section */}
      <section id="problem-statements">
        <ProblemStatements />
      </section>

      {/* FAQ Section */}
      <section id="faq">
        <FAQ />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}

