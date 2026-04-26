import { NextResponse } from "next/server"

const CANVAS_BASE = "https://canvas.pasadena.edu/api/v1"

async function fetchAllPages(url: string, headers: Record<string, string>): Promise<any[]> {
  const results: any[] = []
  let nextUrl: string | null = url
  while (nextUrl) {
    const res = await fetch(nextUrl, { headers })
    if (!res.ok) break
    const data = await res.json()
    if (!Array.isArray(data)) break
    results.push(...data)
    const link = res.headers.get("Link") ?? ""
    const next = link.match(/<([^>]+)>;\s*rel="next"/)
    nextUrl = next ? next[1] : null
  }
  return results
}

async function fetchJSON(url: string, headers: Record<string, string>): Promise<any> {
  const res = await fetch(url, { headers })
  const text = await res.text()
  try { return JSON.parse(text) } catch { return null }
}

export async function POST(req: Request) {
  const { token } = await req.json()
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 })

  const headers: Record<string, string> = { Authorization: `Bearer ${token}` }

  try {
    // Student name
    const profile = await fetchJSON(`${CANVAS_BASE}/users/self/profile`, headers)
    const student_name = profile?.name ?? profile?.short_name ?? null

    // Courses
    const [activeCourses, completedCourses] = await Promise.all([
      fetchAllPages(`${CANVAS_BASE}/courses?include[]=term&include[]=total_scores&state[]=available&per_page=100`, headers),
      fetchAllPages(`${CANVAS_BASE}/courses?include[]=term&include[]=total_scores&state[]=completed&per_page=100`, headers),
    ])

    // Enrollments with grades
    const [activeEnrollments, completedEnrollments] = await Promise.all([
      fetchAllPages(`${CANVAS_BASE}/users/self/enrollments?type[]=StudentEnrollment&state[]=active&include[]=grades&per_page=100`, headers),
      fetchAllPages(`${CANVAS_BASE}/users/self/enrollments?type[]=StudentEnrollment&state[]=completed&include[]=grades&per_page=100`, headers),
    ])

    const enrollmentMap = new Map<number, any>()
    for (const e of [...activeEnrollments, ...completedEnrollments]) {
      if (!enrollmentMap.has(e.course_id)) enrollmentMap.set(e.course_id, e)
    }

    const courseMap = new Map<number, any>()
    for (const c of [...activeCourses, ...completedCourses]) {
      if (c?.id && c?.name) courseMap.set(c.id, c)
    }

    const courses = await Promise.all(
      Array.from(courseMap.values()).map(async (course) => {
        const id: number = course.id
        const enrollment = enrollmentMap.get(id)
        const fallback = (course.enrollments ?? []).find((e: any) => e.type === "student")

        const current_grade = enrollment?.grades?.current_grade ?? fallback?.computed_current_grade ?? null
        const current_score = enrollment?.grades?.current_score ?? fallback?.computed_current_score ?? null

        const rawAssignments = await fetchAllPages(
          `${CANVAS_BASE}/courses/${id}/assignments?include[]=score_statistics&include[]=submission&per_page=100&order_by=due_at`,
          headers
        )

        const submissions = await fetchAllPages(
          `${CANVAS_BASE}/courses/${id}/students/submissions?student_ids[]=self&per_page=100`,
          headers
        )
        const subMap: Record<number, any> = {}
        for (const s of submissions) {
          if (s.assignment_id) subMap[s.assignment_id] = s
        }

        const assignments = rawAssignments.map((a: any) => {
          const inline = a.submission ?? null
          const meta = subMap[a.id] ?? null
          const score = inline?.score ?? meta?.score ?? null
          const pts = a.points_possible ?? null

          return {
            name: a.name,
            due_at: a.due_at ?? null,
            submitted_at: meta?.submitted_at ?? inline?.submitted_at ?? null,
            class_average: a.score_statistics?.mean ?? null,
            your_score: score,
            points_possible: pts,
            your_grade_percent: score != null && pts ? Math.round((score / pts) * 100) : null,
          }
        })

        return {
          name: course.name,
          current_grade,
          current_score,
          assignments,
        }
      })
    )

    return NextResponse.json({ student_name, courses })
  } catch (err) {
    return NextResponse.json({ error: "Fetch failed", details: String(err) }, { status: 500 })
  }
}