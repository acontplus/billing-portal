import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Shield, Zap } from "lucide-react"

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="container py-10">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            AcontPlus Billing Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access and manage your Ecuadorian electronic invoicing documents (SRI) with ease
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Document Management</CardTitle>
              <CardDescription>
                View, download, and manage all your billing documents in one place
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Secure Access</CardTitle>
              <CardDescription>
                Your documents are protected with enterprise-grade security and authentication
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Easy Downloads</CardTitle>
              <CardDescription>
                Download documents in PDF or XML format with a single click
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle>About the Portal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The AcontPlus Billing Portal provides secure access to your electronic invoicing documents
              compliant with Ecuadorian SRI (Servicio de Rentas Internas) regulations.
            </p>
            <p className="text-muted-foreground">
              Our platform offers:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Real-time access to your billing documents</li>
              <li>PDF and XML download capabilities</li>
              <li>Document access logging for compliance</li>
              <li>Dark/Light mode for comfortable viewing</li>
              <li>Responsive design for mobile and desktop</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

