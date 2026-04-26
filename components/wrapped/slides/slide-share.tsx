"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { WrappedSection } from "../wrapped-section"
import { useState } from "react"

interface SlideShareProps {
  onShare?: () => void
  onDownload?: () => void
}

export function SlideShare({ onShare, onDownload }: SlideShareProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    // Create a shareable URL (placeholder for now)
    const shareUrl = window.location.href
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Canvas Wrapped",
          text: "Check out my Canvas wrapped!",
          url: shareUrl,
        })
      } catch {
        // User cancelled or error - fall back to copy
        await copyToClipboard(shareUrl)
      }
    } else {
      await copyToClipboard(shareUrl)
    }
    
    onShare?.()
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    // For now, trigger print dialog which allows saving as PDF
    window.print()
    onDownload?.()
  }

  return (
    <WrappedSection background="orbs">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <motion.span 
            className="text-8xl inline-block"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >🎉</motion.span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-4 text-5xl font-bold text-foreground md:text-6xl"
        >
          That's a Wrap!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-12 text-lg text-muted-foreground flex items-center justify-center gap-2"
        >
          Share your semester achievements with friends
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button
            size="lg"
            onClick={handleShare}
            className="h-14 gap-3 rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {copied ? "Link Copied!" : "Share Your Canvas Wrapped"}
          </Button>

          {/* <Button
            size="lg"
            variant="outline"
            onClick={handleDownload}
            className="h-14 gap-3 rounded-full border-border px-8 text-foreground hover:bg-card"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download as PDF
          </Button> */}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-sm text-muted-foreground/60"
        >
          Made with love for students everywhere
        </motion.p>
      </div>
    </WrappedSection>
  )
}
