export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["CafeOrCoffeeShop", "LocalBusiness", "FoodEstablishment"],
    "@id": "https://mrcoffeehouse.com.ar/#organization",
    name: "Mr. Coffee House",
    alternateName: "Mr Coffee House Villa Carlos Paz",
    description:
      "Cafetería de especialidad en Villa Carlos Paz. Café de origen, brunch artesanal, pastelería premium y una experiencia diseñada para disfrutar cada momento.",
    url: "https://mrcoffeehouse.com.ar",
    logo: "https://mrcoffeehouse.com.ar/logo.png",
    image: "https://mrcoffeehouse.com.ar/og-image.jpg",
    telephone: "+5493541000000",
    email: "hola@mrcoffeehouse.com.ar",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Las Heras 485",
      addressLocality: "Villa Carlos Paz",
      addressRegion: "Córdoba",
      postalCode: "5152",
      addressCountry: "AR",
    },
    department: [
      {
        "@type": "CafeOrCoffeeShop",
        name: "Mr. Coffee - Las Heras",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Las Heras 485",
          addressLocality: "Villa Carlos Paz",
          addressRegion: "Córdoba",
          addressCountry: "AR",
        },
      },
      {
        "@type": "CafeOrCoffeeShop",
        name: "Mr. Coffee Brunch House",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Av. San Martín esq. Moreno, Complejo Ópera Fun",
          addressLocality: "Villa Carlos Paz",
          addressRegion: "Córdoba",
          addressCountry: "AR",
        },
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: -31.4168,
      longitude: -64.4973,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "21:00",
      },
    ],
    servesCuisine: ["Café de Especialidad", "Brunch", "Pastelería Artesanal"],
    menu: "https://mrcoffeehouse.com.ar/menu",
    hasMap:
      "https://www.google.com/maps/search/Las+Heras+485+Villa+Carlos+Paz+Cordoba",
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "2500",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.instagram.com/mrcoffee.house",
      "https://www.facebook.com/mrcoffeehouse",
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
      {
        "@type": "LocationFeatureSpecification",
        name: "Espacio para trabajar",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Opciones veganas",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Opciones sin TACC",
        value: true,
      },
    ],
    keywords:
      "cafetería especialidad, café origen, brunch, Villa Carlos Paz, Córdoba, specialty coffee",
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
