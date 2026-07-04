"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SmartImage from "@/components/smart-image";
import Link from "next/link";
import { MapPin, MessageCircle, ChevronDown } from "lucide-react";
import { getWhatsAppUrl, MAPS_URL } from "@/lib/utils";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] max-h-[1000px] w-full overflow-hidden"
      aria-label="Bienvenido a Mr. Coffee House"
    >
      {/* Parallax background image */}
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <SmartImage
          src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2070"
          alt="Barista realizando latte art en Mr. Coffee House, Villa Carlos Paz"
          fill
          priority
          quality={85}
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Multi-layer overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/60 via-transparent to-transparent" />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative h-full flex flex-col justify-center container-wide"
        style={{ opacity }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-caramel" />
            <span className="font-inter text-xs font-500 text-caramel tracking-[0.25em] uppercase">
              Villa Carlos Paz · 2 Sucursales
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-800 text-cream leading-[1.05] mb-6"
          >
            El café de{" "}
            <em className="not-italic text-caramel">especialidad</em>
            <br />
            más elegido de
            <br />
            Villa Carlos Paz
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="font-inter text-base sm:text-lg text-cream/75 leading-relaxed max-w-xl mb-10"
          >
            Café de origen, brunch artesanal y una experiencia diseñada
            para disfrutar cada momento.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/menu"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 caramel-gradient text-charcoal font-inter font-600 text-base rounded-full shadow-2xl shadow-caramel/30 hover:opacity-90 hover:scale-105 transition-all duration-300"
            >
              Ver Menú
            </Link>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 glass text-cream font-inter font-500 text-base rounded-full hover:bg-white/15 transition-all duration-300"
            >
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              Cómo Llegar
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-espresso/90 hover:bg-espresso border border-caramel/30 text-white font-inter font-500 text-base rounded-full transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
              WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-cream/50" strokeWidth={1.5} />
        </motion.div>
        <span className="font-inter text-xs text-cream/30 tracking-widest uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
