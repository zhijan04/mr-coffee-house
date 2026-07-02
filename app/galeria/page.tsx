"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

type GalleryCategory =
  | "all"
  | "cafe"
  | "latte-art"
  | "brunch"
  | "pasteleria"
  | "ambiente"
  | "clientes";

const categories: { id: GalleryCategory; label: string; count: number }[] = [
  { id: "all", label: "Todos", count: 24 },
  { id: "cafe", label: "Café", count: 6 },
  { id: "latte-art", label: "Latte Art", count: 5 },
  { id: "brunch", label: "Brunch", count: 5 },
  { id: "pasteleria", label: "Pastelería", count: 4 },
  { id: "ambiente", label: "Ambiente", count: 2 },
  { id: "clientes", label: "Clientes", count: 2 },
];

const allImages: {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  aspect: "square" | "tall" | "wide";
}[] = [
  { id: "g1", src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000", alt: "Latte art rosetta perfecto en Mr. Coffee House", category: "latte-art", aspect: "tall" },
  { id: "g2", src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000", alt: "Barista extrayendo espresso con técnica especializada", category: "cafe", aspect: "square" },
  { id: "g3", src: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1000", alt: "Brunch completo de temporada con tostadas y café", category: "brunch", aspect: "wide" },
  { id: "g4", src: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1000", alt: "Croissants artesanales recién horneados", category: "pasteleria", aspect: "square" },
  { id: "g5", src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000", alt: "Interior moderno y cálido de Mr. Coffee House", category: "ambiente", aspect: "wide" },
  { id: "g6", src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000", alt: "Espresso doble con latte art corazón en taza artesanal", category: "latte-art", aspect: "square" },
  { id: "g7", src: "https://images.unsplash.com/photo-1471951884559-e6d56f1b6b41?q=80&w=1000", alt: "Waffles artesanales con frutas frescas y miel orgánica", category: "brunch", aspect: "tall" },
  { id: "g8", src: "https://images.unsplash.com/photo-1532347231146-80afc9e3df2b?q=80&w=1000", alt: "Cheesecake de frutos rojos artesanal", category: "pasteleria", aspect: "square" },
  { id: "g9", src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1000", alt: "Clientes trabajando en el espacio de Mr. Coffee House", category: "clientes", aspect: "square" },
  { id: "g10", src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000", alt: "Vista interior de la cafetería con luz natural", category: "ambiente", aspect: "tall" },
  { id: "g11", src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000", alt: "Café de especialidad de origen etiope", category: "cafe", aspect: "square" },
  { id: "g12", src: "https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?q=80&w=1000", alt: "Granos de café premium seleccionados a mano", category: "cafe", aspect: "wide" },
  { id: "g13", src: "https://images.unsplash.com/photo-1567530200377-117ef0703399?q=80&w=1000", alt: "Flat white con latte art de helecho", category: "latte-art", aspect: "square" },
  { id: "g14", src: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?q=80&w=1000", alt: "Coffee tonic con hielo y piel de naranja", category: "cafe", aspect: "tall" },
  { id: "g15", src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1000", alt: "Cookies con chips de chocolate artesanales", category: "pasteleria", aspect: "square" },
  { id: "g16", src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1000", alt: "Tostadas de masa madre con palta y semillas", category: "brunch", aspect: "wide" },
  { id: "g17", src: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1000", alt: "Cappuccino en taza blanca con latte art flor", category: "latte-art", aspect: "square" },
  { id: "g18", src: "https://images.unsplash.com/photo-1599639668273-56a5c3f87f7b?q=80&w=1000", alt: "Clientes disfrutando de brunch en Mr. Coffee House", category: "clientes", aspect: "square" },
  { id: "g19", src: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1000", alt: "Brownies intensos de chocolate con nueces", category: "pasteleria", aspect: "tall" },
  { id: "g20", src: "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=1000", alt: "Omelette gourmet con vegetales salteados", category: "brunch", aspect: "square" },
  { id: "g21", src: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=1000", alt: "Latte de avellanas en vaso alto con caramelo", category: "cafe", aspect: "square" },
  { id: "g22", src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1000", alt: "Detalle de taza de café con latte art corazón", category: "latte-art", aspect: "square" },
  { id: "g23", src: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=1000", alt: "Waffles con crema y berries frescos", category: "brunch", aspect: "wide" },
  { id: "g24", src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1000", alt: "Orange coffee con hielo y rodaja de naranja", category: "cafe", aspect: "square" },
];

export default function GaleriaPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const filtered =
    activeCategory === "all"
      ? allImages
      : allImages.filter((img) => img.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-espresso overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, #C98B4A 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C98B4A 0%, transparent 50%)",
          }}
        />
        <div ref={headerRef} className="relative container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-caramel" />
              <span className="font-inter text-xs font-500 text-caramel tracking-[0.25em] uppercase">
                Galería
              </span>
              <span className="h-px w-8 bg-caramel" />
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl font-800 text-cream mb-4">
              Momentos que inspiran
            </h1>
            <p className="font-inter text-base text-cream/55 max-w-lg mx-auto">
              Cada imagen cuenta una historia. Así es un día en Mr. Coffee House.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery section */}
      <section className="section-padding bg-cream dark:bg-charcoal">
        <div className="container-wide">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-2 overflow-x-auto pb-2 mb-10 no-scrollbar"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-inter text-sm font-500 whitespace-nowrap transition-all duration-300 flex-shrink-0",
                  activeCategory === cat.id
                    ? "caramel-gradient text-charcoal shadow-lg shadow-caramel/25"
                    : "bg-espresso/5 dark:bg-cream/5 text-espresso/65 dark:text-cream/60 hover:bg-espresso/10 dark:hover:bg-cream/10"
                )}
              >
                {cat.label}
                <span
                  className={cn(
                    "inline-flex items-center justify-center w-5 h-5 rounded-full text-xs transition-colors",
                    activeCategory === cat.id
                      ? "bg-charcoal/15 text-charcoal"
                      : "bg-espresso/10 dark:bg-cream/10 text-espresso/50 dark:text-cream/45"
                  )}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Masonry grid */}
          <PhotoProvider maskOpacity={0.97}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="columns-2 md:columns-3 lg:columns-4 gap-4"
              >
                {filtered.map((img, i) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                    className={cn(
                      "relative overflow-hidden rounded-2xl group cursor-pointer break-inside-avoid mb-4",
                      img.aspect === "tall"
                        ? "aspect-[3/4]"
                        : img.aspect === "wide"
                        ? "aspect-[4/3]"
                        : "aspect-square"
                    )}
                  >
                    <PhotoView src={img.src}>
                      <div className="relative w-full h-full">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
                          <div className="w-10 h-10 glass rounded-full flex items-center justify-center">
                            <ZoomIn className="w-4 h-4 text-cream" strokeWidth={1.5} />
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="font-inter text-xs text-cream/90 leading-snug line-clamp-2">
                            {img.alt}
                          </p>
                        </div>
                      </div>
                    </PhotoView>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </PhotoProvider>
        </div>
      </section>
    </>
  );
}
