"use client"

import { motion } from "framer-motion"
import { WrappedSection } from "../wrapped-section"

interface SlideOpeningProps {
  grade: string
  persona: string
  personaCaption: string
  studentName: string | null
  semesterName: string | null
}

export function SlideOpening({ grade, persona, personaCaption, studentName, semesterName }: SlideOpeningProps) {
  return (
    <WrappedSection background="spotlight">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-2 text-sm uppercase tracking-wider text-muted-foreground flex items-center justify-center gap-2"
        >
          <motion.span 
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎓
          </motion.span>
          CANVAS WRAPPED: UNTIL NOW
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 text-lg text-muted-foreground"
        >
          {studentName ? `${studentName}, ` : ""}your average score is:
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="bg-gradient-to-r from-primary via-accent to-chart-3 bg-clip-text text-9xl font-bold tracking-tight text-transparent md:text-[12rem]">
            {grade}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <p className="mb-2 text-muted-foreground flex justify-center items-center gap-2">
            Your persona
          </p>
          <motion.p 
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-semibold text-foreground md:text-4xl inline-block"
          >
            {persona}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-2 text-sm text-muted-foreground text-center"
          >
            {personaCaption}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 flex items-center justify-center gap-2 text-muted-foreground"
        >
          <span className="text-sm">Keep scrolling</span>
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.div>
      </div>
    </WrappedSection>
  )
}
