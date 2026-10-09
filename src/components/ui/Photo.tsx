import { photos } from '@/content/photos';
import type { PhotoName } from '@/content/photos';
import { Img } from './Img';
type Props = { name: PhotoName; alt: string; className?: string; eager?: boolean; sizes?: string };
export function Photo({ name, alt, className, eager = false, sizes = '(max-width: 700px) 100vw, 50vw' }: Props) {
  const photo = photos[name];
  // Media is cached immutably by the host. Version replacements so returning visitors see them.
  const url = (width: number) => `/media/${name}-${width}.webp${photo.version ? '?v=' + photo.version : ''}`;
  return <Img className={className} data-photo={name} src={url(photo.widths[0])}
    srcSet={photo.widths.map(w => `${url(w)} ${w}w`).join(', ')} sizes={sizes}
    width={photo.width} height={photo.height}
    alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" />;
}
