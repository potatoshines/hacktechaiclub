"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { SectionTokenInput } from "@/components/wrapped/section-token-input"
import { LoadingScreen } from "@/components/wrapped/loading-screen"
import { SlideOpening } from "@/components/wrapped/slides/slide-opening"
import { SlidePerformance } from "@/components/wrapped/slides/slide-performance"
import { SlideDiscipline } from "@/components/wrapped/slides/slide-discipline"
import { SlideClutch } from "@/components/wrapped/slides/slide-clutch"
import { SlideComeback } from "@/components/wrapped/slides/slide-comeback"
import { SlideKeyMoments } from "@/components/wrapped/slides/slide-key-moments"
import { SlideClutchMoments } from "@/components/wrapped/slides/slide-clutch-moments"
import { SlideVibeCheck } from "@/components/wrapped/slides/slide-vibe-check"
import { SlideArchetype } from "@/components/wrapped/slides/slide-archetype"
import { SlideShare } from "@/components/wrapped/slides/slide-share"

// ── Shape of the final object returned by /api/analytics ─────────────────────
type AnalyticsData = {
  student_name: string | null
  semester_name: string | null
  analytics: {
    crossCourse: {
      bestClass: string | null
      worstClass: string | null
      overallAvgScore: number | null
      totalClutch: number
      totalLate: number
    }
    courses: Array<{
      courseName: string
      overallAvgScore: number | null
      lateRate: number
      latestLateMinutes: number | null
      averageLateMinutes: number | null
      lateSubmissionCount: number
      earliestSubmissionMinutes: number | null
      closestToDeadlineMinutes: number | null
      clutchSubmissionCount: number
      trend: number | null
      aboveClassCount: number
      belowClassCount: number
      avgVsClassDelta: number | null
      percentileVsClass: number | null
    }>
  }
  persona: {
    archetype: string
    stats: {
      clutch: number
      highScorer: number
      speedster: number
      consistency: number
      risk: number
    }
    summary: string
    vibeCheck: string
    recommendations: string[]
    caption: string
    roast: string
  }
}

// ── Map raw API data → slide props ────────────────────────────────────────────
function buildSlideProps(data: AnalyticsData) {
  const { analytics, persona } = data
  const { crossCourse, courses } = analytics

  // Best overall grade across courses
  const bestCourse = courses.find(c => c.courseName === crossCourse.bestClass)
  const worstCourse = courses.find(c => c.courseName === crossCourse.worstClass)

  // Overall late rate across all courses (average of per-course lateRate)
  const avgLateRate = courses.length
    ? courses.reduce((s, c) => s + c.lateRate, 0) / courses.length
    : 0
  const latePercent = Math.round(avgLateRate * 100)

  // Avg lateness in minutes → human-readable
  const totalLateMinutes = courses.reduce(
    (sum, c) => sum + (c.averageLateMinutes ?? 0) * c.lateSubmissionCount,
    0
  )
  const totalLateSubmissions = courses.reduce((sum, c) => sum + c.lateSubmissionCount, 0)
  const avgLateMinutes = totalLateSubmissions
    ? totalLateMinutes / totalLateSubmissions
    : 0
  const avgLateness = avgLateMinutes >= 60
    ? `${(avgLateMinutes / 60).toFixed(1)} hrs`
    : `${Math.round(avgLateMinutes)} min`

  // Percentile vs class (average across courses that have it)
  const pctCourses = courses.filter(c => c.percentileVsClass != null)
  const avgPercentile = pctCourses.length
    ? Math.round(pctCourses.reduce((s, c) => s + (c.percentileVsClass ?? 0), 0) / pctCourses.length)
    : null

  // Latest late submission in hours
  const latestLateMinutes = Math.max(...courses.map(c => c.latestLateMinutes ?? 0))
  const latestLateHours = latestLateMinutes > 0 ? `${(latestLateMinutes / 60 / 24).toFixed(1)} days` : "—"

  const earliestSubmissionMinutes = Math.max(...courses.map(c => c.earliestSubmissionMinutes ?? 0))
  const earliestSubmissionDays = earliestSubmissionMinutes > 0 ? `${(earliestSubmissionMinutes / 60 / 24).toFixed(1)} days` : "—"

  // Comeback: find largest positive trend
  const trendCourses = courses.filter(c => c.trend != null)
  const bestTrend = trendCourses.length
    ? trendCourses.sort((a, b) => (b.trend ?? 0) - (a.trend ?? 0))[0]
    : null
  const hasComeback = (bestTrend?.trend ?? 0) > 5

  // Closest submission to deadline (most clutch moment)
  const closestCourse = [...courses]
    .filter(c => c.closestToDeadlineMinutes != null)
    .sort((a, b) => (a.closestToDeadlineMinutes ?? 999999) - (b.closestToDeadlineMinutes ?? 999999))[0]

  // Key moments (courses)
  const keyMoments = [
    {
      label: "Best Course",
      value: crossCourse.bestClass ?? "—",
      subtitle: bestCourse?.overallAvgScore != null ? `${bestCourse.overallAvgScore}% overall` : undefined,
    },
    {
      label: "Hardest Course",
      value: crossCourse.worstClass ?? "—",
      subtitle: worstCourse?.overallAvgScore != null ? `${worstCourse.overallAvgScore}% overall` : undefined,
    },
  ]

  // Clutch moments
  const clutchMoments = [
    {
      label: "Total Clutch Submissions",
      value: String(crossCourse.totalClutch),
      subtitle: "Submitted within 15 min of deadline",
    },
    ...(closestCourse
      ? [{
          label: "Closest Call",
          value: closestCourse.courseName,
          subtitle: `${closestCourse.closestToDeadlineMinutes} min before deadline`,
        }]
      : []),
  ]

  return {
    // SlideOpening
    grade: crossCourse.overallAvgScore != null ? `${crossCourse.overallAvgScore}%` : "—",
    persona: persona.archetype ?? "Unknown",
    personaCaption: persona.caption ?? "",
    studentName: data.student_name,
    semesterName: data.semester_name,

    // SlidePerformance
    overallPercent: crossCourse.overallAvgScore ?? 0,
    strengths: (persona.recommendations ?? []).slice(0, 3), // repurpose as action items, or swap for static
    vsClass: avgPercentile != null
      ? `You scored higher than ${avgPercentile}% of your classmates`
      : undefined,

    // SlideDiscipline
    latePercent,
    latestLateHours,
    earliestSubmissionDays,
    disciplineLabel: latePercent > 30
      ? "Chronic Last-Minute Operator"
      : latePercent > 10
      ? "Occasional Procrastinator"
      : "Deadline Disciplinarian",

    // SlideClutch
    isClutch: crossCourse.totalClutch > 2 || (persona.stats?.clutch ?? 0) >= 7,
    highWeightScore: bestCourse?.overallAvgScore != null ? `${bestCourse.overallAvgScore}%` : "—",
    finalsScore: bestCourse?.overallAvgScore != null
      ? bestCourse.overallAvgScore >= 90 ? "A"
        : bestCourse.overallAvgScore >= 80 ? "B"
        : bestCourse.overallAvgScore >= 70 ? "C" : "D"
      : "—",

    // SlideComeback
    hasComeback,
    worstPoint: worstCourse?.overallAvgScore != null ? `${worstCourse.overallAvgScore}%` : undefined,
    recoveryPoint: bestCourse?.overallAvgScore != null ? `${bestCourse.overallAvgScore}%` : undefined,
    improvement: hasComeback && bestTrend?.trend != null ? `${bestTrend.trend}%` : undefined,
    comebackMessage: persona.summary ?? "",

    // SlideKeyMoments
    keyMoments,

    // SlideClutchMoments
    clutchMoments,

    // SlideArchetype
    riskProfile: persona.archetype ?? "Unknown",
    summary: persona.summary ?? "",
    vibeCheck: persona.vibeCheck ?? "",
    roast: persona.roast ?? "",
    recommendations: persona.recommendations ?? [],
  }
}

