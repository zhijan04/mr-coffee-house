"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Leaf, Wheat, Heart, Coffee, IceCream, UtensilsCrossed, Cake, Sandwich, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "all" | "caliente" | "fria" | "tazones" | "pasteleria" | "brunch" | "especiales";

const categories: { id: Category; label: string; icon: React.ElementType; description: string }[] = [
  { id: "all", label: "Todo el Menú", icon: Sparkles, description: "Ver toda la oferta" },
  { id: "caliente", label: "Cafetería Caliente", icon: Coffee, description: "Espresso y bebidas calientes" },
  { id: "fria", label: "Cafetería Fría", icon: IceCream, description: "Cold brew y bebidas frías" },
  { id: "tazones", label: "Tazones", icon: UtensilsCrossed, description: "Lattes especiales en bowl" },
  { id: "pasteleria", label: "Pastelería", icon: Cake, description: "Producción artesanal diaria" },
  { id: "brunch", label: "Brunch", icon: Sandwich, description: "Desayunos y almuerzos" },
  { id: "especiales", label: "Especiales", icon: Leaf, description: "Vegano, vegetariano, sin TACC" },
];

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: Exclude<Category, "all">;
  tags: Array<"vegan" | "vegetarian" | "gluten-free" | "popular" | "new">;
}

