"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Navigation, MessageCircle, Coffee, UtensilsCrossed } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

const sucursales = [
  {
    id: "lasheras",
    icon: Coffee,
    nombre: "Mr. Coffee",
    subtitulo: "Sucursal original",
    direccion: "Las Heras 485",
    detalle: "Frente a la Feria de los Artesanos",
    ciudad: "Villa Carlos Paz, Córdoba",
    horario: "08:00 a 21:00 · Todos los días",
    mapsUrl:
      "https://www.google.com/maps/search/Mr+Coffee+Las+Heras+485+Villa+Carlos+Paz",
    mapEmbed:
      "https://www.google.com/maps?q=Las+Heras+485,+Villa+Carlos+Paz,+C%C3%B3rdoba,+Argentina&output=embed",
    descripcion:
      "El local que empezó todo. Café de especialidad, tazones gigantes, pastelería artesanal y el patio más acogedor de Carlos Paz.",
  },
  {
    id: "brunchhouse",
    icon: UtensilsCrossed,
    nombre: "Mr. Coffee Brunch House",
    subtitulo: "Nueva sucursal",
    direccion: "Av. San Martín esq. Moreno",
    detalle: "Complejo Ópera Fun",
    ciudad: "Villa Carlos Paz, Córdoba",
    horario: "08:00 a 21:00 · Todos los días",
    mapsUrl:
      "https://www.google.com/maps/search/Mr+Coffee+Brunch+House+San+Martin+Moreno+Opera+Fun+Villa+Carlos+Paz",
    mapEmbed:
      "https://www.google.com/maps?q=Av.+San+Mart%C3%ADn+y+Moreno,+Villa+Carlos+Paz,+C%C3%B3rdoba,+Argentina&output=embed",
    descripcion:
      "Más de 320 m² con propuesta gourmet ampliada, coctelería, espacio de coworking y áreas diseñadas para los amantes del café.",
  },
];

export default function Location() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-padding bg-background"
      aria-label="Sucursales de Mr. Coffee"
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
              Dónde encontrarnos
            </span>
            <span className="h-px w-8 bg-caramel" />
          </div>
          <h2 className="font-poppins text-4xl md:text-5xl font-900 text-espresso dark:text-cream mb-3">
            Dos espacios, una experiencia
          </h2>
          <p className="font-inter text-base text-espresso/55 dark:text-cream/50 max-w-xl mx-auto">
            Abiertos todos los días en dos puntos estratégicos de Villa Carlos Paz.
          </p>
        </motion.div>

        {/* Two branch cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {sucursales.map((suc, i) => {
            const Icon = suc.icon;
            return (
              <motion.div
                key={suc.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group rounded-3xl overflow-hidden bg-cream dark:bg-espresso/40 border border-espresso/8 dark:border-cream/8 hover:border-caramel/30 transition-all duration-500 hover:shadow-2xl hover:shadow-caramel/10 flex flex-col"
              >
                {/* Map */}
                <div className="relative h-64 overflow-hidden">
                  <iframe
                    title={`Mapa ${suc.nombre}`}
                    src={suc.mapEmbed}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <span className="inline-flex items-center gap-2 px-4 py-2 glass-dark text-cream font-inter text-xs font-600 rounded-full">
                      <Icon className="w-3.5 h-3.5 text-caramel" strokeWidth={1.5} />
                      {suc.subtitulo}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col gap-5 flex-1">
                  <div>
                    <h3 className="font-poppins text-2xl font-800 text-espresso dark:text-cream mb-1 group-hover:text-caramel transition-colors duration-300">
                      {suc.nombre}
                    </h3>
                    <p className="font-inter text-sm text-espresso/55 dark:text-cream/50 leading-relaxed">
                      {suc.descripcion}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-caramel mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <div>
                        <span className="block font-inter text-sm font-600 text-espresso dark:text-cream">
                          {suc.direccion}
                        </span>
                        <span className="block font-inter text-xs text-espresso/50 dark:text-cream/45">
                          {suc.detalle} · {suc.ciudad}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-caramel flex-shrink-0" strokeWidth={1.5} />
                      <span className="font-inter text-sm text-espresso/70 dark:text-cream/60">
                        {suc.horario}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
                    <a
                      href={suc.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 espresso-gradient text-cream font-inter font-600 text-sm rounded-full hover:opacity-90 transition-opacity"
                    >
                      <Navigation className="w-4 h-4" strokeWidth={1.5} />
                      Cómo llegar
                    </a>
                    <a
                      href={getWhatsAppUrl(`Hola! Quiero hacer una reserva en ${suc.nombre}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 caramel-gradient text-charcoal font-inter font-600 text-sm rounded-full hover:opacity-90 transition-opacity"
                    >
                      <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                      Reservar
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
