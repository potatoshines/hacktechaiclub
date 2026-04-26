"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { WrappedSection } from "../wrapped-section"

interface SlideArchetypeProps {
  riskProfile: string
  summary: string
  recommendations: string[]
}

export function SlideArchetype({ riskProfile, summary, recommendations }: SlideArchetypeProps) {
  const [streamedSummary, setStreamedSummary] = useState("")

  useEffect(() => {
    setStreamedSummary("")
    let charIndex = 0
    let timeout: ReturnType<typeof setTimeout>

    const typeNext = () => {
      charIndex += 1
      setStreamedSummary(summary.slice(0, charIndex))
      if (charIndex < summary.length) {
        timeout = setTimeout(typeNext, 18)
      }
    }

    if (summary.length > 0) {
      timeout = setTimeout(typeNext, 120)
    }

    return () => clearTimeout(timeout)
  }, [summary])

  return (
    <WrappedSection background="spotlight">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-4 text-lg md:text-xl font-bold text-foreground"
        >
          Your Profile
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8 bg-gradient-to-r from-primary via-accent to-chart-3 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
        >
          {riskProfile}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          {streamedSummary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="mb-6 text-sm uppercase tracking-wider text-muted-foreground flex items-center justify-center gap-2">
            <span>💡</span> Recommendations for Next Semester
          </p>
          
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
                className="mx-auto max-w-lg rounded-xl border border-border/50 px-6 py-4 text-left"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <p className="text-foreground">{rec}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </WrappedSection>
  )
}
