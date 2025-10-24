"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Loader2 } from "lucide-react"
import { format } from "date-fns"
import type { Document } from "@/types"

export default function DocumentsPage() {
  const supabase = createClient()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  useEffect(() => {
    fetchDocuments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchDocuments = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("Not authenticated")
        return
      }

      // Get user profile to get ERP customer ID
      const { data: profile } = await supabase
        .from("profiles")
        .select("erp_customer_id")
        .eq("id", user.id)
        .single()

      if (!profile) {
        setError("Profile not found")
        return
      }

      // Fetch documents from API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/documents?customer_id=${profile.erp_customer_id}`
      )

      if (!response.ok) {
        throw new Error("Failed to fetch documents")
      }

      const data = await response.json()
      setDocuments(data.documents || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const logDocumentAccess = async (documentId: string, accessType: 'view' | 'download_pdf' | 'download_xml') => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        await supabase.from("document_access_logs").insert({
          user_id: user.id,
          document_id: documentId,
          access_type: accessType,
        })
      }
    } catch (error) {
      console.error("Failed to log document access:", error)
    }
  }

  const handleDownloadPDF = async (doc: Document) => {
    setDownloadingId(doc.id)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/documents/${doc.id}/pdf`
      )

      if (!response.ok) {
        throw new Error("Failed to download PDF")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${doc.document_number}.pdf`
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)

      await logDocumentAccess(doc.id, "download_pdf")
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to download PDF")
    } finally {
      setDownloadingId(null)
    }
  }

  const handleDownloadXML = async (doc: Document) => {
    setDownloadingId(doc.id)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/documents/${doc.id}/xml`
      )

      if (!response.ok) {
        throw new Error("Failed to download XML")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${doc.document_number}.xml`
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)

      await logDocumentAccess(doc.id, "download_xml")
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to download XML")
    } finally {
      setDownloadingId(null)
    }
  }

  if (loading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading documents...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-10">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-destructive">{error}</p>
              <Button onClick={fetchDocuments}>Retry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            View and download your billing documents
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Documents</CardTitle>
            <CardDescription>
              {documents.length} document(s) found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {documents.length === 0 ? (
              <div className="text-center py-10 space-y-4">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">
                  No documents found
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Document Number</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        {doc.document_type}
                      </TableCell>
                      <TableCell>{doc.document_number}</TableCell>
                      <TableCell>
                        {doc.date ? format(new Date(doc.date), "MMM dd, yyyy") : "N/A"}
                      </TableCell>
                      <TableCell>
                        ${doc.amount?.toLocaleString("en-US", { minimumFractionDigits: 2 }) || "0.00"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            doc.status === "active"
                              ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadPDF(doc)}
                            disabled={downloadingId === doc.id}
                          >
                            {downloadingId === doc.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Download className="h-4 w-4" />
                            )}
                            PDF
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadXML(doc)}
                            disabled={downloadingId === doc.id}
                          >
                            {downloadingId === doc.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Download className="h-4 w-4" />
                            )}
                            XML
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
