"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Instagram, Heart, MessageCircle } from "lucide-react";

const posts = [
  {
    id: "ig1",
    src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600",
    alt: "Latte art butterfly en Mr. Coffee House",
    likes: "342",
    comments: "18",
  },
  {
    id: "ig2",
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600",
    alt: "Barista en acción preparando espresso",
    likes: "521",
    comments: "27",
  },
  {
    id: "ig3",
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600",
    alt: "Café con latte art en taza artesanal",
    likes: "298",
    comments: "15",
  },
  {
    id: "ig4",
    src: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=600",
    alt: "Brunch de domingo completo",
    likes: "687",
    comments: "43",
  },
  {
    id: "ig5",
    src: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600",
    alt: "Pastelería artesanal del día",
    likes: "412",
    comments: "31",
  },
  {
    id: "ig6",
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600",
    alt: "Interior moderno de Mr. Coffee House",
    likes: "578",
    comments: "36",
  },
];

export default function InstagramFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-padding bg-cream dark:bg-espresso overflow-hidden"
      aria-label="Instagram de Mr. Coffee House"
    >
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-caramel" />
            <span className="font-inter text-xs font-500 text-caramel tracking-[0.25em] uppercase">
              Instagram
            </span>
            <span className="h-px w-8 bg-caramel" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-800 text-espresso dark:text-cream mb-4">
            @mrcoffee.house
          </h2>
          <p className="font-inter text-base text-espresso/55 dark:text-cream/50 max-w-md mx-auto">
            Seguinos para ver las novedades, especiales del día y los momentos más lindos de nuestro café.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10">
          {posts.map((post, i) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/mrcoffee.house"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer block"
              aria-label={post.alt}
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-espresso/70 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-4">
                <Instagram className="w-8 h-8 text-cream" strokeWidth={1.5} />
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1.5 text-cream">
                    <Heart className="w-4 h-4 fill-current" strokeWidth={0} />
                    <span className="font-inter text-sm font-500">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-cream">
                    <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                    <span className="font-inter text-sm font-500">{post.comments}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-center"
        >
          <a
            href="https://www.instagram.com/mrcoffee.house"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white font-inter font-600 text-base rounded-full hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <Instagram className="w-5 h-5" strokeWidth={1.5} />
            Seguir en Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
