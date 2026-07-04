"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: "t1",
    name: "Valentina R.",
    rating: 5,
    text: "Sin duda el mejor café de especialidad que encontré en toda la zona de Carlos Paz. El latte art está a otro nivel y el brunch del fin de semana es para no perderse. Siempre que vengo a Córdoba paso por acá.",
    date: "hace 2 días",
    initial: "V",
    color: "bg-[#E8A86A]",
  },
  {
    id: "t2",
    name: "Martín S.",
    rating: 5,
    text: "El ambiente es increíble, moderno pero con mucha calidez. El orange coffee es adictivo y los waffles son los mejores que comí en mi vida. El personal es súper atento y se nota que aman lo que hacen.",
    date: "hace 5 días",
    initial: "M",
    color: "bg-[#5A3E2B]",
  },
  {
    id: "t3",
    name: "Lucía G.",
    rating: 5,
    text: "Venimos con mi familia cada vez que venimos de vacaciones a Carlos Paz. Los chicos piden los waffles, nosotros el brunch completo y mi mamá no deja de hablar del cheesecake. Un lugar para volver siempre.",
    date: "hace 1 semana",
    initial: "L",
    color: "bg-[#C98B4A]",
  },
  {
    id: "t4",
    name: "Nicolás B.",
    rating: 5,
    text: "Trabajé desde acá tres días seguidos durante mis vacaciones. Wi-Fi excelente, muy buena predisposición del equipo, y el café etíope que tenían era espectacular. Difícil encontrar un lugar así fuera de Buenos Aires.",
    date: "hace 2 semanas",
    initial: "N",
    color: "bg-[#3B2A22]",
  },
  {
    id: "t5",
    name: "Florencia C.",
    rating: 5,
    text: "El flat white es perfecto, textura y temperatura ideales. El tostón con palta y huevo es generoso y riquísimo. Vinimos con mi pareja un domingo y la vibra era perfecta. Ya tenemos el lugar favorito de Carlos Paz.",
    date: "hace 3 semanas",
    initial: "F",
    color: "bg-[#8B6543]",
  },
  {
    id: "t6",
    name: "Diego M.",
    rating: 5,
    text: "Experiencia 10 puntos. Pidan el coffee tonic, es una locura. La pastelería está hecha con mucho amor, se nota la elaboración artesanal. El local es fotogénico, decoración impecable. Ya somos habitués.",
    date: "hace 1 mes",
    initial: "D",
    color: "bg-[#A67C52]",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-caramel fill-caramel" : "text-gray-200"}`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: true,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  return (
    <section
      ref={ref}
      className="section-padding bg-background overflow-hidden"
      aria-label="Reseñas de clientes"
    >
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-caramel" />
            <span className="font-inter text-xs font-500 text-caramel tracking-[0.25em] uppercase">
              Lo que dicen
            </span>
            <span className="h-px w-8 bg-caramel" />
          </div>
          <h2 className="font-poppins text-4xl md:text-5xl font-900 text-espresso dark:text-cream mb-4">
            Clientes que nos eligen
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-caramel fill-caramel"
                  strokeWidth={0}
                />
              ))}
            </div>
            <span className="font-inter text-base font-600 text-espresso dark:text-cream">
              4.7
            </span>
            <span className="font-inter text-sm text-espresso/50 dark:text-cream/40">
              (+2.500 reseñas)
            </span>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="embla"
          ref={emblaRef}
        >
          <div className="embla__container gap-5">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="embla__slide w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] flex-shrink-0"
              >
                <div className="h-full p-7 rounded-2xl bg-cream dark:bg-mocha/40 border border-espresso/8 dark:border-cream/8 flex flex-col gap-5">
                  <Quote
                    className="w-8 h-8 text-caramel/30"
                    strokeWidth={1}
                  />
                  <p className="font-inter text-sm text-espresso/75 dark:text-cream/65 leading-relaxed flex-1">
                    "{t.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center font-inter font-600 text-sm text-white`}
                      >
                        {t.initial}
                      </div>
                      <div>
                        <p className="font-inter text-sm font-600 text-espresso dark:text-cream">
                          {t.name}
                        </p>
                        <p className="font-inter text-xs text-espresso/40 dark:text-cream/35">
                          {t.date}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={t.rating} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