const menuItems: MenuItem[] = [
  // Cafetería Caliente
  { id: "c1", name: "Espresso", description: "Extracción perfecta de 30ml, notas de chocolate amargo y caramelo tostado", price: "$1.800", category: "caliente", tags: ["popular"] },
  { id: "c2", name: "Doble Espresso", description: "60ml de puro espresso, intenso y brillante", price: "$2.200", category: "caliente", tags: [] },
  { id: "c3", name: "Latte", description: "Espresso con leche texturizada al vapor, cremoso y suave", price: "$2.600", category: "caliente", tags: ["popular"] },
  { id: "c4", name: "Flat White", description: "Doble ristretto con microespuma de leche, más concentrado y expresivo", price: "$2.800", category: "caliente", tags: [] },
  { id: "c5", name: "Cappuccino", description: "Espresso, leche al vapor y espuma generosa, clásico equilibrado", price: "$2.500", category: "caliente", tags: [] },
  { id: "c6", name: "Mocha", description: "Espresso, chocolate artesanal y leche cremosa, indulgente y reconfortante", price: "$2.900", category: "caliente", tags: [] },
  { id: "c7", name: "Americano", description: "Espresso con agua caliente, limpio y directo", price: "$2.000", category: "caliente", tags: [] },
  { id: "c8", name: "Matcha Latte", description: "Matcha ceremonial japonés con leche texturizada, antioxidante y elegante", price: "$3.200", category: "caliente", tags: ["vegan", "new"] },

  // Cafetería Fría
  { id: "f1", name: "Iced Latte", description: "Espresso sobre hielo con leche fría, refrescante y cremoso", price: "$2.800", category: "fria", tags: ["popular"] },
  { id: "f2", name: "Latte de Avellanas", description: "Espresso, leche fría y sirope de avellanas artesanal", price: "$3.100", category: "fria", tags: [] },
  { id: "f3", name: "Latte de Vainilla", description: "Espresso con extracto natural de vainilla y leche helada", price: "$3.000", category: "fria", tags: [] },
  { id: "f4", name: "Coffee Tonic", description: "Espresso sobre agua tónica premium con piel de cítricos", price: "$3.400", category: "fria", tags: ["new"] },
  { id: "f5", name: "Orange Coffee", description: "Cold brew, jugo de naranja fresco y un toque de agua tónica", price: "$3.600", category: "fria", tags: ["new", "popular"] },
  { id: "f6", name: "Ice Americano", description: "Espresso con agua fría y hielo, refrescante y directo", price: "$2.400", category: "fria", tags: [] },
  { id: "f7", name: "Affogato", description: "Espresso caliente sobre bola de helado de vainilla", price: "$3.200", category: "fria", tags: [] },

  // Tazones
  { id: "t1", name: "Latte Bowl", description: "Latte clásico servido en tazón artesanal, más volumen y cremosidad", price: "$3.000", category: "tazones", tags: [] },
  { id: "t2", name: "Latte Kinder", description: "Espresso, crema de avellanas y leche texturizada, capricho irresistible", price: "$3.500", category: "tazones", tags: ["popular"] },
  { id: "t3", name: "Moka Bowl", description: "Espresso, chocolate 70% y leche al vapor en tazón XL", price: "$3.400", category: "tazones", tags: [] },
  { id: "t4", name: "Chocolate Bowl", description: "Chocolate artesanal caliente con espuma de leche en tazón grande", price: "$3.200", category: "tazones", tags: ["vegetarian"] },

  // Pastelería
  { id: "p1", name: "Cookies", description: "Con chips de chocolate belga, manteca francesa y una pizca de sal marina", price: "$1.500", category: "pasteleria", tags: ["popular"] },
  { id: "p2", name: "Brownies", description: "Intensos, húmedos y con nueces. Producción diaria temprana", price: "$1.800", category: "pasteleria", tags: [] },
  { id: "p3", name: "Cheesecake", description: "Con base de galletitas y topping de frutos rojos estacionales", price: "$2.500", category: "pasteleria", tags: ["popular"] },
  { id: "p4", name: "Lemon Pie", description: "Tarta de limón con merengue italiano tostado y curd casero", price: "$2.400", category: "pasteleria", tags: ["vegetarian"] },
  { id: "p5", name: "Croissant con Chocolate", description: "Masa hojaldrada con relleno de chocolate premium, recién horneado", price: "$2.200", category: "pasteleria", tags: [] },
  { id: "p6", name: "Budines", description: "Limón, naranja o banana con chips de chocolate. Receta propia", price: "$1.600", category: "pasteleria", tags: [] },
  { id: "p7", name: "Alfajores", description: "Tres capas de maicena con dulce de leche artesanal y bañados en chocolate", price: "$1.400", category: "pasteleria", tags: [] },
  { id: "p8", name: "Scones", description: "Ingleses, recién horneados, con manteca y mermelada de frutos del bosque", price: "$1.800", category: "pasteleria", tags: [] },

  // Brunch
  { id: "b1", name: "Tostadas Francesas", description: "Pan brioche, huevo, canela, maple orgánico y frutos rojos frescos", price: "$4.200", category: "brunch", tags: ["popular"] },
  { id: "b2", name: "Waffles", description: "Con fruta de estación, crema batida y dulce de leche artesanal", price: "$4.500", category: "brunch", tags: ["popular"] },
  { id: "b3", name: "Tostones", description: "Pan de masa madre tostado con palta, semillas y huevo poché", price: "$3.800", category: "brunch", tags: ["vegetarian"] },
  { id: "b4", name: "Bagels", description: "En masa madre con hummus, palta, pepino y germinados", price: "$4.000", category: "brunch", tags: ["vegan"] },
  { id: "b5", name: "Omelettes", description: "Con queso gruyere, ciboulette y vegetales salteados de temporada", price: "$4.300", category: "brunch", tags: ["vegetarian", "gluten-free"] },
  { id: "b6", name: "Sándwich de Masa Madre", description: "Con proteínas, vegetales asados y salsas caseras. Consultar del día", price: "$4.800", category: "brunch", tags: [] },

  // Especiales
  { id: "e1", name: "Latte Vegano de Avena", description: "Espresso con leche de avena texturizada, completamente vegano", price: "$3.200", category: "especiales", tags: ["vegan", "gluten-free"] },
  { id: "e2", name: "Matcha Latte Vegano", description: "Matcha ceremonial con leche de coco o avena a elección", price: "$3.500", category: "especiales", tags: ["vegan", "gluten-free"] },
  { id: "e3", name: "Tostón Verde", description: "Masa madre de espinaca, palta, huevo poché y brotes", price: "$4.200", category: "especiales", tags: ["vegetarian"] },
  { id: "e4", name: "Bowl Vegano Completo", description: "Granola, fruta fresca, yogur de coco y semillas", price: "$4.000", category: "especiales", tags: ["vegan", "gluten-free"] },
  { id: "e5", name: "Cookies Sin TACC", description: "Elaboradas con harina de arroz y chips de chocolate", price: "$1.800", category: "especiales", tags: ["vegan", "gluten-free"] },
  { id: "e6", name: "Cheesecake Vegano", description: "Base de dátiles y almendras, crema de anacardos y frutos rojos", price: "$2.800", category: "especiales", tags: ["vegan", "gluten-free"] },
];

