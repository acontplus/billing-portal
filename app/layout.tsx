import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "AcontPlus - Portal de Facturación",
  description: "Portal público de facturación para clientes de AcontPlus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
