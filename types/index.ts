export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: string;
  tag?: "vegan" | "vegetarian" | "gluten-free" | "new" | "popular";
  category: MenuCategory;
}

export type MenuCategory =
  | "caliente"
  | "fria"
  | "tazones"
  | "pasteleria"
  | "brunch"
  | "especiales";

export interface MenuCategoryConfig {
  id: MenuCategory;
  label: string;
  emoji: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  width: number;
  height: number;
}

export type GalleryCategory =
  | "all"
  | "cafe"
  | "latte-art"
  | "brunch"
  | "pasteleria"
  | "ambiente"
  | "clientes";

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  handle: string;
}
