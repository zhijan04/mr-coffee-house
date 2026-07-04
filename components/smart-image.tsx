"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface SmartImageProps extends Omit<ImageProps, "src"> {
  src: string;
  fallback?: string;
}

/**
 * Imagen con fallback automático de marca.
 * Si la URL externa falla, muestra un placeholder elegante
 * con la identidad visual de Mr. Coffee, alojado localmente.
 * Garantiza que NUNCA se vea una imagen rota.
 */
export default function SmartImage({
  src,
  fallback = "/images/fallback-coffee.svg",
  alt,
  ...props
}: SmartImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const isSvg = imgSrc.endsWith(".svg");

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      unoptimized={isSvg}
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
}
