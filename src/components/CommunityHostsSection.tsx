import { ShieldCheck } from 'lucide-react';
import { COMMUNITY_HOSTS } from '../data/villageData';

export function CommunityHostsSection() {
  return (
    <section
      aria-labelledby="tuan-rumah-heading"
      className="py-12 md:py-16 bg-[#FAFAF7]"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10">
        <div className="max-w-2xl mb-8">
          <p className="text-[14px] font-bold text-[#2D6A4F] mb-1.5">
            Dikelola Warga Lokal
          </p>
          <h2
            id="tuan-rumah-heading"
            className="text-[24px] sm:text-[32px] font-extrabold text-[#131E15] leading-[1.25] tracking-[-0.015em] text-balance"
          >
            Tuan Rumah &amp; Pemandu Wisata Desa
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#414844] mt-2">
            Seluruh kunjungan didampingi langsung oleh pengurus Kelompok Sadar Wisata (Pokdarwis)
            warga Lereng Asri yang siap membantu kebutuhan keluarga Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMMUNITY_HOSTS.map((host) => (
            <article
              key={host.id}
              className="bg-white rounded-2xl border border-[#1B4332]/10 p-5 sm:p-6 shadow-[0_2px_8px_rgba(60,50,40,0.04)] flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  aria-hidden="true"
                  className="w-14 h-14 rounded-full bg-[#1B4332] text-white border-2 border-[#E07A5F] flex items-center justify-center text-[17px] font-extrabold shrink-0"
                >
                  {host.initials}
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-[#131E15]">{host.name}</h3>
                  <p className="text-[13px] font-semibold text-[#2D6A4F]">{host.role}</p>
                </div>
              </div>

              <p className="text-[15px] leading-[1.6] text-[#263228] mb-4 flex-1">
                &ldquo;{host.quote}&rdquo;
              </p>

              <div className="pt-3 border-t border-[#1B4332]/10 flex items-center gap-2 text-[13px] font-semibold text-[#414844]">
                <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0" aria-hidden="true" />
                <span>{host.experience}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
