import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_ITEMS, GalleryCategory } from '../data/villageData';
import { filterGallery } from '../utils/booking';
import { ResilientImage } from './ResilientImage';

const GALLERY_FILTERS: Array<GalleryCategory | 'Semua'> = [
  'Semua',
  'Alam',
  'Budaya',
  'Penginapan',
];

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory | 'Semua'>('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visiblePhotos = filterGallery(GALLERY_ITEMS, activeFilter);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % visiblePhotos.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, visiblePhotos.length]);

  const activePhoto = lightboxIndex !== null ? visiblePhotos[lightboxIndex] : null;

  return (
    <section
      id="galeri"
      aria-labelledby="galeri-heading"
      className="py-12 md:py-16 bg-[#FAFAF7] scroll-mt-16 md:scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div className="max-w-xl">
            <p className="text-[14px] font-bold text-[#2D6A4F] mb-1.5">
              Suasana Asli Desa
            </p>
            <h2
              id="galeri-heading"
              className="text-[24px] sm:text-[32px] font-extrabold text-[#131E15] leading-[1.25] tracking-[-0.015em] text-balance"
            >
              Galeri Foto Desa Wisata Lereng Asri
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#414844] mt-2">
              Ketuk foto untuk memperbesar dan melihat kisah di balik setiap sudut desa kami.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter kategori galeri foto"
            className="flex flex-wrap items-center gap-2"
          >
            {GALLERY_FILTERS.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveFilter(category);
                    setLightboxIndex(null);
                  }}
                  aria-pressed={isActive}
                  className={`min-h-[44px] px-4 py-2 text-[14px] font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#1B4332] text-white shadow-sm'
                      : 'bg-white text-[#263228] border border-[#1B4332]/15 hover:bg-[#E9F7E8]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {visiblePhotos.map((item, idx) => {
            const isFeatured = activeFilter === 'Semua' && idx === 0;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Lihat foto ${item.title}`}
                className={`group relative text-left rounded-2xl overflow-hidden bg-[#1B4332] border border-[#1B4332]/10 shadow-[0_2px_8px_rgba(60,50,40,0.06)] cursor-pointer ${
                  isFeatured
                    ? 'sm:col-span-2 aspect-[16/10] lg:aspect-[16/9]'
                    : 'aspect-[4/3]'
                }`}
              >
                <ResilientImage
                  src={item.image}
                  alt={item.imageAlt}
                  fallbackTitle={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0D1A12]/85 via-[#0D1A12]/20 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-[12px] font-semibold text-[#C1ECD4] mb-0.5">
                    {item.category} · {item.location}
                  </p>
                  <p className="text-[16px] sm:text-[18px] font-bold text-white leading-[1.3]">
                    {item.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accessible Photo Lightbox */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1A12]/90 backdrop-blur-sm p-3 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1B4332]/10">
              <span className="text-[14px] font-bold text-[#414844] tabular-nums">
                Foto {lightboxIndex + 1} dari {visiblePhotos.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Tutup galeri foto"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-[#FAFAF7] text-[#131E15] cursor-pointer"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <div className="relative bg-[#131E15] aspect-[16/10] sm:aspect-[16/9]">
              <ResilientImage
                src={activePhoto.image}
                alt={activePhoto.imageAlt}
                fallbackTitle={activePhoto.title}
                className="w-full h-full object-cover"
              />

              {visiblePhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + visiblePhotos.length) % visiblePhotos.length
                      )
                    }
                    aria-label="Foto sebelumnya"
                    className="absolute left-3 top-1/2 -translate-y-1/2 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-[#131E15] shadow-md cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % visiblePhotos.length)
                    }
                    aria-label="Foto berikutnya"
                    className="absolute right-3 top-1/2 -translate-y-1/2 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-[#131E15] shadow-md cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <div className="p-4 sm:p-6">
              <p className="text-[13px] font-semibold text-[#2D6A4F] mb-1">
                {activePhoto.category} · {activePhoto.location}
              </p>
              <h3 id="lightbox-title" className="text-[20px] font-bold text-[#131E15] mb-1.5">
                {activePhoto.title}
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#414844]">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
