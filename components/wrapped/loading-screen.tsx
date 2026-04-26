"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const loadingMessages = [
  "Fetching your courses...",
  "Analyzing your grades...",
  "Finding your best moments...",
  "Calculating your study patterns...",
  "Streaming your AI vibe check...",
  "Almost there...",
]

export function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [streamedText, setStreamedText] = useState("")

  useEffect(() => {
    setStreamedText("")
    const fullMessage = loadingMessages[messageIndex]
    let charIndex = 0
    let timeout: ReturnType<typeof setTimeout>

    const typeNext = () => {
      charIndex += 1
      setStreamedText(fullMessage.slice(0, charIndex))

      if (charIndex < fullMessage.length) {
        timeout = setTimeout(typeNext, 35)
        return
      }

      timeout = setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
      }, 900)
    }

    timeout = setTimeout(typeNext, 50)
    return () => clearTimeout(timeout)
  }, [messageIndex])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 300 + i * 100,
              height: 300 + i * 100,
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
              border: `1px solid var(--color-primary)`,
              opacity: 0.1,
            }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Glowing center */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute h-64 w-64 rounded-full bg-primary/20 blur-3xl"
      />

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Loading text */}
        <motion.h2
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-4 text-2xl font-semibold text-foreground"
        >
          {streamedText}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="ml-1 inline-block"
          >
            |
          </motion.span>
        </motion.h2>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
