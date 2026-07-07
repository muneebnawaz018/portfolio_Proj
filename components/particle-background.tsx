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

      // Base drift speed. Tune this multiplier for faster/slower motion; it is
      // refresh-independent now (delta-time normalized to 60fps).
      const DRIFT = 0.6
      const speedX = (Math.random() - 0.5) * DRIFT
      const speedY = (Math.random() - 0.5) * DRIFT

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

    const CONNECT_DIST = 100
    const CELL = CONNECT_DIST // grid cell = connection radius
    // Zero-allocation spatial hash as linked-list buckets, reused every frame.
    // `heads[cell]` holds the first particle index in that cell; `next[i]`
    // chains to the next particle in the same cell (-1 = end). Allocated once
    // per resize so the animation loop creates no per-frame garbage (no GC
    // stutter), unlike a Map + arrays + string keys rebuilt each frame.
    const cols = Math.max(1, Math.floor(canvas.width / CELL) + 1)
    const rows = Math.max(1, Math.floor(canvas.height / CELL) + 1)
    const heads = new Int32Array(cols * rows)
    const next = new Int32Array(particleCount)
    let animationId = 0
    let lastTime = 0

    const animate = (now: number) => {
      if (!ctx || !canvas) return

      // Frame-rate independent step: 1.0 at 60fps, ~0.5 at 120fps, so motion
      // looks the same on any refresh rate. Clamp so a backgrounded tab that
      // resumes after a long pause does not teleport every particle.
      const dt = lastTime ? Math.min((now - lastTime) / 16.6667, 3) : 1
      lastTime = now

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = theme === "dark"
      const particleColor = isDark ? "255, 255, 255" : "75, 85, 99"
      const lineColor = isDark ? "255, 255, 255" : "75, 85, 99"

      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Pass 1: move each particle (mouse capture or drift), then draw it.
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = mouse.radius

        if (distance < maxDistance) {
          particle.captured = true
          const force = (maxDistance - distance) / maxDistance
          const directionX = dx / distance || 0
          const directionY = dy / distance || 0
          particle.x += directionX * force * 3 * dt
          particle.y += directionY * force * 3 * dt

          // Draw connection line to mouse (spider web effect)
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${lineColor}, ${0.3 * (1 - distance / maxDistance)})`
          ctx.lineWidth = 0.8
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        } else {
          if (particle.captured) particle.captured = false

          particle.x += particle.speedX * dt
          particle.y += particle.speedY * dt

          // Bounce off walls
          if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY

          // Keep particles within bounds
          if (particle.x < 0) particle.x = 0
          if (particle.x > canvas.width) particle.x = canvas.width
          if (particle.y < 0) particle.y = 0
          if (particle.y > canvas.height) particle.y = canvas.height
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`
        ctx.fill()
      }

      // Pass 2: connect nearby particles. Rebuild the linked-list buckets in
      // place (no allocation), then each particle only tests its own cell and
      // the 8 around it (near O(n)) instead of every other particle (O(n^2)).
      heads.fill(-1)
      for (let i = 0; i < particles.length; i++) {
        let cx = (particles[i].x / CELL) | 0
        let cy = (particles[i].y / CELL) | 0
        if (cx < 0) cx = 0
        else if (cx >= cols) cx = cols - 1
        if (cy < 0) cy = 0
        else if (cy >= rows) cy = rows - 1
        const cell = cy * cols + cx
        next[i] = heads[cell]
        heads[cell] = i
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        let cx = (p.x / CELL) | 0
        let cy = (p.y / CELL) | 0
        if (cx < 0) cx = 0
        else if (cx >= cols) cx = cols - 1
        if (cy < 0) cy = 0
        else if (cy >= rows) cy = rows - 1
        for (let ox = -1; ox <= 1; ox++) {
          const nx = cx + ox
          if (nx < 0 || nx >= cols) continue
          for (let oy = -1; oy <= 1; oy++) {
            const ny = cy + oy
            if (ny < 0 || ny >= rows) continue
            let j = heads[ny * cols + nx]
            while (j !== -1) {
              if (j > i) {
                // draw each pair once
                const other = particles[j]
                const ddx = p.x - other.x
                const ddy = p.y - other.y
                const d = Math.sqrt(ddx * ddx + ddy * ddy)
                if (d < CONNECT_DIST) {
                  ctx.beginPath()
                  ctx.strokeStyle = `rgba(${lineColor}, ${0.1 * (1 - d / CONNECT_DIST)})`
                  ctx.lineWidth = 0.3
                  ctx.moveTo(p.x, p.y)
                  ctx.lineTo(other.x, other.y)
                  ctx.stroke()
                }
              }
              j = next[j]
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [dimensions, theme, mounted])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}

export default ParticleBackground
