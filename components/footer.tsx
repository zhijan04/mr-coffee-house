import Link from "next/link";
import { Instagram, Facebook, MapPin, Clock, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/menu", label: "Menú" },
  { href: "/galeria", label: "Galería" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const menuHighlights = [
  { href: "/menu#caliente", label: "Cafetería Caliente" },
  { href: "/menu#fria", label: "Cafetería Fría" },
  { href: "/menu#brunch", label: "Brunch" },
  { href: "/menu#pasteleria", label: "Pastelería" },
  { href: "/menu#especiales", label: "Especiales" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-cream" aria-label="Pie de página">
      {/* Main footer */}
      <div className="container-wide py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4" aria-label="Mr. Coffee House">
              <div className="flex flex-col leading-none">
                <span className="font-playfair text-2xl font-700 text-cream">
                  Mr. Coffee
                </span>
                <span className="text-xs font-inter font-400 text-cream/50 tracking-[0.3em] uppercase mt-0.5">
                  House
                </span>
              </div>
            </Link>
            <p className="font-inter text-sm text-cream/55 leading-relaxed max-w-xs mb-6">
              Más que una cafetería. Un espacio diseñado para disfrutar café de especialidad, brunch artesanal y momentos memorables en Villa Carlos Paz.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/mrcoffeevcp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-cream/15 flex items-center justify-center hover:border-caramel hover:text-caramel transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.facebook.com/mrcoffeehouse"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-cream/15 flex items-center justify-center hover:border-caramel hover:text-caramel transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-cream/15 flex items-center justify-center hover:border-caramel hover:text-caramel transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-inter text-xs font-600 tracking-[0.2em] uppercase text-cream/40 mb-5">
              Navegación
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-cream/65 hover:text-caramel transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-inter text-xs font-600 tracking-[0.2em] uppercase text-cream/40 mb-5">
              Nuestro Menú
            </h3>
            <ul className="flex flex-col gap-3">
              {menuHighlights.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-cream/65 hover:text-caramel transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-inter text-xs font-600 tracking-[0.2em] uppercase text-cream/40 mb-5">
              Información
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="https://www.google.com/maps/search/Mr+Coffee+Las+Heras+485+Villa+Carlos+Paz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MapPin className="w-4 h-4 text-caramel mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span className="font-inter text-sm text-cream/65 group-hover:text-cream transition-colors">
                    <strong className="text-cream/85">Mr. Coffee</strong>
                    <br />
                    Las Heras 485
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/Mr+Coffee+Brunch+House+San+Martin+Moreno+Villa+Carlos+Paz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MapPin className="w-4 h-4 text-caramel mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span className="font-inter text-sm text-cream/65 group-hover:text-cream transition-colors">
                    <strong className="text-cream/85">Brunch House</strong>
                    <br />
                    Av. San Martín esq. Moreno (Ópera Fun)
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-caramel mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-inter text-sm text-cream/65">
                  08:00 a 21:00
                  <br />
                  Todos los días
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/8">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-xs text-cream/30">
            © {year} Mr. Coffee House. Todos los derechos reservados.
          </p>
          <p className="font-inter text-xs text-cream/25">
            Cafetería de Especialidad · Villa Carlos Paz, Córdoba, Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
