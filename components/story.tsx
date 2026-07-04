"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SmartImage from "@/components/smart-image";

const paragraphs = [
  {
    eyebrow: "Nuestros orígenes",
    text: "Mr. Coffee House nació de una obsesión: encontrar el café perfecto. No el café de cualquier lugar, sino uno con historia, con terroir, con el trabajo de productores que aman lo que hacen. Esa búsqueda nos llevó a recorrer orígenes, conocer baristas y construir algo diferente en el corazón de Villa Carlos Paz.",
  },
  {
    eyebrow: "Cultura de especialidad",
    text: "Cada taza que servimos representa meses de trabajo. Desde la selección del grano hasta la curva de extracción, cada detalle importa. Trabajamos con tostadores de especialidad, calibramos nuestros equipos y capacitamos a nuestro equipo para que cada café cuente su propia historia.",
  },
  {
    eyebrow: "Más que un café",
    text: "Somos el lugar donde Carlos Paz se reúne. Familias que desayunan, creativos que trabajan, parejas que se encuentran, amigos que celebran. Diseñamos un espacio donde cada rincón invita a quedarse, donde el brunch del domingo es un ritual y la merienda del martes, una pausa necesaria.",
  },
];

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="nosotros"
      ref={ref}
      className="section-padding bg-cream dark:bg-charcoal overflow-hidden"
      aria-label="Nuestra historia"
    >
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <SmartImage
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1478"
                alt="Interior de Mr. Coffee House - cafetería de especialidad en Villa Carlos Paz"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 glass-dark rounded-2xl px-6 py-5 max-w-[220px]"
            >
              <p className="font-playfair text-cream text-2xl font-700 leading-none mb-1">
                +3 años
              </p>
              <p className="font-inter text-cream/60 text-sm leading-snug">
                siendo el café de referencia de Carlos Paz
              </p>
            </motion.div>

            {/* Decorative element */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-2 border-caramel/20 hidden lg:block" />
            <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full border-2 border-caramel/30 hidden lg:block" />
          </motion.div>

          {/* Text side */}
          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-caramel" />
                <span className="font-inter text-xs font-500 text-caramel tracking-[0.25em] uppercase">
                  Quiénes somos
                </span>
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl font-800 text-espresso dark:text-cream leading-tight">
                Una historia que
                <br />
                <span className="text-caramel italic">se siente en cada</span>
                <br />
                taza
              </h2>
            </motion.div>

            <div className="flex flex-col gap-8">
              {paragraphs.map((p, i) => (
                <motion.div
                  key={p.eyebrow}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 * (i + 1), duration: 0.6 }}
                  className="group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-caramel" />
                    <span className="font-inter text-xs font-600 text-caramel tracking-wider uppercase">
                      {p.eyebrow}
                    </span>
                  </div>
                  <p className="font-inter text-base text-espresso/75 dark:text-cream/65 leading-relaxed">
                    {p.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 pt-4 border-t border-espresso/10 dark:border-cream/10">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-caramel/30 relative">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100"
                    alt="Fundador Mr. Coffee House"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-playfair text-base font-600 text-espresso dark:text-cream">
                    Equipo Mr. Coffee House
                  </p>
                  <p className="font-inter text-xs text-espresso/50 dark:text-cream/40">
                    Baristas y apasionados del specialty coffee
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
