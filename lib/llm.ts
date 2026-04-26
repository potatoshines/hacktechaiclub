export async function classifyStudent(input: any) {
  const res = await fetch("https://api.k2think.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.K2_API_KEY}`,
      "Content-Type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify({
      model: "MBZUAI-IFM/K2-Think-v2",
      temperature: 0.3,
      stream: false,
      messages: [
        {
          role: "system",
          content: `
            You are generating structured student analytics.

            Rules:
            - Do NOT explain your reasoning
            - Do NOT list courses individually
            - Do NOT output anything except valid JSON
            - Use ONLY the provided data

            Task:
            1. Determine ONE archetype
            2. Assign stats (0–10 scale)
            3. Write a short summary WITH quantitative context
            4. Write a fun AI vibe check in 1–2 sentences
            5. Provide 2–3 recommendations

            IMPORTANT for summary:
            - You MUST include counts or ratios (e.g. "22 out of 25 courses", "most courses", "a majority of courses")
            - Refer to performance across courses, not specific course names
            - Keep it 1–2 sentences, concise

            Return ONLY this JSON:

            {
              "archetype": "...",
              "stats": {
                "clutch": number,
                "highScorer": number,
                "speedster": number,
                "consistency": number,
                "risk": number
              },
              "summary": "...",
              "vibeCheck": "...",
              "recommendations": ["...", "..."]
            }
            `
        },
        {
          role: "user",
          content: `
          Student data:
          ${JSON.stringify(input, null, 2)}
          `
        }
      ]
    })
  })

  const json = await res.json()

  const content =
    json.choices?.[0]?.message?.content ||
    json.choices?.[0]?.text ||
    json.output ||
    json.response ||
    ""

  if (!content) {
    throw new Error("No response from model")
  }

  const parts = content.split("</think>")

  const afterThink = parts.length > 1 ? parts[1] : content

  const cleaned = afterThink.trim()

  return JSON.parse(cleaned)
}

export async function generatePersonaCaption(archetype: string, stats: any, analytics: any) {
  const res = await fetch("https://api.k2think.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.K2_API_KEY}`,
      "Content-Type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify({
      model: "MBZUAI-IFM/K2-Think-v2",
      temperature: 0.3,
      stream: false,
      messages: [
        {
          role: "system",
          content: `
            You are generating a personalized caption explaining why a student was assigned a specific persona based on their academic stats.

            Rules:
            - Be specific and personalize to the provided stats
            - Include quantitative context (e.g., "high grades on 25/30 classes")
            - Keep it 1-2 sentences, concise
            - Explain the reasoning based on the archetype and stats
            - Do NOT output anything except the caption text

            Return ONLY the caption text, no quotes or extra formatting.
            `
        },
        {
          role: "user",
          content: `
          Archetype: ${archetype}
          Stats: ${JSON.stringify(stats)}
          Analytics: ${JSON.stringify(analytics)}
          `
        }
      ]
    })
  })

  const json = await res.json()

  const content =
    json.choices?.[0]?.message?.content ||
    json.choices?.[0]?.text ||
    json.output ||
    json.response ||
    ""

  if (!content) {
    throw new Error("No response from model")
  }

  const parts = content.split("</think>")

  const afterThink = parts.length > 1 ? parts[1] : content

  return afterThink.trim()
}

export async function generateStudentRoast(vibeCheck: string, archetype: string, analytics: any) {
  const res = await fetch("https://api.k2think.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.K2_API_KEY}`,
      "Content-Type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify({
      model: "MBZUAI-IFM/K2-Think-v2",
      temperature: 0.5,
      stream: false,
      messages: [
        {
          role: "system",
          content: `
            You are generating a playful, funny roast for a student based on their academic archetype and vibe check.

            Rules:
            - Be witty, sarcastic, and humorous (not mean)
            - Keep it short (1 sentence max)
            - Reference their archetype or academic habits
            - Use their stats if relevant
            - Do NOT output anything except the roast text

            Return ONLY the roast text, no quotes or extra formatting.
            `
        },
        {
          role: "user",
          content: `
          Archetype: ${archetype}
          Vibe Check: ${vibeCheck}
          Analytics: ${JSON.stringify(analytics)}
          `
        }
      ]
    })
  })

  const json = await res.json()

  const content =
    json.choices?.[0]?.message?.content ||
    json.choices?.[0]?.text ||
    json.output ||
    json.response ||
    ""

  if (!content) {
    throw new Error("No response from model")
  }

  const parts = content.split("</think>")

  const afterThink = parts.length > 1 ? parts[1] : content

  return afterThink.trim()
}
