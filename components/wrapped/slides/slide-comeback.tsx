"use client"

import { motion } from "framer-motion"
import { WrappedSection } from "../wrapped-section"

interface SlideComebackProps {
  hasComeback: boolean
  worstPoint?: string
  recoveryPoint?: string
  improvement?: string
  message: string
}

export function SlideComeback({ hasComeback, worstPoint, recoveryPoint, improvement, message }: SlideComebackProps) {
  return (
    <WrappedSection background="gradient-mesh">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 text-2xl md:text-3xl font-bold text-foreground"
        >
          {hasComeback ? "Comeback Story" : "Consistency Check"}
        </motion.p>

        {hasComeback && worstPoint && recoveryPoint ? (
          <>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center justify-center gap-6"
            >
              <div>
                <p className="text-5xl font-bold text-accent md:text-6xl">{worstPoint}</p>
                <p className="text-sm text-muted-foreground">Worst Point</p>
                <p className="mt-2 text-xs text-muted-foreground/80">Lowest course average from the semester.</p>
              </div>
              
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-2"
              >
                <div className="h-px w-16 bg-gradient-to-r from-accent to-primary md:w-24" />
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.div>

              <div>
                <p className="text-5xl font-bold text-primary md:text-6xl">{recoveryPoint}</p>
                <p className="text-sm text-muted-foreground">Recovery</p>
                <p className="mt-2 text-xs text-muted-foreground/80">Your strongest course performance this semester.</p>
              </div>
            </motion.div>

            {improvement && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="mb-8 inline-block rounded-full border border-primary/30 px-6 py-3"
              >
                <span className="text-xl font-semibold text-primary">+{improvement} improvement</span>
                <p className="mt-2 text-xs text-muted-foreground/80">Based on second-half growth vs first-half performance.</p>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <motion.span 
              className="text-7xl inline-block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >👑</motion.span>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-lg text-xl text-muted-foreground"
        >
          {message}
        </motion.p>
      </div>
    </WrappedSection>
  )
}
