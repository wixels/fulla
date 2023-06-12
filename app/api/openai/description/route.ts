import { NextResponse } from "next/server"

import { openai } from "@/config/openai"

export async function GET() {
  const comp = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Give me a random sentence no more than 10 words.",
      },
    ],
  })

  return NextResponse.json({ text: comp.data.choices?.[0].message?.content })
}
