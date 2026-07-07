import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import TechStack from "@/components/tech-stack"
import WebProjects from "@/components/web-projects"
import MobileProjects from "@/components/mobile-projects"
import Services from "@/components/services"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"
import CursorGlow from "@/components/cursor-glow"
import AuroraBackground from "@/components/aurora-background"
import ScrollProgress from "@/components/scroll-progress"
import SectionConnector from "@/components/section-connector"
import { Suspense } from "react"
import Loader from "@/components/loader"

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Suspense fallback={<Loader />}>
        <AuroraBackground />
        <ParticleBackground />
        <CursorGlow />
        <ScrollProgress />
        <Navbar />
        <Hero />
        <SectionConnector />
        <About />
        <SectionConnector />
        <Experience />
        <SectionConnector />
        <Skills />
        <SectionConnector />
        <TechStack />
        <SectionConnector />
        <Services />
        <SectionConnector />
        <WebProjects />
        <SectionConnector />
        <MobileProjects />
        <SectionConnector />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  )
}
