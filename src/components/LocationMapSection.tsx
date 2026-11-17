import { useState } from 'react';
import { Car, Check, Compass, ExternalLink, Footprints, MapPin, Mountain } from 'lucide-react';
import { MAP_LOCATIONS, MapLocation } from '../data/villageData';

export function LocationMapSection() {
  const [activeLoc, setActiveLoc] = useState<MapLocation>(MAP_LOCATIONS[0]);

  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=-7.4981,110.4539';

  return (
    <section
      id="lokasi"
      aria-labelledby="lokasi-heading"
      className="py-12 md:py-16 bg-[#EFFDEE] border-t border-[#1B4332]/10 scroll-mt-16 md:scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10">
        <div className="max-w-2xl mb-8">
          <p className="text-[14px] font-bold text-[#2D6A4F] mb-1.5">
            Navigasi Kawasan Desa
          </p>
          <h2
            id="lokasi-heading"
            className="text-[24px] sm:text-[32px] font-extrabold text-[#131E15] leading-[1.25] tracking-[-0.015em] text-balance"
          >
            Peta Lokasi &amp; Panduan Akses Jalan
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#414844] mt-2">
            Ketuk titik lokasi di peta untuk melihat jarak tempuh jalan kaki, ketinggian, serta
            fasilitas ramah keluarga di setiap area desa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Interactive Village Trail Map */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#1B4332]/15 p-4 sm:p-5 shadow-[0_2px_8px_rgba(60,50,40,0.04)] flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-[14px] font-bold text-[#1B4332]">
                <Compass className="w-5 h-5" aria-hidden="true" />
                <span>Peta Jalur Wisata Desa Lereng Asri</span>
              </div>
              <span className="text-[13px] font-medium text-[#414844]">
                Jl. Raya Selo–Merbabu Km 8, Boyolali
              </span>
            </div>

            {/* Topographic Map Canvas */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden bg-[#E4F2E3] border border-[#1B4332]/15">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full"
              >
                {/* Soft Topographic Elevation Zones */}
                <path
                  d="M0,100 L0,45 Q30,30 60,15 T100,10 L100,100 Z"
                  fill="#D8E6D7"
                  opacity="0.7"
                />
                <path
                  d="M0,100 L0,62 Q35,50 65,35 T100,30 L100,100 Z"
                  fill="#EFFDEE"
                  opacity="0.75"
                />
                {/* Contour Lines */}
                <path
                  d="M5,35 Q35,22 65,12 T98,8"
                  fill="none"
                  stroke="#86AF99"
                  strokeWidth="0.4"
                  strokeDasharray="1.5 1.5"
                />
                <path
                  d="M5,55 Q35,45 65,30 T98,25"
                  fill="none"
                  stroke="#86AF99"
                  strokeWidth="0.4"
                  strokeDasharray="1.5 1.5"
                />
                {/* Mountain Stream */}
                <path
                  d="M90,88 Q75,78 65,70 T35,92"
                  fill="none"
                  stroke="#40916C"
                  strokeWidth="1.2"
                  opacity="0.45"
                />
                {/* Village Walking & Shuttle Trail */}
                <path
                  d="M20,78 L38,64 L52,44 L74,34 M52,44 L78,72"
                  fill="none"
                  stroke="#9A442D"
                  strokeWidth="1.1"
                  strokeDasharray="2 1.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Landmark Interactive Pins */}
              {MAP_LOCATIONS.map((loc, idx) => {
                const isSelected = loc.id === activeLoc.id;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setActiveLoc(loc)}
                    aria-pressed={isSelected}
                    aria-label={`Pilih lokasi peta: ${loc.name}`}
                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex flex-col items-center justify-center group cursor-pointer focus-visible:z-30"
                  >
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-extrabold shadow-md transition-transform ${
                        isSelected
                          ? 'bg-[#E07A5F] text-white scale-115 ring-4 ring-white'
                          : 'bg-[#1B4332] text-white group-hover:scale-105 ring-2 ring-white'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className={`mt-1 px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap shadow-xs ${
                        isSelected
                          ? 'bg-[#131E15] text-white'
                          : 'bg-white/95 text-[#131E15]'
                      }`}
                    >
                      {loc.name.split(' ')[0]} {loc.name.split(' ')[1]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Location Selector Tabs for Easy Thumb Access */}
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Daftar titik peta">
              {MAP_LOCATIONS.map((loc, idx) => {
                const isSelected = loc.id === activeLoc.id;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setActiveLoc(loc)}
                    aria-pressed={isSelected}
                    className={`min-h-[44px] px-3 py-2 rounded-xl text-[13px] font-bold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B4332] text-white'
                        : 'bg-[#FAFAF7] text-[#263228] border border-[#1B4332]/15 hover:bg-[#E9F7E8]'
                    }`}
                  >
                    {idx + 1}. {loc.name.split('&')[0].trim()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Pin Details & Driving Directions */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-[#1B4332]/15 p-5 sm:p-6 shadow-[0_2px_8px_rgba(60,50,40,0.04)] flex-1">
              <p className="text-[13px] font-bold text-[#9A442D] mb-1">
                {activeLoc.category} · {activeLoc.elevation}
              </p>
              <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#131E15] mb-2.5">
                {activeLoc.name}
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#414844] mb-4">
                {activeLoc.description}
              </p>

              <div className="space-y-2.5 mb-5">
                <div className="flex items-start gap-2.5 text-[14px] text-[#263228]">
                  <Footprints className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>Waktu Tempuh:</strong> {activeLoc.walkTime}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-[14px] text-[#263228]">
                  <Mountain className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>Aksesibilitas:</strong> {activeLoc.accessibility}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1B4332]/10">
                <p className="text-[13px] font-bold text-[#131E15] mb-2">Fasilitas di Titik Ini:</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-[14px] font-semibold text-[#2D6A4F]">
                  {activeLoc.facilities.map((fac) => (
                    <li key={fac} className="inline-flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#2D6A4F] shrink-0" aria-hidden="true" />
                      <span>{fac}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* External Google Maps + Transport Directions Card */}
            <div className="bg-white rounded-2xl border border-[#1B4332]/15 p-5 sm:p-6 shadow-[0_2px_8px_rgba(60,50,40,0.04)]">
              <div className="flex items-center gap-2 text-[15px] font-extrabold text-[#131E15] mb-3">
                <Car className="w-5 h-5 text-[#2D6A4F]" aria-hidden="true" />
                <span>Rute Kendaraan Menuju Lokasi</span>
              </div>

              <ul className="space-y-2 text-[14px] text-[#414844] mb-5">
                <li>
                  <strong className="text-[#131E15]">Dari Solo / Bandara Adi Soemarmo:</strong> ±55
                  menit via Jalan Boyolali–Selo (jalan aspal dua arah lebar).
                </li>
                <li>
                  <strong className="text-[#131E15]">Dari Yogyakarta / Magelang:</strong> ±65 menit
                  via Ketep Pass menuju jalur wisata Selo.
                </li>
              </ul>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[50px] px-5 py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-[15px] font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <MapPin className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Buka Petunjuk Arah di Google Maps</span>
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
