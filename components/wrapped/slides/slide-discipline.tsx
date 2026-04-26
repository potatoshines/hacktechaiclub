"use client"

import { motion } from "framer-motion"
import { WrappedSection } from "../wrapped-section"

interface SlideDisciplineProps {
  latePercent: number
  latestLateHours: string
  earliestSubmissionDays: string
  label: string
}

export function SlideDiscipline({ latePercent, latestLateHours, earliestSubmissionDays, label }: SlideDisciplineProps) {
  const isGood = latePercent < 20

  return (
    <WrappedSection background="orbs">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 text-lg text-muted-foreground flex items-center justify-center gap-2"
        >
          <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>⏱️</motion.span>
          Discipline Check
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className={`text-7xl font-bold md:text-8xl ${isGood ? "text-primary" : "text-accent"}`}>
            {latePercent}%
          </span>
          <p className="mt-2 text-xl text-muted-foreground flex items-center justify-center gap-2">
            late submissions
            <motion.span animate={{ x: isGood ? [0, 5, 0] : [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
              {isGood ? "🏃‍♂️" : "🐢"}
            </motion.span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12 space-y-3"
        >
          <p className="text-muted-foreground">
            Latest late submission: <span className="font-semibold text-foreground">{latestLateHours}</span>
          </p>
          <p className="text-muted-foreground">
            Earliest ahead-of-deadline submission: <span className="font-semibold text-foreground">{earliestSubmissionDays}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="inline-block rounded-full border border-accent/30 px-8 py-4"
        >
          <p className="text-xl font-medium text-accent">{label}</p>
        </motion.div>
      </div>
    </WrappedSection>
  )
}
