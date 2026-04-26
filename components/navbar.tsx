"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <img src="/icon.png" alt="Logo" className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Canvas Wrapped
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
            Canvas Wrapped
          </Link>
          <div className="h-4 w-px bg-border" />
          <span className="text-sm text-muted-foreground/50">More coming soon</span>
        </div>
      </div>
    </motion.nav>
  )
}
