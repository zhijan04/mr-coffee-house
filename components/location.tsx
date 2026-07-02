"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone, Navigation, MessageCircle } from "lucide-react";
import { getWhatsAppUrl, MAPS_URL } from "@/lib/utils";

const infoItems = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Las Heras 485",
    sub: "Villa Carlos Paz, Córdoba",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "08:00 a 21:00",
    sub: "Todos los días · Sin excepción",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+54 9 3541 000000",
    sub: "Reservas y consultas",
    href: getWhatsAppUrl(),
  },
];

export default function Location() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-padding bg-background"
      aria-label="Ubicación de Mr. Coffee House"
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
          <h2 className="font-playfair text-4xl md:text-5xl font-800 text-espresso dark:text-cream mb-3">
            Vení a visitarnos
          </h2>
          <p className="font-inter text-base text-espresso/55 dark:text-cream/50">
            Abiertos todos los días para hacerte el mejor café de la ciudad.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            {infoItems.map((item, i) => {
              const Icon = item.icon;
              const content = (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-cream dark:bg-espresso/30 border border-espresso/8 dark:border-cream/8"
                >
                  <div className="w-11 h-11 rounded-xl bg-caramel/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-caramel" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="block font-inter text-xs font-500 text-espresso/40 dark:text-cream/35 tracking-wider uppercase mb-1">
                      {item.label}
                    </span>
                    <span className="block font-inter text-base font-600 text-espresso dark:text-cream mb-0.5">
                      {item.value}
                    </span>
                    <span className="block font-inter text-sm text-espresso/55 dark:text-cream/45">
                      {item.sub}
                    </span>
                  </div>
                </div>
              );

              if (item.href) {
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="block hover:border-caramel/30 transition-colors"
                  >
                    {content}
                  </motion.a>
                );
              }

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  {content}
                </motion.div>
              );
            })}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 espresso-gradient text-cream font-inter font-600 text-sm rounded-full hover:opacity-90 transition-opacity shadow-lg"
              >
                <Navigation className="w-4 h-4" strokeWidth={1.5} />
                Abrir en Google Maps
              </a>
              <a
                href={getWhatsAppUrl("Hola, me gustaría hacer una reserva en Mr. Coffee House.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white font-inter font-600 text-sm rounded-full hover:bg-[#20BC5A] transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                Reservar por WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Map side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-espresso/10 dark:border-cream/10"
            style={{ minHeight: "400px" }}
          >
            <iframe
              title="Mapa Mr. Coffee House - Las Heras 485 Villa Carlos Paz"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3406.3217!2d-64.4973!3d-31.4168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDI1JzAwLjUiUyA2NMKwMjknNTAuMyJX!5e0!3m2!1ses!2sar!4v1699999999999!5m2!1ses!2sar"
              className="w-full h-full absolute inset-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            {/* Map overlay with address */}
            <div className="absolute bottom-4 left-4 right-4 glass-dark rounded-2xl px-5 py-4 pointer-events-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 caramel-gradient rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-charcoal" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-inter text-sm font-600 text-cream">
                    Mr. Coffee House
                  </p>
                  <p className="font-inter text-xs text-cream/60">
                    Las Heras 485, Villa Carlos Paz
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
