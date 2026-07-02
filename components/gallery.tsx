"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Link from "next/link";
import { ArrowRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

type GalleryCategory =
  | "all"
  | "cafe"
  | "latte-art"
  | "brunch"
  | "pasteleria"
  | "ambiente";

const categories: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "cafe", label: "Café" },
  { id: "latte-art", label: "Latte Art" },
  { id: "brunch", label: "Brunch" },
  { id: "pasteleria", label: "Pastelería" },
  { id: "ambiente", label: "Ambiente" },
];

const images: {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  span?: "wide" | "tall" | "normal";
}[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800",
    alt: "Latte art rosetta en Mr. Coffee House",
    category: "latte-art",
    span: "tall",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800",
    alt: "Barista preparando espresso specialty",
    category: "cafe",
    span: "normal",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=800",
    alt: "Brunch completo con tostadas y café",
    category: "brunch",
    span: "wide",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800",
    alt: "Croissants artesanales recién horneados",
    category: "pasteleria",
    span: "normal",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800",
    alt: "Interior acogedor de Mr. Coffee House",
    category: "ambiente",
    span: "wide",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800",
    alt: "Espresso con latte art corazón",
    category: "latte-art",
    span: "normal",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1471951884559-e6d56f1b6b41?q=80&w=800",
    alt: "Waffles con frutas y miel de specialty",
    category: "brunch",
    span: "tall",
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1532347231146-80afc9e3df2b?q=80&w=800",
    alt: "Cheesecake de temporada",
    category: "pasteleria",
    span: "normal",
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800",
    alt: "Espacio de trabajo en cafetería",
    category: "ambiente",
    span: "normal",
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <section
      ref={ref}
      className="section-padding bg-cream dark:bg-charcoal"
      aria-label="Galería de Mr. Coffee House"
    >
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-caramel" />
              <span className="font-inter text-xs font-500 text-caramel tracking-[0.25em] uppercase">
                Galería
              </span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-800 text-espresso dark:text-cream">
              Momentos que inspiran
            </h2>
          </div>
          <Link
            href="/galeria"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-espresso/15 dark:border-cream/15 hover:border-caramel text-espresso/60 dark:text-cream/60 hover:text-caramel font-inter text-sm font-500 rounded-full transition-all duration-300 whitespace-nowrap"
          >
            Ver galería completa
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full font-inter text-sm font-500 whitespace-nowrap transition-all duration-300 flex-shrink-0",
                activeCategory === cat.id
                  ? "caramel-gradient text-charcoal shadow-lg shadow-caramel/25"
                  : "bg-espresso/5 dark:bg-cream/5 text-espresso/60 dark:text-cream/60 hover:bg-espresso/10 dark:hover:bg-cream/10"
              )}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <PhotoProvider maskOpacity={0.95}>
          <motion.div
            layout
            className="columns-2 md:columns-3 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={cn(
                    "relative overflow-hidden rounded-2xl group cursor-pointer break-inside-avoid mb-4",
                    img.span === "tall" ? "aspect-[3/4]" : "aspect-square"
                  )}
                >
                  <PhotoView src={img.src}>
                    <div className="relative w-full h-full">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 33vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 glass rounded-full flex items-center justify-center">
                          <ZoomIn className="w-4 h-4 text-cream" strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                  </PhotoView>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </PhotoProvider>
      </div>
    </section>
  );
}
