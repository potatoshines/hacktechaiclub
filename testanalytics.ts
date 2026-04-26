import data from "./data/gradesShin2.json"
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import { computeAnalytics } from "./lib/analytics"
import { classifyStudent } from "./lib/llm"

async function run() {
  const analytics = computeAnalytics(data)

  console.log("ANALYTICS:")
  console.log(analytics)

  try {
    const explanation = await classifyStudent({
      summary: analytics.crossCourse,
      courses: analytics.courses
    })

    console.log("\nEXPLANATION:")
    console.log(explanation)

  } catch (err) {
    console.error("\nERROR:")
    console.error(err)
  }
}

run()