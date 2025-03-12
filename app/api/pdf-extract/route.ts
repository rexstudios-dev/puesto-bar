import { NextResponse } from "next/server"
import { extractMenuDataFromPDF, extractLogosFromPDF } from "@/lib/pdf-extractor"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convertir el archivo a ArrayBuffer
    const buffer = await file.arrayBuffer()

    // Extraer datos del menú y logos
    const [menuData, logos] = await Promise.all([extractMenuDataFromPDF(buffer), extractLogosFromPDF(buffer)])

    // Organizar los datos por categoría
    const organizedMenu: Record<string, any[]> = {
      cafeteria: [],
      comidas: [],
      postres: [],
      bebidas: [],
      vinos: [],
      otros: [],
    }

    menuData.forEach((item) => {
      const category = item.category.toLowerCase()
      if (organizedMenu[category]) {
        organizedMenu[category].push({
          name: item.name,
          description: item.description || "",
          price: item.price,
          logo: logos[Math.floor(Math.random() * logos.length)], // Asignar un logo aleatorio por ahora
        })
      } else {
        organizedMenu.otros.push({
          name: item.name,
          description: item.description || "",
          price: item.price,
          logo: logos[Math.floor(Math.random() * logos.length)],
        })
      }
    })

    return NextResponse.json({
      menu: organizedMenu,
      logos,
    })
  } catch (error) {
    console.error("Error processing PDF:", error)
    return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 })
  }
}

