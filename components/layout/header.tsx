'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, FileText, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const isAuthPage = pathname === '/login' || pathname === '/register';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">AcontPlus</span>
          </Link>
          {!isAuthPage && (
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/dashboard"
                className={`hover:text-foreground/80 flex items-center gap-2 transition-colors ${
                  pathname === '/dashboard'
                    ? 'text-foreground'
                    : 'text-foreground/60'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Panel
              </Link>
              <Link
                href="/documents"
                className={`hover:text-foreground/80 flex items-center gap-2 transition-colors ${
                  pathname === '/documents'
                    ? 'text-foreground'
                    : 'text-foreground/60'
                }`}
              >
                <FileText className="h-4 w-4" />
                Documentos
              </Link>
            </nav>
          )}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          {!isAuthPage && (
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Cerrar Sesión</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
