"use client"

import { motion } from "framer-motion"
import { WrappedSection } from "../wrapped-section"

interface SlideClutchProps {
  isClutch: boolean
  highWeightScore: string
  finalsScore: string
}

export function SlideClutch({ isClutch, highWeightScore, finalsScore }: SlideClutchProps) {
  return (
    <WrappedSection background="spotlight">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 text-lg text-muted-foreground flex items-center justify-center gap-2"
        >
          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>⚡</motion.span>
          Clutch Factor
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.span 
            animate={{ scale: isClutch ? [1, 1.1, 1] : [1, 0.9, 1], rotate: isClutch ? [0, 5, -5, 0] : [0, 2, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl md:text-8xl inline-block"
          >
            {isClutch ? "🎯" : "📉"}
          </motion.span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-8 text-4xl font-bold text-foreground md:text-5xl"
        >
          {isClutch ? "Clutch Under Pressure" : "Fades Under Deadlines"}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-8 md:flex-row"
        >
          <div>
            <p className="text-4xl font-bold text-primary">{highWeightScore}</p>
            <p className="text-sm text-muted-foreground">High-weight assignments</p>
          </div>
          <div className="hidden h-12 w-px bg-border md:block" />
          <div>
            <p className="text-4xl font-bold text-primary">{finalsScore}</p>
            <p className="text-sm text-muted-foreground">Finals performance</p>
          </div>
        </motion.div>
      </div>
    </WrappedSection>
  )
}
