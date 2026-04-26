type Assignment = {
  due_at: string | null
  submitted_at: string | null
  your_score: number | null
  points_possible: number | null
  class_average?: number | null
}

//test//

type Course = {
  name: string
  assignments: Assignment[]
}

function parseDate(s?: string | null): number | null {
  if (!s) return null
  return new Date(s).getTime()
}

function minutesBetween(a: number, b: number) {
  return Math.round((a - b) / 60000)
}

function avg(arr: number[]): number | null {
  if (!arr.length) return null
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

export function computeAnalytics(rawData: { courses: any[] }) {
  const courses = (rawData.courses as Course[])
    .filter((course) => /^[A-Za-z]{3}\d{2}/.test(course.name))
    .map((course) => {
      let totalScore = 0
      let totalPossible = 0

      let lateCount = 0
      let submissions = 0

      let latestLateMinutes: number | null = null
      let earliestMinutes: number | null = null
      let closestMinutes: number | null = null
      let clutchCount = 0

      let aboveCount = 0
      let belowCount = 0
      const avgDeltas: number[] = []
      const lateSubmissionMinutes: number[] = []
      const scores: number[] = []

      for (const a of course.assignments) {
        if (!a.points_possible || a.your_score == null) continue

        totalScore += a.your_score
        totalPossible += a.points_possible

        const pct = (a.your_score / a.points_possible) * 100
        scores.push(pct)

        if (a.class_average != null && a.points_possible) {
          const classPct = (a.class_average / a.points_possible) * 100
          const delta = pct - classPct

          avgDeltas.push(delta)

          if (delta > 0) aboveCount++
          else if (delta < 0) belowCount++
        }

        const due = parseDate(a.due_at)
        const sub = parseDate(a.submitted_at)

        if (sub) submissions++

        if (due && sub) {
          const diff = minutesBetween(due, sub)
          const lateMinutes = minutesBetween(sub, due)

          if (lateMinutes > 0) {
            lateCount++
            lateSubmissionMinutes.push(lateMinutes)
            if (latestLateMinutes === null || lateMinutes > latestLateMinutes) {
              latestLateMinutes = lateMinutes
            }
          }

          if (diff > 0) {
            if (earliestMinutes === null || diff > earliestMinutes) {
              earliestMinutes = diff
            }
          }

          if (diff >= 0) {
            if (closestMinutes === null || diff < closestMinutes) {
              closestMinutes = diff
            }
          }

          if (diff >= 0 && diff <= 15) {
            clutchCount++
          }
        }
      }

      const overallAvgScore = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : null
      const lateRate = submissions ? lateCount / submissions : 0

      let trend: number | null = null
      if (scores.length >= 6) {
        const mid = Math.floor(scores.length / 2)
        const first = scores.slice(0, mid)
        const second = scores.slice(mid)

        const avg1 = avg(first)
        const avg2 = avg(second)

        if (avg1 != null && avg2 != null) {
          trend = Math.round(avg2 - avg1)
        }
      }

      const avgVsClass = avg(avgDeltas)
      let percentileVsClass: number | null = null

      if (avgVsClass != null) {
        const scaled = 50 + avgVsClass * 2
        percentileVsClass = Math.max(1, Math.min(99, Math.round(scaled)))
      }

      const averageLateMinutes = lateSubmissionMinutes.length
        ? Math.round(lateSubmissionMinutes.reduce((s, v) => s + v, 0) / lateSubmissionMinutes.length)
        : null

      return {
        courseName: course.name,
        overallAvgScore,
        lateRate: Number(lateRate.toFixed(2)),
        latestLateMinutes,
        averageLateMinutes,
        lateSubmissionCount: lateSubmissionMinutes.length,
        earliestSubmissionMinutes: earliestMinutes,
        closestToDeadlineMinutes: closestMinutes,
        clutchSubmissionCount: clutchCount,
        trend,
        aboveClassCount: aboveCount,
        belowClassCount: belowCount,
        avgVsClassDelta: avgVsClass != null ? Math.round(avgVsClass) : null,
        percentileVsClass,
      }
    })

  const valid = courses.filter(c => c.overallAvgScore !== null)

  const crossCourse = {
    bestClass: valid.length
      ? [...valid].sort((a, b) => b.overallAvgScore! - a.overallAvgScore!)[0].courseName
      : null,
    worstClass: valid.length
      ? [...valid].sort((a, b) => a.overallAvgScore! - b.overallAvgScore!)[0].courseName
      : null,
    overallAvgScore: valid.length
      ? Math.round(valid.reduce((s, c) => s + (c.overallAvgScore || 0), 0) / valid.length)
      : null,
    totalClutch: courses.reduce((s, c) => s + c.clutchSubmissionCount, 0),
    totalLate: courses.reduce((s, c) => s + (c.lateRate > 0 ? 1 : 0), 0),
  }

  return { crossCourse, courses }
}
