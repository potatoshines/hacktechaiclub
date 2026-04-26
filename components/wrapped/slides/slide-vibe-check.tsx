"use client"

import { motion } from "framer-motion"
import { WrappedSection } from "../wrapped-section"

interface SlideVibeCheckProps {
  vibeCheck: string
  roast?: string
}

export function SlideVibeCheck({ vibeCheck, roast }: SlideVibeCheckProps) {
  return (
    <WrappedSection background="gradient-mesh">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-4 text-lg md:text-xl font-bold text-foreground flex items-center justify-center gap-2"
        >
          <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-4xl">
            🤖
          </motion.span>
          AI Vibe Check
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl rounded-3xl border border-border/40 bg-background/35 p-8 shadow-2xl backdrop-blur-xl md:p-12"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
            className="text-balance text-2xl leading-relaxed text-foreground md:text-3xl font-semibold"
          >
            {vibeCheck || "Your vibe check is still loading."}
          </motion.p>

          {roast && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-10 pt-8 border-t border-border/40"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-rose-300">
                AI Roast
              </p>
              <p className="mt-4 text-balance text-2xl leading-relaxed text-rose-400 md:text-3xl font-semibold">
                {roast}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </WrappedSection>
  )
}
