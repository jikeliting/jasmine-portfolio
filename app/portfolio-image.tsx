import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';
import manifest from './image-manifest.json';

type Entry = { width: number; height: number; small: string; large: string };
const images: Record<string, Entry> = manifest;

/** Static, pre-encoded previews: no first-visitor image transformation delay. */
export default function PortfolioImage({ src, fullResolution = false, sizes = '(max-width: 700px) 92vw, 720px', ...props }:
  ImgHTMLAttributes<HTMLImageElement> & { src: string; fullResolution?: boolean }) {
  const image = images[src];
  const ref = useRef<HTMLImageElement>(null);
  const [near, setNear] = useState(props.loading !== 'lazy');
  useEffect(() => {
    if (near || props.loading !== 'lazy') return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); observer.disconnect(); }
    }, { rootMargin: '500px' });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [near, props.loading]);
  const load = near || props.loading !== 'lazy';
  return <img {...props}
    ref={ref}
    src={load ? (image && !fullResolution ? image.large : src) : undefined}
    srcSet={load && image && !fullResolution ? `${image.small} 640w, ${image.large} 1280w` : undefined}
    sizes={image && !fullResolution ? sizes : undefined}
    width={props.width ?? image?.width} height={props.height ?? image?.height}
    style={fullResolution && image ? { backgroundImage: `url("${image.large}")`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', ...props.style } : props.style}
    decoding={props.decoding ?? 'async'} />;
}
