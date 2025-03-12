"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Check, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function PDFMenuUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      if (selectedFile.type !== "application/pdf") {
        setError("Por favor selecciona un archivo PDF")
        return
      }

      setFile(selectedFile)
      setError(null)
      setSuccess(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const uploadPDF = async () => {
    if (!file) {
      setError("Por favor selecciona un archivo PDF primero")
      return
    }

    setIsUploading(true)
    setProgress(0)
    setError(null)
    setSuccess(false)

    try {
      // Simular progreso de carga
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5
          if (newProgress >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return newProgress
        })
      }, 200)

      // Crear FormData para enviar el archivo
      const formData = new FormData()
      formData.append("file", file)

      // Enviar el archivo a nuestra API
      const response = await fetch("/api/pdf-extract", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        throw new Error("Error al procesar el PDF")
      }

      const data = await response.json()

      // Guardar los datos extraídos en localStorage para uso en el sitio
      localStorage.setItem("puestoBarMenu", JSON.stringify(data.menu))
      localStorage.setItem("puestoBarLogos", JSON.stringify(data.logos))
      localStorage.setItem("puestoBarLastUpdate", new Date().toISOString())

      setSuccess(true)

      // Recargar la página después de 2 segundos para mostrar los nuevos datos
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (err) {
      console.error("Error uploading PDF:", err)
      setError("Ocurrió un error al procesar el PDF. Por favor intenta de nuevo.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Actualizar Menú desde PDF</CardTitle>
        <CardDescription>
          Sube el PDF de tu menú para actualizar automáticamente los precios y elementos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              file ? "border-green-300 bg-green-50" : "border-gray-300 hover:bg-gray-50"
            }`}
            onClick={handleUploadClick}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" className="hidden" />

            {file ? (
              <div className="flex flex-col items-center">
                <FileText className="h-10 w-10 text-green-500 mb-2" />
                <p className="text-sm font-medium text-green-600">{file.name}</p>
                <p className="text-xs text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Haz clic para seleccionar el PDF de tu menú</p>
                <p className="text-xs text-gray-400 mt-1">O arrastra y suelta un archivo aquí</p>
              </div>
            )}
          </div>

          {isUploading && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-center text-gray-500">Procesando PDF... {progress}%</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 flex items-start">
              <Check className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>¡Menú actualizado correctamente! Recargando página...</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={uploadPDF} disabled={!file || isUploading} className="w-full">
          {isUploading ? "Procesando..." : "Actualizar Menú"}
        </Button>
      </CardFooter>
    </Card>
  )
}

