import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import ProblemStatements from "@/components/sections/ProblemStatements";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import PrizePool from "@/components/sections/PrizePool";
import Sponsors from "@/components/sections/Sponsors";
import { Analytics } from "@vercel/analytics/next"
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Analytics />
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      {/* <section id="gallery">
        <Gallery />
      </section> */}
      <section id="problem-statements">
        <ProblemStatements />
      </section>
      <section id="timeline">
        <Timeline />
      </section>
      <section id="prizepool">
        <PrizePool />
      </section>
      <section id="gallery">
        <Gallery />
      </section>
      <section id="sponsors">
        <Sponsors />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section id="faq">
        <FAQ />
      </section>
    </div>
  );
}
