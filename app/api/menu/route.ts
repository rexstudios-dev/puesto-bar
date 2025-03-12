import { NextResponse } from "next/server"
import { fetchMenuDataFromDrive, organizeMenuByCategory } from "@/lib/google-drive"

// This is the Google Drive file ID from the shared link
const MENU_FILE_ID = "116gtK8QCmWbjJr64ka59m_E3NTKqsFfl"

export async function GET() {
  try {
    // Fetch menu data from Google Drive
    const menuData = await fetchMenuDataFromDrive(MENU_FILE_ID)

    if (!menuData) {
      return NextResponse.json({ error: "Failed to fetch menu data" }, { status: 500 })
    }

    // Organize the menu data by category
    const organizedMenu = organizeMenuByCategory(menuData)

    return NextResponse.json(organizedMenu)
  } catch (error) {
    console.error("Error in menu API route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

