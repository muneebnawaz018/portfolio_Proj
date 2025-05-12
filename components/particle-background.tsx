"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  baseX: number
  baseY: number
  density: number
  opacity: number
  speedX: number
  speedY: number
  captured: boolean
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 })
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        setDimensions({ width: canvas.width, height: canvas.height })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !mounted) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Increased particle count for more density
    const particleCount = Math.min(Math.floor(dimensions.width * 0.15), 350)
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * dimensions.width
      const y = Math.random() * dimensions.height
      const size = Math.random() * 2 + 1
      const density = Math.random() * 30 + 1

      // Add random speeds for constant movement - REDUCED SPEED
      const speedX = (Math.random() - 0.5) * 0.3 // Reduced from 0.7
      const speedY = (Math.random() - 0.5) * 0.3 // Reduced from 0.7

      particles.push({
        x,
        y,
        size,
        baseX: x,
        baseY: y,
        density,
        opacity: Math.random() * 0.5 + 0.2,
        speedX,
        speedY,
        captured: false,
      })
    }

    particlesRef.current = particles

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = theme === "dark"
      const particleColor = isDark ? "255, 255, 255" : "75, 85, 99"
      const lineColor = isDark ? "255, 255, 255" : "75, 85, 99"

      particlesRef.current.forEach((particle, index) => {
        // Calculate distance between mouse and particle
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = mouseRef.current.radius

        // Check if particle is captured by the mouse
        if (distance < maxDistance) {
          particle.captured = true
          const force = (maxDistance - distance) / maxDistance
          const directionX = dx / distance || 0
          const directionY = dy / distance || 0
          const moveX = directionX * force * 3
          const moveY = directionY * force * 3

          particle.x += moveX
          particle.y += moveY

          // Draw connection lines to mouse (spider web effect)
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${lineColor}, ${0.3 * (1 - distance / maxDistance)})`
          ctx.lineWidth = 0.8
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
          ctx.stroke()
        } else {
          // Release particles gradually when not in mouse range
          if (particle.captured) {
            particle.captured = false
          }

          // Constant movement for all particles
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Bounce off walls
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.speedX = -particle.speedX
          }
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.speedY = -particle.speedY
          }

          // Keep particles within bounds
          if (particle.x < 0) particle.x = 0
          if (particle.x > canvas.width) particle.x = canvas.width
          if (particle.y < 0) particle.y = 0
          if (particle.y > canvas.height) particle.y = canvas.height
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`
        ctx.fill()

        // Connect nearby particles with lines (spider web effect)
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j]
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${lineColor}, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.3
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        }
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [dimensions, theme, mounted])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}

export default ParticleBackground
