import type React from "react"
import AdminNavbar from "@/components/admin-navbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main>{children}</main>
    </div>
  )
}

