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
    <WrappedSection background="gradient-mesh">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-2xl md:text-3xl font-bold text-foreground"
        >
          Clutch Moments
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
              <p className="text-4xl md:text-5xl font-extrabold text-foreground">
                {moment.value}
              </p>
                {moment.subtitle && (
                <p className="mt-2 text-lg text-muted-foreground">
                    {moment.subtitle.split(/(\d+\s*min)/).map((part, i) =>
                    /\d+\s*min/.test(part) ? (
                        <span key={i} className="font-bold text-primary">
                        {part}
                        </span>
                    ) : (
                        part
                    )
                    )}
                </p>
                )}
            </motion.div>
          ))}
        </div>
      </div>
    </WrappedSection>
  )
}