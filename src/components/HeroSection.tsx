import { ArrowDownRight, MapPin } from 'lucide-react';
import { VILLAGE_IMAGES } from '../data/villageData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onExplorePackages: () => void;
}

const KEY_HIGHLIGHTS = [
  { label: 'Jam Operasional', value: '05.00 – 18.00 WIB' },
  { label: 'Tiket Wisata', value: 'Mulai Rp 20.000' },
  { label: 'Kawasan Alam', value: '4 Destinasi Utama' },
  { label: 'Kenyamanan', value: 'Ramah Anak & Lansia' },
];

export function HeroSection({ onExplorePackages }: HeroSectionProps) {
  return (
    <section id="beranda" aria-labelledby="hero-heading" className="bg-[#FAFAF7]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 pt-4 md:pt-6">
        {/* Dominant Hero Photo Frame */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#1B4332] shadow-[0_6px_24px_-4px_rgba(27,67,50,0.16)]">
          <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8] w-full">
            <ResilientImage
              src={VILLAGE_IMAGES.hero}
              alt="Panorama matahari terbit di atas sawah terasering hijau dan rumah joglo Desa Wisata Lereng Asri"
              loading="eager"
              fallbackTitle="Desa Wisata Lereng Asri"
              className="w-full h-full object-cover"
            />
            {/* Measured gradient scrim for WCAG AA/AAA text contrast */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0D1A12]/90 via-[#0D1A12]/45 to-[#0D1A12]/20"
            />
          </div>

          {/* Foreground Hero Typography & Primary Action */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-12">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-[#C1ECD4] mb-2.5">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Desa Wisata Lereng Asri · Ketinggian 1.150 mdpl, Boyolali</span>
              </p>

              <h1
                id="hero-heading"
                className="text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-[1.2] tracking-[-0.02em] text-balance mb-3"
              >
                Hirup Udara Segar &amp; Rasakan Hangatnya Alam Desa
              </h1>

              <p className="text-[15px] sm:text-[17px] leading-[1.6] text-white/95 max-w-xl mb-6">
                Nikmati air terjun hutan pinus, petik kopi arabika di lereng gunung, serta menginap
                nyaman di homestay Joglo bersama warga desa yang ramah.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <button
                  type="button"
                  onClick={onExplorePackages}
                  className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 bg-[#E07A5F] hover:bg-[#C86449] text-white text-[16px] font-bold rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.22)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Lihat Paket &amp; Harga</span>
                  <ArrowDownRight className="w-5 h-5" aria-hidden="true" />
                </button>

                <a
                  href="#destinasi"
                  className="inline-flex items-center justify-center min-h-[52px] px-6 py-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/35 text-white text-[15px] font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  Jelajahi Destinasi
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column key visitor info strip directly below hero */}
        <div className="mt-4 bg-white rounded-2xl border border-[#1B4332]/10 shadow-[0_2px_8px_rgba(60,50,40,0.04)] grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#1B4332]/10">
          {KEY_HIGHLIGHTS.map((item, idx) => (
            <div
              key={item.label}
              className={`px-4 py-3.5 sm:px-6 sm:py-4 ${
                idx % 2 === 1 ? 'border-l lg:border-l-0 border-[#1B4332]/10' : ''
              }`}
            >
              <p className="text-[13px] font-medium text-[#414844]">{item.label}</p>
              <p className="text-[15px] sm:text-[16px] font-bold text-[#131E15] mt-0.5 tabular-nums">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
