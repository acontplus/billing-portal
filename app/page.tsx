import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileText, Shield, Zap } from 'lucide-react';

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="container py-10">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Portal de Facturación AcontPlus
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Accede y gestiona tus documentos de facturación electrónica
            ecuatoriana (SRI) con facilidad
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/register">Crear Cuenta</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <FileText className="text-primary mb-2 h-8 w-8" />
              <CardTitle>Gestión de Documentos</CardTitle>
              <CardDescription>
                Visualiza, descarga y gestiona todos tus documentos de
                facturación en un solo lugar
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="text-primary mb-2 h-8 w-8" />
              <CardTitle>Acceso Seguro</CardTitle>
              <CardDescription>
                Tus documentos están protegidos con seguridad y autenticación de
                nivel empresarial
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="text-primary mb-2 h-8 w-8" />
              <CardTitle>Descargas Fáciles</CardTitle>
              <CardDescription>
                Descarga documentos en formato PDF o XML con un solo clic
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle>Acerca del Portal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              El Portal de Facturación AcontPlus proporciona acceso seguro a tus
              documentos de facturación electrónica cumpliendo con las
              regulaciones del SRI (Servicio de Rentas Internas) de Ecuador.
            </p>
            <p className="text-muted-foreground">Nuestra plataforma ofrece:</p>
            <ul className="text-muted-foreground list-inside list-disc space-y-2">
              <li>Acceso en tiempo real a tus documentos de facturación</li>
              <li>Capacidades de descarga en PDF y XML</li>
              <li>Registro de acceso a documentos para cumplimiento</li>
              <li>Modo Oscuro/Claro para visualización cómoda</li>
              <li>Diseño responsivo para móvil y escritorio</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
