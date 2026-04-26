"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { WrappedSection } from "../wrapped-section"

function AnimatedPercent({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) {
      let start = 0
      const duration = 1500
      const increment = value / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= value) {
          setDisplay(value)
          clearInterval(timer)
        } else {
          setDisplay(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return <span ref={ref}>{display}</span>
}

interface SlidePerformanceProps {
  overallPercent: number
  strengths: string[]
  vsClass?: string
}

export function SlidePerformance({ overallPercent, strengths, vsClass }: SlidePerformanceProps) {
  return (
    <WrappedSection background="gradient-mesh">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6 text-lg text-muted-foreground flex items-center justify-center gap-2"
        >
          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>📈</motion.span>
          Performance Snapshot
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-8xl font-bold text-foreground md:text-9xl">
            <AnimatedPercent value={overallPercent} />
            <span className="text-5xl text-muted-foreground">%</span>
          </span>
          <p className="mt-2 text-muted-foreground">Overall Score</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="mb-4 text-sm uppercase tracking-wider text-muted-foreground">Your Strengths</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {strengths.map((strength, i) => (
              <motion.span
                key={strength}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1, type: "spring" }}
                viewport={{ once: true }}
                className="rounded-full border border-primary/30 px-5 py-2 text-sm text-primary flex items-center gap-2"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary), 0.1)" }}
              >
                <span>✨</span> {strength}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {vsClass && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground"
          >
            {vsClass}
          </motion.p>
        )}
      </div>
    </WrappedSection>
  )
}
