import type { Metadata } from "next";

const baseUrl = "https://mrcoffeehouse.com.ar";

const defaultMetadata = {
  siteName: "Mr. Coffee House",
  title: "Mr. Coffee House | Cafetería de Especialidad en Villa Carlos Paz",
  description:
    "La cafetería de especialidad más elegida de Villa Carlos Paz. Café de origen, brunch artesanal y una experiencia diseñada para disfrutar cada momento. Horario 8 a 21hs todos los días.",
  keywords: [
    "cafetería de especialidad Villa Carlos Paz",
    "café de especialidad Córdoba",
    "mejor cafetería Villa Carlos Paz",
    "brunch Villa Carlos Paz",
    "desayunos Villa Carlos Paz",
    "merienda Villa Carlos Paz",
    "coffee shop Villa Carlos Paz",
    "specialty coffee Carlos Paz",
    "café artesanal Córdoba",
    "latte art Villa Carlos Paz",
    "Mr Coffee House",
    "cafetería boutique Carlos Paz",
  ],
  ogImage: `${baseUrl}/og-image.jpg`,
};

export function generateMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: defaultMetadata.title,
      template: `%s | Mr. Coffee House`,
    },
    description: defaultMetadata.description,
    keywords: defaultMetadata.keywords,
    authors: [{ name: "Mr. Coffee House" }],
    creator: "Mr. Coffee House",
    publisher: "Mr. Coffee House",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "es_AR",
      url: baseUrl,
      siteName: defaultMetadata.siteName,
      title: defaultMetadata.title,
      description: defaultMetadata.description,
      images: [
        {
          url: defaultMetadata.ogImage,
          width: 1200,
          height: 630,
          alt: "Mr. Coffee House - Cafetería de Especialidad en Villa Carlos Paz",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultMetadata.title,
      description: defaultMetadata.description,
      images: [defaultMetadata.ogImage],
      creator: "@mrcoffeehouse",
    },
    alternates: {
      canonical: baseUrl,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    ...overrides,
  };
}

export { baseUrl, defaultMetadata };
