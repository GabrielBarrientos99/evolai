import {useLightbox} from '@astryxdesign/core/Lightbox';

// Imagen de una lección en Markdown: `![texto](ruta.jpg)` se amplía con un clic (con zoom),
// y `![texto](ruta.mp4)` se muestra como video con controles.
export function MediaLeccion({src, alt}: {src: string; alt: string}) {
  const esVideo = /\.(mp4|webm)$/i.test(src);
  const lightbox = useLightbox({media: {src, alt, caption: alt}, hasZoom: true});

  if (esVideo) {
    return (
      <video
        src={src}
        poster={src.replace(/\.(mp4|webm)$/i, '.jpg')}
        controls
        preload="metadata"
        playsInline
        aria-label={alt}
        className="block w-full rounded-lg"
      />
    );
  }
  return (
    <>
      <img
        {...lightbox.triggerProps}
        src={src}
        alt={alt}
        title="Clic para ampliar"
        loading="lazy"
        className="block w-full cursor-zoom-in rounded-lg"
      />
      {lightbox.element}
    </>
  );
}
