"use client"

import { motion } from "framer-motion"
import { WrappedSection } from "../wrapped-section"

interface ClutchMoment {
  label: string
  value: string
  subtitle?: string
}

interface SlideClutchMomentsProps {
  moments: ClutchMoment[]
}

export function SlideClutchMoments({ moments }: SlideClutchMomentsProps) {
  return (
    <WrappedSection background="particles">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-lg text-muted-foreground flex items-center justify-center gap-2"
        >
          <motion.span animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            ⚡
          </motion.span>
          Clutch Moments
          <motion.span animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            🔥
          </motion.span>
        </motion.p>

        <div className="space-y-12">
          {moments.map((moment, index) => (
            <motion.div
              key={moment.label}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <p className="mb-2 text-sm uppercase tracking-wider text-muted-foreground">
                {moment.label}
              </p>
              <p className="text-3xl font-bold text-foreground md:text-4xl">
                {moment.value}
              </p>
              {moment.subtitle && (
                <p className="mt-1 text-muted-foreground">{moment.subtitle}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </WrappedSection>
  )
}