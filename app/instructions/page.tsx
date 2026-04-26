import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function InstructionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Link 
          href="/" 
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Canvas Wrapped
        </Link>

        <h1 className="mb-4 text-4xl font-bold text-foreground">
          How to Get Your Canvas Token
        </h1>
        
        <p className="mb-12 text-lg text-muted-foreground">
          Follow these steps to generate an access token from Canvas LMS.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Step 1: Log into Canvas</h2>
            <p className="text-muted-foreground">
              Go to your institution&apos;s Canvas website and sign in with your credentials.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Step 2: Go to Account Settings</h2>
            <p className="text-muted-foreground">
              Click on your profile picture or name in the top-left corner, then select{" "}
              <span className="font-medium text-foreground">Settings</span>.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Step 3: Generate New Access Token</h2>
            <p className="mb-4 text-muted-foreground">
              Scroll down to the <span className="font-medium text-foreground">Approved Integrations</span> section
              and click <span className="font-medium text-foreground">+ New Access Token</span>.
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>Enter a purpose (e.g., &quot;Canvas Wrapped&quot;)</li>
              <li>Optionally set an expiration date for extra security</li>
              <li>Click <span className="font-medium text-foreground">Generate Token</span></li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Step 4: Copy Your Token</h2>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Important:</strong> Copy your token immediately.
              Canvas will only show it once. If you lose it, you&apos;ll need to generate a new one.
            </p>
          </section>
        </div>

        <div className="my-12 h-px bg-border" />

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Privacy & Security</h2>
          
          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-start gap-3">
              <svg className="mt-1 h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <p className="font-medium text-foreground">We never store your token</p>
                <p>Your Canvas token is only used during your session to fetch your data. It&apos;s never saved on our servers.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="mt-1 h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div>
                <p className="font-medium text-foreground">Read-only access</p>
                <p>The token only allows us to read your grades and assignments. We cannot modify anything in your Canvas account.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="mt-1 h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <div>
                <p className="font-medium text-foreground">Delete anytime</p>
                <p>You can revoke your token at any time from Canvas Settings → Approved Integrations. This immediately removes our access.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="mt-1 h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-foreground">Set an expiration</p>
                <p>For extra peace of mind, set your token to expire after a day or week. Canvas will automatically revoke it after that time.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="my-12 h-px bg-border" />

        <div className="text-center">
          <Link 
            href="/" 
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 font-medium text-primary-foreground hover:bg-primary/90"
          >
            Back to Canvas Wrapped
          </Link>
        </div>
      </div>
    </main>
  )
}
