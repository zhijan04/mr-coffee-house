import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { generateMetadata } from "@/lib/seo";
import { generateLocalBusinessSchema } from "@/lib/schema";
import "./globals.css";

// Fonts are loaded via CSS @import in globals.css for local dev compatibility
const playfair = { variable: "--font-poppins" };
const inter = { variable: "--font-inter" };

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = generateLocalBusinessSchema();

  return (
    <html
      lang="es-AR"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <meta name="geo.region" content="AR-X" />
        <meta name="geo.placename" content="Villa Carlos Paz, Córdoba" />
        <meta name="geo.position" content="-31.4168;-64.4973" />
        <meta name="ICBM" content="-31.4168, -64.4973" />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="mr-coffee-theme"
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
