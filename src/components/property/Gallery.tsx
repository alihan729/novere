import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

  function goTo(index: number) {
    setActive((index + images.length) % images.length);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="group relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={i === active ? alt : ""}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              i === active ? "opacity-100" : "opacity-0"
            )}
          />
        ))}

        {images.length > 1 && (
          <>
            <button
              onClick={() => goTo(active - 1)}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/40 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => goTo(active + 1)}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/40 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-1 transition-all duration-300",
                    i === active ? "w-6 bg-white" : "w-3 bg-white/40 hover:bg-white/70"
                  )}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 md:grid-cols-6">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square overflow-hidden transition-all duration-300",
                i === active
                  ? "ring-1 ring-foreground ring-offset-2 ring-offset-background"
                  : "opacity-60 hover:opacity-100"
              )}
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
