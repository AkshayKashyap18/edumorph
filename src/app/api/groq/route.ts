import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const apiKey = process.env.GROQ_API_KEY;
  const model = "llama3-8b-8192"; // ✅ Replace if you switch models later

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json({ error }, { status: 500 });
  }

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "No response.";

  return NextResponse.json({ reply });
}
