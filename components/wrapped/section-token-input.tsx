"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { WrappedSection } from "./wrapped-section"

interface SectionTokenInputProps {
  onSubmit: (token: string, canvasUrl: string) => void
  isLoading?: boolean
}

export function SectionTokenInput({ onSubmit, isLoading }: SectionTokenInputProps) {
  const [token, setToken] = useState("")
  const [canvasUrl, setCanvasUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (token.trim() && canvasUrl.trim()) {
      onSubmit(token.trim(), canvasUrl.trim())
    }
  }

  return (
    <WrappedSection background="orbs">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2"
        >
          <span className="text-sm font-medium text-primary">Rewind Time</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl"
        >
          Your Canvas,
          <br />
          <motion.span
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="bg-[linear-gradient(90deg,#ff4d4d,#ffb84d,#fff94d,#55d96c,#4dd9ff,#9b7bff,#ff4dd8)] bg-[length:300%_100%] bg-clip-text text-transparent"
          >
            Wrapped
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mb-12 max-w-lg text-pretty text-lg text-muted-foreground"
        >
          Enter your school's Canvas URL and access token to see your personalized semester recap.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-md flex-col gap-4"
        >
          <div className="text-center">
            <label className="text-sm text-muted-foreground mb-2 block">School Canvas URL</label>
            <Input
              type="url"
              placeholder="https://your-school.instructure.com"
              value={canvasUrl}
              onChange={(e) => setCanvasUrl(e.target.value)}
              className="h-14 rounded-full border-border/50 bg-card/50 px-6 text-center text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              disabled={isLoading}
            />
          </div>
          <Input
            type="password"
            placeholder="Paste your Canvas token here..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="h-14 rounded-full border-border/50 bg-card/50 px-6 text-center text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            size="lg"
            disabled={!token.trim() || !canvasUrl.trim() || isLoading}
            className="h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-5 w-5 rounded-full border-2 border-primary-foreground border-t-transparent"
              />
            ) : (
              "Generate My Canvas Wrapped"
            )}
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <Link 
            href="/instructions" 
            className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            How do I get my Canvas token?
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mx-auto mt-8 max-w-md rounded-lg border border-accent/20 bg-accent/5 p-4 text-left"
        >
          <div className="flex gap-3">
            <svg className="h-5 w-5 flex-shrink-0 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-xs text-muted-foreground">
              <p className="mb-1 font-semibold text-foreground">Privacy Notice</p>
              <p>Your Canvas token is <strong>never stored</strong> on our servers. It's used only temporarily to fetch your data during this session and is immediately discarded after processing.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 flex items-center justify-center gap-2 text-muted-foreground"
        >
          <span className="text-sm">Your data stays private</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </motion.div>
      </div>
    </WrappedSection>
  )
}
