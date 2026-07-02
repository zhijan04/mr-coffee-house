"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Coffee, Utensils, Cake, Heart } from "lucide-react";
import Image from "next/image";

const experiences = [
  {
    icon: Coffee,
    title: "Café de Especialidad",
    description:
      "Granos seleccionados de los mejores orígenes del mundo, tostados artesanalmente y extraídos con precisión. Cada método de preparación, desde el espresso hasta el cold brew, está diseñado para revelar los perfiles de sabor únicos de cada café.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800",
    tag: "Specialty Coffee",
    accent: "#C98B4A",
  },
  {
    icon: Utensils,
    title: "Brunch Artesanal",
    description:
      "Ingredientes frescos, recetas propias y elaboración diaria. Nuestro brunch nació de la idea de que el desayuno merece ser el mejor momento del día. Tostadas francesas, waffles, bagels en masa madre y omelettes que cuentan con toques de autor.",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=800",
    tag: "Farm to Table",
    accent: "#C98B4A",
  },
  {
    icon: Cake,
    title: "Pastelería Premium",
    description:
      "Producción artesanal que empieza antes del amanecer. Cookies, brownies, cheesecakes, lemon pie, croissants y alfajores pensados para acompañar tu café o para llevarte una porción de Mr. Coffee a casa.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800",
    tag: "Hecho en Casa",
    accent: "#C98B4A",
  },
  {
    icon: Heart,
    title: "Comunidad",
    description:
      "Un espacio pensado para que pases el tiempo que quieras. Wi-Fi, música curada, rincones para trabajar y una atmósfera que invita a quedarse. Porque creemos que un buen café merece un buen lugar para disfrutarlo.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800",
    tag: "Espacio & Conexión",
    accent: "#C98B4A",
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-padding bg-background"
      aria-label="La experiencia Mr. Coffee House"
    >
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-caramel" />
            <span className="font-inter text-xs font-500 text-caramel tracking-[0.25em] uppercase">
              La experiencia
            </span>
            <span className="h-px w-8 bg-caramel" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-800 text-espresso dark:text-cream mb-4">
            Más que una cafetería
          </h2>
          <p className="font-inter text-base text-espresso/60 dark:text-cream/50 max-w-2xl mx-auto">
            Cuatro pilares que definen lo que somos y lo que ofrecemos cada día.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {experiences.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group relative overflow-hidden rounded-3xl bg-cream dark:bg-espresso/60 border border-espresso/8 dark:border-cream/8 hover:border-caramel/30 transition-all duration-500 hover:shadow-2xl hover:shadow-caramel/10 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 glass text-cream font-inter text-xs font-500 rounded-full">
                      {exp.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-caramel/10 flex items-center justify-center group-hover:bg-caramel/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-caramel" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-playfair text-xl font-700 text-espresso dark:text-cream">
                      {exp.title}
                    </h3>
                  </div>
                  <p className="font-inter text-sm text-espresso/65 dark:text-cream/55 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-caramel transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
