import type { Metadata } from "next";
import { generateMetadata } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Menú Digital | Mr. Coffee House - Cafetería de Especialidad",
  description:
    "Explorá nuestro menú completo: cafetería caliente y fría, brunch artesanal, pastelería premium y opciones veganas, vegetarianas y sin TACC. Villa Carlos Paz.",
  alternates: {
    canonical: "https://mrcoffeehouse.com.ar/menu",
  },
  openGraph: {
    url: "https://mrcoffeehouse.com.ar/menu",
    title: "Menú Digital | Mr. Coffee House",
  },
});

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
