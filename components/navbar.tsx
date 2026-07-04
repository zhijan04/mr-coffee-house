"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import { getWhatsAppUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menú" },
  { href: "/galeria", label: "Galería" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isScrolledOrNotHome = scrolled || !isHome;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolledOrNotHome
            ? "glass-dark border-b border-white/5 shadow-xl shadow-black/10"
            : "bg-transparent"
        )}
      >
        <nav className="container-wide h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Mr. Coffee House - Inicio"
          >
            <img
              src="/images/logo-cream.png"
              alt="Mr. Coffee - Cafetería de Especialidad"
              className="h-6 md:h-7 w-auto group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "font-inter text-sm font-500 tracking-wide transition-all duration-300 relative group",
                    pathname === link.href
                      ? "text-caramel"
                      : "text-cream/80 hover:text-cream"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-caramel transition-all duration-300",
                      pathname === link.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle variant="light" className="hidden sm:flex" />
            <a
              href={getWhatsAppUrl("Hola, me gustaría hacer una reserva en Mr. Coffee House.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 caramel-gradient text-charcoal font-inter font-600 text-sm rounded-full hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg shadow-caramel/25"
            >
              Reservar
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-cream rounded-full hover:bg-white/10 transition-colors"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col pt-20"
          >
            <div className="absolute inset-0 bg-espresso/95 backdrop-blur-xl" />
            <div className="relative flex-1 container-wide py-10 flex flex-col">
              <ul className="flex flex-col gap-2 mb-8">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block py-4 font-playfair text-3xl font-600 border-b border-white/10 transition-colors",
                        pathname === link.href
                          ? "text-caramel"
                          : "text-cream hover:text-caramel"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-4"
              >
                <a
                  href={getWhatsAppUrl("Hola, me gustaría hacer una reserva en Mr. Coffee House.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 caramel-gradient text-charcoal font-inter font-600 text-center rounded-2xl text-lg"
                >
                  Reservar por WhatsApp
                </a>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-cream/40 font-inter text-sm">Cambiar tema</span>
                  <ThemeToggle variant="light" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
