import { cache } from "react"

interface InstagramMedia {
  id: string
  media_type: string
  media_url: string
  permalink: string
  thumbnail_url?: string
  timestamp: string
  caption?: string
}

interface InstagramStory {
  id: string
  media_type: string
  media_url: string
  timestamp: string
}

// Cached function to fetch Instagram posts
export const fetchInstagramPosts = cache(async () => {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

    if (!accessToken) {
      console.error("Instagram access token is missing")
      return []
    }

    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}`,
    )

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data as InstagramMedia[]
  } catch (error) {
    console.error("Error fetching Instagram posts:", error)
    return []
  }
})

// Cached function to fetch Instagram stories
export const fetchInstagramStories = cache(async () => {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const userId = process.env.INSTAGRAM_USER_ID

    if (!accessToken || !userId) {
      console.error("Instagram credentials are missing")
      return []
    }

    // Note: Fetching stories requires a special permission from Instagram
    // This is a simplified example - in reality, you need a Facebook app review
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${userId}/stories?fields=media_type,media_url,timestamp&access_token=${accessToken}`,
    )

    if (!response.ok) {
      throw new Error(`Instagram Stories API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data as InstagramStory[]
  } catch (error) {
    console.error("Error fetching Instagram stories:", error)
    return []
  }
})

