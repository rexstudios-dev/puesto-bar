import { google } from "googleapis"
import { JWT } from "google-auth-library"

// This function will authenticate with Google and fetch the menu data from Drive
export async function fetchMenuDataFromDrive(fileId: string) {
  try {
    // Create a JWT client using environment variables for authentication
    const auth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    })

    // Create Drive client
    const drive = google.drive({ version: "v3", auth })

    // Get the file from Drive
    const response = await drive.files.export({
      fileId,
      mimeType: "text/csv",
    })

    // Parse the CSV data
    const csvData = response.data as string
    const parsedData = parseCSV(csvData)

    return parsedData
  } catch (error) {
    console.error("Error fetching menu data from Drive:", error)
    return null
  }
}

// Helper function to parse CSV data
function parseCSV(csvData: string) {
  const lines = csvData.split("\n")
  const headers = lines[0].split(",")

  const result = []

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue

    const obj: Record<string, string> = {}
    const currentLine = lines[i].split(",")

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentLine[j]?.trim() || ""
    }

    result.push(obj)
  }

  return result
}

// Function to organize menu data by category
export function organizeMenuByCategory(menuData: any[]) {
  const categories: Record<string, any[]> = {
    cafeteria: [],
    comidas: [],
    postres: [],
    bebidas: [],
    vinos: [],
  }

  menuData.forEach((item) => {
    const category = item.category?.toLowerCase() || ""

    if (categories[category]) {
      categories[category].push({
        name: item.name,
        description: item.description || "",
        price: item.price,
        logo: item.logo || "",
      })
    }
  })

  return categories
}

