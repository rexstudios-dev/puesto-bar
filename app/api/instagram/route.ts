import { NextResponse } from "next/server"
import { fetchInstagramPosts, fetchInstagramStories } from "@/lib/instagram"

export async function GET() {
  try {
    // Fetch Instagram posts and stories
    const [posts, stories] = await Promise.all([fetchInstagramPosts(), fetchInstagramStories()])

    return NextResponse.json({
      posts,
      stories,
    })
  } catch (error) {
    console.error("Error in Instagram API route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

