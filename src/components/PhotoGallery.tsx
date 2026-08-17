"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, SectionHeading } from "@/components/ScrollReveal";
import { GALLERY_PHOTOS } from "@/lib/event";

export function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
    );
  }, []);
  const next = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % GALLERY_PHOTOS.length
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, close, prev, next]);

  return (
    <section id="gallery" className="section-padding bg-invite-blush/20">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Our Moments"
            title="A Glimpse of Us"
            description="Treasured memories leading up to our engagement."
          />
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
          {GALLERY_PHOTOS.map((photo, index) => (
            <ScrollReveal key={photo.src} delay={index * 0.08}>
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-invite-gold/20 bg-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-gold focus-visible:ring-offset-2"
                aria-label={`View photo: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 45vw, 280px"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-invite-burgundy/30 to-transparent opacity-0 transition group-hover:opacity-100" />
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-invite-charcoal/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close lightbox"
            >
              ✕
            </button>

            {GALLERY_PHOTOS.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white sm:left-4"
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white sm:right-14"
                  aria-label="Next photo"
                >
                  ›
                </button>
              </>
            )}

            <motion.div
              key={lightboxIndex}
              className="relative h-[70vh] w-full max-w-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_PHOTOS[lightboxIndex].src}
                alt={GALLERY_PHOTOS[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
