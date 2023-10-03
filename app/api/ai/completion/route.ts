// import { Ratelimit } from "@upstash/ratelimit"
// import { kv } from "@vercel/kv"

import { OpenAIStream, StreamingTextResponse } from "ai"

import { openai } from "@/config/openai"

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
export const runtime = "edge"

export async function POST(req: Request): Promise<Response> {
  // Check if the OPENAI_API_KEY is set, if not return 400
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
    return new Response(
      "Missing OPENAI_API_KEY – make sure to add it to your .env file.",
      {
        status: 400,
      }
    )
  }
  // if (
  //   process.env.NODE_ENV != "development" &&
  //   process.env.KV_REST_API_URL &&
  //   process.env.KV_REST_API_TOKEN
  // ) {
  //   const ip = req.headers.get("x-forwarded-for")
  //   const ratelimit = new Ratelimit({
  //     redis: kv,
  //     limiter: Ratelimit.slidingWindow(50, "1 d"),
  //   })

  //   const { success, limit, reset, remaining } = await ratelimit.limit(
  //     `novel_ratelimit_${ip}`
  //   )

  //   if (!success) {
  //     return new Response("You have reached your request limit for the day.", {
  //       status: 429,
  //       headers: {
  //         "X-RateLimit-Limit": limit.toString(),
  //         "X-RateLimit-Remaining": remaining.toString(),
  //         "X-RateLimit-Reset": reset.toString(),
  //       },
  //     })
  //   }
  // }

  let { prompt } = await req.json()

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an AI writing assistant that write a description of a property, space, room, floor or desk based on JSON content for someone that will publish their space online. " +
          "Give more weight/priority to the later characters than the beginning ones. " +
          "Limit your response to no more than 100 characters, but make sure to construct complete sentences.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