type AppState = "input" | "loading" | "wrapped" | "error"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("input")
  const [slideProps, setSlideProps] = useState<ReturnType<typeof buildSlideProps> | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleTokenSubmit = async (token: string, canvasUrl: string) => {
    setAppState("loading")
    setErrorMsg(null)

    try {
      const res = await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, canvasUrl }),
      })

      const contentType = res.headers.get("content-type") ?? ""
      if (!contentType.includes("application/json")) {
        throw new Error(`Unexpected response (HTTP ${res.status}) — is app/api/analytics/route.ts in place?`)
      }

      const data: AnalyticsData = await res.json()
      if (!res.ok) throw new Error((data as any).error ?? `HTTP ${res.status}`)

      setSlideProps(buildSlideProps(data))
      setAppState("wrapped")
    } catch (err: any) {
      setErrorMsg(err.message)
      setAppState("error")
    }
  }

  if (appState === "loading") return <LoadingScreen />

  if (appState === "error") {
    return (
      <main className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center p-8">
          <div className="max-w-md text-center">
            <p className="mb-4 text-lg text-muted-foreground">Something went wrong</p>
            <p className="mb-8 font-mono text-sm text-destructive">{errorMsg}</p>
            <button
              onClick={() => setAppState("input")}
              className="rounded-lg border border-border px-6 py-3 text-sm hover:bg-muted"
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (appState === "input") {
    return (
      <main className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        <SectionTokenInput onSubmit={handleTokenSubmit} />
      </main>
    )
  }

  // appState === "wrapped"
  const p = slideProps!
  return (
    <main className="relative h-screen overflow-x-hidden overflow-y-auto snap-y snap-mandatory scroll-smooth">
      <Navbar />

      <SlideOpening
        grade={p.grade}
        persona={p.persona}
        personaCaption={p.personaCaption}
        studentName={p.studentName}
        semesterName={p.semesterName}
      />

      <SlidePerformance
        overallPercent={p.overallPercent}
        strengths={p.strengths}
        vsClass={p.vsClass}
      />

      <SlideDiscipline
        latePercent={p.latePercent}
        latestLateHours={p.latestLateHours}
        earliestSubmissionDays={p.earliestSubmissionDays}
        label={p.disciplineLabel}
      />

      <SlideClutch
        isClutch={p.isClutch}
        highWeightScore={p.highWeightScore}
        finalsScore={p.finalsScore}
      />

      <SlideClutchMoments moments={p.clutchMoments} />

      <SlideComeback
        hasComeback={p.hasComeback}
        worstPoint={p.worstPoint}
        recoveryPoint={p.recoveryPoint}
        improvement={p.improvement}
        message={p.comebackMessage}
      />

      <SlideKeyMoments moments={p.keyMoments} />

      <SlideVibeCheck vibeCheck={p.vibeCheck} roast={p.roast} />

      <SlideArchetype
        riskProfile={p.riskProfile}
        summary={p.summary}
        recommendations={p.recommendations}
      />

      <SlideShare />
    </main>
  )
}
