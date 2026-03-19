import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch(
      `${BACKEND_URL}/api/v1/itinerary/generate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(180_000), // 3 min timeout
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { detail: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ detail: message }, { status: 502 })
  }
}
