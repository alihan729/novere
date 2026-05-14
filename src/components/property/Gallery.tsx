import { useState } from "react";

interface GalleryProps {
  images: string[];
  alt: string;
}

export function Gallery({ images, alt }: GalleryProps) {
  const [active, setActive] = useState(0);

  if (!images.length) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center bg-muted text-xs uppercase tracking-[0.3em] text-muted-foreground">
        No images
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
        <img
          src={images[active]}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 md:grid-cols-6">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={`aspect-square overflow-hidden border transition-colors duration-300 ${
                i === active ? "border-foreground" : "border-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={`Image ${i + 1}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
