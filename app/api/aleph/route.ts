import { NextResponse } from "next/server"

const ALEPH_API_URL = "https://aleph.occrp.org/api/2/search"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 })
  }

  const apiKey = process.env.ALEPH_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "ALEPH_API_KEY not configured" }, { status: 500 })
  }

  try {
    const response = await fetch(`${ALEPH_API_URL}?q=${encodeURIComponent(query)}&limit=10`, {
      headers: {
        Authorization: `ApiKey ${apiKey}`,
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Aleph API error:", response.status, errorText)
      return NextResponse.json(
        { error: `Aleph API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Transform the response to a more usable format
    const results = {
      total: data.total || 0,
      results: (data.results || []).map((item: any) => ({
        id: item.id,
        title: item.properties?.title?.[0] || item.properties?.name?.[0] || "Sin título",
        schema: item.schema,
        collection: item.collection?.label || "Desconocido",
        countries: item.properties?.countries || [],
        summary: item.properties?.summary?.[0] || item.properties?.description?.[0] || "",
        url: `https://aleph.occrp.org/entities/${item.id}`,
        date: item.properties?.date?.[0] || item.properties?.publishedAt?.[0] || null,
      })),
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("[v0] Error fetching from Aleph:", error)
    return NextResponse.json({ error: "Failed to fetch from Aleph API" }, { status: 500 })
  }
}
