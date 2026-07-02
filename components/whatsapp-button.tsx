"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

export default function WhatsAppButton() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <motion.div
      style={{ opacity }}
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 20 }}
    >
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20BC5A] text-white rounded-full shadow-2xl shadow-black/30 transition-all duration-300 hover:scale-110 overflow-hidden"
        aria-label="Contactar por WhatsApp"
      >
        {/* Expanded label on hover */}
        <div className="flex items-center gap-3 px-4 py-3.5">
          <MessageCircle className="w-6 h-6 flex-shrink-0" strokeWidth={1.5} />
          <span className="font-inter text-sm font-600 whitespace-nowrap max-w-0 group-hover:max-w-[160px] overflow-hidden transition-all duration-400 ease-in-out">
            Escribinos por WhatsApp
          </span>
        </div>
      </a>

      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
    </motion.div>
  );
}
