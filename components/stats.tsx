"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Star, Users, Award, MapPin } from "lucide-react";

const stats = [
  {
    icon: Star,
    value: 2500,
    suffix: "+",
    label: "Reseñas verificadas",
    description: "En Google y plataformas digitales",
    color: "text-caramel",
  },
  {
    icon: Star,
    value: 4.7,
    suffix: "★",
    label: "Calificación promedio",
    description: "La más alta de Villa Carlos Paz",
    color: "text-caramel",
    decimals: 1,
  },
  {
    icon: Users,
    value: 15,
    suffix: "K+",
    label: "Clientes satisfechos",
    description: "Comunidad que nos elige a diario",
    color: "text-caramel",
  },
  {
    icon: Award,
    value: 3,
    suffix: " años",
    label: "De especialidad",
    description: "Reconocidos en toda Córdoba",
    color: "text-caramel",
  },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-20 overflow-hidden"
      aria-label="Estadísticas Mr. Coffee House"
    >
      {/* Background */}
      <div className="absolute inset-0 espresso-gradient" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 50%, #C98B4A 0%, transparent 50%), radial-gradient(circle at 75% 50%, #C98B4A 0%, transparent 50%)",
        }}
      />

      <div className="relative container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-caramel/10 border border-caramel/20 mb-4 group-hover:border-caramel/50 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-caramel" strokeWidth={1.5} />
                </div>

                <div className="font-playfair text-4xl md:text-5xl font-800 text-cream mb-2 leading-none">
                  {isInView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      delay={index * 0.1}
                      decimals={stat.decimals || 0}
                      suffix={stat.suffix}
                    />
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>

                <p className="font-inter text-sm font-600 text-cream/90 mb-1">
                  {stat.label}
                </p>
                <p className="font-inter text-xs text-cream/45 leading-relaxed hidden sm:block">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
