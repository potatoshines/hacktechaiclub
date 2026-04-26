"use client"

import { motion } from "framer-motion"
import { ReactNode, useMemo } from "react"

export type BackgroundVariant = 
  | "orbs"
  | "gradient-mesh"
  | "particles"
  | "waves"
  | "spotlight"
  | "minimal"

// Seeded random number generator for consistent values across server and client
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

interface WrappedSectionProps {
  children: ReactNode
  background?: BackgroundVariant
  className?: string
}

function OrbsBackground() {
  // Generate deterministic values for each orb based on index
  const orbData = useMemo(() => {
    return [...Array(6)].map((_, i) => {
      const width = Math.round((200 + seededRandom(i * 100 + 1) * 300) * 100) / 100
      const height = Math.round((200 + seededRandom(i * 100 + 2) * 300) * 100) / 100
      const left = Math.round(seededRandom(i * 100 + 3) * 100 * 100) / 100
      const top = Math.round(seededRandom(i * 100 + 4) * 100 * 100) / 100
      return {
        width,
        height,
        left,
        top,
        xAnimate: seededRandom(i * 100 + 5) * 60 - 30,
        yAnimate: seededRandom(i * 100 + 6) * 60 - 30,
        duration: 10 + seededRandom(i * 100 + 7) * 10,
        color: ["var(--color-primary)", "var(--color-accent)", "var(--color-chart-3)"][i % 3],
      }
    })
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbData.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.width,
            height: orb.height,
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            opacity: 0.15,
          }}
          animate={{
            x: [0, orb.xAnimate],
            y: [0, orb.yAnimate],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

function GradientMeshBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          background: [
            "conic-gradient(from 0deg at 30% 30%, var(--color-primary) 0%, transparent 60%)",
            "conic-gradient(from 180deg at 70% 70%, var(--color-accent) 0%, transparent 60%)",
            "conic-gradient(from 360deg at 30% 30%, var(--color-primary) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-20 blur-3xl"
      />
    </div>
  )
}

function ParticlesBackground() {
  // Generate deterministic values for each particle based on index
  const particleData = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      left: Math.round(seededRandom(i * 50 + 1) * 100 * 100) / 100,
      top: Math.round(seededRandom(i * 50 + 2) * 100 * 100) / 100,
      duration: Math.round((3 + seededRandom(i * 50 + 3) * 3) * 100) / 100,
      delay: Math.round(seededRandom(i * 50 + 4) * 2 * 100) / 100,
    }))
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particleData.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/40"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

function WavesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          style={{ top: `${30 + i * 20}%` }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  )
}

function SpotlightBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl"
      />
    </div>
  )
}

function MinimalBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
  )
}

const backgrounds: Record<BackgroundVariant, () => JSX.Element> = {
  orbs: OrbsBackground,
  "gradient-mesh": GradientMeshBackground,
  particles: ParticlesBackground,
  waves: WavesBackground,
  spotlight: SpotlightBackground,
  minimal: MinimalBackground,
}

export function WrappedSection({ 
  children, 
  background = "minimal",
  className = ""
}: WrappedSectionProps) {
  const BackgroundComponent = backgrounds[background]
  
  return (
    <section className={`snap-start snap-always relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 scroll-mt-20 ${className}`}>
      <BackgroundComponent />
      <div className="relative z-10 w-full max-w-4xl">
        {children}
      </div>
    </section>
  )
}
