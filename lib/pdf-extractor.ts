import { PDFDocument } from "pdf-lib"
import * as pdfjs from "pdfjs-dist"

// Configurar el worker de PDF.js
const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry")
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

interface MenuItemExtracted {
  name: string
  description: string
  price: string
  category: string
  logoPosition?: { x: number; y: number; width: number; height: number; pageIndex: number }
}

export async function extractMenuDataFromPDF(pdfBuffer: ArrayBuffer): Promise<MenuItemExtracted[]> {
  try {
    // Cargar el PDF con pdf.js para extracción de texto
    const loadingTask = pdfjs.getDocument({ data: pdfBuffer })
    const pdf = await loadingTask.promise

    const menuItems: MenuItemExtracted[] = []
    const numPages = pdf.numPages

    // Patrones para identificar elementos del menú
    const pricePattern = /\$[\d,]+/
    const categoryPatterns = {
      cafeteria: /café|cafetería|espresso|latte|cappuccino/i,
      comidas: /comidas|platos|hamburguesa|milanesa|bife/i,
      postres: /postres|dulces|torta|flan|helado/i,
      bebidas: /bebidas|tragos|gin|mojito|cerveza/i,
      vinos: /vinos|malbec|cabernet|espumante/i,
    }

    // Procesar cada página
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const textItems = textContent.items.map((item) => ("str" in item ? item.str : ""))

      // Analizar el texto para encontrar elementos del menú
      let currentCategory = ""

      for (let j = 0; j < textItems.length; j++) {
        const text = textItems[j]

        // Detectar categorías
        for (const [category, pattern] of Object.entries(categoryPatterns)) {
          if (pattern.test(text)) {
            currentCategory = category
            break
          }
        }

        // Detectar elementos del menú (nombre + precio)
        const priceMatch = text.match(pricePattern)
        if (priceMatch) {
          const price = priceMatch[0]

          // Buscar hacia atrás para encontrar el nombre
          let name = ""
          let description = ""

          // Asumimos que el nombre está en la misma línea o en la anterior
          if (text.replace(price, "").trim()) {
            name = text.replace(price, "").trim()
          } else if (j > 0) {
            name = textItems[j - 1].trim()

            // Buscar descripción (podría estar en la línea siguiente)
            if (j < textItems.length - 1 && !textItems[j + 1].match(pricePattern)) {
              description = textItems[j + 1].trim()
            }
          }

          if (name) {
            menuItems.push({
              name,
              description,
              price,
              category: currentCategory || "otros",
              // La posición del logo se detectará en otro paso
            })
          }
        }
      }
    }

    // Ahora usamos pdf-lib para detectar imágenes (logos)
    const pdfDoc = await PDFDocument.load(pdfBuffer)

    // Extraer información sobre las imágenes
    for (let i = 0; i < pdfDoc.getPageCount(); i++) {
      const page = pdfDoc.getPage(i)

      // Nota: La detección de imágenes con pdf-lib es limitada
      // En una implementación real, necesitaríamos técnicas más avanzadas
      // Este es un placeholder para la funcionalidad

      // Asociar logos con elementos del menú basados en proximidad
      // Esta es una simplificación - en la realidad necesitaríamos analizar
      // la estructura visual del PDF
    }

    return menuItems
  } catch (error) {
    console.error("Error extracting data from PDF:", error)
    throw new Error("Failed to extract menu data from PDF")
  }
}

export async function extractLogosFromPDF(pdfBuffer: ArrayBuffer): Promise<string[]> {
  try {
    // Cargar el PDF
    const pdfDoc = await PDFDocument.load(pdfBuffer)
    const extractedLogos: string[] = []

    // Esta es una implementación simplificada
    // En la realidad, extraer imágenes de PDFs es complejo y depende
    // de cómo fueron incorporadas al PDF

    // Placeholder para la funcionalidad de extracción de logos
    // Retornamos URLs de logos de ejemplo
    return ["/logos/coffee.svg", "/logos/food.svg", "/logos/dessert.svg", "/logos/drink.svg", "/logos/wine.svg"]
  } catch (error) {
    console.error("Error extracting logos from PDF:", error)
    throw new Error("Failed to extract logos from PDF")
  }
}

