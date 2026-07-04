import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mr. Coffee — Cafetería de Especialidad",
    short_name: "Mr. Coffee",
    description:
      "La cafetería de especialidad más elegida de Villa Carlos Paz. Café de origen, brunch artesanal y pastelería premium.",
    start_url: "/",
    display: "standalone",
    background_color: "#141210",
    theme_color: "#4A3423",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
