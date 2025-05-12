import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import TechStack from "@/components/tech-stack"
import WebProjects from "@/components/web-projects"
import MobileProjects from "@/components/mobile-projects"
import Services from "@/components/services"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"
import { Suspense } from "react"
import Loader from "@/components/loader"

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Suspense fallback={<Loader />}>
        <ParticleBackground />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <TechStack />
        <Services />
        <WebProjects />
        <MobileProjects />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  )
}
