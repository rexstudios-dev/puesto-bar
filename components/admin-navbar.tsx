"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Instagram, Settings } from "lucide-react"

export default function AdminNavbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-amber-800 font-bold">
              <Home className="h-5 w-5" />
              <span>Puesto Bar</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/admin"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/admin")
                  ? "bg-amber-100 text-amber-800"
                  : "text-gray-600 hover:bg-amber-50 hover:text-amber-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Menú PDF</span>
              </div>
            </Link>

            <Link
              href="/admin/instagram"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/admin/instagram")
                  ? "bg-amber-100 text-amber-800"
                  : "text-gray-600 hover:bg-amber-50 hover:text-amber-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
              </div>
            </Link>

            <Link
              href="/admin/settings"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/admin/settings")
                  ? "bg-amber-100 text-amber-800"
                  : "text-gray-600 hover:bg-amber-50 hover:text-amber-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Configuración</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

