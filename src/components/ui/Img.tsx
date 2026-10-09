import { useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height' | 'onError'> & { width: number; height: number };

/** Si la imagen no carga, queda un cuadro vacío de la misma proporción en lugar del ícono de imagen rota. */
export function Img({ src, srcSet, width, height, ...props }: Props) {
  const [failed, setFailed] = useState(false);
  // El SVG vacío conserva la proporción: con `height: auto`, un píxel transparente haría la imagen cuadrada.
  const blank = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'/%3E`;
  return <img {...props} width={width} height={height} src={failed ? blank : src} srcSet={failed ? undefined : srcSet}
    data-failed={failed || undefined} onError={() => setFailed(true)} />;
}
