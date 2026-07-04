"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, MessageCircle, Instagram, Facebook, Send } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [sent, setSent] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola! Soy ${form.nombre}. ${form.mensaje} (${form.email})`;
    window.open(getWhatsAppUrl(msg), "_blank");
    setSent(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-espresso overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 40% 60%, #C98B4A 0%, transparent 50%)",
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
                Contacto
              </span>
              <span className="h-px w-8 bg-caramel" />
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl font-800 text-cream mb-4">
              Hablemos
            </h1>
            <p className="font-inter text-base text-cream/55 max-w-md mx-auto">
              Reservas, consultas o simplemente saludarnos. Estamos para vos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h2 className="font-playfair text-3xl font-700 text-espresso dark:text-cream mb-2">
                  Información
                </h2>
                <p className="font-inter text-sm text-espresso/55 dark:text-cream/45">
                  Abiertos todos los días para recibirte.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { icon: MapPin, label: "Mr. Coffee — Original", value: "Las Heras 485\nVilla Carlos Paz, Córdoba", href: "https://www.google.com/maps/search/Mr+Coffee+Las+Heras+485+Villa+Carlos+Paz" },
                  { icon: MapPin, label: "Mr. Coffee Brunch House", value: "Av. San Martín esq. Moreno (Ópera Fun)\nVilla Carlos Paz, Córdoba", href: "https://www.google.com/maps/search/Mr+Coffee+Brunch+House+San+Martin+Moreno+Villa+Carlos+Paz" },
                  { icon: Clock, label: "Horario", value: "08:00 a 21:00\nTodos los días", href: null },
                  { icon: MessageCircle, label: "WhatsApp", value: "+54 9 3541 000000\nReservas y consultas", href: getWhatsAppUrl() },
                ].map(({ icon: Icon, label, value, href }) => {
                  const content = (
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-cream dark:bg-espresso/30 border border-espresso/8 dark:border-cream/8 hover:border-caramel/25 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-caramel/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-caramel" strokeWidth={1.5} />
                      </div>
                      <div>
                        <span className="block font-inter text-xs text-espresso/40 dark:text-cream/35 uppercase tracking-wider mb-1">{label}</span>
                        <span className="block font-inter text-sm font-500 text-espresso dark:text-cream whitespace-pre-line">{value}</span>
                      </div>
                    </div>
                  );
                  return href ? (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer">{content}</a>
                  ) : (
                    <div key={label}>{content}</div>
                  );
                })}
              </div>

              <div>
                <p className="font-inter text-xs text-espresso/40 dark:text-cream/35 uppercase tracking-wider mb-3">Redes sociales</p>
                <div className="flex gap-3">
                  {[
                    { icon: Instagram, href: "https://www.instagram.com/mrcoffee.house", label: "Instagram" },
                    { icon: Facebook, href: "https://www.facebook.com/mrcoffeehouse", label: "Facebook" },
                    { icon: MessageCircle, href: getWhatsAppUrl(), label: "WhatsApp" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full border border-espresso/15 dark:border-cream/15 flex items-center justify-center text-espresso/50 dark:text-cream/50 hover:border-caramel hover:text-caramel transition-all duration-300"
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="p-8 rounded-3xl bg-cream dark:bg-espresso/30 border border-espresso/8 dark:border-cream/8">
                <h2 className="font-playfair text-2xl font-700 text-espresso dark:text-cream mb-6">
                  Envianos un mensaje
                </h2>
                {sent ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 caramel-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-7 h-7 text-charcoal" strokeWidth={1.5} />
                    </div>
                    <p className="font-playfair text-xl font-600 text-espresso dark:text-cream mb-2">¡Mensaje enviado!</p>
                    <p className="font-inter text-sm text-espresso/55 dark:text-cream/45">
                      Te redirigimos a WhatsApp. Te respondemos a la brevedad.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                      <label className="block font-inter text-xs font-500 text-espresso/50 dark:text-cream/45 uppercase tracking-wider mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Tu nombre"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-espresso/12 dark:border-cream/12 font-inter text-sm text-espresso dark:text-cream placeholder:text-espresso/30 dark:placeholder:text-cream/25 focus:outline-none focus:border-caramel transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-inter text-xs font-500 text-espresso/50 dark:text-cream/45 uppercase tracking-wider mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-espresso/12 dark:border-cream/12 font-inter text-sm text-espresso dark:text-cream placeholder:text-espresso/30 dark:placeholder:text-cream/25 focus:outline-none focus:border-caramel transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-inter text-xs font-500 text-espresso/50 dark:text-cream/45 uppercase tracking-wider mb-2">
                        Mensaje
                      </label>
                      <textarea
                        name="mensaje"
                        value={form.mensaje}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="¿En qué podemos ayudarte?"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-espresso/12 dark:border-cream/12 font-inter text-sm text-espresso dark:text-cream placeholder:text-espresso/30 dark:placeholder:text-cream/25 focus:outline-none focus:border-caramel transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 caramel-gradient text-charcoal font-inter font-600 text-sm rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-caramel/20"
                    >
                      <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                      Enviar por WhatsApp
                    </button>
                    <p className="font-inter text-xs text-espresso/35 dark:text-cream/30 text-center">
                      Al enviar, serás redirigido a WhatsApp con tu mensaje listo.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
