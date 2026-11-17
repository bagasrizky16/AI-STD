import { MapPin, Phone } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/villageData';
import { buildWhatsAppUrl } from '../utils/booking';
import { WhatsAppIcon } from './WhatsAppIcon';

export function Footer() {
  const directWaUrl = buildWhatsAppUrl(
    WHATSAPP_NUMBER,
    'Halo Admin Desa Wisata Lereng Asri, saya ingin bertanya informasi wisata dan ketersediaan homestay.'
  );

  return (
    <footer className="bg-[#1B4332] text-white pt-12 pb-24 md:pb-12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/15">
          <div className="md:col-span-5">
            <p className="text-[22px] font-extrabold tracking-tight text-white mb-2">
              Desa Wisata Lereng Asri
            </p>
            <p className="text-[15px] leading-[1.6] text-[#C1ECD4] max-w-md mb-4">
              Kawasan ekowisata berbasis masyarakat di lereng Gunung Merbabu. Menyajikan keindahan
              alam pegunungan, edukasi kopi organik, dan kehangatan budaya pedesaan.
            </p>
            <div className="flex items-start gap-2 text-[14px] text-white/90">
              <MapPin className="w-4 h-4 text-[#E07A5F] shrink-0 mt-1" aria-hidden="true" />
              <span>Dusun Krajan, Kec. Selo, Kab. Boyolali, Jawa Tengah 57363</span>
            </div>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-[15px] font-bold text-white mb-3">Navigasi</h2>
            <ul className="space-y-2.5 text-[15px] text-[#C1ECD4]">
              <li>
                <a href="#beranda" className="hover:text-white hover:underline underline-offset-4">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#destinasi" className="hover:text-white hover:underline underline-offset-4">
                  Daftar Destinasi
                </a>
              </li>
              <li>
                <a href="#paket" className="hover:text-white hover:underline underline-offset-4">
                  Paket &amp; Harga
                </a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-white hover:underline underline-offset-4">
                  Galeri Foto
                </a>
              </li>
              <li>
                <a href="#lokasi" className="hover:text-white hover:underline underline-offset-4">
                  Peta Lokasi
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-[15px] font-bold text-white mb-3">Layanan Wisatawan</h2>
            <p className="text-[14px] text-[#C1ECD4] mb-3">
              Buka setiap hari pukul 05.00 – 18.00 WIB. Hubungi kami untuk kunjungan keluarga atau
              rombongan sekolah.
            </p>
            <div className="flex items-center gap-2 text-[15px] font-semibold text-white mb-4 tabular-nums">
              <Phone className="w-4 h-4 text-[#E07A5F]" aria-hidden="true" />
              <span>+62 812-3456-7890</span>
            </div>
            <a
              href={directWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-2.5 bg-[#25D366] hover:bg-[#1FA855] text-[#052E16] text-[15px] font-extrabold rounded-full transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Chat Admin via WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[#A5D0B9]">
          <p>© 2026 Pokdarwis Desa Wisata Lereng Asri. Dikelola bersama masyarakat desa.</p>
          <p>Ramah Keluarga · Ekowisata Berkelanjutan</p>
        </div>
      </div>
    </footer>
  );
}
