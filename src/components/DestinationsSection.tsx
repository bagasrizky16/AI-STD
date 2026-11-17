import { useEffect, useState } from 'react';
import { Clock, Footprints, X, Check } from 'lucide-react';
import { DESTINATIONS, Destination, DestinationCategory } from '../data/villageData';
import { filterDestinations, formatRupiah } from '../utils/booking';
import { ResilientImage } from './ResilientImage';

interface DestinationsSectionProps {
  onSelectBookingFromDestination: (destinationName: string) => void;
}

const FILTER_OPTIONS: Array<DestinationCategory | 'Semua'> = [
  'Semua',
  'Ekowisata',
  'Agro & Edukasi',
  'Budaya',
];

export function DestinationsSection({
  onSelectBookingFromDestination,
}: DestinationsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<DestinationCategory | 'Semua'>('Semua');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const visibleDestinations = filterDestinations(DESTINATIONS, activeCategory);

  useEffect(() => {
    if (!selectedDestination) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedDestination(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDestination]);

  return (
    <section
      id="destinasi"
      aria-labelledby="destinasi-heading"
      className="py-12 md:py-16 bg-[#FAFAF7] scroll-mt-16 md:scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10">
        {/* Section Header + Category Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div className="max-w-xl">
            <p className="text-[14px] font-bold text-[#2D6A4F] mb-1.5">
              Jelajahi Lereng Asri
            </p>
            <h2
              id="destinasi-heading"
              className="text-[24px] sm:text-[32px] font-extrabold text-[#131E15] leading-[1.25] tracking-[-0.015em] text-balance"
            >
              Destinasi Alam &amp; Budaya Desa
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#414844] mt-2">
              Seluruh titik wisata tertata rapi dengan jalur jalan kaki yang aman dan informasi
              tiket masuk yang jelas.
            </p>
          </div>

          {/* Interactive Filter Buttons (44px+ touch height) */}
          <div
            role="group"
            aria-label="Filter kategori destinasi"
            className="flex flex-wrap items-center gap-2"
          >
            {FILTER_OPTIONS.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
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

        {/* Destinations Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleDestinations.map((dest) => (
            <article
              key={dest.id}
              className="bg-white rounded-2xl border border-[#1B4332]/10 shadow-[0_2px_8px_rgba(60,50,40,0.04)] overflow-hidden flex flex-col"
            >
              <div className="aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#E9F7E8]">
                <ResilientImage
                  src={dest.image}
                  alt={dest.imageAlt}
                  fallbackTitle={dest.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-1">
                {/* Clean Unboxed Metadata with typographic separators */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-semibold text-[#2D6A4F] mb-2">
                  <span>{dest.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{dest.statusLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#414844] font-medium">{dest.openHours}</span>
                </div>

                <h3 className="text-[20px] sm:text-[22px] font-bold text-[#131E15] leading-[1.3] mb-2">
                  {dest.name}
                </h3>

                <p className="text-[15px] leading-[1.6] text-[#414844] mb-4">
                  {dest.shortDesc}
                </p>

                <div className="flex items-center gap-2 text-[14px] text-[#263228] bg-[#EFFDEE] rounded-xl px-3.5 py-2.5 mb-5">
                  <Footprints className="w-4 h-4 text-[#2D6A4F] shrink-0" aria-hidden="true" />
                  <span>{dest.accessibilityNote}</span>
                </div>

                {/* Price & Large Action Button */}
                <div className="mt-auto pt-4 border-t border-[#1B4332]/10 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[12px] font-semibold text-[#414844]">Tiket Masuk</p>
                    <p className="text-[18px] sm:text-[20px] font-extrabold text-[#1B4332] tabular-nums">
                      {formatRupiah(dest.ticketPrice)}
                      <span className="text-[13px] font-medium text-[#414844]">
                        {' '}
                        / {dest.priceUnit}
                      </span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedDestination(dest)}
                    className="min-h-[48px] px-5 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-[15px] font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Detail Lokasi
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Destination Detail Modal */}
      {selectedDestination && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-destination-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#131E15]/60 backdrop-blur-xs p-0 sm:p-4"
          onClick={() => setSelectedDestination(null)}
        >
          <div
            className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#1B4332]/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-[#E9F7E8]">
              <ResilientImage
                src={selectedDestination.image}
                alt={selectedDestination.imageAlt}
                fallbackTitle={selectedDestination.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedDestination(null)}
                aria-label="Tutup detail destinasi"
                className="absolute top-3 right-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/95 text-[#131E15] shadow-md hover:bg-white cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-[#2D6A4F] mb-2">
                <span>{selectedDestination.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedDestination.statusLabel}</span>
              </div>

              <h3
                id="modal-destination-title"
                className="text-[22px] sm:text-[26px] font-extrabold text-[#131E15] leading-[1.25] mb-3"
              >
                {selectedDestination.name}
              </h3>

              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#263228] mb-5">
                {selectedDestination.fullDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <div className="p-3.5 rounded-xl bg-[#FAFAF7] border border-[#1B4332]/10">
                  <div className="flex items-center gap-2 text-[13px] font-semibold text-[#414844] mb-1">
                    <Clock className="w-4 h-4 text-[#2D6A4F]" aria-hidden="true" />
                    <span>Jam Buka</span>
                  </div>
                  <p className="text-[15px] font-bold text-[#131E15]">
                    {selectedDestination.openHours}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAFAF7] border border-[#1B4332]/10">
                  <div className="flex items-center gap-2 text-[13px] font-semibold text-[#414844] mb-1">
                    <Footprints className="w-4 h-4 text-[#2D6A4F]" aria-hidden="true" />
                    <span>Jarak dari Gerbang</span>
                  </div>
                  <p className="text-[15px] font-bold text-[#131E15]">
                    {selectedDestination.distanceFromGate}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-[14px] font-bold text-[#131E15] mb-2.5">
                  Daya Tarik &amp; Fasilitas Tersedia
                </h4>
                <ul className="space-y-2">
                  {selectedDestination.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] text-[#263228]">
                      <Check
                        className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#1B4332]/10">
                <div>
                  <p className="text-[13px] text-[#414844]">Harga Tiket</p>
                  <p className="text-[20px] font-extrabold text-[#1B4332] tabular-nums">
                    {formatRupiah(selectedDestination.ticketPrice)}{' '}
                    <span className="text-[13px] font-normal text-[#414844]">
                      / {selectedDestination.priceUnit}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const name = selectedDestination.name;
                    setSelectedDestination(null);
                    onSelectBookingFromDestination(name);
                  }}
                  className="min-h-[48px] px-6 py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-[15px] font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Jadwalkan Kunjungan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
