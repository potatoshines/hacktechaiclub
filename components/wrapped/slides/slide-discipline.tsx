"use client"

import { motion } from "framer-motion"
import { WrappedSection } from "../wrapped-section"

interface SlideDisciplineProps {
  latePercent: number
  avgLateness: string
  label: string
}

export function SlideDiscipline({ latePercent, avgLateness, label }: SlideDisciplineProps) {
  const isGood = latePercent < 20

  return (
    <WrappedSection background="waves">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 text-lg text-muted-foreground"
        >
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
          <p className="mt-2 text-xl text-muted-foreground">late submissions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-muted-foreground">
            Average lateness: <span className="font-semibold text-foreground">{avgLateness}</span>
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