const tagLabels: Record<string, { label: string; class: string }> = {
  vegan: { label: "🌱 Vegano", class: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  vegetarian: { label: "🥦 Vegetariano", class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  "gluten-free": { label: "🌾 Sin TACC", class: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  popular: { label: "⭐ Popular", class: "bg-caramel/15 text-caramel" },
  new: { label: "✨ Nuevo", class: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
};

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      className="group relative p-6 rounded-2xl bg-cream dark:bg-mocha/40 border border-espresso/8 dark:border-cream/8 hover:border-caramel/30 transition-all duration-300 hover:shadow-xl hover:shadow-caramel/5 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-playfair text-lg font-600 text-espresso dark:text-cream group-hover:text-caramel transition-colors duration-300 leading-snug">
          {item.name}
        </h3>
        <span className="font-inter text-base font-700 text-caramel whitespace-nowrap">
          {item.price}
        </span>
      </div>
      <p className="font-inter text-sm text-espresso/60 dark:text-cream/50 leading-relaxed mb-4">
        {item.description}
      </p>
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) =>
            tagLabels[tag] ? (
              <span
                key={tag}
                className={`inline-block px-2.5 py-1 rounded-full font-inter text-xs font-500 ${tagLabels[tag].class}`}
              >
                {tagLabels[tag].label}
              </span>
            ) : null
          )}
        </div>
      )}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-caramel scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const filtered =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const grouped = categories
    .filter((cat) => cat.id !== "all")
    .filter((cat) =>
      activeCategory === "all"
        ? menuItems.some((item) => item.category === cat.id)
        : cat.id === activeCategory
    )
    .map((cat) => ({
      ...cat,
      items: filtered.filter((item) => item.category === cat.id),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-espresso overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 70%, #C98B4A 0%, transparent 50%), radial-gradient(circle at 70% 30%, #C98B4A 0%, transparent 50%)",
          }}
        />
        <div ref={headerRef} className="relative container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-caramel" />
              <span className="font-inter text-xs font-500 text-caramel tracking-[0.25em] uppercase">
                Nuestro Menú
              </span>
              <span className="h-px w-8 bg-caramel" />
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl font-800 text-cream mb-4">
              Todo lo que ofrecemos
            </h1>
            <p className="font-inter text-base text-cream/55 max-w-xl mx-auto">
              Café de especialidad, brunch artesanal y pastelería premium. Elaborado a diario con ingredientes seleccionados.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky category filter */}
      <div className="sticky top-16 md:top-20 z-30 bg-background/90 backdrop-blur-lg border-b border-espresso/8 dark:border-cream/8">
        <div className="container-wide py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full font-inter text-sm font-500 whitespace-nowrap transition-all duration-300",
                    activeCategory === cat.id
                      ? "caramel-gradient text-charcoal shadow-md shadow-caramel/25"
                      : "text-espresso/60 dark:text-cream/60 hover:bg-espresso/5 dark:hover:bg-cream/5"
                  )}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu content */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-16"
            >
              {grouped.map((group) => {
                const Icon = group.icon;
                return (
                  <div key={group.id} id={group.id}>
                    {/* Category header */}
                    <div className="flex items-center gap-4 mb-8 pb-4 border-b border-espresso/10 dark:border-cream/10">
                      <div className="w-11 h-11 rounded-2xl caramel-gradient flex items-center justify-center">
                        <Icon className="w-5 h-5 text-charcoal" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h2 className="font-playfair text-2xl md:text-3xl font-700 text-espresso dark:text-cream">
                          {group.label}
                        </h2>
                        <p className="font-inter text-sm text-espresso/45 dark:text-cream/40">
                          {group.description}
                        </p>
                      </div>
                    </div>

                    {/* Items grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.items.map((item, i) => (
                        <MenuCard key={item.id} item={item} index={i} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Dietary note */}
          <div className="mt-16 p-6 rounded-2xl bg-caramel/5 border border-caramel/15">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="font-inter text-sm font-600 text-espresso dark:text-cream">
                Leyenda:
              </span>
              {Object.entries(tagLabels).map(([key, val]) => (
                <span
                  key={key}
                  className={`inline-block px-2.5 py-1 rounded-full font-inter text-xs font-500 ${val.class}`}
                >
                  {val.label}
                </span>
              ))}
            </div>
            <p className="font-inter text-xs text-espresso/50 dark:text-cream/40 mt-3">
              * Precios sujetos a cambio sin previo aviso. Consultá disponibilidad de productos. Podemos adaptar preparaciones ante alergias o restricciones.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
