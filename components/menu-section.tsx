"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Leaf, Wheat, Heart } from "lucide-react";

const featuredItems = [
  {
    name: "Espresso Signature",
    description: "Nuestro blend exclusivo, notas de chocolate y caramelo",
    category: "Cafetería Caliente",
    tag: null,
  },
  {
    name: "Latte de Avellanas",
    description: "Espresso, leche texturizada y sirope de avellanas artesanal",
    category: "Cafetería Fría",
    tag: null,
  },
  {
    name: "Orange Coffee",
    description: "Cold brew con jugo de naranja fresco y agua tónica",
    category: "Cafetería Fría",
    tag: "nuevo",
  },
  {
    name: "Coffee Tonic",
    description: "Espresso sobre agua tónica con piel de cítricos",
    category: "Cafetería Fría",
    tag: null,
  },
  {
    name: "Tostadas Francesas",
    description: "Pan brioche, canela, maple, frutos rojos y crema",
    category: "Brunch",
    tag: null,
  },
  {
    name: "Waffles Artesanales",
    description: "Con fruta de estación, dulce de leche y helado",
    category: "Brunch",
    tag: null,
  },
  {
    name: "Cheesecake del Día",
    description: "Producción diaria con ingredientes estacionales",
    category: "Pastelería",
    tag: "popular",
  },
  {
    name: "Bagel de Masa Madre",
    description: "Con hummus, palta, huevo poché y semillas",
    category: "Brunch",
    tag: "vegano",
  },
];

const tagConfig: Record<string, { label: string; class: string }> = {
  nuevo: {
    label: "Nuevo",
    class: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  popular: {
    label: "Popular",
    class:
      "bg-caramel/15 text-caramel dark:bg-caramel/20 dark:text-caramel",
  },
  vegano: {
    label: "🌱 Vegano",
    class:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
};

export default function MenuSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-padding mocha-gradient overflow-hidden"
      aria-label="Vista previa del menú"
    >
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-caramel" />
              <span className="font-inter text-xs font-500 text-caramel tracking-[0.25em] uppercase">
                Menú
              </span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-800 text-cream leading-tight">
              Lo más pedido
            </h2>
            <p className="font-inter text-base text-cream/50 mt-3 max-w-md">
              Selección de favoritos que no pueden faltar en tu visita.
            </p>
          </div>
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-cream/20 hover:border-caramel text-cream/70 hover:text-caramel font-inter text-sm font-500 rounded-full transition-all duration-300 whitespace-nowrap"
          >
            Ver menú completo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Items grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: "easeOut",
              }}
              className="group relative p-6 rounded-2xl bg-mocha-light/30 hover:bg-mocha-light/50 border border-cream/5 hover:border-caramel/30 transition-all duration-300 cursor-default"
            >
              <span className="block font-inter text-xs font-500 text-caramel/70 tracking-wider uppercase mb-3">
                {item.category}
              </span>
              <h3 className="font-playfair text-lg font-600 text-cream mb-2 group-hover:text-caramel transition-colors duration-300">
                {item.name}
              </h3>
              <p className="font-inter text-sm text-cream/45 leading-relaxed">
                {item.description}
              </p>
              {item.tag && tagConfig[item.tag] && (
                <span
                  className={`inline-block mt-4 px-2.5 py-1 rounded-full text-xs font-500 font-inter ${tagConfig[item.tag].class}`}
                >
                  {tagConfig[item.tag].label}
                </span>
              )}
              <div className="absolute bottom-0 left-4 right-4 h-px bg-caramel scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>

        {/* Dietary badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4 pt-8 border-t border-cream/10"
        >
          <span className="font-inter text-xs text-cream/40">
            También contamos con opciones:
          </span>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Leaf, label: "Veganas" },
              { icon: Heart, label: "Vegetarianas" },
              { icon: Wheat, label: "Sin TACC" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-cream/15 rounded-full font-inter text-xs text-cream/60"
              >
                <Icon className="w-3 h-3 text-caramel" strokeWidth={1.5} />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
