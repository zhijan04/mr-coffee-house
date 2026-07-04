import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WHATSAPP_NUMBER = "5493541000000";
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola, quiero conocer más sobre Mr. Coffee House.";
export const INSTAGRAM_HANDLE = "mrcoffee.house";
export const MAPS_URL =
  "https://www.google.com/maps/search/Mr+Coffee+Villa+Carlos+Paz";

export function getWhatsAppUrl(message?: string) {
  const msg = encodeURIComponent(message || WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}
